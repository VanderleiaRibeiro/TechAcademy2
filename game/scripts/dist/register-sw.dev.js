'use strict';

{
  window.C3_RegisterSW = function C3_RegisterSW() {
    var reg;
    return regeneratorRuntime.async(function C3_RegisterSW$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (navigator.serviceWorker) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return");

          case 2:
            _context.prev = 2;
            _context.next = 5;
            return regeneratorRuntime.awrap(navigator.serviceWorker.register("sw.js", {
              scope: "./"
            }));

          case 5:
            reg = _context.sent;
            console.info("Registered service worker on " + reg.scope);
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](2);
            console.warn("Failed to register service worker: ", _context.t0);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[2, 9]]);
  };
}
;