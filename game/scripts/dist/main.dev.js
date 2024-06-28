'use strict';

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

{
  window.DOMHandler =
  /*#__PURE__*/
  function () {
    function DOMHandler(iRuntime, componentId) {
      var _this = this;

      _classCallCheck(this, DOMHandler);

      this._iRuntime = iRuntime;
      this._componentId = componentId;
      this._hasTickCallback = false;

      this._tickCallback = function () {
        return _this.Tick();
      };
    }

    _createClass(DOMHandler, [{
      key: "Attach",
      value: function Attach() {}
    }, {
      key: "PostToRuntime",
      value: function PostToRuntime(handler, data, dispatchOpts, transferables) {
        this._iRuntime.PostToRuntimeComponent(this._componentId, handler, data, dispatchOpts, transferables);
      }
    }, {
      key: "PostToRuntimeAsync",
      value: function PostToRuntimeAsync(handler, data, dispatchOpts, transferables) {
        return this._iRuntime.PostToRuntimeComponentAsync(this._componentId, handler, data, dispatchOpts, transferables);
      }
    }, {
      key: "_PostToRuntimeMaybeSync",
      value: function _PostToRuntimeMaybeSync(name, data, dispatchOpts) {
        if (this._iRuntime.UsesWorker()) this.PostToRuntime(name, data, dispatchOpts);else this._iRuntime._GetLocalRuntime()["_OnMessageFromDOM"]({
          "type": "event",
          "component": this._componentId,
          "handler": name,
          "dispatchOpts": dispatchOpts || null,
          "data": data,
          "responseId": null
        });
      }
    }, {
      key: "AddRuntimeMessageHandler",
      value: function AddRuntimeMessageHandler(handler, func) {
        this._iRuntime.AddRuntimeComponentMessageHandler(this._componentId, handler, func);
      }
    }, {
      key: "AddRuntimeMessageHandlers",
      value: function AddRuntimeMessageHandlers(list) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = _slicedToArray(_step.value, 2),
                handler = _step$value[0],
                func = _step$value[1];

            this.AddRuntimeMessageHandler(handler, func);
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
      }
    }, {
      key: "GetRuntimeInterface",
      value: function GetRuntimeInterface() {
        return this._iRuntime;
      }
    }, {
      key: "GetComponentID",
      value: function GetComponentID() {
        return this._componentId;
      }
    }, {
      key: "_StartTicking",
      value: function _StartTicking() {
        if (this._hasTickCallback) return;

        this._iRuntime._AddRAFCallback(this._tickCallback);

        this._hasTickCallback = true;
      }
    }, {
      key: "_StopTicking",
      value: function _StopTicking() {
        if (!this._hasTickCallback) return;

        this._iRuntime._RemoveRAFCallback(this._tickCallback);

        this._hasTickCallback = false;
      }
    }, {
      key: "Tick",
      value: function Tick() {}
    }]);

    return DOMHandler;
  }();

  window.RateLimiter =
  /*#__PURE__*/
  function () {
    function RateLimiter(callback, interval) {
      var _this2 = this;

      _classCallCheck(this, RateLimiter);

      this._callback = callback;
      this._interval = interval;
      this._timerId = -1;
      this._lastCallTime = -Infinity;

      this._timerCallFunc = function () {
        return _this2._OnTimer();
      };

      this._ignoreReset = false;
      this._canRunImmediate = false;
    }

    _createClass(RateLimiter, [{
      key: "SetCanRunImmediate",
      value: function SetCanRunImmediate(c) {
        this._canRunImmediate = !!c;
      }
    }, {
      key: "Call",
      value: function Call() {
        if (this._timerId !== -1) return;
        var nowTime = Date.now();
        var timeSinceLastCall = nowTime - this._lastCallTime;
        var interval = this._interval;

        if (timeSinceLastCall >= interval && this._canRunImmediate) {
          this._lastCallTime = nowTime;

          this._RunCallback();
        } else this._timerId = self.setTimeout(this._timerCallFunc, Math.max(interval - timeSinceLastCall, 4));
      }
    }, {
      key: "_RunCallback",
      value: function _RunCallback() {
        this._ignoreReset = true;

        this._callback();

        this._ignoreReset = false;
      }
    }, {
      key: "Reset",
      value: function Reset() {
        if (this._ignoreReset) return;

        this._CancelTimer();

        this._lastCallTime = Date.now();
      }
    }, {
      key: "_OnTimer",
      value: function _OnTimer() {
        this._timerId = -1;
        this._lastCallTime = Date.now();

        this._RunCallback();
      }
    }, {
      key: "_CancelTimer",
      value: function _CancelTimer() {
        if (this._timerId !== -1) {
          self.clearTimeout(this._timerId);
          this._timerId = -1;
        }
      }
    }, {
      key: "Release",
      value: function Release() {
        this._CancelTimer();

        this._callback = null;
        this._timerCallFunc = null;
      }
    }]);

    return RateLimiter;
  }();
}
;
'use strict';

{
  var ElementState =
  /*#__PURE__*/
  function () {
    function ElementState(elem) {
      _classCallCheck(this, ElementState);

      this._elem = elem;
      this._hadFirstUpdate = false;
      this._isVisibleFlag = true;
      this._wantHtmlIndex = -1;
      this._actualHtmlIndex = -1;
      this._htmlZIndex = -1;
    }

    _createClass(ElementState, [{
      key: "SetVisibleFlag",
      value: function SetVisibleFlag(f) {
        this._isVisibleFlag = !!f;
      }
    }, {
      key: "GetVisibleFlag",
      value: function GetVisibleFlag() {
        return this._isVisibleFlag;
      }
    }, {
      key: "HadFirstUpdate",
      value: function HadFirstUpdate() {
        return this._hadFirstUpdate;
      }
    }, {
      key: "SetHadFirstUpdate",
      value: function SetHadFirstUpdate() {
        this._hadFirstUpdate = true;
      }
    }, {
      key: "GetWantHTMLIndex",
      value: function GetWantHTMLIndex() {
        return this._wantHtmlIndex;
      }
    }, {
      key: "SetWantHTMLIndex",
      value: function SetWantHTMLIndex(i) {
        this._wantHtmlIndex = i;
      }
    }, {
      key: "GetActualHTMLIndex",
      value: function GetActualHTMLIndex() {
        return this._actualHtmlIndex;
      }
    }, {
      key: "SetActualHTMLIndex",
      value: function SetActualHTMLIndex(i) {
        this._actualHtmlIndex = i;
      }
    }, {
      key: "SetHTMLZIndex",
      value: function SetHTMLZIndex(z) {
        this._htmlZIndex = z;
      }
    }, {
      key: "GetHTMLZIndex",
      value: function GetHTMLZIndex() {
        return this._htmlZIndex;
      }
    }, {
      key: "GetElement",
      value: function GetElement() {
        return this._elem;
      }
    }]);

    return ElementState;
  }();

  window.DOMElementHandler =
  /*#__PURE__*/
  function (_self$DOMHandler) {
    _inherits(DOMElementHandler, _self$DOMHandler);

    function DOMElementHandler(iRuntime, componentId) {
      var _this3;

      _classCallCheck(this, DOMElementHandler);

      _this3 = _possibleConstructorReturn(this, _getPrototypeOf(DOMElementHandler).call(this, iRuntime, componentId));
      _this3._elementMap = new Map();
      _this3._autoAttach = true;

      _this3.AddRuntimeMessageHandlers([["create", function (e) {
        return _this3._OnCreate(e);
      }], ["destroy", function (e) {
        return _this3._OnDestroy(e);
      }], ["set-visible", function (e) {
        return _this3._OnSetVisible(e);
      }], ["update-position", function (e) {
        return _this3._OnUpdatePosition(e);
      }], ["update-state", function (e) {
        return _this3._OnUpdateState(e);
      }], ["focus", function (e) {
        return _this3._OnSetFocus(e);
      }], ["set-css-style", function (e) {
        return _this3._OnSetCssStyle(e);
      }], ["set-attribute", function (e) {
        return _this3._OnSetAttribute(e);
      }], ["remove-attribute", function (e) {
        return _this3._OnRemoveAttribute(e);
      }]]);

      _this3.AddDOMElementMessageHandler("get-element", function (elem) {
        return elem;
      });

      return _this3;
    }

    _createClass(DOMElementHandler, [{
      key: "SetAutoAttach",
      value: function SetAutoAttach(e) {
        this._autoAttach = !!e;
      }
    }, {
      key: "AddDOMElementMessageHandler",
      value: function AddDOMElementMessageHandler(handler, func) {
        var _this4 = this;

        this.AddRuntimeMessageHandler(handler, function (e) {
          var elementId = e["elementId"];

          var elem = _this4.GetElementById(elementId);

          return func(elem, e);
        });
      }
    }, {
      key: "_OnCreate",
      value: function _OnCreate(e) {
        var _this5 = this;

        var elementId = e["elementId"];
        var elem = this.CreateElement(elementId, e);
        var elementState = new ElementState(elem);

        this._elementMap.set(elementId, elementState);

        elem.style.boxSizing = "border-box";
        elem.style.display = "none";
        elementState.SetVisibleFlag(e["isVisible"]);

        var focusElem = this._GetFocusElement(elem);

        focusElem.addEventListener("focus", function (e) {
          return _this5._OnFocus(elementId);
        });
        focusElem.addEventListener("blur", function (e) {
          return _this5._OnBlur(elementId);
        });
        var wantHtmlIndex = e["htmlIndex"];
        elementState.SetWantHTMLIndex(wantHtmlIndex);
        elementState.SetHTMLZIndex(e["htmlZIndex"]);

        if (this._autoAttach) {
          var actualHtmlIndex = this.GetRuntimeInterface().GetAvailableHTMLIndex(wantHtmlIndex);
          elementState.SetActualHTMLIndex(actualHtmlIndex);
          var parent = this.GetRuntimeInterface().GetHTMLWrapElement(actualHtmlIndex);
          parent.appendChild(elem);
        }
      }
    }, {
      key: "CreateElement",
      value: function CreateElement(elementId, e) {
        throw new Error("required override");
      }
    }, {
      key: "DestroyElement",
      value: function DestroyElement(elem) {}
    }, {
      key: "_OnDestroy",
      value: function _OnDestroy(e) {
        var elementId = e["elementId"];
        var elem = this.GetElementById(elementId);
        this.DestroyElement(elem);
        if (this._autoAttach) elem.parentElement.removeChild(elem);

        this._elementMap["delete"](elementId);
      }
    }, {
      key: "PostToRuntimeElement",
      value: function PostToRuntimeElement(handler, elementId, data) {
        if (!data) data = {};
        data["elementId"] = elementId;
        this.PostToRuntime(handler, data);
      }
    }, {
      key: "_PostToRuntimeElementMaybeSync",
      value: function _PostToRuntimeElementMaybeSync(handler, elementId, data) {
        if (!data) data = {};
        data["elementId"] = elementId;

        this._PostToRuntimeMaybeSync(handler, data);
      }
    }, {
      key: "_OnSetVisible",
      value: function _OnSetVisible(e) {
        if (!this._autoAttach) return;

        var elemState = this._elementMap.get(e["elementId"]);

        var elem = elemState.GetElement();
        if (elemState.HadFirstUpdate()) elem.style.display = e["isVisible"] ? "" : "none";else elemState.SetVisibleFlag(e["isVisible"]);
      }
    }, {
      key: "_OnUpdatePosition",
      value: function _OnUpdatePosition(e) {
        if (!this._autoAttach) return;

        var elemState = this._elementMap.get(e["elementId"]);

        var elem = elemState.GetElement();
        var iRuntime = this.GetRuntimeInterface();
        elem.style.left = e["left"] + "px";
        elem.style.top = e["top"] + "px";
        elem.style.width = e["width"] + "px";
        elem.style.height = e["height"] + "px";
        var fontSize = e["fontSize"];
        if (fontSize !== null) elem.style.fontSize = fontSize + "em";
        var wantHtmlIndex = e["htmlIndex"];
        elemState.SetWantHTMLIndex(wantHtmlIndex);
        var actualHtmlIndex = iRuntime.GetAvailableHTMLIndex(wantHtmlIndex);

        if (actualHtmlIndex !== elemState.GetActualHTMLIndex()) {
          elem.remove();
          var parent = iRuntime.GetHTMLWrapElement(actualHtmlIndex);
          parent.appendChild(elem);
          elemState.SetActualHTMLIndex(actualHtmlIndex);

          iRuntime._UpdateHTMLElementsZOrder();
        }

        var htmlZIndex = e["htmlZIndex"];

        if (htmlZIndex !== elemState.GetHTMLZIndex()) {
          elemState.SetHTMLZIndex(htmlZIndex);

          iRuntime._UpdateHTMLElementsZOrder();
        }

        if (!elemState.HadFirstUpdate()) {
          elemState.SetHadFirstUpdate();
          if (elemState.GetVisibleFlag()) elem.style.display = "";
        }
      }
    }, {
      key: "_OnHTMLLayersChanged",
      value: function _OnHTMLLayersChanged() {
        if (!this._autoAttach) return;
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = this._elementMap.values()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var elemState = _step2.value;
            var wantHtmlIndex = this.GetRuntimeInterface().GetAvailableHTMLIndex(elemState.GetWantHTMLIndex());
            var actualHtmlIndex = elemState.GetActualHTMLIndex();

            if (wantHtmlIndex !== -1 && actualHtmlIndex !== -1 && wantHtmlIndex !== actualHtmlIndex) {
              var elem = elemState.GetElement();
              elem.remove();
              var parent = this.GetRuntimeInterface().GetHTMLWrapElement(wantHtmlIndex);
              parent.appendChild(elem);
              elemState.SetActualHTMLIndex(wantHtmlIndex);
            }
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
      }
    }, {
      key: "_GetAllElementStatesForZOrderUpdate",
      value: function _GetAllElementStatesForZOrderUpdate() {
        if (!this._autoAttach) return null;
        return _toConsumableArray(this._elementMap.values());
      }
    }, {
      key: "_OnUpdateState",
      value: function _OnUpdateState(e) {
        var elem = this.GetElementById(e["elementId"]);
        this.UpdateState(elem, e);
      }
    }, {
      key: "UpdateState",
      value: function UpdateState(elem, e) {
        throw new Error("required override");
      }
    }, {
      key: "_GetFocusElement",
      value: function _GetFocusElement(elem) {
        return elem;
      }
    }, {
      key: "_OnFocus",
      value: function _OnFocus(elementId) {
        this.PostToRuntimeElement("elem-focused", elementId);
      }
    }, {
      key: "_OnBlur",
      value: function _OnBlur(elementId) {
        this.PostToRuntimeElement("elem-blurred", elementId);
      }
    }, {
      key: "_OnSetFocus",
      value: function _OnSetFocus(e) {
        var elem = this._GetFocusElement(this.GetElementById(e["elementId"]));

        if (e["focus"]) elem.focus();else elem.blur();
      }
    }, {
      key: "_OnSetCssStyle",
      value: function _OnSetCssStyle(e) {
        var elem = this.GetElementById(e["elementId"]);
        var prop = e["prop"];
        var val = e["val"];
        if (prop.startsWith("--")) elem.style.setProperty(prop, val);else elem.style[prop] = val;
      }
    }, {
      key: "_OnSetAttribute",
      value: function _OnSetAttribute(e) {
        var elem = this.GetElementById(e["elementId"]);
        elem.setAttribute(e["name"], e["val"]);
      }
    }, {
      key: "_OnRemoveAttribute",
      value: function _OnRemoveAttribute(e) {
        var elem = this.GetElementById(e["elementId"]);
        elem.removeAttribute(e["name"]);
      }
    }, {
      key: "GetElementById",
      value: function GetElementById(elementId) {
        var elementState = this._elementMap.get(elementId);

        if (!elementState) throw new Error("no element with id ".concat(elementId));
        return elementState.GetElement();
      }
    }]);

    return DOMElementHandler;
  }(self.DOMHandler);
}
;
'use strict';

