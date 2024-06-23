'use strict';

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

self.dispatchPort = null;
self.outputPort = null;
self.workerNumber = -1;
self.activeJobId = null;
self.sentBlobs = new Map();
self.sentBuffers = new Map();
self.JobHandlers = {};

function FlipImageData(data, width, height) {
  var stride = width * 4;
  var tempRow = new Uint8Array(stride);
  var imageBuffer = data.buffer;

  for (var topY = 0, len = Math.floor(height / 2); topY < len; ++topY) {
    var bottomY = height - topY - 1;
    var topRow = new Uint8Array(imageBuffer, topY * stride, stride);
    var bottomRow = new Uint8Array(imageBuffer, bottomY * stride, stride);
    tempRow.set(topRow);
    topRow.set(bottomRow);
    bottomRow.set(tempRow);
  }
}

function UnpremultiplyImageData(data) {
  for (var ptr = 0, len = data.length; ptr < len; ptr += 4) {
    var a = data[ptr + 3];
    if (a === 255) continue;
    var scale = 255 / a;
    data[ptr] *= scale;
    data[ptr + 1] *= scale;
    data[ptr + 2] *= scale;
  }
}

self.JobHandlers["ProcessImageData"] = function (params) {
  var buffer = params["buffer"];
  var data = new Uint8Array(buffer);
  var width = params["width"];
  var height = params["height"];
  if (params["flipY"]) FlipImageData(data, width, height);
  if (params["unpremultiply"]) UnpremultiplyImageData(data);
  return {
    result: buffer,
    transferables: [buffer]
  };
};

self.addEventListener("message", function (e) {
  var msg = e.data;
  var type = msg["type"];

  switch (type) {
    case "init":
      self.workerNumber = msg["number"];
      self.dispatchPort = msg["dispatch-port"];
      self.dispatchPort.onmessage = OnDispatchWorkerMessage;
      self.outputPort = msg["output-port"];
      return;

    case "terminate":
      self.close();
      return;

    default:
      console.error("unknown message '" + type + "'");
      return;
  }
});

function SendReady() {
  self.dispatchPort.postMessage({
    "type": "ready"
  });
  self.outputPort.postMessage({
    "type": "ready"
  });
}

function SendError(isBroadcast, e) {
  if (!isBroadcast) self.outputPort.postMessage({
    "type": "error",
    "jobId": self.activeJobId,
    "error": e.toString()
  });
  SendDone();
}

function SendResult(isBroadcast, ret) {
  if (!isBroadcast) {
    var transferables = ret.transferables || [];
    self.outputPort.postMessage({
      "type": "result",
      "jobId": self.activeJobId,
      "result": ret.result
    }, transferables);
  }

  SendDone();
}

function SendDone() {
  self.activeJobId = null;
  self.dispatchPort.postMessage({
    "type": "done"
  });
}

function SendProgress(val) {
  self.outputPort.postMessage({
    "type": "progress",
    "jobId": self.activeJobId,
    "progress": val
  });
}

function OnDispatchWorkerMessage(e) {
  var msg = e.data;
  var type = msg["type"];

  if (type === "_import_scripts") {
    importScripts.apply(void 0, _toConsumableArray(msg["scripts"]));
    return;
  } else if (type === "_send_blob") {
    self.sentBlobs.set(msg["id"], msg["blob"]);
    return;
  } else if (type === "_send_buffer") {
    self.sentBuffers.set(msg["id"], msg["buffer"]);
    return;
  } else if (type === "_ready") {
    SendReady();
    return;
  }

  var jobId = msg["jobId"];
  var isBroadcast = msg["isBroadcast"];
  var params = msg["params"];
  var ret;
  self.activeJobId = jobId;

  if (!self.JobHandlers.hasOwnProperty(type)) {
    console.error("no handler for message type '".concat(type, "'"));
    return;
  }

  try {
    ret = self.JobHandlers[type](params);
  } catch (e) {
    SendError(isBroadcast, "Exception in job handler: " + e);
    return;
  }

  if (ret && ret.then) ret.then(function (asyncRet) {
    return SendResult(isBroadcast, asyncRet);
  })["catch"](function (err) {
    return SendError(isBroadcast, "Rejection in job handler: " + err);
  });else SendResult(isBroadcast, ret);
}

;