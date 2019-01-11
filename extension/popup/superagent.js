!(function(t) {
  if ("object" == typeof exports && "undefined" != typeof module) module.exports = t();
  else if ("function" == typeof define && define.amd) define([], t);
  else {
    ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).superagent = t();
  }
})(function() {
  return (function n(s, a, u) {
    function h(e, t) {
      if (!a[e]) {
        if (!s[e]) {
          var r = "function" == typeof require && require;
          if (!t && r) return r(e, !0);
          if (p) return p(e, !0);
          var o = new Error("Cannot find module '" + e + "'");
          throw ((o.code = "MODULE_NOT_FOUND"), o);
        }
        var i = (a[e] = { exports: {} });
        s[e][0].call(
          i.exports,
          function(t) {
            return h(s[e][1][t] || t);
          },
          i,
          i.exports,
          n,
          s,
          a,
          u
        );
      }
      return a[e].exports;
    }
    for (var p = "function" == typeof require && require, t = 0; t < u.length; t++) h(u[t]);
    return h;
  })(
    {
      1: [
        function(t, e, r) {
          "use strict";
          function i() {
            this._defaults = [];
          }
          ["use", "on", "once", "set", "query", "type", "accept", "auth", "withCredentials", "sortQuery", "retry", "ok", "redirects", "timeout", "buffer", "serialize", "parse", "ca", "key", "pfx", "cert"].forEach(function(o) {
            i.prototype[o] = function() {
              for (var t = arguments.length, e = Array(t), r = 0; r < t; r++) e[r] = arguments[r];
              return this._defaults.push({ fn: o, args: e }), this;
            };
          }),
            (i.prototype._setDefaults = function(e) {
              this._defaults.forEach(function(t) {
                e[t.fn].apply(e, t.args);
              });
            }),
            (e.exports = i);
        },
        {}
      ],
      2: [
        function(t, e, r) {
          "use strict";
          var o =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function(t) {
                  return typeof t;
                }
              : function(t) {
                  return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
                };
          e.exports = function(t) {
            return null !== t && "object" === (void 0 === t ? "undefined" : o(t));
          };
        },
        {}
      ],
      3: [
        function(t, e, r) {
          "use strict";
          var o =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function(t) {
                    return typeof t;
                  }
                : function(t) {
                    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
                  },
            i = t("./is-object");
          function n(t) {
            if (t)
              return (function(t) {
                for (var e in n.prototype) t[e] = n.prototype[e];
                return t;
              })(t);
          }
          ((e.exports = n).prototype.clearTimeout = function() {
            return clearTimeout(this._timer), clearTimeout(this._responseTimeoutTimer), delete this._timer, delete this._responseTimeoutTimer, this;
          }),
            (n.prototype.parse = function(t) {
              return (this._parser = t), this;
            }),
            (n.prototype.responseType = function(t) {
              return (this._responseType = t), this;
            }),
            (n.prototype.serialize = function(t) {
              return (this._serializer = t), this;
            }),
            (n.prototype.timeout = function(t) {
              if (!t || "object" !== (void 0 === t ? "undefined" : o(t))) return (this._timeout = t), (this._responseTimeout = 0), this;
              for (var e in t)
                switch (e) {
                  case "deadline":
                    this._timeout = t.deadline;
                    break;
                  case "response":
                    this._responseTimeout = t.response;
                    break;
                  default:
                    console.warn("Unknown timeout option", e);
                }
              return this;
            }),
            (n.prototype.retry = function(t, e) {
              return (0 !== arguments.length && !0 !== t) || (t = 1), t <= 0 && (t = 0), (this._maxRetries = t), (this._retries = 0), (this._retryCallback = e), this;
            });
          var s = ["ECONNRESET", "ETIMEDOUT", "EADDRINFO", "ESOCKETTIMEDOUT"];
          (n.prototype._shouldRetry = function(t, e) {
            if (!this._maxRetries || this._retries++ >= this._maxRetries) return !1;
            if (this._retryCallback)
              try {
                var r = this._retryCallback(t, e);
                if (!0 === r) return !0;
                if (!1 === r) return !1;
              } catch (t) {
                console.error(t);
              }
            if (e && e.status && 500 <= e.status && 501 != e.status) return !0;
            if (t) {
              if (t.code && ~s.indexOf(t.code)) return !0;
              if (t.timeout && "ECONNABORTED" == t.code) return !0;
              if (t.crossDomain) return !0;
            }
            return !1;
          }),
            (n.prototype._retry = function() {
              return this.clearTimeout(), this.req && ((this.req = null), (this.req = this.request())), (this._aborted = !1), (this.timedout = !1), this._end();
            }),
            (n.prototype.then = function(t, e) {
              if (!this._fullfilledPromise) {
                var i = this;
                this._endCalled && console.warn("Warning: superagent request was sent twice, because both .end() and .then() were called. Never call .end() if you use promises"),
                  (this._fullfilledPromise = new Promise(function(r, o) {
                    i.on("error", o),
                      i.end(function(t, e) {
                        t ? o(t) : r(e);
                      });
                  }));
              }
              return this._fullfilledPromise.then(t, e);
            }),
            (n.prototype.catch = function(t) {
              return this.then(void 0, t);
            }),
            (n.prototype.use = function(t) {
              return t(this), this;
            }),
            (n.prototype.ok = function(t) {
              if ("function" != typeof t) throw Error("Callback required");
              return (this._okCallback = t), this;
            }),
            (n.prototype._isResponseOK = function(t) {
              return !!t && (this._okCallback ? this._okCallback(t) : 200 <= t.status && t.status < 300);
            }),
            (n.prototype.getHeader = n.prototype.get = function(t) {
              return this._header[t.toLowerCase()];
            }),
            (n.prototype.set = function(t, e) {
              if (i(t)) {
                for (var r in t) this.set(r, t[r]);
                return this;
              }
              return (this._header[t.toLowerCase()] = e), (this.header[t] = e), this;
            }),
            (n.prototype.unset = function(t) {
              return delete this._header[t.toLowerCase()], delete this.header[t], this;
            }),
            (n.prototype.field = function(t, e) {
              if (null == t) throw new Error(".field(name, val) name can not be empty");
              if (this._data) throw new Error(".field() can't be used if .send() is used. Please use only .send() or only .field() & .attach()");
              if (i(t)) {
                for (var r in t) this.field(r, t[r]);
                return this;
              }
              if (Array.isArray(e)) {
                for (var o in e) this.field(t, e[o]);
                return this;
              }
              if (null == e) throw new Error(".field(name, val) val can not be empty");
              return "boolean" == typeof e && (e = "" + e), this._getFormData().append(t, e), this;
            }),
            (n.prototype.abort = function() {
              return this._aborted || ((this._aborted = !0), this.xhr && this.xhr.abort(), this.req && this.req.abort(), this.clearTimeout(), this.emit("abort")), this;
            }),
            (n.prototype._auth = function(t, e, r, o) {
              switch (r.type) {
                case "basic":
                  this.set("Authorization", "Basic " + o(t + ":" + e));
                  break;
                case "auto":
                  (this.username = t), (this.password = e);
                  break;
                case "bearer":
                  this.set("Authorization", "Bearer " + t);
              }
              return this;
            }),
            (n.prototype.withCredentials = function(t) {
              return null == t && (t = !0), (this._withCredentials = t), this;
            }),
            (n.prototype.redirects = function(t) {
              return (this._maxRedirects = t), this;
            }),
            (n.prototype.maxResponseSize = function(t) {
              if ("number" != typeof t) throw TypeError("Invalid argument");
              return (this._maxResponseSize = t), this;
            }),
            (n.prototype.toJSON = function() {
              return { method: this.method, url: this.url, data: this._data, headers: this._header };
            }),
            (n.prototype.send = function(t) {
              var e = i(t),
                r = this._header["content-type"];
              if (this._formData) throw new Error(".send() can't be used if .attach() or .field() is used. Please use only .send() or only .field() & .attach()");
              if (e && !this._data) Array.isArray(t) ? (this._data = []) : this._isHost(t) || (this._data = {});
              else if (t && this._data && this._isHost(this._data)) throw Error("Can't merge these send calls");
              if (e && i(this._data)) for (var o in t) this._data[o] = t[o];
              else this._data = "string" == typeof t ? (r || this.type("form"), "application/x-www-form-urlencoded" == (r = this._header["content-type"]) ? (this._data ? this._data + "&" + t : t) : (this._data || "") + t) : t;
              return !e || this._isHost(t) || r || this.type("json"), this;
            }),
            (n.prototype.sortQuery = function(t) {
              return (this._sort = void 0 === t || t), this;
            }),
            (n.prototype._finalizeQueryString = function() {
              var t = this._query.join("&");
              if ((t && (this.url += (0 <= this.url.indexOf("?") ? "&" : "?") + t), (this._query.length = 0), this._sort)) {
                var e = this.url.indexOf("?");
                if (0 <= e) {
                  var r = this.url.substring(e + 1).split("&");
                  "function" == typeof this._sort ? r.sort(this._sort) : r.sort(), (this.url = this.url.substring(0, e) + "?" + r.join("&"));
                }
              }
            }),
            (n.prototype._appendQueryString = function() {
              console.trace("Unsupported");
            }),
            (n.prototype._timeoutError = function(t, e, r) {
              if (!this._aborted) {
                var o = new Error(t + e + "ms exceeded");
                (o.timeout = e), (o.code = "ECONNABORTED"), (o.errno = r), (this.timedout = !0), this.abort(), this.callback(o);
              }
            }),
            (n.prototype._setTimeouts = function() {
              var t = this;
              this._timeout &&
                !this._timer &&
                (this._timer = setTimeout(function() {
                  t._timeoutError("Timeout of ", t._timeout, "ETIME");
                }, this._timeout)),
                this._responseTimeout &&
                  !this._responseTimeoutTimer &&
                  (this._responseTimeoutTimer = setTimeout(function() {
                    t._timeoutError("Response timeout of ", t._responseTimeout, "ETIMEDOUT");
                  }, this._responseTimeout));
            });
        },
        { "./is-object": 2 }
      ],
      4: [
        function(t, e, r) {
          "use strict";
          var i = t("./utils");
          function o(t) {
            if (t)
              return (function(t) {
                for (var e in o.prototype) t[e] = o.prototype[e];
                return t;
              })(t);
          }
          ((e.exports = o).prototype.get = function(t) {
            return this.header[t.toLowerCase()];
          }),
            (o.prototype._setHeaderProperties = function(t) {
              var e = t["content-type"] || "";
              this.type = i.type(e);
              var r = i.params(e);
              for (var o in r) this[o] = r[o];
              this.links = {};
              try {
                t.link && (this.links = i.parseLinks(t.link));
              } catch (t) {}
            }),
            (o.prototype._setStatusProperties = function(t) {
              var e = (t / 100) | 0;
              (this.status = this.statusCode = t), (this.statusType = e), (this.info = 1 == e), (this.ok = 2 == e), (this.redirect = 3 == e), (this.clientError = 4 == e), (this.serverError = 5 == e), (this.error = (4 == e || 5 == e) && this.toError()), (this.created = 201 == t), (this.accepted = 202 == t), (this.noContent = 204 == t), (this.badRequest = 400 == t), (this.unauthorized = 401 == t), (this.notAcceptable = 406 == t), (this.forbidden = 403 == t), (this.notFound = 404 == t), (this.unprocessableEntity = 422 == t);
            });
        },
        { "./utils": 5 }
      ],
      5: [
        function(t, e, r) {
          "use strict";
          (r.type = function(t) {
            return t.split(/ *; */).shift();
          }),
            (r.params = function(t) {
              return t.split(/ *; */).reduce(function(t, e) {
                var r = e.split(/ *= */),
                  o = r.shift(),
                  i = r.shift();
                return o && i && (t[o] = i), t;
              }, {});
            }),
            (r.parseLinks = function(t) {
              return t.split(/ *, */).reduce(function(t, e) {
                var r = e.split(/ *; */),
                  o = r[0].slice(1, -1);
                return (t[r[1].split(/ *= */)[1].slice(1, -1)] = o), t;
              }, {});
            }),
            (r.cleanHeader = function(t, e) {
              return delete t["content-type"], delete t["content-length"], delete t["transfer-encoding"], delete t.host, e && (delete t.authorization, delete t.cookie), t;
            });
        },
        {}
      ],
      6: [
        function(t, e, r) {
          function o(t) {
            if (t)
              return (function(t) {
                for (var e in o.prototype) t[e] = o.prototype[e];
                return t;
              })(t);
          }
          void 0 !== e && (e.exports = o),
            (o.prototype.on = o.prototype.addEventListener = function(t, e) {
              return (this._callbacks = this._callbacks || {}), (this._callbacks["$" + t] = this._callbacks["$" + t] || []).push(e), this;
            }),
            (o.prototype.once = function(t, e) {
              function r() {
                this.off(t, r), e.apply(this, arguments);
              }
              return (r.fn = e), this.on(t, r), this;
            }),
            (o.prototype.off = o.prototype.removeListener = o.prototype.removeAllListeners = o.prototype.removeEventListener = function(t, e) {
              if (((this._callbacks = this._callbacks || {}), 0 == arguments.length)) return (this._callbacks = {}), this;
              var r,
                o = this._callbacks["$" + t];
              if (!o) return this;
              if (1 == arguments.length) return delete this._callbacks["$" + t], this;
              for (var i = 0; i < o.length; i++)
                if ((r = o[i]) === e || r.fn === e) {
                  o.splice(i, 1);
                  break;
                }
              return this;
            }),
            (o.prototype.emit = function(t) {
              this._callbacks = this._callbacks || {};
              var e = [].slice.call(arguments, 1),
                r = this._callbacks["$" + t];
              if (r) for (var o = 0, i = (r = r.slice(0)).length; o < i; ++o) r[o].apply(this, e);
              return this;
            }),
            (o.prototype.listeners = function(t) {
              return (this._callbacks = this._callbacks || {}), this._callbacks["$" + t] || [];
            }),
            (o.prototype.hasListeners = function(t) {
              return !!this.listeners(t).length;
            });
        },
        {}
      ],
      7: [
        function(t, e, r) {
          "use strict";
          var o =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function(t) {
                    return typeof t;
                  }
                : function(t) {
                    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
                  },
            i = void 0;
          i = "undefined" != typeof window ? window : "undefined" != typeof self ? self : void console.warn("Using browser-only version of superagent in non-browser environment");
          var n = t("component-emitter"),
            s = t("./request-base"),
            a = t("./is-object"),
            u = t("./response-base"),
            h = t("./agent-base");
          function p() {}
          var c = (r = e.exports = function(t, e) {
            return "function" == typeof e ? new r.Request("GET", t).end(e) : 1 == arguments.length ? new r.Request("GET", t) : new r.Request(t, e);
          });
          (r.Request = b),
            (c.getXHR = function() {
              if (!(!i.XMLHttpRequest || (i.location && "file:" == i.location.protocol && i.ActiveXObject))) return new XMLHttpRequest();
              try {
                return new ActiveXObject("Microsoft.XMLHTTP");
              } catch (t) {}
              try {
                return new ActiveXObject("Msxml2.XMLHTTP.6.0");
              } catch (t) {}
              try {
                return new ActiveXObject("Msxml2.XMLHTTP.3.0");
              } catch (t) {}
              try {
                return new ActiveXObject("Msxml2.XMLHTTP");
              } catch (t) {}
              throw Error("Browser-only version of superagent could not find XHR");
            });
          var l = "".trim
            ? function(t) {
                return t.trim();
              }
            : function(t) {
                return t.replace(/(^\s*|\s*$)/g, "");
              };
          function f(t) {
            if (!a(t)) return t;
            var e = [];
            for (var r in t) d(e, r, t[r]);
            return e.join("&");
          }
          function d(e, r, t) {
            if (null != t)
              if (Array.isArray(t))
                t.forEach(function(t) {
                  d(e, r, t);
                });
              else if (a(t)) for (var o in t) d(e, r + "[" + o + "]", t[o]);
              else e.push(encodeURIComponent(r) + "=" + encodeURIComponent(t));
            else null === t && e.push(encodeURIComponent(r));
          }
          function y(t) {
            for (var e = {}, r = t.split("&"), o = void 0, i = void 0, n = 0, s = r.length; n < s; ++n) -1 == (i = (o = r[n]).indexOf("=")) ? (e[decodeURIComponent(o)] = "") : (e[decodeURIComponent(o.slice(0, i))] = decodeURIComponent(o.slice(i + 1)));
            return e;
          }
          function m(t) {
            return /[\/+]json($|[^-\w])/.test(t);
          }
          function _(t) {
            (this.req = t), (this.xhr = this.req.xhr), (this.text = ("HEAD" != this.req.method && ("" === this.xhr.responseType || "text" === this.xhr.responseType)) || void 0 === this.xhr.responseType ? this.xhr.responseText : null), (this.statusText = this.req.xhr.statusText);
            var e = this.xhr.status;
            1223 === e && (e = 204),
              this._setStatusProperties(e),
              (this.header = this.headers = (function(t) {
                for (var e = t.split(/\r?\n/), r = {}, o = void 0, i = void 0, n = void 0, s = void 0, a = 0, u = e.length; a < u; ++a) -1 !== (o = (i = e[a]).indexOf(":")) && ((n = i.slice(0, o).toLowerCase()), (s = l(i.slice(o + 1))), (r[n] = s));
                return r;
              })(this.xhr.getAllResponseHeaders())),
              (this.header["content-type"] = this.xhr.getResponseHeader("content-type")),
              this._setHeaderProperties(this.header),
              null === this.text && t._responseType ? (this.body = this.xhr.response) : (this.body = "HEAD" != this.req.method ? this._parseBody(this.text ? this.text : this.xhr.response) : null);
          }
          function b(t, e) {
            var o = this;
            (this._query = this._query || []),
              (this.method = t),
              (this.url = e),
              (this.header = {}),
              (this._header = {}),
              this.on("end", function() {
                var e = null,
                  t = null;
                try {
                  t = new _(o);
                } catch (t) {
                  return ((e = new Error("Parser is unable to parse the response")).parse = !0), (e.original = t), o.xhr ? ((e.rawResponse = void 0 === o.xhr.responseType ? o.xhr.responseText : o.xhr.response), (e.status = o.xhr.status ? o.xhr.status : null), (e.statusCode = e.status)) : ((e.rawResponse = null), (e.status = null)), o.callback(e);
                }
                o.emit("response", t);
                var r = void 0;
                try {
                  o._isResponseOK(t) || (r = new Error(t.statusText || "Unsuccessful HTTP response"));
                } catch (t) {
                  r = t;
                }
                r ? ((r.original = e), (r.response = t), (r.status = t.status), o.callback(r, t)) : o.callback(null, t);
              });
          }
          function v(t, e, r) {
            var o = c("DELETE", t);
            return "function" == typeof e && ((r = e), (e = null)), e && o.send(e), r && o.end(r), o;
          }
          (c.serializeObject = f),
            (c.parseString = y),
            (c.types = { html: "text/html", json: "application/json", xml: "text/xml", urlencoded: "application/x-www-form-urlencoded", form: "application/x-www-form-urlencoded", "form-data": "application/x-www-form-urlencoded" }),
            (c.serialize = { "application/x-www-form-urlencoded": f, "application/json": JSON.stringify }),
            (c.parse = { "application/x-www-form-urlencoded": y, "application/json": JSON.parse }),
            u(_.prototype),
            (_.prototype._parseBody = function(t) {
              var e = c.parse[this.type];
              return this.req._parser ? this.req._parser(this, t) : (!e && m(this.type) && (e = c.parse["application/json"]), e && t && (t.length || t instanceof Object) ? e(t) : null);
            }),
            (_.prototype.toError = function() {
              var t = this.req,
                e = t.method,
                r = t.url,
                o = "cannot " + e + " " + r + " (" + this.status + ")",
                i = new Error(o);
              return (i.status = this.status), (i.method = e), (i.url = r), i;
            }),
            (c.Response = _),
            n(b.prototype),
            s(b.prototype),
            (b.prototype.type = function(t) {
              return this.set("Content-Type", c.types[t] || t), this;
            }),
            (b.prototype.accept = function(t) {
              return this.set("Accept", c.types[t] || t), this;
            }),
            (b.prototype.auth = function(t, e, r) {
              1 === arguments.length && (e = ""), "object" === (void 0 === e ? "undefined" : o(e)) && null !== e && ((r = e), (e = "")), r || (r = { type: "function" == typeof btoa ? "basic" : "auto" });
              return this._auth(t, e, r, function(t) {
                if ("function" == typeof btoa) return btoa(t);
                throw new Error("Cannot use basic auth, btoa is not a function");
              });
            }),
            (b.prototype.query = function(t) {
              return "string" != typeof t && (t = f(t)), t && this._query.push(t), this;
            }),
            (b.prototype.attach = function(t, e, r) {
              if (e) {
                if (this._data) throw Error("superagent can't mix .send() and .attach()");
                this._getFormData().append(t, e, r || e.name);
              }
              return this;
            }),
            (b.prototype._getFormData = function() {
              return this._formData || (this._formData = new i.FormData()), this._formData;
            }),
            (b.prototype.callback = function(t, e) {
              if (this._shouldRetry(t, e)) return this._retry();
              var r = this._callback;
              this.clearTimeout(), t && (this._maxRetries && (t.retries = this._retries - 1), this.emit("error", t)), r(t, e);
            }),
            (b.prototype.crossDomainError = function() {
              var t = new Error("Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.");
              (t.crossDomain = !0), (t.status = this.status), (t.method = this.method), (t.url = this.url), this.callback(t);
            }),
            (b.prototype.buffer = b.prototype.ca = b.prototype.agent = function() {
              return console.warn("This is not supported in browser version of superagent"), this;
            }),
            (b.prototype.pipe = b.prototype.write = function() {
              throw Error("Streaming is not supported in browser version of superagent");
            }),
            (b.prototype._isHost = function(t) {
              return t && "object" === (void 0 === t ? "undefined" : o(t)) && !Array.isArray(t) && "[object Object]" !== Object.prototype.toString.call(t);
            }),
            (b.prototype.end = function(t) {
              this._endCalled && console.warn("Warning: .end() was called twice. This is not supported in superagent"), (this._endCalled = !0), (this._callback = t || p), this._finalizeQueryString(), this._end();
            }),
            (b.prototype._end = function() {
              if (this._aborted) return this.callback(Error("The request has been aborted even before .end() was called"));
              var r = this,
                o = (this.xhr = c.getXHR()),
                t = this._formData || this._data;
              this._setTimeouts(),
                (o.onreadystatechange = function() {
                  var t = o.readyState;
                  if ((2 <= t && r._responseTimeoutTimer && clearTimeout(r._responseTimeoutTimer), 4 == t)) {
                    var e = void 0;
                    try {
                      e = o.status;
                    } catch (t) {
                      e = 0;
                    }
                    if (!e) {
                      if (r.timedout || r._aborted) return;
                      return r.crossDomainError();
                    }
                    r.emit("end");
                  }
                });
              var e = function(t, e) {
                0 < e.total && (e.percent = (e.loaded / e.total) * 100), (e.direction = t), r.emit("progress", e);
              };
              if (this.hasListeners("progress"))
                try {
                  (o.onprogress = e.bind(null, "download")), o.upload && (o.upload.onprogress = e.bind(null, "upload"));
                } catch (t) {}
              try {
                this.username && this.password ? o.open(this.method, this.url, !0, this.username, this.password) : o.open(this.method, this.url, !0);
              } catch (t) {
                return this.callback(t);
              }
              if ((this._withCredentials && (o.withCredentials = !0), !this._formData && "GET" != this.method && "HEAD" != this.method && "string" != typeof t && !this._isHost(t))) {
                var i = this._header["content-type"],
                  n = this._serializer || c.serialize[i ? i.split(";")[0] : ""];
                !n && m(i) && (n = c.serialize["application/json"]), n && (t = n(t));
              }
              for (var s in this.header) null != this.header[s] && this.header.hasOwnProperty(s) && o.setRequestHeader(s, this.header[s]);
              this._responseType && (o.responseType = this._responseType), this.emit("request", this), o.send(void 0 !== t ? t : null);
            }),
            (c.agent = function() {
              return new h();
            }),
            ["GET", "POST", "OPTIONS", "PATCH", "PUT", "DELETE"].forEach(function(o) {
              h.prototype[o.toLowerCase()] = function(t, e) {
                var r = new c.Request(o, t);
                return this._setDefaults(r), e && r.end(e), r;
              };
            }),
            (h.prototype.del = h.prototype.delete),
            (c.get = function(t, e, r) {
              var o = c("GET", t);
              return "function" == typeof e && ((r = e), (e = null)), e && o.query(e), r && o.end(r), o;
            }),
            (c.head = function(t, e, r) {
              var o = c("HEAD", t);
              return "function" == typeof e && ((r = e), (e = null)), e && o.query(e), r && o.end(r), o;
            }),
            (c.options = function(t, e, r) {
              var o = c("OPTIONS", t);
              return "function" == typeof e && ((r = e), (e = null)), e && o.send(e), r && o.end(r), o;
            }),
            (c.del = v),
            (c.delete = v),
            (c.patch = function(t, e, r) {
              var o = c("PATCH", t);
              return "function" == typeof e && ((r = e), (e = null)), e && o.send(e), r && o.end(r), o;
            }),
            (c.post = function(t, e, r) {
              var o = c("POST", t);
              return "function" == typeof e && ((r = e), (e = null)), e && o.send(e), r && o.end(r), o;
            }),
            (c.put = function(t, e, r) {
              var o = c("PUT", t);
              return "function" == typeof e && ((r = e), (e = null)), e && o.send(e), r && o.end(r), o;
            });
        },
        { "./agent-base": 1, "./is-object": 2, "./request-base": 3, "./response-base": 4, "component-emitter": 6 }
      ]
    },
    {},
    [7]
  )(7);
});