{
  var AddScript = function AddScript(url) {
    var elem = document.createElement("script");
    elem.async = false;
    elem.type = "module";
    if (url.isStringSrc) return new Promise(function (resolve) {
      var resolveName = "c3_resolve_" + resolveCounter;
      ++resolveCounter;
      self[resolveName] = resolve;
      elem.textContent = url.str + "\n\nself[\"".concat(resolveName, "\"]();");
      document.head.appendChild(elem);
    });else return new Promise(function (resolve, reject) {
      elem.onload = resolve;
      elem.onerror = reject;
      elem.src = url;
      document.head.appendChild(elem);
    });
  };

  var CheckSupportsWorkerMode = function CheckSupportsWorkerMode() {
    var workerScript, isWorkerModuleSupported, workerScriptBlob, w, result;
    return regeneratorRuntime.async(function CheckSupportsWorkerMode$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(!navigator["userActivation"] || typeof OffscreenCanvas === "undefined")) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", false);

          case 2:
            _context.prev = 2;
            workerScript = "\n\tself.addEventListener(\"message\", () =>\n\t{\n\t\ttry {\n\t\t\tconst offscreenCanvas = new OffscreenCanvas(32, 32);\n\t\t\tconst gl = offscreenCanvas.getContext(\"webgl\");\n\t\t\tself.postMessage(!!gl);\n\t\t}\n\t\tcatch (err)\n\t\t{\n\t\t\tconsole.warn(\"Feature detection worker error:\", err);\n\t\t\tself.postMessage(false);\n\t\t}\n\t});";
            isWorkerModuleSupported = false;
            workerScriptBlob = new Blob([workerScript], {
              "type": "text/javascript"
            });
            w = new Worker(URL.createObjectURL(workerScriptBlob), {
              get type() {
                isWorkerModuleSupported = true;
              }

            });
            _context.next = 9;
            return regeneratorRuntime.awrap(new Promise(function (resolve) {
              w.addEventListener("message", function (e) {
                w.terminate();
                resolve(e.data);
              });
              w.postMessage("");
            }));

          case 9:
            result = _context.sent;
            return _context.abrupt("return", isWorkerModuleSupported && result);

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](2);
            console.warn("Error feature detecting worker mode: ", _context.t0);
            return _context.abrupt("return", false);

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[2, 13]]);
  };

  var BlobToString = function BlobToString(blob) {
    var arrayBuffer, textDecoder;
    return regeneratorRuntime.async(function BlobToString$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(BlobToArrayBuffer(blob));

          case 2:
            arrayBuffer = _context2.sent;
            textDecoder = new TextDecoder("utf-8");
            return _context2.abrupt("return", textDecoder.decode(arrayBuffer));

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    });
  };

  var BlobToArrayBuffer = function BlobToArrayBuffer(blob) {
    return new Promise(function (resolve, reject) {
      var fileReader = new FileReader();

      fileReader.onload = function (e) {
        return resolve(e.target.result);
      };

      fileReader.onerror = function (err) {
        return reject(err);
      };

      fileReader.readAsArrayBuffer(blob);
    });
  };

  var IsWebViewExportType = function IsWebViewExportType(exportType) {
    return WEBVIEW_EXPORT_TYPES.has(exportType);
  };

  var isiOSLike = /(iphone|ipod|ipad|macos|macintosh|mac os x)/i.test(navigator.userAgent);
  var isAndroid = /android/i.test(navigator.userAgent);
  var isSafari = /safari/i.test(navigator.userAgent) && !/(chrome|chromium|edg\/|OPR\/|nwjs)/i.test(navigator.userAgent);
  var resolveCounter = 0;
  var tmpAudio = new Audio();
  var supportedAudioFormats = {
    "audio/webm; codecs=opus": !!tmpAudio.canPlayType("audio/webm; codecs=opus"),
    "audio/ogg; codecs=opus": !!tmpAudio.canPlayType("audio/ogg; codecs=opus"),
    "audio/webm; codecs=vorbis": !!tmpAudio.canPlayType("audio/webm; codecs=vorbis"),
    "audio/ogg; codecs=vorbis": !!tmpAudio.canPlayType("audio/ogg; codecs=vorbis"),
    "audio/mp4": !!tmpAudio.canPlayType("audio/mp4"),
    "audio/mpeg": !!tmpAudio.canPlayType("audio/mpeg")
  };
  tmpAudio = null;
  var queuedArrayBufferReads = [];
  var activeArrayBufferReads = 0;
  var MAX_ARRAYBUFFER_READS = 8;
  window["RealFile"] = window["File"];
  var domHandlerClasses = [];
  var runtimeEventHandlers = new Map();
  var pendingResponsePromises = new Map();
  var nextResponseId = 0;
  var runOnStartupFunctions = [];

  self.runOnStartup = function runOnStartup(f) {
    if (typeof f !== "function") throw new Error("runOnStartup called without a function");
    runOnStartupFunctions.push(f);
  };

  var WEBVIEW_EXPORT_TYPES = new Set(["cordova", "playable-ad", "instant-games"]);
  var isWrapperFullscreen = false;

  window.RuntimeInterface =
  /*#__PURE__*/
  function () {
    function RuntimeInterface(opts) {
      var _this6 = this;

      _classCallCheck(this, RuntimeInterface);

      this._useWorker = opts.useWorker;
      this._messageChannelPort = null;
      this._runtimeBaseUrl = "";
      this._scriptFolder = opts.scriptFolder;
      this._workerScriptURLs = {};
      this._worker = null;
      this._localRuntime = null;
      this._domHandlers = [];
      this._runtimeDomHandler = null;
      this._isFirstSizeUpdate = true;
      this._canvasLayers = [];
      this._pendingRemoveElements = [];
      this._pendingUpdateHTMLZOrder = false;

      this._updateHTMLZOrderRAFCallback = function () {
        return _this6._DoUpdateHTMLElementsZOrder();
      };

      this._isExportingToVideo = false;
      this._exportToVideoDuration = 0;
      this._jobScheduler = null;
      this._rafId = -1;

      this._rafFunc = function () {
        return _this6._OnRAFCallback();
      };

      this._rafCallbacks = new Set();
      this._wrapperInitResolve = null;
      this._wrapperComponentIds = [];
      this._exportType = opts.exportType;
      this._isFileProtocol = location.protocol.substr(0, 4) === "file";
      if (this._exportType === "playable-ad" || this._exportType === "instant-games") this._useWorker = false;
      if (this._exportType === "cordova" && this._useWorker) if (isAndroid) {
        var chromeVer = /Chrome\/(\d+)/i.exec(navigator.userAgent);
        if (!chromeVer || !(parseInt(chromeVer[1], 10) >= 90)) this._useWorker = false;
      }
      if (this.IsAnyWebView2Wrapper()) self["chrome"]["webview"].addEventListener("message", function (e) {
        return _this6._OnWrapperMessage(e.data);
      });else if (this._exportType === "macos-wkwebview") self["C3WrapperOnMessage"] = function (msg) {
        return _this6._OnWrapperMessage(msg);
      };
      this._localFileBlobs = null;
      this._localFileStrings = null;
      if (this._exportType === "html5" && !window.isSecureContext) console.warn("[Construct] Warning: the browser indicates this is not a secure context. Some features may be unavailable. Use secure (HTTPS) hosting to ensure all features are available.");
      this.AddRuntimeComponentMessageHandler("canvas", "update-size", function (e) {
        return _this6._OnUpdateCanvasSize(e);
      });
      this.AddRuntimeComponentMessageHandler("canvas", "set-html-layer-count", function (e) {
        return _this6["_OnSetHTMLLayerCount"](e);
      });
      this.AddRuntimeComponentMessageHandler("canvas", "cleanup-html-layers", function () {
        return _this6._OnCleanUpHTMLLayers();
      });
      this.AddRuntimeComponentMessageHandler("runtime", "cordova-fetch-local-file", function (e) {
        return _this6._OnCordovaFetchLocalFile(e);
      });
      this.AddRuntimeComponentMessageHandler("runtime", "create-job-worker", function (e) {
        return _this6._OnCreateJobWorker(e);
      });
      this.AddRuntimeComponentMessageHandler("runtime", "send-wrapper-extension-message", function (e) {
        return _this6._OnSendWrapperExtensionMessage(e);
      });
      if (this._exportType === "cordova") document.addEventListener("deviceready", function () {
        return _this6._Init(opts);
      });else this._Init(opts);
    }

    _createClass(RuntimeInterface, [{
      key: "Release",
      value: function Release() {
        this._CancelAnimationFrame();

        if (this._messageChannelPort) {
          this._messageChannelPort.onmessage = null;
          this._messageChannelPort = null;
        }

        if (this._worker) {
          this._worker.terminate();

          this._worker = null;
        }

        if (this._localRuntime) {
          this._localRuntime.Release();

          this._localRuntime = null;
        }

        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = this._canvasLayers[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var _step3$value = _step3.value,
                canvas = _step3$value.canvas,
                htmlWrap = _step3$value.htmlWrap;
            canvas.remove();
            htmlWrap.remove();
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

        this._canvasLayers.length = 0;
      }
    }, {
      key: "GetMainCanvas",
      value: function GetMainCanvas() {
        return this._canvasLayers[0].canvas;
      }
    }, {
      key: "GetAvailableHTMLIndex",
      value: function GetAvailableHTMLIndex(index) {
        return Math.min(index, this._canvasLayers.length - 1);
      }
    }, {
      key: "GetHTMLWrapElement",
      value: function GetHTMLWrapElement(index) {
        if (index < 0 || index >= this._canvasLayers.length) throw new RangeError("invalid canvas layer");
        return this._canvasLayers[index].htmlWrap;
      }
    }, {
      key: "GetRuntimeBaseURL",
      value: function GetRuntimeBaseURL() {
        return this._runtimeBaseUrl;
      }
    }, {
      key: "UsesWorker",
      value: function UsesWorker() {
        return this._useWorker;
      }
    }, {
      key: "GetExportType",
      value: function GetExportType() {
        return this._exportType;
      }
    }, {
      key: "IsFileProtocol",
      value: function IsFileProtocol() {
        return this._isFileProtocol;
      }
    }, {
      key: "GetScriptFolder",
      value: function GetScriptFolder() {
        return this._scriptFolder;
      }
    }, {
      key: "IsiOSCordova",
      value: function IsiOSCordova() {
        return isiOSLike && this._exportType === "cordova";
      }
    }, {
      key: "IsiOSWebView",
      value: function IsiOSWebView() {
        var ua = navigator.userAgent;
        return isiOSLike && IsWebViewExportType(this._exportType) || navigator["standalone"] || /crios\/|fxios\/|edgios\//i.test(ua);
      }
    }, {
      key: "IsAndroid",
      value: function IsAndroid() {
        return isAndroid;
      }
    }, {
      key: "IsAndroidWebView",
      value: function IsAndroidWebView() {
        return isAndroid && IsWebViewExportType(this._exportType);
      }
    }, {
      key: "IsWindowsWebView2",
      value: function IsWindowsWebView2() {
        return this._exportType === "windows-webview2" || !!(this._exportType === "preview" && window["chrome"] && window["chrome"]["webview"] && window["chrome"]["webview"]["postMessage"]);
      }
    }, {
      key: "IsAnyWebView2Wrapper",
      value: function IsAnyWebView2Wrapper() {
        return this.IsWindowsWebView2() || this._exportType === "xbox-uwp-webview2";
      }
    }, {
      key: "_Init",
      value: function _Init(opts) {
        var _this7 = this;

        var isWorkerModeSupported, result, i, len, src, frameNum, origin, _i2, messageChannel;

        return regeneratorRuntime.async(function _Init$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this._useWorker) {
                  _context3.next = 5;
                  break;
                }

                _context3.next = 3;
                return regeneratorRuntime.awrap(CheckSupportsWorkerMode());

              case 3:
                isWorkerModeSupported = _context3.sent;
                if (!isWorkerModeSupported) this._useWorker = false;

              case 5:
                if (!(this._exportType === "macos-wkwebview")) {
                  _context3.next = 9;
                  break;
                }

                this._SendWrapperMessage({
                  "type": "ready"
                });

                _context3.next = 15;
                break;

              case 9:
                if (!this.IsAnyWebView2Wrapper()) {
                  _context3.next = 15;
                  break;
                }

                this._SetupWebView2Polyfills();

                _context3.next = 13;
                return regeneratorRuntime.awrap(this._InitWrapper());

              case 13:
                result = _context3.sent;
                this._wrapperComponentIds = result["registeredComponentIds"];

              case 15:
                if (!(this._exportType === "playable-ad")) {
                  _context3.next = 22;
                  break;
                }

                this._localFileBlobs = self["c3_base64files"];
                this._localFileStrings = {};
                _context3.next = 20;
                return regeneratorRuntime.awrap(this._ConvertDataUrisToBlobs());

              case 20:
                for (i = 0, len = opts.engineScripts.length; i < len; ++i) {
                  src = opts.engineScripts[i];
                  if (this._localFileStrings.hasOwnProperty(src)) opts.engineScripts[i] = {
                    isStringSrc: true,
                    str: this._localFileStrings[src]
                  };else if (this._localFileBlobs.hasOwnProperty(src)) opts.engineScripts[i] = URL.createObjectURL(this._localFileBlobs[src]);
                }

                opts.workerDependencyScripts = [];

              case 22:
                if (this._exportType === "nwjs" && self["nw"] && self["nw"]["App"]["manifest"]["c3-steam-mode"]) {
                  frameNum = 0;

                  this._AddRAFCallback(function () {
                    frameNum++;
                    document.body.style.opacity = frameNum % 2 === 0 ? "1" : "0.999";
                  });
                }

                if (opts.runtimeBaseUrl) this._runtimeBaseUrl = opts.runtimeBaseUrl;else {
                  origin = location.origin;
                  this._runtimeBaseUrl = (origin === "null" ? "file:///" : origin) + location.pathname;
                  _i2 = this._runtimeBaseUrl.lastIndexOf("/");
                  if (_i2 !== -1) this._runtimeBaseUrl = this._runtimeBaseUrl.substr(0, _i2 + 1);
                }
                if (opts.workerScripts) this._workerScriptURLs = opts.workerScripts;
                messageChannel = new MessageChannel();
                this._messageChannelPort = messageChannel.port1;

                this._messageChannelPort.onmessage = function (e) {
                  return _this7["_OnMessageFromRuntime"](e.data);
                };

                if (window["c3_addPortMessageHandler"]) window["c3_addPortMessageHandler"](function (e) {
                  return _this7._OnMessageFromDebugger(e);
                });
                this._jobScheduler = new self.JobSchedulerDOM(this);
                _context3.next = 32;
                return regeneratorRuntime.awrap(this._jobScheduler.Init());

              case 32:
                if (_typeof(window["StatusBar"]) === "object") window["StatusBar"]["hide"]();

                if (!(_typeof(window["AndroidFullScreen"]) === "object")) {
                  _context3.next = 42;
                  break;
                }

                _context3.prev = 34;
                _context3.next = 37;
                return regeneratorRuntime.awrap(new Promise(function (resolve, reject) {
                  window["AndroidFullScreen"]["immersiveMode"](resolve, reject);
                }));

              case 37:
                _context3.next = 42;
                break;

              case 39:
                _context3.prev = 39;
                _context3.t0 = _context3["catch"](34);
                console.error("Failed to enter Android immersive mode: ", _context3.t0);

              case 42:
                if (!this._useWorker) {
                  _context3.next = 47;
                  break;
                }

                _context3.next = 45;
                return regeneratorRuntime.awrap(this._InitWorker(opts, messageChannel.port2));

              case 45:
                _context3.next = 49;
                break;

              case 47:
                _context3.next = 49;
                return regeneratorRuntime.awrap(this._InitDOM(opts, messageChannel.port2));

              case 49:
              case "end":
                return _context3.stop();
            }
          }
        }, null, this, [[34, 39]]);
      }
    }, {
      key: "_GetWorkerURL",
      value: function _GetWorkerURL(url) {
        var ret;
        if (this._workerScriptURLs.hasOwnProperty(url)) ret = this._workerScriptURLs[url];else if (url.endsWith("/workermain.js") && this._workerScriptURLs.hasOwnProperty("workermain.js")) ret = this._workerScriptURLs["workermain.js"];else if (this._exportType === "playable-ad" && this._localFileBlobs.hasOwnProperty(url)) ret = this._localFileBlobs[url];else ret = url;
        if (ret instanceof Blob) ret = URL.createObjectURL(ret);
        return ret;
      }
    }, {
      key: "CreateWorker",
      value: function CreateWorker(url, baseUrl, workerOpts) {
        var filePath, arrayBuffer, blob, absUrl, isCrossOrigin, response, _blob;

        return regeneratorRuntime.async(function CreateWorker$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!url.startsWith("blob:")) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt("return", new Worker(url, workerOpts));

              case 2:
                if (!(this._exportType === "cordova" && this._isFileProtocol)) {
                  _context4.next = 10;
                  break;
                }

                filePath = "";
                if (workerOpts.isC3MainWorker) filePath = url;else filePath = this._scriptFolder + url;
                _context4.next = 7;
                return regeneratorRuntime.awrap(this.CordovaFetchLocalFileAsArrayBuffer(filePath));

              case 7:
                arrayBuffer = _context4.sent;
                blob = new Blob([arrayBuffer], {
                  type: "application/javascript"
                });
                return _context4.abrupt("return", new Worker(URL.createObjectURL(blob), workerOpts));

              case 10:
                absUrl = new URL(url, baseUrl);
                isCrossOrigin = location.origin !== absUrl.origin;

                if (!isCrossOrigin) {
                  _context4.next = 24;
                  break;
                }

                _context4.next = 15;
                return regeneratorRuntime.awrap(fetch(absUrl));

              case 15:
                response = _context4.sent;

                if (response.ok) {
                  _context4.next = 18;
                  break;
                }

                throw new Error("failed to fetch worker script");

              case 18:
                _context4.next = 20;
                return regeneratorRuntime.awrap(response.blob());

              case 20:
                _blob = _context4.sent;
                return _context4.abrupt("return", new Worker(URL.createObjectURL(_blob), workerOpts));

              case 24:
                return _context4.abrupt("return", new Worker(absUrl, workerOpts));

              case 25:
              case "end":
                return _context4.stop();
            }
          }
        }, null, this);
      }
    }, {
      key: "_GetWindowInnerWidth",
      value: function _GetWindowInnerWidth() {
        return Math.max(window.innerWidth, 1);
      }
    }, {
      key: "_GetWindowInnerHeight",
      value: function _GetWindowInnerHeight() {
        return Math.max(window.innerHeight, 1);
      }
    }, {
      key: "_GetCommonRuntimeOptions",
      value: function _GetCommonRuntimeOptions(opts) {
        return {
          "runtimeBaseUrl": this._runtimeBaseUrl,
          "previewUrl": location.href,
          "windowInnerWidth": this._GetWindowInnerWidth(),
          "windowInnerHeight": this._GetWindowInnerHeight(),
          "devicePixelRatio": window.devicePixelRatio,
          "isFullscreen": RuntimeInterface.IsDocumentFullscreen(),
          "projectData": opts.projectData,
          "previewImageBlobs": window["cr_previewImageBlobs"] || this._localFileBlobs,
          "previewProjectFileBlobs": window["cr_previewProjectFileBlobs"],
          "previewProjectFileSWUrls": window["cr_previewProjectFiles"],
          "swClientId": window["cr_swClientId"] || "",
          "exportType": opts.exportType,
          "isDebug": new URLSearchParams(self.location.search).has("debug"),
          "ife": !!self.ife,
          "jobScheduler": this._jobScheduler.GetPortData(),
          "supportedAudioFormats": supportedAudioFormats,
          "opusWasmScriptUrl": window["cr_opusWasmScriptUrl"] || this._scriptFolder + "opus.wasm.js",
          "opusWasmBinaryUrl": window["cr_opusWasmBinaryUrl"] || this._scriptFolder + "opus.wasm.wasm",
          "isFileProtocol": this._isFileProtocol,
          "isiOSCordova": this.IsiOSCordova(),
          "isiOSWebView": this.IsiOSWebView(),
          "isWindowsWebView2": this.IsWindowsWebView2(),
          "isAnyWebView2Wrapper": this.IsAnyWebView2Wrapper(),
          "wrapperComponentIds": this._wrapperComponentIds,
          "isFBInstantAvailable": typeof self["FBInstant"] !== "undefined"
        };
      }
    }, {
      key: "_InitWorker",
      value: function _InitWorker(opts, port2) {
        var _this8 = this;

        var workerMainUrl, canvas, offscreenCanvas, htmlWrap, workerDependencyScripts, engineScripts, i, len, info, originalUrl;
        return regeneratorRuntime.async(function _InitWorker$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                workerMainUrl = this._GetWorkerURL(opts.workerMainUrl);

                if (!(this._exportType === "preview")) {
                  _context5.next = 7;
                  break;
                }

                this._worker = new Worker("previewworker.js", {
                  type: "module",
                  name: "Runtime"
                });
                _context5.next = 5;
                return regeneratorRuntime.awrap(new Promise(function (resolve, reject) {
                  var messageHandler = function messageHandler(e) {
                    _this8._worker.removeEventListener("message", messageHandler);

                    if (e.data && e.data["type"] === "ok") resolve();else reject();
                  };

                  _this8._worker.addEventListener("message", messageHandler);

                  _this8._worker.postMessage({
                    "type": "construct-worker-init",
                    "import": new URL(workerMainUrl, _this8._runtimeBaseUrl).toString()
                  });
                }));

              case 5:
                _context5.next = 10;
                break;

              case 7:
                _context5.next = 9;
                return regeneratorRuntime.awrap(this.CreateWorker(workerMainUrl, this._runtimeBaseUrl, {
                  type: "module",
                  name: "Runtime",
                  isC3MainWorker: true
                }));

              case 9:
                this._worker = _context5.sent;

              case 10:
                canvas = document.createElement("canvas");
                canvas.style.display = "none";
                offscreenCanvas = canvas["transferControlToOffscreen"]();
                document.body.appendChild(canvas);
                htmlWrap = document.createElement("div");
                htmlWrap.className = "c3htmlwrap";
                document.body.appendChild(htmlWrap);

                this._canvasLayers.push({
                  canvas: canvas,
                  htmlWrap: htmlWrap
                });

                window["c3canvas"] = canvas;
                if (self["C3_InsertHTMLPlaceholders"]) self["C3_InsertHTMLPlaceholders"]();
                workerDependencyScripts = opts.workerDependencyScripts || [];
                engineScripts = opts.engineScripts;
                _context5.next = 24;
                return regeneratorRuntime.awrap(Promise.all(workerDependencyScripts.map(function (url) {
                  return _this8._MaybeGetCordovaScriptURL(url);
                })));

              case 24:
                workerDependencyScripts = _context5.sent;
                _context5.next = 27;
                return regeneratorRuntime.awrap(Promise.all(engineScripts.map(function (url) {
                  return _this8._MaybeGetCordovaScriptURL(url);
                })));

              case 27:
                engineScripts = _context5.sent;

                if (!(this._exportType === "cordova")) {
                  _context5.next = 40;
                  break;
                }

                i = 0, len = opts.projectScripts.length;

              case 30:
                if (!(i < len)) {
                  _context5.next = 40;
                  break;
                }

                info = opts.projectScripts[i];
                originalUrl = info[0];

                if (!(originalUrl === opts.mainProjectScript || originalUrl === "scriptsInEvents.js" || originalUrl.endsWith("/scriptsInEvents.js"))) {
                  _context5.next = 37;
                  break;
                }

                _context5.next = 36;
                return regeneratorRuntime.awrap(this._MaybeGetCordovaScriptURL(originalUrl));

              case 36:
                info[1] = _context5.sent;

              case 37:
                ++i;
                _context5.next = 30;
                break;

              case 40:
                this._worker.postMessage(Object.assign(this._GetCommonRuntimeOptions(opts), {
                  "type": "init-runtime",
                  "isInWorker": true,
                  "messagePort": port2,
                  "canvas": offscreenCanvas,
                  "workerDependencyScripts": workerDependencyScripts,
                  "engineScripts": engineScripts,
                  "projectScripts": opts.projectScripts,
                  "mainProjectScript": opts.mainProjectScript,
                  "projectScriptsStatus": self["C3_ProjectScriptsStatus"]
                }), [port2, offscreenCanvas].concat(_toConsumableArray(this._jobScheduler.GetPortTransferables())));

                this._domHandlers = domHandlerClasses.map(function (C) {
                  return new C(_this8);
                });

                this._FindRuntimeDOMHandler();

                this._runtimeDomHandler._AddDefaultCanvasEventHandlers(canvas);

                this._runtimeDomHandler._AddDefaultHTMLWrapEventHandlers(htmlWrap);

                this._runtimeDomHandler._EnableWindowResizeEvent();

                self["c3_callFunction"] = function (name, params) {
                  return _this8._runtimeDomHandler._InvokeFunctionFromJS(name, params);
                };

                if (this._exportType === "preview") self["goToLastErrorScript"] = function () {
                  return _this8.PostToRuntimeComponent("runtime", "go-to-last-error-script");
                };

              case 48:
              case "end":
                return _context5.stop();
            }
          }
        }, null, this);
      }
    }, {
      key: "_InitDOM",
      value: function _InitDOM(opts, port2) {
        var _this9 = this;

        var canvas, htmlWrap, engineScripts, _engineScripts, workerDependencyScripts, scriptsStatus, mainProjectScript, allProjectScripts, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, _step4$value, originalUrl, loadUrl, msg, runtimeOpts;

        return regeneratorRuntime.async(function _InitDOM$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                canvas = document.createElement("canvas");
                canvas.style.display = "none";
                document.body.appendChild(canvas);
                htmlWrap = document.createElement("div");
                htmlWrap.className = "c3htmlwrap";
                document.body.appendChild(htmlWrap);

                this._canvasLayers.push({
                  canvas: canvas,
                  htmlWrap: htmlWrap
                });

                window["c3canvas"] = canvas;
                if (self["C3_InsertHTMLPlaceholders"]) self["C3_InsertHTMLPlaceholders"]();
                this._domHandlers = domHandlerClasses.map(function (C) {
                  return new C(_this9);
                });

                this._FindRuntimeDOMHandler();

                this._runtimeDomHandler._AddDefaultCanvasEventHandlers(canvas);

                this._runtimeDomHandler._AddDefaultHTMLWrapEventHandlers(htmlWrap);

                engineScripts = opts.engineScripts.map(function (url) {
                  return typeof url === "string" ? new URL(url, _this9._runtimeBaseUrl).toString() : url;
                });

                if (Array.isArray(opts.workerDependencyScripts)) {
                  workerDependencyScripts = _toConsumableArray(opts.workerDependencyScripts).map(function (s) {
                    return s instanceof Blob ? URL.createObjectURL(s) : s;
                  });

                  (_engineScripts = engineScripts).unshift.apply(_engineScripts, _toConsumableArray(workerDependencyScripts));
                }

                _context6.next = 17;
                return regeneratorRuntime.awrap(Promise.all(engineScripts.map(function (url) {
                  return _this9._MaybeGetCordovaScriptURL(url);
                })));

              case 17:
                engineScripts = _context6.sent;
                _context6.next = 20;
                return regeneratorRuntime.awrap(Promise.all(engineScripts.map(function (url) {
                  return AddScript(url);
                })));

              case 20:
                scriptsStatus = self["C3_ProjectScriptsStatus"];
                mainProjectScript = opts.mainProjectScript;
                allProjectScripts = opts.projectScripts;
                _iteratorNormalCompletion4 = true;
                _didIteratorError4 = false;
                _iteratorError4 = undefined;
                _context6.prev = 26;
                _iterator4 = allProjectScripts[Symbol.iterator]();

              case 28:
                if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                  _context6.next = 55;
                  break;
                }

                _step4$value = _slicedToArray(_step4.value, 2), originalUrl = _step4$value[0], loadUrl = _step4$value[1];
                if (!loadUrl) loadUrl = originalUrl;

                if (!(originalUrl === mainProjectScript)) {
                  _context6.next = 46;
                  break;
                }

                _context6.prev = 32;
                _context6.next = 35;
                return regeneratorRuntime.awrap(this._MaybeGetCordovaScriptURL(loadUrl));

              case 35:
                loadUrl = _context6.sent;
                _context6.next = 38;
                return regeneratorRuntime.awrap(AddScript(loadUrl));

              case 38:
                if (this._exportType === "preview" && !scriptsStatus[originalUrl]) this._ReportProjectMainScriptError(originalUrl, "main script did not run to completion");
                _context6.next = 44;
                break;

              case 41:
                _context6.prev = 41;
                _context6.t0 = _context6["catch"](32);

                this._ReportProjectMainScriptError(originalUrl, _context6.t0);

              case 44:
                _context6.next = 52;
                break;

              case 46:
                if (!(originalUrl === "scriptsInEvents.js" || originalUrl.endsWith("/scriptsInEvents.js"))) {
                  _context6.next = 52;
                  break;
                }

                _context6.next = 49;
                return regeneratorRuntime.awrap(this._MaybeGetCordovaScriptURL(loadUrl));

              case 49:
                loadUrl = _context6.sent;
                _context6.next = 52;
                return regeneratorRuntime.awrap(AddScript(loadUrl));

              case 52:
                _iteratorNormalCompletion4 = true;
                _context6.next = 28;
                break;

              case 55:
                _context6.next = 61;
                break;

              case 57:
                _context6.prev = 57;
                _context6.t1 = _context6["catch"](26);
                _didIteratorError4 = true;
                _iteratorError4 = _context6.t1;

              case 61:
                _context6.prev = 61;
                _context6.prev = 62;

                if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
                  _iterator4["return"]();
                }

              case 64:
                _context6.prev = 64;

                if (!_didIteratorError4) {
                  _context6.next = 67;
                  break;
                }

                throw _iteratorError4;

              case 67:
                return _context6.finish(64);

              case 68:
                return _context6.finish(61);

              case 69:
                if (!(this._exportType === "preview" && _typeof(self.C3.ScriptsInEvents) !== "object")) {
                  _context6.next = 75;
                  break;
                }

                this._RemoveLoadingMessage();

                msg = "Failed to load JavaScript code used in events. Check all your JavaScript code has valid syntax.";
                console.error("[C3 runtime] " + msg);
                alert(msg);
                return _context6.abrupt("return");

              case 75:
                runtimeOpts = Object.assign(this._GetCommonRuntimeOptions(opts), {
                  "isInWorker": false,
                  "messagePort": port2,
                  "canvas": canvas,
                  "runOnStartupFunctions": runOnStartupFunctions
                });

                this._runtimeDomHandler._EnableWindowResizeEvent();

                this._OnBeforeCreateRuntime();

                this._localRuntime = self["C3_CreateRuntime"](runtimeOpts);
                _context6.next = 81;
                return regeneratorRuntime.awrap(self["C3_InitRuntime"](this._localRuntime, runtimeOpts));

              case 81:
              case "end":
                return _context6.stop();
            }
          }
        }, null, this, [[26, 57, 61, 69], [32, 41], [62,, 64, 68]]);
      }
    }, {
      key: "_ReportProjectMainScriptError",
      value: function _ReportProjectMainScriptError(url, err) {
        this._RemoveLoadingMessage();

        console.error("[Preview] Failed to load project main script (".concat(url, "): "), err);
        alert("Failed to load project main script (".concat(url, "). Check all your JavaScript code has valid syntax. Press F12 and check the console for error details."));
      }
    }, {
      key: "_OnBeforeCreateRuntime",
      value: function _OnBeforeCreateRuntime() {
        this._RemoveLoadingMessage();
      }
    }, {
      key: "_RemoveLoadingMessage",
      value: function _RemoveLoadingMessage() {
        var loadingElem = window["cr_previewLoadingElem"];

        if (loadingElem) {
          loadingElem.parentElement.removeChild(loadingElem);
          window["cr_previewLoadingElem"] = null;
        }
      }
    }, {
      key: "_OnCreateJobWorker",
      value: function _OnCreateJobWorker(e) {
        var outputPort;
        return regeneratorRuntime.async(function _OnCreateJobWorker$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return regeneratorRuntime.awrap(this._jobScheduler._CreateJobWorker());

              case 2:
                outputPort = _context7.sent;
                return _context7.abrupt("return", {
                  "outputPort": outputPort,
                  "transferables": [outputPort]
                });

              case 4:
              case "end":
                return _context7.stop();
            }
          }
        }, null, this);
      }
    }, {
      key: "_OnUpdateCanvasSize",
      value: function _OnUpdateCanvasSize(e) {
        if (this.IsExportingToVideo()) return;
        var widthPx = e["styleWidth"] + "px";
        var heightPx = e["styleHeight"] + "px";
        var leftPx = e["marginLeft"] + "px";
        var topPx = e["marginTop"] + "px";
        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
          for (var _iterator5 = this._canvasLayers[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var _step5$value = _step5.value,
                canvas = _step5$value.canvas,
                htmlWrap = _step5$value.htmlWrap;
            canvas.style.width = widthPx;
            canvas.style.height = heightPx;
            canvas.style.marginLeft = leftPx;
            canvas.style.marginTop = topPx;
            htmlWrap.style.width = widthPx;
            htmlWrap.style.height = heightPx;
            htmlWrap.style.marginLeft = leftPx;
            htmlWrap.style.marginTop = topPx;

            if (this._isFirstSizeUpdate) {
              canvas.style.display = "";
              htmlWrap.style.display = "";
            }
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

        document.documentElement.style.setProperty("--construct-scale", e["displayScale"]);
        this._isFirstSizeUpdate = false;
      }
    }, {
      key: "_OnSetHTMLLayerCount",
      value: function _OnSetHTMLLayerCount(e) {
        var count = e["count"];
        var immediate = e["immediate"];
        var widthPx = e["styleWidth"] + "px";
        var heightPx = e["styleHeight"] + "px";
        var leftPx = e["marginLeft"] + "px";
        var topPx = e["marginTop"] + "px";
        var addedCanvases = [];
        var transferables = [];
        if (count < this._canvasLayers.length) while (this._canvasLayers.length > count) {
          var _this$_canvasLayers$p = this._canvasLayers.pop(),
              canvas = _this$_canvasLayers$p.canvas,
              htmlWrap = _this$_canvasLayers$p.htmlWrap;

          htmlWrap.remove();
          if (this._useWorker && !immediate) this._pendingRemoveElements.push(canvas);else canvas.remove();
        } else if (count > this._canvasLayers.length) for (var i = 0, len = count - this._canvasLayers.length; i < len; ++i) {
          var _canvas = document.createElement("canvas");

          _canvas.classList.add("c3overlay");

          if (this._useWorker) {
            var offscreenCanvas = _canvas["transferControlToOffscreen"]();

            addedCanvases.push(offscreenCanvas);
            transferables.push(offscreenCanvas);
          } else addedCanvases.push(_canvas);

          document.body.appendChild(_canvas);

          var _htmlWrap = document.createElement("div");

          _htmlWrap.classList.add("c3htmlwrap", "c3overlay");

          document.body.appendChild(_htmlWrap);
          _canvas.style.width = widthPx;
          _canvas.style.height = heightPx;
          _canvas.style.marginLeft = leftPx;
          _canvas.style.marginTop = topPx;
          _htmlWrap.style.width = widthPx;
          _htmlWrap.style.height = heightPx;
          _htmlWrap.style.marginLeft = leftPx;
          _htmlWrap.style.marginTop = topPx;

          this._runtimeDomHandler._AddDefaultCanvasEventHandlers(_canvas);

          this._runtimeDomHandler._AddDefaultHTMLWrapEventHandlers(_htmlWrap);

          this._canvasLayers.push({
            canvas: _canvas,
            htmlWrap: _htmlWrap
          });
        }
        var _iteratorNormalCompletion6 = true;
        var _didIteratorError6 = false;
        var _iteratorError6 = undefined;

        try {
          for (var _iterator6 = this._domHandlers[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            var domHandler = _step6.value;
            if (domHandler instanceof window.DOMElementHandler) domHandler._OnHTMLLayersChanged();
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

        this._UpdateHTMLElementsZOrder();

        return {
          "addedCanvases": addedCanvases,
          "transferables": transferables
        };
      }
    }, {
      key: "_OnCleanUpHTMLLayers",
      value: function _OnCleanUpHTMLLayers() {
        var _iteratorNormalCompletion7 = true;
        var _didIteratorError7 = false;
        var _iteratorError7 = undefined;

        try {
          for (var _iterator7 = this._pendingRemoveElements[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
            var elem = _step7.value;
            elem.remove();
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

        this._pendingRemoveElements.length = 0;
      }
    }, {
      key: "_UpdateHTMLElementsZOrder",
      value: function _UpdateHTMLElementsZOrder() {
        if (this._pendingUpdateHTMLZOrder) return;
        this._pendingUpdateHTMLZOrder = true;

        this._AddRAFCallback(this._updateHTMLZOrderRAFCallback);
      }
    }, {
      key: "_DoUpdateHTMLElementsZOrder",
      value: function _DoUpdateHTMLElementsZOrder() {
        this._RemoveRAFCallback(this._updateHTMLZOrderRAFCallback);

        this._pendingUpdateHTMLZOrder = false;
        var allElementStates = [];
        var _iteratorNormalCompletion8 = true;
        var _didIteratorError8 = false;
        var _iteratorError8 = undefined;

        try {
          for (var _iterator8 = this._domHandlers[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
            var domHandler = _step8.value;

            if (domHandler instanceof window.DOMElementHandler) {
              var elemStates = domHandler._GetAllElementStatesForZOrderUpdate();

              if (elemStates) allElementStates.push.apply(allElementStates, _toConsumableArray(elemStates));
            }
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

        allElementStates.sort(function (a, b) {
          var a1 = a.GetActualHTMLIndex();
          var b1 = b.GetActualHTMLIndex();
          if (a1 !== b1) return a1 - b1;
          var a2 = a.GetHTMLZIndex();
          var b2 = b.GetHTMLZIndex();
          return a2 - b2;
        });
        var curHtmlIndex = 0;
        var s = 0,
            i = 0,
            len = allElementStates.length;

        for (; i < len; ++i) {
          var es = allElementStates[i];

          if (es.GetActualHTMLIndex() !== curHtmlIndex) {
            this._DoUpdateHTMLElementsZOrderOnHTMLLayer(curHtmlIndex, allElementStates.slice(s, i));

            curHtmlIndex = es.GetActualHTMLIndex();
            s = i;
          }
        }

        if (s < i) this._DoUpdateHTMLElementsZOrderOnHTMLLayer(curHtmlIndex, allElementStates.slice(s, i));
      }
    }, {
      key: "_DoUpdateHTMLElementsZOrderOnHTMLLayer",
      value: function _DoUpdateHTMLElementsZOrderOnHTMLLayer(htmlIndex, arr) {
        if (arr.length <= 1) return;
        if (htmlIndex >= this._canvasLayers.length) return;
        var newChildren = arr.map(function (es) {
          return es.GetElement();
        });
        var newChildrenSet = new Set(newChildren);
        var htmlWrap = this.GetHTMLWrapElement(htmlIndex);
        var existingChildren = Array.from(htmlWrap.children).filter(function (elem) {
          return newChildrenSet.has(elem);
        });
        var i = 0,
            len = Math.min(newChildren.length, existingChildren.length);

        for (; i < len; ++i) {
          if (newChildren[i] !== existingChildren[i]) break;
        }

        var j = i;

        for (; j < len; ++j) {
          existingChildren[j].remove();
        }

        j = i;

        for (; j < len; ++j) {
          htmlWrap.appendChild(newChildren[j]);
        }
      }
    }, {
      key: "_GetLocalRuntime",
      value: function _GetLocalRuntime() {
        if (this._useWorker) throw new Error("not available in worker mode");
        return this._localRuntime;
      }
    }, {
      key: "PostToRuntimeComponent",
      value: function PostToRuntimeComponent(component, handler, data, dispatchOpts, transferables) {
        this._messageChannelPort.postMessage({
          "type": "event",
          "component": component,
          "handler": handler,
          "dispatchOpts": dispatchOpts || null,
          "data": data,
          "responseId": null
        }, transferables);
      }
    }, {
      key: "PostToRuntimeComponentAsync",
      value: function PostToRuntimeComponentAsync(component, handler, data, dispatchOpts, transferables) {
        var responseId = nextResponseId++;
        var ret = new Promise(function (resolve, reject) {
          pendingResponsePromises.set(responseId, {
            resolve: resolve,
            reject: reject
          });
        });

        this._messageChannelPort.postMessage({
          "type": "event",
          "component": component,
          "handler": handler,
          "dispatchOpts": dispatchOpts || null,
          "data": data,
          "responseId": responseId
        }, transferables);

        return ret;
      }
    }, {
      key: "_OnMessageFromRuntime",
      value: function _OnMessageFromRuntime(data) {
        var type = data["type"];
        if (type === "event") return this._OnEventFromRuntime(data);else if (type === "result") this._OnResultFromRuntime(data);else if (type === "runtime-ready") this._OnRuntimeReady();else if (type === "alert-error") {
          this._RemoveLoadingMessage();

          alert(data["message"]);
        } else if (type === "creating-runtime") this._OnBeforeCreateRuntime();else throw new Error("unknown message '".concat(type, "'"));
      }
    }, {
      key: "_OnEventFromRuntime",
      value: function _OnEventFromRuntime(e) {
        var _this10 = this;

        var component = e["component"];
        var handler = e["handler"];
        var data = e["data"];
        var responseId = e["responseId"];
        var handlerMap = runtimeEventHandlers.get(component);

        if (!handlerMap) {
          console.warn("[DOM] No event handlers for component '".concat(component, "'"));
          return;
        }

        var func = handlerMap.get(handler);

        if (!func) {
          console.warn("[DOM] No handler '".concat(handler, "' for component '").concat(component, "'"));
          return;
        }

        var ret = null;

        try {
          ret = func(data);
        } catch (err) {
          console.error("Exception in '".concat(component, "' handler '").concat(handler, "':"), err);
          if (responseId !== null) this._PostResultToRuntime(responseId, false, "" + err);
          return;
        }

        if (responseId === null) return ret;else if (ret && ret.then) ret.then(function (result) {
          return _this10._PostResultToRuntime(responseId, true, result);
        })["catch"](function (err) {
          console.error("Rejection from '".concat(component, "' handler '").concat(handler, "':"), err);

          _this10._PostResultToRuntime(responseId, false, "" + err);
        });else this._PostResultToRuntime(responseId, true, ret);
      }
    }, {
      key: "_PostResultToRuntime",
      value: function _PostResultToRuntime(responseId, isOk, result) {
        var transferables;
        if (result && result["transferables"]) transferables = result["transferables"];

        this._messageChannelPort.postMessage({
          "type": "result",
          "responseId": responseId,
          "isOk": isOk,
          "result": result
        }, transferables);
      }
    }, {
      key: "_OnResultFromRuntime",
      value: function _OnResultFromRuntime(data) {
        var responseId = data["responseId"];
        var isOk = data["isOk"];
        var result = data["result"];
        var pendingPromise = pendingResponsePromises.get(responseId);
        if (isOk) pendingPromise.resolve(result);else pendingPromise.reject(result);
        pendingResponsePromises["delete"](responseId);
      }
    }, {
      key: "AddRuntimeComponentMessageHandler",
      value: function AddRuntimeComponentMessageHandler(component, handler, func) {
        var handlerMap = runtimeEventHandlers.get(component);

        if (!handlerMap) {
          handlerMap = new Map();
          runtimeEventHandlers.set(component, handlerMap);
        }

        if (handlerMap.has(handler)) throw new Error("[DOM] Component '".concat(component, "' already has handler '").concat(handler, "'"));
        handlerMap.set(handler, func);
      }
    }, {
      key: "_FindRuntimeDOMHandler",
      value: function _FindRuntimeDOMHandler() {
        var _iteratorNormalCompletion9 = true;
        var _didIteratorError9 = false;
        var _iteratorError9 = undefined;

        try {
          for (var _iterator9 = this._domHandlers[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
            var dh = _step9.value;

            if (dh.GetComponentID() === "runtime") {
              this._runtimeDomHandler = dh;
              return;
            }
          }
        } catch (err) {
          _didIteratorError9 = true;
          _iteratorError9 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion9 && _iterator9["return"] != null) {
              _iterator9["return"]();
            }
          } finally {
            if (_didIteratorError9) {
              throw _iteratorError9;
            }
          }
        }

        throw new Error("cannot find runtime DOM handler");
      }
    }, {
      key: "_OnMessageFromDebugger",
      value: function _OnMessageFromDebugger(e) {
        this.PostToRuntimeComponent("debugger", "message", e);
      }
    }, {
      key: "_OnRuntimeReady",
      value: function _OnRuntimeReady() {
        var _iteratorNormalCompletion10 = true;
        var _didIteratorError10 = false;
        var _iteratorError10 = undefined;

        try {
          for (var _iterator10 = this._domHandlers[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
            var h = _step10.value;
            h.Attach();
          }
        } catch (err) {
          _didIteratorError10 = true;
          _iteratorError10 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion10 && _iterator10["return"] != null) {
              _iterator10["return"]();
            }
          } finally {
            if (_didIteratorError10) {
              throw _iteratorError10;
            }
          }
        }
      }
    }, {
      key: "GetRemotePreviewStatusInfo",
      value: function GetRemotePreviewStatusInfo() {
        return regeneratorRuntime.async(function GetRemotePreviewStatusInfo$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return regeneratorRuntime.awrap(this.PostToRuntimeComponentAsync("runtime", "get-remote-preview-status-info"));

              case 2:
                return _context8.abrupt("return", _context8.sent);

              case 3:
              case "end":
                return _context8.stop();
            }
          }
        }, null, this);
      }
    }, {
      key: "_AddRAFCallback",
      value: function _AddRAFCallback(f) {
        this._rafCallbacks.add(f);

        this._RequestAnimationFrame();
      }
    }, {
      key: "_RemoveRAFCallback",
      value: function _RemoveRAFCallback(f) {
        this._rafCallbacks["delete"](f);

        if (this._rafCallbacks.size === 0) this._CancelAnimationFrame();
      }
    }, {
      key: "_RequestAnimationFrame",
      value: function _RequestAnimationFrame() {
        if (this._rafId === -1 && this._rafCallbacks.size > 0) this._rafId = requestAnimationFrame(this._rafFunc);
      }
    }, {
      key: "_CancelAnimationFrame",
      value: function _CancelAnimationFrame() {
        if (this._rafId !== -1) {
          cancelAnimationFrame(this._rafId);
          this._rafId = -1;
        }
      }
    }, {
      key: "_OnRAFCallback",
      value: function _OnRAFCallback() {
        this._rafId = -1;
        var _iteratorNormalCompletion11 = true;
        var _didIteratorError11 = false;
        var _iteratorError11 = undefined;

        try {
          for (var _iterator11 = this._rafCallbacks[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
            var f = _step11.value;
            f();
          }
        } catch (err) {
          _didIteratorError11 = true;
          _iteratorError11 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion11 && _iterator11["return"] != null) {
              _iterator11["return"]();
            }
          } finally {
            if (_didIteratorError11) {
              throw _iteratorError11;
            }
          }
        }

        this._RequestAnimationFrame();
      }
    }, {
      key: "TryPlayMedia",
      value: function TryPlayMedia(mediaElem) {
        this._runtimeDomHandler.TryPlayMedia(mediaElem);
      }
    }, {
      key: "RemovePendingPlay",
      value: function RemovePendingPlay(mediaElem) {
        this._runtimeDomHandler.RemovePendingPlay(mediaElem);
      }
    }, {
      key: "_PlayPendingMedia",
      value: function _PlayPendingMedia() {
        this._runtimeDomHandler._PlayPendingMedia();
      }
    }, {
      key: "SetSilent",
      value: function SetSilent(s) {
        this._runtimeDomHandler.SetSilent(s);
      }
    }, {
      key: "IsAudioFormatSupported",
      value: function IsAudioFormatSupported(typeStr) {
        return !!supportedAudioFormats[typeStr];
      }
    }, {
      key: "_WasmDecodeWebMOpus",
      value: function _WasmDecodeWebMOpus(arrayBuffer) {
        var result;
        return regeneratorRuntime.async(function _WasmDecodeWebMOpus$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return regeneratorRuntime.awrap(this.PostToRuntimeComponentAsync("runtime", "opus-decode", {
                  "arrayBuffer": arrayBuffer
                }, null, [arrayBuffer]));

              case 2:
                result = _context9.sent;
                return _context9.abrupt("return", new Float32Array(result));

              case 4:
              case "end":
                return _context9.stop();
            }
          }
        }, null, this);
      }
    }, {
      key: "SetIsExportingToVideo",
      value: function SetIsExportingToVideo(duration) {
        this._isExportingToVideo = true;
        this._exportToVideoDuration = duration;
      }
    }, {
      key: "IsExportingToVideo",
      value: function IsExportingToVideo() {
        return this._isExportingToVideo;
      }
    }, {
      key: "GetExportToVideoDuration",
      value: function GetExportToVideoDuration() {
        return this._exportToVideoDuration;
      }
    }, {
      key: "IsAbsoluteURL",
      value: function IsAbsoluteURL(url) {
        return /^(?:[a-z\-]+:)?\/\//.test(url) || url.substr(0, 5) === "data:" || url.substr(0, 5) === "blob:";
      }
    }, {
      key: "IsRelativeURL",
      value: function IsRelativeURL(url) {
        return !this.IsAbsoluteURL(url);
      }
    }, {
      key: "_MaybeGetCordovaScriptURL",
      value: function _MaybeGetCordovaScriptURL(url) {
        var filename, arrayBuffer, blob;
        return regeneratorRuntime.async(function _MaybeGetCordovaScriptURL$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                if (!(this._exportType === "cordova" && (url.startsWith("file:") || this._isFileProtocol && this.IsRelativeURL(url)))) {
                  _context10.next = 10;
                  break;
                }

                filename = url;
                if (filename.startsWith(this._runtimeBaseUrl)) filename = filename.substr(this._runtimeBaseUrl.length);
                _context10.next = 5;
                return regeneratorRuntime.awrap(this.CordovaFetchLocalFileAsArrayBuffer(filename));

              case 5:
                arrayBuffer = _context10.sent;
                blob = new Blob([arrayBuffer], {
                  type: "application/javascript"
                });
                return _context10.abrupt("return", URL.createObjectURL(blob));

              case 10:
                return _context10.abrupt("return", url);

              case 11:
              case "end":
                return _context10.stop();
            }
          }
        }, null, this);
      }
    }, {
      key: "_OnCordovaFetchLocalFile",
      value: function _OnCordovaFetchLocalFile(e) {
        var filename;
        return regeneratorRuntime.async(function _OnCordovaFetchLocalFile$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                filename = e["filename"];
                _context11.t0 = e["as"];
                _context11.next = _context11.t0 === "text" ? 4 : _context11.t0 === "buffer" ? 7 : 10;
                break;

              case 4:
                _context11.next = 6;
                return regeneratorRuntime.awrap(this.CordovaFetchLocalFileAsText(filename));

              case 6:
                return _context11.abrupt("return", _context11.sent);

              case 7:
                _context11.next = 9;
                return regeneratorRuntime.awrap(this.CordovaFetchLocalFileAsArrayBuffer(filename));

              case 9:
                return _context11.abrupt("return", _context11.sent);

              case 10:
                throw new Error("unsupported type");

              case 11:
              case "end":
                return _context11.stop();
            }
          }
        }, null, this);
      }
    }, {
      key: "_GetPermissionAPI",
      value: function _GetPermissionAPI() {
        var api = window["cordova"] && window["cordova"]["plugins"] && window["cordova"]["plugins"]["permissions"];
        if (_typeof(api) !== "object") throw new Error("Permission API is not loaded");
        return api;
      }
    }, {
      key: "_MapPermissionID",
      value: function _MapPermissionID(api, permission) {
        var permissionID = api[permission];
        if (typeof permissionID !== "string") throw new Error("Invalid permission name");
        return permissionID;
      }
    }, {
      key: "_HasPermission",
      value: function _HasPermission(id) {
        var _this11 = this;

        var api = this._GetPermissionAPI();

        return new Promise(function (resolve, reject) {
          return api["checkPermission"](_this11._MapPermissionID(api, id), function (status) {
            return resolve(!!status["hasPermission"]);
          }, reject);
        });
      }
    }, {
      key: "_RequestPermission",
      value: function _RequestPermission(id) {
        var _this12 = this;

        var api = this._GetPermissionAPI();

        return new Promise(function (resolve, reject) {
          return api["requestPermission"](_this12._MapPermissionID(api, id), function (status) {
            return resolve(!!status["hasPermission"]);
          }, reject);
        });
      }
    }, {
      key: "RequestPermissions",
      value: function RequestPermissions(permissions) {
        var _iteratorNormalCompletion12, _didIteratorError12, _iteratorError12, _iterator12, _step12, id, alreadyGranted, granted;

        return regeneratorRuntime.async(function RequestPermissions$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                if (!(this.GetExportType() !== "cordova")) {
                  _context12.next = 2;
                  break;
                }

                return _context12.abrupt("return", true);

              case 2:
                if (!this.IsiOSCordova()) {
                  _context12.next = 4;
                  break;
                }

                return _context12.abrupt("return", true);

              case 4:
                _iteratorNormalCompletion12 = true;
                _didIteratorError12 = false;
                _iteratorError12 = undefined;
                _context12.prev = 7;
                _iterator12 = permissions[Symbol.iterator]();

              case 9:
                if (_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done) {
                  _context12.next = 24;
                  break;
                }

                id = _step12.value;
                _context12.next = 13;
                return regeneratorRuntime.awrap(this._HasPermission(id));

              case 13:
                alreadyGranted = _context12.sent;

                if (!alreadyGranted) {
                  _context12.next = 16;
                  break;
                }

                return _context12.abrupt("continue", 21);

              case 16:
                _context12.next = 18;
                return regeneratorRuntime.awrap(this._RequestPermission(id));

              case 18:
                granted = _context12.sent;

                if (!(granted === false)) {
                  _context12.next = 21;
                  break;
                }

                return _context12.abrupt("return", false);

              case 21:
                _iteratorNormalCompletion12 = true;
                _context12.next = 9;
                break;

              case 24:
                _context12.next = 30;
                break;

              case 26:
                _context12.prev = 26;
                _context12.t0 = _context12["catch"](7);
                _didIteratorError12 = true;
                _iteratorError12 = _context12.t0;

              case 30:
                _context12.prev = 30;
                _context12.prev = 31;

                if (!_iteratorNormalCompletion12 && _iterator12["return"] != null) {
                  _iterator12["return"]();
                }

              case 33:
                _context12.prev = 33;

                if (!_didIteratorError12) {
                  _context12.next = 36;
                  break;
                }

                throw _iteratorError12;

              case 36:
                return _context12.finish(33);

              case 37:
                return _context12.finish(30);

              case 38:
                return _context12.abrupt("return", true);

              case 39:
              case "end":
                return _context12.stop();
            }
          }
        }, null, this, [[7, 26, 30, 38], [31,, 33, 37]]);
      }
    }, {
      key: "RequirePermissions",
      value: function RequirePermissions() {
        var _len,
            permissions,
            _key,
            _args13 = arguments;

        return regeneratorRuntime.async(function RequirePermissions$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                for (_len = _args13.length, permissions = new Array(_len), _key = 0; _key < _len; _key++) {
                  permissions[_key] = _args13[_key];
                }

                _context13.next = 3;
                return regeneratorRuntime.awrap(this.RequestPermissions(permissions));

              case 3:
                _context13.t0 = _context13.sent;

                if (!(_context13.t0 === false)) {
                  _context13.next = 6;
                  break;
                }

                throw new Error("Permission not granted");

              case 6:
              case "end":
                return _context13.stop();
            }
          }
        }, null, this);
      }
    }, {
      key: "CordovaFetchLocalFile",
      value: function CordovaFetchLocalFile(filename) {
        var path = window["cordova"]["file"]["applicationDirectory"] + "www/" + filename;
        return new Promise(function (resolve, reject) {
          window["resolveLocalFileSystemURL"](path, function (entry) {
            entry["file"](resolve, reject);
          }, reject);
        });
      }
    }, {
      key: "CordovaFetchLocalFileAsText",
      value: function CordovaFetchLocalFileAsText(filename) {
        var file;
        return regeneratorRuntime.async(function CordovaFetchLocalFileAsText$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.next = 2;
                return regeneratorRuntime.awrap(this.CordovaFetchLocalFile(filename));

              case 2:
                file = _context14.sent;
                _context14.next = 5;
                return regeneratorRuntime.awrap(BlobToString(file));

              case 5:
                return _context14.abrupt("return", _context14.sent);

              case 6:
              case "end":
                return _context14.stop();
            }
          }
        }, null, this);
      }
    }, {
      key: "_CordovaMaybeStartNextArrayBufferRead",
      value: function _CordovaMaybeStartNextArrayBufferRead() {
        if (!queuedArrayBufferReads.length) return;
        if (activeArrayBufferReads >= MAX_ARRAYBUFFER_READS) return;
        activeArrayBufferReads++;
        var job = queuedArrayBufferReads.shift();

        this._CordovaDoFetchLocalFileAsAsArrayBuffer(job.filename, job.successCallback, job.errorCallback);
      }
    }, {
      key: "CordovaFetchLocalFileAsArrayBuffer",
      value: function CordovaFetchLocalFileAsArrayBuffer(filename) {
        var _this13 = this;

        return new Promise(function (resolve, reject) {
          queuedArrayBufferReads.push({
            filename: filename,
            successCallback: function successCallback(result) {
              activeArrayBufferReads--;

              _this13._CordovaMaybeStartNextArrayBufferRead();

              resolve(result);
            },
            errorCallback: function errorCallback(err) {
              activeArrayBufferReads--;

              _this13._CordovaMaybeStartNextArrayBufferRead();

              reject(err);
            }
          });

          _this13._CordovaMaybeStartNextArrayBufferRead();
        });
      }
    }, {
      key: "_CordovaDoFetchLocalFileAsAsArrayBuffer",
      value: function _CordovaDoFetchLocalFileAsAsArrayBuffer(filename, successCallback, errorCallback) {
        var file, arrayBuffer;
        return regeneratorRuntime.async(function _CordovaDoFetchLocalFileAsAsArrayBuffer$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                _context15.prev = 0;
                _context15.next = 3;
                return regeneratorRuntime.awrap(this.CordovaFetchLocalFile(filename));

              case 3:
                file = _context15.sent;
                _context15.next = 6;
                return regeneratorRuntime.awrap(BlobToArrayBuffer(file));

              case 6:
                arrayBuffer = _context15.sent;
                successCallback(arrayBuffer);
                _context15.next = 13;
                break;

              case 10:
                _context15.prev = 10;
                _context15.t0 = _context15["catch"](0);
                errorCallback(_context15.t0);

              case 13:
              case "end":
                return _context15.stop();
            }
          }
        }, null, this, [[0, 10]]);
      }
    }, {
      key: "_OnWrapperMessage",
      value: function _OnWrapperMessage(msg) {
        if (msg === "entered-fullscreen") {
          RuntimeInterface._SetWrapperIsFullscreenFlag(true);

          this._runtimeDomHandler._OnFullscreenChange();
        } else if (msg === "exited-fullscreen") {
          RuntimeInterface._SetWrapperIsFullscreenFlag(false);

          this._runtimeDomHandler._OnFullscreenChange();
        } else if (_typeof(msg) === "object") {
          var type = msg["type"];

          if (type === "wrapper-init-response") {
            this._wrapperInitResolve(msg);

            this._wrapperInitResolve = null;
          } else if (type === "extension-message") this.PostToRuntimeComponent("runtime", "wrapper-extension-message", msg);else console.warn("Unknown wrapper message: ", msg);
        } else console.warn("Unknown wrapper message: ", msg);
      }
    }, {
      key: "_OnSendWrapperExtensionMessage",
      value: function _OnSendWrapperExtensionMessage(data) {
        this._SendWrapperMessage({
          "type": "extension-message",
          "componentId": data["componentId"],
          "messageId": data["messageId"],
          "params": data["params"] || [],
          "asyncId": data["asyncId"]
        });
      }
    }, {
      key: "_SendWrapperMessage",
      value: function _SendWrapperMessage(o) {
        if (this.IsAnyWebView2Wrapper()) window["chrome"]["webview"]["postMessage"](JSON.stringify(o));else if (this._exportType === "macos-wkwebview") window["webkit"]["messageHandlers"]["C3Wrapper"]["postMessage"](JSON.stringify(o));else ;
      }
    }, {
      key: "_SetupWebView2Polyfills",
      value: function _SetupWebView2Polyfills() {
        var _this14 = this;

        window.moveTo = function (x, y) {
          _this14._SendWrapperMessage({
            "type": "set-window-position",
            "windowX": Math.ceil(x),
            "windowY": Math.ceil(y)
          });
        };

        window.resizeTo = function (w, h) {
          _this14._SendWrapperMessage({
            "type": "set-window-size",
            "windowWidth": Math.ceil(w),
            "windowHeight": Math.ceil(h)
          });
        };
      }
    }, {
      key: "_InitWrapper",
      value: function _InitWrapper() {
        var _this15 = this;

        if (!this.IsAnyWebView2Wrapper()) return Promise.resolve();
        return new Promise(function (resolve) {
          _this15._wrapperInitResolve = resolve;

          _this15._SendWrapperMessage({
            "type": "wrapper-init"
          });
        });
      }
    }, {
      key: "_ConvertDataUrisToBlobs",
      value: function _ConvertDataUrisToBlobs() {
        var promises, _i3, _Object$entries, _Object$entries$_i, filename, data;

        return regeneratorRuntime.async(function _ConvertDataUrisToBlobs$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                promises = [];

                for (_i3 = 0, _Object$entries = Object.entries(this._localFileBlobs); _i3 < _Object$entries.length; _i3++) {
                  _Object$entries$_i = _slicedToArray(_Object$entries[_i3], 2), filename = _Object$entries$_i[0], data = _Object$entries$_i[1];
                  promises.push(this._ConvertDataUriToBlobs(filename, data));
                }

                _context16.next = 4;
                return regeneratorRuntime.awrap(Promise.all(promises));

              case 4:
              case "end":
                return _context16.stop();
            }
          }
        }, null, this);
      }
    }, {
      key: "_ConvertDataUriToBlobs",
      value: function _ConvertDataUriToBlobs(filename, data) {
        var blob;
        return regeneratorRuntime.async(function _ConvertDataUriToBlobs$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                if (!(_typeof(data) === "object")) {
                  _context17.next = 5;
                  break;
                }

                this._localFileBlobs[filename] = new Blob([data["str"]], {
                  "type": data["type"]
                });
                this._localFileStrings[filename] = data["str"];
                _context17.next = 10;
                break;

              case 5:
                _context17.next = 7;
                return regeneratorRuntime.awrap(this._FetchDataUri(data));

              case 7:
                blob = _context17.sent;
                if (!blob) blob = this._DataURIToBinaryBlobSync(data);
                this._localFileBlobs[filename] = blob;

              case 10:
              case "end":
                return _context17.stop();
            }
          }
        }, null, this);
      }
    }, {
      key: "_FetchDataUri",
      value: function _FetchDataUri(dataUri) {
        var response;
        return regeneratorRuntime.async(function _FetchDataUri$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                _context18.prev = 0;
                _context18.next = 3;
                return regeneratorRuntime.awrap(fetch(dataUri));

              case 3:
                response = _context18.sent;
                _context18.next = 6;
                return regeneratorRuntime.awrap(response.blob());

              case 6:
                return _context18.abrupt("return", _context18.sent);

              case 9:
                _context18.prev = 9;
                _context18.t0 = _context18["catch"](0);
                console.warn("Failed to fetch a data: URI. Falling back to a slower workaround. This is probably because the Content Security Policy unnecessarily blocked it. Allow data: URIs in your CSP to avoid this.", _context18.t0);
                return _context18.abrupt("return", null);

              case 13:
              case "end":
                return _context18.stop();
            }
          }
        }, null, null, [[0, 9]]);
      }
    }, {
      key: "_DataURIToBinaryBlobSync",
      value: function _DataURIToBinaryBlobSync(datauri) {
        var o = this._ParseDataURI(datauri);

        return this._BinaryStringToBlob(o.data, o.mime_type);
      }
    }, {
      key: "_ParseDataURI",
      value: function _ParseDataURI(datauri) {
        var comma = datauri.indexOf(",");
        if (comma < 0) throw new URIError("expected comma in data: uri");
        var typepart = datauri.substring(5, comma);
        var datapart = datauri.substring(comma + 1);
        var typearr = typepart.split(";");
        var mimetype = typearr[0] || "";
        var encoding1 = typearr[1];
        var encoding2 = typearr[2];
        var decodeddata;
        if (encoding1 === "base64" || encoding2 === "base64") decodeddata = atob(datapart);else decodeddata = decodeURIComponent(datapart);
        return {
          mime_type: mimetype,
          data: decodeddata
        };
      }
    }, {
      key: "_BinaryStringToBlob",
      value: function _BinaryStringToBlob(binstr, mime_type) {
        var len = binstr.length;
        var len32 = len >> 2;
        var a8 = new Uint8Array(len);
        var a32 = new Uint32Array(a8.buffer, 0, len32);
        var i, j;

        for (i = 0, j = 0; i < len32; ++i) {
          a32[i] = binstr.charCodeAt(j++) | binstr.charCodeAt(j++) << 8 | binstr.charCodeAt(j++) << 16 | binstr.charCodeAt(j++) << 24;
        }

        var tailLength = len & 3;

        while (tailLength--) {
          a8[j] = binstr.charCodeAt(j);
          ++j;
        }

        return new Blob([a8], {
          "type": mime_type
        });
      }
    }], [{
      key: "AddDOMHandlerClass",
      value: function AddDOMHandlerClass(Class) {
        if (domHandlerClasses.includes(Class)) throw new Error("DOM handler already added");
        domHandlerClasses.push(Class);
      }
    }, {
      key: "IsDocumentFullscreen",
      value: function IsDocumentFullscreen() {
        return !!(document["fullscreenElement"] || document["webkitFullscreenElement"] || document["mozFullScreenElement"] || isWrapperFullscreen);
      }
    }, {
      key: "_SetWrapperIsFullscreenFlag",
      value: function _SetWrapperIsFullscreenFlag(f) {
        isWrapperFullscreen = !!f;
      }
    }]);

    return RuntimeInterface;
  }();
}
;
'use strict';

