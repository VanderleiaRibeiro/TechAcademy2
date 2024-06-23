'use strict';

var OFFLINE_DATA_FILE = "offline.json";
var CACHE_NAME_PREFIX = "c3offline";
var BROADCASTCHANNEL_NAME = "offline";
var CONSOLE_PREFIX = "[SW] ";
var LAZYLOAD_KEYNAME = "";
var broadcastChannel = typeof BroadcastChannel === "undefined" ? null : new BroadcastChannel(BROADCASTCHANNEL_NAME);

function PostBroadcastMessage(o) {
  if (!broadcastChannel) return;
  setTimeout(function () {
    return broadcastChannel.postMessage(o);
  }, 3E3);
}

function Broadcast(type) {
  PostBroadcastMessage({
    "type": type
  });
}

function BroadcastDownloadingUpdate(version) {
  PostBroadcastMessage({
    "type": "downloading-update",
    "version": version
  });
}

function BroadcastUpdateReady(version) {
  PostBroadcastMessage({
    "type": "update-ready",
    "version": version
  });
}

function IsUrlInLazyLoadList(url, lazyLoadList) {
  if (!lazyLoadList) return false;

  try {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = lazyLoadList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var lazyLoadRegex = _step.value;
        if (new RegExp(lazyLoadRegex).test(url)) return true;
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
  } catch (err) {
    console.error(CONSOLE_PREFIX + "Error matching in lazy-load list: ", err);
  }

  return false;
}

function WriteLazyLoadListToStorage(lazyLoadList) {
  if (typeof localforage === "undefined") return Promise.resolve();else return localforage.setItem(LAZYLOAD_KEYNAME, lazyLoadList);
}

function ReadLazyLoadListFromStorage() {
  if (typeof localforage === "undefined") return Promise.resolve([]);else return localforage.getItem(LAZYLOAD_KEYNAME);
}

function GetCacheBaseName() {
  return CACHE_NAME_PREFIX + "-" + self.registration.scope;
}

function GetCacheVersionName(version) {
  return GetCacheBaseName() + "-v" + version;
}

function GetAvailableCacheNames() {
  var cacheNames, cacheBaseName;
  return regeneratorRuntime.async(function GetAvailableCacheNames$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(caches.keys());

        case 2:
          cacheNames = _context.sent;
          cacheBaseName = GetCacheBaseName();
          return _context.abrupt("return", cacheNames.filter(function (n) {
            return n.startsWith(cacheBaseName);
          }));

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}

function IsUpdatePending() {
  var availableCacheNames;
  return regeneratorRuntime.async(function IsUpdatePending$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(GetAvailableCacheNames());

        case 2:
          availableCacheNames = _context2.sent;
          return _context2.abrupt("return", availableCacheNames.length >= 2);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function GetMainPageUrl() {
  var allClients, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, c, url;

  return regeneratorRuntime.async(function GetMainPageUrl$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(clients.matchAll({
            includeUncontrolled: true,
            type: "window"
          }));

        case 2:
          allClients = _context3.sent;
          _iteratorNormalCompletion2 = true;
          _didIteratorError2 = false;
          _iteratorError2 = undefined;
          _context3.prev = 6;
          _iterator2 = allClients[Symbol.iterator]();

        case 8:
          if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
            _context3.next = 18;
            break;
          }

          c = _step2.value;
          url = c.url;
          if (url.startsWith(self.registration.scope)) url = url.substring(self.registration.scope.length);

          if (!(url && url !== "/")) {
            _context3.next = 15;
            break;
          }

          if (url.startsWith("?")) url = "/" + url;
          return _context3.abrupt("return", url);

        case 15:
          _iteratorNormalCompletion2 = true;
          _context3.next = 8;
          break;

        case 18:
          _context3.next = 24;
          break;

        case 20:
          _context3.prev = 20;
          _context3.t0 = _context3["catch"](6);
          _didIteratorError2 = true;
          _iteratorError2 = _context3.t0;

        case 24:
          _context3.prev = 24;
          _context3.prev = 25;

          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }

        case 27:
          _context3.prev = 27;

          if (!_didIteratorError2) {
            _context3.next = 30;
            break;
          }

          throw _iteratorError2;

        case 30:
          return _context3.finish(27);

        case 31:
          return _context3.finish(24);

        case 32:
          return _context3.abrupt("return", "");

        case 33:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[6, 20, 24, 32], [25,, 27, 31]]);
}

function fetchWithBypass(request, bypassCache) {
  if (typeof request === "string") request = new Request(request);
  if (bypassCache) return fetch(request.url, {
    headers: request.headers,
    mode: request.mode,
    credentials: request.credentials,
    redirect: request.redirect,
    cache: "no-store"
  });else return fetch(request);
}

