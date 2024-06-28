'use strict';

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var hasInitialised = false;
var runtime = null;

function HandleInitRuntimeMessage(e) {
  var data = e.data;

  if (data && data["type"] === "init-runtime") {
    InitRuntime(data);
    self.removeEventListener("message", HandleInitRuntimeMessage);
  }
}

self.addEventListener("message", HandleInitRuntimeMessage);

self.c3_import = function (url) {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("".concat(url)));
  });
};

function IsAbsoluteURL(url) {
  return /^(?:[a-z\-]+:)?\/\//.test(url) || url.substr(0, 5) === "data:" || url.substr(0, 5) === "blob:";
}

function IsRelativeURL(url) {
  return !IsAbsoluteURL(url);
}

function LoadScripts(scriptsArr) {
  var url, scriptStr, blobUrl, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _url;

  return regeneratorRuntime.async(function LoadScripts$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(scriptsArr.length === 1)) {
            _context.next = 6;
            break;
          }

          url = scriptsArr[0];
          _context.next = 4;
          return regeneratorRuntime.awrap(Promise.resolve().then(function () {
            return _interopRequireWildcard(require("".concat((IsRelativeURL(url) ? "./" : "") + url)));
          }));

        case 4:
          _context.next = 42;
          break;

        case 6:
          scriptStr = scriptsArr.map(function (url) {
            return "import \"".concat(IsRelativeURL(url) ? "./" : "").concat(url, "\";");
          }).join("\n");
          blobUrl = URL.createObjectURL(new Blob([scriptStr], {
            type: "application/javascript"
          }));
          _context.prev = 8;
          _context.next = 11;
          return regeneratorRuntime.awrap(Promise.resolve().then(function () {
            return _interopRequireWildcard(require("".concat(blobUrl)));
          }));

        case 11:
          _context.next = 42;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](8);
          console.warn("[Construct] Unable to import script from blob: URL. Falling back to loading scripts sequentially, which could significantly increase loading time. Make sure blob: URLs are allowed for best performance.", _context.t0);
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 19;
          _iterator = scriptsArr[Symbol.iterator]();

        case 21:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context.next = 28;
            break;
          }

          _url = _step.value;
          _context.next = 25;
          return regeneratorRuntime.awrap(Promise.resolve().then(function () {
            return _interopRequireWildcard(require("".concat((IsRelativeURL(_url) ? "./" : "") + _url)));
          }));

        case 25:
          _iteratorNormalCompletion = true;
          _context.next = 21;
          break;

        case 28:
          _context.next = 34;
          break;

        case 30:
          _context.prev = 30;
          _context.t1 = _context["catch"](19);
          _didIteratorError = true;
          _iteratorError = _context.t1;

        case 34:
          _context.prev = 34;
          _context.prev = 35;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 37:
          _context.prev = 37;

          if (!_didIteratorError) {
            _context.next = 40;
            break;
          }

          throw _iteratorError;

        case 40:
          return _context.finish(37);

        case 41:
          return _context.finish(34);

        case 42:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[8, 13], [19, 30, 34, 42], [35,, 37, 41]]);
}