{
  var IsCompatibilityMouseEvent = function IsCompatibilityMouseEvent(e) {
    return e["sourceCapabilities"] && e["sourceCapabilities"]["firesTouchEvents"] || e["originalEvent"] && e["originalEvent"]["sourceCapabilities"] && e["originalEvent"]["sourceCapabilities"]["firesTouchEvents"];
  };

  var AddStyleSheet = function AddStyleSheet(cssUrl) {
    return new Promise(function (resolve, reject) {
      var styleLink = document.createElement("link");

      styleLink.onload = function () {
        return resolve(styleLink);
      };

      styleLink.onerror = function (err) {
        return reject(err);
      };

      styleLink.rel = "stylesheet";
      styleLink.href = cssUrl;
      document.head.appendChild(styleLink);
    });
  };

  var FetchImage = function FetchImage(url) {
    return new Promise(function (resolve, reject) {
      var img = new Image();

      img.onload = function () {
        return resolve(img);
      };

      img.onerror = function (err) {
        return reject(err);
      };

      img.src = url;
    });
  };

  var BlobToImage = function BlobToImage(blob) {
    var blobUrl;
    return regeneratorRuntime.async(function BlobToImage$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            blobUrl = URL.createObjectURL(blob);
            _context19.prev = 1;
            _context19.next = 4;
            return regeneratorRuntime.awrap(FetchImage(blobUrl));

          case 4:
            return _context19.abrupt("return", _context19.sent);

          case 5:
            _context19.prev = 5;
            URL.revokeObjectURL(blobUrl);
            return _context19.finish(5);

          case 8:
          case "end":
            return _context19.stop();
        }
      }
    }, null, null, [[1,, 5, 8]]);
  };

  var _BlobToString = function _BlobToString(blob) {
    return new Promise(function (resolve, reject) {
      var fileReader = new FileReader();

      fileReader.onload = function (e) {
        return resolve(e.target.result);
      };

      fileReader.onerror = function (err) {
        return reject(err);
      };

      fileReader.readAsText(blob);
    });
  };

  var BlobToSvgImage = function BlobToSvgImage(blob, width, height) {
    var str, parser, doc, rootElem, widthStr, heightStr, serializer;
    return regeneratorRuntime.async(function BlobToSvgImage$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            if (/firefox/i.test(navigator.userAgent)) {
              _context20.next = 4;
              break;
            }

            _context20.next = 3;
            return regeneratorRuntime.awrap(BlobToImage(blob));

          case 3:
            return _context20.abrupt("return", _context20.sent);

          case 4:
            _context20.next = 6;
            return regeneratorRuntime.awrap(_BlobToString(blob));

          case 6:
            str = _context20.sent;
            parser = new DOMParser();
            doc = parser.parseFromString(str, "image/svg+xml");
            rootElem = doc.documentElement;

            if (!(rootElem.hasAttribute("width") && rootElem.hasAttribute("height"))) {
              _context20.next = 17;
              break;
            }

            widthStr = rootElem.getAttribute("width");
            heightStr = rootElem.getAttribute("height");

            if (!(!widthStr.includes("%") && !heightStr.includes("%"))) {
              _context20.next = 17;
              break;
            }

            _context20.next = 16;
            return regeneratorRuntime.awrap(BlobToImage(blob));

          case 16:
            return _context20.abrupt("return", _context20.sent);

          case 17:
            rootElem.setAttribute("width", width + "px");
            rootElem.setAttribute("height", height + "px");
            serializer = new XMLSerializer();
            str = serializer.serializeToString(doc);
            blob = new Blob([str], {
              type: "image/svg+xml"
            });
            _context20.next = 24;
            return regeneratorRuntime.awrap(BlobToImage(blob));

          case 24:
            return _context20.abrupt("return", _context20.sent);

          case 25:
          case "end":
            return _context20.stop();
        }
      }
    });
  };

  var IsInContentEditable = function IsInContentEditable(el) {
    do {
      if (el.parentNode && el.hasAttribute("contenteditable")) return true;
      el = el.parentNode;
    } while (el);

    return false;
  };

  var IsKeyboardInputElement = function IsKeyboardInputElement(elem) {
    return keyboardInputElementTagNames.has(elem.tagName.toLowerCase()) || IsInContentEditable(elem);
  };

  var PreventDefaultOnCanvasOrDoc = function PreventDefaultOnCanvasOrDoc(e) {
    if (!e.target.tagName) return;
    var tagName = e.target.tagName.toLowerCase();
    if (canvasOrDocTags.has(tagName)) e.preventDefault();
  };

  var PreventDefaultOnHTMLWrap = function PreventDefaultOnHTMLWrap(e) {
    if (!e.target.tagName) return;
    if (e.target.classList.contains("c3htmlwrap")) e.preventDefault();
  };

  var BlockWheelZoom = function BlockWheelZoom(e) {
    if (e.metaKey || e.ctrlKey) e.preventDefault();
  };

  var ParentHasFocus = function ParentHasFocus() {
    try {
      return window.parent && window.parent.document.hasFocus();
    } catch (err) {
      return false;
    }
  };

  var KeyboardIsVisible = function KeyboardIsVisible() {
    var elem = document.activeElement;
    if (!elem) return false;
    var tagName = elem.tagName.toLowerCase();
    var inputTypes = new Set(["email", "number", "password", "search", "tel", "text", "url"]);
    if (tagName === "textarea") return true;
    if (tagName === "input") return inputTypes.has(elem.type.toLowerCase() || "text");
    return IsInContentEditable(elem);
  };

  var _RuntimeInterface = self.RuntimeInterface;
  var KEY_CODE_ALIASES = new Map([["OSLeft", "MetaLeft"], ["OSRight", "MetaRight"]]);
  var DISPATCH_RUNTIME_AND_SCRIPT = {
    "dispatchRuntimeEvent": true,
    "dispatchUserScriptEvent": true
  };
  var DISPATCH_SCRIPT_ONLY = {
    "dispatchUserScriptEvent": true
  };
  var DISPATCH_RUNTIME_ONLY = {
    "dispatchRuntimeEvent": true
  };
  var keyboardInputElementTagNames = new Set(["input", "textarea", "datalist", "select"]);
  var canvasOrDocTags = new Set(["canvas", "body", "html"]);

  self["C3_GetSvgImageSize"] = function _callee(blob) {
    var img, rc;
    return regeneratorRuntime.async(function _callee$(_context21) {
      while (1) {
        switch (_context21.prev = _context21.next) {
          case 0:
            _context21.next = 2;
            return regeneratorRuntime.awrap(BlobToImage(blob));

          case 2:
            img = _context21.sent;

            if (!(img.width > 0 && img.height > 0)) {
              _context21.next = 7;
              break;
            }

            return _context21.abrupt("return", [img.width, img.height]);

          case 7:
            img.style.position = "absolute";
            img.style.left = "0px";
            img.style.top = "0px";
            img.style.visibility = "hidden";
            document.body.appendChild(img);
            rc = img.getBoundingClientRect();
            document.body.removeChild(img);
            return _context21.abrupt("return", [rc.width, rc.height]);

          case 15:
          case "end":
            return _context21.stop();
        }
      }
    });
  };

  self["C3_RasterSvgImageBlob"] = function _callee2(blob, imageWidth, imageHeight, surfaceWidth, surfaceHeight) {
    var img, canvas, ctx;
    return regeneratorRuntime.async(function _callee2$(_context22) {
      while (1) {
        switch (_context22.prev = _context22.next) {
          case 0:
            _context22.next = 2;
            return regeneratorRuntime.awrap(BlobToSvgImage(blob, imageWidth, imageHeight));

          case 2:
            img = _context22.sent;
            canvas = document.createElement("canvas");
            canvas.width = surfaceWidth;
            canvas.height = surfaceHeight;
            ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, imageWidth, imageHeight);
            return _context22.abrupt("return", canvas);

          case 9:
          case "end":
            return _context22.stop();
        }
      }
    });
  };

  var isCordovaPaused = false;
  document.addEventListener("pause", function () {
    return isCordovaPaused = true;
  });
  document.addEventListener("resume", function () {
    return isCordovaPaused = false;
  });
  var DOM_COMPONENT_ID = "runtime";

  var HANDLER_CLASS =
  /*#__PURE__*/
  function (_self$DOMHandler2) {
    _inherits(RuntimeDOMHandler, _self$DOMHandler2);

    function RuntimeDOMHandler(iRuntime) {
      var _this16;

      _classCallCheck(this, RuntimeDOMHandler);

      _this16 = _possibleConstructorReturn(this, _getPrototypeOf(RuntimeDOMHandler).call(this, iRuntime, DOM_COMPONENT_ID));
      _this16._enableWindowResizeEvent = false;
      _this16._simulatedResizeTimerId = -1;
      _this16._targetOrientation = "any";
      _this16._attachedDeviceOrientationEvent = false;
      _this16._attachedDeviceMotionEvent = false;
      _this16._pageVisibilityIsHidden = false;
      _this16._screenReaderTextWrap = document.createElement("div");
      _this16._screenReaderTextWrap.className = "c3-screen-reader-text";

      _this16._screenReaderTextWrap.setAttribute("aria-live", "polite");

      document.body.appendChild(_this16._screenReaderTextWrap);
      _this16._debugHighlightElem = null;
      _this16._isExportToVideo = false;
      _this16._exportVideoProgressMessage = "";
      _this16._exportVideoUpdateTimerId = -1;
      _this16._enableAndroidVKDetection = false;
      _this16._lastWindowWidth = iRuntime._GetWindowInnerWidth();
      _this16._lastWindowHeight = iRuntime._GetWindowInnerHeight();
      _this16._virtualKeyboardHeight = 0;
      _this16._vkTranslateYOffset = 0;
      iRuntime.AddRuntimeComponentMessageHandler("runtime", "invoke-download", function (e) {
        return _this16._OnInvokeDownload(e);
      });
      iRuntime.AddRuntimeComponentMessageHandler("runtime", "load-webfonts", function (e) {
        return _this16._OnLoadWebFonts(e);
      });
      iRuntime.AddRuntimeComponentMessageHandler("runtime", "raster-svg-image", function (e) {
        return _this16._OnRasterSvgImage(e);
      });
      iRuntime.AddRuntimeComponentMessageHandler("runtime", "get-svg-image-size", function (e) {
        return _this16._OnGetSvgImageSize(e);
      });
      iRuntime.AddRuntimeComponentMessageHandler("runtime", "set-target-orientation", function (e) {
        return _this16._OnSetTargetOrientation(e);
      });
      iRuntime.AddRuntimeComponentMessageHandler("runtime", "register-sw", function () {
        return _this16._OnRegisterSW();
      });
      iRuntime.AddRuntimeComponentMessageHandler("runtime", "post-to-debugger", function (e) {
        return _this16._OnPostToDebugger(e);
      });
      iRuntime.AddRuntimeComponentMessageHandler("runtime", "go-to-script", function (e) {
        return _this16._OnPostToDebugger(e);
      });
      iRuntime.AddRuntimeComponentMessageHandler("runtime", "before-start-ticking", function () {
        return _this16._OnBeforeStartTicking();
      });
      iRuntime.AddRuntimeComponentMessageHandler("runtime", "debug-highlight", function (e) {
        return _this16._OnDebugHighlight(e);
      });
      iRuntime.AddRuntimeComponentMessageHandler("runtime", "enable-device-orientation", function () {
        return _this16._AttachDeviceOrientationEvent();
      });
      iRuntime.AddRuntimeComponentMessageHandler("runtime", "enable-device-motion", function () {
        return _this16._AttachDeviceMotionEvent();
      });
      iRuntime.AddRuntimeComponentMessageHandler("runtime", "add-stylesheet", function (e) {
        return _this16._OnAddStylesheet(e);
      });
      iRuntime.AddRuntimeComponentMessageHandler("runtime", "script-create-worker", function (e) {
        return _this16._OnScriptCreateWorker(e);
      });
      iRuntime.AddRuntimeComponentMessageHandler("runtime", "alert", function (e) {
        return _this16._OnAlert(e);
      });
      iRuntime.AddRuntimeComponentMessageHandler("runtime", "screen-reader-text", function (e) {
        return _this16._OnScreenReaderTextEvent(e);
      });
      iRuntime.AddRuntimeComponentMessageHandler("runtime", "hide-cordova-splash", function () {
        return _this16._OnHideCordovaSplash();
      });
      iRuntime.AddRuntimeComponentMessageHandler("runtime", "set-exporting-to-video", function (e) {
        return _this16._SetExportingToVideo(e);
      });
      iRuntime.AddRuntimeComponentMessageHandler("runtime", "export-to-video-progress", function (e) {
        return _this16._OnExportVideoProgress(e);
      });
      iRuntime.AddRuntimeComponentMessageHandler("runtime", "exported-to-video", function (e) {
        return _this16._OnExportedToVideo(e);
      });
      iRuntime.AddRuntimeComponentMessageHandler("runtime", "exported-to-image-sequence", function (e) {
        return _this16._OnExportedToImageSequence(e);
      });
      var allowDefaultContextMenuTagNames = new Set(["input", "textarea", "datalist"]);
      window.addEventListener("contextmenu", function (e) {
        var t = e.target;
        var name = t.tagName.toLowerCase();
        if (!allowDefaultContextMenuTagNames.has(name) && !IsInContentEditable(t)) e.preventDefault();
      });
      window.addEventListener("selectstart", PreventDefaultOnCanvasOrDoc);
      window.addEventListener("gesturehold", PreventDefaultOnCanvasOrDoc);
      window.addEventListener("touchstart", PreventDefaultOnCanvasOrDoc, {
        "passive": false
      });
      window.addEventListener("pointerdown", PreventDefaultOnCanvasOrDoc, {
        "passive": false
      });
      _this16._mousePointerLastButtons = 0;
      window.addEventListener("mousedown", function (e) {
        if (e.button === 1) e.preventDefault();
      });
      window.addEventListener("mousewheel", BlockWheelZoom, {
        "passive": false
      });
      window.addEventListener("wheel", BlockWheelZoom, {
        "passive": false
      });
      window.addEventListener("resize", function () {
        return _this16._OnWindowResize();
      });
      window.addEventListener("fullscreenchange", function () {
        return _this16._OnFullscreenChange();
      });
      window.addEventListener("webkitfullscreenchange", function () {
        return _this16._OnFullscreenChange();
      });
      window.addEventListener("mozfullscreenchange", function () {
        return _this16._OnFullscreenChange();
      });
      window.addEventListener("fullscreenerror", function (e) {
        return _this16._OnFullscreenError(e);
      });
      window.addEventListener("webkitfullscreenerror", function (e) {
        return _this16._OnFullscreenError(e);
      });
      window.addEventListener("mozfullscreenerror", function (e) {
        return _this16._OnFullscreenError(e);
      });

      if (iRuntime.IsiOSWebView()) {
        if (window["visualViewport"]) {
          var lastVisualViewportHeight = Infinity;
          window["visualViewport"].addEventListener("resize", function () {
            var curVisualViewportHeight = window["visualViewport"].height;

            if (curVisualViewportHeight > lastVisualViewportHeight) {
              document.scrollingElement.scrollTop = 0;
              document.scrollingElement.scrollLeft = 0;
            }

            lastVisualViewportHeight = curVisualViewportHeight;
          });
        } else window.addEventListener("focusout", function () {
          if (!KeyboardIsVisible()) document.scrollingElement.scrollTop = 0;
        });

        document.documentElement.setAttribute("ioswebview", "");
      }

      _this16._mediaPendingPlay = new Set();
      _this16._mediaRemovedPendingPlay = new WeakSet();
      _this16._isSilent = false;
      return _this16;
    }

    _createClass(RuntimeDOMHandler, [{
      key: "_AddDefaultCanvasEventHandlers",
      value: function _AddDefaultCanvasEventHandlers(canvas) {
        canvas.addEventListener("selectstart", PreventDefaultOnCanvasOrDoc);
        canvas.addEventListener("gesturehold", PreventDefaultOnCanvasOrDoc);
        canvas.addEventListener("pointerdown", PreventDefaultOnCanvasOrDoc);
      }
    }, {
      key: "_AddDefaultHTMLWrapEventHandlers",
      value: function _AddDefaultHTMLWrapEventHandlers(htmlwrap) {
        htmlwrap.addEventListener("selectstart", PreventDefaultOnHTMLWrap);
        htmlwrap.addEventListener("gesturehold", PreventDefaultOnHTMLWrap);
        htmlwrap.addEventListener("touchstart", PreventDefaultOnHTMLWrap);
      }
    }, {
      key: "_OnBeforeStartTicking",
      value: function _OnBeforeStartTicking() {
        var _this17 = this;

        self.setTimeout(function () {
          _this17._enableAndroidVKDetection = true;
        }, 1E3);

        if (this._iRuntime.GetExportType() === "cordova") {
          document.addEventListener("pause", function () {
            return _this17._OnVisibilityChange(true);
          });
          document.addEventListener("resume", function () {
            return _this17._OnVisibilityChange(false);
          });
        } else document.addEventListener("visibilitychange", function () {
          return _this17._OnVisibilityChange(document.visibilityState === "hidden");
        });

        this._pageVisibilityIsHidden = !!(document.visibilityState === "hidden" || isCordovaPaused);
        return {
          "isSuspended": this._pageVisibilityIsHidden
        };
      }
    }, {
      key: "Attach",
      value: function Attach() {
        var _this18 = this;

        window.addEventListener("focus", function () {
          return _this18._PostRuntimeEvent("window-focus");
        });
        window.addEventListener("blur", function () {
          _this18._PostRuntimeEvent("window-blur", {
            "parentHasFocus": ParentHasFocus()
          });

          _this18._mousePointerLastButtons = 0;
        });
        window.addEventListener("focusin", function (e) {
          if (IsKeyboardInputElement(e.target)) _this18._PostRuntimeEvent("keyboard-blur");
        });
        window.addEventListener("keydown", function (e) {
          return _this18._OnKeyEvent("keydown", e);
        });
        window.addEventListener("keyup", function (e) {
          return _this18._OnKeyEvent("keyup", e);
        });
        window.addEventListener("mousedown", function (e) {
          return _this18._OnMouseEvent("mousedown", e, DISPATCH_SCRIPT_ONLY);
        });
        window.addEventListener("mousemove", function (e) {
          return _this18._OnMouseEvent("mousemove", e, DISPATCH_SCRIPT_ONLY);
        });
        window.addEventListener("mouseup", function (e) {
          return _this18._OnMouseEvent("mouseup", e, DISPATCH_SCRIPT_ONLY);
        });
        window.addEventListener("dblclick", function (e) {
          return _this18._OnMouseEvent("dblclick", e, DISPATCH_RUNTIME_AND_SCRIPT);
        });
        window.addEventListener("wheel", function (e) {
          return _this18._OnMouseWheelEvent("wheel", e, DISPATCH_RUNTIME_AND_SCRIPT);
        });
        window.addEventListener("pointerdown", function (e) {
          _this18._HandlePointerDownFocus(e);

          _this18._OnPointerEvent("pointerdown", e);
        });
        if (this._iRuntime.UsesWorker() && typeof window["onpointerrawupdate"] !== "undefined" && self === self.top) window.addEventListener("pointerrawupdate", function (e) {
          return _this18._OnPointerRawUpdate(e);
        });else window.addEventListener("pointermove", function (e) {
          return _this18._OnPointerEvent("pointermove", e);
        });
        window.addEventListener("pointerup", function (e) {
          return _this18._OnPointerEvent("pointerup", e);
        });
        window.addEventListener("pointercancel", function (e) {
          return _this18._OnPointerEvent("pointercancel", e);
        });

        var playFunc = function playFunc() {
          return _this18._PlayPendingMedia();
        };

        window.addEventListener("pointerup", playFunc, true);
        window.addEventListener("touchend", playFunc, true);
        window.addEventListener("click", playFunc, true);
        window.addEventListener("keydown", playFunc, true);
        window.addEventListener("gamepadconnected", playFunc, true);

        if (this._iRuntime.IsAndroid() && !this._iRuntime.IsAndroidWebView() && navigator["virtualKeyboard"]) {
          navigator["virtualKeyboard"]["overlaysContent"] = true;
          navigator["virtualKeyboard"].addEventListener("geometrychange", function () {
            _this18._OnAndroidVirtualKeyboardChange(_this18._GetWindowInnerHeight(), navigator["virtualKeyboard"]["boundingRect"]["height"]);
          });
        }

        if (this._iRuntime.IsiOSWebView()) {
          document.scrollingElement.scrollTop = 0;
          document.scrollingElement.scrollLeft = 0;
        }
      }
    }, {
      key: "_OnAndroidVirtualKeyboardChange",
      value: function _OnAndroidVirtualKeyboardChange(windowHeight, vkHeight) {
        document.body.style.position = "";
        document.body.style.overflow = "";
        document.body.style.transform = "";
        this._vkTranslateYOffset = 0;

        if (vkHeight > 0) {
          var activeElement = document.activeElement;

          if (activeElement) {
            var rc = activeElement.getBoundingClientRect();
            var rcMidY = (rc.top + rc.bottom) / 2;
            var targetY = (windowHeight - vkHeight) / 2;
            var shiftY = rcMidY - targetY;
            if (shiftY > vkHeight) shiftY = vkHeight;
            if (shiftY < 0) shiftY = 0;

            if (shiftY > 0) {
              document.body.style.position = "absolute";
              document.body.style.overflow = "visible";
              document.body.style.transform = "translateY(".concat(-shiftY, "px)");
              this._vkTranslateYOffset = shiftY;
            }
          }
        }
      }
    }, {
      key: "_PostRuntimeEvent",
      value: function _PostRuntimeEvent(name, data) {
        this.PostToRuntime(name, data || null, DISPATCH_RUNTIME_ONLY);
      }
    }, {
      key: "_GetWindowInnerWidth",
      value: function _GetWindowInnerWidth() {
        return this._iRuntime._GetWindowInnerWidth();
      }
    }, {
      key: "_GetWindowInnerHeight",
      value: function _GetWindowInnerHeight() {
        return this._iRuntime._GetWindowInnerHeight();
      }
    }, {
      key: "_EnableWindowResizeEvent",
      value: function _EnableWindowResizeEvent() {
        this._enableWindowResizeEvent = true;
        this._lastWindowWidth = this._iRuntime._GetWindowInnerWidth();
        this._lastWindowHeight = this._iRuntime._GetWindowInnerHeight();
      }
    }, {
      key: "_OnWindowResize",
      value: function _OnWindowResize() {
        if (this._isExportToVideo) return;
        if (!this._enableWindowResizeEvent) return;

        var width = this._GetWindowInnerWidth();

        var height = this._GetWindowInnerHeight();

        if (this._iRuntime.IsAndroidWebView()) if (this._enableAndroidVKDetection) {
          if (this._lastWindowWidth === width && height < this._lastWindowHeight) {
            this._virtualKeyboardHeight = this._lastWindowHeight - height;

            this._OnAndroidVirtualKeyboardChange(this._lastWindowHeight, this._virtualKeyboardHeight);

            return;
          } else {
            if (this._virtualKeyboardHeight > 0) {
              this._virtualKeyboardHeight = 0;

              this._OnAndroidVirtualKeyboardChange(height, this._virtualKeyboardHeight);
            }

            this._lastWindowWidth = width;
            this._lastWindowHeight = height;
          }
        } else {
          this._lastWindowWidth = width;
          this._lastWindowHeight = height;
        }
        this.PostToRuntime("window-resize", {
          "innerWidth": width,
          "innerHeight": height,
          "devicePixelRatio": window.devicePixelRatio,
          "isFullscreen": _RuntimeInterface.IsDocumentFullscreen()
        });

        if (this._iRuntime.IsiOSWebView()) {
          if (this._simulatedResizeTimerId !== -1) clearTimeout(this._simulatedResizeTimerId);

          this._OnSimulatedResize(width, height, 0);
        }
      }
    }, {
      key: "_ScheduleSimulatedResize",
      value: function _ScheduleSimulatedResize(width, height, count) {
        var _this19 = this;

        if (this._simulatedResizeTimerId !== -1) clearTimeout(this._simulatedResizeTimerId);
        this._simulatedResizeTimerId = setTimeout(function () {
          return _this19._OnSimulatedResize(width, height, count);
        }, 48);
      }
    }, {
      key: "_OnSimulatedResize",
      value: function _OnSimulatedResize(originalWidth, originalHeight, count) {
        var width = this._GetWindowInnerWidth();

        var height = this._GetWindowInnerHeight();

        this._simulatedResizeTimerId = -1;
        if (width != originalWidth || height != originalHeight) this.PostToRuntime("window-resize", {
          "innerWidth": width,
          "innerHeight": height,
          "devicePixelRatio": window.devicePixelRatio,
          "isFullscreen": _RuntimeInterface.IsDocumentFullscreen()
        });else if (count < 10) this._ScheduleSimulatedResize(width, height, count + 1);
      }
    }, {
      key: "_OnSetTargetOrientation",
      value: function _OnSetTargetOrientation(e) {
        this._targetOrientation = e["targetOrientation"];
      }
    }, {
      key: "_TrySetTargetOrientation",
      value: function _TrySetTargetOrientation() {
        var orientation = this._targetOrientation;
        if (screen["orientation"] && screen["orientation"]["lock"]) screen["orientation"]["lock"](orientation)["catch"](function (err) {
          return console.warn("[Construct] Failed to lock orientation: ", err);
        });else try {
          var result = false;
          if (screen["lockOrientation"]) result = screen["lockOrientation"](orientation);else if (screen["webkitLockOrientation"]) result = screen["webkitLockOrientation"](orientation);else if (screen["mozLockOrientation"]) result = screen["mozLockOrientation"](orientation);else if (screen["msLockOrientation"]) result = screen["msLockOrientation"](orientation);
          if (!result) console.warn("[Construct] Failed to lock orientation");
        } catch (err) {
          console.warn("[Construct] Failed to lock orientation: ", err);
        }
      }
    }, {
      key: "_OnFullscreenChange",
      value: function _OnFullscreenChange() {
        if (this._isExportToVideo) return;

        var isDocFullscreen = _RuntimeInterface.IsDocumentFullscreen();

        if (isDocFullscreen && this._targetOrientation !== "any") this._TrySetTargetOrientation();
        this.PostToRuntime("fullscreenchange", {
          "isFullscreen": isDocFullscreen,
          "innerWidth": this._GetWindowInnerWidth(),
          "innerHeight": this._GetWindowInnerHeight()
        });
      }
    }, {
      key: "_OnFullscreenError",
      value: function _OnFullscreenError(e) {
        console.warn("[Construct] Fullscreen request failed: ", e);
        this.PostToRuntime("fullscreenerror", {
          "isFullscreen": _RuntimeInterface.IsDocumentFullscreen(),
          "innerWidth": this._GetWindowInnerWidth(),
          "innerHeight": this._GetWindowInnerHeight()
        });
      }
    }, {
      key: "_OnVisibilityChange",
      value: function _OnVisibilityChange(isHidden) {
        if (this._pageVisibilityIsHidden === isHidden) return;
        this._pageVisibilityIsHidden = isHidden;
        if (isHidden) this._iRuntime._CancelAnimationFrame();else this._iRuntime._RequestAnimationFrame();
        this.PostToRuntime("visibilitychange", {
          "hidden": isHidden
        });

        if (!isHidden && this._iRuntime.IsiOSWebView()) {
          var resetScrollFunc = function resetScrollFunc() {
            document.scrollingElement.scrollTop = 0;
            document.scrollingElement.scrollLeft = 0;
          };

          setTimeout(resetScrollFunc, 50);
          setTimeout(resetScrollFunc, 100);
          setTimeout(resetScrollFunc, 250);
          setTimeout(resetScrollFunc, 500);
        }
      }
    }, {
      key: "_OnKeyEvent",
      value: function _OnKeyEvent(name, e) {
        if (e.key === "Backspace") PreventDefaultOnCanvasOrDoc(e);

        if (this._iRuntime.IsAnyWebView2Wrapper()) {
          var blockKeys = ["F3", "F5", "F7"];
          var blockKeysWithCtrl = ["r", "p", "f", "g", "u"];
          if (blockKeys.includes(e.key) || e.ctrlKey && blockKeysWithCtrl.includes(e.key)) e.preventDefault();
        }

        if (this._isExportToVideo) return;
        var code = KEY_CODE_ALIASES.get(e.code) || e.code;

        this._PostToRuntimeMaybeSync(name, {
          "code": code,
          "key": e.key,
          "which": e.which,
          "repeat": e.repeat,
          "altKey": e.altKey,
          "ctrlKey": e.ctrlKey,
          "metaKey": e.metaKey,
          "shiftKey": e.shiftKey,
          "timeStamp": e.timeStamp
        }, DISPATCH_RUNTIME_AND_SCRIPT);
      }
    }, {
      key: "_OnMouseWheelEvent",
      value: function _OnMouseWheelEvent(name, e, opts) {
        if (this._isExportToVideo) return;
        this.PostToRuntime(name, {
          "clientX": e.clientX,
          "clientY": e.clientY + this._vkTranslateYOffset,
          "pageX": e.pageX,
          "pageY": e.pageY + this._vkTranslateYOffset,
          "deltaX": e.deltaX,
          "deltaY": e.deltaY,
          "deltaZ": e.deltaZ,
          "deltaMode": e.deltaMode,
          "timeStamp": e.timeStamp
        }, opts);
      }
    }, {
      key: "_OnMouseEvent",
      value: function _OnMouseEvent(name, e, opts) {
        if (this._isExportToVideo) return;
        if (IsCompatibilityMouseEvent(e)) return;

        this._PostToRuntimeMaybeSync(name, {
          "button": e.button,
          "buttons": e.buttons,
          "clientX": e.clientX,
          "clientY": e.clientY + this._vkTranslateYOffset,
          "pageX": e.pageX,
          "pageY": e.pageY + this._vkTranslateYOffset,
          "movementX": e.movementX || 0,
          "movementY": e.movementY || 0,
          "timeStamp": e.timeStamp
        }, opts);
      }
    }, {
      key: "_OnPointerEvent",
      value: function _OnPointerEvent(name, e) {
        if (this._isExportToVideo) return;
        var lastButtons = 0;
        if (e.pointerType === "mouse") lastButtons = this._mousePointerLastButtons;

        this._PostToRuntimeMaybeSync(name, {
          "pointerId": e.pointerId,
          "pointerType": e.pointerType,
          "button": e.button,
          "buttons": e.buttons,
          "lastButtons": lastButtons,
          "clientX": e.clientX,
          "clientY": e.clientY + this._vkTranslateYOffset,
          "pageX": e.pageX,
          "pageY": e.pageY + this._vkTranslateYOffset,
          "movementX": e.movementX || 0,
          "movementY": e.movementY || 0,
          "width": e.width || 0,
          "height": e.height || 0,
          "pressure": e.pressure || 0,
          "tangentialPressure": e["tangentialPressure"] || 0,
          "tiltX": e.tiltX || 0,
          "tiltY": e.tiltY || 0,
          "twist": e["twist"] || 0,
          "timeStamp": e.timeStamp
        }, DISPATCH_RUNTIME_AND_SCRIPT);

        if (e.pointerType === "mouse") this._mousePointerLastButtons = e.buttons;
      }
    }, {
      key: "_OnPointerRawUpdate",
      value: function _OnPointerRawUpdate(e) {
        this._OnPointerEvent("pointermove", e);
      }
    }, {
      key: "_OnTouchEvent",
      value: function _OnTouchEvent(fireName, e) {
        if (this._isExportToVideo) return;

        for (var i = 0, len = e.changedTouches.length; i < len; ++i) {
          var t = e.changedTouches[i];

          this._PostToRuntimeMaybeSync(fireName, {
            "pointerId": t.identifier,
            "pointerType": "touch",
            "button": 0,
            "buttons": 0,
            "lastButtons": 0,
            "clientX": t.clientX,
            "clientY": t.clientY + this._vkTranslateYOffset,
            "pageX": t.pageX,
            "pageY": t.pageY + this._vkTranslateYOffset,
            "movementX": e.movementX || 0,
            "movementY": e.movementY || 0,
            "width": (t["radiusX"] || t["webkitRadiusX"] || 0) * 2,
            "height": (t["radiusY"] || t["webkitRadiusY"] || 0) * 2,
            "pressure": t["force"] || t["webkitForce"] || 0,
            "tangentialPressure": 0,
            "tiltX": 0,
            "tiltY": 0,
            "twist": t["rotationAngle"] || 0,
            "timeStamp": e.timeStamp
          }, DISPATCH_RUNTIME_AND_SCRIPT);
        }
      }
    }, {
      key: "_HandlePointerDownFocus",
      value: function _HandlePointerDownFocus(e) {
        if (window !== window.top) window.focus();
        if (this._IsElementCanvasOrDocument(e.target) && document.activeElement && !this._IsElementCanvasOrDocument(document.activeElement)) document.activeElement.blur();
      }
    }, {
      key: "_IsElementCanvasOrDocument",
      value: function _IsElementCanvasOrDocument(elem) {
        return !elem || elem === document || elem === window || elem === document.body || elem.tagName.toLowerCase() === "canvas";
      }
    }, {
      key: "_AttachDeviceOrientationEvent",
      value: function _AttachDeviceOrientationEvent() {
        var _this20 = this;

        if (this._attachedDeviceOrientationEvent) return;
        this._attachedDeviceOrientationEvent = true;
        window.addEventListener("deviceorientation", function (e) {
          return _this20._OnDeviceOrientation(e);
        });
        window.addEventListener("deviceorientationabsolute", function (e) {
          return _this20._OnDeviceOrientationAbsolute(e);
        });
      }
    }, {
      key: "_AttachDeviceMotionEvent",
      value: function _AttachDeviceMotionEvent() {
        var _this21 = this;

        if (this._attachedDeviceMotionEvent) return;
        this._attachedDeviceMotionEvent = true;
        window.addEventListener("devicemotion", function (e) {
          return _this21._OnDeviceMotion(e);
        });
      }
    }, {
      key: "_OnDeviceOrientation",
      value: function _OnDeviceOrientation(e) {
        if (this._isExportToVideo) return;
        this.PostToRuntime("deviceorientation", {
          "absolute": !!e["absolute"],
          "alpha": e["alpha"] || 0,
          "beta": e["beta"] || 0,
          "gamma": e["gamma"] || 0,
          "timeStamp": e.timeStamp,
          "webkitCompassHeading": e["webkitCompassHeading"],
          "webkitCompassAccuracy": e["webkitCompassAccuracy"]
        }, DISPATCH_RUNTIME_AND_SCRIPT);
      }
    }, {
      key: "_OnDeviceOrientationAbsolute",
      value: function _OnDeviceOrientationAbsolute(e) {
        if (this._isExportToVideo) return;
        this.PostToRuntime("deviceorientationabsolute", {
          "absolute": !!e["absolute"],
          "alpha": e["alpha"] || 0,
          "beta": e["beta"] || 0,
          "gamma": e["gamma"] || 0,
          "timeStamp": e.timeStamp
        }, DISPATCH_RUNTIME_AND_SCRIPT);
      }
    }, {
      key: "_OnDeviceMotion",
      value: function _OnDeviceMotion(e) {
        if (this._isExportToVideo) return;
        var accProp = null;
        var acc = e["acceleration"];
        if (acc) accProp = {
          "x": acc["x"] || 0,
          "y": acc["y"] || 0,
          "z": acc["z"] || 0
        };
        var withGProp = null;
        var withG = e["accelerationIncludingGravity"];
        if (withG) withGProp = {
          "x": withG["x"] || 0,
          "y": withG["y"] || 0,
          "z": withG["z"] || 0
        };
        var rotationRateProp = null;
        var rotationRate = e["rotationRate"];
        if (rotationRate) rotationRateProp = {
          "alpha": rotationRate["alpha"] || 0,
          "beta": rotationRate["beta"] || 0,
          "gamma": rotationRate["gamma"] || 0
        };
        this.PostToRuntime("devicemotion", {
          "acceleration": accProp,
          "accelerationIncludingGravity": withGProp,
          "rotationRate": rotationRateProp,
          "interval": e["interval"],
          "timeStamp": e.timeStamp
        }, DISPATCH_RUNTIME_AND_SCRIPT);
      }
    }, {
      key: "_OnInvokeDownload",
      value: function _OnInvokeDownload(e) {
        var url = e["url"];
        var filename = e["filename"];
        var a = document.createElement("a");
        var body = document.body;
        a.textContent = filename;
        a.href = url;
        a.download = filename;
        body.appendChild(a);
        a.click();
        body.removeChild(a);
      }
    }, {
      key: "_OnLoadWebFonts",
      value: function _OnLoadWebFonts(e) {
        var webfonts;
        return regeneratorRuntime.async(function _OnLoadWebFonts$(_context24) {
          while (1) {
            switch (_context24.prev = _context24.next) {
              case 0:
                webfonts = e["webfonts"];
                _context24.next = 3;
                return regeneratorRuntime.awrap(Promise.all(webfonts.map(function _callee3(info) {
                  var fontFace;
                  return regeneratorRuntime.async(function _callee3$(_context23) {
                    while (1) {
                      switch (_context23.prev = _context23.next) {
                        case 0:
                          fontFace = new FontFace(info.name, "url('".concat(info.url, "')"));
                          document.fonts.add(fontFace);
                          _context23.next = 4;
                          return regeneratorRuntime.awrap(fontFace.load());

                        case 4:
                        case "end":
                          return _context23.stop();
                      }
                    }
                  });
                })));

              case 3:
              case "end":
                return _context24.stop();
            }
          }
        });
      }
    }, {
      key: "_OnRasterSvgImage",
      value: function _OnRasterSvgImage(e) {
        var blob, imageWidth, imageHeight, surfaceWidth, surfaceHeight, imageBitmapOpts, canvas, ret;
        return regeneratorRuntime.async(function _OnRasterSvgImage$(_context25) {
          while (1) {
            switch (_context25.prev = _context25.next) {
              case 0:
                blob = e["blob"];
                imageWidth = e["imageWidth"];
                imageHeight = e["imageHeight"];
                surfaceWidth = e["surfaceWidth"];
                surfaceHeight = e["surfaceHeight"];
                imageBitmapOpts = e["imageBitmapOpts"];
                _context25.next = 8;
                return regeneratorRuntime.awrap(self["C3_RasterSvgImageBlob"](blob, imageWidth, imageHeight, surfaceWidth, surfaceHeight));

              case 8:
                canvas = _context25.sent;

                if (!imageBitmapOpts) {
                  _context25.next = 15;
                  break;
                }

                _context25.next = 12;
                return regeneratorRuntime.awrap(createImageBitmap(canvas, imageBitmapOpts));

              case 12:
                ret = _context25.sent;
                _context25.next = 18;
                break;

              case 15:
                _context25.next = 17;
                return regeneratorRuntime.awrap(createImageBitmap(canvas));

              case 17:
                ret = _context25.sent;

              case 18:
                return _context25.abrupt("return", {
                  "imageBitmap": ret,
                  "transferables": [ret]
                });

              case 19:
              case "end":
                return _context25.stop();
            }
          }
        });
      }
    }, {
      key: "_OnGetSvgImageSize",
      value: function _OnGetSvgImageSize(e) {
        return regeneratorRuntime.async(function _OnGetSvgImageSize$(_context26) {
          while (1) {
            switch (_context26.prev = _context26.next) {
              case 0:
                _context26.next = 2;
                return regeneratorRuntime.awrap(self["C3_GetSvgImageSize"](e["blob"]));

              case 2:
                return _context26.abrupt("return", _context26.sent);

              case 3:
              case "end":
                return _context26.stop();
            }
          }
        });
      }
    }, {
      key: "_OnAddStylesheet",
      value: function _OnAddStylesheet(e) {
        return regeneratorRuntime.async(function _OnAddStylesheet$(_context27) {
          while (1) {
            switch (_context27.prev = _context27.next) {
              case 0:
                _context27.next = 2;
                return regeneratorRuntime.awrap(AddStyleSheet(e["url"]));

              case 2:
              case "end":
                return _context27.stop();
            }
          }
        });
      }
    }, {
      key: "_PlayPendingMedia",
      value: function _PlayPendingMedia() {
        var _this22 = this;

        var mediaToTryPlay = _toConsumableArray(this._mediaPendingPlay);

        this._mediaPendingPlay.clear();

        if (!this._isSilent) {
          var _iteratorNormalCompletion13 = true;
          var _didIteratorError13 = false;
          var _iteratorError13 = undefined;

          try {
            var _loop = function _loop() {
              var mediaElem = _step13.value;
              var playRet = mediaElem.play();
              if (playRet) playRet["catch"](function (err) {
                if (!_this22._mediaRemovedPendingPlay.has(mediaElem)) _this22._mediaPendingPlay.add(mediaElem);
              });
            };

            for (var _iterator13 = mediaToTryPlay[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
              _loop();
            }
          } catch (err) {
            _didIteratorError13 = true;
            _iteratorError13 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion13 && _iterator13["return"] != null) {
                _iterator13["return"]();
              }
            } finally {
              if (_didIteratorError13) {
                throw _iteratorError13;
              }
            }
          }
        }
      }
    }, {
      key: "TryPlayMedia",
      value: function TryPlayMedia(mediaElem) {
        var _this23 = this;

        if (typeof mediaElem.play !== "function") throw new Error("missing play function");

        this._mediaRemovedPendingPlay["delete"](mediaElem);

        var playRet;

        try {
          playRet = mediaElem.play();
        } catch (err) {
          this._mediaPendingPlay.add(mediaElem);

          return;
        }

        if (playRet) playRet["catch"](function (err) {
          if (!_this23._mediaRemovedPendingPlay.has(mediaElem)) _this23._mediaPendingPlay.add(mediaElem);
        });
      }
    }, {
      key: "RemovePendingPlay",
      value: function RemovePendingPlay(mediaElem) {
        this._mediaPendingPlay["delete"](mediaElem);

        this._mediaRemovedPendingPlay.add(mediaElem);
      }
    }, {
      key: "SetSilent",
      value: function SetSilent(s) {
        this._isSilent = !!s;
      }
    }, {
      key: "_OnHideCordovaSplash",
      value: function _OnHideCordovaSplash() {
        if (navigator["splashscreen"] && navigator["splashscreen"]["hide"]) navigator["splashscreen"]["hide"]();
      }
    }, {
      key: "_OnDebugHighlight",
      value: function _OnDebugHighlight(e) {
        var show = e["show"];

        if (!show) {
          if (this._debugHighlightElem) this._debugHighlightElem.style.display = "none";
          return;
        }

        if (!this._debugHighlightElem) {
          this._debugHighlightElem = document.createElement("div");
          this._debugHighlightElem.id = "inspectOutline";
          document.body.appendChild(this._debugHighlightElem);
        }

        var elem = this._debugHighlightElem;
        elem.style.display = "";
        elem.style.left = e["left"] - 1 + "px";
        elem.style.top = e["top"] - 1 + "px";
        elem.style.width = e["width"] + 2 + "px";
        elem.style.height = e["height"] + 2 + "px";
        elem.textContent = e["name"];
      }
    }, {
      key: "_OnRegisterSW",
      value: function _OnRegisterSW() {
        if (window["C3_RegisterSW"]) window["C3_RegisterSW"]();
      }
    }, {
      key: "_OnPostToDebugger",
      value: function _OnPostToDebugger(data) {
        if (!window["c3_postToMessagePort"]) return;
        data["from"] = "runtime";
        window["c3_postToMessagePort"](data);
      }
    }, {
      key: "_InvokeFunctionFromJS",
      value: function _InvokeFunctionFromJS(name, params) {
        return this.PostToRuntimeAsync("js-invoke-function", {
          "name": name,
          "params": params
        });
      }
    }, {
      key: "_OnScriptCreateWorker",
      value: function _OnScriptCreateWorker(e) {
        var url = e["url"];
        var opts = e["opts"];
        var port2 = e["port2"];
        var worker = new Worker(url, opts);
        worker.postMessage({
          "type": "construct-worker-init",
          "port2": port2
        }, [port2]);
      }
    }, {
      key: "_OnAlert",
      value: function _OnAlert(e) {
        alert(e["message"]);
      }
    }, {
      key: "_OnScreenReaderTextEvent",
      value: function _OnScreenReaderTextEvent(e) {
        var type = e["type"];

        if (type === "create") {
          var p = document.createElement("p");
          p.id = "c3-sr-" + e["id"];
          p.textContent = e["text"];

          this._screenReaderTextWrap.appendChild(p);
        } else if (type === "update") {
          var _p = document.getElementById("c3-sr-" + e["id"]);

          if (_p) _p.textContent = e["text"];else console.warn("[Construct] Missing screen reader text with id ".concat(e["id"]));
        } else if (type === "release") {
          var _p2 = document.getElementById("c3-sr-" + e["id"]);

          if (_p2) _p2.remove();else console.warn("[Construct] Missing screen reader text with id ".concat(e["id"]));
        } else console.warn("[Construct] Unknown screen reader text update '".concat(type, "'"));
      }
    }, {
      key: "_SetExportingToVideo",
      value: function _SetExportingToVideo(e) {
        this._isExportToVideo = true;
        var headerElem = document.createElement("h1");
        headerElem.id = "exportToVideoMessage";
        headerElem.textContent = e["message"];
        document.body.prepend(headerElem);
        document.body.classList.add("exportingToVideo");
        this.GetRuntimeInterface().GetMainCanvas().style.display = "";

        this._iRuntime.SetIsExportingToVideo(e["duration"]);
      }
    }, {
      key: "_OnExportVideoProgress",
      value: function _OnExportVideoProgress(e) {
        var _this24 = this;

        this._exportVideoProgressMessage = e["message"];
        if (this._exportVideoUpdateTimerId === -1) this._exportVideoUpdateTimerId = setTimeout(function () {
          return _this24._DoUpdateExportVideoProgressMessage();
        }, 250);
      }
    }, {
      key: "_DoUpdateExportVideoProgressMessage",
      value: function _DoUpdateExportVideoProgressMessage() {
        this._exportVideoUpdateTimerId = -1;
        var headerElem = document.getElementById("exportToVideoMessage");
        if (headerElem) headerElem.textContent = this._exportVideoProgressMessage;
      }
    }, {
      key: "_OnExportedToVideo",
      value: function _OnExportedToVideo(e) {
        window.c3_postToMessagePort({
          "type": "exported-video",
          "arrayBuffer": e["arrayBuffer"],
          "contentType": e["contentType"],
          "time": e["time"]
        });
      }
    }, {
      key: "_OnExportedToImageSequence",
      value: function _OnExportedToImageSequence(e) {
        window.c3_postToMessagePort({
          "type": "exported-image-sequence",
          "blobArr": e["blobArr"],
          "time": e["time"],
          "gif": e["gif"]
        });
      }
    }]);

    return RuntimeDOMHandler;
  }(self.DOMHandler);

  _RuntimeInterface.AddDOMHandlerClass(HANDLER_CLASS);
}
;
'use strict';

