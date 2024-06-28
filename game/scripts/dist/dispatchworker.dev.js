'use strict';

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

self.inputPort = null;
self.jobQueue = [];
self.jobWorkers = [];
self.sentBlobs = [];
self.sentBuffers = [];
self.importedScripts = [];
self.lastBroadcasts = new Map();

var JobWorker =
/*#__PURE__*/
function () {
  function JobWorker(port, number) {
    var _this = this;

    _classCallCheck(this, JobWorker);

    this._port = port;
    this._number = number;
    this._isReady = false;
    this._isBusy = false;

    this._port.onmessage = function (e) {
      return _this._OnMessage(e.data);
    };
  }

  _createClass(JobWorker, [{
    key: "ImportScripts",
    value: function ImportScripts(scripts) {
      this._port.postMessage({
        "type": "_import_scripts",
        "scripts": scripts
      });
    }
  }, {
    key: "SendBlob",
    value: function SendBlob(blob, id) {
      this._port.postMessage({
        "type": "_send_blob",
        "blob": blob,
        "id": id
      });
    }
  }, {
    key: "SendBuffer",
    value: function SendBuffer(buffer, id) {
      this._port.postMessage({
        "type": "_send_buffer",
        "buffer": buffer,
        "id": id
      });
    }
  }, {
    key: "SendJob",
    value: function SendJob(job) {
      if (this._isBusy || !this._isReady) throw new Error("cannot take job");
      this._isBusy = true;

      this._port.postMessage(job, job["transferables"]);
    }
  }, {
    key: "_InitBroadcast",
    value: function _InitBroadcast(job) {
      this._port.postMessage(job, job["transferables"]);
    }
  }, {
    key: "SendReady",
    value: function SendReady() {
      this._port.postMessage({
        "type": "_ready"
      });
    }
  }, {
    key: "IsReady",
    value: function IsReady() {
      return this._isReady;
    }
  }, {
    key: "_OnReady",
    value: function _OnReady() {
      this._isReady = true;
      this.MaybeStartNextJob();
    }
  }, {
    key: "IsBusy",
    value: function IsBusy() {
      return this._isBusy;
    }
  }, {
    key: "GetNumber",
    value: function GetNumber() {
      return this._number;
    }
  }, {
    key: "_OnMessage",
    value: function _OnMessage(msg) {
      var type = msg["type"];

      switch (type) {
        case "ready":
          this._OnReady();

          return;

        case "done":
          this._OnJobDone();

          return;

        default:
          console.error("unknown message from worker '" + type + "'");
          return;
      }
    }
  }, {
    key: "_OnJobDone",
    value: function _OnJobDone() {
      this._isBusy = false;
      this.MaybeStartNextJob();
    }
  }, {
    key: "MaybeStartNextJob",
    value: function MaybeStartNextJob() {
      if (this._isBusy || !this._isReady) return;

      var i = this._FindAvailableJob();

      if (i === -1) return;
      var job = self.jobQueue[i];
      var isBroadcast = job["isBroadcast"];

      if (isBroadcast) {
        job["doneFlags"][this._number] = true;
        if (job["doneFlags"].every(function (x) {
          return x;
        })) self.jobQueue.splice(i, 1);
      } else self.jobQueue.splice(i, 1);

      this.SendJob(job);
    }
  }, {
    key: "_FindAvailableJob",
    value: function _FindAvailableJob() {
      for (var i = 0, len = self.jobQueue.length; i < len; ++i) {
        var job = self.jobQueue[i];
        if (typeof job["maxWorkerNum"] === "number" && this._number >= job["maxWorkerNum"]) continue;
        if (!job["isBroadcast"] || this._number < job["doneFlags"].length && !job["doneFlags"][this._number]) return i;
      }

      return -1;
    }
  }]);

  return JobWorker;
}();

var number = 0;

function AddJobWorker(port) {
  var jobWorker = new JobWorker(port, number++);
  self.jobWorkers.push(jobWorker);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = self.sentBlobs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _slicedToArray(_step.value, 2),
          blob = _step$value[0],
          id = _step$value[1];

      jobWorker.SendBlob(blob, id);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = self.sentBuffers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _step2$value = _slicedToArray(_step2.value, 2),
          buffer = _step2$value[0],
          _id = _step2$value[1];

      jobWorker.SendBuffer(buffer, _id);
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = self.importedScripts[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var scripts = _step3.value;
      jobWorker.ImportScripts(scripts);
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
        _iterator3["return"]();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = self.lastBroadcasts.values()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var broadcastJob = _step4.value;

      jobWorker._InitBroadcast(broadcastJob);
    }
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
        _iterator4["return"]();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }

  jobWorker.SendReady();
}