function CreateCacheFromFileList(cacheName, fileList, bypassCache) {
  var responses, allOk, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, response, cache;

  return regeneratorRuntime.async(function CreateCacheFromFileList$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(Promise.all(fileList.map(function (url) {
            return fetchWithBypass(url, bypassCache);
          })));

        case 2:
          responses = _context4.sent;
          allOk = true;
          _iteratorNormalCompletion3 = true;
          _didIteratorError3 = false;
          _iteratorError3 = undefined;
          _context4.prev = 7;

          for (_iterator3 = responses[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            response = _step3.value;

            if (!response.ok) {
              allOk = false;
              console.error(CONSOLE_PREFIX + "Error fetching '" + response.url + "' (" + response.status + " " + response.statusText + ")");
            }
          }

          _context4.next = 15;
          break;

        case 11:
          _context4.prev = 11;
          _context4.t0 = _context4["catch"](7);
          _didIteratorError3 = true;
          _iteratorError3 = _context4.t0;

        case 15:
          _context4.prev = 15;
          _context4.prev = 16;

          if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
            _iterator3["return"]();
          }

        case 18:
          _context4.prev = 18;

          if (!_didIteratorError3) {
            _context4.next = 21;
            break;
          }

          throw _iteratorError3;

        case 21:
          return _context4.finish(18);

        case 22:
          return _context4.finish(15);

        case 23:
          if (allOk) {
            _context4.next = 25;
            break;
          }

          throw new Error("not all resources were fetched successfully");

        case 25:
          _context4.next = 27;
          return regeneratorRuntime.awrap(caches.open(cacheName));

        case 27:
          cache = _context4.sent;
          _context4.prev = 28;
          _context4.next = 31;
          return regeneratorRuntime.awrap(Promise.all(responses.map(function (response, i) {
            return cache.put(fileList[i], response);
          })));

        case 31:
          return _context4.abrupt("return", _context4.sent);

        case 34:
          _context4.prev = 34;
          _context4.t1 = _context4["catch"](28);
          console.error(CONSOLE_PREFIX + "Error writing cache entries: ", _context4.t1);
          caches["delete"](cacheName);
          throw _context4.t1;

        case 39:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[7, 11, 15, 23], [16,, 18, 22], [28, 34]]);
}

function UpdateCheck(isFirst) {
  var response, data, version, fileList, lazyLoadList, currentCacheName, cacheExists, _isUpdatePending, mainPageUrl, isUpdatePending;

  return regeneratorRuntime.async(function UpdateCheck$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(fetchWithBypass(OFFLINE_DATA_FILE, true));

        case 3:
          response = _context5.sent;

          if (response.ok) {
            _context5.next = 6;
            break;
          }

          throw new Error(OFFLINE_DATA_FILE + " responded with " + response.status + " " + response.statusText);

        case 6:
          _context5.next = 8;
          return regeneratorRuntime.awrap(response.json());

        case 8:
          data = _context5.sent;
          version = data.version;
          fileList = data.fileList;
          lazyLoadList = data.lazyLoad;
          currentCacheName = GetCacheVersionName(version);
          _context5.next = 15;
          return regeneratorRuntime.awrap(caches.has(currentCacheName));

        case 15:
          cacheExists = _context5.sent;

          if (!cacheExists) {
            _context5.next = 22;
            break;
          }

          _context5.next = 19;
          return regeneratorRuntime.awrap(IsUpdatePending());

        case 19:
          _isUpdatePending = _context5.sent;

          if (_isUpdatePending) {
            console.log(CONSOLE_PREFIX + "Update pending");
            Broadcast("update-pending");
          } else {
            console.log(CONSOLE_PREFIX + "Up to date");
            Broadcast("up-to-date");
          }

          return _context5.abrupt("return");

        case 22:
          _context5.next = 24;
          return regeneratorRuntime.awrap(GetMainPageUrl());

        case 24:
          mainPageUrl = _context5.sent;
          fileList.unshift("./");
          if (mainPageUrl && fileList.indexOf(mainPageUrl) === -1) fileList.unshift(mainPageUrl);
          console.log(CONSOLE_PREFIX + "Caching " + fileList.length + " files for offline use");
          if (isFirst) Broadcast("downloading");else BroadcastDownloadingUpdate(version);

          if (!lazyLoadList) {
            _context5.next = 32;
            break;
          }

          _context5.next = 32;
          return regeneratorRuntime.awrap(WriteLazyLoadListToStorage(lazyLoadList));

        case 32:
          _context5.next = 34;
          return regeneratorRuntime.awrap(CreateCacheFromFileList(currentCacheName, fileList, !isFirst));

        case 34:
          _context5.next = 36;
          return regeneratorRuntime.awrap(IsUpdatePending());

        case 36:
          isUpdatePending = _context5.sent;

          if (isUpdatePending) {
            console.log(CONSOLE_PREFIX + "All resources saved, update ready");
            BroadcastUpdateReady(version);
          } else {
            console.log(CONSOLE_PREFIX + "All resources saved, offline support ready");
            Broadcast("offline-ready");
          }

          _context5.next = 43;
          break;

        case 40:
          _context5.prev = 40;
          _context5.t0 = _context5["catch"](0);
          console.warn(CONSOLE_PREFIX + "Update check failed: ", _context5.t0);

        case 43:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 40]]);
}