{
  var DISPATCH_WORKER_SCRIPT_NAME = "dispatchworker.js";
  var JOB_WORKER_SCRIPT_NAME = "jobworker.js";

  self.JobSchedulerDOM =
  /*#__PURE__*/
  function () {
    function JobSchedulerDOM(runtimeInterface) {
      _classCallCheck(this, JobSchedulerDOM);

      this._runtimeInterface = runtimeInterface;
      this._baseUrl = runtimeInterface.GetRuntimeBaseURL();
      if (runtimeInterface.GetExportType() === "preview") this._baseUrl += "workers/";else this._baseUrl += runtimeInterface.GetScriptFolder();
      this._maxNumWorkers = Math.min(navigator.hardwareConcurrency || 2, 16);
      this._dispatchWorker = null;
      this._jobWorkers = [];
      this._inputPort = null;
      this._outputPort = null;
    }

    _createClass(JobSchedulerDOM, [{
      key: "_GetWorkerScriptFolder",
      value: function _GetWorkerScriptFolder() {
        if (this._runtimeInterface.GetExportType() === "playable-ad") return this._runtimeInterface.GetScriptFolder();else return "";
      }
    }, {
      key: "Init",
      value: function Init() {
        var dispatchWorkerScriptUrl, messageChannel;
        return regeneratorRuntime.async(function Init$(_context28) {
          while (1) {
            switch (_context28.prev = _context28.next) {
              case 0:
                if (!this._hasInitialised) {
                  _context28.next = 2;
                  break;
                }

                throw new Error("already initialised");

              case 2:
                this._hasInitialised = true;
                dispatchWorkerScriptUrl = this._runtimeInterface._GetWorkerURL(this._GetWorkerScriptFolder() + DISPATCH_WORKER_SCRIPT_NAME);
                _context28.next = 6;
                return regeneratorRuntime.awrap(this._runtimeInterface.CreateWorker(dispatchWorkerScriptUrl, this._baseUrl, {
                  name: "DispatchWorker"
                }));

              case 6:
                this._dispatchWorker = _context28.sent;
                messageChannel = new MessageChannel();
                this._inputPort = messageChannel.port1;

                this._dispatchWorker.postMessage({
                  "type": "_init",
                  "in-port": messageChannel.port2
                }, [messageChannel.port2]);

                _context28.next = 12;
                return regeneratorRuntime.awrap(this._CreateJobWorker());

              case 12:
                this._outputPort = _context28.sent;

              case 13:
              case "end":
                return _context28.stop();
            }
          }
        }, null, this);
      }
    }, {
      key: "_CreateJobWorker",
      value: function _CreateJobWorker() {
        var number, jobWorkerScriptUrl, jobWorker, dispatchChannel, outputChannel;
        return regeneratorRuntime.async(function _CreateJobWorker$(_context29) {
          while (1) {
            switch (_context29.prev = _context29.next) {
              case 0:
                number = this._jobWorkers.length;
                jobWorkerScriptUrl = this._runtimeInterface._GetWorkerURL(this._GetWorkerScriptFolder() + JOB_WORKER_SCRIPT_NAME);
                _context29.next = 4;
                return regeneratorRuntime.awrap(this._runtimeInterface.CreateWorker(jobWorkerScriptUrl, this._baseUrl, {
                  name: "JobWorker" + number
                }));

              case 4:
                jobWorker = _context29.sent;
                dispatchChannel = new MessageChannel();
                outputChannel = new MessageChannel();

                this._dispatchWorker.postMessage({
                  "type": "_addJobWorker",
                  "port": dispatchChannel.port1
                }, [dispatchChannel.port1]);

                jobWorker.postMessage({
                  "type": "init",
                  "number": number,
                  "dispatch-port": dispatchChannel.port2,
                  "output-port": outputChannel.port2
                }, [dispatchChannel.port2, outputChannel.port2]);

                this._jobWorkers.push(jobWorker);

                return _context29.abrupt("return", outputChannel.port1);

              case 11:
              case "end":
                return _context29.stop();
            }
          }
        }, null, this);
      }
    }, {
      key: "GetPortData",
      value: function GetPortData() {
        return {
          "inputPort": this._inputPort,
          "outputPort": this._outputPort,
          "maxNumWorkers": this._maxNumWorkers
        };
      }
    }, {
      key: "GetPortTransferables",
      value: function GetPortTransferables() {
        return [this._inputPort, this._outputPort];
      }
    }]);

    return JobSchedulerDOM;
  }();
}
;
'use strict';

{
  if (window["C3_Is_Supported"]) {
    var enableWorker = true;
    window["c3_runtimeInterface"] = new self.RuntimeInterface({
      useWorker: enableWorker,
      workerMainUrl: "workermain.js",
      engineScripts: ["scripts/c3runtime.js"],
      projectScripts: [],
      mainProjectScript: "",
      scriptFolder: "scripts/",
      workerDependencyScripts: [],
      exportType: "html5"
    });
  }
}
;
'use strict';

