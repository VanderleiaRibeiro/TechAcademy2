'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

{
  var OfflineClient =
  /*#__PURE__*/
  function () {
    function OfflineClient() {
      var _this = this;

      _classCallCheck(this, OfflineClient);

      this._broadcastChannel = typeof BroadcastChannel === "undefined" ? null : new BroadcastChannel("offline");
      this._queuedMessages = [];
      this._onMessageCallback = null;
      if (this._broadcastChannel) this._broadcastChannel.onmessage = function (e) {
        return _this._OnBroadcastChannelMessage(e);
      };
    }

    _createClass(OfflineClient, [{
      key: "_OnBroadcastChannelMessage",
      value: function _OnBroadcastChannelMessage(e) {
        if (this._onMessageCallback) {
          this._onMessageCallback(e);

          return;
        }

        this._queuedMessages.push(e);
      }
    }, {
      key: "SetMessageCallback",
      value: function SetMessageCallback(f) {
        this._onMessageCallback = f;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this._queuedMessages[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var e = _step.value;

            this._onMessageCallback(e);
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

        this._queuedMessages.length = 0;
      }
    }]);

    return OfflineClient;
  }();

  window.OfflineClientInfo = new OfflineClient();
}
;