function CancelJob(jobId) {
  for (var i = 0, len = self.jobQueue.length; i < len; ++i) {
    if (self.jobQueue[i].jobId === jobId) {
      self.jobQueue.splice(i, 1);
      return;
    }
  }
}

self.addEventListener("message", function (e) {
  var msg = e.data;
  var type = msg["type"];

  if (type === "_init") {
    self.inputPort = msg["in-port"];
    self.inputPort.onmessage = OnInputPortMessage;
  } else if (type === "_addJobWorker") AddJobWorker(msg["port"]);
});

function OnInputPortMessage(e) {
  var msg = e.data;
  var type = msg["type"];

  if (type === "_cancel") {
    CancelJob(msg.jobId);
    return;
  } else if (type === "_import_scripts") {
    var scripts = msg["scripts"];
    var _iteratorNormalCompletion5 = true;
    var _didIteratorError5 = false;
    var _iteratorError5 = undefined;

    try {
      for (var _iterator5 = self.jobWorkers[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
        var w = _step5.value;
        w.ImportScripts(scripts);
      }
    } catch (err) {
      _didIteratorError5 = true;
      _iteratorError5 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
          _iterator5["return"]();
        }
      } finally {
        if (_didIteratorError5) {
          throw _iteratorError5;
        }
      }
    }

    self.importedScripts.push(scripts);
    return;
  } else if (type === "_send_blob") {
    var blob = msg["blob"];
    var id = msg["id"];
    var _iteratorNormalCompletion6 = true;
    var _didIteratorError6 = false;
    var _iteratorError6 = undefined;

    try {
      for (var _iterator6 = self.jobWorkers[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
        var _w = _step6.value;

        _w.SendBlob(blob, id);
      }
    } catch (err) {
      _didIteratorError6 = true;
      _iteratorError6 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
          _iterator6["return"]();
        }
      } finally {
        if (_didIteratorError6) {
          throw _iteratorError6;
        }
      }
    }

    self.sentBlobs.push([blob, id]);
    return;
  } else if (type === "_send_buffer") {
    var buffer = msg["buffer"];
    var _id2 = msg["id"];
    var _iteratorNormalCompletion7 = true;
    var _didIteratorError7 = false;
    var _iteratorError7 = undefined;

    try {
      for (var _iterator7 = self.jobWorkers[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
        var _w2 = _step7.value;

        _w2.SendBuffer(buffer, _id2);
      }
    } catch (err) {
      _didIteratorError7 = true;
      _iteratorError7 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion7 && _iterator7["return"] != null) {
          _iterator7["return"]();
        }
      } finally {
        if (_didIteratorError7) {
          throw _iteratorError7;
        }
      }
    }

    self.sentBuffers.push([buffer, _id2]);
    return;
  } else if (type === "_no_more_workers") {
    self.sentBlobs.length = 0;
    self.sentBuffers.length = 0;
    self.importedScripts.length = 0;
    self.lastBroadcasts.clear();
    return;
  }

  self.jobQueue.push(msg);

  if (msg["isBroadcast"]) {
    var maxWorkerNum = msg["maxWorkerNum"];
    var curWorkerCount = self.jobWorkers.length;
    var useWorkerCount = typeof maxWorkerNum === "number" ? Math.min(maxWorkerNum, curWorkerCount) : curWorkerCount;
    msg["doneFlags"] = new Array(useWorkerCount).fill(false);
    msg["transferables"] = [];
    var broadcastKey = msg["params"] && msg["params"]["broadcastKey"] ? msg["params"]["broadcastKey"] : msg["type"];
    self.lastBroadcasts["delete"](broadcastKey);
    self.lastBroadcasts.set(broadcastKey, msg);
  }

  var _iteratorNormalCompletion8 = true;
  var _didIteratorError8 = false;
  var _iteratorError8 = undefined;

  try {
    for (var _iterator8 = self.jobWorkers[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
      var _w3 = _step8.value;

      _w3.MaybeStartNextJob();
    }
  } catch (err) {
    _didIteratorError8 = true;
    _iteratorError8 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion8 && _iterator8["return"] != null) {
        _iterator8["return"]();
      }
    } finally {
      if (_didIteratorError8) {
        throw _iteratorError8;
      }
    }
  }
}

;