{
  var R_TO_D = 180 / Math.PI;
  var _DOM_COMPONENT_ID = "audio";

  self.AudioDOMHandler =
  /*#__PURE__*/
  function (_self$DOMHandler3) {
    _inherits(AudioDOMHandler, _self$DOMHandler3);

    function AudioDOMHandler(iRuntime) {
      var _this25;

      _classCallCheck(this, AudioDOMHandler);

      _this25 = _possibleConstructorReturn(this, _getPrototypeOf(AudioDOMHandler).call(this, iRuntime, _DOM_COMPONENT_ID));
      _this25._audioContext = null;
      _this25._destinationNode = null;
      _this25._hasUnblocked = false;
      _this25._hasAttachedUnblockEvents = false;

      _this25._unblockFunc = function () {
        return _this25._UnblockAudioContext();
      };

      _this25._audioBuffers = [];
      _this25._audioInstances = [];
      _this25._lastAudioInstance = null;
      _this25._lastPlayedTags = [];
      _this25._loadedAudioUrls = new Set();
      _this25._lastTickCount = -1;
      _this25._pendingTags = new Map();
      _this25._masterVolume = 1;
      _this25._isSilent = false;
      _this25._timeScaleMode = 0;
      _this25._timeScale = 1;
      _this25._gameTime = 0;
      _this25._panningModel = "HRTF";
      _this25._distanceModel = "inverse";
      _this25._refDistance = 600;
      _this25._maxDistance = 1E4;
      _this25._rolloffFactor = 1;
      _this25._lastListenerPos = [0, 0, 0];
      _this25._lastListenerOrientation = [0, 0, -1, 0, 1, 0];
      _this25._playMusicAsSound = false;
      _this25._hasAnySoftwareDecodedMusic = false;
      _this25._supportsWebMOpus = _this25._iRuntime.IsAudioFormatSupported("audio/webm; codecs=opus");
      _this25._effects = new Map();
      _this25._analysers = new Set();
      _this25._isPendingPostFxState = false;
      _this25._hasStartedOfflineRender = false;
      _this25._microphoneTag = "";
      _this25._microphoneSource = null;

      self["C3Audio_OnMicrophoneStream"] = function (localMediaStream, tag) {
        return _this25._OnMicrophoneStream(localMediaStream, tag);
      };

      _this25._destMediaStreamNode = null;

      self["C3Audio_GetOutputStream"] = function () {
        return _this25._OnGetOutputStream();
      };

      self["C3Audio_DOMInterface"] = _assertThisInitialized(_this25);

      _this25.AddRuntimeMessageHandlers([["create-audio-context", function (e) {
        return _this25._CreateAudioContext(e);
      }], ["play", function (e) {
        return _this25._Play(e);
      }], ["stop", function (e) {
        return _this25._Stop(e);
      }], ["stop-all", function () {
        return _this25._StopAll();
      }], ["set-paused", function (e) {
        return _this25._SetPaused(e);
      }], ["set-volume", function (e) {
        return _this25._SetVolume(e);
      }], ["fade-volume", function (e) {
        return _this25._FadeVolume(e);
      }], ["set-master-volume", function (e) {
        return _this25._SetMasterVolume(e);
      }], ["set-muted", function (e) {
        return _this25._SetMuted(e);
      }], ["set-silent", function (e) {
        return _this25._SetSilent(e);
      }], ["set-looping", function (e) {
        return _this25._SetLooping(e);
      }], ["set-playback-rate", function (e) {
        return _this25._SetPlaybackRate(e);
      }], ["set-stereo-pan", function (e) {
        return _this25._SetStereoPan(e);
      }], ["seek", function (e) {
        return _this25._Seek(e);
      }], ["preload", function (e) {
        return _this25._Preload(e);
      }], ["unload", function (e) {
        return _this25._Unload(e);
      }], ["unload-all", function () {
        return _this25._UnloadAll();
      }], ["set-suspended", function (e) {
        return _this25._SetSuspended(e);
      }], ["add-effect", function (e) {
        return _this25._AddEffect(e);
      }], ["set-effect-param", function (e) {
        return _this25._SetEffectParam(e);
      }], ["remove-effects", function (e) {
        return _this25._RemoveEffects(e);
      }], ["tick", function (e) {
        return _this25._OnTick(e);
      }], ["load-state", function (e) {
        return _this25._OnLoadState(e);
      }], ["offline-render-audio", function (e) {
        return _this25._OnOfflineRenderAudio(e);
      }], ["offline-render-finish", function () {
        return _this25._OnOfflineRenderFinish();
      }]]);

      return _this25;
    }

    _createClass(AudioDOMHandler, [{
      key: "_CreateAudioContext",
      value: function _CreateAudioContext(e) {
        var _this26 = this,
            _this$_audioContext$l;

        var sampleRate, opts, listenerPos;
        return regeneratorRuntime.async(function _CreateAudioContext$(_context30) {
          while (1) {
            switch (_context30.prev = _context30.next) {
              case 0:
                if (e["isiOSCordova"] || e["isSafari"]) this._playMusicAsSound = true;
                this._timeScaleMode = e["timeScaleMode"];
                this._panningModel = ["equalpower", "HRTF", "soundfield"][e["panningModel"]];
                this._distanceModel = ["linear", "inverse", "exponential"][e["distanceModel"]];
                this._refDistance = e["refDistance"];
                this._maxDistance = e["maxDistance"];
                this._rolloffFactor = e["rolloffFactor"];

                if (!this._iRuntime.IsExportingToVideo()) {
                  _context30.next = 13;
                  break;
                }

                this._playMusicAsSound = true;
                sampleRate = 48E3;
                this._audioContext = new OfflineAudioContext({
                  "numberOfChannels": 2,
                  "sampleRate": sampleRate,
                  "length": Math.ceil(this._iRuntime.GetExportToVideoDuration() * sampleRate)
                });
                _context30.next = 26;
                break;

              case 13:
                opts = {
                  "latencyHint": e["latencyHint"]
                };
                if (!this.SupportsWebMOpus()) opts["sampleRate"] = 48E3;

                if (!(typeof AudioContext !== "undefined")) {
                  _context30.next = 19;
                  break;
                }

                this._audioContext = new AudioContext(opts);
                _context30.next = 24;
                break;

              case 19:
                if (!(typeof webkitAudioContext !== "undefined")) {
                  _context30.next = 23;
                  break;
                }

                this._audioContext = new webkitAudioContext(opts);
                _context30.next = 24;
                break;

              case 23:
                throw new Error("Web Audio API not supported");

              case 24:
                this._AttachUnblockEvents();

                this._audioContext.onstatechange = function () {
                  if (_this26._audioContext.state !== "running") _this26._AttachUnblockEvents();

                  _this26.PostToRuntime("audiocontext-state", {
                    "audioContextState": _this26._audioContext.state
                  });
                };

              case 26:
                this._destinationNode = this._audioContext["createGain"]();

                this._destinationNode["connect"](this._audioContext["destination"]);

                listenerPos = e["listenerPos"];
                this._lastListenerPos[0] = listenerPos[0];
                this._lastListenerPos[1] = listenerPos[1];
                this._lastListenerPos[2] = listenerPos[2];

                this._audioContext["listener"]["setPosition"](listenerPos[0], listenerPos[1], listenerPos[2]);

                (_this$_audioContext$l = this._audioContext["listener"])["setOrientation"].apply(_this$_audioContext$l, _toConsumableArray(this._lastListenerOrientation));

                self["C3_GetAudioContextCurrentTime"] = function () {
                  return _this26.GetAudioCurrentTime();
                };

                _context30.prev = 35;
                _context30.next = 38;
                return regeneratorRuntime.awrap(Promise.all(e["preloadList"].map(function (o) {
                  return _this26._GetAudioBuffer(o["originalUrl"], o["url"], o["type"], false);
                })));

              case 38:
                _context30.next = 43;
                break;

              case 40:
                _context30.prev = 40;
                _context30.t0 = _context30["catch"](35);
                console.error("[Construct] Preloading sounds failed: ", _context30.t0);

              case 43:
                return _context30.abrupt("return", {
                  "sampleRate": this._audioContext["sampleRate"],
                  "audioContextState": this._audioContext.state,
                  "outputLatency": this._audioContext["outputLatency"] || 0
                });

              case 44:
              case "end":
                return _context30.stop();
            }
          }
        }, null, this, [[35, 40]]);
      }
    }, {
      key: "_AttachUnblockEvents",
      value: function _AttachUnblockEvents() {
        if (this._hasAttachedUnblockEvents) return;
        this._hasUnblocked = false;
        window.addEventListener("pointerup", this._unblockFunc, true);
        window.addEventListener("touchend", this._unblockFunc, true);
        window.addEventListener("click", this._unblockFunc, true);
        window.addEventListener("keydown", this._unblockFunc, true);
        this._hasAttachedUnblockEvents = true;
      }
    }, {
      key: "_DetachUnblockEvents",
      value: function _DetachUnblockEvents() {
        if (!this._hasAttachedUnblockEvents) return;
        this._hasUnblocked = true;
        window.removeEventListener("pointerup", this._unblockFunc, true);
        window.removeEventListener("touchend", this._unblockFunc, true);
        window.removeEventListener("click", this._unblockFunc, true);
        window.removeEventListener("keydown", this._unblockFunc, true);
        this._hasAttachedUnblockEvents = false;
      }
    }, {
      key: "_UnblockAudioContext",
      value: function _UnblockAudioContext() {
        if (this._hasUnblocked) return;
        var audioContext = this._audioContext;
        if (audioContext["state"] === "suspended" && audioContext["resume"]) audioContext["resume"]();
        var buffer = audioContext["createBuffer"](1, 220, 22050);
        var source = audioContext["createBufferSource"]();
        source["buffer"] = buffer;
        source["connect"](audioContext["destination"]);
        source["start"](0);
        if (audioContext["state"] === "running") this._DetachUnblockEvents();
      }
    }, {
      key: "_MatchTagLists",
      value: function _MatchTagLists(tagArr1, tagArr2) {
        var _iteratorNormalCompletion14 = true;
        var _didIteratorError14 = false;
        var _iteratorError14 = undefined;

        try {
          for (var _iterator14 = tagArr2[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
            var t2 = _step14.value;
            var found = false;
            var _iteratorNormalCompletion15 = true;
            var _didIteratorError15 = false;
            var _iteratorError15 = undefined;

            try {
              for (var _iterator15 = tagArr1[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
                var t1 = _step15.value;

                if (self.AudioDOMHandler.EqualsNoCase(t1, t2)) {
                  found = true;
                  break;
                }
              }
            } catch (err) {
              _didIteratorError15 = true;
              _iteratorError15 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion15 && _iterator15["return"] != null) {
                  _iterator15["return"]();
                }
              } finally {
                if (_didIteratorError15) {
                  throw _iteratorError15;
                }
              }
            }

            if (!found) return false;
          }
        } catch (err) {
          _didIteratorError14 = true;
          _iteratorError14 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion14 && _iterator14["return"] != null) {
              _iterator14["return"]();
            }
          } finally {
            if (_didIteratorError14) {
              throw _iteratorError14;
            }
          }
        }

        return true;
      }
    }, {
      key: "GetAudioContext",
      value: function GetAudioContext() {
        return this._audioContext;
      }
    }, {
      key: "GetAudioCurrentTime",
      value: function GetAudioCurrentTime() {
        return this._audioContext["currentTime"];
      }
    }, {
      key: "GetDestinationNode",
      value: function GetDestinationNode() {
        return this._destinationNode;
      }
    }, {
      key: "GetAudioContextExtern",
      value: function GetAudioContextExtern() {
        return this.GetAudioContext();
      }
    }, {
      key: "GetDestinationNodeExtern",
      value: function GetDestinationNodeExtern() {
        return this.GetDestinationNode();
      }
    }, {
      key: "GetDestinationForTag",
      value: function GetDestinationForTag(tag) {
        var fxChain = this._effects.get(tag.toLowerCase());

        if (fxChain) return fxChain[0].GetInputNode();else return this.GetDestinationNode();
      }
    }, {
      key: "AddEffectForTag",
      value: function AddEffectForTag(tag, effect) {
        tag = tag.toLowerCase();

        var fxChain = this._effects.get(tag);

        if (!fxChain) {
          fxChain = [];

          this._effects.set(tag, fxChain);
        }

        effect._SetIndex(fxChain.length);

        effect._SetTag(tag);

        fxChain.push(effect);

        this._ReconnectEffects(tag);
      }
    }, {
      key: "_ReconnectEffects",
      value: function _ReconnectEffects(tag) {
        tag = tag.toLowerCase();
        var destNode = this.GetDestinationNode();

        var fxChain = this._effects.get(tag);

        if (fxChain && fxChain.length) {
          destNode = fxChain[0].GetInputNode();

          for (var i = 0, len = fxChain.length; i < len; ++i) {
            var n = fxChain[i];
            if (i + 1 === len) n.ConnectTo(this.GetDestinationNode());else n.ConnectTo(fxChain[i + 1].GetInputNode());
          }
        }

        var _iteratorNormalCompletion16 = true;
        var _didIteratorError16 = false;
        var _iteratorError16 = undefined;

        try {
          for (var _iterator16 = this.audioInstancesByEffectTag(tag)[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
            var ai = _step16.value;
            ai.Reconnect(destNode);
          }
        } catch (err) {
          _didIteratorError16 = true;
          _iteratorError16 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion16 && _iterator16["return"] != null) {
              _iterator16["return"]();
            }
          } finally {
            if (_didIteratorError16) {
              throw _iteratorError16;
            }
          }
        }

        if (this._microphoneSource && this._microphoneTag === tag) {
          this._microphoneSource["disconnect"]();

          this._microphoneSource["connect"](destNode);
        }
      }
    }, {
      key: "GetMasterVolume",
      value: function GetMasterVolume() {
        return this._masterVolume;
      }
    }, {
      key: "IsSilent",
      value: function IsSilent() {
        return this._isSilent;
      }
    }, {
      key: "GetTimeScaleMode",
      value: function GetTimeScaleMode() {
        return this._timeScaleMode;
      }
    }, {
      key: "GetTimeScale",
      value: function GetTimeScale() {
        return this._timeScale;
      }
    }, {
      key: "GetGameTime",
      value: function GetGameTime() {
        return this._gameTime;
      }
    }, {
      key: "IsPlayMusicAsSound",
      value: function IsPlayMusicAsSound() {
        return this._playMusicAsSound;
      }
    }, {
      key: "SupportsWebMOpus",
      value: function SupportsWebMOpus() {
        return this._supportsWebMOpus;
      }
    }, {
      key: "_SetHasAnySoftwareDecodedMusic",
      value: function _SetHasAnySoftwareDecodedMusic() {
        this._hasAnySoftwareDecodedMusic = true;
      }
    }, {
      key: "GetPanningModel",
      value: function GetPanningModel() {
        return this._panningModel;
      }
    }, {
      key: "GetDistanceModel",
      value: function GetDistanceModel() {
        return this._distanceModel;
      }
    }, {
      key: "GetReferenceDistance",
      value: function GetReferenceDistance() {
        return this._refDistance;
      }
    }, {
      key: "GetMaxDistance",
      value: function GetMaxDistance() {
        return this._maxDistance;
      }
    }, {
      key: "GetRolloffFactor",
      value: function GetRolloffFactor() {
        return this._rolloffFactor;
      }
    }, {
      key: "DecodeAudioData",
      value: function DecodeAudioData(audioData, needsSoftwareDecode) {
        var _this27 = this;

        if (needsSoftwareDecode) return this._iRuntime._WasmDecodeWebMOpus(audioData).then(function (rawAudio) {
          var audioBuffer = _this27._audioContext["createBuffer"](1, rawAudio.length, 48E3);

          var channelBuffer = audioBuffer["getChannelData"](0);
          channelBuffer.set(rawAudio);
          return audioBuffer;
        });else return new Promise(function (resolve, reject) {
          _this27._audioContext["decodeAudioData"](audioData, resolve, reject);
        });
      }
    }, {
      key: "TryPlayMedia",
      value: function TryPlayMedia(mediaElem) {
        this._iRuntime.TryPlayMedia(mediaElem);
      }
    }, {
      key: "RemovePendingPlay",
      value: function RemovePendingPlay(mediaElem) {
        this._iRuntime.RemovePendingPlay(mediaElem);
      }
    }, {
      key: "ReleaseInstancesForBuffer",
      value: function ReleaseInstancesForBuffer(buffer) {
        var j = 0;

        for (var i = 0, len = this._audioInstances.length; i < len; ++i) {
          var a = this._audioInstances[i];
          this._audioInstances[j] = a;
          if (a.GetBuffer() === buffer) a.Release();else ++j;
        }

        this._audioInstances.length = j;
      }
    }, {
      key: "ReleaseAllMusicBuffers",
      value: function ReleaseAllMusicBuffers() {
        var j = 0;

        for (var i = 0, len = this._audioBuffers.length; i < len; ++i) {
          var b = this._audioBuffers[i];
          this._audioBuffers[j] = b;
          if (b.IsMusic()) b.Release();else ++j;
        }

        this._audioBuffers.length = j;
      }
    }, {
      key: "audioInstancesMatchingTags",
      value:
      /*#__PURE__*/
      regeneratorRuntime.mark(function audioInstancesMatchingTags(tags) {
        var _iteratorNormalCompletion17, _didIteratorError17, _iteratorError17, _iterator17, _step17, ai;

        return regeneratorRuntime.wrap(function audioInstancesMatchingTags$(_context31) {
          while (1) {
            switch (_context31.prev = _context31.next) {
              case 0:
                if (!(tags.length > 0)) {
                  _context31.next = 30;
                  break;
                }

                _iteratorNormalCompletion17 = true;
                _didIteratorError17 = false;
                _iteratorError17 = undefined;
                _context31.prev = 4;
                _iterator17 = this._audioInstances[Symbol.iterator]();

              case 6:
                if (_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done) {
                  _context31.next = 14;
                  break;
                }

                ai = _step17.value;

                if (!this._MatchTagLists(ai.GetTags(), tags)) {
                  _context31.next = 11;
                  break;
                }

                _context31.next = 11;
                return ai;

              case 11:
                _iteratorNormalCompletion17 = true;
                _context31.next = 6;
                break;

              case 14:
                _context31.next = 20;
                break;

              case 16:
                _context31.prev = 16;
                _context31.t0 = _context31["catch"](4);
                _didIteratorError17 = true;
                _iteratorError17 = _context31.t0;

              case 20:
                _context31.prev = 20;
                _context31.prev = 21;

                if (!_iteratorNormalCompletion17 && _iterator17["return"] != null) {
                  _iterator17["return"]();
                }

              case 23:
                _context31.prev = 23;

                if (!_didIteratorError17) {
                  _context31.next = 26;
                  break;
                }

                throw _iteratorError17;

              case 26:
                return _context31.finish(23);

              case 27:
                return _context31.finish(20);

              case 28:
                _context31.next = 33;
                break;

              case 30:
                if (!(this._lastAudioInstance && !this._lastAudioInstance.HasEnded())) {
                  _context31.next = 33;
                  break;
                }

                _context31.next = 33;
                return this._lastAudioInstance;

              case 33:
              case "end":
                return _context31.stop();
            }
          }
        }, audioInstancesMatchingTags, this, [[4, 16, 20, 28], [21,, 23, 27]]);
      })
    }, {
      key: "audioInstancesByEffectTag",
      value:
      /*#__PURE__*/
      regeneratorRuntime.mark(function audioInstancesByEffectTag(tag) {
        var _iteratorNormalCompletion18, _didIteratorError18, _iteratorError18, _iterator18, _step18, ai;

        return regeneratorRuntime.wrap(function audioInstancesByEffectTag$(_context32) {
          while (1) {
            switch (_context32.prev = _context32.next) {
              case 0:
                if (!tag) {
                  _context32.next = 30;
                  break;
                }

                _iteratorNormalCompletion18 = true;
                _didIteratorError18 = false;
                _iteratorError18 = undefined;
                _context32.prev = 4;
                _iterator18 = this._audioInstances[Symbol.iterator]();

              case 6:
                if (_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done) {
                  _context32.next = 14;
                  break;
                }

                ai = _step18.value;

                if (!self.AudioDOMHandler.EqualsNoCase(ai.GetEffectTag(), tag)) {
                  _context32.next = 11;
                  break;
                }

                _context32.next = 11;
                return ai;

              case 11:
                _iteratorNormalCompletion18 = true;
                _context32.next = 6;
                break;

              case 14:
                _context32.next = 20;
                break;

              case 16:
                _context32.prev = 16;
                _context32.t0 = _context32["catch"](4);
                _didIteratorError18 = true;
                _iteratorError18 = _context32.t0;

              case 20:
                _context32.prev = 20;
                _context32.prev = 21;

                if (!_iteratorNormalCompletion18 && _iterator18["return"] != null) {
                  _iterator18["return"]();
                }

              case 23:
                _context32.prev = 23;

                if (!_didIteratorError18) {
                  _context32.next = 26;
                  break;
                }

                throw _iteratorError18;

              case 26:
                return _context32.finish(23);

              case 27:
                return _context32.finish(20);

              case 28:
                _context32.next = 33;
                break;

              case 30:
                if (!(this._lastAudioInstance && !this._lastAudioInstance.HasEnded())) {
                  _context32.next = 33;
                  break;
                }

                _context32.next = 33;
                return this._lastAudioInstance;

              case 33:
              case "end":
                return _context32.stop();
            }
          }
        }, audioInstancesByEffectTag, this, [[4, 16, 20, 28], [21,, 23, 27]]);
      })
    }, {
      key: "_GetAudioBuffer",
      value: function _GetAudioBuffer(originalUrl, url, type, isMusic, dontCreate) {
        var _iteratorNormalCompletion19, _didIteratorError19, _iteratorError19, _iterator19, _step19, ab, ret;

        return regeneratorRuntime.async(function _GetAudioBuffer$(_context33) {
          while (1) {
            switch (_context33.prev = _context33.next) {
              case 0:
                _iteratorNormalCompletion19 = true;
                _didIteratorError19 = false;
                _iteratorError19 = undefined;
                _context33.prev = 3;
                _iterator19 = this._audioBuffers[Symbol.iterator]();

              case 5:
                if (_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done) {
                  _context33.next = 14;
                  break;
                }

                ab = _step19.value;

                if (!(ab.GetUrl() === url)) {
                  _context33.next = 11;
                  break;
                }

                _context33.next = 10;
                return regeneratorRuntime.awrap(ab.Load());

              case 10:
                return _context33.abrupt("return", ab);

              case 11:
                _iteratorNormalCompletion19 = true;
                _context33.next = 5;
                break;

              case 14:
                _context33.next = 20;
                break;

              case 16:
                _context33.prev = 16;
                _context33.t0 = _context33["catch"](3);
                _didIteratorError19 = true;
                _iteratorError19 = _context33.t0;

              case 20:
                _context33.prev = 20;
                _context33.prev = 21;

                if (!_iteratorNormalCompletion19 && _iterator19["return"] != null) {
                  _iterator19["return"]();
                }

              case 23:
                _context33.prev = 23;

                if (!_didIteratorError19) {
                  _context33.next = 26;
                  break;
                }

                throw _iteratorError19;

              case 26:
                return _context33.finish(23);

              case 27:
                return _context33.finish(20);

              case 28:
                if (!dontCreate) {
                  _context33.next = 30;
                  break;
                }

                return _context33.abrupt("return", null);

              case 30:
                if (isMusic && (this._playMusicAsSound || this._hasAnySoftwareDecodedMusic)) this.ReleaseAllMusicBuffers();
                ret = self.C3AudioBuffer.Create(this, originalUrl, url, type, isMusic);

                this._audioBuffers.push(ret);

                _context33.next = 35;
                return regeneratorRuntime.awrap(ret.Load());

              case 35:
                if (!this._loadedAudioUrls.has(originalUrl)) {
                  this.PostToRuntime("buffer-metadata", {
                    "originalUrl": originalUrl,
                    "duration": ret.GetDuration()
                  });

                  this._loadedAudioUrls.add(originalUrl);
                }

                return _context33.abrupt("return", ret);

              case 37:
              case "end":
                return _context33.stop();
            }
          }
        }, null, this, [[3, 16, 20, 28], [21,, 23, 27]]);
      }
    }, {
      key: "_GetAudioInstance",
      value: function _GetAudioInstance(originalUrl, url, type, tags, isMusic) {
        var _iteratorNormalCompletion20, _didIteratorError20, _iteratorError20, _iterator20, _step20, ai, buffer, ret;

        return regeneratorRuntime.async(function _GetAudioInstance$(_context34) {
          while (1) {
            switch (_context34.prev = _context34.next) {
              case 0:
                _iteratorNormalCompletion20 = true;
                _didIteratorError20 = false;
                _iteratorError20 = undefined;
                _context34.prev = 3;
                _iterator20 = this._audioInstances[Symbol.iterator]();

              case 5:
                if (_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done) {
                  _context34.next = 13;
                  break;
                }

                ai = _step20.value;

                if (!(ai.GetUrl() === url && (ai.CanBeRecycled() || isMusic))) {
                  _context34.next = 10;
                  break;
                }

                ai.SetTags(tags);
                return _context34.abrupt("return", ai);

              case 10:
                _iteratorNormalCompletion20 = true;
                _context34.next = 5;
                break;

              case 13:
                _context34.next = 19;
                break;

              case 15:
                _context34.prev = 15;
                _context34.t0 = _context34["catch"](3);
                _didIteratorError20 = true;
                _iteratorError20 = _context34.t0;

              case 19:
                _context34.prev = 19;
                _context34.prev = 20;

                if (!_iteratorNormalCompletion20 && _iterator20["return"] != null) {
                  _iterator20["return"]();
                }

              case 22:
                _context34.prev = 22;

                if (!_didIteratorError20) {
                  _context34.next = 25;
                  break;
                }

                throw _iteratorError20;

              case 25:
                return _context34.finish(22);

              case 26:
                return _context34.finish(19);

              case 27:
                _context34.next = 29;
                return regeneratorRuntime.awrap(this._GetAudioBuffer(originalUrl, url, type, isMusic));

              case 29:
                buffer = _context34.sent;
                ret = buffer.CreateInstance(tags);

                this._audioInstances.push(ret);

                return _context34.abrupt("return", ret);

              case 33:
              case "end":
                return _context34.stop();
            }
          }
        }, null, this, [[3, 15, 19, 27], [20,, 22, 26]]);
      }
    }, {
      key: "_AddPendingTags",
      value: function _AddPendingTags(tags) {
        var tagStr = tags.join(" ");

        var info = this._pendingTags.get(tagStr);

        if (!info) {
          var resolve = null;
          var promise = new Promise(function (r) {
            return resolve = r;
          });
          info = {
            pendingCount: 0,
            promise: promise,
            resolve: resolve
          };

          this._pendingTags.set(tagStr, info);
        }

        info.pendingCount++;
      }
    }, {
      key: "_RemovePendingTags",
      value: function _RemovePendingTags(tags) {
        var tagStr = tags.join(" ");

        var info = this._pendingTags.get(tagStr);

        if (!info) throw new Error("expected pending tag");
        info.pendingCount--;

        if (info.pendingCount === 0) {
          info.resolve();

          this._pendingTags["delete"](tagStr);
        }
      }
    }, {
      key: "TagsReady",
      value: function TagsReady(tags) {
        var tagStr = (tags.length === 0 ? this._lastPlayedTags : tags).join(" ");

        var info = this._pendingTags.get(tagStr);

        if (info) return info.promise;else return Promise.resolve();
      }
    }, {
      key: "_MaybeStartTicking",
      value: function _MaybeStartTicking() {
        if (this._analysers.size > 0) {
          this._StartTicking();

          return;
        }

        var _iteratorNormalCompletion21 = true;
        var _didIteratorError21 = false;
        var _iteratorError21 = undefined;

        try {
          for (var _iterator21 = this._audioInstances[Symbol.iterator](), _step21; !(_iteratorNormalCompletion21 = (_step21 = _iterator21.next()).done); _iteratorNormalCompletion21 = true) {
            var ai = _step21.value;

            if (ai.IsActive()) {
              this._StartTicking();

              return;
            }
          }
        } catch (err) {
          _didIteratorError21 = true;
          _iteratorError21 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion21 && _iterator21["return"] != null) {
              _iterator21["return"]();
            }
          } finally {
            if (_didIteratorError21) {
              throw _iteratorError21;
            }
          }
        }
      }
    }, {
      key: "Tick",
      value: function Tick() {
        var _iteratorNormalCompletion22 = true;
        var _didIteratorError22 = false;
        var _iteratorError22 = undefined;

        try {
          for (var _iterator22 = this._analysers[Symbol.iterator](), _step22; !(_iteratorNormalCompletion22 = (_step22 = _iterator22.next()).done); _iteratorNormalCompletion22 = true) {
            var a = _step22.value;
            a.Tick();
          }
        } catch (err) {
          _didIteratorError22 = true;
          _iteratorError22 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion22 && _iterator22["return"] != null) {
              _iterator22["return"]();
            }
          } finally {
            if (_didIteratorError22) {
              throw _iteratorError22;
            }
          }
        }

        var currentTime = this.GetAudioCurrentTime();
        var _iteratorNormalCompletion23 = true;
        var _didIteratorError23 = false;
        var _iteratorError23 = undefined;

        try {
          for (var _iterator23 = this._audioInstances[Symbol.iterator](), _step23; !(_iteratorNormalCompletion23 = (_step23 = _iterator23.next()).done); _iteratorNormalCompletion23 = true) {
            var ai = _step23.value;
            ai.Tick(currentTime);
          }
        } catch (err) {
          _didIteratorError23 = true;
          _iteratorError23 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion23 && _iterator23["return"] != null) {
              _iterator23["return"]();
            }
          } finally {
            if (_didIteratorError23) {
              throw _iteratorError23;
            }
          }
        }

        var instStates = this._audioInstances.filter(function (a) {
          return a.IsActive();
        }).map(function (a) {
          return a.GetState();
        });

        this.PostToRuntime("state", {
          "tickCount": this._lastTickCount,
          "outputLatency": this._audioContext["outputLatency"] || 0,
          "audioInstances": instStates,
          "analysers": _toConsumableArray(this._analysers).map(function (a) {
            return a.GetData();
          })
        });
        if (instStates.length === 0 && this._analysers.size === 0) this._StopTicking();
      }
    }, {
      key: "PostTrigger",
      value: function PostTrigger(type, tags, aiid) {
        this.PostToRuntime("trigger", {
          "type": type,
          "tags": tags,
          "aiid": aiid
        });
      }
    }, {
      key: "_Play",
      value: function _Play(e) {
        var originalUrl, url, type, isMusic, tags, isLooping, volume, position, panning, stereoPan, startTime, outputTimestamp;
        return regeneratorRuntime.async(function _Play$(_context35) {
          while (1) {
            switch (_context35.prev = _context35.next) {
              case 0:
                originalUrl = e["originalUrl"];
                url = e["url"];
                type = e["type"];
                isMusic = e["isMusic"];
                tags = e["tags"];
                isLooping = e["isLooping"];
                volume = e["vol"];
                position = e["pos"];
                panning = e["panning"];
                stereoPan = e["stereoPan"];
                startTime = e["off"];
                if (startTime > 0 && !e["trueClock"]) if (this._audioContext["getOutputTimestamp"]) {
                  outputTimestamp = this._audioContext["getOutputTimestamp"]();
                  startTime = startTime - outputTimestamp["performanceTime"] / 1E3 + outputTimestamp["contextTime"];
                } else startTime = startTime - performance.now() / 1E3 + this._audioContext["currentTime"];
                this._lastPlayedTags = tags.slice(0);

                this._AddPendingTags(tags);

                _context35.prev = 14;
                _context35.next = 17;
                return regeneratorRuntime.awrap(this._GetAudioInstance(originalUrl, url, type, tags, isMusic));

              case 17:
                this._lastAudioInstance = _context35.sent;

                if (panning) {
                  this._lastAudioInstance.SetPannerEnabled(true);

                  this._lastAudioInstance.SetPan(panning["x"], panning["y"], panning["z"], panning["angle"], panning["innerAngle"], panning["outerAngle"], panning["outerGain"]);

                  if (panning.hasOwnProperty("uid")) this._lastAudioInstance.SetUID(panning["uid"]);
                } else if (typeof stereoPan === "number" && stereoPan !== 0) {
                  this._lastAudioInstance.SetStereoPannerEnabled(true);

                  this._lastAudioInstance.SetStereoPan(stereoPan);
                } else {
                  this._lastAudioInstance.SetPannerEnabled(false);

                  this._lastAudioInstance.SetStereoPannerEnabled(false);
                }

                this._lastAudioInstance.Play(isLooping, volume, position, startTime);

                _context35.next = 26;
                break;

              case 22:
                _context35.prev = 22;
                _context35.t0 = _context35["catch"](14);
                console.error("[Construct] Audio: error starting playback: ", _context35.t0);
                return _context35.abrupt("return");

              case 26:
                _context35.prev = 26;

                this._RemovePendingTags(tags);

                return _context35.finish(26);

              case 29:
                this._StartTicking();

              case 30:
              case "end":
                return _context35.stop();
            }
          }
        }, null, this, [[14, 22, 26, 29]]);
      }
    }, {
      key: "_Stop",
      value: function _Stop(e) {
        var tags = e["tags"];
        var _iteratorNormalCompletion24 = true;
        var _didIteratorError24 = false;
        var _iteratorError24 = undefined;

        try {
          for (var _iterator24 = this.audioInstancesMatchingTags(tags)[Symbol.iterator](), _step24; !(_iteratorNormalCompletion24 = (_step24 = _iterator24.next()).done); _iteratorNormalCompletion24 = true) {
            var ai = _step24.value;
            ai.Stop();
          }
        } catch (err) {
          _didIteratorError24 = true;
          _iteratorError24 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion24 && _iterator24["return"] != null) {
              _iterator24["return"]();
            }
          } finally {
            if (_didIteratorError24) {
              throw _iteratorError24;
            }
          }
        }
      }
    }, {
      key: "_StopAll",
      value: function _StopAll() {
        var _iteratorNormalCompletion25 = true;
        var _didIteratorError25 = false;
        var _iteratorError25 = undefined;

        try {
          for (var _iterator25 = this._audioInstances[Symbol.iterator](), _step25; !(_iteratorNormalCompletion25 = (_step25 = _iterator25.next()).done); _iteratorNormalCompletion25 = true) {
            var ai = _step25.value;
            ai.Stop();
          }
        } catch (err) {
          _didIteratorError25 = true;
          _iteratorError25 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion25 && _iterator25["return"] != null) {
              _iterator25["return"]();
            }
          } finally {
            if (_didIteratorError25) {
              throw _iteratorError25;
            }
          }
        }
      }
    }, {
      key: "_SetPaused",
      value: function _SetPaused(e) {
        var tags = e["tags"];
        var paused = e["paused"];
        var _iteratorNormalCompletion26 = true;
        var _didIteratorError26 = false;
        var _iteratorError26 = undefined;

        try {
          for (var _iterator26 = this.audioInstancesMatchingTags(tags)[Symbol.iterator](), _step26; !(_iteratorNormalCompletion26 = (_step26 = _iterator26.next()).done); _iteratorNormalCompletion26 = true) {
            var ai = _step26.value;
            if (paused) ai.Pause();else ai.Resume();
          }
        } catch (err) {
          _didIteratorError26 = true;
          _iteratorError26 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion26 && _iterator26["return"] != null) {
              _iterator26["return"]();
            }
          } finally {
            if (_didIteratorError26) {
              throw _iteratorError26;
            }
          }
        }

        this._MaybeStartTicking();
      }
    }, {
      key: "_SetVolume",
      value: function _SetVolume(e) {
        var tags = e["tags"];
        var vol = e["vol"];
        var _iteratorNormalCompletion27 = true;
        var _didIteratorError27 = false;
        var _iteratorError27 = undefined;

        try {
          for (var _iterator27 = this.audioInstancesMatchingTags(tags)[Symbol.iterator](), _step27; !(_iteratorNormalCompletion27 = (_step27 = _iterator27.next()).done); _iteratorNormalCompletion27 = true) {
            var ai = _step27.value;
            ai.SetVolume(vol);
          }
        } catch (err) {
          _didIteratorError27 = true;
          _iteratorError27 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion27 && _iterator27["return"] != null) {
              _iterator27["return"]();
            }
          } finally {
            if (_didIteratorError27) {
              throw _iteratorError27;
            }
          }
        }
      }
    }, {
      key: "_SetStereoPan",
      value: function _SetStereoPan(e) {
        var tags = e["tags"];
        var p = e["p"];
        var _iteratorNormalCompletion28 = true;
        var _didIteratorError28 = false;
        var _iteratorError28 = undefined;

        try {
          for (var _iterator28 = this.audioInstancesMatchingTags(tags)[Symbol.iterator](), _step28; !(_iteratorNormalCompletion28 = (_step28 = _iterator28.next()).done); _iteratorNormalCompletion28 = true) {
            var ai = _step28.value;
            ai.SetStereoPannerEnabled(true);
            ai.SetStereoPan(p);
          }
        } catch (err) {
          _didIteratorError28 = true;
          _iteratorError28 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion28 && _iterator28["return"] != null) {
              _iterator28["return"]();
            }
          } finally {
            if (_didIteratorError28) {
              throw _iteratorError28;
            }
          }
        }
      }
    }, {
      key: "_FadeVolume",
      value: function _FadeVolume(e) {
        var tags, vol, duration, stopOnEnd, _iteratorNormalCompletion29, _didIteratorError29, _iteratorError29, _iterator29, _step29, ai;

        return regeneratorRuntime.async(function _FadeVolume$(_context36) {
          while (1) {
            switch (_context36.prev = _context36.next) {
              case 0:
                tags = e["tags"];
                vol = e["vol"];
                duration = e["duration"];
                stopOnEnd = e["stopOnEnd"];
                _context36.next = 6;
                return regeneratorRuntime.awrap(this.TagsReady(tags));

              case 6:
                _iteratorNormalCompletion29 = true;
                _didIteratorError29 = false;
                _iteratorError29 = undefined;
                _context36.prev = 9;

                for (_iterator29 = this.audioInstancesMatchingTags(tags)[Symbol.iterator](); !(_iteratorNormalCompletion29 = (_step29 = _iterator29.next()).done); _iteratorNormalCompletion29 = true) {
                  ai = _step29.value;
                  ai.FadeVolume(vol, duration, stopOnEnd);
                }

                _context36.next = 17;
                break;

              case 13:
                _context36.prev = 13;
                _context36.t0 = _context36["catch"](9);
                _didIteratorError29 = true;
                _iteratorError29 = _context36.t0;

              case 17:
                _context36.prev = 17;
                _context36.prev = 18;

                if (!_iteratorNormalCompletion29 && _iterator29["return"] != null) {
                  _iterator29["return"]();
                }

              case 20:
                _context36.prev = 20;

                if (!_didIteratorError29) {
                  _context36.next = 23;
                  break;
                }

                throw _iteratorError29;

              case 23:
                return _context36.finish(20);

              case 24:
                return _context36.finish(17);

              case 25:
                this._MaybeStartTicking();

              case 26:
              case "end":
                return _context36.stop();
            }
          }
        }, null, this, [[9, 13, 17, 25], [18,, 20, 24]]);
      }
    }, {
      key: "_SetMasterVolume",
      value: function _SetMasterVolume(e) {
        this._masterVolume = e["vol"];
        this._destinationNode["gain"]["value"] = this._masterVolume;
      }
    }, {
      key: "_SetMuted",
      value: function _SetMuted(e) {
        var tags = e["tags"];
        var isMuted = e["isMuted"];
        var _iteratorNormalCompletion30 = true;
        var _didIteratorError30 = false;
        var _iteratorError30 = undefined;

        try {
          for (var _iterator30 = this.audioInstancesMatchingTags(tags)[Symbol.iterator](), _step30; !(_iteratorNormalCompletion30 = (_step30 = _iterator30.next()).done); _iteratorNormalCompletion30 = true) {
            var ai = _step30.value;
            ai.SetMuted(isMuted);
          }
        } catch (err) {
          _didIteratorError30 = true;
          _iteratorError30 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion30 && _iterator30["return"] != null) {
              _iterator30["return"]();
            }
          } finally {
            if (_didIteratorError30) {
              throw _iteratorError30;
            }
          }
        }
      }
    }, {
      key: "_SetSilent",
      value: function _SetSilent(e) {
        this._isSilent = e["isSilent"];

        this._iRuntime.SetSilent(this._isSilent);

        var _iteratorNormalCompletion31 = true;
        var _didIteratorError31 = false;
        var _iteratorError31 = undefined;

        try {
          for (var _iterator31 = this._audioInstances[Symbol.iterator](), _step31; !(_iteratorNormalCompletion31 = (_step31 = _iterator31.next()).done); _iteratorNormalCompletion31 = true) {
            var ai = _step31.value;

            ai._UpdateMuted();
          }
        } catch (err) {
          _didIteratorError31 = true;
          _iteratorError31 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion31 && _iterator31["return"] != null) {
              _iterator31["return"]();
            }
          } finally {
            if (_didIteratorError31) {
              throw _iteratorError31;
            }
          }
        }
      }
    }, {
      key: "_SetLooping",
      value: function _SetLooping(e) {
        var tags = e["tags"];
        var isLooping = e["isLooping"];
        var _iteratorNormalCompletion32 = true;
        var _didIteratorError32 = false;
        var _iteratorError32 = undefined;

        try {
          for (var _iterator32 = this.audioInstancesMatchingTags(tags)[Symbol.iterator](), _step32; !(_iteratorNormalCompletion32 = (_step32 = _iterator32.next()).done); _iteratorNormalCompletion32 = true) {
            var ai = _step32.value;
            ai.SetLooping(isLooping);
          }
        } catch (err) {
          _didIteratorError32 = true;
          _iteratorError32 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion32 && _iterator32["return"] != null) {
              _iterator32["return"]();
            }
          } finally {
            if (_didIteratorError32) {
              throw _iteratorError32;
            }
          }
        }
      }
    }, {
      key: "_SetPlaybackRate",
      value: function _SetPlaybackRate(e) {
        var tags, rate, _iteratorNormalCompletion33, _didIteratorError33, _iteratorError33, _iterator33, _step33, ai;

        return regeneratorRuntime.async(function _SetPlaybackRate$(_context37) {
          while (1) {
            switch (_context37.prev = _context37.next) {
              case 0:
                tags = e["tags"];
                rate = e["rate"];
                _context37.next = 4;
                return regeneratorRuntime.awrap(this.TagsReady(tags));

              case 4:
                _iteratorNormalCompletion33 = true;
                _didIteratorError33 = false;
                _iteratorError33 = undefined;
                _context37.prev = 7;

                for (_iterator33 = this.audioInstancesMatchingTags(tags)[Symbol.iterator](); !(_iteratorNormalCompletion33 = (_step33 = _iterator33.next()).done); _iteratorNormalCompletion33 = true) {
                  ai = _step33.value;
                  ai.SetPlaybackRate(rate);
                }

                _context37.next = 15;
                break;

              case 11:
                _context37.prev = 11;
                _context37.t0 = _context37["catch"](7);
                _didIteratorError33 = true;
                _iteratorError33 = _context37.t0;

              case 15:
                _context37.prev = 15;
                _context37.prev = 16;

                if (!_iteratorNormalCompletion33 && _iterator33["return"] != null) {
                  _iterator33["return"]();
                }

              case 18:
                _context37.prev = 18;

                if (!_didIteratorError33) {
                  _context37.next = 21;
                  break;
                }

                throw _iteratorError33;

              case 21:
                return _context37.finish(18);

              case 22:
                return _context37.finish(15);

              case 23:
              case "end":
                return _context37.stop();
            }
          }
        }, null, this, [[7, 11, 15, 23], [16,, 18, 22]]);
      }
    }, {
      key: "_Seek",
      value: function _Seek(e) {
        var tags, pos, _iteratorNormalCompletion34, _didIteratorError34, _iteratorError34, _iterator34, _step34, ai;

        return regeneratorRuntime.async(function _Seek$(_context38) {
          while (1) {
            switch (_context38.prev = _context38.next) {
              case 0:
                tags = e["tags"];
                pos = e["pos"];
                _context38.next = 4;
                return regeneratorRuntime.awrap(this.TagsReady(tags));

              case 4:
                _iteratorNormalCompletion34 = true;
                _didIteratorError34 = false;
                _iteratorError34 = undefined;
                _context38.prev = 7;

                for (_iterator34 = this.audioInstancesMatchingTags(tags)[Symbol.iterator](); !(_iteratorNormalCompletion34 = (_step34 = _iterator34.next()).done); _iteratorNormalCompletion34 = true) {
                  ai = _step34.value;
                  ai.Seek(pos);
                }

                _context38.next = 15;
                break;

              case 11:
                _context38.prev = 11;
                _context38.t0 = _context38["catch"](7);
                _didIteratorError34 = true;
                _iteratorError34 = _context38.t0;

              case 15:
                _context38.prev = 15;
                _context38.prev = 16;

                if (!_iteratorNormalCompletion34 && _iterator34["return"] != null) {
                  _iterator34["return"]();
                }

              case 18:
                _context38.prev = 18;

                if (!_didIteratorError34) {
                  _context38.next = 21;
                  break;
                }

                throw _iteratorError34;

              case 21:
                return _context38.finish(18);

              case 22:
                return _context38.finish(15);

              case 23:
              case "end":
                return _context38.stop();
            }
          }
        }, null, this, [[7, 11, 15, 23], [16,, 18, 22]]);
      }
    }, {
      key: "_Preload",
      value: function _Preload(e) {
        var originalUrl, url, type, isMusic;
        return regeneratorRuntime.async(function _Preload$(_context39) {
          while (1) {
            switch (_context39.prev = _context39.next) {
              case 0:
                originalUrl = e["originalUrl"];
                url = e["url"];
                type = e["type"];
                isMusic = e["isMusic"];
                _context39.prev = 4;
                _context39.next = 7;
                return regeneratorRuntime.awrap(this._GetAudioInstance(originalUrl, url, type, "", isMusic));

              case 7:
                _context39.next = 12;
                break;

              case 9:
                _context39.prev = 9;
                _context39.t0 = _context39["catch"](4);
                console.error("[Construct] Audio: error preloading: ", _context39.t0);

              case 12:
              case "end":
                return _context39.stop();
            }
          }
        }, null, this, [[4, 9]]);
      }
    }, {
      key: "_Unload",
      value: function _Unload(e) {
        var url, type, isMusic, buffer, i;
        return regeneratorRuntime.async(function _Unload$(_context40) {
          while (1) {
            switch (_context40.prev = _context40.next) {
              case 0:
                url = e["url"];
                type = e["type"];
                isMusic = e["isMusic"];
                _context40.next = 5;
                return regeneratorRuntime.awrap(this._GetAudioBuffer("", url, type, isMusic, true));

              case 5:
                buffer = _context40.sent;

                if (buffer) {
                  _context40.next = 8;
                  break;
                }

                return _context40.abrupt("return");

              case 8:
                buffer.Release();
                i = this._audioBuffers.indexOf(buffer);
                if (i !== -1) this._audioBuffers.splice(i, 1);

              case 11:
              case "end":
                return _context40.stop();
            }
          }
        }, null, this);
      }
    }, {
      key: "_UnloadAll",
      value: function _UnloadAll() {
        var _iteratorNormalCompletion35 = true;
        var _didIteratorError35 = false;
        var _iteratorError35 = undefined;

        try {
          for (var _iterator35 = this._audioBuffers[Symbol.iterator](), _step35; !(_iteratorNormalCompletion35 = (_step35 = _iterator35.next()).done); _iteratorNormalCompletion35 = true) {
            var buffer = _step35.value;
            buffer.Release();
          }
        } catch (err) {
          _didIteratorError35 = true;
          _iteratorError35 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion35 && _iterator35["return"] != null) {
              _iterator35["return"]();
            }
          } finally {
            if (_didIteratorError35) {
              throw _iteratorError35;
            }
          }
        }

        this._audioBuffers.length = 0;
      }
    }, {
      key: "_SetSuspended",
      value: function _SetSuspended(e) {
        var isSuspended = e["isSuspended"];
        if (!isSuspended && this._audioContext["resume"]) this._audioContext["resume"]();
        var _iteratorNormalCompletion36 = true;
        var _didIteratorError36 = false;
        var _iteratorError36 = undefined;

        try {
          for (var _iterator36 = this._audioInstances[Symbol.iterator](), _step36; !(_iteratorNormalCompletion36 = (_step36 = _iterator36.next()).done); _iteratorNormalCompletion36 = true) {
            var ai = _step36.value;
            ai.SetSuspended(isSuspended);
          }
        } catch (err) {
          _didIteratorError36 = true;
          _iteratorError36 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion36 && _iterator36["return"] != null) {
              _iterator36["return"]();
            }
          } finally {
            if (_didIteratorError36) {
              throw _iteratorError36;
            }
          }
        }

        if (isSuspended && this._audioContext["suspend"]) this._audioContext["suspend"]();
      }
    }, {
      key: "_OnTick",
      value: function _OnTick(e) {
        this._timeScale = e["timeScale"];
        this._gameTime = e["gameTime"];
        this._lastTickCount = e["tickCount"];

        if (this._timeScaleMode !== 0) {
          var _iteratorNormalCompletion37 = true;
          var _didIteratorError37 = false;
          var _iteratorError37 = undefined;

          try {
            for (var _iterator37 = this._audioInstances[Symbol.iterator](), _step37; !(_iteratorNormalCompletion37 = (_step37 = _iterator37.next()).done); _iteratorNormalCompletion37 = true) {
              var ai = _step37.value;

              ai._UpdatePlaybackRate();
            }
          } catch (err) {
            _didIteratorError37 = true;
            _iteratorError37 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion37 && _iterator37["return"] != null) {
                _iterator37["return"]();
              }
            } finally {
              if (_didIteratorError37) {
                throw _iteratorError37;
              }
            }
          }
        }

        var listenerPos = e["listenerPos"];

        if (listenerPos && (this._lastListenerPos[0] !== listenerPos[0] || this._lastListenerPos[1] !== listenerPos[1] || this._lastListenerPos[2] !== listenerPos[2])) {
          this._lastListenerPos[0] = listenerPos[0];
          this._lastListenerPos[1] = listenerPos[1];
          this._lastListenerPos[2] = listenerPos[2];

          this._audioContext["listener"]["setPosition"](listenerPos[0], listenerPos[1], listenerPos[2]);
        }

        var listenerOrientation = e["listenerOrientation"];

        if (listenerOrientation && (this._lastListenerOrientation[0] !== listenerOrientation[0] || this._lastListenerOrientation[1] !== listenerOrientation[1] || this._lastListenerOrientation[2] !== listenerOrientation[2] || this._lastListenerOrientation[3] !== listenerOrientation[3] || this._lastListenerOrientation[4] !== listenerOrientation[4] || this._lastListenerOrientation[5] !== listenerOrientation[5])) {
          var _this$_audioContext$l2;

          for (var i = 0; i < 6; ++i) {
            this._lastListenerOrientation[i] = listenerOrientation[i];
          }

          (_this$_audioContext$l2 = this._audioContext["listener"])["setOrientation"].apply(_this$_audioContext$l2, _toConsumableArray(this._lastListenerOrientation));
        }

        var _iteratorNormalCompletion38 = true;
        var _didIteratorError38 = false;
        var _iteratorError38 = undefined;

        try {
          for (var _iterator38 = e["instPans"][Symbol.iterator](), _step38; !(_iteratorNormalCompletion38 = (_step38 = _iterator38.next()).done); _iteratorNormalCompletion38 = true) {
            var instPan = _step38.value;
            var uid = instPan["uid"];
            var _iteratorNormalCompletion39 = true;
            var _didIteratorError39 = false;
            var _iteratorError39 = undefined;

            try {
              for (var _iterator39 = this._audioInstances[Symbol.iterator](), _step39; !(_iteratorNormalCompletion39 = (_step39 = _iterator39.next()).done); _iteratorNormalCompletion39 = true) {
                var _ai = _step39.value;
                if (_ai.GetUID() === uid) _ai.SetPanXYZA(instPan["x"], instPan["y"], instPan["z"], instPan["angle"]);
              }
            } catch (err) {
              _didIteratorError39 = true;
              _iteratorError39 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion39 && _iterator39["return"] != null) {
                  _iterator39["return"]();
                }
              } finally {
                if (_didIteratorError39) {
                  throw _iteratorError39;
                }
              }
            }
          }
        } catch (err) {
          _didIteratorError38 = true;
          _iteratorError38 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion38 && _iterator38["return"] != null) {
              _iterator38["return"]();
            }
          } finally {
            if (_didIteratorError38) {
              throw _iteratorError38;
            }
          }
        }
      }
    }, {
      key: "_AddEffect",
      value: function _AddEffect(e) {
        var type, tags, params, effect, convolutionBuffer, _iteratorNormalCompletion40, _didIteratorError40, _iteratorError40, _iterator40, _step40, tag;

        return regeneratorRuntime.async(function _AddEffect$(_context41) {
          while (1) {
            switch (_context41.prev = _context41.next) {
              case 0:
                type = e["type"];
                tags = e.hasOwnProperty("tags") ? e["tags"] : [e["tag"]];
                params = e["params"];

                if (!(type === "convolution")) {
                  _context41.next = 14;
                  break;
                }

                _context41.prev = 4;
                _context41.next = 7;
                return regeneratorRuntime.awrap(this._GetAudioBuffer(e["bufferOriginalUrl"], e["bufferUrl"], e["bufferType"], false));

              case 7:
                convolutionBuffer = _context41.sent;
                _context41.next = 14;
                break;

              case 10:
                _context41.prev = 10;
                _context41.t0 = _context41["catch"](4);
                console.log("[Construct] Audio: error loading convolution: ", _context41.t0);
                return _context41.abrupt("return");

              case 14:
                _iteratorNormalCompletion40 = true;
                _didIteratorError40 = false;
                _iteratorError40 = undefined;
                _context41.prev = 17;
                _iterator40 = tags[Symbol.iterator]();

              case 19:
                if (_iteratorNormalCompletion40 = (_step40 = _iterator40.next()).done) {
                  _context41.next = 75;
                  break;
                }

                tag = _step40.value;

                if (!(type === "filter")) {
                  _context41.next = 25;
                  break;
                }

                effect = _construct(self.C3AudioFilterFX, [this].concat(_toConsumableArray(params)));
                _context41.next = 71;
                break;

              case 25:
                if (!(type === "delay")) {
                  _context41.next = 29;
                  break;
                }

                effect = _construct(self.C3AudioDelayFX, [this].concat(_toConsumableArray(params)));
                _context41.next = 71;
                break;

              case 29:
                if (!(type === "convolution")) {
                  _context41.next = 34;
                  break;
                }

                effect = _construct(self.C3AudioConvolveFX, [this, convolutionBuffer.GetAudioBuffer()].concat(_toConsumableArray(params)));

                effect._SetBufferInfo(e["bufferOriginalUrl"], e["bufferUrl"], e["bufferType"]);

                _context41.next = 71;
                break;

              case 34:
                if (!(type === "flanger")) {
                  _context41.next = 38;
                  break;
                }

                effect = _construct(self.C3AudioFlangerFX, [this].concat(_toConsumableArray(params)));
                _context41.next = 71;
                break;

              case 38:
                if (!(type === "phaser")) {
                  _context41.next = 42;
                  break;
                }

                effect = _construct(self.C3AudioPhaserFX, [this].concat(_toConsumableArray(params)));
                _context41.next = 71;
                break;

              case 42:
                if (!(type === "gain")) {
                  _context41.next = 46;
                  break;
                }

                effect = _construct(self.C3AudioGainFX, [this].concat(_toConsumableArray(params)));
                _context41.next = 71;
                break;

              case 46:
                if (!(type === "stereopan")) {
                  _context41.next = 50;
                  break;
                }

                effect = _construct(self.C3AudioStereoPanFX, [this].concat(_toConsumableArray(params)));
                _context41.next = 71;
                break;

              case 50:
                if (!(type === "tremolo")) {
                  _context41.next = 54;
                  break;
                }

                effect = _construct(self.C3AudioTremoloFX, [this].concat(_toConsumableArray(params)));
                _context41.next = 71;
                break;

              case 54:
                if (!(type === "ringmod")) {
                  _context41.next = 58;
                  break;
                }

                effect = _construct(self.C3AudioRingModFX, [this].concat(_toConsumableArray(params)));
                _context41.next = 71;
                break;

              case 58:
                if (!(type === "distortion")) {
                  _context41.next = 62;
                  break;
                }

                effect = _construct(self.C3AudioDistortionFX, [this].concat(_toConsumableArray(params)));
                _context41.next = 71;
                break;

              case 62:
                if (!(type === "compressor")) {
                  _context41.next = 66;
                  break;
                }

                effect = _construct(self.C3AudioCompressorFX, [this].concat(_toConsumableArray(params)));
                _context41.next = 71;
                break;

              case 66:
                if (!(type === "analyser")) {
                  _context41.next = 70;
                  break;
                }

                effect = _construct(self.C3AudioAnalyserFX, [this].concat(_toConsumableArray(params)));
                _context41.next = 71;
                break;

              case 70:
                throw new Error("invalid effect type");

              case 71:
                this.AddEffectForTag(tag, effect);

              case 72:
                _iteratorNormalCompletion40 = true;
                _context41.next = 19;
                break;

              case 75:
                _context41.next = 81;
                break;

              case 77:
                _context41.prev = 77;
                _context41.t1 = _context41["catch"](17);
                _didIteratorError40 = true;
                _iteratorError40 = _context41.t1;

              case 81:
                _context41.prev = 81;
                _context41.prev = 82;

                if (!_iteratorNormalCompletion40 && _iterator40["return"] != null) {
                  _iterator40["return"]();
                }

              case 84:
                _context41.prev = 84;

                if (!_didIteratorError40) {
                  _context41.next = 87;
                  break;
                }

                throw _iteratorError40;

              case 87:
                return _context41.finish(84);

              case 88:
                return _context41.finish(81);

              case 89:
                this._PostUpdatedFxState();

              case 90:
              case "end":
                return _context41.stop();
            }
          }
        }, null, this, [[4, 10], [17, 77, 81, 89], [82,, 84, 88]]);
      }
    }, {
      key: "_SetEffectParam",
      value: function _SetEffectParam(e) {
        var tags = e["tags"];
        var index = e["index"];
        var param = e["param"];
        var value = e["value"];
        var ramp = e["ramp"];
        var time = e["time"];
        var _iteratorNormalCompletion41 = true;
        var _didIteratorError41 = false;
        var _iteratorError41 = undefined;

        try {
          for (var _iterator41 = tags[Symbol.iterator](), _step41; !(_iteratorNormalCompletion41 = (_step41 = _iterator41.next()).done); _iteratorNormalCompletion41 = true) {
            var tag = _step41.value;

            var fxChain = this._effects.get(tag.toLowerCase());

            if (!fxChain || index < 0 || index >= fxChain.length) continue;
            fxChain[index].SetParam(param, value, ramp, time);
          }
        } catch (err) {
          _didIteratorError41 = true;
          _iteratorError41 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion41 && _iterator41["return"] != null) {
              _iterator41["return"]();
            }
          } finally {
            if (_didIteratorError41) {
              throw _iteratorError41;
            }
          }
        }

        this._PostUpdatedFxState();
      }
    }, {
      key: "_RemoveEffects",
      value: function _RemoveEffects(e) {
        var tags = e["tags"];
        var _iteratorNormalCompletion42 = true;
        var _didIteratorError42 = false;
        var _iteratorError42 = undefined;

        try {
          for (var _iterator42 = tags[Symbol.iterator](), _step42; !(_iteratorNormalCompletion42 = (_step42 = _iterator42.next()).done); _iteratorNormalCompletion42 = true) {
            var tag = _step42.value;
            var lowerTag = tag.toLowerCase();

            var fxChain = this._effects.get(lowerTag);

            if (!fxChain || !fxChain.length) return;
            var _iteratorNormalCompletion43 = true;
            var _didIteratorError43 = false;
            var _iteratorError43 = undefined;

            try {
              for (var _iterator43 = fxChain[Symbol.iterator](), _step43; !(_iteratorNormalCompletion43 = (_step43 = _iterator43.next()).done); _iteratorNormalCompletion43 = true) {
                var effect = _step43.value;
                effect.Release();
              }
            } catch (err) {
              _didIteratorError43 = true;
              _iteratorError43 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion43 && _iterator43["return"] != null) {
                  _iterator43["return"]();
                }
              } finally {
                if (_didIteratorError43) {
                  throw _iteratorError43;
                }
              }
            }

            this._effects["delete"](lowerTag);

            this._ReconnectEffects(lowerTag);
          }
        } catch (err) {
          _didIteratorError42 = true;
          _iteratorError42 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion42 && _iterator42["return"] != null) {
              _iterator42["return"]();
            }
          } finally {
            if (_didIteratorError42) {
              throw _iteratorError42;
            }
          }
        }
      }
    }, {
      key: "_AddAnalyser",
      value: function _AddAnalyser(analyser) {
        this._analysers.add(analyser);

        this._MaybeStartTicking();
      }
    }, {
      key: "_RemoveAnalyser",
      value: function _RemoveAnalyser(analyser) {
        this._analysers["delete"](analyser);
      }
    }, {
      key: "_PostUpdatedFxState",
      value: function _PostUpdatedFxState() {
        var _this28 = this;

        if (this._isPendingPostFxState) return;
        this._isPendingPostFxState = true;
        Promise.resolve().then(function () {
          return _this28._DoPostUpdatedFxState();
        });
      }
    }, {
      key: "_DoPostUpdatedFxState",
      value: function _DoPostUpdatedFxState() {
        var fxstate = {};
        var _iteratorNormalCompletion44 = true;
        var _didIteratorError44 = false;
        var _iteratorError44 = undefined;

        try {
          for (var _iterator44 = this._effects[Symbol.iterator](), _step44; !(_iteratorNormalCompletion44 = (_step44 = _iterator44.next()).done); _iteratorNormalCompletion44 = true) {
            var _step44$value = _slicedToArray(_step44.value, 2),
                tag = _step44$value[0],
                fxChain = _step44$value[1];

            fxstate[tag] = fxChain.map(function (e) {
              return e.GetState();
            });
          }
        } catch (err) {
          _didIteratorError44 = true;
          _iteratorError44 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion44 && _iterator44["return"] != null) {
              _iterator44["return"]();
            }
          } finally {
            if (_didIteratorError44) {
              throw _iteratorError44;
            }
          }
        }

        this.PostToRuntime("fxstate", {
          "fxstate": fxstate
        });
        this._isPendingPostFxState = false;
      }
    }, {
      key: "_OnLoadState",
      value: function _OnLoadState(e) {
        var _this29 = this;

        var saveLoadMode, keepAudioInstances, _iteratorNormalCompletion45, _didIteratorError45, _iteratorError45, _iterator45, _step45, ai, _iteratorNormalCompletion46, _didIteratorError46, _iteratorError46, _iterator46, _step46, fxChain, _iteratorNormalCompletion47, _didIteratorError47, _iteratorError47, _iterator47, _step47, effect, listenerPos, listenerOrientation, _this$_audioContext$l3, i, promises, _i4, _Object$values, fxChainData;

        return regeneratorRuntime.async(function _OnLoadState$(_context42) {
          while (1) {
            switch (_context42.prev = _context42.next) {
              case 0:
                saveLoadMode = e["saveLoadMode"];

                if (!(saveLoadMode !== 3)) {
                  _context42.next = 23;
                  break;
                }

                keepAudioInstances = [];
                _iteratorNormalCompletion45 = true;
                _didIteratorError45 = false;
                _iteratorError45 = undefined;
                _context42.prev = 6;

                for (_iterator45 = this._audioInstances[Symbol.iterator](); !(_iteratorNormalCompletion45 = (_step45 = _iterator45.next()).done); _iteratorNormalCompletion45 = true) {
                  ai = _step45.value;
                  if (ai.IsMusic() && saveLoadMode === 1 || !ai.IsMusic() && saveLoadMode === 2) keepAudioInstances.push(ai);else ai.Release();
                }

                _context42.next = 14;
                break;

              case 10:
                _context42.prev = 10;
                _context42.t0 = _context42["catch"](6);
                _didIteratorError45 = true;
                _iteratorError45 = _context42.t0;

              case 14:
                _context42.prev = 14;
                _context42.prev = 15;

                if (!_iteratorNormalCompletion45 && _iterator45["return"] != null) {
                  _iterator45["return"]();
                }

              case 17:
                _context42.prev = 17;

                if (!_didIteratorError45) {
                  _context42.next = 20;
                  break;
                }

                throw _iteratorError45;

              case 20:
                return _context42.finish(17);

              case 21:
                return _context42.finish(14);

              case 22:
                this._audioInstances = keepAudioInstances;

              case 23:
                _iteratorNormalCompletion46 = true;
                _didIteratorError46 = false;
                _iteratorError46 = undefined;
                _context42.prev = 26;
                _iterator46 = this._effects.values()[Symbol.iterator]();

              case 28:
                if (_iteratorNormalCompletion46 = (_step46 = _iterator46.next()).done) {
                  _context42.next = 52;
                  break;
                }

                fxChain = _step46.value;
                _iteratorNormalCompletion47 = true;
                _didIteratorError47 = false;
                _iteratorError47 = undefined;
                _context42.prev = 33;

                for (_iterator47 = fxChain[Symbol.iterator](); !(_iteratorNormalCompletion47 = (_step47 = _iterator47.next()).done); _iteratorNormalCompletion47 = true) {
                  effect = _step47.value;
                  effect.Release();
                }

                _context42.next = 41;
                break;

              case 37:
                _context42.prev = 37;
                _context42.t1 = _context42["catch"](33);
                _didIteratorError47 = true;
                _iteratorError47 = _context42.t1;

              case 41:
                _context42.prev = 41;
                _context42.prev = 42;

                if (!_iteratorNormalCompletion47 && _iterator47["return"] != null) {
                  _iterator47["return"]();
                }

              case 44:
                _context42.prev = 44;

                if (!_didIteratorError47) {
                  _context42.next = 47;
                  break;
                }

                throw _iteratorError47;

              case 47:
                return _context42.finish(44);

              case 48:
                return _context42.finish(41);

              case 49:
                _iteratorNormalCompletion46 = true;
                _context42.next = 28;
                break;

              case 52:
                _context42.next = 58;
                break;

              case 54:
                _context42.prev = 54;
                _context42.t2 = _context42["catch"](26);
                _didIteratorError46 = true;
                _iteratorError46 = _context42.t2;

              case 58:
                _context42.prev = 58;
                _context42.prev = 59;

                if (!_iteratorNormalCompletion46 && _iterator46["return"] != null) {
                  _iterator46["return"]();
                }

              case 61:
                _context42.prev = 61;

                if (!_didIteratorError46) {
                  _context42.next = 64;
                  break;
                }

                throw _iteratorError46;

              case 64:
                return _context42.finish(61);

              case 65:
                return _context42.finish(58);

              case 66:
                this._effects.clear();

                this._timeScale = e["timeScale"];
                this._gameTime = e["gameTime"];
                listenerPos = e["listenerPos"];
                this._lastListenerPos[0] = listenerPos[0];
                this._lastListenerPos[1] = listenerPos[1];
                this._lastListenerPos[2] = listenerPos[2];

                this._audioContext["listener"]["setPosition"](listenerPos[0], listenerPos[1], listenerPos[2]);

                listenerOrientation = e["listenerOrientation"];

                if (Array.isArray(listenerOrientation)) {
                  for (i = 0; i < 6; ++i) {
                    this._lastListenerOrientation[i] = listenerOrientation[i];
                  }

                  (_this$_audioContext$l3 = this._audioContext["listener"])["setOrientation"].apply(_this$_audioContext$l3, _toConsumableArray(this._lastListenerOrientation));
                }

                this._isSilent = e["isSilent"];

                this._iRuntime.SetSilent(this._isSilent);

                this._masterVolume = e["masterVolume"];
                this._destinationNode["gain"]["value"] = this._masterVolume;
                promises = [];

                for (_i4 = 0, _Object$values = Object.values(e["effects"]); _i4 < _Object$values.length; _i4++) {
                  fxChainData = _Object$values[_i4];
                  promises.push(Promise.all(fxChainData.map(function (d) {
                    return _this29._AddEffect(d);
                  })));
                }

                _context42.next = 84;
                return regeneratorRuntime.awrap(Promise.all(promises));

              case 84:
                _context42.next = 86;
                return regeneratorRuntime.awrap(Promise.all(e["playing"].map(function (d) {
                  return _this29._LoadAudioInstance(d, saveLoadMode);
                })));

              case 86:
                this._MaybeStartTicking();

              case 87:
              case "end":
                return _context42.stop();
            }
          }
        }, null, this, [[6, 10, 14, 22], [15,, 17, 21], [26, 54, 58, 66], [33, 37, 41, 49], [42,, 44, 48], [59,, 61, 65]]);
      }
    }, {
      key: "_LoadAudioInstance",
      value: function _LoadAudioInstance(d, saveLoadMode) {
        var originalUrl, url, type, isMusic, tags, isLooping, volume, position, ai;
        return regeneratorRuntime.async(function _LoadAudioInstance$(_context43) {
          while (1) {
            switch (_context43.prev = _context43.next) {
              case 0:
                if (!(saveLoadMode === 3)) {
                  _context43.next = 2;
                  break;
                }

                return _context43.abrupt("return");

              case 2:
                originalUrl = d["bufferOriginalUrl"];
                url = d["bufferUrl"];
                type = d["bufferType"];
                isMusic = d["isMusic"];
                tags = d["tags"];
                isLooping = d["isLooping"];
                volume = d["volume"];
                position = d["playbackTime"];

                if (!(isMusic && saveLoadMode === 1)) {
                  _context43.next = 12;
                  break;
                }

                return _context43.abrupt("return");

              case 12:
                if (!(!isMusic && saveLoadMode === 2)) {
                  _context43.next = 14;
                  break;
                }

                return _context43.abrupt("return");

              case 14:
                ai = null;
                _context43.prev = 15;
                _context43.next = 18;
                return regeneratorRuntime.awrap(this._GetAudioInstance(originalUrl, url, type, tags, isMusic));

              case 18:
                ai = _context43.sent;
                _context43.next = 25;
                break;

              case 21:
                _context43.prev = 21;
                _context43.t0 = _context43["catch"](15);
                console.error("[Construct] Audio: error loading audio state: ", _context43.t0);
                return _context43.abrupt("return");

              case 25:
                ai.LoadPanState(d["pan"]);
                ai.LoadStereoPanState(d["stereoPan"]);
                ai.Play(isLooping, volume, position, 0);
                if (!d["isPlaying"]) ai.Pause();

                ai._LoadAdditionalState(d);

              case 30:
              case "end":
                return _context43.stop();
            }
          }
        }, null, this, [[15, 21]]);
      }
    }, {
      key: "_OnMicrophoneStream",
      value: function _OnMicrophoneStream(localMediaStream, tag) {
        if (this._microphoneSource) this._microphoneSource["disconnect"]();
        this._microphoneTag = tag.toLowerCase();
        this._microphoneSource = this._audioContext["createMediaStreamSource"](localMediaStream);

        this._microphoneSource["connect"](this.GetDestinationForTag(this._microphoneTag));
      }
    }, {
      key: "_OnGetOutputStream",
      value: function _OnGetOutputStream() {
        if (!this._destMediaStreamNode) {
          this._destMediaStreamNode = this._audioContext["createMediaStreamDestination"]();

          this._destinationNode["connect"](this._destMediaStreamNode);
        }

        return this._destMediaStreamNode["stream"];
      }
    }, {
      key: "_OnOfflineRenderAudio",
      value: function _OnOfflineRenderAudio(e) {
        var _this30 = this;

        var time, suspendPromise;
        return regeneratorRuntime.async(function _OnOfflineRenderAudio$(_context44) {
          while (1) {
            switch (_context44.prev = _context44.next) {
              case 0:
                _context44.prev = 0;
                time = e["time"];
                suspendPromise = this._audioContext["suspend"](time);

                if (!this._hasStartedOfflineRender) {
                  this._audioContext["startRendering"]().then(function (buffer) {
                    return _this30._OnOfflineRenderCompleted(buffer);
                  })["catch"](function (err) {
                    return _this30._OnOfflineRenderError(err);
                  });

                  this._hasStartedOfflineRender = true;
                } else this._audioContext["resume"]();

                _context44.next = 6;
                return regeneratorRuntime.awrap(suspendPromise);

              case 6:
                _context44.next = 11;
                break;

              case 8:
                _context44.prev = 8;
                _context44.t0 = _context44["catch"](0);

                this._OnOfflineRenderError(_context44.t0);

              case 11:
              case "end":
                return _context44.stop();
            }
          }
        }, null, this, [[0, 8]]);
      }
    }, {
      key: "_OnOfflineRenderFinish",
      value: function _OnOfflineRenderFinish() {
        this._audioContext["resume"]();
      }
    }, {
      key: "_OnOfflineRenderCompleted",
      value: function _OnOfflineRenderCompleted(buffer) {
        var channelArrayBuffers = [];

        for (var i = 0, len = buffer["numberOfChannels"]; i < len; ++i) {
          var f32arr = buffer["getChannelData"](i);
          channelArrayBuffers.push(f32arr.buffer);
        }

        this._iRuntime.PostToRuntimeComponent("runtime", "offline-audio-render-completed", {
          "duration": buffer["duration"],
          "length": buffer["length"],
          "numberOfChannels": buffer["numberOfChannels"],
          "sampleRate": buffer["sampleRate"],
          "channelData": channelArrayBuffers
        }, null, channelArrayBuffers);
      }
    }, {
      key: "_OnOfflineRenderError",
      value: function _OnOfflineRenderError(err) {
        console.error("[Audio] Offline rendering error: ", err);
      }
    }], [{
      key: "EqualsNoCase",
      value: function EqualsNoCase(a, b) {
        return a === b || a.normalize().toLowerCase() === b.normalize().toLowerCase();
      }
    }, {
      key: "ToDegrees",
      value: function ToDegrees(x) {
        return x * R_TO_D;
      }
    }, {
      key: "DbToLinearNoCap",
      value: function DbToLinearNoCap(x) {
        return Math.pow(10, x / 20);
      }
    }, {
      key: "DbToLinear",
      value: function DbToLinear(x) {
        return Math.max(Math.min(self.AudioDOMHandler.DbToLinearNoCap(x), 1), 0);
      }
    }, {
      key: "LinearToDbNoCap",
      value: function LinearToDbNoCap(x) {
        return Math.log(x) / Math.log(10) * 20;
      }
    }, {
      key: "LinearToDb",
      value: function LinearToDb(x) {
        return self.AudioDOMHandler.LinearToDbNoCap(Math.max(Math.min(x, 1), 0));
      }
    }, {
      key: "e4",
      value: function e4(x, k) {
        return 1 - Math.exp(-k * x);
      }
    }]);

    return AudioDOMHandler;
  }(self.DOMHandler);

  self.RuntimeInterface.AddDOMHandlerClass(self.AudioDOMHandler);
}
;
'use strict';