function InitRuntime(data) {
  var messagePort, runtimeBaseUrl, exportType, workerDependencyScripts, runOnStartupFunctions, engineScripts, scriptsStatus, mainProjectScript, allProjectScripts, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _step2$value, originalUrl, loadUrl, msg;

  return regeneratorRuntime.async(function InitRuntime$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (!hasInitialised) {
            _context2.next = 2;
            break;
          }

          throw new Error("already initialised");

        case 2:
          hasInitialised = true;
          messagePort = data["messagePort"];
          runtimeBaseUrl = data["runtimeBaseUrl"];
          exportType = data["exportType"];
          self.devicePixelRatio = data["devicePixelRatio"];
          workerDependencyScripts = data["workerDependencyScripts"].map(function (urlOrBlob) {
            var url = urlOrBlob;
            if (urlOrBlob instanceof Blob) url = URL.createObjectURL(urlOrBlob);else url = new URL(url, runtimeBaseUrl).toString();
            return url;
          });
          runOnStartupFunctions = [];

          self.runOnStartup = function runOnStartup(f) {
            if (typeof f !== "function") throw new Error("runOnStartup called without a function");
            runOnStartupFunctions.push(f);
          };

          engineScripts = data["engineScripts"].map(function (url) {
            return new URL(url, runtimeBaseUrl).toString();
          });
          _context2.prev = 11;
          _context2.next = 14;
          return regeneratorRuntime.awrap(LoadScripts([].concat(_toConsumableArray(workerDependencyScripts), _toConsumableArray(engineScripts))));

        case 14:
          _context2.next = 20;
          break;

        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](11);
          console.error("[C3 runtime] Failed to load all engine scripts in worker: ", _context2.t0);
          return _context2.abrupt("return");

        case 20:
          scriptsStatus = data["projectScriptsStatus"];
          self["C3_ProjectScriptsStatus"] = scriptsStatus;
          mainProjectScript = data["mainProjectScript"];
          allProjectScripts = data["projectScripts"];
          _iteratorNormalCompletion2 = true;
          _didIteratorError2 = false;
          _iteratorError2 = undefined;
          _context2.prev = 27;
          _iterator2 = allProjectScripts[Symbol.iterator]();

        case 29:
          if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
            _context2.next = 50;
            break;
          }

          _step2$value = _slicedToArray(_step2.value, 2), originalUrl = _step2$value[0], loadUrl = _step2$value[1];
          if (!loadUrl) loadUrl = originalUrl;

          if (!(originalUrl === mainProjectScript)) {
            _context2.next = 44;
            break;
          }

          _context2.prev = 33;
          _context2.next = 36;
          return regeneratorRuntime.awrap(LoadScripts([loadUrl]));

        case 36:
          if (exportType === "preview" && !scriptsStatus[originalUrl]) ReportProjectMainScriptError(originalUrl, "main script did not run to completion", messagePort);
          _context2.next = 42;
          break;

        case 39:
          _context2.prev = 39;
          _context2.t1 = _context2["catch"](33);
          ReportProjectMainScriptError(originalUrl, _context2.t1, messagePort);

        case 42:
          _context2.next = 47;
          break;

        case 44:
          if (!(originalUrl === "scriptsInEvents.js" || originalUrl.endsWith("/scriptsInEvents.js"))) {
            _context2.next = 47;
            break;
          }

          _context2.next = 47;
          return regeneratorRuntime.awrap(LoadScripts([loadUrl]));

        case 47:
          _iteratorNormalCompletion2 = true;
          _context2.next = 29;
          break;

        case 50:
          _context2.next = 56;
          break;

        case 52:
          _context2.prev = 52;
          _context2.t2 = _context2["catch"](27);
          _didIteratorError2 = true;
          _iteratorError2 = _context2.t2;

        case 56:
          _context2.prev = 56;
          _context2.prev = 57;

          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }

        case 59:
          _context2.prev = 59;

          if (!_didIteratorError2) {
            _context2.next = 62;
            break;
          }

          throw _iteratorError2;

        case 62:
          return _context2.finish(59);

        case 63:
          return _context2.finish(56);

        case 64:
          data["runOnStartupFunctions"] = runOnStartupFunctions;

          if (!(exportType === "preview" && _typeof(self.C3.ScriptsInEvents) !== "object")) {
            _context2.next = 70;
            break;
          }

          msg = "Failed to load JavaScript code used in events. Check all your JavaScript code has valid syntax.";
          console.error("[C3 runtime] " + msg);
          messagePort.postMessage({
            "type": "alert-error",
            "message": msg
          });
          return _context2.abrupt("return");

        case 70:
          messagePort.postMessage({
            "type": "creating-runtime"
          });
          runtime = self["C3_CreateRuntime"](data);
          _context2.next = 74;
          return regeneratorRuntime.awrap(self["C3_InitRuntime"](runtime, data));

        case 74:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[11, 16], [27, 52, 56, 64], [33, 39], [57,, 59, 63]]);
}

function ReportProjectMainScriptError(url, err, messagePort) {
  console.error("[Preview] Failed to load project main script (".concat(url, "): "), err);
  var msg = "Failed to load project main script (".concat(url, "). Check all your JavaScript code has valid syntax. Press F12 and check the console for error details.");
  messagePort.postMessage({
    "type": "alert-error",
    "message": msg
  });
}

;