self.addEventListener("install", function (event) {
  event.waitUntil(UpdateCheck(true)["catch"](function () {
    return null;
  }));
});

function GetCacheNameToUse(availableCacheNames, doUpdateCheck) {
  var allClients, latestCacheName;
  return regeneratorRuntime.async(function GetCacheNameToUse$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          if (!(availableCacheNames.length === 1 || !doUpdateCheck)) {
            _context6.next = 2;
            break;
          }

          return _context6.abrupt("return", availableCacheNames[0]);

        case 2:
          _context6.next = 4;
          return regeneratorRuntime.awrap(clients.matchAll());

        case 4:
          allClients = _context6.sent;

          if (!(allClients.length > 1)) {
            _context6.next = 7;
            break;
          }

          return _context6.abrupt("return", availableCacheNames[0]);

        case 7:
          latestCacheName = availableCacheNames[availableCacheNames.length - 1];
          console.log(CONSOLE_PREFIX + "Updating to new version");
          _context6.next = 11;
          return regeneratorRuntime.awrap(Promise.all(availableCacheNames.slice(0, -1).map(function (c) {
            return caches["delete"](c);
          })));

        case 11:
          return _context6.abrupt("return", latestCacheName);

        case 12:
        case "end":
          return _context6.stop();
      }
    }
  });
}

function HandleFetch(event, doUpdateCheck) {
  var availableCacheNames, useCacheName, cache, cachedResponse, result, fetchResponse, lazyLoadList;
  return regeneratorRuntime.async(function HandleFetch$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(GetAvailableCacheNames());

        case 2:
          availableCacheNames = _context7.sent;

          if (availableCacheNames.length) {
            _context7.next = 5;
            break;
          }

          return _context7.abrupt("return", fetch(event.request));

        case 5:
          _context7.next = 7;
          return regeneratorRuntime.awrap(GetCacheNameToUse(availableCacheNames, doUpdateCheck));

        case 7:
          useCacheName = _context7.sent;
          _context7.next = 10;
          return regeneratorRuntime.awrap(caches.open(useCacheName));

        case 10:
          cache = _context7.sent;
          _context7.next = 13;
          return regeneratorRuntime.awrap(cache.match(event.request));

        case 13:
          cachedResponse = _context7.sent;

          if (!cachedResponse) {
            _context7.next = 16;
            break;
          }

          return _context7.abrupt("return", cachedResponse);

        case 16:
          _context7.next = 18;
          return regeneratorRuntime.awrap(Promise.all([fetch(event.request), ReadLazyLoadListFromStorage()]));

        case 18:
          result = _context7.sent;
          fetchResponse = result[0];
          lazyLoadList = result[1];

          if (!IsUrlInLazyLoadList(event.request.url, lazyLoadList)) {
            _context7.next = 30;
            break;
          }

          _context7.prev = 22;
          _context7.next = 25;
          return regeneratorRuntime.awrap(cache.put(event.request, fetchResponse.clone()));

        case 25:
          _context7.next = 30;
          break;

        case 27:
          _context7.prev = 27;
          _context7.t0 = _context7["catch"](22);
          console.warn(CONSOLE_PREFIX + "Error caching '" + event.request.url + "': ", _context7.t0);

        case 30:
          return _context7.abrupt("return", fetchResponse);

        case 31:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[22, 27]]);
}

self.addEventListener("fetch", function (event) {
  if (new URL(event.request.url).origin !== location.origin) return;
  var doUpdateCheck = event.request.mode === "navigate";
  var responsePromise = HandleFetch(event, doUpdateCheck);
  if (doUpdateCheck) event.waitUntil(responsePromise.then(function () {
    return UpdateCheck(false);
  }));
  event.respondWith(responsePromise);
});