{
  self.C3AudioBuffer =
  /*#__PURE__*/
  function () {
    function C3AudioBuffer(audioDomHandler, originalUrl, url, type, isMusic) {
      _classCallCheck(this, C3AudioBuffer);

      this._audioDomHandler = audioDomHandler;
      this._originalUrl = originalUrl;
      this._url = url;
      this._type = type;
      this._isMusic = isMusic;
      this._api = "";
      this._loadState = "not-loaded";
      this._loadPromise = null;
    }

    _createClass(C3AudioBuffer, [{
      key: "Release",
      value: function Release() {
        this._loadState = "not-loaded";
        this._audioDomHandler = null;
        this._loadPromise = null;
      }
    }, {
      key: "CreateInstance",
      value: function CreateInstance(tags) {
        if (this._api === "html5") return new self.C3Html5AudioInstance(this._audioDomHandler, this, tags);else return new self.C3WebAudioInstance(this._audioDomHandler, this, tags);
      }
    }, {
      key: "_Load",
      value: function _Load() {}
    }, {
      key: "Load",
      value: function Load() {
        if (!this._loadPromise) this._loadPromise = this._Load();
        return this._loadPromise;
      }
    }, {
      key: "IsLoaded",
      value: function IsLoaded() {}
    }, {
      key: "IsLoadedAndDecoded",
      value: function IsLoadedAndDecoded() {}
    }, {
      key: "HasFailedToLoad",
      value: function HasFailedToLoad() {
        return this._loadState === "failed";
      }
    }, {
      key: "GetAudioContext",
      value: function GetAudioContext() {
        return this._audioDomHandler.GetAudioContext();
      }
    }, {
      key: "GetApi",
      value: function GetApi() {
        return this._api;
      }
    }, {
      key: "GetOriginalUrl",
      value: function GetOriginalUrl() {
        return this._originalUrl;
      }
    }, {
      key: "GetUrl",
      value: function GetUrl() {
        return this._url;
      }
    }, {
      key: "GetContentType",
      value: function GetContentType() {
        return this._type;
      }
    }, {
      key: "IsMusic",
      value: function IsMusic() {
        return this._isMusic;
      }
    }, {
      key: "GetDuration",
      value: function GetDuration() {}
    }], [{
      key: "Create",
      value: function Create(audioDomHandler, originalUrl, url, type, isMusic) {
        var needsSoftwareDecode = type === "audio/webm; codecs=opus" && !audioDomHandler.SupportsWebMOpus();
        if (isMusic && needsSoftwareDecode) audioDomHandler._SetHasAnySoftwareDecodedMusic();
        if (!isMusic || audioDomHandler.IsPlayMusicAsSound() || needsSoftwareDecode) return new self.C3WebAudioBuffer(audioDomHandler, originalUrl, url, type, isMusic, needsSoftwareDecode);else return new self.C3Html5AudioBuffer(audioDomHandler, originalUrl, url, type, isMusic);
      }
    }]);

    return C3AudioBuffer;
  }();
}
;
'use strict';

{
  self.C3Html5AudioBuffer =
  /*#__PURE__*/
  function (_self$C3AudioBuffer) {
    _inherits(C3Html5AudioBuffer, _self$C3AudioBuffer);

    function C3Html5AudioBuffer(audioDomHandler, originalUrl, url, type, isMusic) {
      var _this31;

      _classCallCheck(this, C3Html5AudioBuffer);

      _this31 = _possibleConstructorReturn(this, _getPrototypeOf(C3Html5AudioBuffer).call(this, audioDomHandler, originalUrl, url, type, isMusic));
      _this31._api = "html5";
      _this31._audioElem = new Audio();
      _this31._audioElem.crossOrigin = "anonymous";
      _this31._audioElem.autoplay = false;
      _this31._audioElem.preload = "auto";
      _this31._loadResolve = null;
      _this31._loadReject = null;
      _this31._reachedCanPlayThrough = false;

      _this31._audioElem.addEventListener("canplaythrough", function () {
        return _this31._reachedCanPlayThrough = true;
      });

      _this31._outNode = _this31.GetAudioContext()["createGain"]();
      _this31._mediaSourceNode = null;

      _this31._audioElem.addEventListener("canplay", function () {
        if (_this31._loadResolve) {
          _this31._loadState = "loaded";

          _this31._loadResolve();

          _this31._loadResolve = null;
          _this31._loadReject = null;
        }

        if (_this31._mediaSourceNode || !_this31._audioElem) return;
        _this31._mediaSourceNode = _this31.GetAudioContext()["createMediaElementSource"](_this31._audioElem);

        _this31._mediaSourceNode["connect"](_this31._outNode);
      });

      _this31.onended = null;

      _this31._audioElem.addEventListener("ended", function () {
        if (_this31.onended) _this31.onended();
      });

      _this31._audioElem.addEventListener("error", function (e) {
        return _this31._OnError(e);
      });

      return _this31;
    }

    _createClass(C3Html5AudioBuffer, [{
      key: "Release",
      value: function Release() {
        this._audioDomHandler.ReleaseInstancesForBuffer(this);

        this._outNode["disconnect"]();

        this._outNode = null;

        this._mediaSourceNode["disconnect"]();

        this._mediaSourceNode = null;
        if (this._audioElem && !this._audioElem.paused) this._audioElem.pause();
        this.onended = null;
        this._audioElem = null;

        _get(_getPrototypeOf(C3Html5AudioBuffer.prototype), "Release", this).call(this);
      }
    }, {
      key: "_Load",
      value: function _Load() {
        var _this32 = this;

        this._loadState = "loading";
        return new Promise(function (resolve, reject) {
          _this32._loadResolve = resolve;
          _this32._loadReject = reject;
          _this32._audioElem.src = _this32._url;
        });
      }
    }, {
      key: "_OnError",
      value: function _OnError(e) {
        console.error("[Construct] Audio '".concat(this._url, "' error: "), e);

        if (this._loadReject) {
          this._loadState = "failed";

          this._loadReject(e);

          this._loadResolve = null;
          this._loadReject = null;
        }
      }
    }, {
      key: "IsLoaded",
      value: function IsLoaded() {
        var ret = this._audioElem["readyState"] >= 4;
        if (ret) this._reachedCanPlayThrough = true;
        return ret || this._reachedCanPlayThrough;
      }
    }, {
      key: "IsLoadedAndDecoded",
      value: function IsLoadedAndDecoded() {
        return this.IsLoaded();
      }
    }, {
      key: "GetAudioElement",
      value: function GetAudioElement() {
        return this._audioElem;
      }
    }, {
      key: "GetOutputNode",
      value: function GetOutputNode() {
        return this._outNode;
      }
    }, {
      key: "GetDuration",
      value: function GetDuration() {
        return this._audioElem["duration"];
      }
    }]);

    return C3Html5AudioBuffer;
  }(self.C3AudioBuffer);
}
;
'use strict';

{
  self.C3WebAudioBuffer =
  /*#__PURE__*/
  function (_self$C3AudioBuffer2) {
    _inherits(C3WebAudioBuffer, _self$C3AudioBuffer2);

    function C3WebAudioBuffer(audioDomHandler, originalUrl, url, type, isMusic, needsSoftwareDecode) {
      var _this33;

      _classCallCheck(this, C3WebAudioBuffer);

      _this33 = _possibleConstructorReturn(this, _getPrototypeOf(C3WebAudioBuffer).call(this, audioDomHandler, originalUrl, url, type, isMusic));
      _this33._api = "webaudio";
      _this33._audioData = null;
      _this33._audioBuffer = null;
      _this33._needsSoftwareDecode = !!needsSoftwareDecode;
      return _this33;
    }

    _createClass(C3WebAudioBuffer, [{
      key: "Release",
      value: function Release() {
        this._audioDomHandler.ReleaseInstancesForBuffer(this);

        this._audioData = null;
        this._audioBuffer = null;

        _get(_getPrototypeOf(C3WebAudioBuffer.prototype), "Release", this).call(this);
      }
    }, {
      key: "_Fetch",
      value: function _Fetch() {
        var iRuntime, response;
        return regeneratorRuntime.async(function _Fetch$(_context45) {
          while (1) {
            switch (_context45.prev = _context45.next) {
              case 0:
                if (!this._audioData) {
                  _context45.next = 2;
                  break;
                }

                return _context45.abrupt("return", this._audioData);

              case 2:
                iRuntime = this._audioDomHandler.GetRuntimeInterface();

                if (!(iRuntime.GetExportType() === "cordova" && iRuntime.IsRelativeURL(this._url) && iRuntime.IsFileProtocol())) {
                  _context45.next = 9;
                  break;
                }

                _context45.next = 6;
                return regeneratorRuntime.awrap(iRuntime.CordovaFetchLocalFileAsArrayBuffer(this._url));

              case 6:
                this._audioData = _context45.sent;
                _context45.next = 17;
                break;

              case 9:
                _context45.next = 11;
                return regeneratorRuntime.awrap(fetch(this._url));

              case 11:
                response = _context45.sent;

                if (response.ok) {
                  _context45.next = 14;
                  break;
                }

                throw new Error("error fetching audio data: ".concat(response.status, " ").concat(response.statusText));

              case 14:
                _context45.next = 16;
                return regeneratorRuntime.awrap(response.arrayBuffer());

              case 16:
                this._audioData = _context45.sent;

              case 17:
              case "end":
                return _context45.stop();
            }
          }
        }, null, this);
      }
    }, {
      key: "_Decode",
      value: function _Decode() {
        return regeneratorRuntime.async(function _Decode$(_context46) {
          while (1) {
            switch (_context46.prev = _context46.next) {
              case 0:
                if (!this._audioBuffer) {
                  _context46.next = 2;
                  break;
                }

                return _context46.abrupt("return", this._audioBuffer);

              case 2:
                _context46.next = 4;
                return regeneratorRuntime.awrap(this._audioDomHandler.DecodeAudioData(this._audioData, this._needsSoftwareDecode));

              case 4:
                this._audioBuffer = _context46.sent;
                this._audioData = null;

              case 6:
              case "end":
                return _context46.stop();
            }
          }
        }, null, this);
      }
    }, {
      key: "_Load",
      value: function _Load() {
        return regeneratorRuntime.async(function _Load$(_context47) {
          while (1) {
            switch (_context47.prev = _context47.next) {
              case 0:
                _context47.prev = 0;
                this._loadState = "loading";
                _context47.next = 4;
                return regeneratorRuntime.awrap(this._Fetch());

              case 4:
                _context47.next = 6;
                return regeneratorRuntime.awrap(this._Decode());

              case 6:
                this._loadState = "loaded";
                _context47.next = 13;
                break;

              case 9:
                _context47.prev = 9;
                _context47.t0 = _context47["catch"](0);
                this._loadState = "failed";
                console.error("[Construct] Failed to load audio '".concat(this._url, "': "), _context47.t0);

              case 13:
              case "end":
                return _context47.stop();
            }
          }
        }, null, this, [[0, 9]]);
      }
    }, {
      key: "IsLoaded",
      value: function IsLoaded() {
        return !!(this._audioData || this._audioBuffer);
      }
    }, {
      key: "IsLoadedAndDecoded",
      value: function IsLoadedAndDecoded() {
        return !!this._audioBuffer;
      }
    }, {
      key: "GetAudioBuffer",
      value: function GetAudioBuffer() {
        return this._audioBuffer;
      }
    }, {
      key: "GetDuration",
      value: function GetDuration() {
        return this._audioBuffer ? this._audioBuffer["duration"] : 0;
      }
    }]);

    return C3WebAudioBuffer;
  }(self.C3AudioBuffer);
}
;
'use strict';

{
  var nextAiId = 0;

  self.C3AudioInstance =
  /*#__PURE__*/
  function () {
    function C3AudioInstance(audioDomHandler, buffer, tags) {
      _classCallCheck(this, C3AudioInstance);

      this._audioDomHandler = audioDomHandler;
      this._buffer = buffer;
      this._tags = tags;
      this._aiId = nextAiId++;
      this._gainNode = this.GetAudioContext()["createGain"]();

      this._gainNode["connect"](this.GetDestinationNode());

      this._pannerNode = null;
      this._isPannerEnabled = false;
      this._pannerPosition = [0, 0, 0];
      this._pannerOrientation = [0, 0, 0];
      this._pannerConeParams = [0, 0, 0];
      this._stereoPannerNode = null;
      this._isStereoPannerEnabled = false;
      this._stereoPan = 0;
      this._isStopped = true;
      this._isPaused = false;
      this._resumeMe = false;
      this._isLooping = false;
      this._volume = 1;
      this._isMuted = false;
      this._playbackRate = 1;

      var timeScaleMode = this._audioDomHandler.GetTimeScaleMode();

      this._isTimescaled = timeScaleMode === 1 && !this.IsMusic() || timeScaleMode === 2;
      this._instUid = -1;
      this._fadeEndTime = -1;
      this._stopOnFadeEnd = false;
    }

    _createClass(C3AudioInstance, [{
      key: "Release",
      value: function Release() {
        this._audioDomHandler = null;
        this._buffer = null;

        if (this._pannerNode) {
          this._pannerNode["disconnect"]();

          this._pannerNode = null;
        }

        if (this._stereoPannerNode) {
          this._stereoPannerNode["disconnect"]();

          this._stereoPannerNode = null;
        }

        this._gainNode["disconnect"]();

        this._gainNode = null;
      }
    }, {
      key: "GetAudioContext",
      value: function GetAudioContext() {
        return this._audioDomHandler.GetAudioContext();
      }
    }, {
      key: "SetTags",
      value: function SetTags(tags) {
        this._tags = tags;
      }
    }, {
      key: "GetTags",
      value: function GetTags() {
        return this._tags;
      }
    }, {
      key: "GetEffectTag",
      value: function GetEffectTag() {
        return this._tags.length > 0 ? this._tags[0] : "";
      }
    }, {
      key: "GetDestinationNode",
      value: function GetDestinationNode() {
        return this._audioDomHandler.GetDestinationForTag(this.GetEffectTag());
      }
    }, {
      key: "GetCurrentTime",
      value: function GetCurrentTime() {
        if (this._isTimescaled) return this._audioDomHandler.GetGameTime();else return performance.now() / 1E3;
      }
    }, {
      key: "GetOriginalUrl",
      value: function GetOriginalUrl() {
        return this._buffer.GetOriginalUrl();
      }
    }, {
      key: "GetUrl",
      value: function GetUrl() {
        return this._buffer.GetUrl();
      }
    }, {
      key: "GetContentType",
      value: function GetContentType() {
        return this._buffer.GetContentType();
      }
    }, {
      key: "GetBuffer",
      value: function GetBuffer() {
        return this._buffer;
      }
    }, {
      key: "IsMusic",
      value: function IsMusic() {
        return this._buffer.IsMusic();
      }
    }, {
      key: "GetAiId",
      value: function GetAiId() {
        return this._aiId;
      }
    }, {
      key: "HasEnded",
      value: function HasEnded() {}
    }, {
      key: "CanBeRecycled",
      value: function CanBeRecycled() {}
    }, {
      key: "IsPlaying",
      value: function IsPlaying() {
        return !this._isStopped && !this._isPaused && !this.HasEnded();
      }
    }, {
      key: "IsActive",
      value: function IsActive() {
        return !this._isStopped && !this.HasEnded();
      }
    }, {
      key: "GetPlaybackTime",
      value: function GetPlaybackTime() {}
    }, {
      key: "GetDuration",
      value: function GetDuration(applyPlaybackRate) {
        var ret = this._buffer.GetDuration();

        if (applyPlaybackRate) ret /= this._playbackRate || .001;
        return ret;
      }
    }, {
      key: "Play",
      value: function Play(isLooping, vol, seekPos, scheduledTime) {}
    }, {
      key: "Stop",
      value: function Stop() {}
    }, {
      key: "Pause",
      value: function Pause() {}
    }, {
      key: "IsPaused",
      value: function IsPaused() {
        return this._isPaused;
      }
    }, {
      key: "Resume",
      value: function Resume() {}
    }, {
      key: "SetVolume",
      value: function SetVolume(v) {
        this._volume = v;

        this._gainNode["gain"]["cancelScheduledValues"](0);

        this._fadeEndTime = -1;
        this._gainNode["gain"]["value"] = this.GetOutputVolume();
      }
    }, {
      key: "FadeVolume",
      value: function FadeVolume(vol, duration, stopOnEnd) {
        if (this.IsMuted()) return;
        var gainParam = this._gainNode["gain"];
        gainParam["cancelScheduledValues"](0);

        var currentTime = this._audioDomHandler.GetAudioCurrentTime();

        var endTime = currentTime + duration;
        gainParam["setValueAtTime"](gainParam["value"], currentTime);
        gainParam["linearRampToValueAtTime"](vol, endTime);
        this._volume = vol;
        this._fadeEndTime = endTime;
        this._stopOnFadeEnd = stopOnEnd;
      }
    }, {
      key: "_UpdateVolume",
      value: function _UpdateVolume() {
        this.SetVolume(this._volume);
      }
    }, {
      key: "Tick",
      value: function Tick(currentTime) {
        if (this._fadeEndTime !== -1 && currentTime >= this._fadeEndTime) {
          this._fadeEndTime = -1;
          if (this._stopOnFadeEnd) this.Stop();

          this._audioDomHandler.PostTrigger("fade-ended", this._tags, this._aiId);
        }
      }
    }, {
      key: "GetOutputVolume",
      value: function GetOutputVolume() {
        var ret = this._volume;
        return isFinite(ret) ? ret : 0;
      }
    }, {
      key: "SetMuted",
      value: function SetMuted(m) {
        m = !!m;
        if (this._isMuted === m) return;
        this._isMuted = m;

        this._UpdateMuted();
      }
    }, {
      key: "IsMuted",
      value: function IsMuted() {
        return this._isMuted;
      }
    }, {
      key: "IsSilent",
      value: function IsSilent() {
        return this._audioDomHandler.IsSilent();
      }
    }, {
      key: "_UpdateMuted",
      value: function _UpdateMuted() {}
    }, {
      key: "SetLooping",
      value: function SetLooping(l) {}
    }, {
      key: "IsLooping",
      value: function IsLooping() {
        return this._isLooping;
      }
    }, {
      key: "SetPlaybackRate",
      value: function SetPlaybackRate(r) {
        if (this._playbackRate === r) return;
        this._playbackRate = r;

        this._UpdatePlaybackRate();
      }
    }, {
      key: "_UpdatePlaybackRate",
      value: function _UpdatePlaybackRate() {}
    }, {
      key: "GetPlaybackRate",
      value: function GetPlaybackRate() {
        return this._playbackRate;
      }
    }, {
      key: "Seek",
      value: function Seek(pos) {}
    }, {
      key: "SetSuspended",
      value: function SetSuspended(s) {}
    }, {
      key: "SetPannerEnabled",
      value: function SetPannerEnabled(e) {
        e = !!e;
        if (this._isPannerEnabled === e) return;
        this._isPannerEnabled = e;

        if (this._isPannerEnabled) {
          this.SetStereoPannerEnabled(false);

          if (!this._pannerNode) {
            this._pannerNode = this.GetAudioContext()["createPanner"]();
            this._pannerNode["panningModel"] = this._audioDomHandler.GetPanningModel();
            this._pannerNode["distanceModel"] = this._audioDomHandler.GetDistanceModel();
            this._pannerNode["refDistance"] = this._audioDomHandler.GetReferenceDistance();
            this._pannerNode["maxDistance"] = this._audioDomHandler.GetMaxDistance();
            this._pannerNode["rolloffFactor"] = this._audioDomHandler.GetRolloffFactor();
          }

          this._gainNode["disconnect"]();

          this._gainNode["connect"](this._pannerNode);

          this._pannerNode["connect"](this.GetDestinationNode());
        } else {
          this._pannerNode["disconnect"]();

          this._gainNode["disconnect"]();

          this._gainNode["connect"](this.GetDestinationNode());
        }
      }
    }, {
      key: "SetPan",
      value: function SetPan(x, y, z, angle, innerAngle, outerAngle, outerGain) {
        if (!this._isPannerEnabled) return;
        this.SetPanXYZA(x, y, z, angle);
        var toDegrees = self.AudioDOMHandler.ToDegrees;

        if (this._pannerConeParams[0] !== toDegrees(innerAngle)) {
          this._pannerConeParams[0] = toDegrees(innerAngle);
          this._pannerNode["coneInnerAngle"] = toDegrees(innerAngle);
        }

        if (this._pannerConeParams[1] !== toDegrees(outerAngle)) {
          this._pannerConeParams[1] = toDegrees(outerAngle);
          this._pannerNode["coneOuterAngle"] = toDegrees(outerAngle);
        }

        if (this._pannerConeParams[2] !== outerGain) {
          this._pannerConeParams[2] = outerGain;
          this._pannerNode["coneOuterGain"] = outerGain;
        }
      }
    }, {
      key: "SetPanXYZA",
      value: function SetPanXYZA(x, y, z, angle) {
        if (!this._isPannerEnabled) return;
        var pos = this._pannerPosition;
        var orient = this._pannerOrientation;
        var cosa = Math.cos(angle);
        var sina = Math.sin(angle);

        if (pos[0] !== x || pos[1] !== y || pos[2] !== z) {
          var _this$_pannerNode;

          pos[0] = x;
          pos[1] = y;
          pos[2] = z;

          (_this$_pannerNode = this._pannerNode)["setPosition"].apply(_this$_pannerNode, _toConsumableArray(pos));
        }

        if (orient[0] !== cosa || orient[1] !== sina || orient[2] !== 0) {
          var _this$_pannerNode2;

          orient[0] = cosa;
          orient[1] = sina;
          orient[2] = 0;

          (_this$_pannerNode2 = this._pannerNode)["setOrientation"].apply(_this$_pannerNode2, _toConsumableArray(orient));
        }
      }
    }, {
      key: "SetStereoPannerEnabled",
      value: function SetStereoPannerEnabled(e) {
        e = !!e;
        if (this._isStereoPannerEnabled === e) return;
        this._isStereoPannerEnabled = e;

        if (this._isStereoPannerEnabled) {
          this.SetPannerEnabled(false);
          this._stereoPannerNode = this.GetAudioContext()["createStereoPanner"]();

          this._gainNode["disconnect"]();

          this._gainNode["connect"](this._stereoPannerNode);

          this._stereoPannerNode["connect"](this.GetDestinationNode());
        } else {
          this._stereoPannerNode["disconnect"]();

          this._stereoPannerNode = null;

          this._gainNode["disconnect"]();

          this._gainNode["connect"](this.GetDestinationNode());
        }
      }
    }, {
      key: "SetStereoPan",
      value: function SetStereoPan(p) {
        if (!this._isStereoPannerEnabled) return;
        if (this._stereoPan === p) return;
        this._stereoPannerNode["pan"]["value"] = p;
        this._stereoPan = p;
      }
    }, {
      key: "SetUID",
      value: function SetUID(uid) {
        this._instUid = uid;
      }
    }, {
      key: "GetUID",
      value: function GetUID() {
        return this._instUid;
      }
    }, {
      key: "GetResumePosition",
      value: function GetResumePosition() {}
    }, {
      key: "Reconnect",
      value: function Reconnect(toNode) {
        var outNode = this._stereoPannerNode || this._pannerNode || this._gainNode;
        outNode["disconnect"]();
        outNode["connect"](toNode);
      }
    }, {
      key: "GetState",
      value: function GetState() {
        return {
          "aiid": this.GetAiId(),
          "tags": this._tags,
          "duration": this.GetDuration(),
          "volume": this._fadeEndTime === -1 ? this._volume : this._gainNode["gain"]["value"],
          "isPlaying": this.IsPlaying(),
          "playbackTime": this.GetPlaybackTime(),
          "playbackRate": this.GetPlaybackRate(),
          "uid": this._instUid,
          "bufferOriginalUrl": this.GetOriginalUrl(),
          "bufferUrl": "",
          "bufferType": this.GetContentType(),
          "isMusic": this.IsMusic(),
          "isLooping": this.IsLooping(),
          "isMuted": this.IsMuted(),
          "resumePosition": this.GetResumePosition(),
          "pan": this.GetPanState(),
          "stereoPan": this.GetStereoPanState()
        };
      }
    }, {
      key: "_LoadAdditionalState",
      value: function _LoadAdditionalState(d) {
        this.SetPlaybackRate(d["playbackRate"]);
        this.SetMuted(d["isMuted"]);
      }
    }, {
      key: "GetPanState",
      value: function GetPanState() {
        if (!this._pannerNode) return null;
        var pn = this._pannerNode;
        return {
          "pos": this._pannerPosition,
          "orient": this._pannerOrientation,
          "cia": pn["coneInnerAngle"],
          "coa": pn["coneOuterAngle"],
          "cog": pn["coneOuterGain"],
          "uid": this._instUid
        };
      }
    }, {
      key: "LoadPanState",
      value: function LoadPanState(d) {
        if (!d) {
          this.SetPannerEnabled(false);
          return;
        }

        this.SetPannerEnabled(true);
        var pn = this._pannerNode;
        var panPos = d["pos"];
        this._pannerPosition[0] = panPos[0];
        this._pannerPosition[1] = panPos[1];
        this._pannerPosition[2] = panPos[2];
        var panOrient = d["orient"];
        this._pannerOrientation[0] = panOrient[0];
        this._pannerOrientation[1] = panOrient[1];
        this._pannerOrientation[2] = panOrient[2];
        pn["setPosition"].apply(pn, _toConsumableArray(this._pannerPosition));
        pn["setOrientation"].apply(pn, _toConsumableArray(this._pannerOrientation));
        this._pannerConeParams[0] = d["cia"];
        this._pannerConeParams[1] = d["coa"];
        this._pannerConeParams[2] = d["cog"];
        pn["coneInnerAngle"] = d["cia"];
        pn["coneOuterAngle"] = d["coa"];
        pn["coneOuterGain"] = d["cog"];
        this._instUid = d["uid"];
      }
    }, {
      key: "GetStereoPanState",
      value: function GetStereoPanState() {
        if (this._stereoPannerNode) return this._stereoPan;else return null;
      }
    }, {
      key: "LoadStereoPanState",
      value: function LoadStereoPanState(p) {
        if (typeof p !== "number") {
          this.SetStereoPannerEnabled(false);
          return;
        }

        this.SetStereoPannerEnabled(true);
        this.SetStereoPan(p);
      }
    }]);

    return C3AudioInstance;
  }();
}
;
'use strict';

{
  self.C3Html5AudioInstance =
  /*#__PURE__*/
  function (_self$C3AudioInstance) {
    _inherits(C3Html5AudioInstance, _self$C3AudioInstance);

    function C3Html5AudioInstance(audioDomHandler, buffer, tags) {
      var _this34;

      _classCallCheck(this, C3Html5AudioInstance);

      _this34 = _possibleConstructorReturn(this, _getPrototypeOf(C3Html5AudioInstance).call(this, audioDomHandler, buffer, tags));

      _this34._buffer.GetOutputNode()["connect"](_this34._gainNode);

      _this34._buffer.onended = function () {
        return _this34._OnEnded();
      };

      return _this34;
    }

    _createClass(C3Html5AudioInstance, [{
      key: "Release",
      value: function Release() {
        this.Stop();

        this._buffer.GetOutputNode()["disconnect"]();

        _get(_getPrototypeOf(C3Html5AudioInstance.prototype), "Release", this).call(this);
      }
    }, {
      key: "GetAudioElement",
      value: function GetAudioElement() {
        return this._buffer.GetAudioElement();
      }
    }, {
      key: "_OnEnded",
      value: function _OnEnded() {
        this._isStopped = true;
        this._instUid = -1;

        this._audioDomHandler.PostTrigger("ended", this._tags, this._aiId);
      }
    }, {
      key: "HasEnded",
      value: function HasEnded() {
        return this.GetAudioElement()["ended"];
      }
    }, {
      key: "CanBeRecycled",
      value: function CanBeRecycled() {
        if (this._isStopped) return true;
        return this.HasEnded();
      }
    }, {
      key: "GetPlaybackTime",
      value: function GetPlaybackTime() {
        var ret = this.GetAudioElement()["currentTime"];
        if (!this._isLooping) ret = Math.min(ret, this.GetDuration());
        return ret;
      }
    }, {
      key: "Play",
      value: function Play(isLooping, vol, seekPos, scheduledTime) {
        var audioElem = this.GetAudioElement();
        if (audioElem.playbackRate !== 1) audioElem.playbackRate = 1;
        if (audioElem.loop !== isLooping) audioElem.loop = isLooping;
        this.SetVolume(vol);
        this._isMuted = false;
        if (audioElem.muted) audioElem.muted = false;
        if (audioElem.currentTime !== seekPos) try {
          audioElem.currentTime = seekPos;
        } catch (err) {
          console.warn("[Construct] Exception seeking audio '".concat(this._buffer.GetUrl(), "' to position '").concat(seekPos, "': "), err);
        }

        this._audioDomHandler.TryPlayMedia(audioElem);

        this._isStopped = false;
        this._isPaused = false;
        this._isLooping = isLooping;
        this._playbackRate = 1;
      }
    }, {
      key: "Stop",
      value: function Stop() {
        var audioElem = this.GetAudioElement();
        if (!audioElem.paused) audioElem.pause();

        this._audioDomHandler.RemovePendingPlay(audioElem);

        this._isStopped = true;
        this._isPaused = false;
        this._instUid = -1;
      }
    }, {
      key: "Pause",
      value: function Pause() {
        if (this._isPaused || this._isStopped || this.HasEnded()) return;
        var audioElem = this.GetAudioElement();
        if (!audioElem.paused) audioElem.pause();

        this._audioDomHandler.RemovePendingPlay(audioElem);

        this._isPaused = true;
      }
    }, {
      key: "Resume",
      value: function Resume() {
        if (!this._isPaused || this._isStopped || this.HasEnded()) return;

        this._audioDomHandler.TryPlayMedia(this.GetAudioElement());

        this._isPaused = false;
      }
    }, {
      key: "_UpdateMuted",
      value: function _UpdateMuted() {
        this.GetAudioElement().muted = this._isMuted || this.IsSilent();
      }
    }, {
      key: "SetLooping",
      value: function SetLooping(l) {
        l = !!l;
        if (this._isLooping === l) return;
        this._isLooping = l;
        this.GetAudioElement().loop = l;
      }
    }, {
      key: "_UpdatePlaybackRate",
      value: function _UpdatePlaybackRate() {
        var r = this._playbackRate;
        if (this._isTimescaled) r *= this._audioDomHandler.GetTimeScale();

        try {
          this.GetAudioElement()["playbackRate"] = r;
        } catch (err) {
          console.warn("[Construct] Unable to set playback rate '".concat(r, "':"), err);
        }
      }
    }, {
      key: "Seek",
      value: function Seek(pos) {
        if (this._isStopped || this.HasEnded()) return;

        try {
          this.GetAudioElement()["currentTime"] = pos;
        } catch (err) {
          console.warn("[Construct] Error seeking audio to '".concat(pos, "': "), err);
        }
      }
    }, {
      key: "GetResumePosition",
      value: function GetResumePosition() {
        return this.GetPlaybackTime();
      }
    }, {
      key: "SetSuspended",
      value: function SetSuspended(s) {
        if (s) {
          if (this.IsPlaying()) {
            this.GetAudioElement()["pause"]();
            this._resumeMe = true;
          } else this._resumeMe = false;
        } else if (this._resumeMe) {
          this._audioDomHandler.TryPlayMedia(this.GetAudioElement());

          this._resumeMe = false;
        }
      }
    }]);

    return C3Html5AudioInstance;
  }(self.C3AudioInstance);
}
;
'use strict';

{
  self.C3WebAudioInstance =
  /*#__PURE__*/
  function (_self$C3AudioInstance2) {
    _inherits(C3WebAudioInstance, _self$C3AudioInstance2);

    function C3WebAudioInstance(audioDomHandler, buffer, tags) {
      var _this35;

      _classCallCheck(this, C3WebAudioInstance);

      _this35 = _possibleConstructorReturn(this, _getPrototypeOf(C3WebAudioInstance).call(this, audioDomHandler, buffer, tags));
      _this35._bufferSource = null;

      _this35._onended_handler = function (e) {
        return _this35._OnEnded(e);
      };

      _this35._hasPlaybackEnded = true;
      _this35._activeSource = null;
      _this35._playStartTime = 0;
      _this35._playFromSeekPos = 0;
      _this35._resumePosition = 0;
      _this35._muteVol = 1;
      return _this35;
    }

    _createClass(C3WebAudioInstance, [{
      key: "Release",
      value: function Release() {
        this.Stop();

        this._ReleaseBufferSource();

        this._onended_handler = null;

        _get(_getPrototypeOf(C3WebAudioInstance.prototype), "Release", this).call(this);
      }
    }, {
      key: "_ReleaseBufferSource",
      value: function _ReleaseBufferSource() {
        if (this._bufferSource) {
          this._bufferSource["onended"] = null;

          this._bufferSource["disconnect"]();

          this._bufferSource["buffer"] = null;
        }

        this._bufferSource = null;
        this._activeSource = null;
      }
    }, {
      key: "_OnEnded",
      value: function _OnEnded(e) {
        if (this._isPaused || this._resumeMe) return;
        if (e.target !== this._activeSource) return;
        this._hasPlaybackEnded = true;
        this._isStopped = true;
        this._instUid = -1;

        this._ReleaseBufferSource();

        this._audioDomHandler.PostTrigger("ended", this._tags, this._aiId);
      }
    }, {
      key: "HasEnded",
      value: function HasEnded() {
        if (!this._isStopped && this._bufferSource && this._bufferSource["loop"]) return false;
        if (this._isPaused) return false;
        return this._hasPlaybackEnded;
      }
    }, {
      key: "CanBeRecycled",
      value: function CanBeRecycled() {
        if (!this._bufferSource || this._isStopped) return true;
        return this.HasEnded();
      }
    }, {
      key: "GetPlaybackTime",
      value: function GetPlaybackTime() {
        var ret = 0;
        if (this._isPaused) ret = this._resumePosition;else ret = this._playFromSeekPos + (this.GetCurrentTime() - this._playStartTime) * this._playbackRate;
        if (!this._isLooping) ret = Math.min(ret, this.GetDuration());
        return ret;
      }
    }, {
      key: "Play",
      value: function Play(isLooping, vol, seekPos, scheduledTime) {
        this._isMuted = false;
        this._muteVol = 1;
        this.SetVolume(vol);

        this._ReleaseBufferSource();

        this._bufferSource = this.GetAudioContext()["createBufferSource"]();
        this._bufferSource["buffer"] = this._buffer.GetAudioBuffer();

        this._bufferSource["connect"](this._gainNode);

        this._activeSource = this._bufferSource;
        this._bufferSource["onended"] = this._onended_handler;
        this._bufferSource["loop"] = isLooping;

        this._bufferSource["start"](scheduledTime, seekPos);

        this._hasPlaybackEnded = false;
        this._isStopped = false;
        this._isPaused = false;
        this._isLooping = isLooping;
        this._playbackRate = 1;
        this._playStartTime = this.GetCurrentTime();
        this._playFromSeekPos = seekPos;
      }
    }, {
      key: "Stop",
      value: function Stop() {
        if (this._bufferSource) try {
          this._bufferSource["stop"](0);
        } catch (err) {}
        this._isStopped = true;
        this._isPaused = false;
        this._instUid = -1;
      }
    }, {
      key: "Pause",
      value: function Pause() {
        if (this._isPaused || this._isStopped || this.HasEnded()) return;
        this._resumePosition = this.GetPlaybackTime();
        if (this._isLooping) this._resumePosition %= this.GetDuration();
        this._isPaused = true;

        this._bufferSource["stop"](0);
      }
    }, {
      key: "Resume",
      value: function Resume() {
        if (!this._isPaused || this._isStopped || this.HasEnded()) return;

        this._ReleaseBufferSource();

        this._bufferSource = this.GetAudioContext()["createBufferSource"]();
        this._bufferSource["buffer"] = this._buffer.GetAudioBuffer();

        this._bufferSource["connect"](this._gainNode);

        this._activeSource = this._bufferSource;
        this._bufferSource["onended"] = this._onended_handler;
        this._bufferSource["loop"] = this._isLooping;

        this._UpdateVolume();

        this._UpdatePlaybackRate();

        this._bufferSource["start"](0, this._resumePosition);

        this._playStartTime = this.GetCurrentTime();
        this._playFromSeekPos = this._resumePosition;
        this._isPaused = false;
      }
    }, {
      key: "GetOutputVolume",
      value: function GetOutputVolume() {
        return _get(_getPrototypeOf(C3WebAudioInstance.prototype), "GetOutputVolume", this).call(this) * this._muteVol;
      }
    }, {
      key: "_UpdateMuted",
      value: function _UpdateMuted() {
        this._muteVol = this._isMuted || this.IsSilent() ? 0 : 1;

        this._UpdateVolume();
      }
    }, {
      key: "SetLooping",
      value: function SetLooping(l) {
        l = !!l;
        if (this._isLooping === l) return;
        this._isLooping = l;
        if (this._bufferSource) this._bufferSource["loop"] = l;
      }
    }, {
      key: "_UpdatePlaybackRate",
      value: function _UpdatePlaybackRate() {
        var r = this._playbackRate;
        if (this._isTimescaled) r *= this._audioDomHandler.GetTimeScale();
        if (this._bufferSource) this._bufferSource["playbackRate"]["value"] = r;
      }
    }, {
      key: "Seek",
      value: function Seek(pos) {
        if (this._isStopped || this.HasEnded()) return;
        if (this._isPaused) this._resumePosition = pos;else {
          this.Pause();
          this._resumePosition = pos;
          this.Resume();
        }
      }
    }, {
      key: "GetResumePosition",
      value: function GetResumePosition() {
        return this._resumePosition;
      }
    }, {
      key: "SetSuspended",
      value: function SetSuspended(s) {
        if (s) {
          if (this.IsPlaying()) {
            this._resumeMe = true;
            this._resumePosition = this.GetPlaybackTime();
            if (this._isLooping) this._resumePosition %= this.GetDuration();

            this._bufferSource["stop"](0);
          } else this._resumeMe = false;
        } else if (this._resumeMe) {
          this._ReleaseBufferSource();

          this._bufferSource = this.GetAudioContext()["createBufferSource"]();
          this._bufferSource["buffer"] = this._buffer.GetAudioBuffer();

          this._bufferSource["connect"](this._gainNode);

          this._activeSource = this._bufferSource;
          this._bufferSource["onended"] = this._onended_handler;
          this._bufferSource["loop"] = this._isLooping;

          this._UpdateVolume();

          this._UpdatePlaybackRate();

          this._bufferSource["start"](0, this._resumePosition);

          this._playStartTime = this.GetCurrentTime();
          this._playFromSeekPos = this._resumePosition;
          this._resumeMe = false;
        }
      }
    }, {
      key: "_LoadAdditionalState",
      value: function _LoadAdditionalState(d) {
        _get(_getPrototypeOf(C3WebAudioInstance.prototype), "_LoadAdditionalState", this).call(this, d);

        this._resumePosition = d["resumePosition"];
      }
    }]);

    return C3WebAudioInstance;
  }(self.C3AudioInstance);
}
;
'use strict';

{
  var AudioFXBase =
  /*#__PURE__*/
  function () {
    function AudioFXBase(audioDomHandler) {
      _classCallCheck(this, AudioFXBase);

      this._audioDomHandler = audioDomHandler;
      this._audioContext = audioDomHandler.GetAudioContext();
      this._index = -1;
      this._tag = "";
      this._type = "";
      this._params = null;
    }

    _createClass(AudioFXBase, [{
      key: "Release",
      value: function Release() {
        this._audioContext = null;
      }
    }, {
      key: "_SetIndex",
      value: function _SetIndex(i) {
        this._index = i;
      }
    }, {
      key: "GetIndex",
      value: function GetIndex() {
        return this._index;
      }
    }, {
      key: "_SetTag",
      value: function _SetTag(t) {
        this._tag = t;
      }
    }, {
      key: "GetTag",
      value: function GetTag() {
        return this._tag;
      }
    }, {
      key: "CreateGain",
      value: function CreateGain() {
        return this._audioContext["createGain"]();
      }
    }, {
      key: "GetInputNode",
      value: function GetInputNode() {}
    }, {
      key: "ConnectTo",
      value: function ConnectTo(node) {}
    }, {
      key: "SetAudioParam",
      value: function SetAudioParam(ap, value, ramp, time) {
        ap["cancelScheduledValues"](0);

        if (time === 0) {
          ap["value"] = value;
          return;
        }

        var curTime = this._audioContext["currentTime"];
        time += curTime;

        switch (ramp) {
          case 0:
            ap["setValueAtTime"](value, time);
            break;

          case 1:
            ap["setValueAtTime"](ap["value"], curTime);
            ap["linearRampToValueAtTime"](value, time);
            break;

          case 2:
            ap["setValueAtTime"](ap["value"], curTime);
            ap["exponentialRampToValueAtTime"](value, time);
            break;
        }
      }
    }, {
      key: "GetState",
      value: function GetState() {
        return {
          "type": this._type,
          "tag": this._tag,
          "params": this._params
        };
      }
    }]);

    return AudioFXBase;
  }();

  self.C3AudioFilterFX =
  /*#__PURE__*/
  function (_AudioFXBase) {
    _inherits(C3AudioFilterFX, _AudioFXBase);

    function C3AudioFilterFX(audioDomHandler, type, freq, detune, q, gain, mix) {
      var _this36;

      _classCallCheck(this, C3AudioFilterFX);

      _this36 = _possibleConstructorReturn(this, _getPrototypeOf(C3AudioFilterFX).call(this, audioDomHandler));
      _this36._type = "filter";
      _this36._params = [type, freq, detune, q, gain, mix];
      _this36._inputNode = _this36.CreateGain();
      _this36._wetNode = _this36.CreateGain();
      _this36._wetNode["gain"]["value"] = mix;
      _this36._dryNode = _this36.CreateGain();
      _this36._dryNode["gain"]["value"] = 1 - mix;
      _this36._filterNode = _this36._audioContext["createBiquadFilter"]();
      _this36._filterNode["type"] = type;
      _this36._filterNode["frequency"]["value"] = freq;
      _this36._filterNode["detune"]["value"] = detune;
      _this36._filterNode["Q"]["value"] = q;
      _this36._filterNode["gain"]["vlaue"] = gain;

      _this36._inputNode["connect"](_this36._filterNode);

      _this36._inputNode["connect"](_this36._dryNode);

      _this36._filterNode["connect"](_this36._wetNode);

      return _this36;
    }

    _createClass(C3AudioFilterFX, [{
      key: "Release",
      value: function Release() {
        this._inputNode["disconnect"]();

        this._filterNode["disconnect"]();

        this._wetNode["disconnect"]();

        this._dryNode["disconnect"]();

        _get(_getPrototypeOf(C3AudioFilterFX.prototype), "Release", this).call(this);
      }
    }, {
      key: "ConnectTo",
      value: function ConnectTo(node) {
        this._wetNode["disconnect"]();

        this._wetNode["connect"](node);

        this._dryNode["disconnect"]();

        this._dryNode["connect"](node);
      }
    }, {
      key: "GetInputNode",
      value: function GetInputNode() {
        return this._inputNode;
      }
    }, {
      key: "SetParam",
      value: function SetParam(param, value, ramp, time) {
        switch (param) {
          case 0:
            value = Math.max(Math.min(value / 100, 1), 0);
            this._params[5] = value;
            this.SetAudioParam(this._wetNode["gain"], value, ramp, time);
            this.SetAudioParam(this._dryNode["gain"], 1 - value, ramp, time);
            break;

          case 1:
            this._params[1] = value;
            this.SetAudioParam(this._filterNode["frequency"], value, ramp, time);
            break;

          case 2:
            this._params[2] = value;
            this.SetAudioParam(this._filterNode["detune"], value, ramp, time);
            break;

          case 3:
            this._params[3] = value;
            this.SetAudioParam(this._filterNode["Q"], value, ramp, time);
            break;

          case 4:
            this._params[4] = value;
            this.SetAudioParam(this._filterNode["gain"], value, ramp, time);
            break;
        }
      }
    }]);

    return C3AudioFilterFX;
  }(AudioFXBase);

  self.C3AudioDelayFX =
  /*#__PURE__*/
  function (_AudioFXBase2) {
    _inherits(C3AudioDelayFX, _AudioFXBase2);

    function C3AudioDelayFX(audioDomHandler, delayTime, delayGain, mix) {
      var _this37;

      _classCallCheck(this, C3AudioDelayFX);

      _this37 = _possibleConstructorReturn(this, _getPrototypeOf(C3AudioDelayFX).call(this, audioDomHandler));
      _this37._type = "delay";
      _this37._params = [delayTime, delayGain, mix];
      _this37._inputNode = _this37.CreateGain();
      _this37._wetNode = _this37.CreateGain();
      _this37._wetNode["gain"]["value"] = mix;
      _this37._dryNode = _this37.CreateGain();
      _this37._dryNode["gain"]["value"] = 1 - mix;
      _this37._mainNode = _this37.CreateGain();
      _this37._delayNode = _this37._audioContext["createDelay"](delayTime);
      _this37._delayNode["delayTime"]["value"] = delayTime;
      _this37._delayGainNode = _this37.CreateGain();
      _this37._delayGainNode["gain"]["value"] = delayGain;

      _this37._inputNode["connect"](_this37._mainNode);

      _this37._inputNode["connect"](_this37._dryNode);

      _this37._mainNode["connect"](_this37._wetNode);

      _this37._mainNode["connect"](_this37._delayNode);

      _this37._delayNode["connect"](_this37._delayGainNode);

      _this37._delayGainNode["connect"](_this37._mainNode);

      return _this37;
    }

    _createClass(C3AudioDelayFX, [{
      key: "Release",
      value: function Release() {
        this._inputNode["disconnect"]();

        this._wetNode["disconnect"]();

        this._dryNode["disconnect"]();

        this._mainNode["disconnect"]();

        this._delayNode["disconnect"]();

        this._delayGainNode["disconnect"]();

        _get(_getPrototypeOf(C3AudioDelayFX.prototype), "Release", this).call(this);
      }
    }, {
      key: "ConnectTo",
      value: function ConnectTo(node) {
        this._wetNode["disconnect"]();

        this._wetNode["connect"](node);

        this._dryNode["disconnect"]();

        this._dryNode["connect"](node);
      }
    }, {
      key: "GetInputNode",
      value: function GetInputNode() {
        return this._inputNode;
      }
    }, {
      key: "SetParam",
      value: function SetParam(param, value, ramp, time) {
        var DbToLinear = self.AudioDOMHandler.DbToLinear;

        switch (param) {
          case 0:
            value = Math.max(Math.min(value / 100, 1), 0);
            this._params[2] = value;
            this.SetAudioParam(this._wetNode["gain"], value, ramp, time);
            this.SetAudioParam(this._dryNode["gain"], 1 - value, ramp, time);
            break;

          case 4:
            this._params[1] = DbToLinear(value);
            this.SetAudioParam(this._delayGainNode["gain"], DbToLinear(value), ramp, time);
            break;

          case 5:
            this._params[0] = value;
            this.SetAudioParam(this._delayNode["delayTime"], value, ramp, time);
            break;
        }
      }
    }]);

    return C3AudioDelayFX;
  }(AudioFXBase);

  self.C3AudioConvolveFX =
  /*#__PURE__*/
  function (_AudioFXBase3) {
    _inherits(C3AudioConvolveFX, _AudioFXBase3);

    function C3AudioConvolveFX(audioDomHandler, buffer, normalize, mix) {
      var _this38;

      _classCallCheck(this, C3AudioConvolveFX);

      _this38 = _possibleConstructorReturn(this, _getPrototypeOf(C3AudioConvolveFX).call(this, audioDomHandler));
      _this38._type = "convolution";
      _this38._params = [normalize, mix];
      _this38._bufferOriginalUrl = "";
      _this38._bufferUrl = "";
      _this38._bufferType = "";
      _this38._inputNode = _this38.CreateGain();
      _this38._wetNode = _this38.CreateGain();
      _this38._wetNode["gain"]["value"] = mix;
      _this38._dryNode = _this38.CreateGain();
      _this38._dryNode["gain"]["value"] = 1 - mix;
      _this38._convolveNode = _this38._audioContext["createConvolver"]();
      _this38._convolveNode["normalize"] = normalize;
      _this38._convolveNode["buffer"] = buffer;

      _this38._inputNode["connect"](_this38._convolveNode);

      _this38._inputNode["connect"](_this38._dryNode);

      _this38._convolveNode["connect"](_this38._wetNode);

      return _this38;
    }

    _createClass(C3AudioConvolveFX, [{
      key: "Release",
      value: function Release() {
        this._inputNode["disconnect"]();

        this._convolveNode["disconnect"]();

        this._wetNode["disconnect"]();

        this._dryNode["disconnect"]();

        _get(_getPrototypeOf(C3AudioConvolveFX.prototype), "Release", this).call(this);
      }
    }, {
      key: "ConnectTo",
      value: function ConnectTo(node) {
        this._wetNode["disconnect"]();

        this._wetNode["connect"](node);

        this._dryNode["disconnect"]();

        this._dryNode["connect"](node);
      }
    }, {
      key: "GetInputNode",
      value: function GetInputNode() {
        return this._inputNode;
      }
    }, {
      key: "SetParam",
      value: function SetParam(param, value, ramp, time) {
        switch (param) {
          case 0:
            value = Math.max(Math.min(value / 100, 1), 0);
            this._params[1] = value;
            this.SetAudioParam(this._wetNode["gain"], value, ramp, time);
            this.SetAudioParam(this._dryNode["gain"], 1 - value, ramp, time);
            break;
        }
      }
    }, {
      key: "_SetBufferInfo",
      value: function _SetBufferInfo(bufferOriginalUrl, bufferUrl, bufferType) {
        this._bufferOriginalUrl = bufferOriginalUrl;
        this._bufferUrl = bufferUrl;
        this._bufferType = bufferType;
      }
    }, {
      key: "GetState",
      value: function GetState() {
        var ret = _get(_getPrototypeOf(C3AudioConvolveFX.prototype), "GetState", this).call(this);

        ret["bufferOriginalUrl"] = this._bufferOriginalUrl;
        ret["bufferUrl"] = "";
        ret["bufferType"] = this._bufferType;
        return ret;
      }
    }]);

    return C3AudioConvolveFX;
  }(AudioFXBase);

  self.C3AudioFlangerFX =
  /*#__PURE__*/
  function (_AudioFXBase4) {
    _inherits(C3AudioFlangerFX, _AudioFXBase4);

    function C3AudioFlangerFX(audioDomHandler, delay, modulation, freq, feedback, mix) {
      var _this39;

      _classCallCheck(this, C3AudioFlangerFX);

      _this39 = _possibleConstructorReturn(this, _getPrototypeOf(C3AudioFlangerFX).call(this, audioDomHandler));
      _this39._type = "flanger";
      _this39._params = [delay, modulation, freq, feedback, mix];
      _this39._inputNode = _this39.CreateGain();
      _this39._dryNode = _this39.CreateGain();
      _this39._dryNode["gain"]["value"] = 1 - mix / 2;
      _this39._wetNode = _this39.CreateGain();
      _this39._wetNode["gain"]["value"] = mix / 2;
      _this39._feedbackNode = _this39.CreateGain();
      _this39._feedbackNode["gain"]["value"] = feedback;
      _this39._delayNode = _this39._audioContext["createDelay"](delay + modulation);
      _this39._delayNode["delayTime"]["value"] = delay;
      _this39._oscNode = _this39._audioContext["createOscillator"]();
      _this39._oscNode["frequency"]["value"] = freq;
      _this39._oscGainNode = _this39.CreateGain();
      _this39._oscGainNode["gain"]["value"] = modulation;

      _this39._inputNode["connect"](_this39._delayNode);

      _this39._inputNode["connect"](_this39._dryNode);

      _this39._delayNode["connect"](_this39._wetNode);

      _this39._delayNode["connect"](_this39._feedbackNode);

      _this39._feedbackNode["connect"](_this39._delayNode);

      _this39._oscNode["connect"](_this39._oscGainNode);

      _this39._oscGainNode["connect"](_this39._delayNode["delayTime"]);

      _this39._oscNode["start"](0);

      return _this39;
    }

    _createClass(C3AudioFlangerFX, [{
      key: "Release",
      value: function Release() {
        this._oscNode["stop"](0);

        this._inputNode["disconnect"]();

        this._delayNode["disconnect"]();

        this._oscNode["disconnect"]();

        this._oscGainNode["disconnect"]();

        this._dryNode["disconnect"]();

        this._wetNode["disconnect"]();

        this._feedbackNode["disconnect"]();

        _get(_getPrototypeOf(C3AudioFlangerFX.prototype), "Release", this).call(this);
      }
    }, {
      key: "ConnectTo",
      value: function ConnectTo(node) {
        this._wetNode["disconnect"]();

        this._wetNode["connect"](node);

        this._dryNode["disconnect"]();

        this._dryNode["connect"](node);
      }
    }, {
      key: "GetInputNode",
      value: function GetInputNode() {
        return this._inputNode;
      }
    }, {
      key: "SetParam",
      value: function SetParam(param, value, ramp, time) {
        switch (param) {
          case 0:
            value = Math.max(Math.min(value / 100, 1), 0);
            this._params[4] = value;
            this.SetAudioParam(this._wetNode["gain"], value / 2, ramp, time);
            this.SetAudioParam(this._dryNode["gain"], 1 - value / 2, ramp, time);
            break;

          case 6:
            this._params[1] = value / 1E3;
            this.SetAudioParam(this._oscGainNode["gain"], value / 1E3, ramp, time);
            break;

          case 7:
            this._params[2] = value;
            this.SetAudioParam(this._oscNode["frequency"], value, ramp, time);
            break;

          case 8:
            this._params[3] = value / 100;
            this.SetAudioParam(this._feedbackNode["gain"], value / 100, ramp, time);
            break;
        }
      }
    }]);

    return C3AudioFlangerFX;
  }(AudioFXBase);

  self.C3AudioPhaserFX =
  /*#__PURE__*/
  function (_AudioFXBase5) {
    _inherits(C3AudioPhaserFX, _AudioFXBase5);

    function C3AudioPhaserFX(audioDomHandler, freq, detune, q, modulation, modfreq, mix) {
      var _this40;

      _classCallCheck(this, C3AudioPhaserFX);

      _this40 = _possibleConstructorReturn(this, _getPrototypeOf(C3AudioPhaserFX).call(this, audioDomHandler));
      _this40._type = "phaser";
      _this40._params = [freq, detune, q, modulation, modfreq, mix];
      _this40._inputNode = _this40.CreateGain();
      _this40._dryNode = _this40.CreateGain();
      _this40._dryNode["gain"]["value"] = 1 - mix / 2;
      _this40._wetNode = _this40.CreateGain();
      _this40._wetNode["gain"]["value"] = mix / 2;
      _this40._filterNode = _this40._audioContext["createBiquadFilter"]();
      _this40._filterNode["type"] = "allpass";
      _this40._filterNode["frequency"]["value"] = freq;
      _this40._filterNode["detune"]["value"] = detune;
      _this40._filterNode["Q"]["value"] = q;
      _this40._oscNode = _this40._audioContext["createOscillator"]();
      _this40._oscNode["frequency"]["value"] = modfreq;
      _this40._oscGainNode = _this40.CreateGain();
      _this40._oscGainNode["gain"]["value"] = modulation;

      _this40._inputNode["connect"](_this40._filterNode);

      _this40._inputNode["connect"](_this40._dryNode);

      _this40._filterNode["connect"](_this40._wetNode);

      _this40._oscNode["connect"](_this40._oscGainNode);

      _this40._oscGainNode["connect"](_this40._filterNode["frequency"]);

      _this40._oscNode["start"](0);

      return _this40;
    }

    _createClass(C3AudioPhaserFX, [{
      key: "Release",
      value: function Release() {
        this._oscNode["stop"](0);

        this._inputNode["disconnect"]();

        this._filterNode["disconnect"]();

        this._oscNode["disconnect"]();

        this._oscGainNode["disconnect"]();

        this._dryNode["disconnect"]();

        this._wetNode["disconnect"]();

        _get(_getPrototypeOf(C3AudioPhaserFX.prototype), "Release", this).call(this);
      }
    }, {
      key: "ConnectTo",
      value: function ConnectTo(node) {
        this._wetNode["disconnect"]();

        this._wetNode["connect"](node);

        this._dryNode["disconnect"]();

        this._dryNode["connect"](node);
      }
    }, {
      key: "GetInputNode",
      value: function GetInputNode() {
        return this._inputNode;
      }
    }, {
      key: "SetParam",
      value: function SetParam(param, value, ramp, time) {
        switch (param) {
          case 0:
            value = Math.max(Math.min(value / 100, 1), 0);
            this._params[5] = value;
            this.SetAudioParam(this._wetNode["gain"], value / 2, ramp, time);
            this.SetAudioParam(this._dryNode["gain"], 1 - value / 2, ramp, time);
            break;

          case 1:
            this._params[0] = value;
            this.SetAudioParam(this._filterNode["frequency"], value, ramp, time);
            break;

          case 2:
            this._params[1] = value;
            this.SetAudioParam(this._filterNode["detune"], value, ramp, time);
            break;

          case 3:
            this._params[2] = value;
            this.SetAudioParam(this._filterNode["Q"], value, ramp, time);
            break;

          case 6:
            this._params[3] = value;
            this.SetAudioParam(this._oscGainNode["gain"], value, ramp, time);
            break;

          case 7:
            this._params[4] = value;
            this.SetAudioParam(this._oscNode["frequency"], value, ramp, time);
            break;
        }
      }
    }]);

    return C3AudioPhaserFX;
  }(AudioFXBase);

  self.C3AudioGainFX =
  /*#__PURE__*/
  function (_AudioFXBase6) {
    _inherits(C3AudioGainFX, _AudioFXBase6);

    function C3AudioGainFX(audioDomHandler, g) {
      var _this41;

      _classCallCheck(this, C3AudioGainFX);

      _this41 = _possibleConstructorReturn(this, _getPrototypeOf(C3AudioGainFX).call(this, audioDomHandler));
      _this41._type = "gain";
      _this41._params = [g];
      _this41._node = _this41.CreateGain();
      _this41._node["gain"]["value"] = g;
      return _this41;
    }

    _createClass(C3AudioGainFX, [{
      key: "Release",
      value: function Release() {
        this._node["disconnect"]();

        _get(_getPrototypeOf(C3AudioGainFX.prototype), "Release", this).call(this);
      }
    }, {
      key: "ConnectTo",
      value: function ConnectTo(node) {
        this._node["disconnect"]();

        this._node["connect"](node);
      }
    }, {
      key: "GetInputNode",
      value: function GetInputNode() {
        return this._node;
      }
    }, {
      key: "SetParam",
      value: function SetParam(param, value, ramp, time) {
        var DbToLinear = self.AudioDOMHandler.DbToLinear;

        switch (param) {
          case 4:
            this._params[0] = DbToLinear(value);
            this.SetAudioParam(this._node["gain"], DbToLinear(value), ramp, time);
            break;
        }
      }
    }]);

    return C3AudioGainFX;
  }(AudioFXBase);

  self.C3AudioStereoPanFX =
  /*#__PURE__*/
  function (_AudioFXBase7) {
    _inherits(C3AudioStereoPanFX, _AudioFXBase7);

    function C3AudioStereoPanFX(audioDomHandler, p) {
      var _this42;

      _classCallCheck(this, C3AudioStereoPanFX);

      _this42 = _possibleConstructorReturn(this, _getPrototypeOf(C3AudioStereoPanFX).call(this, audioDomHandler));
      _this42._type = "stereopan";
      _this42._params = [p];
      _this42._node = _this42._audioContext["createStereoPanner"]();
      _this42._node["pan"]["value"] = p;
      return _this42;
    }

    _createClass(C3AudioStereoPanFX, [{
      key: "Release",
      value: function Release() {
        this._node["disconnect"]();

        _get(_getPrototypeOf(C3AudioStereoPanFX.prototype), "Release", this).call(this);
      }
    }, {
      key: "ConnectTo",
      value: function ConnectTo(node) {
        this._node["disconnect"]();

        this._node["connect"](node);
      }
    }, {
      key: "GetInputNode",
      value: function GetInputNode() {
        return this._node;
      }
    }, {
      key: "SetParam",
      value: function SetParam(param, value, ramp, time) {
        value = Math.min(Math.max(value / 100, -1), 1);

        switch (param) {
          case 9:
            this._params[0] = value;
            this.SetAudioParam(this._node["pan"], value, ramp, time);
            break;
        }
      }
    }]);

    return C3AudioStereoPanFX;
  }(AudioFXBase);

  self.C3AudioTremoloFX =
  /*#__PURE__*/
  function (_AudioFXBase8) {
    _inherits(C3AudioTremoloFX, _AudioFXBase8);

    function C3AudioTremoloFX(audioDomHandler, freq, mix) {
      var _this43;

      _classCallCheck(this, C3AudioTremoloFX);

      _this43 = _possibleConstructorReturn(this, _getPrototypeOf(C3AudioTremoloFX).call(this, audioDomHandler));
      _this43._type = "tremolo";
      _this43._params = [freq, mix];
      _this43._node = _this43.CreateGain();
      _this43._node["gain"]["value"] = 1 - mix / 2;
      _this43._oscNode = _this43._audioContext["createOscillator"]();
      _this43._oscNode["frequency"]["value"] = freq;
      _this43._oscGainNode = _this43.CreateGain();
      _this43._oscGainNode["gain"]["value"] = mix / 2;

      _this43._oscNode["connect"](_this43._oscGainNode);

      _this43._oscGainNode["connect"](_this43._node["gain"]);

      _this43._oscNode["start"](0);

      return _this43;
    }

    _createClass(C3AudioTremoloFX, [{
      key: "Release",
      value: function Release() {
        this._oscNode["stop"](0);

        this._oscNode["disconnect"]();

        this._oscGainNode["disconnect"]();

        this._node["disconnect"]();

        _get(_getPrototypeOf(C3AudioTremoloFX.prototype), "Release", this).call(this);
      }
    }, {
      key: "ConnectTo",
      value: function ConnectTo(node) {
        this._node["disconnect"]();

        this._node["connect"](node);
      }
    }, {
      key: "GetInputNode",
      value: function GetInputNode() {
        return this._node;
      }
    }, {
      key: "SetParam",
      value: function SetParam(param, value, ramp, time) {
        switch (param) {
          case 0:
            value = Math.max(Math.min(value / 100, 1), 0);
            this._params[1] = value;
            this.SetAudioParam(this._node["gain"], 1 - value / 2, ramp, time);
            this.SetAudioParam(this._oscGainNode["gain"], value / 2, ramp, time);
            break;

          case 7:
            this._params[0] = value;
            this.SetAudioParam(this._oscNode["frequency"], value, ramp, time);
            break;
        }
      }
    }]);

    return C3AudioTremoloFX;
  }(AudioFXBase);

  self.C3AudioRingModFX =
  /*#__PURE__*/
  function (_AudioFXBase9) {
    _inherits(C3AudioRingModFX, _AudioFXBase9);

    function C3AudioRingModFX(audioDomHandler, freq, mix) {
      var _this44;

      _classCallCheck(this, C3AudioRingModFX);

      _this44 = _possibleConstructorReturn(this, _getPrototypeOf(C3AudioRingModFX).call(this, audioDomHandler));
      _this44._type = "ringmod";
      _this44._params = [freq, mix];
      _this44._inputNode = _this44.CreateGain();
      _this44._wetNode = _this44.CreateGain();
      _this44._wetNode["gain"]["value"] = mix;
      _this44._dryNode = _this44.CreateGain();
      _this44._dryNode["gain"]["value"] = 1 - mix;
      _this44._ringNode = _this44.CreateGain();
      _this44._ringNode["gain"]["value"] = 0;
      _this44._oscNode = _this44._audioContext["createOscillator"]();
      _this44._oscNode["frequency"]["value"] = freq;

      _this44._oscNode["connect"](_this44._ringNode["gain"]);

      _this44._oscNode["start"](0);

      _this44._inputNode["connect"](_this44._ringNode);

      _this44._inputNode["connect"](_this44._dryNode);

      _this44._ringNode["connect"](_this44._wetNode);

      return _this44;
    }

    _createClass(C3AudioRingModFX, [{
      key: "Release",
      value: function Release() {
        this._oscNode["stop"](0);

        this._oscNode["disconnect"]();

        this._ringNode["disconnect"]();

        this._inputNode["disconnect"]();

        this._wetNode["disconnect"]();

        this._dryNode["disconnect"]();

        _get(_getPrototypeOf(C3AudioRingModFX.prototype), "Release", this).call(this);
      }
    }, {
      key: "ConnectTo",
      value: function ConnectTo(node) {
        this._wetNode["disconnect"]();

        this._wetNode["connect"](node);

        this._dryNode["disconnect"]();

        this._dryNode["connect"](node);
      }
    }, {
      key: "GetInputNode",
      value: function GetInputNode() {
        return this._inputNode;
      }
    }, {
      key: "SetParam",
      value: function SetParam(param, value, ramp, time) {
        switch (param) {
          case 0:
            value = Math.max(Math.min(value / 100, 1), 0);
            this._params[1] = value;
            this.SetAudioParam(this._wetNode["gain"], value, ramp, time);
            this.SetAudioParam(this._dryNode["gain"], 1 - value, ramp, time);
            break;

          case 7:
            this._params[0] = value;
            this.SetAudioParam(this._oscNode["frequency"], value, ramp, time);
            break;
        }
      }
    }]);

    return C3AudioRingModFX;
  }(AudioFXBase);

  self.C3AudioDistortionFX =
  /*#__PURE__*/
  function (_AudioFXBase10) {
    _inherits(C3AudioDistortionFX, _AudioFXBase10);

    function C3AudioDistortionFX(audioDomHandler, threshold, headroom, drive, makeupgain, mix) {
      var _this45;

      _classCallCheck(this, C3AudioDistortionFX);

      _this45 = _possibleConstructorReturn(this, _getPrototypeOf(C3AudioDistortionFX).call(this, audioDomHandler));
      _this45._type = "distortion";
      _this45._params = [threshold, headroom, drive, makeupgain, mix];
      _this45._inputNode = _this45.CreateGain();
      _this45._preGain = _this45.CreateGain();
      _this45._postGain = _this45.CreateGain();

      _this45._SetDrive(drive, makeupgain);

      _this45._wetNode = _this45.CreateGain();
      _this45._wetNode["gain"]["value"] = mix;
      _this45._dryNode = _this45.CreateGain();
      _this45._dryNode["gain"]["value"] = 1 - mix;
      _this45._waveShaper = _this45._audioContext["createWaveShaper"]();
      _this45._curve = new Float32Array(65536);

      _this45._GenerateColortouchCurve(threshold, headroom);

      _this45._waveShaper.curve = _this45._curve;

      _this45._inputNode["connect"](_this45._preGain);

      _this45._inputNode["connect"](_this45._dryNode);

      _this45._preGain["connect"](_this45._waveShaper);

      _this45._waveShaper["connect"](_this45._postGain);

      _this45._postGain["connect"](_this45._wetNode);

      return _this45;
    }

    _createClass(C3AudioDistortionFX, [{
      key: "Release",
      value: function Release() {
        this._inputNode["disconnect"]();

        this._preGain["disconnect"]();

        this._waveShaper["disconnect"]();

        this._postGain["disconnect"]();

        this._wetNode["disconnect"]();

        this._dryNode["disconnect"]();

        _get(_getPrototypeOf(C3AudioDistortionFX.prototype), "Release", this).call(this);
      }
    }, {
      key: "_SetDrive",
      value: function _SetDrive(drive, makeupgain) {
        if (drive < .01) drive = .01;
        this._preGain["gain"]["value"] = drive;
        this._postGain["gain"]["value"] = Math.pow(1 / drive, .6) * makeupgain;
      }
    }, {
      key: "_GenerateColortouchCurve",
      value: function _GenerateColortouchCurve(threshold, headroom) {
        var n = 65536;
        var n2 = n / 2;

        for (var i = 0; i < n2; ++i) {
          var x = i / n2;
          x = this._Shape(x, threshold, headroom);
          this._curve[n2 + i] = x;
          this._curve[n2 - i - 1] = -x;
        }
      }
    }, {
      key: "_Shape",
      value: function _Shape(x, threshold, headroom) {
        var maximum = 1.05 * headroom * threshold;
        var kk = maximum - threshold;
        var sign = x < 0 ? -1 : +1;
        var absx = x < 0 ? -x : x;
        var shapedInput = absx < threshold ? absx : threshold + kk * self.AudioDOMHandler.e4(absx - threshold, 1 / kk);
        shapedInput *= sign;
        return shapedInput;
      }
    }, {
      key: "ConnectTo",
      value: function ConnectTo(node) {
        this._wetNode["disconnect"]();

        this._wetNode["connect"](node);

        this._dryNode["disconnect"]();

        this._dryNode["connect"](node);
      }
    }, {
      key: "GetInputNode",
      value: function GetInputNode() {
        return this._inputNode;
      }
    }, {
      key: "SetParam",
      value: function SetParam(param, value, ramp, time) {
        switch (param) {
          case 0:
            value = Math.max(Math.min(value / 100, 1), 0);
            this._params[4] = value;
            this.SetAudioParam(this._wetNode["gain"], value, ramp, time);
            this.SetAudioParam(this._dryNode["gain"], 1 - value, ramp, time);
            break;
        }
      }
    }]);

    return C3AudioDistortionFX;
  }(AudioFXBase);

  self.C3AudioCompressorFX =
  /*#__PURE__*/
  function (_AudioFXBase11) {
    _inherits(C3AudioCompressorFX, _AudioFXBase11);

    function C3AudioCompressorFX(audioDomHandler, threshold, knee, ratio, attack, release) {
      var _this46;

      _classCallCheck(this, C3AudioCompressorFX);

      _this46 = _possibleConstructorReturn(this, _getPrototypeOf(C3AudioCompressorFX).call(this, audioDomHandler));
      _this46._type = "compressor";
      _this46._params = [threshold, knee, ratio, attack, release];
      _this46._node = _this46._audioContext["createDynamicsCompressor"]();
      _this46._node["threshold"]["value"] = threshold;
      _this46._node["knee"]["value"] = knee;
      _this46._node["ratio"]["value"] = ratio;
      _this46._node["attack"]["value"] = attack;
      _this46._node["release"]["value"] = release;
      return _this46;
    }

    _createClass(C3AudioCompressorFX, [{
      key: "Release",
      value: function Release() {
        this._node["disconnect"]();

        _get(_getPrototypeOf(C3AudioCompressorFX.prototype), "Release", this).call(this);
      }
    }, {
      key: "ConnectTo",
      value: function ConnectTo(node) {
        this._node["disconnect"]();

        this._node["connect"](node);
      }
    }, {
      key: "GetInputNode",
      value: function GetInputNode() {
        return this._node;
      }
    }, {
      key: "SetParam",
      value: function SetParam(param, value, ramp, time) {}
    }]);

    return C3AudioCompressorFX;
  }(AudioFXBase);

  self.C3AudioAnalyserFX =
  /*#__PURE__*/
  function (_AudioFXBase12) {
    _inherits(C3AudioAnalyserFX, _AudioFXBase12);

    function C3AudioAnalyserFX(audioDomHandler, fftSize, smoothing) {
      var _this47;

      _classCallCheck(this, C3AudioAnalyserFX);

      _this47 = _possibleConstructorReturn(this, _getPrototypeOf(C3AudioAnalyserFX).call(this, audioDomHandler));
      _this47._type = "analyser";
      _this47._params = [fftSize, smoothing];
      _this47._node = _this47._audioContext["createAnalyser"]();
      _this47._node["fftSize"] = fftSize;
      _this47._node["smoothingTimeConstant"] = smoothing;
      _this47._freqBins = new Float32Array(_this47._node["frequencyBinCount"]);
      _this47._signal = new Uint8Array(fftSize);
      _this47._peak = 0;
      _this47._rms = 0;

      _this47._audioDomHandler._AddAnalyser(_assertThisInitialized(_this47));

      return _this47;
    }

    _createClass(C3AudioAnalyserFX, [{
      key: "Release",
      value: function Release() {
        this._audioDomHandler._RemoveAnalyser(this);

        this._node["disconnect"]();

        _get(_getPrototypeOf(C3AudioAnalyserFX.prototype), "Release", this).call(this);
      }
    }, {
      key: "Tick",
      value: function Tick() {
        this._node["getFloatFrequencyData"](this._freqBins);

        this._node["getByteTimeDomainData"](this._signal);

        var fftSize = this._node["fftSize"];
        this._peak = 0;
        var rmsSquaredSum = 0;

        for (var i = 0; i < fftSize; ++i) {
          var s = (this._signal[i] - 128) / 128;
          if (s < 0) s = -s;
          if (this._peak < s) this._peak = s;
          rmsSquaredSum += s * s;
        }

        var LinearToDb = self.AudioDOMHandler.LinearToDb;
        this._peak = LinearToDb(this._peak);
        this._rms = LinearToDb(Math.sqrt(rmsSquaredSum / fftSize));
      }
    }, {
      key: "ConnectTo",
      value: function ConnectTo(node) {
        this._node["disconnect"]();

        this._node["connect"](node);
      }
    }, {
      key: "GetInputNode",
      value: function GetInputNode() {
        return this._node;
      }
    }, {
      key: "SetParam",
      value: function SetParam(param, value, ramp, time) {}
    }, {
      key: "GetData",
      value: function GetData() {
        return {
          "tag": this.GetTag(),
          "index": this.GetIndex(),
          "peak": this._peak,
          "rms": this._rms,
          "binCount": this._node["frequencyBinCount"],
          "freqBins": this._freqBins
        };
      }
    }]);

    return C3AudioAnalyserFX;
  }(AudioFXBase);
}
;
'use strict';

{
  var _DOM_COMPONENT_ID2 = "user-media";

  var _HANDLER_CLASS =
  /*#__PURE__*/
  function (_self$DOMElementHandl) {
    _inherits(UserMediaDOMHandler, _self$DOMElementHandl);

    function UserMediaDOMHandler(iRuntime) {
      var _this48;

      _classCallCheck(this, UserMediaDOMHandler);

      _this48 = _possibleConstructorReturn(this, _getPrototypeOf(UserMediaDOMHandler).call(this, iRuntime, _DOM_COMPONENT_ID2));

      _this48.SetAutoAttach(false);

      _this48._isRuntimeInWorker = _this48._iRuntime.UsesWorker();
      _this48._sequenceNumber = 0;
      _this48._lastActiveStream = null;

      _this48.AddRuntimeMessageHandler("get-media-sources", function () {
        return _this48._OnGetMediaSources();
      });

      _this48.AddDOMElementMessageHandler("request-camera", function (elem, e) {
        return _this48._OnRequestCamera(elem, e);
      });

      _this48.AddDOMElementMessageHandler("request-microphone", function (elem, e) {
        return _this48._OnRequestMicrophone(elem, e);
      });

      _this48.AddDOMElementMessageHandler("snapshot", function (elem, e) {
        return _this48._Snapshot(elem, e);
      });

      _this48.AddDOMElementMessageHandler("stop", function (elem) {
        return _this48._Stop(elem);
      });

      self["C3UserMedia_GetVideoElement"] = function (elementId) {
        return _this48.GetElementById(elementId);
      };

      self["C3UserMedia_GetLastMediaStream"] = function () {
        return _this48._lastActiveStream;
      };

      return _this48;
    }

    _createClass(UserMediaDOMHandler, [{
      key: "CreateElement",
      value: function CreateElement(elementId, e) {
        var _this49 = this;

        var elem = document.createElement("video");
        elem.crossOrigin = "anonymous";
        elem.autoplay = true;
        elem.muted = true;
        elem["playsInline"] = true;
        elem.addEventListener("canplaythrough", function () {
          _this49.PostToRuntimeElement("video-ready", elementId, {
            "width": elem.videoWidth,
            "height": elem.videoHeight
          });
        });
        return elem;
      }
    }, {
      key: "UpdateState",
      value: function UpdateState(elem, e) {}
    }, {
      key: "DestroyElement",
      value: function DestroyElement(videoElem) {
        this._Stop(videoElem);
      }
    }, {
      key: "_StopStream",
      value: function _StopStream(stream) {
        if (this._lastActiveStream === stream) this._lastActiveStream = null;
        var tracks = stream["getTracks"]();

        for (var i = 0, len = tracks.length; i < len; ++i) {
          tracks[i]["stop"]();
        }
      }
    }, {
      key: "_OnGetMediaSources",
      value: function _OnGetMediaSources() {
        var videoSources, audioSources, mediaSources, _iteratorNormalCompletion48, _didIteratorError48, _iteratorError48, _iterator48, _step48, mediaSource, kind, data;

        return regeneratorRuntime.async(function _OnGetMediaSources$(_context48) {
          while (1) {
            switch (_context48.prev = _context48.next) {
              case 0:
                videoSources = [];
                audioSources = [];

                if (!(navigator["mediaDevices"] && navigator["mediaDevices"]["enumerateDevices"])) {
                  _context48.next = 25;
                  break;
                }

                _context48.next = 5;
                return regeneratorRuntime.awrap(navigator["mediaDevices"]["enumerateDevices"]());

              case 5:
                mediaSources = _context48.sent;
                _iteratorNormalCompletion48 = true;
                _didIteratorError48 = false;
                _iteratorError48 = undefined;
                _context48.prev = 9;

                for (_iterator48 = mediaSources[Symbol.iterator](); !(_iteratorNormalCompletion48 = (_step48 = _iterator48.next()).done); _iteratorNormalCompletion48 = true) {
                  mediaSource = _step48.value;
                  kind = mediaSource["kind"];
                  data = {
                    "deviceId": mediaSource["deviceId"],
                    "label": mediaSource["label"],
                    "facing": mediaSource["facing"] || mediaSource["facingMode"] || ""
                  };
                  if (kind === "video" || kind === "videoinput") videoSources.push(data);else if (kind === "audio" || kind === "audioinput") audioSources.push(data);
                }

                _context48.next = 17;
                break;

              case 13:
                _context48.prev = 13;
                _context48.t0 = _context48["catch"](9);
                _didIteratorError48 = true;
                _iteratorError48 = _context48.t0;

              case 17:
                _context48.prev = 17;
                _context48.prev = 18;

                if (!_iteratorNormalCompletion48 && _iterator48["return"] != null) {
                  _iterator48["return"]();
                }

              case 20:
                _context48.prev = 20;

                if (!_didIteratorError48) {
                  _context48.next = 23;
                  break;
                }

                throw _iteratorError48;

              case 23:
                return _context48.finish(20);

              case 24:
                return _context48.finish(17);

              case 25:
                return _context48.abrupt("return", {
                  "videoSources": videoSources,
                  "audioSources": audioSources
                });

              case 26:
              case "end":
                return _context48.stop();
            }
          }
        }, null, null, [[9, 13, 17, 25], [18,, 20, 24]]);
      }
    }, {
      key: "_OnRequestCamera",
      value: function _OnRequestCamera(videoElem, e) {
        var requiresAudio, rt;
        return regeneratorRuntime.async(function _OnRequestCamera$(_context49) {
          while (1) {
            switch (_context49.prev = _context49.next) {
              case 0:
                _context49.prev = 0;
                requiresAudio = _typeof(e["constraints"]["audio"]) === "object";
                rt = this.GetRuntimeInterface();

                if (!requiresAudio) {
                  _context49.next = 8;
                  break;
                }

                _context49.next = 6;
                return regeneratorRuntime.awrap(rt.RequirePermissions("CAMERA", "RECORD_AUDIO", "MODIFY_AUDIO_SETTINGS"));

              case 6:
                _context49.next = 10;
                break;

              case 8:
                _context49.next = 10;
                return regeneratorRuntime.awrap(rt.RequirePermissions("CAMERA"));

              case 10:
                _context49.next = 12;
                return regeneratorRuntime.awrap(navigator["mediaDevices"]["getUserMedia"](e["constraints"]));

              case 12:
                this._lastActiveStream = _context49.sent;
                videoElem.srcObject = this._lastActiveStream;
                videoElem.play();

                this._StartTicking();

                return _context49.abrupt("return", {
                  "ok": true
                });

              case 19:
                _context49.prev = 19;
                _context49.t0 = _context49["catch"](0);
                console.warn("Error requesting camera: ", _context49.t0);
                return _context49.abrupt("return", {
                  "ok": false
                });

              case 23:
              case "end":
                return _context49.stop();
            }
          }
        }, null, this, [[0, 19]]);
      }
    }, {
      key: "_OnRequestMicrophone",
      value: function _OnRequestMicrophone(videoElem, e) {
        var rt;
        return regeneratorRuntime.async(function _OnRequestMicrophone$(_context50) {
          while (1) {
            switch (_context50.prev = _context50.next) {
              case 0:
                _context50.prev = 0;
                rt = this.GetRuntimeInterface();
                _context50.next = 4;
                return regeneratorRuntime.awrap(rt.RequirePermissions("RECORD_AUDIO", "MODIFY_AUDIO_SETTINGS"));

              case 4:
                _context50.next = 6;
                return regeneratorRuntime.awrap(navigator["mediaDevices"]["getUserMedia"](e["constraints"]));

              case 6:
                this._lastActiveStream = _context50.sent;
                videoElem["c3_mic_stream"] = this._lastActiveStream;
                if (self["C3Audio_OnMicrophoneStream"]) self["C3Audio_OnMicrophoneStream"](this._lastActiveStream, e["tag"]);
                return _context50.abrupt("return", {
                  "ok": true
                });

              case 12:
                _context50.prev = 12;
                _context50.t0 = _context50["catch"](0);
                console.warn("Error requesting microphone: ", _context50.t0);
                return _context50.abrupt("return", {
                  "ok": false
                });

              case 16:
              case "end":
                return _context50.stop();
            }
          }
        }, null, this, [[0, 12]]);
      }
    }, {
      key: "_CanvasToURL",
      value: function _CanvasToURL(canvas, format, quality) {
        return new Promise(function (resolve, reject) {
          if (canvas.toBlob) canvas.toBlob(function (blob) {
            return resolve(URL.createObjectURL(blob));
          }, format, quality);else resolve(canvas.toDataURL(format, quality));
        });
      }
    }, {
      key: "_Snapshot",
      value: function _Snapshot(videoElem, e) {
        var tempCanvas, tempCtx, url;
        return regeneratorRuntime.async(function _Snapshot$(_context51) {
          while (1) {
            switch (_context51.prev = _context51.next) {
              case 0:
                tempCanvas = document.createElement("canvas");
                tempCanvas.width = videoElem.videoWidth;
                tempCanvas.height = videoElem.videoHeight;
                tempCtx = tempCanvas.getContext("2d");
                tempCtx.drawImage(videoElem, 0, 0, videoElem.videoWidth, videoElem.videoHeight);
                _context51.next = 7;
                return regeneratorRuntime.awrap(this._CanvasToURL(tempCanvas, e["format"], e["quality"]));

              case 7:
                url = _context51.sent;
                return _context51.abrupt("return", {
                  "snapshotUrl": url
                });

              case 9:
              case "end":
                return _context51.stop();
            }
          }
        }, null, this);
      }
    }, {
      key: "_Stop",
      value: function _Stop(videoElem) {
        if (videoElem.srcObject) {
          this._StopStream(videoElem.srcObject);

          videoElem.srcObject = null;
        }

        if (videoElem["c3_mic_stream"]) {
          this._StopStream(videoElem["c3_mic_stream"]);

          videoElem["c3_mic_stream"] = null;
        }
      }
    }, {
      key: "Tick",
      value: function Tick() {
        var _this50 = this;

        var videoData = {};
        var stateData = {
          "sequenceNumber": this._sequenceNumber++,
          "videoData": videoData
        };
        var transferables = [];
        var promises = [];
        var _iteratorNormalCompletion49 = true;
        var _didIteratorError49 = false;
        var _iteratorError49 = undefined;

        try {
          var _loop2 = function _loop2() {
            var _step49$value = _slicedToArray(_step49.value, 2),
                id = _step49$value[0],
                elemState = _step49$value[1];

            var elem = elemState.GetElement();
            if (!elem.srcObject) return "continue";
            var o = {
              "width": elem.videoWidth,
              "height": elem.videoHeight
            };
            if (_this50._isRuntimeInWorker) promises.push(createImageBitmap(elem).then(function (imageBitmap) {
              o["imageBitmap"] = imageBitmap;
              transferables.push(imageBitmap);
            })["catch"](function (err) {
              o["imageBitmap"] = null;
            }));
            videoData[id.toString()] = o;
          };

          for (var _iterator49 = this._elementMap.entries()[Symbol.iterator](), _step49; !(_iteratorNormalCompletion49 = (_step49 = _iterator49.next()).done); _iteratorNormalCompletion49 = true) {
            var _ret = _loop2();

            if (_ret === "continue") continue;
          }
        } catch (err) {
          _didIteratorError49 = true;
          _iteratorError49 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion49 && _iterator49["return"] != null) {
              _iterator49["return"]();
            }
          } finally {
            if (_didIteratorError49) {
              throw _iteratorError49;
            }
          }
        }

        Promise.all(promises).then(function () {
          return _this50.PostToRuntime("state", stateData, false, transferables);
        });
      }
    }]);

    return UserMediaDOMHandler;
  }(self.DOMElementHandler);

  self.RuntimeInterface.AddDOMHandlerClass(_HANDLER_CLASS);
}
;
'use strict';

{
  var _DOM_COMPONENT_ID3 = "touch";

  var _HANDLER_CLASS2 =
  /*#__PURE__*/
  function (_self$DOMHandler4) {
    _inherits(TouchDOMHandler, _self$DOMHandler4);

    function TouchDOMHandler(iRuntime) {
      var _this51;

      _classCallCheck(this, TouchDOMHandler);

      _this51 = _possibleConstructorReturn(this, _getPrototypeOf(TouchDOMHandler).call(this, iRuntime, _DOM_COMPONENT_ID3));

      _this51.AddRuntimeMessageHandler("request-permission", function (e) {
        return _this51._OnRequestPermission(e);
      });

      return _this51;
    }

    _createClass(TouchDOMHandler, [{
      key: "_OnRequestPermission",
      value: function _OnRequestPermission(e) {
        var type, result;
        return regeneratorRuntime.async(function _OnRequestPermission$(_context52) {
          while (1) {
            switch (_context52.prev = _context52.next) {
              case 0:
                type = e["type"];
                result = true;

                if (!(type === 0)) {
                  _context52.next = 8;
                  break;
                }

                _context52.next = 5;
                return regeneratorRuntime.awrap(this._RequestOrientationPermission());

              case 5:
                result = _context52.sent;
                _context52.next = 12;
                break;

              case 8:
                if (!(type === 1)) {
                  _context52.next = 12;
                  break;
                }

                _context52.next = 11;
                return regeneratorRuntime.awrap(this._RequestMotionPermission());

              case 11:
                result = _context52.sent;

              case 12:
                this.PostToRuntime("permission-result", {
                  "type": type,
                  "result": result
                });

              case 13:
              case "end":
                return _context52.stop();
            }
          }
        }, null, this);
      }
    }, {
      key: "_RequestOrientationPermission",
      value: function _RequestOrientationPermission() {
        var state;
        return regeneratorRuntime.async(function _RequestOrientationPermission$(_context53) {
          while (1) {
            switch (_context53.prev = _context53.next) {
              case 0:
                if (!(!self["DeviceOrientationEvent"] || !self["DeviceOrientationEvent"]["requestPermission"])) {
                  _context53.next = 2;
                  break;
                }

                return _context53.abrupt("return", true);

              case 2:
                _context53.prev = 2;
                _context53.next = 5;
                return regeneratorRuntime.awrap(self["DeviceOrientationEvent"]["requestPermission"]());

              case 5:
                state = _context53.sent;
                return _context53.abrupt("return", state === "granted");

              case 9:
                _context53.prev = 9;
                _context53.t0 = _context53["catch"](2);
                console.warn("[Touch] Failed to request orientation permission: ", _context53.t0);
                return _context53.abrupt("return", false);

              case 13:
              case "end":
                return _context53.stop();
            }
          }
        }, null, null, [[2, 9]]);
      }
    }, {
      key: "_RequestMotionPermission",
      value: function _RequestMotionPermission() {
        var state;
        return regeneratorRuntime.async(function _RequestMotionPermission$(_context54) {
          while (1) {
            switch (_context54.prev = _context54.next) {
              case 0:
                if (!(!self["DeviceMotionEvent"] || !self["DeviceMotionEvent"]["requestPermission"])) {
                  _context54.next = 2;
                  break;
                }

                return _context54.abrupt("return", true);

              case 2:
                _context54.prev = 2;
                _context54.next = 5;
                return regeneratorRuntime.awrap(self["DeviceMotionEvent"]["requestPermission"]());

              case 5:
                state = _context54.sent;
                return _context54.abrupt("return", state === "granted");

              case 9:
                _context54.prev = 9;
                _context54.t0 = _context54["catch"](2);
                console.warn("[Touch] Failed to request motion permission: ", _context54.t0);
                return _context54.abrupt("return", false);

              case 13:
              case "end":
                return _context54.stop();
            }
          }
        }, null, null, [[2, 9]]);
      }
    }]);

    return TouchDOMHandler;
  }(self.DOMHandler);

  self.RuntimeInterface.AddDOMHandlerClass(_HANDLER_CLASS2);
}
;
'use strict';

{
  var _DOM_COMPONENT_ID4 = "mouse";

  var _HANDLER_CLASS3 =
  /*#__PURE__*/
  function (_self$DOMHandler5) {
    _inherits(MouseDOMHandler, _self$DOMHandler5);

    function MouseDOMHandler(iRuntime) {
      var _this52;

      _classCallCheck(this, MouseDOMHandler);

      _this52 = _possibleConstructorReturn(this, _getPrototypeOf(MouseDOMHandler).call(this, iRuntime, _DOM_COMPONENT_ID4));

      _this52.AddRuntimeMessageHandlers([["cursor", function (e) {
        return _this52._OnChangeCursorStyle(e);
      }], ["request-pointer-lock", function () {
        return _this52._OnRequestPointerLock();
      }], ["release-pointer-lock", function () {
        return _this52._OnReleasePointerLock();
      }]]);

      document.addEventListener("pointerlockchange", function (e) {
        return _this52._OnPointerLockChange();
      });
      document.addEventListener("pointerlockerror", function (e) {
        return _this52._OnPointerLockError();
      });
      return _this52;
    }

    _createClass(MouseDOMHandler, [{
      key: "_OnChangeCursorStyle",
      value: function _OnChangeCursorStyle(e) {
        document.documentElement.style.cursor = e;
      }
    }, {
      key: "_OnRequestPointerLock",
      value: function _OnRequestPointerLock() {
        this._iRuntime.GetMainCanvas().requestPointerLock();
      }
    }, {
      key: "_OnReleasePointerLock",
      value: function _OnReleasePointerLock() {
        document.exitPointerLock();
      }
    }, {
      key: "_OnPointerLockChange",
      value: function _OnPointerLockChange() {
        this.PostToRuntime("pointer-lock-change", {
          "has-pointer-lock": !!document.pointerLockElement
        });
      }
    }, {
      key: "_OnPointerLockError",
      value: function _OnPointerLockError() {
        this.PostToRuntime("pointer-lock-error", {
          "has-pointer-lock": !!document.pointerLockElement
        });
      }
    }]);

    return MouseDOMHandler;
  }(self.DOMHandler);

  self.RuntimeInterface.AddDOMHandlerClass(_HANDLER_CLASS3);
}
;