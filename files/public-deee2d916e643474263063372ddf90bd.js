function ouibounce(t, e) {
  function n(t, e) {
    return "undefined" == typeof t ? e : t
  }

  function r(t) {
    var e = 24 * t * 60 * 60 * 1e3,
      n = new Date;
    return n.setTime(n.getTime() + e), "; expires=" + n.toGMTString()
  }

  function o() {
    window.addEventListener ? (v.addEventListener("mouseleave", i), v.addEventListener("keydown", a)) : (v.attachEvent("mouseleave", i), v.attachEvent("keydown", a))
  }

  function i(t) {
    t.clientY > h || s("viewedOuibounceModal", "true") && !l || (u(), p())
  }

  function a(t) {
    g || s("viewedOuibounceModal", "true") && !l || t.metaKey && 76 == t.keyCode && (g = !0, u(), p())
  }

  function s(t, e) {
    var n = document.cookie.split("; ").reduce(function(t, e) {
      var n = e.split("=");
      return t[n[0]] = n[1], t
    }, {});
    return n[t] === e
  }

  function u() {
    t && (t.style.display = "block"), c()
  }

  function c(t) {
    var t = t || {};
    "undefined" != typeof t.cookieExpire && (f = r(t.cookieExpire)), t.sitewide === !0 && (y = ";path=/"), "undefined" != typeof t.cookieDomain && (m = ";domain=" + t.cookieDomain), document.cookie = "viewedOuibounceModal=true" + f + m + y, v.removeEventListener("mouseleave", i), v.removeEventListener("keydown", a)
  }
  var e = e || {},
    l = e.aggressive || !1,
    h = n(e.sensitivity, 20),
    d = n(e.timer, 1e3),
    p = e.callback || function() {},
    f = r(e.cookieExpire) || "",
    m = e.cookieDomain ? ";domain=" + e.cookieDomain : "",
    y = e.sitewide === !0 ? ";path=/" : "",
    v = document.getElementsByTagName("html")[0];
  setTimeout(o, d);
  var g = !1;
  return {
    fire: u,
    disable: c
  }
}

function printStackTrace(t) {
  t = t || {
    guess: !0
  };
  var e = t.e || null,
    n = !!t.guess,
    r = new printStackTrace.implementation,
    o = r.run(e);
  return n ? r.guessAnonymousFunctions(o) : o
}
try {
  ! function(t, e) {
    t.rails !== e && t.error("jquery-ujs has already been loaded!");
    var n, r = t(document);
    t.rails = n = {
      linkClickSelector: "a[data-confirm], a[data-method], a[data-remote], a[data-disable-with], a[data-disable]",
      buttonClickSelector: "button[data-remote]:not(form button), button[data-confirm]:not(form button)",
      inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",
      formSubmitSelector: "form",
      formInputClickSelector: "form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])",
      disableSelector: "input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled",
      enableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled",
      requiredInputSelector: "input[name][required]:not([disabled]),textarea[name][required]:not([disabled])",
      fileInputSelector: "input[type=file]",
      linkDisableSelector: "a[data-disable-with], a[data-disable]",
      buttonDisableSelector: "button[data-remote][data-disable-with], button[data-remote][data-disable]",
      CSRFProtection: function(e) {
        var n = t('meta[name="csrf-token"]').attr("content");
        n && e.setRequestHeader("X-CSRF-Token", n)
      },
      refreshCSRFTokens: function() {
        var e = t("meta[name=csrf-token]").attr("content"),
          n = t("meta[name=csrf-param]").attr("content");
        t('form input[name="' + n + '"]').val(e)
      },
      fire: function(e, n, r) {
        var o = t.Event(n);
        return e.trigger(o, r), o.result !== !1
      },
      confirm: function(t) {
        return confirm(t)
      },
      ajax: function(e) {
        return t.ajax(e)
      },
      href: function(t) {
        return t.attr("href")
      },
      handleRemote: function(r) {
        var o, i, a, s, u, c, l, h;
        if (n.fire(r, "ajax:before")) {
          if (s = r.data("cross-domain"), u = s === e ? null : s, c = r.data("with-credentials") || null, l = r.data("type") || t.ajaxSettings && t.ajaxSettings.dataType, r.is("form")) {
            o = r.attr("method"), i = r.attr("action"), a = r.serializeArray();
            var d = r.data("ujs:submit-button");
            d && (a.push(d), r.data("ujs:submit-button", null))
          } else r.is(n.inputChangeSelector) ? (o = r.data("method"), i = r.data("url"), a = r.serialize(), r.data("params") && (a = a + "&" + r.data("params"))) : r.is(n.buttonClickSelector) ? (o = r.data("method") || "get", i = r.data("url"), a = r.serialize(), r.data("params") && (a = a + "&" + r.data("params"))) : (o = r.data("method"), i = n.href(r), a = r.data("params") || null);
          return h = {
            type: o || "GET",
            data: a,
            dataType: l,
            beforeSend: function(t, o) {
              return o.dataType === e && t.setRequestHeader("accept", "*/*;q=0.5, " + o.accepts.script), n.fire(r, "ajax:beforeSend", [t, o]) ? void r.trigger("ajax:send", t) : !1
            },
            success: function(t, e, n) {
              r.trigger("ajax:success", [t, e, n])
            },
            complete: function(t, e) {
              r.trigger("ajax:complete", [t, e])
            },
            error: function(t, e, n) {
              r.trigger("ajax:error", [t, e, n])
            },
            crossDomain: u
          }, c && (h.xhrFields = {
            withCredentials: c
          }), i && (h.url = i), n.ajax(h)
        }
        return !1
      },
      handleMethod: function(r) {
        var o = n.href(r),
          i = r.data("method"),
          a = r.attr("target"),
          s = t("meta[name=csrf-token]").attr("content"),
          u = t("meta[name=csrf-param]").attr("content"),
          c = t('<form method="post" action="' + o + '"></form>'),
          l = '<input name="_method" value="' + i + '" type="hidden" />';
        u !== e && s !== e && (l += '<input name="' + u + '" value="' + s + '" type="hidden" />'), a && c.attr("target", a), c.hide().append(l).appendTo("body"), c.submit()
      },
      formElements: function(e, n) {
        return e.is("form") ? t(e[0].elements).filter(n) : e.find(n)
      },
      disableFormElements: function(e) {
        n.formElements(e, n.disableSelector).each(function() {
          n.disableFormElement(t(this))
        })
      },
      disableFormElement: function(t) {
        var n, r;
        n = t.is("button") ? "html" : "val", r = t.data("disable-with"), t.data("ujs:enable-with", t[n]()), r !== e && t[n](r), t.prop("disabled", !0)
      },
      enableFormElements: function(e) {
        n.formElements(e, n.enableSelector).each(function() {
          n.enableFormElement(t(this))
        })
      },
      enableFormElement: function(t) {
        var e = t.is("button") ? "html" : "val";
        t.data("ujs:enable-with") && t[e](t.data("ujs:enable-with")), t.prop("disabled", !1)
      },
      allowAction: function(t) {
        var e, r = t.data("confirm"),
          o = !1;
        return r ? (n.fire(t, "confirm") && (o = n.confirm(r), e = n.fire(t, "confirm:complete", [o])), o && e) : !0
      },
      blankInputs: function(e, n, r) {
        var o, i, a = t(),
          s = n || "input,textarea",
          u = e.find(s);
        return u.each(function() {
          if (o = t(this), i = o.is("input[type=checkbox],input[type=radio]") ? o.is(":checked") : o.val(), !i == !r) {
            if (o.is("input[type=radio]") && u.filter('input[type=radio]:checked[name="' + o.attr("name") + '"]').length) return !0;
            a = a.add(o)
          }
        }), a.length ? a : !1
      },
      nonBlankInputs: function(t, e) {
        return n.blankInputs(t, e, !0)
      },
      stopEverything: function(e) {
        return t(e.target).trigger("ujs:everythingStopped"), e.stopImmediatePropagation(), !1
      },
      disableElement: function(t) {
        var r = t.data("disable-with");
        t.data("ujs:enable-with", t.html()), r !== e && t.html(r), t.bind("click.railsDisable", function(t) {
          return n.stopEverything(t)
        })
      },
      enableElement: function(t) {
        t.data("ujs:enable-with") !== e && (t.html(t.data("ujs:enable-with")), t.removeData("ujs:enable-with")), t.unbind("click.railsDisable")
      }
    }, n.fire(r, "rails:attachBindings") && (t.ajaxPrefilter(function(t, e, r) {
      t.crossDomain || n.CSRFProtection(r)
    }), t(window).on("pageshow.rails", function() {
      t(t.rails.enableSelector).each(function() {
        var e = t(this);
        e.data("ujs:enable-with") && t.rails.enableFormElement(e)
      }), t(t.rails.linkDisableSelector).each(function() {
        var e = t(this);
        e.data("ujs:enable-with") && t.rails.enableElement(e)
      })
    }), r.delegate(n.linkDisableSelector, "ajax:complete", function() {
      n.enableElement(t(this))
    }), r.delegate(n.buttonDisableSelector, "ajax:complete", function() {
      n.enableFormElement(t(this))
    }), r.delegate(n.linkClickSelector, "click.rails", function(r) {
      var o = t(this),
        i = o.data("method"),
        a = o.data("params"),
        s = r.metaKey || r.ctrlKey;
      if (!n.allowAction(o)) return n.stopEverything(r);
      if (!s && o.is(n.linkDisableSelector) && n.disableElement(o), o.data("remote") !== e) {
        if (s && (!i || "GET" === i) && !a) return !0;
        var u = n.handleRemote(o);
        return u === !1 ? n.enableElement(o) : u.fail(function() {
          n.enableElement(o)
        }), !1
      }
      return i ? (n.handleMethod(o), !1) : void 0
    }), r.delegate(n.buttonClickSelector, "click.rails", function(e) {
      var r = t(this);
      if (!n.allowAction(r)) return n.stopEverything(e);
      r.is(n.buttonDisableSelector) && n.disableFormElement(r);
      var o = n.handleRemote(r);
      return o === !1 ? n.enableFormElement(r) : o.fail(function() {
        n.enableFormElement(r)
      }), !1
    }), r.delegate(n.inputChangeSelector, "change.rails", function(e) {
      var r = t(this);
      return n.allowAction(r) ? (n.handleRemote(r), !1) : n.stopEverything(e)
    }), r.delegate(n.formSubmitSelector, "submit.rails", function(r) {
      var o, i, a = t(this),
        s = a.data("remote") !== e;
      if (!n.allowAction(a)) return n.stopEverything(r);
      if (a.attr("novalidate") == e && (o = n.blankInputs(a, n.requiredInputSelector), o && n.fire(a, "ajax:aborted:required", [o]))) return n.stopEverything(r);
      if (s) {
        if (i = n.nonBlankInputs(a, n.fileInputSelector)) {
          setTimeout(function() {
            n.disableFormElements(a)
          }, 13);
          var u = n.fire(a, "ajax:aborted:file", [i]);
          return u || setTimeout(function() {
            n.enableFormElements(a)
          }, 13), u
        }
        return n.handleRemote(a), !1
      }
      setTimeout(function() {
        n.disableFormElements(a)
      }, 13)
    }), r.delegate(n.formInputClickSelector, "click.rails", function(e) {
      var r = t(this);
      if (!n.allowAction(r)) return n.stopEverything(e);
      var o = r.attr("name"),
        i = o ? {
          name: o,
          value: r.val()
        } : null;
      r.closest("form").data("ujs:submit-button", i)
    }), r.delegate(n.formSubmitSelector, "ajax:send.rails", function(e) {
      this == e.target && n.disableFormElements(t(this))
    }), r.delegate(n.formSubmitSelector, "ajax:complete.rails", function(e) {
      this == e.target && n.enableFormElements(t(this))
    }), t(function() {
      n.refreshCSRFTokens()
    }))
  }(jQuery)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  var rewriteSelector = function(t, e, n) {
    var r = t[e];
    r && (t[e] = function() {
      return arguments[n] = arguments[n].replace(/@([\w\u00c0-\uFFFF\-]+)/g, '[data-role~="$1"]'), r.apply(t, arguments)
    }, $.extend(t[e], r))
  };
  rewriteSelector($, "find", 0), rewriteSelector($, "multiFilter", 0), rewriteSelector($.find, "matchesSelector", 1), rewriteSelector($.find, "matches", 0)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    "use strict";

    function t(t, e, n) {
      var o = n || r(t);
      return o === "[object " + e + "]"
    }

    function e(e) {
      var n = "Array" === e && sr.isArray || function(n, r) {
        return t(n, e, r)
      };
      return wr[e] = n, n
    }

    function n(e, n) {
      var r = function(r) {
        return g(r) ? t(r, n) : typeof r === e
      };
      return wr[n] = r, r
    }

    function r(t) {
      return fr.call(t)
    }

    function o() {
      i(ar), b(br, function(t, e) {
        i(pr[e])
      })
    }

    function i(t) {
      t.SugarMethods || (l(t, "SugarMethods", {}), a(t, !1, !0, {
        extend: function(e, n, r) {
          a(t, r !== !1, n, e)
        },
        sugarRestore: function() {
          return u(this, t, arguments, function(t, e, n) {
            l(t, e, n.method)
          })
        },
        sugarRevert: function() {
          return u(this, t, arguments, function(t, e, n) {
            n.existed ? l(t, e, n.original) : delete t[e]
          })
        }
      }))
    }

    function a(t, e, n, r) {
      var o = e ? t.prototype : t;
      i(t), b(r, function(r, i) {
        var a = o[r],
          s = v(o, r);
        Mr(n) && a && (i = c(a, i, n)), n === !1 && a || l(o, r, i), t.SugarMethods[r] = {
          method: i,
          existed: s,
          original: a,
          instance: e
        }
      })
    }

    function s(t, e, n, r, o) {
      var i = {};
      r = $r(r) ? r.split(",") : r, r.forEach(function(t, e) {
        o(i, t, e)
      }), a(t, e, n, i)
    }

    function u(t, e, n, r) {
      var o = 0 === n.length,
        i = h(n),
        a = !1;
      return b(e.SugarMethods, function(e, n) {
        (o || -1 !== i.indexOf(e)) && (a = !0, r(n.instance ? t.prototype : t, e, n))
      }), a
    }

    function c(t, e, n) {
      return function() {
        return n.apply(this, arguments) ? e.apply(this, arguments) : t.apply(this, arguments)
      }
    }

    function l(t, e, n) {
      yr ? ar.defineProperty(t, e, {
        value: n,
        configurable: !0,
        enumerable: !1,
        writable: !0
      }) : t[e] = n
    }

    function h(t, e, n) {
      var r, o = [],
        i = n || 0;
      for (r = t.length; r > i; i++) o.push(t[i]), e && e.call(t, t[i], i);
      return o
    }

    function d(t, e, n) {
      var r = t[n || 0];
      return xr(r) && (t = r, n = 0), h(t, e, n)
    }

    function p(t) {
      if (!t || !t.call) throw new TypeError("Callback is not callable")
    }

    function f(t) {
      return t !== ir
    }

    function m(t) {
      return t === ir
    }

    function y(t, e) {
      return !w(t) && e in t
    }

    function v(t, e) {
      return !!t && mr.call(t, e)
    }

    function g(t) {
      return !!t && ("object" == typeof t || vr && Sr(t))
    }

    function w(t) {
      var e = typeof t;
      return null == t || "string" === e || "number" === e || "boolean" === e
    }

    function _(t, e) {
      e = e || r(t);
      try {
        if (t && t.constructor && !v(t, "constructor") && !v(t.constructor.prototype, "isPrototypeOf")) return !1
      } catch (n) {
        return !1
      }
      return !!t && "[object Object]" === e && "hasOwnProperty" in t
    }

    function b(t, e) {
      var n;
      for (n in t)
        if (v(t, n) && e.call(t, n, t[n], t) === !1) break
    }

    function C(t, e) {
      for (var n = 0; t > n; n++) e(n)
    }

    function k(t, e) {
      return b(e, function(n) {
        t[n] = e[n]
      }), t
    }

    function $(t) {
      return w(t) && (t = ar(t)), gr && $r(t) && x(t), t
    }

    function x(t) {
      for (var e, n = 0; e = t.charAt(n);) t[n++] = e
    }

    function T(t) {
      k(this, $(t))
    }

    function S(t, e, n) {
      var r = Er(10, Fr(e || 0));
      return n = n || Wr, 0 > e && (r = 1 / r), n(t * r) / r
    }

    function M(t) {
      return t >= Nr && Pr >= t || t >= zr && Lr >= t
    }

    function R() {
      var t, e;
      for (e = 0; 9 >= e; e++) t = F(e + zr), qr += t, Vr[t] = F(e + Nr);
      Vr[Br] = "", Vr[Dr] = Hr, Vr[Hr] = Hr, Rr = ur("[" + qr + Dr + Br + Hr + "]", "g")
    }

    function F(t) {
      return lr.fromCharCode(t)
    }

    function E() {
      return "	\n\f\r \xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u2028\u2029\u3000\ufeff"
    }

    function I(t, e) {
      for (var n = "", t = t.toString(); e > 0;) 1 & e && (n += t), (e >>= 1) && (t += t);
      return n
    }

    function A(t, e) {
      var n, r;
      return n = t.replace(Rr, function(t) {
        var e = Vr[t];
        return e === Hr && (r = !0), e
      }), r ? parseFloat(n) : parseInt(n, e || 10)
    }

    function W(t, e, n, r) {
      var o = Fr(t).toString(r || 10);
      return o = I("0", e - o.replace(/\.\d+/, "").length) + o, (n || 0 > t) && (o = (0 > t ? "-" : "+") + o), o
    }

    function j(t) {
      if (t >= 11 && 13 >= t) return "th";
      switch (t % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th"
      }
    }

    function O(t, e) {
      function n(t, n) {
        (t || e.indexOf(n) > -1) && (r += n)
      }
      var r = "";
      return e = e || "", n(t.multiline, "m"), n(t.ignoreCase, "i"), n(t.global, "g"), n(t.sticky, "y"), r
    }

    function N(t) {
      return $r(t) || (t = lr(t)), t.replace(/([\\/\'*+?|()\[\]{}.^$])/g, "\\$1")
    }

    function P(t, e) {
      return t["get" + (t._utc ? "UTC" : "") + e]()
    }

    function z(t, e, n) {
      return t["set" + (t._utc && "ISOWeek" != e ? "UTC" : "") + e](n)
    }

    function L(t, e) {
      var n, r, o, i, a, s, u, c, l = typeof t;
      if ("string" === l) return t;
      if (o = fr.call(t), n = _(t, o), r = xr(t, o), null != t && n || r) {
        if (e || (e = []), e.length > 1)
          for (u = e.length; u--;)
            if (e[u] === t) return "CYC";
        for (e.push(t), i = t.valueOf() + lr(t.constructor), a = r ? t : ar.keys(t).sort(), u = 0, c = a.length; c > u; u++) s = r ? u : a[u], i += s + L(t[s], e);
        e.pop()
      } else i = 1 / t === -1 / 0 ? "-0" : lr(t && t.valueOf ? t.valueOf() : t);
      return l + o + i
    }

    function H(t, e) {
      return t === e ? 0 !== t || 1 / t === 1 / e : D(t) && D(e) ? L(t) === L(e) : !1
    }

    function D(t) {
      var e = r(t);
      return _r.test(e) || _(t, e)
    }

    function B(t, e, n) {
      var r, o = t.length,
        i = e.length,
        a = e[i - 1] !== !1,
        s = i > (a ? 1 : 2);
      return s ? (r = [], h(e, function(e) {
        return Cr(e) ? !1 : void r.push(q(t, o, e, a, n))
      }), r) : q(t, o, e[0], a, n)
    }

    function q(t, e, n, r, o) {
      return r && (n %= e, 0 > n && (n = e + n)), o ? t.charAt(n) : t[n]
    }

    function V(t, e) {
      s(e, !0, !1, t, function(t, e) {
        t[e + ("equal" === e ? "s" : "")] = function() {
          return ar[e].apply(null, [this].concat(h(arguments)))
        }
      })
    }

    function U(t, e, n, r) {
      var o = t.length,
        i = -1 == r,
        a = i ? o - 1 : 0,
        s = Y(n, a);
      for (0 > s && (s = o + s), (!i && 0 > s || i && s >= o) && (s = a); i && s >= 0 || !i && o > s;) {
        if (t[s] === e) return s;
        s += r
      }
      return -1
    }

    function G(t, e, n, r) {
      var o, i, a = t.length,
        s = 0,
        u = f(n);
      if (p(e), 0 == a && !u) throw new TypeError("Reduce called on empty array with no initial value");
      for (u ? o = n : (o = t[r ? a - 1 : s], s++); a > s;) i = r ? a - s - 1 : s, i in t && (o = e(o, t[i], i, t)), s++;
      return o
    }

    function Y(t, e) {
      return isNaN(t) ? e : parseInt(t >> 0)
    }

    function J(t) {
      if (0 === t.length) throw new TypeError("First argument must be defined")
    }

    function Q() {
      var t = E().match(/^\s+$/);
      try {
        lr.prototype.trim.call([1])
      } catch (e) {
        t = !1
      }
      a(lr, !0, !t, {
        trim: function() {
          return this.toString().trimLeft().trimRight()
        },
        trimLeft: function() {
          return this.replace(ur("^[" + E() + "]+"), "")
        },
        trimRight: function() {
          return this.replace(ur("[" + E() + "]+$"), "")
        }
      })
    }

    function X() {
      var t = new cr(cr.UTC(1999, 11, 31)),
        e = "1999-12-31T00:00:00.000Z",
        n = t.toISOString && t.toISOString() === e;
      s(cr, !0, !n, "toISOString,toJSON", function(t, e) {
        t[e] = function() {
          return W(this.getUTCFullYear(), 4) + "-" + W(this.getUTCMonth() + 1, 2) + "-" + W(this.getUTCDate(), 2) + "T" + W(this.getUTCHours(), 2) + ":" + W(this.getUTCMinutes(), 2) + ":" + W(this.getUTCSeconds(), 2) + "." + W(this.getUTCMilliseconds(), 3) + "Z"
        }
      })
    }

    function Z(t) {
      return t = ur(t),
        function(e) {
          return t.test(e)
        }
    }

    function K(t) {
      var e = t.getTime();
      return function(t) {
        return !(!t || !t.getTime) && t.getTime() === e
      }
    }

    function te(t) {
      return function(e, n, r) {
        return e === t || t.call(this, e, n, r)
      }
    }

    function ee(t) {
      return function(e, n, r) {
        return e === t || t.call(r, n, e, r)
      }
    }

    function ne(t, e) {
      var n = {};
      return function(r, o, i) {
        var a;
        if (!g(r)) return !1;
        for (a in t)
          if (n[a] = n[a] || oe(t[a], e), n[a].call(i, r[a], o, i) === !1) return !1;
        return !0
      }
    }

    function re(t) {
      return function(e) {
        return e === t || H(e, t)
      }
    }

    function oe(t, e) {
      if (w(t));
      else {
        if (Sr(t)) return Z(t);
        if (Tr(t)) return K(t);
        if (Mr(t)) return e ? ee(t) : te(t);
        if (_(t)) return ne(t, e)
      }
      return re(t)
    }

    function ie(t, e, n, r) {
      return e ? e.apply ? e.apply(n, r || []) : Mr(t[e]) ? t[e].call(t) : t[e] : t
    }

    function ae(t, e, n, r) {
      var o, i, a = +t.length;
      for (0 > n && (n = t.length + n), i = isNaN(n) ? 0 : n, r === !0 && (a += i); a > i;) {
        if (o = i % t.length, !(o in t)) return se(t, e, i, r);
        if (e.call(t, t[o], o, t) === !1) break;
        i++
      }
    }

    function se(t, e, n) {
      var r, o = [];
      for (r in t) ue(t, r) && r >= n && o.push(parseInt(r));
      return o.sort().each(function(n) {
        return e.call(t, t[n], n, t)
      }), t
    }

    function ue(t, e) {
      return e in t && ce(e) == e && 4294967295 != e
    }

    function ce(t) {
      return t >>> 0
    }

    function le(t, e, n, r, o, i) {
      var a, s, u;
      return t.length > 0 && (u = oe(e), ae(t, function(e, n) {
        return u.call(i, e, n, t) ? (a = e, s = n, !1) : void 0
      }, n, r)), o ? s : a
    }

    function he(t, e) {
      var n, r = [],
        o = {};
      return ae(t, function(i, a) {
        n = e ? ie(i, e, t, [i, a, t]) : i, ge(o, n) || r.push(i)
      }), r
    }

    function de(t, e, n) {
      var r = [],
        o = {};
      return e.each(function(t) {
        ge(o, t)
      }), t.each(function(t) {
        var e = L(t),
          i = !D(t);
        ve(o, e, t, i) !== n && (we(o, e, t, i), r.push(t))
      }), r
    }

    function pe(t, e, n) {
      e = e || 1 / 0, n = n || 0;
      var r = [];
      return ae(t, function(t) {
        xr(t) && e > n ? r = r.concat(pe(t, e, n + 1)) : r.push(t)
      }), r
    }

    function fe(t) {
      return y(t, "length") && !$r(t) && !_(t)
    }

    function me(t) {
      return y(t, "length") && ("[object Arguments]" === r(t) || !!t.callee)
    }

    function ye(t) {
      var e = [];
      return h(t, function(t) {
        e = e.concat(t)
      }), e
    }

    function ve(t, e, n, r) {
      var o = e in t;
      return r && (t[e] || (t[e] = []), o = -1 !== t[e].indexOf(n)), o
    }

    function ge(t, e) {
      var n = L(e),
        r = !D(e),
        o = ve(t, n, e, r);
      return r ? t[n].push(e) : t[n] = e, o
    }

    function we(t, e, n, r) {
      var o, i = 0;
      if (r)
        for (o = t[e]; i < o.length;) o[i] === n ? o.splice(i, 1) : i += 1;
      else delete t[e]
    }

    function _e(t, e, n, r) {
      var o, i, a, s, u = [],
        c = "max" === n,
        l = "min" === n,
        h = sr.isArray(t);
      for (i in t)
        if (t.hasOwnProperty(i)) {
          if (o = t[i], s = ie(o, e, t, h ? [o, parseInt(i), t] : []), m(s)) throw new TypeError("Cannot compare with undefined");
          s === a ? u.push(o) : (m(a) || c && s > a || l && a > s) && (u = [o], a = s)
        }
      return h || (u = pe(u, 1)), r ? u : u[0]
    }

    function be(t, e) {
      var n, r, o, i, a, s, u = 0,
        c = 0,
        l = sr[Yr],
        h = sr[Jr],
        d = sr[Qr],
        p = sr[Gr],
        f = sr[Xr];
      t = Ce(t, l, h), e = Ce(e, l, h);
      do o = ke(t, u, d), i = ke(e, u, d), n = $e(o, p), r = $e(i, p), -1 === n || -1 === r ? (n = t.charCodeAt(u) || null, r = e.charCodeAt(u) || null, f && M(n) && M(r) && (n = A(t.slice(u)), r = A(e.slice(u)))) : (a = o !== t.charAt(u), s = i !== e.charAt(u), a !== s && 0 === c && (c = a - s)), u += 1; while (null != n && null != r && n === r);
      return n === r ? c : n - r
    }

    function Ce(t, e, n) {
      return $r(t) || (t = lr(t)), n && (t = t.toLowerCase()), e && (t = t.replace(e, "")), t
    }

    function ke(t, e, n) {
      var r = t.charAt(e);
      return n[r] || r
    }

    function $e(t, e) {
      return t ? e.indexOf(t) : null
    }

    function xe() {
      var t = sr.prototype.map,
        e = function() {
          var t = arguments;
          return t.length > 0 && !Mr(t[0])
        };
      s(sr, !0, e, "every,all,some,filter,any,none,find,findIndex", function(t, e) {
        var n = sr.prototype[e];
        t[e] = function(t) {
          var e = oe(t);
          return n.call(this, function(t, n) {
            return e(t, n, this)
          })
        }
      }), a(sr, !0, e, {
        map: function(e) {
          return t.call(this, function(t, n) {
            return ie(t, e, this, [t, n, this])
          })
        }
      })
    }

    function Te() {
      var t = "A\xc1\xc0\xc2\xc3\u0104BC\u0106\u010c\xc7D\u010e\xd0E\xc9\xc8\u011a\xca\xcb\u0118FG\u011eH\u0131I\xcd\xcc\u0130\xce\xcfJKL\u0141MN\u0143\u0147\xd1O\xd3\xd2\xd4PQR\u0158S\u015a\u0160\u015eT\u0164U\xda\xd9\u016e\xdb\xdcVWXY\xddZ\u0179\u017b\u017d\xde\xc6\u0152\xd8\xd5\xc5\xc4\xd6",
        e = "A\xc1\xc0\xc2\xc3\xc4,C\xc7,E\xc9\xc8\xca\xcb,I\xcd\xcc\u0130\xce\xcf,O\xd3\xd2\xd4\xd5\xd6,S\xdf,U\xda\xd9\xdb\xdc";
      sr[Gr] = t.split("").map(function(t) {
        return t + t.toLowerCase()
      }).join("");
      var n = {};
      ae(e.split(","), function(t) {
        var e = t.charAt(0);
        ae(t.slice(1).split(""), function(t) {
          n[t] = e, n[t.toLowerCase()] = e.toLowerCase()
        })
      }), sr[Xr] = !0, sr[Jr] = !0, sr[Qr] = n
    }

    function Se(t) {
      return ar.keys($(t))
    }

    function Me(t, e) {
      s(ar, !1, !0, t, function(t, n) {
        t[n] = function(t, r, o) {
          var i, a, s = Se(t);
          return e || (a = oe(r, !0)), i = sr.prototype[n].call(s, function(n) {
            var o = t[n];
            return e ? ie(o, r, t, [n, o, t]) : a(o, n, t)
          }, o), xr(i) && (i = i.reduce(function(e, n) {
            return e[n] = t[n], e
          }, {})), i
        }
      }), V(t, T)
    }

    function Re() {
      sr[Ur] = be
    }

    function Fe(t) {
      k(this, t), this.compiledFormats = mo.concat()
    }

    function Ee(t, e) {
      var n;
      if ($r(t) || (t = ""), n = wo[t] || wo[t.slice(0, 2)], e === !1 && !n) throw new TypeError("Invalid locale.");
      return n || ro
    }

    function Ie(t, e) {
      function n(t) {
        var e = c[t];
        $r(e) ? c[t] = e.split(",") : e || (c[t] = [])
      }

      function r(t, e) {
        return t = t.split("+").map(function(t) {
          return t.replace(/(.+):(.+)$/, function(t, e, n) {
            return n.split("|").map(function(t) {
              return e + t
            }).join("|")
          })
        }).join("|"), t.split("|").forEach(e)
      }

      function o(t, e, n) {
        var o = [];
        c[t].forEach(function(t, i) {
          e && (t += "+" + t.slice(0, 3)), r(t, function(t, e) {
            o[e * n + i] = t.toLowerCase()
          })
        }), c[t] = o
      }

      function i(t, e, n) {
        var r = "\\d{" + t + "," + e + "}";
        return n && (r += "|(?:" + je(c.numbers) + ")+"), r
      }

      function a() {
        var t = ["-?\\d+"].concat(c.articles);
        return c.numbers && (t = t.concat(c.numbers)), je(t)
      }

      function s(t, e) {
        c[t] = c[t] || e
      }

      function u() {
        var t = [];
        c.modifiersByName = {}, c.modifiers.push({
          name: "day",
          src: "yesterday",
          value: -1
        }), c.modifiers.push({
          name: "day",
          src: "today",
          value: 0
        }), c.modifiers.push({
          name: "day",
          src: "tomorrow",
          value: 1
        }), c.modifiers.forEach(function(e) {
          var n = e.name;
          r(e.src, function(r) {
            var o = c[n];
            c.modifiersByName[r] = e, t.push({
              name: n,
              src: r,
              value: e.value
            }), c[n] = o ? o + "|" + r : r
          })
        }), c.day += "|" + je(c.weekdays), c.modifiers = t
      }
      var c, l;
      return c = new Fe(e), n("modifiers"), "months,weekdays,units,numbers,articles,tokens,timeMarker,ampm,timeSuffixes,dateParse,timeParse".split(",").forEach(n), l = !c.monthSuffix, o("months", l, 12), o("weekdays", l, 7), o("units", !1, 8), o("numbers", !1, 10), s("code", t), s("date", i(1, 2, c.digitDate)), s("year", "'\\d{2}|" + i(4, 4)), s("num", a()), u(), c.monthSuffix && (c.month = i(1, 2), c.months = "1,2,3,4,5,6,7,8,9,10,11,12".split(",").map(function(t) {
        return t + c.monthSuffix
      })), c.full_month = i(1, 2) + "|" + je(c.months), c.timeSuffixes.length > 0 && c.addFormat(un(ho, c), !1, so), c.addFormat("{day}", !0), c.addFormat("{month}" + (c.monthSuffix || "")), c.addFormat("{year}" + (c.yearSuffix || "")), c.timeParse.forEach(function(t) {
        c.addFormat(t, !0)
      }), c.dateParse.forEach(function(t) {
        c.addFormat(t)
      }), wo[t] = c
    }

    function Ae(t, e, n, r) {
      t.compiledFormats.unshift({
        variant: r,
        locale: t,
        reg: ur("^" + e + "$", "i"),
        to: n
      })
    }

    function We(t) {
      return t.slice(0, 1).toUpperCase() + t.slice(1)
    }

    function je(t) {
      return t.filter(function(t) {
        return !!t
      }).join("|")
    }

    function Oe() {
      var t = cr.SugarNewDate;
      return t ? t() : new cr
    }

    function Ne(t, e) {
      var n;
      return g(t[0]) ? t : kr(t[0]) && !kr(t[1]) ? [t[0]] : $r(t[0]) && e ? [Pe(t[0]), t[1]] : (n = {}, io.forEach(function(e, r) {
        n[e.name] = t[r]
      }), [n])
    }

    function Pe(t, e) {
      var n, r = {};
      return n = t.match(/^(\d+)?\s?(\w+?)s?$/i), n && (m(e) && (e = parseInt(n[1]) || 1), r[n[2].toLowerCase()] = e), r
    }

    function ze(t, e, n) {
      var r, o;
      for (m(n) && (n = ao.length), r = e || 0; n > r && (o = ao[r], t(o.name, o, r) !== !1); r++);
    }

    function Le(t, e) {
      var n, r, o = {};
      return e.forEach(function(e, i) {
        n = t[i + 1], m(n) || "" === n || ("year" === e && (o.yearAsString = n.replace(/'/, "")), r = parseFloat(n.replace(/'/, "").replace(/,/, ".")), o[e] = isNaN(r) ? n.toLowerCase() : r)
      }), o
    }

    function He(t) {
      return t = t.trim().replace(/^just (?=now)|\.+$/i, ""), De(t)
    }

    function De(t) {
      return t.replace(oo, function(t, e, n) {
        var r, o, i = 0,
          a = 1;
        return e ? t : (n.split("").reverse().forEach(function(t) {
          var e = fo[t],
            n = e > 9;
          n ? (r && (i += a), a *= e / (o || 1), o = e) : (r === !1 && (a *= 10), i += a * e), r = n
        }), r && (i += a), i)
      })
    }

    function Be(t, e, n, r) {
      function o(t) {
        d.push(t)
      }

      function i() {
        d.forEach(function(t) {
          t.call()
        })
      }

      function a() {
        var t = c.getWeekday();
        c.setWeekday(7 * (m.num - 1) + (t > w ? w + 7 : w))
      }

      function s() {
        var t = p.modifiersByName[m.edge];
        ze(function(t) {
          return f(m[t]) ? (y = t, !1) : void 0
        }, 4), "year" === y ? m.specificity = "month" : ("month" === y || "week" === y) && (m.specificity = "day"), c[(t.value < 0 ? "endOf" : "beginningOf") + We(y)](), -2 === t.value && c.reset()
      }

      function u() {
        var t;
        ze(function(e, n, r) {
          if ("day" === e && (e = "date"), f(m[e])) {
            if (r >= v) return hn(c), !1;
            t = t || {}, t[e] = m[e], delete m[e]
          }
        }), t && o(function() {
          c.set(t, !0)
        })
      }
      var c, l, h, d, p, m, y, v, w, _, C;
      return c = Oe(), d = [], c.utc(r), Tr(t) ? c.utc(t.isUTC()).setTime(t.getTime()) : kr(t) ? c.setTime(t) : g(t) ? (c.set(t, !0), m = t) : $r(t) && (h = Ee(e), t = He(t), h && b(h.getFormats(), function(n, r) {
        var i = t.match(r.reg);
        return i ? (p = r.locale, m = Le(i, r.to, p), p.cachedFormat = r, m.utc && c.utc(), m.timestamp ? (m = m.timestamp, !1) : (r.variant && !$r(m.month) && ($r(m.date) || h.hasVariant(e)) && (C = m.month, m.month = m.date, m.date = C), m.year && 2 === m.yearAsString.length && (m.year = qe(m.year)), m.month && (m.month = p.getMonth(m.month), m.shift && !m.unit && (m.unit = p.units[7])), m.weekday && m.date ? delete m.weekday : m.weekday && (m.weekday = p.getWeekday(m.weekday), m.shift && !m.unit && (m.unit = p.units[5])), m.day && (C = p.modifiersByName[m.day]) ? (m.day = C.value, c.reset(), l = !0) : m.day && (w = p.getWeekday(m.day)) > -1 && (delete m.day, m.num && m.month ? (o(a), m.day = 1) : m.weekday = w), m.date && !kr(m.date) && (m.date = p.getNumericDate(m.date)), p.matchPM(m.ampm) && m.hour < 12 ? m.hour += 12 : p.matchAM(m.ampm) && 12 === m.hour && (m.hour = 0), ("offset_hours" in m || "offset_minutes" in m) && (c.utc(), m.offset_minutes = m.offset_minutes || 0, m.offset_minutes += 60 * m.offset_hours, "-" === m.offset_sign && (m.offset_minutes *= -1), m.minute -= m.offset_minutes), m.unit && (l = !0, _ = p.getNumber(m.num), v = p.getUnitIndex(m.unit), y = no.units[v], u(), m.shift && (_ *= (C = p.modifiersByName[m.shift]) ? C.value : 0), m.sign && (C = p.modifiersByName[m.sign]) && (_ *= C.value), f(m.weekday) && (c.set({
          weekday: m.weekday
        }, !0), delete m.weekday), m[y] = (m[y] || 0) + _), m.edge && o(s), "-" === m.year_sign && (m.year *= -1), ze(function(t, e, n) {
          var r = m[t],
            o = r % 1;
          o && (m[ao[n - 1].name] = Wr(o * ("second" === t ? 1e3 : 60)), m[t] = Ar(r))
        }, 1, 4), !1)) : void 0
      }), m ? l ? c.advance(m) : (c._utc && c.reset(), sn(c, m, !0, !1, n)) : ("now" !== t && (c = new cr(t)), r && c.addMinutes(-c.getTimezoneOffset())), i(), c.utc(!1)), {
        date: c,
        set: m
      }
    }

    function qe(t) {
      return 100 * Wr(P(Oe(), "FullYear") / 100) - 100 * Wr(t / 100) + t
    }

    function Ve(t) {
      t = t.clone();
      var e = P(t, "Day") || 7;
      return t.addDays(4 - e).reset(), 1 + Ar(t.daysSince(t.clone().beginningOfYear()) / 7)
    }

    function Ue(t) {
      var e, n = Fr(t),
        r = n,
        o = 0;
      return ze(function(t, i, a) {
        e = Ar(S(n / i.multiplier(), 1)), e >= 1 && (r = e, o = a)
      }, 1), [r, o, t]
    }

    function Ge(t) {
      var e = Ue(t.millisecondsFromNow());
      return Ye(t, e) && (e[0] = Fr(t.monthsFromNow()), e[1] = 6), e
    }

    function Ye(t, e) {
      return 6 === e[1] || 5 === e[1] && 4 === e[0] && t.daysFromNow() >= Oe().daysInMonth()
    }

    function Je() {
      var t = function(t, e) {
        var n = P(t, "Hours");
        return Ee(e).ampm[Ar(n / 12)] || ""
      };
      Ke("t", t, 1), Ke("tt", t), Ke("T", t, 1, 1), Ke("TT", t, null, 2)
    }

    function Qe() {
      var t = function(t, e) {
        var n = P(t, "Day");
        return Ee(e).weekdays[n]
      };
      Ke("dow", t, 3), Ke("Dow", t, 3, 1), Ke("weekday", t), Ke("Weekday", t, null, 1)
    }

    function Xe() {
      Ze("mon", 0, 3), Ze("month", 0), Ze("month2", 1), Ze("month3", 2)
    }

    function Ze(t, e, n) {
      var r = function(t, n) {
        var r = P(t, "Month");
        return Ee(n).months[r + 12 * e]
      };
      Ke(t, r, n), Ke(We(t), r, n, 1)
    }

    function Ke(t, e, n, r) {
      vo[t] = function(t, o) {
        var i = e(t, o);
        return n && (i = i.slice(0, n)), r && (i = i.slice(0, r).toUpperCase() + i.slice(r)), i
      }
    }

    function tn(t, e, n) {
      vo[t] = e, vo[t + t] = function(t, n) {
        return W(e(t, n), 2)
      }, n && (vo[t + t + t] = function(t, n) {
        return W(e(t, n), 3)
      }, vo[t + t + t + t] = function(t, n) {
        return W(e(t, n), 4)
      })
    }

    function en(t) {
      var e = t.match(/(\{\w+\})|[^{}]+/g);
      yo[t] = e.map(function(t) {
        return t.replace(/\{(\w+)\}/, function(e, n) {
          return t = vo[n] || n, n
        }), t
      })
    }

    function nn(t, e, n) {
      var r, o, i, a, s = "";
      for (r = yo[e], i = 0, o = r.length; o > i; i++) a = r[i], s += Mr(a) ? a(t, n) : a;
      return s
    }

    function rn(t, e, n, r) {
      var o;
      return t.isValid() ? (Date[e] ? e = Date[e] : Mr(e) && (o = Ge(t), e = e.apply(t, o.concat(Ee(r)))), !e && n ? (o = o || Ge(t), 0 === o[1] && (o[1] = 1, o[0] = 1), Ee(r).getRelativeFormat(o)) : (e = e || "long", ("short" === e || "long" === e || "full" === e) && (e = Ee(r)[e]), yo[e] || en(e), nn(t, e, r))) : "Invalid Date"
    }

    function on(t, e, n, r, o) {
      var i, a, s, u, c, l, h = 0,
        d = 0,
        p = 0;
      return i = Be(e, n, null, o), r > 0 && (d = p = r, c = !0), i.date.isValid() ? (i.set && i.set.specificity && (go.forEach(function(e) {
        e.name === i.set.specificity && (h = e.multiplier(i.date, t - i.date) - 1)
      }), l = We(i.set.specificity), (i.set.edge || i.set.shift) && i.date["beginningOf" + l](), "month" === i.set.specificity && (u = i.date.clone()["endOf" + l]().getTime()), !c && i.set.sign && "millisecond" != i.set.specificity && (d = 50, p = -50)), a = t.getTime(), s = i.date.getTime(), u = u || s + h, u = an(t, s, u), a >= s - d && u + p >= a) : !1
    }

    function an(t, e, n) {
      var r, o, i, a;
      return r = new cr(e), o = new cr(n).utc(t.isUTC()), 23 !== P(o, "Hours") && (i = r.getTimezoneOffset(), a = o.getTimezoneOffset(), i !== a && (n += (a - i).minutes())), n
    }

    function sn(t, e, n, r, o) {
      function i(t) {
        return f(e[t]) ? e[t] : e[t + "s"]
      }

      function a(t) {
        return f(i(t))
      }

      function s(t, e) {
        return a(t) || e && a("weekday")
      }

      function u() {
        switch (o) {
          case -1:
            return t > Oe();
          case 1:
            return t < Oe()
        }
      }
      var c, l;
      if (kr(e) && r) e = {
        milliseconds: e
      };
      else if (kr(e)) return t.setTime(e), t;
      if (f(e.date) && (e.day = e.date), ze(function(r, o, i) {
          var u = "day" === r;
          return s(r, u) ? (e.specificity = r, l = +i, !1) : void(!n || "week" === r || u && a("week") || z(t, o.method, u ? 1 : 0))
        }), go.forEach(function(n, o) {
          {
            var s, u = n.name,
              c = n.method;
            go[o - 1]
          }
          s = i(u), m(s) || (r ? ("week" === u && (s = (e.day || 0) + 7 * s, c = "Date"), s = s * r + P(t, c)) : "month" === u && a("day") && z(t, "Date", 15), z(t, c, s), r && "month" === u && cn(t, s))
        }), !r && !a("day") && a("weekday")) {
        var c = i("weekday");
        t.setWeekday(c)
      }
      return u() && ze(function(e, n) {
        var r = n.ambiguous || "week" === e && a("weekday");
        return r && !s(e, "day" === e) ? (t[n.addMethod](o), !1) : void 0
      }, l + 1), t
    }

    function un(t, e, n) {
      var r, o = {
        h: 0,
        m: 1,
        s: 2
      };
      return e = e || no, t.replace(/{([a-z])}/g, function(t, i) {
        var a = [],
          s = "h" === i,
          u = s && !n;
        return "t" === i ? e.ampm.join("|") : (s && a.push(":"), (r = e.timeSuffixes[o[i]]) && a.push(r + "\\s*"), 0 === a.length ? "" : "(?:" + a.join("|") + ")" + (u ? "" : "?"))
      })
    }

    function cn(t, e) {
      0 > e && (e = e % 12 + 12), e % 12 != P(t, "Month") && z(t, "Date", 0)
    }

    function ln(t, e, n) {
      var r, o;
      return kr(t[1]) ? r = Ne(t)[0] : (r = t[0], o = t[1]), Be(r, o, e, n).date
    }

    function hn(t) {
      t.setTime(0 / 0)
    }

    function dn() {
      ao = go.concat().reverse(), io = go.concat(), io.splice(2, 1)
    }

    function pn() {
      s(cr, !0, !0, go, function(t, e, n) {
        function r(t) {
          var n = t / u,
            r = n % 1,
            o = e.error || .999;
          return r && Fr(r % 1) > o && (n = Wr(n)), 0 > n ? Ir(n) : Ar(n)
        }
        var o, i, a = e.name,
          s = We(a),
          u = e.multiplier();
        e.addMethod = "add" + s + "s", o = function(t, e) {
          return r(this.getTime() - cr.create(t, e).getTime())
        }, i = function(t, e) {
          return r(cr.create(t, e).getTime() - this.getTime())
        }, t[a + "sAgo"] = i, t[a + "sUntil"] = i, t[a + "sSince"] = o, t[a + "sFromNow"] = o, t[e.addMethod] = function(t, e) {
          var n = {};
          return n[a] = t, this.advance(n, e)
        }, bn(e, u), 3 > n && ["Last", "This", "Next"].forEach(function(e) {
          t["is" + e + s] = function() {
            return on(this, e + " " + a, "en")
          }
        }), 4 > n && (t["beginningOf" + s] = function() {
          var t = {};
          switch (a) {
            case "year":
              t.year = P(this, "FullYear");
              break;
            case "month":
              t.month = P(this, "Month");
              break;
            case "day":
              t.day = P(this, "Date");
              break;
            case "week":
              t.weekday = 0
          }
          return this.set(t, !0)
        }, t["endOf" + s] = function() {
          var t = {
            hours: 23,
            minutes: 59,
            seconds: 59,
            milliseconds: 999
          };
          switch (a) {
            case "year":
              t.month = 11, t.day = 31;
              break;
            case "month":
              t.day = this.daysInMonth();
              break;
            case "week":
              t.weekday = 6
          }
          return this.set(t, !0)
        })
      })
    }

    function fn() {
      no.addFormat("([+-])?(\\d{4,4})[-.]?{full_month}[-.]?(\\d{1,2})?", !0, ["year_sign", "year", "month", "date"], !1, !0), no.addFormat("(\\d{1,2})[-.\\/]{full_month}(?:[-.\\/](\\d{2,4}))?", !0, ["date", "month", "year"], !0), no.addFormat("{full_month}[-.](\\d{4,4})", !1, ["month", "year"]), no.addFormat("\\/Date\\((\\d+(?:[+-]\\d{4,4})?)\\)\\/", !1, ["timestamp"]), no.addFormat(un(ho, no), !1, so), mo = no.compiledFormats.slice(0, 7).reverse(), no.compiledFormats = no.compiledFormats.slice(7).concat(mo)
    }

    function mn() {
      tn("f", function(t) {
        return P(t, "Milliseconds")
      }, !0), tn("s", function(t) {
        return P(t, "Seconds")
      }), tn("m", function(t) {
        return P(t, "Minutes")
      }), tn("h", function(t) {
        return P(t, "Hours") % 12 || 12
      }), tn("H", function(t) {
        return P(t, "Hours")
      }), tn("d", function(t) {
        return P(t, "Date")
      }), tn("M", function(t) {
        return P(t, "Month") + 1
      }), Je(), Qe(), Xe(), vo.ms = vo.f, vo.milliseconds = vo.f, vo.seconds = vo.s, vo.minutes = vo.m, vo.hours = vo.h, vo["24hr"] = vo.H, vo["12hr"] = vo.h, vo.date = vo.d, vo.day = vo.d, vo.year = vo.yyyy
    }

    function yn() {
      s(cr, !0, !0, "short,long,full", function(t, e) {
        t[e] = function(t) {
          return rn(this, e, !1, t)
        }
      })
    }

    function vn() {
      po.split("").forEach(function(t, e) {
        e > 9 && (e = Er(10, e - 9)), fo[t] = e
      }), k(fo, Vr), oo = ur("([\u671f\u9031\u5468])?([" + po + qr + "]+)(?!\u6628)", "g")
    }

    function gn() {
      var t = "today,yesterday,tomorrow,weekday,weekend,future,past".split(","),
        e = no.weekdays.slice(0, 7),
        n = no.months.slice(0, 12);
      s(cr, !0, !0, t.concat(e).concat(n), function(t, e) {
        t["is" + We(e)] = function(t) {
          return this.is(e, 0, t)
        }
      })
    }

    function wn() {
      cr.utc || (cr.utc = {
        create: function() {
          return ln(arguments, 0, !0)
        },
        past: function() {
          return ln(arguments, -1, !0)
        },
        future: function() {
          return ln(arguments, 1, !0)
        }
      })
    }

    function _n() {
      a(cr, !1, !0, {
        RFC1123: "{Dow}, {dd} {Mon} {yyyy} {HH}:{mm}:{ss} {tz}",
        RFC1036: "{Weekday}, {dd}-{Mon}-{yy} {HH}:{mm}:{ss} {tz}",
        ISO8601_DATE: "{yyyy}-{MM}-{dd}",
        ISO8601_DATETIME: "{yyyy}-{MM}-{dd}T{HH}:{mm}:{ss}.{fff}{isotz}"
      })
    }

    function bn(t, e) {
      function n() {
        return Wr(this * e)
      }

      function r() {
        return ln(arguments)[t.addMethod](this)
      }

      function o() {
        return ln(arguments)[t.addMethod](-this)
      }
      var i = t.name,
        a = {};
      a[i] = n, a[i + "s"] = n, a[i + "Before"] = o, a[i + "sBefore"] = o, a[i + "Ago"] = o, a[i + "sAgo"] = o, a[i + "After"] = r, a[i + "sAfter"] = r, a[i + "FromNow"] = r, a[i + "sFromNow"] = r, hr.extend(a)
    }

    function Cn(t, e) {
      this.start = xn(t), this.end = xn(e)
    }

    function kn(t) {
      return $r(t) ? t.charCodeAt(0) : t
    }

    function $n(t) {
      return null == t ? t : Tr(t) ? t.getTime() : t.valueOf()
    }

    function xn(t) {
      return Tr(t) ? new cr(t.getTime()) : $n(t)
    }

    function Tn(t) {
      var e = $n(t);
      return !!e || 0 === e
    }

    function Sn(t) {
      var e, n, r;
      return kr(t) ? t : (e = t.toLowerCase().match(/^(\d+)?\s?(\w+?)s?$/i), n = parseInt(e[1]) || 1, r = e[2].slice(0, 1).toUpperCase() + e[2].slice(1), r.match(/hour|minute|second/i) ? r += "s" : "Year" === r ? r = "FullYear" : "Day" === r && (r = "Date"), [n, r])
    }

    function Mn(t, e) {
      var n, r, o, i;
      return kr(e) ? new cr(t.getTime() + e) : (n = e[0], r = e[1], o = P(t, r), i = new cr(t.getTime()), z(i, r, o + n), i)
    }

    function Rn(t, e) {
      return lr.fromCharCode(t.charCodeAt(0) + e)
    }

    function Fn(t, e) {
      return t + e
    }

    function En(t, e, n, r, o) {
      1 / 0 !== e && (t.timers || (t.timers = []), kr(e) || (e = 1), t._canceled = !1, t.timers.push(setTimeout(function() {
        t._canceled || n.apply(r, o || [])
      }, e)))
    }

    function In(t, e, n, r, o, i) {
      var a, s, u, c = t.toFixed(20),
        l = c.search(/\./),
        h = c.search(/[1-9]/),
        d = l - h;
      return d > 0 && (d -= 1), s = Or(jr(Ar(d / 3), o === !1 ? n.length : o), -r), a = n.charAt(s + r - 1), -9 > d && (s = -3, e = Fr(d) - 9, a = n.slice(0, 1)), u = i ? Er(2, 10 * s) : Er(10, 3 * s), S(t / u, e || 0).format() + a.trim()
    }

    function An() {
      function t(t) {
        return function(e) {
          return e ? S(this, e, t) : t(this)
        }
      }
      a(hr, !0, !0, {
        ceil: t(Ir),
        round: t(Wr),
        floor: t(Ar)
      }), s(hr, !0, !0, "abs,pow,sin,asin,cos,acos,tan,atan,exp,pow,sqrt", function(t, e) {
        t[e] = function(t, n) {
          return dr[e](this, t, n)
        }
      })
    }

    function Wn(t, e, n, r) {
      var o, i, a, s, u = /^(.+?)(\[.*\])$/;
      (i = e.match(u)) ? (s = i[1], a = i[2].replace(/^\[|\]$/g, "").split("]["), a.forEach(function(e) {
        o = !e || e.match(/^\d+$/), !s && xr(t) && (s = t.length), v(t, s) || (t[s] = o ? [] : {}), t = t[s], s = e
      }), !s && o && (s = t.length.toString()), Wn(t, s, n, r)) : t[e] = r && "true" === n ? !0 : r && "false" === n ? !1 : n
    }

    function jn(t, e) {
      var n;
      return xr(e) || g(e) && e.toString === fr ? (n = [], b(e, function(e, r) {
        t && (e = t + "[" + e + "]"), n.push(jn(e, r))
      }), n.join("&")) : t ? On(t) + "=" + (Tr(e) ? e.getTime() : On(e)) : ""
    }

    function On(t) {
      return t || t === !1 || 0 === t ? encodeURIComponent(t).replace(/%20/g, "+") : ""
    }

    function Nn(t, e, n) {
      return Sr(t) ? t.test(e) : g(t) ? t[e] === n : e === lr(t)
    }

    function Pn(t, e, n) {
      var r, o = t instanceof T ? new T : {};
      return b(t, function(t, i) {
        r = !1, d(e, function(e) {
          Nn(e, t, i) && (r = !0)
        }, 1), r === n && (o[t] = i)
      }), o
    }

    function zn() {
      s(ar, !1, !0, br, function(t, e) {
        var n = "is" + e;
        _o.push(n), t[n] = wr[e]
      })
    }

    function Ln() {
      a(ar, !1, function() {
        return 0 === arguments.length
      }, {
        extend: function() {
          var t = _o.concat(bo);
          "undefined" != typeof eo && (t = t.concat(eo)), V(t, ar)
        }
      })
    }

    function Hn(t) {
      var e = lr.Inflector,
        t = e && e.acronyms[t];
      return $r(t) ? t : void 0
    }

    function Dn(t) {
      if (t = +t, 0 > t || 1 / 0 === t) throw new RangeError("Invalid number");
      return t
    }

    function Bn(t, e) {
      return I(f(e) ? e : " ", t)
    }

    function qn(t, e, n, r, o) {
      var i, a, s, u;
      if (t.length <= e) return t.toString();
      switch (r = m(r) ? "..." : r, n) {
        case "left":
          return a = o ? Vn(t, e, !0) : t.slice(t.length - e), r + a;
        case "middle":
          return s = Ir(e / 2), u = Ar(e / 2), i = o ? Vn(t, s) : t.slice(0, s), a = o ? Vn(t, u, !0) : t.slice(t.length - u), i + r + a;
        default:
          return i = o ? Vn(t, e) : t.slice(0, e), i + r
      }
    }

    function Vn(t, e, n) {
      if (n) return Vn(t.reverse(), e).reverse();
      var r = ur("(?=[" + E() + "])"),
        o = t.split(r),
        i = 0;
      return o.filter(function(t) {
        return i += t.length, e >= i
      }).join("")
    }

    function Un(t, e, n) {
      return $r(e) && (e = t.indexOf(e), -1 === e && (e = n ? t.length : 0)), e
    }

    function Gn(t) {
      if (pr.btoa) return Co = pr.btoa, void(ko = pr.atob);
      var e = /[^A-Za-z0-9\+\/\=]/g;
      Co = function(e) {
        var n, r, o, i, a, s, u, c = "",
          l = 0;
        do n = e.charCodeAt(l++), r = e.charCodeAt(l++), o = e.charCodeAt(l++), i = n >> 2, a = (3 & n) << 4 | r >> 4, s = (15 & r) << 2 | o >> 6, u = 63 & o, isNaN(r) ? s = u = 64 : isNaN(o) && (u = 64), c = c + t.charAt(i) + t.charAt(a) + t.charAt(s) + t.charAt(u), n = r = o = "", i = a = s = u = ""; while (l < e.length);
        return c
      }, ko = function(n) {
        var r, o, i, a, s, u, c, l = "",
          h = 0;
        if (n.match(e)) throw new Error("String contains invalid base64 characters");
        n = n.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        do a = t.indexOf(n.charAt(h++)), s = t.indexOf(n.charAt(h++)), u = t.indexOf(n.charAt(h++)), c = t.indexOf(n.charAt(h++)), r = a << 2 | s >> 4, o = (15 & s) << 4 | u >> 2, i = (3 & u) << 6 | c, l += F(r), 64 != u && (l += F(o)), 64 != c && (l += F(i)), r = o = i = "", a = s = u = c = ""; while (h < n.length);
        return l
      }
    }

    function Yn(t, e) {
      var n = t.indexOf(e);
      n > -1 && t.splice(n, 1)
    }

    function Jn(t, e, n) {
      $r(e) && Yn(Mo, e), Yn(Mo, n), t.unshift({
        rule: e,
        replacement: n
      })
    }

    function Qn(t, e) {
      return t == e || "all" == t || !t
    }

    function Xn(t) {
      return Mo.some(function(e) {
        return new ur("\\b" + e + "$", "i").test(t)
      })
    }

    function Zn(t, e) {
      return t = $r(t) ? t.toString() : "", t.isBlank() || Xn(t) ? t : Kn(t, e ? To : So)
    }

    function Kn(t, e) {
      return b(e, function(e, n) {
        return t.match(n.rule) ? (t = t.replace(n.rule, n.replacement), !1) : void 0
      }), t
    }

    function tr(t) {
      return t.replace(/^\W*[a-z]/, function(t) {
        return t.toUpperCase()
      })
    }

    function er() {
      Io.forEach(function(t) {
        var e = ur("^[" + t.source + "\\s]+$"),
          n = ur("[" + t.source + "]");
        t.names.forEach(function(t) {
          l(lr.prototype, "is" + t, function() {
            return e.test(this.trim())
          }), l(lr.prototype, "has" + t, function() {
            return n.test(this)
          })
        })
      })
    }

    function nr(t, e, n, r) {
      Eo || rr();
      var o = h(e).join(""),
        i = Eo[r];
      return o = o.replace(/all/, "").replace(/(\w)lphabet|umbers?|atakana|paces?|unctuation/g, "$1"), t.replace(n, function(t) {
        return !i[t] || o && !o.has(i[t].type) ? t : i[t].to
      })
    }

    function rr() {
      var t;
      Eo = {
        zenkaku: {},
        hankaku: {}
      }, Wo.forEach(function(t) {
        C(t.end - t.start + 1, function(e) {
          e += t.start, or(t.type, F(e), F(e + Ao))
        })
      }), Do.each(function(e, n) {
        t = Ho.charAt(n), or("k", t, e), e.match(zo) && or("k", t + "\uff9e", e.shift(1)), e.match(Lo) && or("k", t + "\uff9f", e.shift(2))
      }), Po.each(function(t, e) {
        or("p", No.charAt(e), t)
      }), or("k", "\uff73\uff9e", "\u30f4"), or("k", "\uff66\uff9e", "\u30fa"), or("s", " ", "\u3000")
    }

    function or(t, e, n) {
      Eo.zenkaku[e] = {
        type: t,
        to: n
      }, Eo.hankaku[n] = {
        type: t,
        to: e
      }
    }
    var ir, ar = Object,
      sr = Array,
      ur = RegExp,
      cr = Date,
      lr = String,
      hr = Number,
      dr = Math,
      pr = "undefined" != typeof global ? global : this,
      fr = ar.prototype.toString,
      mr = ar.prototype.hasOwnProperty,
      yr = ar.defineProperty && ar.defineProperties,
      vr = "function" == typeof ur(),
      gr = !("0" in new lr("a")),
      wr = {},
      _r = /^\[object Date|Array|String|Number|RegExp|Boolean|Arguments\]$/,
      br = "Boolean,Number,String,Array,Date,RegExp,Function".split(","),
      Cr = n("boolean", br[0]),
      kr = n("number", br[1]),
      $r = n("string", br[2]),
      xr = e(br[3]),
      Tr = e(br[4]),
      Sr = e(br[5]),
      Mr = e(br[6]);
    T.prototype.constructor = ar;
    var Rr, Fr = dr.abs,
      Er = dr.pow,
      Ir = dr.ceil,
      Ar = dr.floor,
      Wr = dr.round,
      jr = dr.min,
      Or = dr.max,
      Nr = 48,
      Pr = 57,
      zr = 65296,
      Lr = 65305,
      Hr = ".",
      Dr = "\uff0e",
      Br = ",",
      qr = "",
      Vr = {};
    o(), R(), a(ar, !1, !1, {
      keys: function(t) {
        var e = [];
        if (!g(t) && !Sr(t) && !Mr(t)) throw new TypeError("Object required");
        return b(t, function(t) {
          e.push(t)
        }), e
      }
    }), a(sr, !1, !1, {
      isArray: function(t) {
        return xr(t)
      }
    }), a(sr, !0, !1, {
      every: function(t, e) {
        var n = this.length,
          r = 0;
        for (J(arguments); n > r;) {
          if (r in this && !t.call(e, this[r], r, this)) return !1;
          r++
        }
        return !0
      },
      some: function(t, e) {
        var n = this.length,
          r = 0;
        for (J(arguments); n > r;) {
          if (r in this && t.call(e, this[r], r, this)) return !0;
          r++
        }
        return !1
      },
      map: function(t, e) {
        var e = arguments[1],
          n = this.length,
          r = 0,
          o = new Array(n);
        for (J(arguments); n > r;) r in this && (o[r] = t.call(e, this[r], r, this)), r++;
        return o
      },
      filter: function(t) {
        var e = arguments[1],
          n = this.length,
          r = 0,
          o = [];
        for (J(arguments); n > r;) r in this && t.call(e, this[r], r, this) && o.push(this[r]), r++;
        return o
      },
      indexOf: function(t) {
        var e = arguments[1];
        return $r(this) ? this.indexOf(t, e) : U(this, t, e, 1)
      },
      lastIndexOf: function(t) {
        var e = arguments[1];
        return $r(this) ? this.lastIndexOf(t, e) : U(this, t, e, -1)
      },
      forEach: function(t) {
        var e = this.length,
          n = 0,
          r = arguments[1];
        for (p(t); e > n;) n in this && t.call(r, this[n], n, this), n++
      },
      reduce: function(t) {
        return G(this, t, arguments[1])
      },
      reduceRight: function(t) {
        return G(this, t, arguments[1], !0)
      }
    }), a(Function, !0, !1, {
      bind: function(t) {
        var e, n = this,
          r = h(arguments, null, 1);
        if (!Mr(this)) throw new TypeError("Function.prototype.bind called on a non-function");
        return e = function() {
          return n.apply(n.prototype && this instanceof n ? this : t, r.concat(h(arguments)))
        }, e.prototype = this.prototype, e
      }
    }), a(cr, !1, !1, {
      now: function() {
        return (new cr).getTime()
      }
    }), Q(), X();
    var Ur = "AlphanumericSort",
      Gr = "AlphanumericSortOrder",
      Yr = "AlphanumericSortIgnore",
      Jr = "AlphanumericSortIgnoreCase",
      Qr = "AlphanumericSortEquivalents",
      Xr = "AlphanumericSortNatural";
    a(sr, !1, !0, {
      create: function() {
        var t = [];
        return h(arguments, function(e) {
          (me(e) || fe(e)) && (e = sr.prototype.slice.call(e, 0)), t = t.concat(e)
        }), t
      }
    }), a(sr, !0, !1, {
      find: function(t, e) {
        return p(t), le(this, t, 0, !1, !1, e)
      },
      findIndex: function(t, e) {
        var n;
        return p(t), n = le(this, t, 0, !1, !0, e), m(n) ? -1 : n
      }
    }), a(sr, !0, !0, {
      findFrom: function(t, e, n) {
        return le(this, t, e, n)
      },
      findIndexFrom: function(t, e, n) {
        var e = le(this, t, e, n, !0);
        return m(e) ? -1 : e
      },
      findAll: function(t, e, n) {
        var r, o = [];
        return this.length > 0 && (r = oe(t), ae(this, function(t, e, n) {
          r(t, e, n) && o.push(t)
        }, e, n)), o
      },
      count: function(t) {
        return m(t) ? this.length : this.findAll(t).length
      },
      removeAt: function(t, e) {
        return m(t) ? this : (m(e) && (e = t), this.splice(t, e - t + 1), this)
      },
      include: function(t, e) {
        return this.clone().add(t, e)
      },
      exclude: function() {
        return sr.prototype.remove.apply(this.clone(), arguments)
      },
      clone: function() {
        return k([], this)
      },
      unique: function(t) {
        return he(this, t)
      },
      flatten: function(t) {
        return pe(this, t)
      },
      union: function() {
        return he(this.concat(ye(arguments)))
      },
      intersect: function() {
        return de(this, ye(arguments), !1)
      },
      subtract: function() {
        return de(this, ye(arguments), !0)
      },
      at: function() {
        return B(this, arguments)
      },
      first: function(t) {
        return m(t) ? this[0] : (0 > t && (t = 0), this.slice(0, t))
      },
      last: function(t) {
        if (m(t)) return this[this.length - 1];
        var e = this.length - t < 0 ? 0 : this.length - t;
        return this.slice(e)
      },
      from: function(t) {
        return this.slice(t)
      },
      to: function(t) {
        return m(t) && (t = this.length), this.slice(0, t)
      },
      min: function(t, e) {
        return _e(this, t, "min", e)
      },
      max: function(t, e) {
        return _e(this, t, "max", e)
      },
      least: function(t, e) {
        return _e(this.groupBy.apply(this, [t]), "length", "min", e)
      },
      most: function(t, e) {
        return _e(this.groupBy.apply(this, [t]), "length", "max", e)
      },
      sum: function(t) {
        var e = t ? this.map(t) : this;
        return e.length > 0 ? e.reduce(function(t, e) {
          return t + e
        }) : 0
      },
      average: function(t) {
        var e = t ? this.map(t) : this;
        return e.length > 0 ? e.sum() / e.length : 0
      },
      inGroups: function(t, e) {
        var n = arguments.length > 1,
          r = this,
          o = [],
          i = Ir(this.length / t);
        return C(t, function(t) {
          var a = t * i,
            s = r.slice(a, a + i);
          n && s.length < i && C(i - s.length, function() {
            s = s.add(e)
          }), o.push(s)
        }), o
      },
      inGroupsOf: function(t, e) {
        var n, r = [],
          o = this.length,
          i = this;
        return 0 === o || 0 === t ? i : (m(t) && (t = 1), m(e) && (e = null), C(Ir(o / t), function(o) {
          for (n = i.slice(t * o, t * o + t); n.length < t;) n.push(e);
          r.push(n)
        }), r)
      },
      isEmpty: function() {
        return 0 == this.compact().length
      },
      sortBy: function(t, e) {
        var n = this.clone();
        return n.sort(function(r, o) {
          var i, a, s;
          return i = ie(r, t, n, [r]), a = ie(o, t, n, [o]), s = $r(i) && $r(a) ? be(i, a) : a > i ? -1 : i > a ? 1 : 0, s * (e ? -1 : 1)
        }), n
      },
      randomize: function() {
        for (var t, e, n = this.concat(), r = n.length; r;) t = dr.random() * r | 0, e = n[--r], n[r] = n[t], n[t] = e;
        return n
      },
      zip: function() {
        var t = h(arguments);
        return this.map(function(e, n) {
          return [e].concat(t.map(function(t) {
            return n in t ? t[n] : null
          }))
        })
      },
      sample: function(t) {
        var e = this.randomize();
        return arguments.length > 0 ? e.slice(0, t) : e[0]
      },
      each: function(t, e, n) {
        return ae(this, t, e, n), this
      },
      add: function(t, e) {
        return (!kr(hr(e)) || isNaN(e)) && (e = this.length), sr.prototype.splice.apply(this, [e, 0].concat(t)), this
      },
      remove: function() {
        var t = this;
        return h(arguments, function(e) {
          for (var n = 0, r = oe(e); n < t.length;) r(t[n], n, t) ? t.splice(n, 1) : n++
        }), t
      },
      compact: function(t) {
        var e = [];
        return ae(this, function(n) {
          xr(n) ? e.push(n.compact()) : t && n ? e.push(n) : t || null == n || n.valueOf() !== n.valueOf() || e.push(n)
        }), e
      },
      groupBy: function(t, e) {
        var n, r = this,
          o = {};
        return ae(r, function(e, i) {
          n = ie(e, t, r, [e, i, r]), o[n] || (o[n] = []), o[n].push(e)
        }), e && b(o, e), o
      },
      none: function() {
        return !this.any.apply(this, arguments)
      }
    }), a(sr, !0, !0, {
      all: sr.prototype.every,
      any: sr.prototype.some,
      insert: sr.prototype.add
    }), a(ar, !1, !0, {
      map: function(t, e) {
        var n, r, o = {};
        for (n in t) v(t, n) && (r = t[n], o[n] = ie(r, e, t, [n, r, t]));
        return o
      },
      reduce: function(t) {
        var e = Se(t).map(function(e) {
          return t[e]
        });
        return e.reduce.apply(e, h(arguments, null, 1))
      },
      each: function(t, e) {
        return p(e), b(t, e), t
      },
      size: function(t) {
        return Se(t).length
      }
    });
    var Zr = "any,all,none,count,find,findAll,isEmpty".split(","),
      Kr = "sum,average,min,max,least,most".split(","),
      to = "map,reduce,size".split(","),
      eo = Zr.concat(Kr).concat(to);
    xe(), Te(), Me(Zr), Me(Kr, !0), V(to, T), Re();
    var no, ro, oo, io, ao, so = ["ampm", "hour", "minute", "second", "ampm", "utc", "offset_sign", "offset_hours", "offset_minutes", "ampm"],
      uo = "(?:[,.]\\d+)?",
      co = "\\d{1,2}" + uo,
      lo = "[0-5]\\d" + uo,
      ho = "({t})?\\s*(" + co + ")(?:{h}(" + lo + ")?{m}(?::?(" + lo + "){s})?\\s*(?:({t})|(Z)|(?:([+-])(\\d{2,2})(?::?(\\d{2,2}))?)?)?|\\s*({t}))",
      po = "\u3007\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u5341\u767e\u5343\u4e07",
      fo = {},
      mo = [],
      yo = {},
      vo = {
        yyyy: function(t) {
          return P(t, "FullYear")
        },
        yy: function(t) {
          return P(t, "FullYear") % 100
        },
        ord: function(t) {
          var e = P(t, "Date");
          return e + j(e)
        },
        tz: function(t) {
          return t.getUTCOffset()
        },
        isotz: function(t) {
          return t.getUTCOffset(!0)
        },
        Z: function(t) {
          return t.getUTCOffset()
        },
        ZZ: function(t) {
          return t.getUTCOffset().replace(/(\d{2})$/, ":$1")
        }
      },
      go = [{
        name: "year",
        method: "FullYear",
        ambiguous: !0,
        multiplier: function(t) {
          var e = t ? t.isLeapYear() ? 1 : 0 : .25;
          return 24 * (365 + e) * 60 * 60 * 1e3
        }
      }, {
        name: "month",
        error: .919,
        method: "Month",
        ambiguous: !0,
        multiplier: function(t, e) {
          var n, r = 30.4375;
          return t && (n = t.daysInMonth(), e <= n.days() && (r = n)), 24 * r * 60 * 60 * 1e3
        }
      }, {
        name: "week",
        method: "ISOWeek",
        multiplier: function() {
          return 6048e5
        }
      }, {
        name: "day",
        error: .958,
        method: "Date",
        ambiguous: !0,
        multiplier: function() {
          return 864e5
        }
      }, {
        name: "hour",
        method: "Hours",
        multiplier: function() {
          return 36e5
        }
      }, {
        name: "minute",
        method: "Minutes",
        multiplier: function() {
          return 6e4
        }
      }, {
        name: "second",
        method: "Seconds",
        multiplier: function() {
          return 1e3
        }
      }, {
        name: "millisecond",
        method: "Milliseconds",
        multiplier: function() {
          return 1
        }
      }],
      wo = {};
    Fe.prototype = {
      getMonth: function(t) {
        return kr(t) ? t - 1 : this.months.indexOf(t) % 12
      },
      getWeekday: function(t) {
        return this.weekdays.indexOf(t) % 7
      },
      getNumber: function(t) {
        var e;
        return kr(t) ? t : t && -1 !== (e = this.numbers.indexOf(t)) ? (e + 1) % 10 : 1
      },
      getNumericDate: function(t) {
        var e = this;
        return t.replace(ur(this.num, "g"), function(t) {
          var n = e.getNumber(t);
          return n || ""
        })
      },
      getUnitIndex: function(t) {
        return this.units.indexOf(t) % 8
      },
      getRelativeFormat: function(t) {
        return this.convertAdjustedToFormat(t, t[2] > 0 ? "future" : "past")
      },
      getDuration: function(t) {
        return this.convertAdjustedToFormat(Ue(t), "duration")
      },
      hasVariant: function(t) {
        return t = t || this.code, "en" === t || "en-US" === t ? !0 : this.variant
      },
      matchAM: function(t) {
        return t === this.ampm[0]
      },
      matchPM: function(t) {
        return t && t === this.ampm[1]
      },
      convertAdjustedToFormat: function(t, e) {
        var n, r, o, i = t[0],
          a = t[1],
          s = t[2],
          u = this[e] || this.relative;
        return Mr(u) ? u.call(this, i, a, s, e) : (o = this.plural && i > 1 ? 1 : 0, r = this.units[8 * o + a] || this.units[a], this.capitalizeUnit && (r = We(r)), n = this.modifiers.filter(function(t) {
          return "sign" == t.name && t.value == (s > 0 ? 1 : -1)
        })[0], u.replace(/\{(.*?)\}/g, function(t, e) {
          switch (e) {
            case "num":
              return i;
            case "unit":
              return r;
            case "sign":
              return n.src
          }
        }))
      },
      getFormats: function() {
        return this.cachedFormat ? [this.cachedFormat].concat(this.compiledFormats) : this.compiledFormats
      },
      addFormat: function(t, e, n, r, o) {
        var i, a, s, u = n || [],
          c = this;
        t = t.replace(/\s+/g, "[,. ]*"), t = t.replace(/\{([^,]+?)\}/g, function(t, e) {
          var r, o, i, a = e.match(/\?$/),
            s = e.match(/^(\d+)\??$/),
            l = e.match(/(\d)(?:-(\d))?/),
            h = e.replace(/[^a-z]+$/, "");
          return s ? r = c.tokens[s[1]] : c[h] ? r = c[h] : c[h + "s"] && (r = c[h + "s"], l && (o = [], r.forEach(function(t, e) {
            var n = e % (c.units ? 8 : r.length);
            n >= l[1] && n <= (l[2] || l[1]) && o.push(t)
          }), r = o), r = je(r)), s ? i = "(?:" + r + ")" : (n || u.push(h), i = "(" + r + ")"), a && (i += "?"), i
        }), e ? (i = un(ho, c, o), a = ["t", "[\\s\\u3000]"].concat(c.timeMarker), s = t.match(/\\d\{\d,\d\}\)+\??$/), Ae(c, "(?:" + i + ")[,\\s\\u3000]+?" + t, so.concat(u), r), Ae(c, t + "(?:[,\\s]*(?:" + a.join("|") + (s ? "+" : "*") + ")" + i + ")?", u.concat(so), r)) : Ae(c, t, u, r)
      }
    }, a(cr, !1, !0, {
      create: function() {
        return ln(arguments)
      },
      past: function() {
        return ln(arguments, -1)
      },
      future: function() {
        return ln(arguments, 1)
      },
      addLocale: function(t, e) {
        return Ie(t, e)
      },
      setLocale: function(t) {
        var e = Ee(t, !1);
        return ro = e, t && t != e.code && (e.code = t), e
      },
      getLocale: function(t) {
        return t ? Ee(t, !1) : ro
      },
      addFormat: function(t, e, n) {
        Ae(Ee(n), t, e)
      }
    }), a(cr, !0, !0, {
      set: function() {
        var t = Ne(arguments);
        return sn(this, t[0], t[1])
      },
      setWeekday: function(t) {
        return m(t) ? void 0 : z(this, "Date", P(this, "Date") + t - P(this, "Day"))
      },
      setISOWeek: function(t) {
        var e = P(this, "Day") || 7;
        if (!m(t)) return this.set({
          month: 0,
          date: 4
        }), this.set({
          weekday: 1
        }), t > 1 && this.addWeeks(t - 1), 1 !== e && this.advance({
          days: e - 1
        }), this.getTime()
      },
      getISOWeek: function() {
        return Ve(this)
      },
      beginningOfISOWeek: function() {
        var t = this.getDay();
        return 0 === t ? t = -6 : 1 !== t && (t = 1), this.setWeekday(t), this.reset()
      },
      endOfISOWeek: function() {
        return 0 !== this.getDay() && this.setWeekday(7), this.endOfDay()
      },
      getUTCOffset: function(t) {
        var e = this._utc ? 0 : this.getTimezoneOffset(),
          n = t === !0 ? ":" : "";
        return !e && t ? "Z" : W(Ar(-e / 60), 2, !0) + n + W(Fr(e % 60), 2)
      },
      utc: function(t) {
        return l(this, "_utc", t === !0 || 0 === arguments.length), this
      },
      isUTC: function() {
        return !!this._utc || 0 === this.getTimezoneOffset()
      },
      advance: function() {
        var t = Ne(arguments, !0);
        return sn(this, t[0], t[1], 1)
      },
      rewind: function() {
        var t = Ne(arguments, !0);
        return sn(this, t[0], t[1], -1)
      },
      isValid: function() {
        return !isNaN(this.getTime())
      },
      isAfter: function(t, e) {
        return this.getTime() > cr.create(t).getTime() - (e || 0)
      },
      isBefore: function(t, e) {
        return this.getTime() < cr.create(t).getTime() + (e || 0)
      },
      isBetween: function(t, e, n) {
        var r = this.getTime(),
          o = cr.create(t).getTime(),
          i = cr.create(e).getTime(),
          a = jr(o, i),
          s = Or(o, i);
        return n = n || 0, r > a - n && s + n > r
      },
      isLeapYear: function() {
        var t = P(this, "FullYear");
        return t % 4 === 0 && t % 100 !== 0 || t % 400 === 0
      },
      daysInMonth: function() {
        return 32 - P(new cr(P(this, "FullYear"), P(this, "Month"), 32), "Date")
      },
      format: function(t, e) {
        return rn(this, t, !1, e)
      },
      relative: function(t, e) {
        return $r(t) && (e = t, t = null), rn(this, t, !0, e)
      },
      is: function(t, e, n) {
        var r, o;
        if (this.isValid()) {
          if ($r(t)) switch (t = t.trim().toLowerCase(), o = this.clone().utc(n), !0) {
            case "future" === t:
              return this.getTime() > Oe().getTime();
            case "past" === t:
              return this.getTime() < Oe().getTime();
            case "weekday" === t:
              return P(o, "Day") > 0 && P(o, "Day") < 6;
            case "weekend" === t:
              return 0 === P(o, "Day") || 6 === P(o, "Day");
            case (r = no.weekdays.indexOf(t) % 7) > -1:
              return P(o, "Day") === r;
            case (r = no.months.indexOf(t) % 12) > -1:
              return P(o, "Month") === r
          }
          return on(this, t, null, e, n)
        }
      },
      reset: function(t) {
        var e, n = {};
        return t = t || "hours", "date" === t && (t = "days"), e = go.some(function(e) {
          return t === e.name || t === e.name + "s"
        }), n[t] = t.match(/^days?/) ? 1 : 0, e ? this.set(n, !0) : this
      },
      clone: function() {
        var t = new cr(this.getTime());
        return t.utc(!!this._utc), t
      }
    }), a(cr, !0, !0, {
      iso: function() {
        return this.toISOString()
      },
      getWeekday: cr.prototype.getDay,
      getUTCWeekday: cr.prototype.getUTCDay
    }), a(hr, !0, !0, {
      duration: function(t) {
        return Ee(t).getDuration(this)
      }
    }), no = ro = cr.addLocale("en", {
      plural: !0,
      timeMarker: "at",
      ampm: "am,pm",
      months: "January,February,March,April,May,June,July,August,September,October,November,December",
      weekdays: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday",
      units: "millisecond:|s,second:|s,minute:|s,hour:|s,day:|s,week:|s,month:|s,year:|s",
      numbers: "one,two,three,four,five,six,seven,eight,nine,ten",
      articles: "a,an,the",
      tokens: "the,st|nd|rd|th,of",
      "short": "{Month} {d}, {yyyy}",
      "long": "{Month} {d}, {yyyy} {h}:{mm}{tt}",
      full: "{Weekday} {Month} {d}, {yyyy} {h}:{mm}:{ss}{tt}",
      past: "{num} {unit} {sign}",
      future: "{num} {unit} {sign}",
      duration: "{num} {unit}",
      modifiers: [{
        name: "sign",
        src: "ago|before",
        value: -1
      }, {
        name: "sign",
        src: "from now|after|from|in|later",
        value: 1
      }, {
        name: "edge",
        src: "last day",
        value: -2
      }, {
        name: "edge",
        src: "end",
        value: -1
      }, {
        name: "edge",
        src: "first day|beginning",
        value: 1
      }, {
        name: "shift",
        src: "last",
        value: -1
      }, {
        name: "shift",
        src: "the|this",
        value: 0
      }, {
        name: "shift",
        src: "next",
        value: 1
      }],
      dateParse: ["{month} {year}", "{shift} {unit=5-7}", "{0?} {date}{1}", "{0?} {edge} of {shift?} {unit=4-7?}{month?}{year?}"],
      timeParse: ["{num} {unit} {sign}", "{sign} {num} {unit}", "{0} {num}{1} {day} of {month} {year?}", "{weekday?} {month} {date}{1?} {year?}", "{date} {month} {year}", "{date} {month}", "{shift} {weekday}", "{shift} week {weekday}", "{weekday} {2?} {shift} week", "{num} {unit=4-5} {sign} {day}", "{0?} {date}{1} of {month}", "{0?}{month?} {date?}{1?} of {shift} {unit=6-7}"]
    }), dn(), pn(), fn(), mn(), yn(), vn(), gn(), wn(), _n(), Cn.prototype.toString = function() {
      return this.isValid() ? this.start + ".." + this.end : "Invalid Range"
    }, a(Cn, !0, !0, {
      isValid: function() {
        return Tn(this.start) && Tn(this.end) && typeof this.start == typeof this.end
      },
      span: function() {
        return this.isValid() ? Fr(kn(this.end) - kn(this.start)) + 1 : 0 / 0
      },
      contains: function(t) {
        return null == t ? !1 : t.start && t.end ? t.start >= this.start && t.start <= this.end && t.end >= this.start && t.end <= this.end : t >= this.start && t <= this.end
      },
      every: function(t, e) {
        var n, r = this.start,
          o = this.end,
          i = r > o,
          a = r,
          s = 0,
          u = [];
        for (Mr(t) && (e = t, t = null), t = t || 1, kr(r) ? n = Fn : $r(r) ? n = Rn : Tr(r) && (t = Sn(t), n = Mn), i && t > 0 && (t *= -1); i ? a >= o : o >= a;) u.push(a), e && e(a, s), a = n(a, t), s++;
        return u
      },
      union: function(t) {
        return new Cn(this.start < t.start ? this.start : t.start, this.end > t.end ? this.end : t.end)
      },
      intersect: function(t) {
        return t.start > this.end || t.end < this.start ? new Cn(0 / 0, 0 / 0) : new Cn(this.start > t.start ? this.start : t.start, this.end < t.end ? this.end : t.end)
      },
      clone: function() {
        return new Cn(this.start, this.end)
      },
      clamp: function(t) {
        var e, n = this.start,
          r = this.end,
          o = n > r ? r : n,
          i = n > r ? n : r;
        return e = o > t ? o : t > i ? i : t, xn(e)
      }
    }), [hr, lr, cr].forEach(function(t) {
      a(t, !1, !0, {
        range: function(e, n) {
          return t.create && (e = t.create(e), n = t.create(n)), new Cn(e, n)
        }
      })
    }), a(hr, !0, !0, {
      upto: function(t, e, n) {
        return hr.range(this, t).every(n, e)
      },
      clamp: function(t, e) {
        return new Cn(t, e).clamp(this)
      },
      cap: function(t) {
        return this.clamp(ir, t)
      }
    }), a(hr, !0, !0, {
      downto: hr.prototype.upto
    }), a(sr, !1, function(t) {
      return t instanceof Cn
    }, {
      create: function(t) {
        return t.every()
      }
    }), a(Function, !0, !0, {
      lazy: function(t, e, n) {
        function r() {
          return c.length < n - (l && e ? 1 : 0) && c.push([this, arguments]), l || (l = !0, e ? o() : En(r, i, o)), s
        }
        var o, i, a, s, u = this,
          c = [],
          l = !1;
        return t = t || 1, n = n || 1 / 0, i = Ir(t), a = Wr(i / t) || 1, o = function() {
          var t, e = c.length;
          if (0 != e) {
            for (t = Or(e - a, 0); e > t;) s = Function.prototype.apply.apply(u, c.shift()), e--;
            En(r, i, function() {
              l = !1, o()
            })
          }
        }, r
      },
      throttle: function(t) {
        return this.lazy(t, !0, 1)
      },
      debounce: function(t) {
        function e() {
          e.cancel(), En(e, t, n, this, arguments)
        }
        var n = this;
        return e
      },
      delay: function(t) {
        var e = this,
          n = h(arguments, null, 1);
        return En(e, t, e, e, n), e
      },
      every: function(t) {
        function e() {
          n.apply(n, r), En(n, t, e)
        }
        var n = this,
          r = arguments;
        return r = r.length > 1 ? h(r, null, 1) : [], En(n, t, e), n
      },
      cancel: function() {
        var t, e = this.timers;
        if (xr(e))
          for (; t = e.shift();) clearTimeout(t);
        return this._canceled = !0, this
      },
      after: function(t) {
        var e = this,
          n = 0,
          r = [];
        if (kr(t)) {
          if (0 === t) return e.call(), e
        } else t = 1;
        return function() {
          var o;
          return r.push(h(arguments)), n++, n == t ? (o = e.call(this, r), n = 0, r = [], o) : void 0
        }
      },
      once: function() {
        return this.throttle(1 / 0, !0)
      },
      fill: function() {
        var t = this,
          e = h(arguments);
        return function() {
          var n = h(arguments);
          return e.forEach(function(t, e) {
            (null != t || e >= n.length) && n.splice(e, 0, t)
          }), t.apply(this, n)
        }
      }
    }), a(hr, !1, !0, {
      random: function(t, e) {
        var n, r;
        return 1 == arguments.length && (e = t, t = 0), n = jr(t || 0, m(e) ? 1 : e), r = Or(t || 0, m(e) ? 1 : e) + 1, Ar(dr.random() * (r - n) + n)
      }
    }), a(hr, !0, !0, {
      log: function(t) {
        return dr.log(this) / (t ? dr.log(t) : 1)
      },
      abbr: function(t) {
        return In(this, t, "kmbt", 0, 4)
      },
      metric: function(t, e) {
        return In(this, t, "n\u03bcm kMGTPE", 4, m(e) ? 1 : e)
      },
      bytes: function(t, e) {
        return In(this, t, "kMGTPE", 0, m(e) ? 4 : e, !0) + "B"
      },
      isInteger: function() {
        return this % 1 == 0
      },
      isOdd: function() {
        return !isNaN(this) && !this.isMultipleOf(2)
      },
      isEven: function() {
        return this.isMultipleOf(2)
      },
      isMultipleOf: function(t) {
        return this % t === 0
      },
      format: function(t, e, n) {
        var r, o, i, a, s, u = "";
        for (m(e) && (e = ","), m(n) && (n = "."), o = (kr(t) ? S(this, t || 0).toFixed(Or(t, 0)) : this.toString()).replace(/^-/, ""), i = o.split("."), a = i[0], s = i[1], r = a.length; r > 0; r -= 3) r < a.length && (u = e + u), u = a.slice(Or(0, r - 3), r) + u;
        return s && (u += n + I("0", (t || 0) - s.length) + s), (0 > this ? "-" : "") + u
      },
      hex: function(t) {
        return this.pad(t || 1, !1, 16)
      },
      times: function(t) {
        if (t)
          for (var e = 0; this > e; e++) t.call(this, e);
        return this.toNumber()
      },
      chr: function() {
        return lr.fromCharCode(this)
      },
      pad: function(t, e, n) {
        return W(this, t, e, n)
      },
      ordinalize: function() {
        var t = Fr(this),
          e = parseInt(t.toString().slice(-2));
        return this + j(e)
      },
      toNumber: function() {
        return parseFloat(this, 10)
      }
    }), An();
    var _o = "isObject,isNaN".split(","),
      bo = "keys,values,select,reject,each,merge,clone,equal,watch,tap,has,toQueryString".split(",");
    a(ar, !1, !0, {
      watch: function(t, e, n) {
        if (yr) {
          var r = t[e];
          ar.defineProperty(t, e, {
            enumerable: !0,
            configurable: !0,
            get: function() {
              return r
            },
            set: function(o) {
              r = n.call(t, e, r, o)
            }
          })
        }
      }
    }), a(ar, !1, function() {
      return arguments.length > 1
    }, {
      keys: function(t, e) {
        var n = ar.keys(t);
        return n.forEach(function(n) {
          e.call(t, n, t[n])
        }), n
      }
    }), a(ar, !1, !0, {
      isObject: function(t) {
        return _(t)
      },
      isNaN: function(t) {
        return kr(t) && t.valueOf() !== t.valueOf()
      },
      equal: function(t, e) {
        return H(t, e)
      },
      extended: function(t) {
        return new T(t)
      },
      merge: function(t, e, n, r) {
        var o, i, a, s, u, c, l;
        if (t && "string" != typeof e)
          for (o in e)
            if (v(e, o) && t) {
              if (s = e[o], u = t[o], c = f(u), i = g(s), a = g(u), l = c && r === !1 ? u : s, c && Mr(r) && (l = r.call(e, o, u, s)), n && (i || a))
                if (Tr(s)) l = new cr(s.getTime());
                else {
                  if (!Sr(s)) {
                    a || (t[o] = sr.isArray(s) ? [] : {}), ar.merge(t[o], s, n, r);
                    continue
                  }
                  l = new ur(s.source, O(s))
                }
              t[o] = l
            }
        return t
      },
      values: function(t, e) {
        var n = [];
        return b(t, function(r, o) {
          n.push(o), e && e.call(t, o)
        }), n
      },
      clone: function(t, e) {
        var n, o;
        if (!g(t)) return t;
        if (o = r(t), Tr(t, o) && t.clone) return t.clone();
        if (Tr(t, o) || Sr(t, o)) return new t.constructor(t);
        if (t instanceof T) n = new T;
        else if (xr(t, o)) n = [];
        else {
          if (!_(t, o)) throw new TypeError("Clone must be a basic data type.");
          n = {}
        }
        return ar.merge(n, t, e)
      },
      fromQueryString: function(t, e) {
        var n = ar.extended();
        return t = t && t.toString ? t.toString() : "", t.replace(/^.*?\?/, "").split("&").forEach(function(t) {
          var r = t.split("=");
          2 === r.length && Wn(n, r[0], decodeURIComponent(r[1]), e)
        }), n
      },
      toQueryString: function(t, e) {
        return jn(e, t)
      },
      tap: function(t, e) {
        var n = e;
        return Mr(e) || (n = function() {
          e && t[e]()
        }), n.call(t, t), t
      },
      has: function(t, e) {
        return v(t, e)
      },
      select: function(t) {
        return Pn(t, arguments, !0)
      },
      reject: function(t) {
        return Pn(t, arguments, !1)
      }
    }), zn(), Ln(), V(bo, T), a(ur, !1, !0, {
      escape: function(t) {
        return N(t)
      }
    }), a(ur, !0, !0, {
      getFlags: function() {
        return O(this)
      },
      setFlags: function(t) {
        return ur(this.source, t)
      },
      addFlag: function(t) {
        return this.setFlags(O(this, t))
      },
      removeFlag: function(t) {
        return this.setFlags(O(this).replace(t, ""))
      }
    });
    var Co, ko;
    a(lr, !0, !1, {
      repeat: function(t) {
        return t = Dn(t), I(this, t)
      }
    }), a(lr, !0, function(t) {
      return Sr(t) || arguments.length > 2
    }, {
      startsWith: function(t) {
        var e, n = arguments,
          r = n[1],
          o = n[2],
          i = this;
        return r && (i = i.slice(r)), m(o) && (o = !0), e = Sr(t) ? t.source.replace("^", "") : N(t), ur("^" + e, o ? "" : "i").test(i)
      },
      endsWith: function(t) {
        var e, n = arguments,
          r = n[1],
          o = n[2],
          i = this;
        return f(r) && (i = i.slice(0, r)), m(o) && (o = !0), e = Sr(t) ? t.source.replace("$", "") : N(t), ur(e + "$", o ? "" : "i").test(i)
      }
    }), a(lr, !0, !0, {
      escapeRegExp: function() {
        return N(this)
      },
      escapeURL: function(t) {
        return t ? encodeURIComponent(this) : encodeURI(this)
      },
      unescapeURL: function(t) {
        return t ? decodeURI(this) : decodeURIComponent(this)
      },
      escapeHTML: function() {
        return this.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/\//g, "&#x2f;")
      },
      unescapeHTML: function() {
        return this.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&#x2f;/g, "/").replace(/&amp;/g, "&")
      },
      encodeBase64: function() {
        return Co(unescape(encodeURIComponent(this)))
      },
      decodeBase64: function() {
        return decodeURIComponent(escape(ko(this)))
      },
      each: function(t, e) {
        var n, r, o;
        if (Mr(t) ? (e = t, t = /[\s\S]/g) : t ? $r(t) ? t = ur(N(t), "gi") : Sr(t) && (t = ur(t.source, O(t, "g"))) : t = /[\s\S]/g, n = this.match(t) || [], e)
          for (r = 0, o = n.length; o > r; r++) n[r] = e.call(this, n[r], r, n) || n[r];
        return n
      },
      shift: function(t) {
        var e = "";
        return t = t || 0, this.codes(function(n) {
          e += F(n + t)
        }), e
      },
      codes: function(t) {
        var e, n, r = [];
        for (e = 0, n = this.length; n > e; e++) {
          var o = this.charCodeAt(e);
          r.push(o), t && t.call(this, o, e)
        }
        return r
      },
      chars: function(t) {
        return this.each(t)
      },
      words: function(t) {
        return this.trim().each(/\S+/g, t)
      },
      lines: function(t) {
        return this.trim().each(/^.*$/gm, t)
      },
      paragraphs: function(t) {
        var e = this.trim().split(/[\r\n]{2,}/);
        return e = e.map(function(e) {
          if (t) var n = t.call(e);
          return n ? n : e
        })
      },
      isBlank: function() {
        return 0 === this.trim().length
      },
      has: function(t) {
        return -1 !== this.search(Sr(t) ? t : N(t))
      },
      add: function(t, e) {
        return e = m(e) ? this.length : e, this.slice(0, e) + t + this.slice(e)
      },
      remove: function(t) {
        return this.replace(t, "")
      },
      reverse: function() {
        return this.split("").reverse().join("")
      },
      compact: function() {
        return this.trim().replace(/([\r\n\s\u3000])+/g, function(t, e) {
          return "\u3000" === e ? e : " "
        })
      },
      at: function() {
        return B(this, arguments, !0)
      },
      from: function(t) {
        return this.slice(Un(this, t, !0))
      },
      to: function(t) {
        return m(t) && (t = this.length), this.slice(0, Un(this, t))
      },
      dasherize: function() {
        return this.underscore().replace(/_/g, "-")
      },
      underscore: function() {
        return this.replace(/[-\s]+/g, "_").replace(lr.Inflector && lr.Inflector.acronymRegExp, function(t, e) {
          return (e > 0 ? "_" : "") + t.toLowerCase()
        }).replace(/([A-Z\d]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").toLowerCase()
      },
      camelize: function(t) {
        return this.underscore().replace(/(^|_)([^_]+)/g, function(e, n, r, o) {
          var i = Hn(r),
            a = t !== !1 || o > 0;
          return i ? a ? i : i.toLowerCase() : a ? r.capitalize() : r
        })
      },
      spacify: function() {
        return this.underscore().replace(/_/g, " ")
      },
      stripTags: function() {
        var t = this,
          e = arguments.length > 0 ? arguments : [""];
        return d(e, function(e) {
          t = t.replace(ur("</?" + N(e) + "[^<>]*>", "gi"), "")
        }), t
      },
      removeTags: function() {
        var t = this,
          e = arguments.length > 0 ? arguments : ["\\S+"];
        return d(e, function(e) {
          var n = ur("<(" + e + ")[^<>]*(?:\\/>|>.*?<\\/\\1>)", "gi");
          t = t.replace(n, "")
        }), t
      },
      truncate: function(t, e, n) {
        return qn(this, t, e, n)
      },
      truncateOnWord: function(t, e, n) {
        return qn(this, t, e, n, !0)
      },
      pad: function(t, e) {
        var n, r, o;
        return t = Dn(t), n = Or(0, t - this.length) / 2, r = Ar(n), o = Ir(n), Bn(r, e) + this + Bn(o, e)
      },
      padLeft: function(t, e) {
        return t = Dn(t), Bn(Or(0, t - this.length), e) + this
      },
      padRight: function(t, e) {
        return t = Dn(t), this + Bn(Or(0, t - this.length), e)
      },
      first: function(t) {
        return m(t) && (t = 1), this.substr(0, t)
      },
      last: function(t) {
        m(t) && (t = 1);
        var e = this.length - t < 0 ? 0 : this.length - t;
        return this.substr(e)
      },
      toNumber: function(t) {
        return A(this, t)
      },
      capitalize: function(t) {
        var e;
        return this.toLowerCase().replace(t ? /[^']/g : /^\S/, function(t) {
          var n, r = t.toUpperCase();
          return n = e ? t : r, e = r !== t, n
        })
      },
      assign: function() {
        var t = {};
        return d(arguments, function(e, n) {
          g(e) ? k(t, e) : t[n + 1] = e
        }), this.replace(/\{([^{]+?)\}/g, function(e, n) {
          return v(t, n) ? t[n] : e
        })
      }
    }), a(lr, !0, !0, {
      insert: lr.prototype.add
    }), Gn("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=");
    var $o, xo, To = [],
      So = [],
      Mo = [],
      Ro = [],
      Fo = {};
    xo = {
      acronym: function(t) {
        Fo[t.toLowerCase()] = t;
        var e = ar.keys(Fo).map(function(t) {
          return Fo[t]
        });
        xo.acronymRegExp = ur(e.join("|"), "g")
      },
      plural: function(t, e) {
        Jn(To, t, e)
      },
      singular: function(t, e) {
        Jn(So, t, e)
      },
      irregular: function(t, e) {
        var n = t.first(),
          r = t.from(1),
          o = e.first(),
          i = e.from(1),
          a = o.toUpperCase(),
          s = o.toLowerCase(),
          u = n.toUpperCase(),
          c = n.toLowerCase();
        Yn(Mo, t), Yn(Mo, e), u == a ? (xo.plural(new ur("({1}){2}$".assign(n, r), "i"), "$1" + i), xo.plural(new ur("({1}){2}$".assign(o, i), "i"), "$1" + i), xo.singular(new ur("({1}){2}$".assign(o, i), "i"), "$1" + r)) : (xo.plural(new ur("{1}{2}$".assign(u, r)), a + i), xo.plural(new ur("{1}{2}$".assign(c, r)), s + i), xo.plural(new ur("{1}{2}$".assign(a, i)), a + i), xo.plural(new ur("{1}{2}$".assign(s, i)), s + i), xo.singular(new ur("{1}{2}$".assign(a, i)), u + r), xo.singular(new ur("{1}{2}$".assign(s, i)), c + r))
      },
      uncountable: function(t) {
        var e = sr.isArray(t) ? t : h(arguments);
        Mo = Mo.concat(e)
      },
      human: function(t, e) {
        Ro.unshift({
          rule: t,
          replacement: e
        })
      },
      clear: function(t) {
        Qn(t, "singulars") && (So = []), Qn(t, "plurals") && (To = []), Qn(t, "uncountables") && (Mo = []), Qn(t, "humans") && (Ro = []), Qn(t, "acronyms") && (Fo = {})
      }
    }, $o = ["and", "or", "nor", "a", "an", "the", "so", "but", "to", "of", "at", "by", "from", "into", "on", "onto", "off", "out", "in", "over", "with", "for"], xo.plural(/$/, "s"), xo.plural(/s$/gi, "s"), xo.plural(/(ax|test)is$/gi, "$1es"), xo.plural(/(octop|vir|fung|foc|radi|alumn)(i|us)$/gi, "$1i"), xo.plural(/(census|alias|status)$/gi, "$1es"), xo.plural(/(bu)s$/gi, "$1ses"), xo.plural(/(buffal|tomat)o$/gi, "$1oes"), xo.plural(/([ti])um$/gi, "$1a"), xo.plural(/([ti])a$/gi, "$1a"), xo.plural(/sis$/gi, "ses"), xo.plural(/f+e?$/gi, "ves"), xo.plural(/(cuff|roof)$/gi, "$1s"), xo.plural(/([ht]ive)$/gi, "$1s"), xo.plural(/([^aeiouy]o)$/gi, "$1es"), xo.plural(/([^aeiouy]|qu)y$/gi, "$1ies"), xo.plural(/(x|ch|ss|sh)$/gi, "$1es"), xo.plural(/(matr|vert|ind)(?:ix|ex)$/gi, "$1ices"), xo.plural(/([ml])ouse$/gi, "$1ice"), xo.plural(/([ml])ice$/gi, "$1ice"), xo.plural(/^(ox)$/gi, "$1en"), xo.plural(/^(oxen)$/gi, "$1"), xo.plural(/(quiz)$/gi, "$1zes"), xo.plural(/(phot|cant|hom|zer|pian|portic|pr|quart|kimon)o$/gi, "$1os"), xo.plural(/(craft)$/gi, "$1"), xo.plural(/([ft])[eo]{2}(th?)$/gi, "$1ee$2"), xo.singular(/s$/gi, ""), xo.singular(/([pst][aiu]s)$/gi, "$1"), xo.singular(/([aeiouy])ss$/gi, "$1ss"), xo.singular(/(n)ews$/gi, "$1ews"), xo.singular(/([ti])a$/gi, "$1um"), xo.singular(/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$/gi, "$1$2sis"), xo.singular(/(^analy)ses$/gi, "$1sis"), xo.singular(/(i)(f|ves)$/i, "$1fe"), xo.singular(/([aeolr]f?)(f|ves)$/i, "$1f"), xo.singular(/([ht]ive)s$/gi, "$1"), xo.singular(/([^aeiouy]|qu)ies$/gi, "$1y"), xo.singular(/(s)eries$/gi, "$1eries"), xo.singular(/(m)ovies$/gi, "$1ovie"), xo.singular(/(x|ch|ss|sh)es$/gi, "$1"), xo.singular(/([ml])(ous|ic)e$/gi, "$1ouse"), xo.singular(/(bus)(es)?$/gi, "$1"), xo.singular(/(o)es$/gi, "$1"), xo.singular(/(shoe)s?$/gi, "$1"), xo.singular(/(cris|ax|test)[ie]s$/gi, "$1is"), xo.singular(/(octop|vir|fung|foc|radi|alumn)(i|us)$/gi, "$1us"), xo.singular(/(census|alias|status)(es)?$/gi, "$1"), xo.singular(/^(ox)(en)?/gi, "$1"), xo.singular(/(vert|ind)(ex|ices)$/gi, "$1ex"), xo.singular(/(matr)(ix|ices)$/gi, "$1ix"), xo.singular(/(quiz)(zes)?$/gi, "$1"), xo.singular(/(database)s?$/gi, "$1"), xo.singular(/ee(th?)$/gi, "oo$1"), xo.irregular("person", "people"), xo.irregular("man", "men"), xo.irregular("child", "children"), xo.irregular("sex", "sexes"), xo.irregular("move", "moves"), xo.irregular("save", "saves"), xo.irregular("cow", "kine"), xo.irregular("goose", "geese"), xo.irregular("zombie", "zombies"), xo.uncountable("equipment,information,rice,money,species,series,fish,sheep,jeans".split(",")), a(lr, !0, !0, {
      pluralize: function() {
        return Zn(this, !0)
      },
      singularize: function() {
        return Zn(this, !1)
      },
      humanize: function() {
        var t, e = Kn(this, Ro);
        return e = e.replace(/_id$/g, ""), e = e.replace(/(_)?([a-z\d]*)/gi, function(e, n, r) {
          return t = v(Fo, r) ? Fo[r] : null, (n ? " " : "") + (t || r.toLowerCase())
        }), tr(e)
      },
      titleize: function() {
        var t, e, n, r = /[.:;!]$/;
        return this.spacify().humanize().words(function(o, i, a) {
          return t = r.test(o), n = 0 == i || i == a.length - 1 || t || e, e = t, n || -1 === $o.indexOf(o) ? tr(o) : o
        }).join(" ")
      },
      parameterize: function(t) {
        var e = this;
        return void 0 === t && (t = "-"), e.normalize && (e = e.normalize()), e = e.replace(/[^a-z0-9\-_]+/gi, t), t && (e = e.replace(new ur("^{sep}+|{sep}+$|({sep}){sep}+".assign({
          sep: N(t)
        }), "g"), "$1")), encodeURI(e.toLowerCase())
      }
    }), lr.Inflector = xo, lr.Inflector.acronyms = Fo;
    var Eo, Io = [{
        names: ["Arabic"],
        source: "\u0600-\u06ff"
      }, {
        names: ["Cyrillic"],
        source: "\u0400-\u04ff"
      }, {
        names: ["Devanagari"],
        source: "\u0900-\u097f"
      }, {
        names: ["Greek"],
        source: "\u0370-\u03ff"
      }, {
        names: ["Hangul"],
        source: "\uac00-\ud7af\u1100-\u11ff"
      }, {
        names: ["Han", "Kanji"],
        source: "\u4e00-\u9fff\uf900-\ufaff"
      }, {
        names: ["Hebrew"],
        source: "\u0590-\u05ff"
      }, {
        names: ["Hiragana"],
        source: "\u3040-\u309f\u30fb-\u30fc"
      }, {
        names: ["Kana"],
        source: "\u3040-\u30ff\uff61-\uff9f"
      }, {
        names: ["Katakana"],
        source: "\u30a0-\u30ff\uff61-\uff9f"
      }, {
        names: ["Latin"],
        source: "-\x80-\xff\u0100-\u017f\u0180-\u024f"
      }, {
        names: ["Thai"],
        source: "\u0e00-\u0e7f"
      }],
      Ao = 65248,
      Wo = [{
        type: "a",
        start: 65,
        end: 90
      }, {
        type: "a",
        start: 97,
        end: 122
      }, {
        type: "n",
        start: 48,
        end: 57
      }, {
        type: "p",
        start: 33,
        end: 47
      }, {
        type: "p",
        start: 58,
        end: 64
      }, {
        type: "p",
        start: 91,
        end: 96
      }, {
        type: "p",
        start: 123,
        end: 126
      }],
      jo = /[\u0020-\u00A5]|[\uFF61-\uFF9F][\uff9e\uff9f]?/g,
      Oo = /[\u3000-\u301C]|[\u301A-\u30FC]|[\uFF01-\uFF60]|[\uFFE0-\uFFE6]/g,
      No = "\uff61\uff64\uff62\uff63\xa5\xa2\xa3",
      Po = "\u3002\u3001\u300c\u300d\uffe5\uffe0\uffe1",
      zo = /[\u30ab\u30ad\u30af\u30b1\u30b3\u30b5\u30b7\u30b9\u30bb\u30bd\u30bf\u30c1\u30c4\u30c6\u30c8\u30cf\u30d2\u30d5\u30d8\u30db]/,
      Lo = /[\u30cf\u30d2\u30d5\u30d8\u30db\u30f2]/,
      Ho = "\uff71\uff72\uff73\uff74\uff75\uff67\uff68\uff69\uff6a\uff6b\uff76\uff77\uff78\uff79\uff7a\uff7b\uff7c\uff7d\uff7e\uff7f\uff80\uff81\uff82\uff6f\uff83\uff84\uff85\uff86\uff87\uff88\uff89\uff8a\uff8b\uff8c\uff8d\uff8e\uff8f\uff90\uff91\uff92\uff93\uff94\uff6c\uff95\uff6d\uff96\uff6e\uff97\uff98\uff99\uff9a\uff9b\uff9c\uff66\uff9d\uff70\uff65",
      Do = "\u30a2\u30a4\u30a6\u30a8\u30aa\u30a1\u30a3\u30a5\u30a7\u30a9\u30ab\u30ad\u30af\u30b1\u30b3\u30b5\u30b7\u30b9\u30bb\u30bd\u30bf\u30c1\u30c4\u30c3\u30c6\u30c8\u30ca\u30cb\u30cc\u30cd\u30ce\u30cf\u30d2\u30d5\u30d8\u30db\u30de\u30df\u30e0\u30e1\u30e2\u30e4\u30e3\u30e6\u30e5\u30e8\u30e7\u30e9\u30ea\u30eb\u30ec\u30ed\u30ef\u30f2\u30f3\u30fc\u30fb";
    a(lr, !0, !0, {
      hankaku: function() {
        return nr(this, arguments, Oo, "hankaku")
      },
      zenkaku: function() {
        return nr(this, arguments, jo, "zenkaku")
      },
      hiragana: function(t) {
        var e = this;
        return t !== !1 && (e = e.zenkaku("k")), e.replace(/[\u30A1-\u30F6]/g, function(t) {
          return t.shift(-96)
        })
      },
      katakana: function() {
        return this.replace(/[\u3041-\u3096]/g, function(t) {
          return t.shift(96)
        })
      }
    }), er(), Date.addLocale("da", {
      plural: !0,
      months: "januar,februar,marts,april,maj,juni,juli,august,september,oktober,november,december",
      weekdays: "s\xf8ndag|sondag,mandag,tirsdag,onsdag,torsdag,fredag,l\xf8rdag|lordag",
      units: "millisekund:|er,sekund:|er,minut:|ter,tim:e|er,dag:|e,ug:e|er|en,m\xe5ned:|er|en+maaned:|er|en,\xe5r:||et+aar:||et",
      numbers: "en|et,to,tre,fire,fem,seks,syv,otte,ni,ti",
      tokens: "den,for",
      articles: "den",
      "short": "d. {d}. {month} {yyyy}",
      "long": "den {d}. {month} {yyyy} {H}:{mm}",
      full: "{Weekday} den {d}. {month} {yyyy} {H}:{mm}:{ss}",
      past: "{num} {unit} {sign}",
      future: "{sign} {num} {unit}",
      duration: "{num} {unit}",
      ampm: "am,pm",
      modifiers: [{
        name: "day",
        src: "forg\xe5rs|i forg\xe5rs|forgaars|i forgaars",
        value: -2
      }, {
        name: "day",
        src: "i g\xe5r|ig\xe5r|i gaar|igaar",
        value: -1
      }, {
        name: "day",
        src: "i dag|idag",
        value: 0
      }, {
        name: "day",
        src: "i morgen|imorgen",
        value: 1
      }, {
        name: "day",
        src: "over morgon|overmorgen|i over morgen|i overmorgen|iovermorgen",
        value: 2
      }, {
        name: "sign",
        src: "siden",
        value: -1
      }, {
        name: "sign",
        src: "om",
        value: 1
      }, {
        name: "shift",
        src: "i sidste|sidste",
        value: -1
      }, {
        name: "shift",
        src: "denne",
        value: 0
      }, {
        name: "shift",
        src: "n\xe6ste|naeste",
        value: 1
      }],
      dateParse: ["{num} {unit} {sign}", "{sign} {num} {unit}", "{1?} {num} {unit} {sign}", "{shift} {unit=5-7}"],
      timeParse: ["{0?} {weekday?} {date?} {month} {year}", "{date} {month}", "{shift} {weekday}"]
    }), Date.addLocale("de", {
      plural: !0,
      capitalizeUnit: !0,
      months: "Januar,Februar,M\xe4rz|Marz,April,Mai,Juni,Juli,August,September,Oktober,November,Dezember",
      weekdays: "Sonntag,Montag,Dienstag,Mittwoch,Donnerstag,Freitag,Samstag",
      units: "Millisekunde:|n,Sekunde:|n,Minute:|n,Stunde:|n,Tag:|en,Woche:|n,Monat:|en,Jahr:|en",
      numbers: "ein:|e|er|en|em,zwei,drei,vier,fuenf,sechs,sieben,acht,neun,zehn",
      tokens: "der",
      "short": "{d}. {Month} {yyyy}",
      "long": "{d}. {Month} {yyyy} {H}:{mm}",
      full: "{Weekday} {d}. {Month} {yyyy} {H}:{mm}:{ss}",
      past: "{sign} {num} {unit}",
      future: "{sign} {num} {unit}",
      duration: "{num} {unit}",
      timeMarker: "um",
      ampm: "am,pm",
      modifiers: [{
        name: "day",
        src: "vorgestern",
        value: -2
      }, {
        name: "day",
        src: "gestern",
        value: -1
      }, {
        name: "day",
        src: "heute",
        value: 0
      }, {
        name: "day",
        src: "morgen",
        value: 1
      }, {
        name: "day",
        src: "\xfcbermorgen|ubermorgen|uebermorgen",
        value: 2
      }, {
        name: "sign",
        src: "vor:|her",
        value: -1
      }, {
        name: "sign",
        src: "in",
        value: 1
      }, {
        name: "shift",
        src: "letzte:|r|n|s",
        value: -1
      }, {
        name: "shift",
        src: "n\xe4chste:|r|n|s+nachste:|r|n|s+naechste:|r|n|s+kommende:n|r",
        value: 1
      }],
      dateParse: ["{sign} {num} {unit}", "{num} {unit} {sign}", "{shift} {unit=5-7}"],
      timeParse: ["{weekday?} {date?} {month} {year?}", "{shift} {weekday}"]
    }), Date.addLocale("es", {
      plural: !0,
      months: "enero,febrero,marzo,abril,mayo,junio,julio,agosto,septiembre,octubre,noviembre,diciembre",
      weekdays: "domingo,lunes,martes,mi\xe9rcoles|miercoles,jueves,viernes,s\xe1bado|sabado",
      units: "milisegundo:|s,segundo:|s,minuto:|s,hora:|s,d\xeda|d\xedas|dia|dias,semana:|s,mes:|es,a\xf1o|a\xf1os|ano|anos",
      numbers: "uno,dos,tres,cuatro,cinco,seis,siete,ocho,nueve,diez",
      tokens: "el,la,de",
      "short": "{d} {month} {yyyy}",
      "long": "{d} {month} {yyyy} {H}:{mm}",
      full: "{Weekday} {d} {month} {yyyy} {H}:{mm}:{ss}",
      past: "{sign} {num} {unit}",
      future: "{sign} {num} {unit}",
      duration: "{num} {unit}",
      timeMarker: "a las",
      ampm: "am,pm",
      modifiers: [{
        name: "day",
        src: "anteayer",
        value: -2
      }, {
        name: "day",
        src: "ayer",
        value: -1
      }, {
        name: "day",
        src: "hoy",
        value: 0
      }, {
        name: "day",
        src: "ma\xf1ana|manana",
        value: 1
      }, {
        name: "sign",
        src: "hace",
        value: -1
      }, {
        name: "sign",
        src: "dentro de",
        value: 1
      }, {
        name: "shift",
        src: "pasad:o|a",
        value: -1
      }, {
        name: "shift",
        src: "pr\xf3ximo|pr\xf3xima|proximo|proxima",
        value: 1
      }],
      dateParse: ["{sign} {num} {unit}", "{num} {unit} {sign}", "{0?}{1?} {unit=5-7} {shift}", "{0?}{1?} {shift} {unit=5-7}"],
      timeParse: ["{shift} {weekday}", "{weekday} {shift}", "{date?} {2?} {month} {2?} {year?}"]
    }), Date.addLocale("fi", {
      plural: !0,
      timeMarker: "kello",
      ampm: ",",
      months: "tammikuu,helmikuu,maaliskuu,huhtikuu,toukokuu,kes\xe4kuu,hein\xe4kuu,elokuu,syyskuu,lokakuu,marraskuu,joulukuu",
      weekdays: "sunnuntai,maanantai,tiistai,keskiviikko,torstai,perjantai,lauantai",
      units: "millisekun:ti|tia|teja|tina|nin,sekun:ti|tia|teja|tina|nin,minuut:ti|tia|teja|tina|in,tun:ti|tia|teja|tina|nin,p\xe4iv:\xe4|\xe4\xe4|i\xe4|\xe4n\xe4|\xe4n,viik:ko|koa|koja|on|kona,kuukau:si|sia|tta|den|tena,vuo:si|sia|tta|den|tena",
      numbers: "yksi|ensimm\xe4inen,kaksi|toinen,kolm:e|as,nelj\xe4:s,vii:si|des,kuu:si|des,seitsem\xe4:n|s,kahdeksa:n|s,yhdeks\xe4:n|s,kymmene:n|s",
      articles: "",
      optionals: "",
      "short": "{d}. {month}ta {yyyy}",
      "long": "{d}. {month}ta {yyyy} kello {H}.{mm}",
      full: "{Weekday}na {d}. {month}ta {yyyy} kello {H}.{mm}",
      relative: function(t, e, n, r) {
        function o(n) {
          return (1 === t ? "" : t + " ") + i[8 * n + e]
        }
        var i = this.units;
        switch (r) {
          case "duration":
            return o(0);
          case "past":
            return o(t > 1 ? 1 : 0) + " sitten";
          case "future":
            return o(4) + " p\xe4\xe4st\xe4"
        }
      },
      modifiers: [{
        name: "day",
        src: "toissa p\xe4iv\xe4n\xe4|toissa p\xe4iv\xe4ist\xe4",
        value: -2
      }, {
        name: "day",
        src: "eilen|eilist\xe4",
        value: -1
      }, {
        name: "day",
        src: "t\xe4n\xe4\xe4n",
        value: 0
      }, {
        name: "day",
        src: "huomenna|huomista",
        value: 1
      }, {
        name: "day",
        src: "ylihuomenna|ylihuomista",
        value: 2
      }, {
        name: "sign",
        src: "sitten|aiemmin",
        value: -1
      }, {
        name: "sign",
        src: "p\xe4\xe4st\xe4|kuluttua|my\xf6hemmin",
        value: 1
      }, {
        name: "edge",
        src: "viimeinen|viimeisen\xe4",
        value: -2
      }, {
        name: "edge",
        src: "lopussa",
        value: -1
      }, {
        name: "edge",
        src: "ensimm\xe4inen|ensimm\xe4isen\xe4",
        value: 1
      }, {
        name: "shift",
        src: "edellinen|edellisen\xe4|edelt\xe4v\xe4|edelt\xe4v\xe4n\xe4|viime|toissa",
        value: -1
      }, {
        name: "shift",
        src: "t\xe4n\xe4|t\xe4m\xe4n",
        value: 0
      }, {
        name: "shift",
        src: "seuraava|seuraavana|tuleva|tulevana|ensi",
        value: 1
      }],
      dateParse: ["{num} {unit} {sign}", "{sign} {num} {unit}", "{num} {unit=4-5} {sign} {day}", "{month} {year}", "{shift} {unit=5-7}"],
      timeParse: ["{0} {num}{1} {day} of {month} {year?}", "{weekday?} {month} {date}{1} {year?}", "{date} {month} {year}", "{shift} {weekday}", "{shift} week {weekday}", "{weekday} {2} {shift} week", "{0} {date}{1} of {month}", "{0}{month?} {date?}{1} of {shift} {unit=6-7}"]
    }), Date.addLocale("fr", {
      plural: !0,
      months: "janvier,f\xe9vrier|fevrier,mars,avril,mai,juin,juillet,ao\xfbt,septembre,octobre,novembre,d\xe9cembre|decembre",
      weekdays: "dimanche,lundi,mardi,mercredi,jeudi,vendredi,samedi",
      units: "milliseconde:|s,seconde:|s,minute:|s,heure:|s,jour:|s,semaine:|s,mois,an:|s|n\xe9e|nee",
      numbers: "un:|e,deux,trois,quatre,cinq,six,sept,huit,neuf,dix",
      tokens: "l'|la|le",
      "short": "{d} {month} {yyyy}",
      "long": "{d} {month} {yyyy} {H}:{mm}",
      full: "{Weekday} {d} {month} {yyyy} {H}:{mm}:{ss}",
      past: "{sign} {num} {unit}",
      future: "{sign} {num} {unit}",
      duration: "{num} {unit}",
      timeMarker: "\xe0",
      ampm: "am,pm",
      modifiers: [{
        name: "day",
        src: "hier",
        value: -1
      }, {
        name: "day",
        src: "aujourd'hui",
        value: 0
      }, {
        name: "day",
        src: "demain",
        value: 1
      }, {
        name: "sign",
        src: "il y a",
        value: -1
      }, {
        name: "sign",
        src: "dans|d'ici",
        value: 1
      }, {
        name: "shift",
        src: "derni:\xe8r|er|\xe8re|ere",
        value: -1
      }, {
        name: "shift",
        src: "prochain:|e",
        value: 1
      }],
      dateParse: ["{sign} {num} {unit}", "{sign} {num} {unit}", "{0?} {unit=5-7} {shift}"],
      timeParse: ["{weekday?} {0?} {date?} {month} {year?}", "{0?} {weekday} {shift}"]
    }), Date.addLocale("it", {
      plural: !0,
      months: "Gennaio,Febbraio,Marzo,Aprile,Maggio,Giugno,Luglio,Agosto,Settembre,Ottobre,Novembre,Dicembre",
      weekdays: "Domenica,Luned:\xec|i,Marted:\xec|i,Mercoled:\xec|i,Gioved:\xec|i,Venerd:\xec|i,Sabato",
      units: "millisecond:o|i,second:o|i,minut:o|i,or:a|e,giorn:o|i,settiman:a|e,mes:e|i,ann:o|i",
      numbers: "un:|a|o|',due,tre,quattro,cinque,sei,sette,otto,nove,dieci",
      tokens: "l'|la|il",
      "short": "{d} {Month} {yyyy}",
      "long": "{d} {Month} {yyyy} {H}:{mm}",
      full: "{Weekday} {d} {Month} {yyyy} {H}:{mm}:{ss}",
      past: "{num} {unit} {sign}",
      future: "{num} {unit} {sign}",
      duration: "{num} {unit}",
      timeMarker: "alle",
      ampm: "am,pm",
      modifiers: [{
        name: "day",
        src: "ieri",
        value: -1
      }, {
        name: "day",
        src: "oggi",
        value: 0
      }, {
        name: "day",
        src: "domani",
        value: 1
      }, {
        name: "day",
        src: "dopodomani",
        value: 2
      }, {
        name: "sign",
        src: "fa",
        value: -1
      }, {
        name: "sign",
        src: "da adesso",
        value: 1
      }, {
        name: "shift",
        src: "scors:o|a",
        value: -1
      }, {
        name: "shift",
        src: "prossim:o|a",
        value: 1
      }],
      dateParse: ["{num} {unit} {sign}", "{0?} {unit=5-7} {shift}", "{0?} {shift} {unit=5-7}"],
      timeParse: ["{weekday?} {date?} {month} {year?}", "{shift} {weekday}"]
    }), Date.addLocale("ja", {
      monthSuffix: "\u6708",
      weekdays: "\u65e5\u66dc\u65e5,\u6708\u66dc\u65e5,\u706b\u66dc\u65e5,\u6c34\u66dc\u65e5,\u6728\u66dc\u65e5,\u91d1\u66dc\u65e5,\u571f\u66dc\u65e5",
      units: "\u30df\u30ea\u79d2,\u79d2,\u5206,\u6642\u9593,\u65e5,\u9031\u9593|\u9031,\u30f6\u6708|\u30f5\u6708|\u6708,\u5e74",
      "short": "{yyyy}\u5e74{M}\u6708{d}\u65e5",
      "long": "{yyyy}\u5e74{M}\u6708{d}\u65e5 {H}\u6642{mm}\u5206",
      full: "{yyyy}\u5e74{M}\u6708{d}\u65e5 {Weekday} {H}\u6642{mm}\u5206{ss}\u79d2",
      past: "{num}{unit}{sign}",
      future: "{num}{unit}{sign}",
      duration: "{num}{unit}",
      timeSuffixes: "\u6642,\u5206,\u79d2",
      ampm: "\u5348\u524d,\u5348\u5f8c",
      modifiers: [{
        name: "day",
        src: "\u4e00\u6628\u65e5",
        value: -2
      }, {
        name: "day",
        src: "\u6628\u65e5",
        value: -1
      }, {
        name: "day",
        src: "\u4eca\u65e5",
        value: 0
      }, {
        name: "day",
        src: "\u660e\u65e5",
        value: 1
      }, {
        name: "day",
        src: "\u660e\u5f8c\u65e5",
        value: 2
      }, {
        name: "sign",
        src: "\u524d",
        value: -1
      }, {
        name: "sign",
        src: "\u5f8c",
        value: 1
      }, {
        name: "shift",
        src: "\u53bb|\u5148",
        value: -1
      }, {
        name: "shift",
        src: "\u6765",
        value: 1
      }],
      dateParse: ["{num}{unit}{sign}"],
      timeParse: ["{shift}{unit=5-7}{weekday?}", "{year}\u5e74{month?}\u6708?{date?}\u65e5?", "{month}\u6708{date?}\u65e5?", "{date}\u65e5"]
    }), Date.addLocale("ko", {
      digitDate: !0,
      monthSuffix: "\uc6d4",
      weekdays: "\uc77c\uc694\uc77c,\uc6d4\uc694\uc77c,\ud654\uc694\uc77c,\uc218\uc694\uc77c,\ubaa9\uc694\uc77c,\uae08\uc694\uc77c,\ud1a0\uc694\uc77c",
      units: "\ubc00\ub9ac\ucd08,\ucd08,\ubd84,\uc2dc\uac04,\uc77c,\uc8fc,\uac1c\uc6d4|\ub2ec,\ub144",
      numbers: "\uc77c|\ud55c,\uc774,\uc0bc,\uc0ac,\uc624,\uc721,\uce60,\ud314,\uad6c,\uc2ed",
      "short": "{yyyy}\ub144{M}\uc6d4{d}\uc77c",
      "long": "{yyyy}\ub144{M}\uc6d4{d}\uc77c {H}\uc2dc{mm}\ubd84",
      full: "{yyyy}\ub144{M}\uc6d4{d}\uc77c {Weekday} {H}\uc2dc{mm}\ubd84{ss}\ucd08",
      past: "{num}{unit} {sign}",
      future: "{num}{unit} {sign}",
      duration: "{num}{unit}",
      timeSuffixes: "\uc2dc,\ubd84,\ucd08",
      ampm: "\uc624\uc804,\uc624\ud6c4",
      modifiers: [{
        name: "day",
        src: "\uadf8\uc800\uaed8",
        value: -2
      }, {
        name: "day",
        src: "\uc5b4\uc81c",
        value: -1
      }, {
        name: "day",
        src: "\uc624\ub298",
        value: 0
      }, {
        name: "day",
        src: "\ub0b4\uc77c",
        value: 1
      }, {
        name: "day",
        src: "\ubaa8\ub808",
        value: 2
      }, {
        name: "sign",
        src: "\uc804",
        value: -1
      }, {
        name: "sign",
        src: "\ud6c4",
        value: 1
      }, {
        name: "shift",
        src: "\uc9c0\ub09c|\uc791",
        value: -1
      }, {
        name: "shift",
        src: "\uc774\ubc88",
        value: 0
      }, {
        name: "shift",
        src: "\ub2e4\uc74c|\ub0b4",
        value: 1
      }],
      dateParse: ["{num}{unit} {sign}", "{shift?} {unit=5-7}"],
      timeParse: ["{shift} {unit=5?} {weekday}", "{year}\ub144{month?}\uc6d4?{date?}\uc77c?", "{month}\uc6d4{date?}\uc77c?", "{date}\uc77c"]
    }), Date.addLocale("nl", {
      plural: !0,
      months: "januari,februari,maart,april,mei,juni,juli,augustus,september,oktober,november,december",
      weekdays: "zondag|zo,maandag|ma,dinsdag|di,woensdag|woe|wo,donderdag|do,vrijdag|vrij|vr,zaterdag|za",
      units: "milliseconde:|n,seconde:|n,minu:ut|ten,uur,dag:|en,we:ek|ken,maand:|en,jaar",
      numbers: "een,twee,drie,vier,vijf,zes,zeven,acht,negen",
      tokens: "",
      "short": "{d} {Month} {yyyy}",
      "long": "{d} {Month} {yyyy} {H}:{mm}",
      full: "{Weekday} {d} {Month} {yyyy} {H}:{mm}:{ss}",
      past: "{num} {unit} {sign}",
      future: "{num} {unit} {sign}",
      duration: "{num} {unit}",
      timeMarker: "'s|om",
      modifiers: [{
        name: "day",
        src: "gisteren",
        value: -1
      }, {
        name: "day",
        src: "vandaag",
        value: 0
      }, {
        name: "day",
        src: "morgen",
        value: 1
      }, {
        name: "day",
        src: "overmorgen",
        value: 2
      }, {
        name: "sign",
        src: "geleden",
        value: -1
      }, {
        name: "sign",
        src: "vanaf nu",
        value: 1
      }, {
        name: "shift",
        src: "laatste|vorige|afgelopen",
        value: -1
      }, {
        name: "shift",
        src: "volgend:|e",
        value: 1
      }],
      dateParse: ["{num} {unit} {sign}", "{0?} {unit=5-7} {shift}", "{0?} {shift} {unit=5-7}"],
      timeParse: ["{weekday?} {date?} {month} {year?}", "{shift} {weekday}"]
    }), Date.addLocale("pl", {
      plural: !0,
      months: "Stycze\u0144|Stycznia,Luty|Lutego,Marzec|Marca,Kwiecie\u0144|Kwietnia,Maj|Maja,Czerwiec|Czerwca,Lipiec|Lipca,Sierpie\u0144|Sierpnia,Wrzesie\u0144|Wrze\u015bnia,Pa\u017adziernik|Pa\u017adziernika,Listopad|Listopada,Grudzie\u0144|Grudnia",
      weekdays: "Niedziela|Niedziel\u0119,Poniedzia\u0142ek,Wtorek,\u015arod:a|\u0119,Czwartek,Pi\u0105tek,Sobota|Sobot\u0119",
      units: "milisekund:a|y|,sekund:a|y|,minut:a|y|,godzin:a|y|,dzie\u0144|dni,tydzie\u0144|tygodnie|tygodni,miesi\u0105ce|miesi\u0105ce|miesi\u0119cy,rok|lata|lat",
      numbers: "jeden|jedn\u0105,dwa|dwie,trzy,cztery,pi\u0119\u0107,sze\u015b\u0107,siedem,osiem,dziewi\u0119\u0107,dziesi\u0119\u0107",
      optionals: "w|we,roku",
      "short": "{d} {Month} {yyyy}",
      "long": "{d} {Month} {yyyy} {H}:{mm}",
      full: "{Weekday}, {d} {Month} {yyyy} {H}:{mm}:{ss}",
      past: "{num} {unit} {sign}",
      future: "{sign} {num} {unit}",
      duration: "{num} {unit}",
      timeMarker: "o",
      ampm: "am,pm",
      modifiers: [{
        name: "day",
        src: "przedwczoraj",
        value: -2
      }, {
        name: "day",
        src: "wczoraj",
        value: -1
      }, {
        name: "day",
        src: "dzisiaj|dzi\u015b",
        value: 0
      }, {
        name: "day",
        src: "jutro",
        value: 1
      }, {
        name: "day",
        src: "pojutrze",
        value: 2
      }, {
        name: "sign",
        src: "temu|przed",
        value: -1
      }, {
        name: "sign",
        src: "za",
        value: 1
      }, {
        name: "shift",
        src: "zesz\u0142y|zesz\u0142a|ostatni|ostatnia",
        value: -1
      }, {
        name: "shift",
        src: "nast\u0119pny|nast\u0119pna|nast\u0119pnego|przysz\u0142y|przysz\u0142a|przysz\u0142ego",
        value: 1
      }],
      dateParse: ["{num} {unit} {sign}", "{sign} {num} {unit}", "{month} {year}", "{shift} {unit=5-7}", "{0} {shift?} {weekday}"],
      timeParse: ["{date} {month} {year?} {1}", "{0} {shift?} {weekday}"]
    }), Date.addLocale("pt", {
      plural: !0,
      months: "janeiro,fevereiro,mar\xe7o,abril,maio,junho,julho,agosto,setembro,outubro,novembro,dezembro",
      weekdays: "domingo,segunda-feira,ter\xe7a-feira,quarta-feira,quinta-feira,sexta-feira,s\xe1bado|sabado",
      units: "milisegundo:|s,segundo:|s,minuto:|s,hora:|s,dia:|s,semana:|s,m\xeas|m\xeases|mes|meses,ano:|s",
      numbers: "um,dois,tr\xeas|tres,quatro,cinco,seis,sete,oito,nove,dez,uma,duas",
      tokens: "a,de",
      "short": "{d} de {month} de {yyyy}",
      "long": "{d} de {month} de {yyyy} {H}:{mm}",
      full: "{Weekday}, {d} de {month} de {yyyy} {H}:{mm}:{ss}",
      past: "{num} {unit} {sign}",
      future: "{sign} {num} {unit}",
      duration: "{num} {unit}",
      timeMarker: "\xe0s",
      ampm: "am,pm",
      modifiers: [{
        name: "day",
        src: "anteontem",
        value: -2
      }, {
        name: "day",
        src: "ontem",
        value: -1
      }, {
        name: "day",
        src: "hoje",
        value: 0
      }, {
        name: "day",
        src: "amanh:\xe3|a",
        value: 1
      }, {
        name: "sign",
        src: "atr\xe1s|atras|h\xe1|ha",
        value: -1
      }, {
        name: "sign",
        src: "daqui a",
        value: 1
      }, {
        name: "shift",
        src: "passad:o|a",
        value: -1
      }, {
        name: "shift",
        src: "pr\xf3ximo|pr\xf3xima|proximo|proxima",
        value: 1
      }],
      dateParse: ["{num} {unit} {sign}", "{sign} {num} {unit}", "{0?} {unit=5-7} {shift}", "{0?} {shift} {unit=5-7}"],
      timeParse: ["{date?} {1?} {month} {1?} {year?}", "{0?} {shift} {weekday}"]
    }), Date.addLocale("ru", {
      months: "\u042f\u043d\u0432\u0430\u0440:\u044f|\u044c,\u0424\u0435\u0432\u0440\u0430\u043b:\u044f|\u044c,\u041c\u0430\u0440\u0442:\u0430|,\u0410\u043f\u0440\u0435\u043b:\u044f|\u044c,\u041c\u0430:\u044f|\u0439,\u0418\u044e\u043d:\u044f|\u044c,\u0418\u044e\u043b:\u044f|\u044c,\u0410\u0432\u0433\u0443\u0441\u0442:\u0430|,\u0421\u0435\u043d\u0442\u044f\u0431\u0440:\u044f|\u044c,\u041e\u043a\u0442\u044f\u0431\u0440:\u044f|\u044c,\u041d\u043e\u044f\u0431\u0440:\u044f|\u044c,\u0414\u0435\u043a\u0430\u0431\u0440:\u044f|\u044c",
      weekdays: "\u0412\u043e\u0441\u043a\u0440\u0435\u0441\u0435\u043d\u044c\u0435,\u041f\u043e\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u0438\u043a,\u0412\u0442\u043e\u0440\u043d\u0438\u043a,\u0421\u0440\u0435\u0434\u0430,\u0427\u0435\u0442\u0432\u0435\u0440\u0433,\u041f\u044f\u0442\u043d\u0438\u0446\u0430,\u0421\u0443\u0431\u0431\u043e\u0442\u0430",
      units: "\u043c\u0438\u043b\u043b\u0438\u0441\u0435\u043a\u0443\u043d\u0434:\u0430|\u0443|\u044b|,\u0441\u0435\u043a\u0443\u043d\u0434:\u0430|\u0443|\u044b|,\u043c\u0438\u043d\u0443\u0442:\u0430|\u0443|\u044b|,\u0447\u0430\u0441:||\u0430|\u043e\u0432,\u0434\u0435\u043d\u044c|\u0434\u0435\u043d\u044c|\u0434\u043d\u044f|\u0434\u043d\u0435\u0439,\u043d\u0435\u0434\u0435\u043b:\u044f|\u044e|\u0438|\u044c|\u0435,\u043c\u0435\u0441\u044f\u0446:||\u0430|\u0435\u0432|\u0435,\u0433\u043e\u0434|\u0433\u043e\u0434|\u0433\u043e\u0434\u0430|\u043b\u0435\u0442|\u0433\u043e\u0434\u0443",
      numbers: "\u043e\u0434:\u0438\u043d|\u043d\u0443,\u0434\u0432:\u0430|\u0435,\u0442\u0440\u0438,\u0447\u0435\u0442\u044b\u0440\u0435,\u043f\u044f\u0442\u044c,\u0448\u0435\u0441\u0442\u044c,\u0441\u0435\u043c\u044c,\u0432\u043e\u0441\u0435\u043c\u044c,\u0434\u0435\u0432\u044f\u0442\u044c,\u0434\u0435\u0441\u044f\u0442\u044c",
      tokens: "\u0432|\u043d\u0430,\u0433\u043e\u0434\u0430",
      "short": "{d} {month} {yyyy} \u0433\u043e\u0434\u0430",
      "long": "{d} {month} {yyyy} \u0433\u043e\u0434\u0430 {H}:{mm}",
      full: "{Weekday} {d} {month} {yyyy} \u0433\u043e\u0434\u0430 {H}:{mm}:{ss}",
      relative: function(t, e, n, r) {
        var o, i, a = t.toString().slice(-1);
        switch (!0) {
          case t >= 11 && 15 >= t:
            i = 3;
            break;
          case 1 == a:
            i = 1;
            break;
          case a >= 2 && 4 >= a:
            i = 2;
            break;
          default:
            i = 3
        }
        switch (o = t + " " + this.units[8 * i + e], r) {
          case "duration":
            return o;
          case "past":
            return o + " \u043d\u0430\u0437\u0430\u0434";
          case "future":
            return "\u0447\u0435\u0440\u0435\u0437 " + o
        }
      },
      timeMarker: "\u0432",
      ampm: " \u0443\u0442\u0440\u0430, \u0432\u0435\u0447\u0435\u0440\u0430",
      modifiers: [{
        name: "day",
        src: "\u043f\u043e\u0437\u0430\u0432\u0447\u0435\u0440\u0430",
        value: -2
      }, {
        name: "day",
        src: "\u0432\u0447\u0435\u0440\u0430",
        value: -1
      }, {
        name: "day",
        src: "\u0441\u0435\u0433\u043e\u0434\u043d\u044f",
        value: 0
      }, {
        name: "day",
        src: "\u0437\u0430\u0432\u0442\u0440\u0430",
        value: 1
      }, {
        name: "day",
        src: "\u043f\u043e\u0441\u043b\u0435\u0437\u0430\u0432\u0442\u0440\u0430",
        value: 2
      }, {
        name: "sign",
        src: "\u043d\u0430\u0437\u0430\u0434",
        value: -1
      }, {
        name: "sign",
        src: "\u0447\u0435\u0440\u0435\u0437",
        value: 1
      }, {
        name: "shift",
        src: "\u043f\u0440\u043e\u0448\u043b:\u044b\u0439|\u043e\u0439|\u043e\u043c",
        value: -1
      }, {
        name: "shift",
        src: "\u0441\u043b\u0435\u0434\u0443\u044e\u0449:\u0438\u0439|\u0435\u0439|\u0435\u043c",
        value: 1
      }],
      dateParse: ["{num} {unit} {sign}", "{sign} {num} {unit}", "{month} {year}", "{0?} {shift} {unit=5-7}"],
      timeParse: ["{date} {month} {year?} {1?}", "{0?} {shift} {weekday}"]
    }), Date.addLocale("sv", {
      plural: !0,
      months: "januari,februari,mars,april,maj,juni,juli,augusti,september,oktober,november,december",
      weekdays: "s\xf6ndag|sondag,m\xe5ndag:|en+mandag:|en,tisdag,onsdag,torsdag,fredag,l\xf6rdag|lordag",
      units: "millisekund:|er,sekund:|er,minut:|er,timm:e|ar,dag:|ar,veck:a|or|an,m\xe5nad:|er|en+manad:|er|en,\xe5r:||et+ar:||et",
      numbers: "en|ett,tv\xe5|tva,tre,fyra,fem,sex,sju,\xe5tta|atta,nio,tio",
      tokens: "den,f\xf6r|for",
      articles: "den",
      "short": "den {d} {month} {yyyy}",
      "long": "den {d} {month} {yyyy} {H}:{mm}",
      full: "{Weekday} den {d} {month} {yyyy} {H}:{mm}:{ss}",
      past: "{num} {unit} {sign}",
      future: "{sign} {num} {unit}",
      duration: "{num} {unit}",
      ampm: "am,pm",
      modifiers: [{
        name: "day",
        src: "f\xf6rrg\xe5r|i f\xf6rrg\xe5r|if\xf6rrg\xe5r|forrgar|i forrgar|iforrgar",
        value: -2
      }, {
        name: "day",
        src: "g\xe5r|i g\xe5r|ig\xe5r|gar|i gar|igar",
        value: -1
      }, {
        name: "day",
        src: "dag|i dag|idag",
        value: 0
      }, {
        name: "day",
        src: "morgon|i morgon|imorgon",
        value: 1
      }, {
        name: "day",
        src: "\xf6ver morgon|\xf6vermorgon|i \xf6ver morgon|i \xf6vermorgon|i\xf6vermorgon|over morgon|overmorgon|i over morgon|i overmorgon|iovermorgon",
        value: 2
      }, {
        name: "sign",
        src: "sedan|sen",
        value: -1
      }, {
        name: "sign",
        src: "om",
        value: 1
      }, {
        name: "shift",
        src: "i f\xf6rra|f\xf6rra|i forra|forra",
        value: -1
      }, {
        name: "shift",
        src: "denna",
        value: 0
      }, {
        name: "shift",
        src: "n\xe4sta|nasta",
        value: 1
      }],
      dateParse: ["{num} {unit} {sign}", "{sign} {num} {unit}", "{1?} {num} {unit} {sign}", "{shift} {unit=5-7}"],
      timeParse: ["{0?} {weekday?} {date?} {month} {year}", "{date} {month}", "{shift} {weekday}"]
    }), Date.addLocale("zh-CN", {
      variant: !0,
      monthSuffix: "\u6708",
      weekdays: "\u661f\u671f\u65e5|\u5468\u65e5,\u661f\u671f\u4e00|\u5468\u4e00,\u661f\u671f\u4e8c|\u5468\u4e8c,\u661f\u671f\u4e09|\u5468\u4e09,\u661f\u671f\u56db|\u5468\u56db,\u661f\u671f\u4e94|\u5468\u4e94,\u661f\u671f\u516d|\u5468\u516d",
      units: "\u6beb\u79d2,\u79d2\u949f,\u5206\u949f,\u5c0f\u65f6,\u5929,\u4e2a\u661f\u671f|\u5468,\u4e2a\u6708,\u5e74",
      tokens: "\u65e5|\u53f7",
      "short": "{yyyy}\u5e74{M}\u6708{d}\u65e5",
      "long": "{yyyy}\u5e74{M}\u6708{d}\u65e5 {tt}{h}:{mm}",
      full: "{yyyy}\u5e74{M}\u6708{d}\u65e5 {weekday} {tt}{h}:{mm}:{ss}",
      past: "{num}{unit}{sign}",
      future: "{num}{unit}{sign}",
      duration: "{num}{unit}",
      timeSuffixes: "\u70b9|\u65f6,\u5206\u949f?,\u79d2",
      ampm: "\u4e0a\u5348,\u4e0b\u5348",
      modifiers: [{
        name: "day",
        src: "\u524d\u5929",
        value: -2
      }, {
        name: "day",
        src: "\u6628\u5929",
        value: -1
      }, {
        name: "day",
        src: "\u4eca\u5929",
        value: 0
      }, {
        name: "day",
        src: "\u660e\u5929",
        value: 1
      }, {
        name: "day",
        src: "\u540e\u5929",
        value: 2
      }, {
        name: "sign",
        src: "\u524d",
        value: -1
      }, {
        name: "sign",
        src: "\u540e",
        value: 1
      }, {
        name: "shift",
        src: "\u4e0a|\u53bb",
        value: -1
      }, {
        name: "shift",
        src: "\u8fd9",
        value: 0
      }, {
        name: "shift",
        src: "\u4e0b|\u660e",
        value: 1
      }],
      dateParse: ["{num}{unit}{sign}", "{shift}{unit=5-7}"],
      timeParse: ["{shift}{weekday}", "{year}\u5e74{month?}\u6708?{date?}{0?}", "{month}\u6708{date?}{0?}", "{date}[\u65e5\u53f7]"]
    }), Date.addLocale("zh-TW", {
      monthSuffix: "\u6708",
      weekdays: "\u661f\u671f\u65e5|\u9031\u65e5,\u661f\u671f\u4e00|\u9031\u4e00,\u661f\u671f\u4e8c|\u9031\u4e8c,\u661f\u671f\u4e09|\u9031\u4e09,\u661f\u671f\u56db|\u9031\u56db,\u661f\u671f\u4e94|\u9031\u4e94,\u661f\u671f\u516d|\u9031\u516d",
      units: "\u6beb\u79d2,\u79d2\u9418,\u5206\u9418,\u5c0f\u6642,\u5929,\u500b\u661f\u671f|\u9031,\u500b\u6708,\u5e74",
      tokens: "\u65e5|\u865f",
      "short": "{yyyy}\u5e74{M}\u6708{d}\u65e5",
      "long": "{yyyy}\u5e74{M}\u6708{d}\u65e5 {tt}{h}:{mm}",
      full: "{yyyy}\u5e74{M}\u6708{d}\u65e5 {Weekday} {tt}{h}:{mm}:{ss}",
      past: "{num}{unit}{sign}",
      future: "{num}{unit}{sign}",
      duration: "{num}{unit}",
      timeSuffixes: "\u9ede|\u6642,\u5206\u9418?,\u79d2",
      ampm: "\u4e0a\u5348,\u4e0b\u5348",
      modifiers: [{
        name: "day",
        src: "\u524d\u5929",
        value: -2
      }, {
        name: "day",
        src: "\u6628\u5929",
        value: -1
      }, {
        name: "day",
        src: "\u4eca\u5929",
        value: 0
      }, {
        name: "day",
        src: "\u660e\u5929",
        value: 1
      }, {
        name: "day",
        src: "\u5f8c\u5929",
        value: 2
      }, {
        name: "sign",
        src: "\u524d",
        value: -1
      }, {
        name: "sign",
        src: "\u5f8c",
        value: 1
      }, {
        name: "shift",
        src: "\u4e0a|\u53bb",
        value: -1
      }, {
        name: "shift",
        src: "\u9019",
        value: 0
      }, {
        name: "shift",
        src: "\u4e0b|\u660e",
        value: 1
      }],
      dateParse: ["{num}{unit}{sign}", "{shift}{unit=5-7}"],
      timeParse: ["{shift}{weekday}", "{year}\u5e74{month?}\u6708?{date?}{0?}", "{month}\u6708{date?}{0?}", "{date}[\u65e5\u865f]"]
    })
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t = this,
      e = t._,
      n = {},
      r = Array.prototype,
      o = Object.prototype,
      i = Function.prototype,
      a = r.push,
      s = r.slice,
      u = r.concat,
      c = o.toString,
      l = o.hasOwnProperty,
      h = r.forEach,
      d = r.map,
      p = r.reduce,
      f = r.reduceRight,
      m = r.filter,
      y = r.every,
      v = r.some,
      g = r.indexOf,
      w = r.lastIndexOf,
      _ = Array.isArray,
      b = Object.keys,
      C = i.bind,
      k = function(t) {
        return t instanceof k ? t : this instanceof k ? void(this._wrapped = t) : new k(t)
      };
    "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = k), exports._ = k) : t._ = k, k.VERSION = "1.5.2";
    var $ = k.each = k.forEach = function(t, e, r) {
      if (null != t)
        if (h && t.forEach === h) t.forEach(e, r);
        else if (t.length === +t.length) {
        for (var o = 0, i = t.length; i > o; o++)
          if (e.call(r, t[o], o, t) === n) return
      } else
        for (var a = k.keys(t), o = 0, i = a.length; i > o; o++)
          if (e.call(r, t[a[o]], a[o], t) === n) return
    };
    k.map = k.collect = function(t, e, n) {
      var r = [];
      return null == t ? r : d && t.map === d ? t.map(e, n) : ($(t, function(t, o, i) {
        r.push(e.call(n, t, o, i))
      }), r)
    };
    var x = "Reduce of empty array with no initial value";
    k.reduce = k.foldl = k.inject = function(t, e, n, r) {
      var o = arguments.length > 2;
      if (null == t && (t = []), p && t.reduce === p) return r && (e = k.bind(e, r)), o ? t.reduce(e, n) : t.reduce(e);
      if ($(t, function(t, i, a) {
          o ? n = e.call(r, n, t, i, a) : (n = t, o = !0)
        }), !o) throw new TypeError(x);
      return n
    }, k.reduceRight = k.foldr = function(t, e, n, r) {
      var o = arguments.length > 2;
      if (null == t && (t = []), f && t.reduceRight === f) return r && (e = k.bind(e, r)), o ? t.reduceRight(e, n) : t.reduceRight(e);
      var i = t.length;
      if (i !== +i) {
        var a = k.keys(t);
        i = a.length
      }
      if ($(t, function(s, u, c) {
          u = a ? a[--i] : --i, o ? n = e.call(r, n, t[u], u, c) : (n = t[u], o = !0)
        }), !o) throw new TypeError(x);
      return n
    }, k.find = k.detect = function(t, e, n) {
      var r;
      return T(t, function(t, o, i) {
        return e.call(n, t, o, i) ? (r = t, !0) : void 0
      }), r
    }, k.filter = k.select = function(t, e, n) {
      var r = [];
      return null == t ? r : m && t.filter === m ? t.filter(e, n) : ($(t, function(t, o, i) {
        e.call(n, t, o, i) && r.push(t)
      }), r)
    }, k.reject = function(t, e, n) {
      return k.filter(t, function(t, r, o) {
        return !e.call(n, t, r, o)
      }, n)
    }, k.every = k.all = function(t, e, r) {
      e || (e = k.identity);
      var o = !0;
      return null == t ? o : y && t.every === y ? t.every(e, r) : ($(t, function(t, i, a) {
        return (o = o && e.call(r, t, i, a)) ? void 0 : n
      }), !!o)
    };
    var T = k.some = k.any = function(t, e, r) {
      e || (e = k.identity);
      var o = !1;
      return null == t ? o : v && t.some === v ? t.some(e, r) : ($(t, function(t, i, a) {
        return o || (o = e.call(r, t, i, a)) ? n : void 0
      }), !!o)
    };
    k.contains = k.include = function(t, e) {
      return null == t ? !1 : g && t.indexOf === g ? -1 != t.indexOf(e) : T(t, function(t) {
        return t === e
      })
    }, k.invoke = function(t, e) {
      var n = s.call(arguments, 2),
        r = k.isFunction(e);
      return k.map(t, function(t) {
        return (r ? e : t[e]).apply(t, n)
      })
    }, k.pluck = function(t, e) {
      return k.map(t, function(t) {
        return t[e]
      })
    }, k.where = function(t, e, n) {
      return k.isEmpty(e) ? n ? void 0 : [] : k[n ? "find" : "filter"](t, function(t) {
        for (var n in e)
          if (e[n] !== t[n]) return !1;
        return !0
      })
    }, k.findWhere = function(t, e) {
      return k.where(t, e, !0)
    }, k.max = function(t, e, n) {
      if (!e && k.isArray(t) && t[0] === +t[0] && t.length < 65535) return Math.max.apply(Math, t);
      if (!e && k.isEmpty(t)) return -1 / 0;
      var r = {
        computed: -1 / 0,
        value: -1 / 0
      };
      return $(t, function(t, o, i) {
        var a = e ? e.call(n, t, o, i) : t;
        a > r.computed && (r = {
          value: t,
          computed: a
        })
      }), r.value
    }, k.min = function(t, e, n) {
      if (!e && k.isArray(t) && t[0] === +t[0] && t.length < 65535) return Math.min.apply(Math, t);
      if (!e && k.isEmpty(t)) return 1 / 0;
      var r = {
        computed: 1 / 0,
        value: 1 / 0
      };
      return $(t, function(t, o, i) {
        var a = e ? e.call(n, t, o, i) : t;
        a < r.computed && (r = {
          value: t,
          computed: a
        })
      }), r.value
    }, k.shuffle = function(t) {
      var e, n = 0,
        r = [];
      return $(t, function(t) {
        e = k.random(n++), r[n - 1] = r[e], r[e] = t
      }), r
    }, k.sample = function(t, e, n) {
      return arguments.length < 2 || n ? t[k.random(t.length - 1)] : k.shuffle(t).slice(0, Math.max(0, e))
    };
    var S = function(t) {
      return k.isFunction(t) ? t : function(e) {
        return e[t]
      }
    };
    k.sortBy = function(t, e, n) {
      var r = S(e);
      return k.pluck(k.map(t, function(t, e, o) {
        return {
          value: t,
          index: e,
          criteria: r.call(n, t, e, o)
        }
      }).sort(function(t, e) {
        var n = t.criteria,
          r = e.criteria;
        if (n !== r) {
          if (n > r || void 0 === n) return 1;
          if (r > n || void 0 === r) return -1
        }
        return t.index - e.index
      }), "value")
    };
    var M = function(t) {
      return function(e, n, r) {
        var o = {},
          i = null == n ? k.identity : S(n);
        return $(e, function(n, a) {
          var s = i.call(r, n, a, e);
          t(o, s, n)
        }), o
      }
    };
    k.groupBy = M(function(t, e, n) {
      (k.has(t, e) ? t[e] : t[e] = []).push(n)
    }), k.indexBy = M(function(t, e, n) {
      t[e] = n
    }), k.countBy = M(function(t, e) {
      k.has(t, e) ? t[e]++ : t[e] = 1
    }), k.sortedIndex = function(t, e, n, r) {
      n = null == n ? k.identity : S(n);
      for (var o = n.call(r, e), i = 0, a = t.length; a > i;) {
        var s = i + a >>> 1;
        n.call(r, t[s]) < o ? i = s + 1 : a = s
      }
      return i
    }, k.toArray = function(t) {
      return t ? k.isArray(t) ? s.call(t) : t.length === +t.length ? k.map(t, k.identity) : k.values(t) : []
    }, k.size = function(t) {
      return null == t ? 0 : t.length === +t.length ? t.length : k.keys(t).length
    }, k.first = k.head = k.take = function(t, e, n) {
      return null == t ? void 0 : null == e || n ? t[0] : s.call(t, 0, e)
    }, k.initial = function(t, e, n) {
      return s.call(t, 0, t.length - (null == e || n ? 1 : e))
    }, k.last = function(t, e, n) {
      return null == t ? void 0 : null == e || n ? t[t.length - 1] : s.call(t, Math.max(t.length - e, 0))
    }, k.rest = k.tail = k.drop = function(t, e, n) {
      return s.call(t, null == e || n ? 1 : e)
    }, k.compact = function(t) {
      return k.filter(t, k.identity)
    };
    var R = function(t, e, n) {
      return e && k.every(t, k.isArray) ? u.apply(n, t) : ($(t, function(t) {
        k.isArray(t) || k.isArguments(t) ? e ? a.apply(n, t) : R(t, e, n) : n.push(t)
      }), n)
    };
    k.flatten = function(t, e) {
      return R(t, e, [])
    }, k.without = function(t) {
      return k.difference(t, s.call(arguments, 1))
    }, k.uniq = k.unique = function(t, e, n, r) {
      k.isFunction(e) && (r = n, n = e, e = !1);
      var o = n ? k.map(t, n, r) : t,
        i = [],
        a = [];
      return $(o, function(n, r) {
        (e ? r && a[a.length - 1] === n : k.contains(a, n)) || (a.push(n), i.push(t[r]))
      }), i
    }, k.union = function() {
      return k.uniq(k.flatten(arguments, !0))
    }, k.intersection = function(t) {
      var e = s.call(arguments, 1);
      return k.filter(k.uniq(t), function(t) {
        return k.every(e, function(e) {
          return k.indexOf(e, t) >= 0
        })
      })
    }, k.difference = function(t) {
      var e = u.apply(r, s.call(arguments, 1));
      return k.filter(t, function(t) {
        return !k.contains(e, t)
      })
    }, k.zip = function() {
      for (var t = k.max(k.pluck(arguments, "length").concat(0)), e = new Array(t), n = 0; t > n; n++) e[n] = k.pluck(arguments, "" + n);
      return e
    }, k.object = function(t, e) {
      if (null == t) return {};
      for (var n = {}, r = 0, o = t.length; o > r; r++) e ? n[t[r]] = e[r] : n[t[r][0]] = t[r][1];
      return n
    }, k.indexOf = function(t, e, n) {
      if (null == t) return -1;
      var r = 0,
        o = t.length;
      if (n) {
        if ("number" != typeof n) return r = k.sortedIndex(t, e), t[r] === e ? r : -1;
        r = 0 > n ? Math.max(0, o + n) : n
      }
      if (g && t.indexOf === g) return t.indexOf(e, n);
      for (; o > r; r++)
        if (t[r] === e) return r;
      return -1
    }, k.lastIndexOf = function(t, e, n) {
      if (null == t) return -1;
      var r = null != n;
      if (w && t.lastIndexOf === w) return r ? t.lastIndexOf(e, n) : t.lastIndexOf(e);
      for (var o = r ? n : t.length; o--;)
        if (t[o] === e) return o;
      return -1
    }, k.range = function(t, e, n) {
      arguments.length <= 1 && (e = t || 0, t = 0), n = arguments[2] || 1;
      for (var r = Math.max(Math.ceil((e - t) / n), 0), o = 0, i = new Array(r); r > o;) i[o++] = t, t += n;
      return i
    };
    var F = function() {};
    k.bind = function(t, e) {
      var n, r;
      if (C && t.bind === C) return C.apply(t, s.call(arguments, 1));
      if (!k.isFunction(t)) throw new TypeError;
      return n = s.call(arguments, 2), r = function() {
        if (!(this instanceof r)) return t.apply(e, n.concat(s.call(arguments)));
        F.prototype = t.prototype;
        var o = new F;
        F.prototype = null;
        var i = t.apply(o, n.concat(s.call(arguments)));
        return Object(i) === i ? i : o
      }
    }, k.partial = function(t) {
      var e = s.call(arguments, 1);
      return function() {
        return t.apply(this, e.concat(s.call(arguments)))
      }
    }, k.bindAll = function(t) {
      var e = s.call(arguments, 1);
      if (0 === e.length) throw new Error("bindAll must be passed function names");
      return $(e, function(e) {
        t[e] = k.bind(t[e], t)
      }), t
    }, k.memoize = function(t, e) {
      var n = {};
      return e || (e = k.identity),
        function() {
          var r = e.apply(this, arguments);
          return k.has(n, r) ? n[r] : n[r] = t.apply(this, arguments)
        }
    }, k.delay = function(t, e) {
      var n = s.call(arguments, 2);
      return setTimeout(function() {
        return t.apply(null, n)
      }, e)
    }, k.defer = function(t) {
      return k.delay.apply(k, [t, 1].concat(s.call(arguments, 1)))
    }, k.throttle = function(t, e, n) {
      var r, o, i, a = null,
        s = 0;
      n || (n = {});
      var u = function() {
        s = n.leading === !1 ? 0 : new Date, a = null, i = t.apply(r, o)
      };
      return function() {
        var c = new Date;
        s || n.leading !== !1 || (s = c);
        var l = e - (c - s);
        return r = this, o = arguments, 0 >= l ? (clearTimeout(a), a = null, s = c, i = t.apply(r, o)) : a || n.trailing === !1 || (a = setTimeout(u, l)), i
      }
    }, k.debounce = function(t, e, n) {
      var r, o, i, a, s;
      return function() {
        i = this, o = arguments, a = new Date;
        var u = function() {
            var c = new Date - a;
            e > c ? r = setTimeout(u, e - c) : (r = null, n || (s = t.apply(i, o)))
          },
          c = n && !r;
        return r || (r = setTimeout(u, e)), c && (s = t.apply(i, o)), s
      }
    }, k.once = function(t) {
      var e, n = !1;
      return function() {
        return n ? e : (n = !0, e = t.apply(this, arguments), t = null, e)
      }
    }, k.wrap = function(t, e) {
      return function() {
        var n = [t];
        return a.apply(n, arguments), e.apply(this, n)
      }
    }, k.compose = function() {
      var t = arguments;
      return function() {
        for (var e = arguments, n = t.length - 1; n >= 0; n--) e = [t[n].apply(this, e)];
        return e[0]
      }
    }, k.after = function(t, e) {
      return function() {
        return --t < 1 ? e.apply(this, arguments) : void 0
      }
    }, k.keys = b || function(t) {
      if (t !== Object(t)) throw new TypeError("Invalid object");
      var e = [];
      for (var n in t) k.has(t, n) && e.push(n);
      return e
    }, k.values = function(t) {
      for (var e = k.keys(t), n = e.length, r = new Array(n), o = 0; n > o; o++) r[o] = t[e[o]];
      return r
    }, k.pairs = function(t) {
      for (var e = k.keys(t), n = e.length, r = new Array(n), o = 0; n > o; o++) r[o] = [e[o], t[e[o]]];
      return r
    }, k.invert = function(t) {
      for (var e = {}, n = k.keys(t), r = 0, o = n.length; o > r; r++) e[t[n[r]]] = n[r];
      return e
    }, k.functions = k.methods = function(t) {
      var e = [];
      for (var n in t) k.isFunction(t[n]) && e.push(n);
      return e.sort()
    }, k.extend = function(t) {
      return $(s.call(arguments, 1), function(e) {
        if (e)
          for (var n in e) t[n] = e[n]
      }), t
    }, k.pick = function(t) {
      var e = {},
        n = u.apply(r, s.call(arguments, 1));
      return $(n, function(n) {
        n in t && (e[n] = t[n])
      }), e
    }, k.omit = function(t) {
      var e = {},
        n = u.apply(r, s.call(arguments, 1));
      for (var o in t) k.contains(n, o) || (e[o] = t[o]);
      return e
    }, k.defaults = function(t) {
      return $(s.call(arguments, 1), function(e) {
        if (e)
          for (var n in e) void 0 === t[n] && (t[n] = e[n])
      }), t
    }, k.clone = function(t) {
      return k.isObject(t) ? k.isArray(t) ? t.slice() : k.extend({}, t) : t
    }, k.tap = function(t, e) {
      return e(t), t
    };
    var E = function(t, e, n, r) {
      if (t === e) return 0 !== t || 1 / t == 1 / e;
      if (null == t || null == e) return t === e;
      t instanceof k && (t = t._wrapped), e instanceof k && (e = e._wrapped);
      var o = c.call(t);
      if (o != c.call(e)) return !1;
      switch (o) {
        case "[object String]":
          return t == String(e);
        case "[object Number]":
          return t != +t ? e != +e : 0 == t ? 1 / t == 1 / e : t == +e;
        case "[object Date]":
        case "[object Boolean]":
          return +t == +e;
        case "[object RegExp]":
          return t.source == e.source && t.global == e.global && t.multiline == e.multiline && t.ignoreCase == e.ignoreCase
      }
      if ("object" != typeof t || "object" != typeof e) return !1;
      for (var i = n.length; i--;)
        if (n[i] == t) return r[i] == e;
      var a = t.constructor,
        s = e.constructor;
      if (a !== s && !(k.isFunction(a) && a instanceof a && k.isFunction(s) && s instanceof s)) return !1;
      n.push(t), r.push(e);
      var u = 0,
        l = !0;
      if ("[object Array]" == o) {
        if (u = t.length, l = u == e.length)
          for (; u-- && (l = E(t[u], e[u], n, r)););
      } else {
        for (var h in t)
          if (k.has(t, h) && (u++, !(l = k.has(e, h) && E(t[h], e[h], n, r)))) break;
        if (l) {
          for (h in e)
            if (k.has(e, h) && !u--) break;
          l = !u
        }
      }
      return n.pop(), r.pop(), l
    };
    k.isEqual = function(t, e) {
      return E(t, e, [], [])
    }, k.isEmpty = function(t) {
      if (null == t) return !0;
      if (k.isArray(t) || k.isString(t)) return 0 === t.length;
      for (var e in t)
        if (k.has(t, e)) return !1;
      return !0
    }, k.isElement = function(t) {
      return !(!t || 1 !== t.nodeType)
    }, k.isArray = _ || function(t) {
      return "[object Array]" == c.call(t)
    }, k.isObject = function(t) {
      return t === Object(t)
    }, $(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function(t) {
      k["is" + t] = function(e) {
        return c.call(e) == "[object " + t + "]"
      }
    }), k.isArguments(arguments) || (k.isArguments = function(t) {
      return !(!t || !k.has(t, "callee"))
    }), "function" != typeof /./ && (k.isFunction = function(t) {
      return "function" == typeof t
    }), k.isFinite = function(t) {
      return isFinite(t) && !isNaN(parseFloat(t))
    }, k.isNaN = function(t) {
      return k.isNumber(t) && t != +t
    }, k.isBoolean = function(t) {
      return t === !0 || t === !1 || "[object Boolean]" == c.call(t)
    }, k.isNull = function(t) {
      return null === t
    }, k.isUndefined = function(t) {
      return void 0 === t
    }, k.has = function(t, e) {
      return l.call(t, e)
    }, k.noConflict = function() {
      return t._ = e, this
    }, k.identity = function(t) {
      return t
    }, k.times = function(t, e, n) {
      for (var r = Array(Math.max(0, t)), o = 0; t > o; o++) r[o] = e.call(n, o);
      return r
    }, k.random = function(t, e) {
      return null == e && (e = t, t = 0), t + Math.floor(Math.random() * (e - t + 1))
    };
    var I = {
      escape: {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;"
      }
    };
    I.unescape = k.invert(I.escape);
    var A = {
      escape: new RegExp("[" + k.keys(I.escape).join("") + "]", "g"),
      unescape: new RegExp("(" + k.keys(I.unescape).join("|") + ")", "g")
    };
    k.each(["escape", "unescape"], function(t) {
      k[t] = function(e) {
        return null == e ? "" : ("" + e).replace(A[t], function(e) {
          return I[t][e]
        })
      }
    }), k.result = function(t, e) {
      if (null == t) return void 0;
      var n = t[e];
      return k.isFunction(n) ? n.call(t) : n
    }, k.mixin = function(t) {
      $(k.functions(t), function(e) {
        var n = k[e] = t[e];
        k.prototype[e] = function() {
          var t = [this._wrapped];
          return a.apply(t, arguments), P.call(this, n.apply(k, t))
        }
      })
    };
    var W = 0;
    k.uniqueId = function(t) {
      var e = ++W + "";
      return t ? t + e : e
    }, k.templateSettings = {
      evaluate: /<%([\s\S]+?)%>/g,
      interpolate: /<%=([\s\S]+?)%>/g,
      escape: /<%-([\s\S]+?)%>/g
    };
    var j = /(.)^/,
      O = {
        "'": "'",
        "\\": "\\",
        "\r": "r",
        "\n": "n",
        "	": "t",
        "\u2028": "u2028",
        "\u2029": "u2029"
      },
      N = /\\|'|\r|\n|\t|\u2028|\u2029/g;
    k.template = function(t, e, n) {
      var r;
      n = k.defaults({}, n, k.templateSettings);
      var o = new RegExp([(n.escape || j).source, (n.interpolate || j).source, (n.evaluate || j).source].join("|") + "|$", "g"),
        i = 0,
        a = "__p+='";
      t.replace(o, function(e, n, r, o, s) {
        return a += t.slice(i, s).replace(N, function(t) {
          return "\\" + O[t]
        }), n && (a += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'"), r && (a += "'+\n((__t=(" + r + "))==null?'':__t)+\n'"), o && (a += "';\n" + o + "\n__p+='"), i = s + e.length, e
      }), a += "';\n", n.variable || (a = "with(obj||{}){\n" + a + "}\n"), a = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + a + "return __p;\n";
      try {
        r = new Function(n.variable || "obj", "_", a)
      } catch (s) {
        throw s.source = a, s
      }
      if (e) return r(e, k);
      var u = function(t) {
        return r.call(this, t, k)
      };
      return u.source = "function(" + (n.variable || "obj") + "){\n" + a + "}", u
    }, k.chain = function(t) {
      return k(t).chain()
    };
    var P = function(t) {
      return this._chain ? k(t).chain() : t
    };
    k.mixin(k), $(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(t) {
      var e = r[t];
      k.prototype[t] = function() {
        var n = this._wrapped;
        return e.apply(n, arguments), "shift" != t && "splice" != t || 0 !== n.length || delete n[0], P.call(this, n)
      }
    }), $(["concat", "join", "slice"], function(t) {
      var e = r[t];
      k.prototype[t] = function() {
        return P.call(this, e.apply(this._wrapped, arguments))
      }
    }), k.extend(k.prototype, {
      chain: function() {
        return this._chain = !0, this
      },
      value: function() {
        return this._wrapped
      }
    })
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  ! function(t, e) {
    if ("function" == typeof define && define.amd) define(["underscore", "jquery", "exports"], function(n, r, o) {
      t.Backbone = e(t, o, n, r)
    });
    else if ("undefined" != typeof exports) {
      var n = require("underscore");
      e(t, exports, n)
    } else t.Backbone = e(t, {}, t._, t.jQuery || t.Zepto || t.ender || t.$)
  }(this, function(t, e, n, r) {
    {
      var o = t.Backbone,
        i = [],
        a = (i.push, i.slice);
      i.splice
    }
    e.VERSION = "1.1.2", e.$ = r, e.noConflict = function() {
      return t.Backbone = o, this
    }, e.emulateHTTP = !1, e.emulateJSON = !1;
    var s = e.Events = {
        on: function(t, e, n) {
          if (!c(this, "on", t, [e, n]) || !e) return this;
          this._events || (this._events = {});
          var r = this._events[t] || (this._events[t] = []);
          return r.push({
            callback: e,
            context: n,
            ctx: n || this
          }), this
        },
        once: function(t, e, r) {
          if (!c(this, "once", t, [e, r]) || !e) return this;
          var o = this,
            i = n.once(function() {
              o.off(t, i), e.apply(this, arguments)
            });
          return i._callback = e, this.on(t, i, r)
        },
        off: function(t, e, r) {
          var o, i, a, s, u, l, h, d;
          if (!this._events || !c(this, "off", t, [e, r])) return this;
          if (!t && !e && !r) return this._events = void 0, this;
          for (s = t ? [t] : n.keys(this._events), u = 0, l = s.length; l > u; u++)
            if (t = s[u], a = this._events[t]) {
              if (this._events[t] = o = [], e || r)
                for (h = 0, d = a.length; d > h; h++) i = a[h], (e && e !== i.callback && e !== i.callback._callback || r && r !== i.context) && o.push(i);
              o.length || delete this._events[t]
            }
          return this
        },
        trigger: function(t) {
          if (!this._events) return this;
          var e = a.call(arguments, 1);
          if (!c(this, "trigger", t, e)) return this;
          var n = this._events[t],
            r = this._events.all;
          return n && l(n, e), r && l(r, arguments), this
        },
        stopListening: function(t, e, r) {
          var o = this._listeningTo;
          if (!o) return this;
          var i = !e && !r;
          r || "object" != typeof e || (r = this), t && ((o = {})[t._listenId] = t);
          for (var a in o) t = o[a], t.off(e, r, this), (i || n.isEmpty(t._events)) && delete this._listeningTo[a];
          return this
        }
      },
      u = /\s+/,
      c = function(t, e, n, r) {
        if (!n) return !0;
        if ("object" == typeof n) {
          for (var o in n) t[e].apply(t, [o, n[o]].concat(r));
          return !1
        }
        if (u.test(n)) {
          for (var i = n.split(u), a = 0, s = i.length; s > a; a++) t[e].apply(t, [i[a]].concat(r));
          return !1
        }
        return !0
      },
      l = function(t, e) {
        var n, r = -1,
          o = t.length,
          i = e[0],
          a = e[1],
          s = e[2];
        switch (e.length) {
          case 0:
            for (; ++r < o;)(n = t[r]).callback.call(n.ctx);
            return;
          case 1:
            for (; ++r < o;)(n = t[r]).callback.call(n.ctx, i);
            return;
          case 2:
            for (; ++r < o;)(n = t[r]).callback.call(n.ctx, i, a);
            return;
          case 3:
            for (; ++r < o;)(n = t[r]).callback.call(n.ctx, i, a, s);
            return;
          default:
            for (; ++r < o;)(n = t[r]).callback.apply(n.ctx, e);
            return
        }
      },
      h = {
        listenTo: "on",
        listenToOnce: "once"
      };
    n.each(h, function(t, e) {
      s[e] = function(e, r, o) {
        var i = this._listeningTo || (this._listeningTo = {}),
          a = e._listenId || (e._listenId = n.uniqueId("l"));
        return i[a] = e, o || "object" != typeof r || (o = this), e[t](r, o, this), this
      }
    }), s.bind = s.on, s.unbind = s.off, n.extend(e, s);
    var d = e.Model = function(t, e) {
      var r = t || {};
      e || (e = {}), this.cid = n.uniqueId("c"), this.attributes = {}, e.collection && (this.collection = e.collection), e.parse && (r = this.parse(r, e) || {}), r = n.defaults({}, r, n.result(this, "defaults")), this.set(r, e), this.changed = {}, this.initialize.apply(this, arguments)
    };
    n.extend(d.prototype, s, {
      changed: null,
      validationError: null,
      idAttribute: "id",
      initialize: function() {},
      toJSON: function() {
        return n.clone(this.attributes)
      },
      sync: function() {
        return e.sync.apply(this, arguments)
      },
      get: function(t) {
        return this.attributes[t]
      },
      escape: function(t) {
        return n.escape(this.get(t))
      },
      has: function(t) {
        return null != this.get(t)
      },
      set: function(t, e, r) {
        var o, i, a, s, u, c, l, h;
        if (null == t) return this;
        if ("object" == typeof t ? (i = t, r = e) : (i = {})[t] = e, r || (r = {}), !this._validate(i, r)) return !1;
        a = r.unset, u = r.silent, s = [], c = this._changing, this._changing = !0, c || (this._previousAttributes = n.clone(this.attributes), this.changed = {}), h = this.attributes, l = this._previousAttributes, this.idAttribute in i && (this.id = i[this.idAttribute]);
        for (o in i) e = i[o], n.isEqual(h[o], e) || s.push(o), n.isEqual(l[o], e) ? delete this.changed[o] : this.changed[o] = e, a ? delete h[o] : h[o] = e;
        if (!u) {
          s.length && (this._pending = r);
          for (var d = 0, p = s.length; p > d; d++) this.trigger("change:" + s[d], this, h[s[d]], r)
        }
        if (c) return this;
        if (!u)
          for (; this._pending;) r = this._pending, this._pending = !1, this.trigger("change", this, r);
        return this._pending = !1, this._changing = !1, this
      },
      unset: function(t, e) {
        return this.set(t, void 0, n.extend({}, e, {
          unset: !0
        }))
      },
      clear: function(t) {
        var e = {};
        for (var r in this.attributes) e[r] = void 0;
        return this.set(e, n.extend({}, t, {
          unset: !0
        }))
      },
      hasChanged: function(t) {
        return null == t ? !n.isEmpty(this.changed) : n.has(this.changed, t)
      },
      changedAttributes: function(t) {
        if (!t) return this.hasChanged() ? n.clone(this.changed) : !1;
        var e, r = !1,
          o = this._changing ? this._previousAttributes : this.attributes;
        for (var i in t) n.isEqual(o[i], e = t[i]) || ((r || (r = {}))[i] = e);
        return r
      },
      previous: function(t) {
        return null != t && this._previousAttributes ? this._previousAttributes[t] : null
      },
      previousAttributes: function() {
        return n.clone(this._previousAttributes)
      },
      fetch: function(t) {
        t = t ? n.clone(t) : {}, void 0 === t.parse && (t.parse = !0);
        var e = this,
          r = t.success;
        return t.success = function(n) {
          return e.set(e.parse(n, t), t) ? (r && r(e, n, t), void e.trigger("sync", e, n, t)) : !1
        }, N(this, t), this.sync("read", this, t)
      },
      save: function(t, e, r) {
        var o, i, a, s = this.attributes;
        if (null == t || "object" == typeof t ? (o = t, r = e) : (o = {})[t] = e, r = n.extend({
            validate: !0
          }, r), o && !r.wait) {
          if (!this.set(o, r)) return !1
        } else if (!this._validate(o, r)) return !1;
        o && r.wait && (this.attributes = n.extend({}, s, o)), void 0 === r.parse && (r.parse = !0);
        var u = this,
          c = r.success;
        return r.success = function(t) {
          u.attributes = s;
          var e = u.parse(t, r);
          return r.wait && (e = n.extend(o || {}, e)), n.isObject(e) && !u.set(e, r) ? !1 : (c && c(u, t, r), void u.trigger("sync", u, t, r))
        }, N(this, r), i = this.isNew() ? "create" : r.patch ? "patch" : "update", "patch" === i && (r.attrs = o), a = this.sync(i, this, r), o && r.wait && (this.attributes = s), a
      },
      destroy: function(t) {
        t = t ? n.clone(t) : {};
        var e = this,
          r = t.success,
          o = function() {
            e.trigger("destroy", e, e.collection, t)
          };
        if (t.success = function(n) {
            (t.wait || e.isNew()) && o(), r && r(e, n, t), e.isNew() || e.trigger("sync", e, n, t)
          }, this.isNew()) return t.success(), !1;
        N(this, t);
        var i = this.sync("delete", this, t);
        return t.wait || o(), i
      },
      url: function() {
        var t = n.result(this, "urlRoot") || n.result(this.collection, "url") || O();
        return this.isNew() ? t : t.replace(/([^\/])$/, "$1/") + encodeURIComponent(this.id)
      },
      parse: function(t) {
        return t
      },
      clone: function() {
        return new this.constructor(this.attributes)
      },
      isNew: function() {
        return !this.has(this.idAttribute)
      },
      isValid: function(t) {
        return this._validate({}, n.extend(t || {}, {
          validate: !0
        }))
      },
      _validate: function(t, e) {
        if (!e.validate || !this.validate) return !0;
        t = n.extend({}, this.attributes, t);
        var r = this.validationError = this.validate(t, e) || null;
        return r ? (this.trigger("invalid", this, r, n.extend(e, {
          validationError: r
        })), !1) : !0
      }
    });
    var p = ["keys", "values", "pairs", "invert", "pick", "omit"];
    n.each(p, function(t) {
      d.prototype[t] = function() {
        var e = a.call(arguments);
        return e.unshift(this.attributes), n[t].apply(n, e)
      }
    });
    var f = e.Collection = function(t, e) {
        e || (e = {}), e.model && (this.model = e.model), void 0 !== e.comparator && (this.comparator = e.comparator), this._reset(), this.initialize.apply(this, arguments), t && this.reset(t, n.extend({
          silent: !0
        }, e))
      },
      m = {
        add: !0,
        remove: !0,
        merge: !0
      },
      y = {
        add: !0,
        remove: !1
      };
    n.extend(f.prototype, s, {
      model: d,
      initialize: function() {},
      toJSON: function(t) {
        return this.map(function(e) {
          return e.toJSON(t)
        })
      },
      sync: function() {
        return e.sync.apply(this, arguments)
      },
      add: function(t, e) {
        return this.set(t, n.extend({
          merge: !1
        }, e, y))
      },
      remove: function(t, e) {
        var r = !n.isArray(t);
        t = r ? [t] : n.clone(t), e || (e = {});
        var o, i, a, s;
        for (o = 0, i = t.length; i > o; o++) s = t[o] = this.get(t[o]), s && (delete this._byId[s.id], delete this._byId[s.cid], a = this.indexOf(s), this.models.splice(a, 1), this.length--, e.silent || (e.index = a, s.trigger("remove", s, this, e)), this._removeReference(s, e));
        return r ? t[0] : t
      },
      set: function(t, e) {
        e = n.defaults({}, e, m), e.parse && (t = this.parse(t, e));
        var r = !n.isArray(t);
        t = r ? t ? [t] : [] : n.clone(t);
        var o, i, a, s, u, c, l, h = e.at,
          p = this.model,
          f = this.comparator && null == h && e.sort !== !1,
          y = n.isString(this.comparator) ? this.comparator : null,
          v = [],
          g = [],
          w = {},
          _ = e.add,
          b = e.merge,
          C = e.remove,
          k = !f && _ && C ? [] : !1;
        for (o = 0, i = t.length; i > o; o++) {
          if (u = t[o] || {}, a = u instanceof d ? s = u : u[p.prototype.idAttribute || "id"], c = this.get(a)) C && (w[c.cid] = !0), b && (u = u === s ? s.attributes : u, e.parse && (u = c.parse(u, e)), c.set(u, e), f && !l && c.hasChanged(y) && (l = !0)), t[o] = c;
          else if (_) {
            if (s = t[o] = this._prepareModel(u, e), !s) continue;
            v.push(s), this._addReference(s, e)
          }
          s = c || s, !k || !s.isNew() && w[s.id] || k.push(s), w[s.id] = !0
        }
        if (C) {
          for (o = 0, i = this.length; i > o; ++o) w[(s = this.models[o]).cid] || g.push(s);
          g.length && this.remove(g, e)
        }
        if (v.length || k && k.length)
          if (f && (l = !0), this.length += v.length, null != h)
            for (o = 0, i = v.length; i > o; o++) this.models.splice(h + o, 0, v[o]);
          else {
            k && (this.models.length = 0);
            var $ = k || v;
            for (o = 0, i = $.length; i > o; o++) this.models.push($[o])
          }
        if (l && this.sort({
            silent: !0
          }), !e.silent) {
          for (o = 0, i = v.length; i > o; o++)(s = v[o]).trigger("add", s, this, e);
          (l || k && k.length) && this.trigger("sort", this, e)
        }
        return r ? t[0] : t
      },
      reset: function(t, e) {
        e || (e = {});
        for (var r = 0, o = this.models.length; o > r; r++) this._removeReference(this.models[r], e);
        return e.previousModels = this.models, this._reset(), t = this.add(t, n.extend({
          silent: !0
        }, e)), e.silent || this.trigger("reset", this, e), t
      },
      push: function(t, e) {
        return this.add(t, n.extend({
          at: this.length
        }, e))
      },
      pop: function(t) {
        var e = this.at(this.length - 1);
        return this.remove(e, t), e
      },
      unshift: function(t, e) {
        return this.add(t, n.extend({
          at: 0
        }, e))
      },
      shift: function(t) {
        var e = this.at(0);
        return this.remove(e, t), e
      },
      slice: function() {
        return a.apply(this.models, arguments)
      },
      get: function(t) {
        return null == t ? void 0 : this._byId[t] || this._byId[t.id] || this._byId[t.cid]
      },
      at: function(t) {
        return this.models[t]
      },
      where: function(t, e) {
        return n.isEmpty(t) ? e ? void 0 : [] : this[e ? "find" : "filter"](function(e) {
          for (var n in t)
            if (t[n] !== e.get(n)) return !1;
          return !0
        })
      },
      findWhere: function(t) {
        return this.where(t, !0)
      },
      sort: function(t) {
        if (!this.comparator) throw new Error("Cannot sort a set without a comparator");
        return t || (t = {}), n.isString(this.comparator) || 1 === this.comparator.length ? this.models = this.sortBy(this.comparator, this) : this.models.sort(n.bind(this.comparator, this)), t.silent || this.trigger("sort", this, t), this
      },
      pluck: function(t) {
        return n.invoke(this.models, "get", t)
      },
      fetch: function(t) {
        t = t ? n.clone(t) : {}, void 0 === t.parse && (t.parse = !0);
        var e = t.success,
          r = this;
        return t.success = function(n) {
          var o = t.reset ? "reset" : "set";
          r[o](n, t), e && e(r, n, t), r.trigger("sync", r, n, t)
        }, N(this, t), this.sync("read", this, t)
      },
      create: function(t, e) {
        if (e = e ? n.clone(e) : {}, !(t = this._prepareModel(t, e))) return !1;
        e.wait || this.add(t, e);
        var r = this,
          o = e.success;
        return e.success = function(t, n) {
          e.wait && r.add(t, e), o && o(t, n, e)
        }, t.save(null, e), t
      },
      parse: function(t) {
        return t
      },
      clone: function() {
        return new this.constructor(this.models)
      },
      _reset: function() {
        this.length = 0, this.models = [], this._byId = {}
      },
      _prepareModel: function(t, e) {
        if (t instanceof d) return t;
        e = e ? n.clone(e) : {}, e.collection = this;
        var r = new this.model(t, e);
        return r.validationError ? (this.trigger("invalid", this, r.validationError, e), !1) : r
      },
      _addReference: function(t) {
        this._byId[t.cid] = t, null != t.id && (this._byId[t.id] = t), t.collection || (t.collection = this), t.on("all", this._onModelEvent, this)
      },
      _removeReference: function(t) {
        this === t.collection && delete t.collection, t.off("all", this._onModelEvent, this)
      },
      _onModelEvent: function(t, e, n, r) {
        ("add" !== t && "remove" !== t || n === this) && ("destroy" === t && this.remove(e, r), e && t === "change:" + e.idAttribute && (delete this._byId[e.previous(e.idAttribute)], null != e.id && (this._byId[e.id] = e)), this.trigger.apply(this, arguments))
      }
    });
    var v = ["forEach", "each", "map", "collect", "reduce", "foldl", "inject", "reduceRight", "foldr", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "toArray", "size", "first", "head", "take", "initial", "rest", "tail", "drop", "last", "without", "difference", "indexOf", "shuffle", "lastIndexOf", "isEmpty", "chain", "sample"];
    n.each(v, function(t) {
      f.prototype[t] = function() {
        var e = a.call(arguments);
        return e.unshift(this.models), n[t].apply(n, e)
      }
    });
    var g = ["groupBy", "countBy", "sortBy", "indexBy"];
    n.each(g, function(t) {
      f.prototype[t] = function(e, r) {
        var o = n.isFunction(e) ? e : function(t) {
          return t.get(e)
        };
        return n[t](this.models, o, r)
      }
    });
    var w = e.View = function(t) {
        this.cid = n.uniqueId("view"), t || (t = {}), n.extend(this, n.pick(t, b)), this._ensureElement(), this.initialize.apply(this, arguments), this.delegateEvents()
      },
      _ = /^(\S+)\s*(.*)$/,
      b = ["model", "collection", "el", "id", "attributes", "className", "tagName", "events"];
    n.extend(w.prototype, s, {
      tagName: "div",
      $: function(t) {
        return this.$el.find(t)
      },
      initialize: function() {},
      render: function() {
        return this
      },
      remove: function() {
        return this.$el.remove(), this.stopListening(), this
      },
      setElement: function(t, n) {
        return this.$el && this.undelegateEvents(), this.$el = t instanceof e.$ ? t : e.$(t), this.el = this.$el[0], n !== !1 && this.delegateEvents(), this
      },
      delegateEvents: function(t) {
        if (!t && !(t = n.result(this, "events"))) return this;
        this.undelegateEvents();
        for (var e in t) {
          var r = t[e];
          if (n.isFunction(r) || (r = this[t[e]]), r) {
            var o = e.match(_),
              i = o[1],
              a = o[2];
            r = n.bind(r, this), i += ".delegateEvents" + this.cid, "" === a ? this.$el.on(i, r) : this.$el.on(i, a, r)
          }
        }
        return this
      },
      undelegateEvents: function() {
        return this.$el.off(".delegateEvents" + this.cid), this
      },
      _ensureElement: function() {
        if (this.el) this.setElement(n.result(this, "el"), !1);
        else {
          var t = n.extend({}, n.result(this, "attributes"));
          this.id && (t.id = n.result(this, "id")), this.className && (t["class"] = n.result(this, "className"));
          var r = e.$("<" + n.result(this, "tagName") + ">").attr(t);
          this.setElement(r, !1)
        }
      }
    }), e.sync = function(t, r, o) {
      var i = k[t];
      n.defaults(o || (o = {}), {
        emulateHTTP: e.emulateHTTP,
        emulateJSON: e.emulateJSON
      });
      var a = {
        type: i,
        dataType: "json"
      };
      if (o.url || (a.url = n.result(r, "url") || O()), null != o.data || !r || "create" !== t && "update" !== t && "patch" !== t || (a.contentType = "application/json", a.data = JSON.stringify(o.attrs || r.toJSON(o))), o.emulateJSON && (a.contentType = "application/x-www-form-urlencoded", a.data = a.data ? {
          model: a.data
        } : {}), o.emulateHTTP && ("PUT" === i || "DELETE" === i || "PATCH" === i)) {
        a.type = "POST", o.emulateJSON && (a.data._method = i);
        var s = o.beforeSend;
        o.beforeSend = function(t) {
          return t.setRequestHeader("X-HTTP-Method-Override", i), s ? s.apply(this, arguments) : void 0
        }
      }
      "GET" === a.type || o.emulateJSON || (a.processData = !1), "PATCH" === a.type && C && (a.xhr = function() {
        return new ActiveXObject("Microsoft.XMLHTTP")
      });
      var u = o.xhr = e.ajax(n.extend(a, o));
      return r.trigger("request", r, u, o), u
    };
    var C = !("undefined" == typeof window || !window.ActiveXObject || window.XMLHttpRequest && (new XMLHttpRequest).dispatchEvent),
      k = {
        create: "POST",
        update: "PUT",
        patch: "PATCH",
        "delete": "DELETE",
        read: "GET"
      };
    e.ajax = function() {
      return e.$.ajax.apply(e.$, arguments)
    };
    var $ = e.Router = function(t) {
        t || (t = {}), t.routes && (this.routes = t.routes), this._bindRoutes(), this.initialize.apply(this, arguments)
      },
      x = /\((.*?)\)/g,
      T = /(\(\?)?:\w+/g,
      S = /\*\w+/g,
      M = /[\-{}\[\]+?.,\\\^$|#\s]/g;
    n.extend($.prototype, s, {
      initialize: function() {},
      route: function(t, r, o) {
        n.isRegExp(t) || (t = this._routeToRegExp(t)), n.isFunction(r) && (o = r, r = ""), o || (o = this[r]);
        var i = this;
        return e.history.route(t, function(n) {
          var a = i._extractParameters(t, n);
          i.execute(o, a), i.trigger.apply(i, ["route:" + r].concat(a)), i.trigger("route", r, a), e.history.trigger("route", i, r, a)
        }), this
      },
      execute: function(t, e) {
        t && t.apply(this, e)
      },
      navigate: function(t, n) {
        return e.history.navigate(t, n), this
      },
      _bindRoutes: function() {
        if (this.routes) {
          this.routes = n.result(this, "routes");
          for (var t, e = n.keys(this.routes); null != (t = e.pop());) this.route(t, this.routes[t])
        }
      },
      _routeToRegExp: function(t) {
        return t = t.replace(M, "\\$&").replace(x, "(?:$1)?").replace(T, function(t, e) {
          return e ? t : "([^/?]+)"
        }).replace(S, "([^?]*?)"), new RegExp("^" + t + "(?:\\?([\\s\\S]*))?$")
      },
      _extractParameters: function(t, e) {
        var r = t.exec(e).slice(1);
        return n.map(r, function(t, e) {
          return e === r.length - 1 ? t || null : t ? decodeURIComponent(t) : null
        })
      }
    });
    var R = e.History = function() {
        this.handlers = [], n.bindAll(this, "checkUrl"), "undefined" != typeof window && (this.location = window.location, this.history = window.history)
      },
      F = /^[#\/]|\s+$/g,
      E = /^\/+|\/+$/g,
      I = /msie [\w.]+/,
      A = /\/$/,
      W = /#.*$/;
    R.started = !1, n.extend(R.prototype, s, {
      interval: 50,
      atRoot: function() {
        return this.location.pathname.replace(/[^\/]$/, "$&/") === this.root
      },
      getHash: function(t) {
        var e = (t || this).location.href.match(/#(.*)$/);
        return e ? e[1] : ""
      },
      getFragment: function(t, e) {
        if (null == t)
          if (this._hasPushState || !this._wantsHashChange || e) {
            t = decodeURI(this.location.pathname + this.location.search);
            var n = this.root.replace(A, "");
            t.indexOf(n) || (t = t.slice(n.length))
          } else t = this.getHash();
        return t.replace(F, "")
      },
      start: function(t) {
        if (R.started) throw new Error("Backbone.history has already been started");
        R.started = !0, this.options = n.extend({
          root: "/"
        }, this.options, t), this.root = this.options.root, this._wantsHashChange = this.options.hashChange !== !1, this._wantsPushState = !!this.options.pushState, this._hasPushState = !!(this.options.pushState && this.history && this.history.pushState);
        var r = this.getFragment(),
          o = document.documentMode,
          i = I.exec(navigator.userAgent.toLowerCase()) && (!o || 7 >= o);
        if (this.root = ("/" + this.root + "/").replace(E, "/"), i && this._wantsHashChange) {
          var a = e.$('<iframe src="javascript:0" tabindex="-1">');
          this.iframe = a.hide().appendTo("body")[0].contentWindow, this.navigate(r)
        }
        this._hasPushState ? e.$(window).on("popstate", this.checkUrl) : this._wantsHashChange && "onhashchange" in window && !i ? e.$(window).on("hashchange", this.checkUrl) : this._wantsHashChange && (this._checkUrlInterval = setInterval(this.checkUrl, this.interval)), this.fragment = r;
        var s = this.location;
        if (this._wantsHashChange && this._wantsPushState) {
          if (!this._hasPushState && !this.atRoot()) return this.fragment = this.getFragment(null, !0), this.location.replace(this.root + "#" + this.fragment), !0;
          this._hasPushState && this.atRoot() && s.hash && (this.fragment = this.getHash().replace(F, ""), this.history.replaceState({}, document.title, this.root + this.fragment))
        }
        return this.options.silent ? void 0 : this.loadUrl()
      },
      stop: function() {
        e.$(window).off("popstate", this.checkUrl).off("hashchange", this.checkUrl), this._checkUrlInterval && clearInterval(this._checkUrlInterval), R.started = !1
      },
      route: function(t, e) {
        this.handlers.unshift({
          route: t,
          callback: e
        })
      },
      checkUrl: function() {
        var t = this.getFragment();
        return t === this.fragment && this.iframe && (t = this.getFragment(this.getHash(this.iframe))), t === this.fragment ? !1 : (this.iframe && this.navigate(t), void this.loadUrl())
      },
      loadUrl: function(t) {
        return t = this.fragment = this.getFragment(t), n.any(this.handlers, function(e) {
          return e.route.test(t) ? (e.callback(t), !0) : void 0
        })
      },
      navigate: function(t, e) {
        if (!R.started) return !1;
        e && e !== !0 || (e = {
          trigger: !!e
        });
        var n = this.root + (t = this.getFragment(t || ""));
        if (t = t.replace(W, ""), this.fragment !== t) {
          if (this.fragment = t, "" === t && "/" !== n && (n = n.slice(0, -1)), this._hasPushState) this.history[e.replace ? "replaceState" : "pushState"]({}, document.title, n);
          else {
            if (!this._wantsHashChange) return this.location.assign(n);
            this._updateHash(this.location, t, e.replace), this.iframe && t !== this.getFragment(this.getHash(this.iframe)) && (e.replace || this.iframe.document.open().close(), this._updateHash(this.iframe.location, t, e.replace))
          }
          return e.trigger ? this.loadUrl(t) : void 0
        }
      },
      _updateHash: function(t, e, n) {
        if (n) {
          var r = t.href.replace(/(javascript:|#).*$/, "");
          t.replace(r + "#" + e)
        } else t.hash = "#" + e
      }
    }), e.history = new R;
    var j = function(t, e) {
      var r, o = this;
      r = t && n.has(t, "constructor") ? t.constructor : function() {
        return o.apply(this, arguments)
      }, n.extend(r, o, e);
      var i = function() {
        this.constructor = r
      };
      return i.prototype = o.prototype, r.prototype = new i, t && n.extend(r.prototype, t), r.__super__ = o.prototype, r
    };
    d.extend = f.extend = $.extend = w.extend = R.extend = j;
    var O = function() {
        throw new Error('A "url" property or function must be specified')
      },
      N = function(t, e) {
        var n = e.error;
        e.error = function(r) {
          n && n(t, r, e), t.trigger("error", t, r, e)
        }
      };
    return e
  })
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t;
    t = {}, null == window.modula && (window.modula = {
      "export": function(e, n) {
        return t[e] = n
      },
      require: function(e) {
        var n;
        if (n = t[e]) return n;
        throw "Module '" + e + "' not found."
      }
    })
  }).call(this),
    function() {
      window.AsyncFn = function() {
        function t(t) {
          this.dfd = new $.Deferred, this.fn = t
        }
        return t.prototype.done = function(t) {
          return this.callback = t, this.isCalled ? this.callback() : void 0
        }, t.prototype.call = function() {
          return this.isCalled ? void 0 : this.fn().always(function(t) {
            return function() {
              return t.isCalled = !0, t.dfd.resolve(), t.callback ? t.callback() : void 0
            }
          }(this))
        }, t.addToCallQueue = function(e) {
          var n;
          return n = new t(e), null != this.currentFn ? this.currentFn.done(function() {
            return function() {
              return n.call()
            }
          }(this)) : n.call(), this.currentFn = n
        }, t.setImmediate = function() {
          var t, e, n, r;
          return e = {}, r = e, t = Math.random(), n = function(n) {
            var r;
            if (n.data.toString() === t.toString()) return e = e.next, r = e.func, delete e.func, r()
          }, window.addEventListener && window.postMessage ? (window.addEventListener("message", n, !1), function(e) {
            return r = r.next = {
              func: e
            }, window.postMessage(t, "*")
          }) : function(t) {
            return setTimeout(t, 0)
          }
        }(), t
      }(), modula["export"]("async_fn", AsyncFn)
    }.call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t;
    t = {}, null == window.modula && (window.modula = {
      "export": function(e, n) {
        return t[e] = n
      },
      require: function(e) {
        var n;
        if (n = t[e]) return n;
        throw "Module '" + e + "' not found."
      }
    })
  }).call(this),
    function() {
      var t;
      t = function() {
        function t() {}
        return t.prototype.viewSelector = "[data-view]", t.prototype.componentSelector = "[data-component]", t.prototype.selector = "[data-component], [data-view]", t.prototype.namespacePattern = /(.+)#(.+)/, t.prototype.isComponentIndex = function(t) {
          return null != t.data("component")
        }, t.prototype.nodeUnderscoredName = function(t) {
          return this.isComponentIndex(t) ? t.data("component") : t.data("view") || ""
        }, t.prototype.isStandAlone = function(t) {
          return !this.isComponentIndex(t) && this.namespacePattern.test(this.nodeUnderscoredName(t))
        }, t.prototype.extractStandAloneNodeData = function(t) {
          var e, n, r, o;
          return o = this.nodeUnderscoredName(t).match(this.namespacePattern), r = o[0], e = o[1], n = o[2], [e, n]
        }, t.prototype.extractComponentIndexNodeData = function(t) {
          var e, n, r, o;
          return o = this.nodeUnderscoredName(t).match(this.namespacePattern), r = o[0], n = o[1], e = o[2], [n, e]
        }, t
      }(), modula["export"]("vtree/configuration", t)
    }.call(this),
    function() {
      var t, e;
      t = modula.require("vtree/configuration"), e = function() {
        function e() {}
        return e.initNodes = function() {
          return this._launcher().launch(), this._launcher().createViewsTree()
        }, e.initNodesAsync = function() {
          return AsyncFn.addToCallQueue(function(t) {
            return function() {
              var e;
              return e = new $.Deferred, AsyncFn.setImmediate(function() {
                return t.initNodes(), e.resolve()
              }), e.promise()
            }
          }(this))
        }, e.onNodeInit = function(t) {
          return this.hooks().onInit(t)
        }, e.getInitCallbacks = function() {
          return this.hooks().onInitCallbacks()
        }, e.onNodeUnload = function(t) {
          return this.hooks().onUnload(t)
        }, e.getUnloadCallbacks = function() {
          return this.hooks().onUnloadCallbacks()
        }, e.configure = function(t) {
          return _.extend(this.config(), t)
        }, e.config = function() {
          return null != this._config ? this._config : this._config = new t
        }, e.hooks = function() {
          var t;
          return null != this._hooks ? this._hooks : (t = modula.require("vtree/hooks"), null != this._hooks ? this._hooks : this._hooks = new t)
        }, e._launcher = function() {
          return null != this.__launcher ? this.__launcher : this.__launcher = modula.require("vtree/launcher")
        }, e
      }(), modula["export"]("vtree", e), window.Vtree = e
    }.call(this),
    function() {
      var t, e = [].slice;
      t = function() {
        function t() {}
        return t.prototype.onInit = function(t) {
          return this.onInitCallbacks().push(t)
        }, t.prototype.onInitCallbacks = function() {
          return null != this._onInitCallbacks ? this._onInitCallbacks : this._onInitCallbacks = []
        }, t.prototype.init = function() {
          var t, n, r, o, i, a;
          for (t = 1 <= arguments.length ? e.call(arguments, 0) : [], i = this.onInitCallbacks(), a = [], r = 0, o = i.length; o > r; r++) n = i[r], a.push(n.apply(null, t));
          return a
        }, t.prototype.onActivation = function(t) {
          return this.onActivationCallbacks().push(t)
        }, t.prototype.onActivationCallbacks = function() {
          return null != this._onActivationCallbacks ? this._onActivationCallbacks : this._onActivationCallbacks = []
        }, t.prototype.activate = function() {
          var t, n, r, o, i, a;
          for (t = 1 <= arguments.length ? e.call(arguments, 0) : [], i = this.onActivationCallbacks(), a = [], r = 0, o = i.length; o > r; r++) n = i[r], a.push(n.apply(null, t));
          return a
        }, t.prototype.onUnload = function(t) {
          return this.onUnloadCallbacks().push(t)
        }, t.prototype.onUnloadCallbacks = function() {
          return null != this._onUnloadCallbacks ? this._onUnloadCallbacks : this._onUnloadCallbacks = []
        }, t.prototype.unload = function() {
          var t, n, r, o, i, a;
          for (t = 1 <= arguments.length ? e.call(arguments, 0) : [], i = this.onUnloadCallbacks(), a = [], r = 0, o = i.length; o > r; r++) n = i[r], a.push(n.apply(null, t));
          return a
        }, t.prototype._reset = function() {
          return this._onInitCallbacks = [], this._onActivationCallbacks = [], this._onUnloadCallbacks = []
        }, t
      }(), modula["export"]("vtree/hooks", t)
    }.call(this),
    function() {
      var t;
      t = function() {
        function t(t, e) {
          this.nodes = null != t ? t : {}, this.rootNodes = null != e ? e : []
        }
        return t.prototype.show = function() {
          return this.nodes
        }, t.prototype.showRootNodes = function() {
          return this.rootNodes
        }, t.prototype.add = function(t) {
          return this.nodes[t.id] = t
        }, t.prototype.addAsRoot = function(t) {
          if (null == this.nodes[t.id]) throw new Error("Trying to add node as root, but node is not cached previously");
          return this.rootNodes.push(t)
        }, t.prototype.getById = function(t) {
          return this.nodes[t]
        }, t.prototype.removeById = function(t) {
          var e;
          return -1 !== (e = _.indexOf(this.rootNodes, this.nodes[t])) && this.rootNodes.splice(e, 1), delete this.nodes[t]
        }, t.prototype.clear = function() {
          return this.nodes = {}, this.rootNodes = []
        }, t
      }(), modula["export"]("vtree/vtree_nodes_cache", t)
    }.call(this),
    function() {
      var t, e;
      t = modula.require("vtree/hooks"), e = function() {
        function e(e, r) {
          this.$el = e, this.hooks = r || new t, this.el = this.$el[0], this.id = "nodeId" + n, this.parent = null, this.children = [], n++, this.init()
        }
        var n;
        return n = 1, e.prototype.setParent = function(t) {
          return this.parent = t
        }, e.prototype.prependChild = function(t) {
          return this.children.unshift(t)
        }, e.prototype.appendChild = function(t) {
          return this.children.push(t)
        }, e.prototype.removeChild = function(t) {
          var e;
          if (-1 !== (e = _.indexOf(this.children, t))) return this.children.splice(e, 1)
        }, e.prototype.init = function() {
          return this.hooks.init(this)
        }, e.prototype.activate = function() {
          return this.isActivated() ? void 0 : (this.setAsActivated(), this.hooks.activate(this))
        }, e.prototype.remove = function() {
          return this.isRemoved() ? void 0 : (this.setAsRemoved(), this.isActivated() ? this.unload() : void 0)
        }, e.prototype.unload = function() {
          return this.hooks.unload(this), this.setAsNotActivated()
        }, e.prototype.setAsActivated = function() {
          return this._isActivated = !0
        }, e.prototype.setAsNotActivated = function() {
          return this._isActivated = !1
        }, e.prototype.isActivated = function() {
          return null != this._isActivated ? this._isActivated : this._isActivated = !1
        }, e.prototype.setAsRemoved = function() {
          return this._isRemoved = !0
        }, e.prototype.isRemoved = function() {
          return null != this._isRemoved ? this._isRemoved : this._isRemoved = !1
        }, e
      }(), modula["export"]("vtree/node", e)
    }.call(this),
    function() {
      var t;
      t = function() {
        function t(t) {
          _.extend(this, t), this.data = {}
        }
        return t.prototype.el = null, t.prototype.$el = null, t.prototype.isComponentIndex = null, t.prototype.isComponentPart = null, t.prototype.isStandAlone = null, t.prototype.componentId = null, t.prototype.componentIndexNode = null, t.prototype.nodeName = null, t.prototype.componentName = null, t.prototype.namespaceName = null, t.prototype.nodeNameUnderscored = null, t.prototype.componentNameUnderscored = null, t.prototype.namespaceNameUnderscored = null, t.prototype.setData = function(t, e) {
          return this.data[t] = e
        }, t.prototype.getData = function(t) {
          return this.data[t]
        }, t
      }(), modula["export"]("vtree/node_data", t)
    }.call(this),
    function() {
      var t, e, n;
      n = modula.require("vtree"), t = modula.require("vtree/node_data"), e = function() {
        function e(t) {
          this.node = t, this.$el = this.node.$el, this.el = this.node.el, this.isComponentIndex() && o++, this.identifyNodeAttributes(), this.initNodeDataObject()
        }
        var r, o;
        return o = 0, r = "semarf", e.prototype.identifyNodeAttributes = function() {
          var t;
          return this.isStandAlone() ? (t = n.config().extractStandAloneNodeData(this.$el), this.namespaceName = t[0], this.nodeName = t[1], t) : (this.namespaceName = this.component().namespace, this.nodeName = this.isComponentIndex() ? "index" : this.nodeUnderscoredName())
        }, e.prototype.initNodeDataObject = function() {
          var t;
          return this.nodeData = this.initNodeData(), null != (t = this._hooks()) && "function" == typeof t.init ? t.init(this.nodeData) : void 0
        }, e.prototype.initNodeData = function() {
          var e, n, r, o, i, a;
          return o = this.namespaceName, r = this._camelize(this.namespaceName), this.isStandAlone() ? (n = null, e = null) : (n = this.component().name, e = this._camelize(n)), new t({
            el: this.el,
            $el: this.$el,
            isStandAlone: this.isStandAlone(),
            isComponentIndex: this.isComponentIndex(),
            isComponentPart: !this.isStandAlone(),
            componentId: this.isStandAlone() ? null : this.component().id,
            componentIndexNode: (null != (i = this.componentIndexNode()) && null != (a = i.nodeWrapper) ? a.nodeData : void 0) || null,
            nodeName: this._camelize(this.nodeName),
            nodeNameUnderscored: this.nodeName,
            componentName: e,
            componentNameUnderscored: n,
            namespaceName: r,
            namespaceNameUnderscored: o
          })
        }, e.prototype.unload = function() {
          var t;
          return null != (t = this._hooks()) && "function" == typeof t.unload && t.unload(this.nodeData), delete this.nodeData, delete this.node
        }, e.prototype.isStandAlone = function() {
          return null != this._isStandAlone ? this._isStandAlone : this._isStandAlone = n.config().isStandAlone(this.$el)
        }, e.prototype.component = function() {
          var t, e, i;
          return null != this._component ? this._component : this._component = this.isComponentIndex() ? (i = n.config().extractComponentIndexNodeData(this.$el), e = i[0], t = i[1], i, {
            namespace: e,
            name: t,
            id: o,
            node: this.node
          }) : null != this.node.parent ? this.node.parent.nodeWrapper.component() : {
            namespace: r,
            name: r,
            id: 0,
            node: this.node
          }
        }, e.prototype.componentIndexNode = function() {
          return null != this._componentIndexNode ? this._componentIndexNode : this._componentIndexNode = this.isStandAlone() || this.isComponentIndex() ? null : this.component().node
        }, e.prototype.isComponentIndex = function() {
          return null != this._isComponentIndex ? this._isComponentIndex : this._isComponentIndex = n.config().isComponentIndex(this.$el)
        }, e.prototype.nodeUnderscoredName = function() {
          return null != this._nodeUnderscoredName ? this._nodeUnderscoredName : this._nodeUnderscoredName = n.config().nodeUnderscoredName(this.$el)
        }, e.prototype._hooks = function() {
          return n.hooks()
        }, e.prototype._camelize = function(t) {
          return t.replace(/(?:^|[-_])(\w)/g, function(t, e) {
            return e ? e.toUpperCase() : ""
          })
        }, e
      }(), modula["export"]("vtree/node_wrapper", e)
    }.call(this),
    function() {
      var t, e, n, r, o, i;
      i = modula.require("vtree"), r = modula.require("vtree/vtree_nodes_cache"), e = modula.require("vtree/node"), n = modula.require("vtree/node_wrapper"), t = modula.require("vtree/hooks"), o = function() {
        function o() {
          this.initNodeHooks(), this.initialNodes = [], this.nodesCache = new r
        }
        return o.prototype.initNodeHooks = function() {
          return this.hooks = new t, this.hooks.onInit(_.bind(this.addNodeIdToElData, this)), this.hooks.onInit(_.bind(this.addRemoveEventHandlerToEl, this)), this.hooks.onActivation(_.bind(this.addNodeWrapper, this)), this.hooks.onUnload(_.bind(this.unloadNode, this)), this.hooks.onUnload(_.bind(this.deleteNodeWrapper, this))
        }, o.prototype.createTree = function() {
          return this.setInitialNodes(), this.setParentsForInitialNodes(), this.setChildrenForInitialNodes(), this.activateInitialNodes()
        }, o.prototype.setInitialNodes = function() {
          var t, n, r, o, a, s;
          for (t = $(i.config().selector), this.initialNodes = [], s = [], n = o = 0, a = t.length; a >= 0 ? a > o : o > a; n = a >= 0 ? ++o : --o) r = new e(t.eq(n), this.hooks), this.nodesCache.add(r), s.push(this.initialNodes.push(r));
          return s
        }, o.prototype.setParentsForInitialNodes = function() {
          return this.setParentsForNodes(this.initialNodes)
        }, o.prototype.setChildrenForInitialNodes = function() {
          return this.setChildrenForNodes(this.initialNodes)
        }, o.prototype.setParentsForNodes = function(t) {
          var e, n, r, o, a, s;
          for (s = [], o = 0, a = t.length; a > o; o++) n = t[o], e = n.$el.parent().closest(i.config().selector), 0 === e.length ? s.push(this.nodesCache.addAsRoot(n)) : (r = e.data("vtree-node-id"), s.push(n.parent = this.nodesCache.getById(r)));
          return s
        }, o.prototype.setChildrenForNodes = function(t) {
          var e, n, r, o, i, a;
          if (t.length) {
            for (a = [], e = r = o = t.length - 1; 0 >= o ? 0 >= r : r >= 0; e = 0 >= o ? ++r : --r) n = t[e], a.push(null != (i = n.parent) ? i.prependChild(n) : void 0);
            return a
          }
        }, o.prototype.activateInitialNodes = function() {
          return this.activateRootNodes(this.initialNodes)
        }, o.prototype.activateRootNodes = function() {
          var t, e, n, r, o;
          for (e = this.nodesCache.showRootNodes(), o = [], n = 0, r = e.length; r > n; n++) t = e[n], o.push(this.activateNode(t));
          return o
        }, o.prototype.activateNode = function(t) {
          var e, n, r, o, i;
          for (t.activate(), o = t.children, i = [], n = 0, r = o.length; r > n; n++) e = o[n], i.push(this.activateNode(e));
          return i
        }, o.prototype.removeNode = function(t) {
          return t.isRemoved() ? void 0 : (t.parent && t.parent.removeChild(t), this.removeChildNodes(t), t.remove(), this.nodesCache.removeById(t.id))
        }, o.prototype.removeChildNodes = function(t) {
          var e, n, r, o, i;
          for (o = t.children, i = [], n = 0, r = o.length; r > n; n++) e = o[n], this.removeChildNodes(e), e.remove(), i.push(this.nodesCache.removeById(e.id));
          return i
        }, o.prototype.refresh = function(t) {
          var n, r, o, a, s, u, c, l, h, d;
          for (r = t.$el.find(i.config().selector), a = [t], o = c = 0, d = r.length; d >= 0 ? d > c : c > d; o = d >= 0 ? ++c : --c) n = r.eq(o), (u = n.data("vtree-node-id")) ? s = this.nodesCache.getById(u) : (s = new e(n, this.hooks), this.nodesCache.add(s)), a.push(s);
          for (l = 0, h = a.length; h > l; l++) s = a[l], s.children.length = 0;
          return this.setParentsForNodes(a), this.setChildrenForNodes(a), this.activateNode(t)
        }, o.prototype.addNodeIdToElData = function(t) {
          return t.$el.data("vtree-node-id", t.id)
        }, o.prototype.addRemoveEventHandlerToEl = function(t) {
          return t.$el.on("remove", function(e) {
            return function() {
              return e.removeNode(t)
            }
          }(this))
        }, o.prototype.addNodeWrapper = function(t) {
          return t.nodeWrapper = new n(t)
        }, o.prototype.unloadNode = function(t) {
          var e;
          return null != (e = t.nodeWrapper) && "function" == typeof e.unload ? e.unload() : void 0
        }, o.prototype.deleteNodeWrapper = function(t) {
          return delete t.nodeWrapper
        }, o
      }(), modula["export"]("vtree/tree_manager", o)
    }.call(this),
    function() {
      var t, e, n;
      n = modula.require("vtree"), e = modula.require("vtree/tree_manager"), t = function() {
        function t() {}
        return t.launch = function() {
          return this.initTreeManager(), this.initRemoveEvent(), this.initRefreshEvent()
        }, t.initTreeManager = function() {
          return this.isTreeManagerInitialized() ? void 0 : (this.setTreeManagerAsInitialized(), this.treeManager = new e)
        }, t.initRemoveEvent = function() {
          return this.isRemoveEventInitialized() ? void 0 : (this.setRemoveEventAsInitialized(), $.event.special.remove = {
            remove: function(t) {
              var e, n;
              return n = this, e = {
                type: "remove",
                data: t.data,
                currentTarget: n
              }, t.handler(e)
            }
          })
        }, t.initRefreshEvent = function() {
          var t;
          if (!this.isRefreshEventInitialized()) return this.setRefreshEventAsInitialized(), t = function(t) {
            return function(e) {
              var r, o, i;
              for (e.stopPropagation(), r = $(e.currentTarget).closest(n.config().selector), i = r.data("vtree-node-id"); r.length && !i;) r = r.parent().closest(n.config().selector), i = r.data("vtree-node-id");
              return i ? (o = t.treeManager.nodesCache.getById(i), t.treeManager.refresh(o)) : void 0
            }
          }(this), $("body").on("refresh", t), $("body").on("refresh", "*", t)
        }, t.createViewsTree = function() {
          return this.treeManager.createTree()
        }, t.isTreeManagerInitialized = function() {
          return null != this._isTreeManagerInitialized ? this._isTreeManagerInitialized : this._isTreeManagerInitialized = !1
        }, t.setTreeManagerAsInitialized = function() {
          return this._isTreeManagerInitialized = !0
        }, t.isRemoveEventInitialized = function() {
          return null != this._isRemoveEventInitialized ? this._isRemoveEventInitialized : this._isRemoveEventInitialized = !1
        }, t.setRemoveEventAsInitialized = function() {
          return this._isRemoveEventInitialized = !0
        }, t.isRefreshEventInitialized = function() {
          return null != this._isRefreshEventInitialized ? this._isRefreshEventInitialized : this._isRefreshEventInitialized = !1
        }, t.setRefreshEventAsInitialized = function() {
          return this._isRefreshEventInitialized = !0
        }, t
      }(), modula["export"]("vtree/launcher", t)
    }.call(this),
    function() {
      var t;
      t = function() {
        function t() {}
        return t.html = function(t, e) {
          return t.html(e), t.trigger("refresh")
        }, t.append = function(t, e) {
          return t.append(e), t.trigger("refresh")
        }, t.prepend = function(t, e) {
          return t.prepend(e), t.trigger("refresh")
        }, t.before = function(t, e) {
          return t.before(e), t.parent().trigger("refresh")
        }, t.after = function(t, e) {
          return t.after(e), t.parent().trigger("refresh")
        }, t.remove = function(t) {
          return t.remove()
        }, t.htmlAsync = function(t, e) {
          return AsyncFn.addToCallQueue(function() {
            var n;
            return n = new $.Deferred, AsyncFn.setImmediate(function() {
              return t.html(e), t.trigger("refresh"), n.resolve()
            }), n.promise()
          })
        }, t.appendAsync = function(t, e) {
          return AsyncFn.addToCallQueue(function() {
            var n;
            return n = new $.Deferred, AsyncFn.setImmediate(function() {
              return t.append(e), t.trigger("refresh"), n.resolve()
            }), n.promise()
          })
        }, t.prependAsync = function(t, e) {
          return AsyncFn.addToCallQueue(function() {
            var n;
            return n = new $.Deferred, AsyncFn.setImmediate(function() {
              return t.prepend(e), t.trigger("refresh"), n.resolve()
            }), n.promise()
          })
        }, t.beforeAsync = function(t, e) {
          return AsyncFn.addToCallQueue(function() {
            var n;
            return n = new $.Deferred, AsyncFn.setImmediate(function() {
              return t.before(e), t.parent().trigger("refresh"), n.resolve()
            }), n.promise()
          })
        }, t.afterAsync = function(t, e) {
          return AsyncFn.addToCallQueue(function() {
            var n;
            return n = new $.Deferred, AsyncFn.setImmediate(function() {
              return t.after(e), t.parent().trigger("refresh"), n.resolve()
            }), n.promise()
          })
        }, t
      }(), modula["export"]("vtree/dom", t), window.Vtree.DOM = t
    }.call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e, n, r = [].slice;
    n = this._ || require("underscore"), t = function(t) {
      var e, o, i, a, s, u, c, l, h, d, p, f, m, y, v, g, w, _, b;
      return p = [], b = {}, y = [], d = function(t) {
        return n(t).isObject() && 0 === n(t).chain().keys().difference(n(c.defaultOptions).keys()).value().length
      }, a = function(t) {
        return n(t).isObject() || n(t).isArray() ? n(t).clone() : t
      }, v = function(t, e) {
        var r;
        return r = [], null != e && e.clone && r.push(a), n(t).map(function(t) {
          return n(r).reduce(function(t, n) {
            return n(t, e)
          }, t)
        })
      }, l = function(t) {
        var e;
        return d(e = n(t).last()) ? [n(t).initial(), e] : [t, {}]
      }, f = function(t) {
        return n({}).extend(c.defaultOptions, t)
      }, o = "namespacePrefix namespace id".split(" "), _ = function(t) {
        return n(t).isString() ? /^\d+$/.test(t) ? parseInt(t) : b[t] || 0 : t
      }, g = function(t) {
        var e, r, i, a, s;
        for (e = [], "" !== t.namespacePrefix && e.push(t.namespacePrefix), "" !== t.namespace && e.push(t.namespace), "" !== t.id && e.push(t.id), i = n(t).clone(), i.level = _(i.level), a = 0, s = o.length; s > a; a++) r = o[a], delete i[r];
        return n({}).extend(i, {
          cid: e.join(".")
        })
      }, i = function(t) {
        return g(f(t))
      }, h = function(t) {
        var e;
        return t.print ? !0 : (e = !1, n(y).each(function(n) {
          return _(n.key) === t.level && n.value ? e = !0 : void 0
        }), e)
      }, m = function(t, e) {
        var r;
        return h(e) && (r = !1, n("info warn error".split(" ")).each(function(n) {
          b[n] === e.level && window.console && "function" == typeof console[n] && (console[n].apply(console, t), r = !0)
        }), window.console && "function" == typeof console.log && !r) ? console.log.apply(console, t) : void 0
      }, c = function() {
        var t, e, o, a, s, u;
        return s = 1 <= arguments.length ? r.call(arguments, 0) : [], u = l(s), t = u[0], a = u[1], o = i(a), e = v(t, o), m(e, o), p.push(n({}).extend(n.pick(o, "cid", "level"), {
          body: e,
          timestamp: (new Date).getTime()
        }))
      }, c.logs = {
        first: function() {
          return p[0]
        },
        all: function() {
          return p
        }
      }, c.defaultOptions = {
        print: !1,
        clone: !0,
        level: 0,
        namespacePrefix: "",
        namespace: "",
        id: ""
      }, w = function(t, e) {
        return y.push({
          key: t.toString(),
          value: e
        })
      }, c.definePrint = function(t, e) {
        var r, o, i;
        if (n(t).isObject()) {
          i = [];
          for (r in t) o = t[r], i.push(w(r, o));
          return i
        }
        return w(t, e)
      }, s = function(t, e, r) {
        var o;
        return null == r && (r = 0), o = n(t).isArray() ? [] : {}, n(t).each(function(t, i) {
          return o[i] = n(t).isObject() || n(t).isArray() ? e > r ? s(t, e, r + 1) : n(t).isArray() ? "[array]" : "[object]" : t
        }), o
      }, e = 2, c.dump = function(t) {
        return null == t && (t = 1), JSON.stringify(s(p, t + e))
      }, c.restore = function(t) {
        return p = n.union(p, n(t).isString() ? JSON.parse(t) : t)
      }, null != t && c.restore(t), c.curry = function() {
        var t, e, o, i;
        return o = 1 <= arguments.length ? r.call(arguments, 0) : [], i = l(o), t = i[0], e = i[1],
          function() {
            var o, i, a, s;
            return a = 1 <= arguments.length ? r.call(arguments, 0) : [], s = l(a), o = s[0], i = s[1], c.apply(c, n(t).union(o, [n({}).extend(e, i)]))
          }
      }, u = function(t, e) {
        return b[t] = e, c[t] = c.curry({
          level: e
        })
      }, c.define = function(t, e) {
        return n(t).isString() ? u(t, e) : n(t).each(function(t, e) {
          return u(e, t)
        })
      }, c.defineDefaults = function() {
        return c.define({
          debug: 0,
          info: 1,
          warn: 2,
          error: 3
        })
      }, c
    }, e = t(), e.defineDefaults(), "undefined" != typeof window && null !== window ? (window.Echo = t, window.echo = e) : module.exports = {
      Echo: t,
      echo: e
    }
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t;
    t = {}, null == window.modula && (window.modula = {
      "export": function(e, n) {
        return t[e] = n
      },
      require: function(e) {
        var n;
        if (n = t[e]) return n;
        throw "Module '" + e + "' not found."
      }
    })
  }).call(this),
    function() {
      var t = {}.hasOwnProperty,
        e = [].slice;
      this.Frames = function() {
        function n() {}
        return n.Extendables = {}, n.createExtendables = function() {
          var e, n, r, o;
          null == this.extendables && (this.extendables = {}), r = this.Extendables, o = [];
          for (n in r)
            if (t.call(r, n)) {
              if (e = r[n], !Object.isFunction(e.prototype.extended)) throw "Trying to initialize extendable module, but #extended method is not specified for it.";
              o.push(this.extendables[n.underscore()] = new e)
            }
          return o
        }, n.extend = function() {
          var t, n, r;
          if (n = arguments[0], t = 2 <= arguments.length ? e.call(arguments, 1) : [], null == this.extendables[n]) throw "Trying to extend module " + n.camelize() + ", but it is not registered.";
          return (r = this.extendables[n]).extended.apply(r, t)
        }, n.registerLauncher = function(t) {
          return this.__launcher = new t
        }, n.hook = function(t, e) {
          if (!this.__launcher) throw "Launcher is not registered";
          return this.__launcher.hook(t, e)
        }, n.start = function() {
          var e, n, r, o;
          r = this.extendables, o = [];
          for (n in r) t.call(r, n) && (e = r[n], o.push("function" == typeof e.ready ? e.ready() : void 0));
          return o
        }, n.stop = function() {}, n
      }(), modula["export"]("frames", Frames)
    }.call(this),
    function() {
      var t, e, n, r, o, i, a, s = [].slice;
      for (e = modula.require("frames"), t = window.Echo, n = "debug info warn error".split(" "), r = {
          included: function(e) {
            return null == this.echo && (this.echo = t()), e.extend(this)
          },
          log: function(t, e) {
            return null == e && (e = {}), this.logger(t, e)
          },
          logger: function() {
            var t;
            return t = 1 <= arguments.length ? s.call(arguments, 0) : [], r.echo.apply(r, t)
          }
        }, i = 0, a = n.length; a > i; i++) o = n[i], r[o] = function(t, e) {
        return this.log(t, Object.extended(e).clone().merge({
          level: o
        }))
      };
      modula["export"]("frames/logger_module", r)
    }.call(this),
    function() {
      var t, e, n, r, o, i, a;
      for (e = modula.require("frames"), n = modula.require("frames/logger_module"), t = window.Backbone, this.Class = function() {
          function t() {}
          return t.include = function(t) {
            return Object.merge(this.prototype, Object.reject(t, "included", "extended")), t.included ? t.included(this) : void 0
          }, t.extend = function(t) {
            return Object.merge(this, Object.reject(t, "included", "extended")), t.extended ? t.extended(this) : void 0
          }, t.attr = function(t, e) {
            return null == e && (e = {}), this.attrReader(t, e), this.attrWriter(t, e)
          }, t.attrReader = function(t, e) {
            var n;
            return null == e && (e = {}), n = this.__privateNameFor(t), this.prototype[this.__getterNameFor(t, e)] = function() {
              return this[n]
            }
          }, t.attrWriter = function(t, e) {
            var n;
            return null == e && (e = {}), n = this.__privateNameFor(t), this.prototype[this.__setterNameFor(t, e)] = function(t) {
              return this[n] = t
            }, e["boolean"] && (e["true"] && (this.prototype[e["true"]] = function() {
              return this[n] = !0
            }), e["false"]) ? this.prototype[e["false"]] = function() {
              return this[n] = !1
            } : void 0
          }, t.patch = function(t) {
            return Object.merge(t, this), Object.merge(t.prototype, this.prototype)
          }, t.__getterNameFor = function(t, e) {
            return null == e && (e = {}), e.getter || this.__fnName(t, {
              prefix: e["boolean"] ? "is" : "get"
            })
          }, t.__setterNameFor = function(t, e) {
            return null == e && (e = {}), e.setter || this.__fnName(t, {
              prefix: "set"
            })
          }, t.__privateNameFor = function(t) {
            return "__" + t
          }, t.__fnName = function(t, e) {
            var n;
            return null == e && (e = {}), n = [], e.prefix && n.push(e.prefix), n.push(t), n.join("_").camelize(!1)
          }, t.include(n), t
        }(), a = "View Model Collection Router".split(" "), o = 0, i = a.length; i > o; o++) r = a[o], Class.patch(t[r]);
      modula["export"]("frames/class", Class)
    }.call(this),
    function() {
      var t, e;
      t = modula.require("frames"), e = function() {
        function t(t, e) {
          var n, r, o, i;
          if (null == t && (t = null), null == e && (e = {}), null == this.states && (this.states = []), null != e.states)
            for (i = e.states, r = 0, o = i.length; o > r; r++) n = i[r], this.states.push(n);
          null != e.events && (this.events = e.events), null != t && (this.states.push(t), this["default"] = t), this.__rules = {}, this.__defineEvents(), this.__forceSet(this.__default())
        }
        return t.prototype.get = function() {
          return this.__state
        }, t.prototype.set = function(t) {
          var e;
          if (!this.__isStateDefined(t)) throw "No such state '" + t + "'";
          if (!this.__isTransitionAllowed(t)) throw "Transition from '" + this.get() + "' to '" + t + "' is not allowed";
          return e = this.__callbackFor(t), "function" == typeof e && e(this.get(), t), this.__state = t
        }, t.prototype.reset = function() {
          return "function" == typeof this.onReset && this.onReset(this.get(), this.__default()), this.__forceSet(this.__default())
        }, t.prototype.availableStates = function() {
          return this.states
        }, t.prototype.__forceSet = function(t) {
          this.__state = t
        }, t.prototype.__default = function() {
          return this["default"] || this.states[0]
        }, t.prototype.__defineEvents = function() {
          var t, e, n, r;
          n = this.events, r = [];
          for (t in n) e = n[t], r.push(this.__defineEvent(t, e));
          return r
        }, t.prototype.__defineEvent = function(t, e) {
          return this.__applyRules(t, e), this[t] = function() {
            return this.set(e.to)
          }
        }, t.prototype.__applyRules = function(t, e) {
          var n, r, o, i, a, s;
          for (n = "object" == typeof e.from ? e.from : [e.from], s = [], i = 0, a = n.length; a > i; i++) r = n[i], null == (o = this.__rules)[r] && (o[r] = []), s.push(this.__rules[r].push(e.to));
          return s
        }, t.prototype.__isStateDefined = function(t) {
          return -1 !== this.states.indexOf(t)
        }, t.prototype.__isTransitionAllowed = function(t) {
          var e;
          return e = this.__rules[this.get()], e && -1 !== e.indexOf(t)
        }, t.prototype.__callbackFor = function(t) {
          var e;
          return e = ("on_" + t).camelize(!1), this[e]
        }, t
      }(), modula["export"]("frames/state", e)
    }.call(this),
    function() {
      var t, e = [].slice;
      t = modula.require("frames"), t.Extendables.RoutersFactory = function() {
        function t() {
          this.routersFactory = modula.require("frames/routers_factory")
        }
        return t.prototype.extended = function() {
          var t, n;
          return t = 1 <= arguments.length ? e.call(arguments, 0) : [], n = t[0], this.routersFactory = n
        }, t.prototype.ready = function() {
          return this.routersFactory.create()
        }, t
      }(), modula["export"]("frames/extendables/routersFactory", t.Extendables.RoutersFactory)
    }.call(this),
    function() {
      var t, e = [].slice;
      t = modula.require("frames"), t.Extendables.ViewsFactory = function() {
        function t() {
          this.viewsFactory = {
            create: function() {
              return Vtree.initNodes()
            }
          }
        }
        return t.prototype.extended = function() {
          var t, n;
          return t = 1 <= arguments.length ? e.call(arguments, 0) : [], n = t[0], this.viewsFactory = n
        }, t.prototype.ready = function() {
          return this.viewsFactory.create()
        }, t
      }(), modula["export"]("frames/extendables/views_factory", t.Extendables.ViewsFactory)
    }.call(this),
    function() {
      var t, e, n, r, o = {}.hasOwnProperty,
        i = function(t, e) {
          function n() {
            this.constructor = t
          }
          for (var r in e) o.call(e, r) && (t[r] = e[r]);
          return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
        };
      n = modula.require("frames"), e = modula.require("frames/class"), t = window.Backbone, r = function(e) {
        function n() {
          return n.__super__.constructor.apply(this, arguments)
        }
        var r;
        return i(n, e), r = "[data-router]", n.create = function() {
          var e, n, r, o;
          return o = this.detectRouter(), o && (r = o.camelize() + "Router", e = window[r]) ? (n = new e, $("body").data({
            router: n
          }), t.history.start(), this.router = n) : void 0
        }, n.destroy = function() {
          return $("body").removeData("router"), t.history.stop()
        }, n.detectRouter = function() {
          var t;
          return t = this.routers(), t.length > 1 && this.warn("There are more than one router, all except first will be ignored."), t[0]
        }, n.routers = function() {
          var t, e;
          return e = $("body"), t = e.find(r).add(e.filter(r)), t.map(function() {
            return $(this).data("router")
          }).toArray()
        }, n
      }(e), modula["export"]("frames/routers_factory", r)
    }.call(this),
    function() {
      var t, e;
      t = modula.require("frames"), e = {
        included: function(t) {
          return t.addToConfigureChain("buildQueryFunctions")
        },
        buildQueryFunctions: function() {
          var t, e, n, r;
          if (this.els) {
            n = this.els, r = [];
            for (e in n) t = n[e], r.push(function(t) {
              return function(e, n) {
                var r, o, i, a, s, u;
                return u = n.match(/^(cached)?\s?(.+)/), s = u[0], o = u[1], a = u[2], o ? (i = "__" + e, r = ("" + e + "_drop").camelize(), t[e] = function() {
                  return this[i] || (this[i] = this.$(a))
                }, t[r] = function() {
                  return this[i] = void 0
                }) : t[e] = function() {
                  return this.$(a)
                }
              }
            }(this)(e, t));
            return r
          }
        }
      }, modula["export"]("frames/jquery_query_module", e)
    }.call(this),
    function() {
      var t, e;
      t = modula.require("frames"), e = {
        included: function(t) {
          return this.broker = new Noted.Broker, t.addToConfigureChain("createEmitterAndReceiver")
        },
        createEmitterAndReceiver: function() {
          return this.broker = e.broker, this.emitter = new Noted.Emitter(this.broker, this), this.receiver = new Noted.Receiver(this.broker, this)
        },
        emit: function(t, e, n) {
          return this.emitter.emit(t, e, n)
        },
        listen: function(t, e, n) {
          return this.receiver.listen(t, e, n)
        },
        unsubscribe: function(t, e) {
          return this.broker.unsubscribe(t, e, this)
        }
      }, modula["export"]("frames/pub_sub_module", e)
    }.call(this),
    function() {
      var t, e = {}.hasOwnProperty,
        n = function(t, n) {
          function r() {
            this.constructor = t
          }
          for (var o in n) e.call(n, o) && (t[o] = n[o]);
          return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
        };
      modula.require("frames"), t = window.Backbone, Frames.Model = function(t) {
        function e() {
          return e.__super__.constructor.apply(this, arguments)
        }
        return n(e, t), e
      }(t.Model), modula["export"]("frames/model", Frames.Model)
    }.call(this),
    function() {
      var t, e, n, r = {}.hasOwnProperty,
        o = function(t, e) {
          function n() {
            this.constructor = t
          }
          for (var o in e) r.call(e, o) && (t[o] = e[o]);
          return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
        };
      e = modula.require("frames"), t = window.Backbone, n = modula.require("frames/pub_sub_module"), e.Router = function(e) {
        function r() {
          return r.__super__.constructor.apply(this, arguments)
        }
        return o(r, e), r.prototype._bindRoutes = function() {
          return this.createEmitterAndReceiver(), t.Router.prototype._bindRoutes.call(this)
        }, r.prototype.createEmitterAndReceiver = function() {
          return this.broker = n.broker, this.emitter = new Noted.Emitter(this.broker, this), this.receiver = new Noted.Receiver(this.broker, this)
        }, r.prototype.emit = function(t, e, n) {
          return this.emitter.emit(t, e, n)
        }, r.prototype.listen = function(t, e, n) {
          return this.receiver.listen(t, e, n)
        }, r.prototype.unsubscribe = function(t, e) {
          return this.broker.unsubscribe(t, e, this)
        }, r
      }(t.Router), modula["export"]("frames/router", e.Router)
    }.call(this),
    function() {
      var t, e, n, r = {}.hasOwnProperty,
        o = function(t, e) {
          function n() {
            this.constructor = t
          }
          for (var o in e) r.call(e, o) && (t[o] = e[o]);
          return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
        };
      e = modula.require("frames"), t = window.Backbone, n = t.View.prototype.remove, e.View = function(t) {
        function e(t) {
          var n, r, o, i;
          if (n = this.constructor.configureChain)
            for (o = 0, i = n.length; i > o; o++) r = n[o], this[r].call(this, t);
          e.__super__.constructor.apply(this, arguments)
        }
        return o(e, t), e.addToConfigureChain = function(t) {
          return null == this.configureChain && (this.configureChain = []), this.configureChain.push(t)
        }, e.addToRemoveChain = function(t) {
          return null == this.removeChain && (this.removeChain = []), this.removeChain.push(t)
        }, e.prototype.remove = function() {
          var t, e, r, o;
          if (e = this.constructor.removeChain)
            for (r = 0, o = e.length; o > r; r++) t = e[r], this[t].call(this);
          return n.call(this)
        }, e
      }(t.View), modula["export"]("frames/view", e.View)
    }.call(this),
    function() {
      var t, e, n = {}.hasOwnProperty,
        r = function(t, e) {
          function r() {
            this.constructor = t
          }
          for (var o in e) n.call(e, o) && (t[o] = e[o]);
          return r.prototype = e.prototype, t.prototype = new r, t.__super__ = e.prototype, t
        };
      t = modula.require("frames"), e = modula.require("frames/model"), t.ViewModel = function(t) {
        function e() {
          return e.__super__.constructor.apply(this, arguments)
        }
        return r(e, t), e
      }(e), modula["export"]("frames/view_model", t.ViewModel)
    }.call(this),
    function() {
      var t, e, n, r, o = {}.hasOwnProperty,
        i = function(t, e) {
          function n() {
            this.constructor = t
          }
          for (var r in e) o.call(e, r) && (t[r] = e[r]);
          return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
        };
      e = modula.require("frames"), t = modula.require("frames/class"), r = modula.require("frames/state"), n = function(t) {
        function n() {
          var t, n;
          this.__hooks = {}, this.__passedStages = ["loaded"], e.createExtendables(), t = {
            setReady: {
              from: "loaded",
              to: "ready"
            },
            setCreated: {
              from: "ready",
              to: "created"
            }
          }, n = ["loaded", "ready", "created"], this.stage = new r("loaded", {
            states: n,
            events: t
          }), this.stage.onReady = this.__stageTransition("ready", function(t) {
            return function() {
              return e.start(), setTimeout(function() {
                return t.stage.setCreated()
              }, 0)
            }
          }(this)), this.stage.onCreated = this.__stageTransition("created"), this.__bindReady(this.setReady.bind(this))
        }
        return i(n, t), n.prototype.reset = function() {
          return this.__passedStages = ["loaded"], this.stage.reset()
        }, n.prototype.setReady = function() {
          return this.stage.setReady()
        }, n.prototype.getStage = function() {
          return this.stage.get()
        }, n.prototype.hook = function(t, e) {
          var n;
          return null == (n = this.__hooks)[t] && (n[t] = []), this.__hooks[t].push(e), -1 !== this.__passedStages.indexOf(t) ? e() : void 0
        }, n.prototype.__bindReady = function(t) {
          return $(t)
        }, n.prototype.__stageTransition = function(t, e) {
          return function(n) {
            return function() {
              return n.__passedStages.push(t), n.__callStage(t), "function" == typeof e ? e() : void 0
            }
          }(this)
        }, n.prototype.__callStage = function(t) {
          var e, n, r, o, i;
          if (this.__hooks[t]) {
            for (o = this.__hooks[t], i = [], n = 0, r = o.length; r > n; n++) e = o[n], i.push(e());
            return i
          }
        }, n
      }(t), e.registerLauncher(n), modula["export"]("frames/launcher", n)
    }.call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t;
    t = {}, null == window.modula && (window.modula = {
      "export": function(e, n) {
        return t[e] = n
      },
      require: function(e) {
        var n;
        if (n = t[e]) return n;
        throw "Module '" + e + "' not found."
      }
    })
  }).call(this),
    function() {
      var __slice = [].slice;
      window.JsErrorLogger = function() {
        function _Class(t) {
          t.errorProcessFn && _.isFunction(t.errorProcessFn) && (this.errorProcessFn = t.errorProcessFn), t.store && (this.store = t.store), window.onerror = _.bind(this.onError, this)
        }
        var LOG_LEVELS, LOG_LEVEL_ALIASES, VISITED_PAGES_LENGTH;
        return LOG_LEVELS = "info warn error".split(" "), LOG_LEVEL_ALIASES = {
          log: "info"
        }, VISITED_PAGES_LENGTH = 5, _Class.prototype.addLogger = function(t) {
          var e, n, r, o;
          for (r = 0, o = LOG_LEVELS.length; o > r; r++) n = LOG_LEVELS[r], t[n] = function(t) {
            return function(e) {
              return echo[t](e)
            }
          }(n);
          for (e in LOG_LEVEL_ALIASES) n = LOG_LEVEL_ALIASES[e], t[e] = t[n];
          return t
        }, _Class.prototype.onError = function(t, e, n, r, o) {
          var i, a, s;
          return this.rethrow ? this.rethrow = !1 : (s = 0 === n, a = _.isObject(t), i = null != o, s || this._catch(i ? o : a ? {
            message: "Unknown error",
            data: t
          } : {
            message: "Global error: " + t + " @ " + e + ":" + n + ":" + r
          })), !1
        }, _Class.prototype.processError = function(t) {
          return "function" == typeof this.errorProcessFn ? this.errorProcessFn(t, this._errorData(t)) : void 0
        }, _Class.prototype.catchWrap = function(t, e) {
          var n, r, o, i;
          return e ? (r = t, o = r[e], r[e] = this.catchWrap(o)) : (n = t, i = this, function() {
            var t, e;
            t = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
            try {
              return n.apply(this, t)
            } catch (r) {
              throw e = r
            }
          })
        }, _Class.prototype.catchWrapTimer = function(obj, fnName) {
          var originFn, that;
          return originFn = obj[fnName], that = this, obj[fnName] = function() {
            var args, fn, wrappedFn;
            return fn = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [], wrappedFn = function() {
              var e;
              try {
                return "string" == typeof fn ? eval(fn) : fn.apply(this, arguments)
              } catch (_error) {
                throw e = _error
              }
            }, originFn.call.apply(originFn, [window, wrappedFn].concat(__slice.call(args)))
          }
        }, _Class.prototype.logPageVisit = function() {
          var t, e;
          return this._checkStorage(this.store) ? (t = this.store ? this.store : this._getDefaultStore(), e = t.get("visited_pages") || [], e.length > 0 && this._logRecentlyVisitedPages(e), e.push({
            location: window.location.href,
            time: new Date
          }), e.length > VISITED_PAGES_LENGTH && (e = e.slice(e.length - VISITED_PAGES_LENGTH)), t.set("visited_pages", e)) : !1
        }, _Class.prototype._logsDump = function() {
          return echo.dump()
        }, _Class.prototype._stacktrace = function(t) {
          return printStackTrace({
            e: t
          })
        }, _Class.prototype._stacktraceDump = function(t) {
          return JSON.stringify(this._stacktrace(t))
        }, _Class.prototype._userAgent = function() {
          return navigator.userAgent
        }, _Class.prototype._errorData = function(t) {
          return {
            name: t.name,
            level: "error",
            msg: t.message,
            data: t.data,
            stacktrace: this._stacktraceDump(t),
            logs: this._logsDump()
          }
        }, _Class.prototype._catch = function(t) {
          return this.processError(t)
        }, _Class.prototype._logRecentlyVisitedPages = function(t) {
          var e, n, r, o;
          for (echo.info("Recently visited pages:"), o = [], n = 0, r = t.length; r > n; n++) e = t[n], o.push(echo.info("" + e.time + ": " + e.location));
          return o
        }, _Class.prototype._checkStorage = function(t) {
          var e;
          if (t && t.enabled) return !0;
          try {
            return localStorage.setItem("test", "test"), localStorage.removeItem("test"), !0
          } catch (n) {
            return e = n, !1
          }
        }, _Class.prototype._getDefaultStore = function() {
          return {
            get: function(t) {
              var e, n;
              n = window.localStorage.getItem(t);
              try {
                return JSON.parse(n)
              } catch (r) {
                return e = r, n || void 0
              }
            },
            set: function(t, e) {
              return null != e && window.localStorage.setItem(t, JSON.stringify(e)), e
            }
          }
        }, _Class
      }(), modula["export"]("js_error_logger", JsErrorLogger)
    }.call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing, {
    def: "easeOutQuad",
    swing: function(t, e, n, r, o) {
      return jQuery.easing[jQuery.easing.def](t, e, n, r, o)
    },
    easeInQuad: function(t, e, n, r, o) {
      return r * (e /= o) * e + n
    },
    easeOutQuad: function(t, e, n, r, o) {
      return -r * (e /= o) * (e - 2) + n
    },
    easeInOutQuad: function(t, e, n, r, o) {
      return (e /= o / 2) < 1 ? r / 2 * e * e + n : -r / 2 * (--e * (e - 2) - 1) + n
    },
    easeInCubic: function(t, e, n, r, o) {
      return r * (e /= o) * e * e + n
    },
    easeOutCubic: function(t, e, n, r, o) {
      return r * ((e = e / o - 1) * e * e + 1) + n
    },
    easeInOutCubic: function(t, e, n, r, o) {
      return (e /= o / 2) < 1 ? r / 2 * e * e * e + n : r / 2 * ((e -= 2) * e * e + 2) + n
    },
    easeInQuart: function(t, e, n, r, o) {
      return r * (e /= o) * e * e * e + n
    },
    easeOutQuart: function(t, e, n, r, o) {
      return -r * ((e = e / o - 1) * e * e * e - 1) + n
    },
    easeInOutQuart: function(t, e, n, r, o) {
      return (e /= o / 2) < 1 ? r / 2 * e * e * e * e + n : -r / 2 * ((e -= 2) * e * e * e - 2) + n
    },
    easeInQuint: function(t, e, n, r, o) {
      return r * (e /= o) * e * e * e * e + n
    },
    easeOutQuint: function(t, e, n, r, o) {
      return r * ((e = e / o - 1) * e * e * e * e + 1) + n
    },
    easeInOutQuint: function(t, e, n, r, o) {
      return (e /= o / 2) < 1 ? r / 2 * e * e * e * e * e + n : r / 2 * ((e -= 2) * e * e * e * e + 2) + n
    },
    easeInSine: function(t, e, n, r, o) {
      return -r * Math.cos(e / o * (Math.PI / 2)) + r + n
    },
    easeOutSine: function(t, e, n, r, o) {
      return r * Math.sin(e / o * (Math.PI / 2)) + n
    },
    easeInOutSine: function(t, e, n, r, o) {
      return -r / 2 * (Math.cos(Math.PI * e / o) - 1) + n
    },
    easeInExpo: function(t, e, n, r, o) {
      return 0 == e ? n : r * Math.pow(2, 10 * (e / o - 1)) + n
    },
    easeOutExpo: function(t, e, n, r, o) {
      return e == o ? n + r : r * (-Math.pow(2, -10 * e / o) + 1) + n
    },
    easeInOutExpo: function(t, e, n, r, o) {
      return 0 == e ? n : e == o ? n + r : (e /= o / 2) < 1 ? r / 2 * Math.pow(2, 10 * (e - 1)) + n : r / 2 * (-Math.pow(2, -10 * --e) + 2) + n
    },
    easeInCirc: function(t, e, n, r, o) {
      return -r * (Math.sqrt(1 - (e /= o) * e) - 1) + n
    },
    easeOutCirc: function(t, e, n, r, o) {
      return r * Math.sqrt(1 - (e = e / o - 1) * e) + n
    },
    easeInOutCirc: function(t, e, n, r, o) {
      return (e /= o / 2) < 1 ? -r / 2 * (Math.sqrt(1 - e * e) - 1) + n : r / 2 * (Math.sqrt(1 - (e -= 2) * e) + 1) + n
    },
    easeInElastic: function(t, e, n, r, o) {
      var i = 1.70158,
        a = 0,
        s = r;
      if (0 == e) return n;
      if (1 == (e /= o)) return n + r;
      if (a || (a = .3 * o), s < Math.abs(r)) {
        s = r;
        var i = a / 4
      } else var i = a / (2 * Math.PI) * Math.asin(r / s);
      return -(s * Math.pow(2, 10 * (e -= 1)) * Math.sin(2 * (e * o - i) * Math.PI / a)) + n
    },
    easeOutElastic: function(t, e, n, r, o) {
      var i = 1.70158,
        a = 0,
        s = r;
      if (0 == e) return n;
      if (1 == (e /= o)) return n + r;
      if (a || (a = .3 * o), s < Math.abs(r)) {
        s = r;
        var i = a / 4
      } else var i = a / (2 * Math.PI) * Math.asin(r / s);
      return s * Math.pow(2, -10 * e) * Math.sin(2 * (e * o - i) * Math.PI / a) + r + n
    },
    easeInOutElastic: function(t, e, n, r, o) {
      var i = 1.70158,
        a = 0,
        s = r;
      if (0 == e) return n;
      if (2 == (e /= o / 2)) return n + r;
      if (a || (a = .3 * o * 1.5), s < Math.abs(r)) {
        s = r;
        var i = a / 4
      } else var i = a / (2 * Math.PI) * Math.asin(r / s);
      return 1 > e ? -.5 * s * Math.pow(2, 10 * (e -= 1)) * Math.sin(2 * (e * o - i) * Math.PI / a) + n : s * Math.pow(2, -10 * (e -= 1)) * Math.sin(2 * (e * o - i) * Math.PI / a) * .5 + r + n
    },
    easeInBack: function(t, e, n, r, o, i) {
      return void 0 == i && (i = 1.70158), r * (e /= o) * e * ((i + 1) * e - i) + n
    },
    easeOutBack: function(t, e, n, r, o, i) {
      return void 0 == i && (i = 1.70158), r * ((e = e / o - 1) * e * ((i + 1) * e + i) + 1) + n
    },
    easeInOutBack: function(t, e, n, r, o, i) {
      return void 0 == i && (i = 1.70158), (e /= o / 2) < 1 ? r / 2 * e * e * (((i *= 1.525) + 1) * e - i) + n : r / 2 * ((e -= 2) * e * (((i *= 1.525) + 1) * e + i) + 2) + n
    },
    easeInBounce: function(t, e, n, r, o) {
      return r - jQuery.easing.easeOutBounce(t, o - e, 0, r, o) + n
    },
    easeOutBounce: function(t, e, n, r, o) {
      return (e /= o) < 1 / 2.75 ? 7.5625 * r * e * e + n : 2 / 2.75 > e ? r * (7.5625 * (e -= 1.5 / 2.75) * e + .75) + n : 2.5 / 2.75 > e ? r * (7.5625 * (e -= 2.25 / 2.75) * e + .9375) + n : r * (7.5625 * (e -= 2.625 / 2.75) * e + .984375) + n
    },
    easeInOutBounce: function(t, e, n, r, o) {
      return o / 2 > e ? .5 * jQuery.easing.easeInBounce(t, 2 * e, 0, r, o) + n : .5 * jQuery.easing.easeOutBounce(t, 2 * e - o, 0, r, o) + .5 * r + n
    }
  })
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e, n, r = [].slice,
      o = {}.hasOwnProperty,
      i = function(t, e) {
        function n() {
          this.constructor = t
        }
        for (var r in e) o.call(e, r) && (t[r] = e[r]);
        return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
      };
    t = "undefined" != typeof window && null !== window ? window.Backbone.Events : require("backbone").Events, n = function(e) {
      var n, r, o;
      o = [];
      for (n in t) r = t[n], o.push(e[n] = r);
      return o
    }, e = {}, e.Message = function() {
      function t(t, e, n) {
        null == t && (t = ""), null == e && (e = void 0), this.options = null != n ? n : {}, this._hidden = this._isHidden(e), this.setBody(t), this.setId(e), this.listenTo(this, "hide", this._hide)
      }
      return t.prototype.getBody = function() {
        return this.body
      }, t.prototype.setBody = function(t) {
        this.body = t
      }, t.prototype.delivered = !1, t.prototype.isDelivered = function() {
        return this.delivered
      }, t.prototype.setDelivered = function(t) {
        this.delivered = null != t ? t : !0
      }, t.prototype.getId = function() {
        return this._id
      }, t.prototype.setId = function(t) {
        this._id = t
      }, t.prototype.isHidden = function() {
        return this._hidden
      }, t.prototype.hide = function(t) {
        return this.trigger("hide", t)
      }, t.prototype._hide = function(t, e) {
        return null == e && (e = !1), this._hidden = !0, e ? void 0 : "cookie" === this.options.store && "undefined" != typeof cookie && null !== cookie ? cookie.set("noted_" + this.getId() + "_hidden", !0) : "store" === this.options.store && ("undefined" != typeof store && null !== store ? store.enabled : void 0) ? store.set("noted_" + this.getId() + "_hidden", !0) : void 0
      }, t.prototype._isHidden = function(t) {
        var e, n;
        return t && (n = this._storage()) ? (e = "noted_" + t + "_hidden", n.get(e) || !1) : !1
      }, t.prototype._storage = function() {
        return "cookie" === this.options.store && "undefined" != typeof cookie && null !== cookie ? cookie : "store" === this.options.store && ("undefined" != typeof store && null !== store ? store.enabled : void 0) ? store : null
      }, t
    }(), n(e.Message.prototype), e.Message.prototype.trigger = function() {
      var e, n, o;
      return n = arguments[0], e = 2 <= arguments.length ? r.call(arguments, 1) : [], (o = t.trigger).call.apply(o, [this, n, this].concat(r.call(e)))
    }, e.Event = function() {
      function t(t, e) {
        this.group = t, this.name = e, this._messages = []
      }
      return t.prototype.getName = function() {
        return this.name
      }, t.prototype.getMessages = function() {
        return this._messages
      }, t.prototype.add = function(t) {
        return this._messages.push(t)
      }, t.prototype.getGroup = function() {
        return this.group
      }, t.prototype.setGroup = function(t) {
        this.group = t
      }, t
    }(), n(e.Event.prototype), e.EventGroup = function() {
      function t(t) {
        this.name = t, this._eventObjs = {}
      }
      return t.prototype.getName = function() {
        return this.name
      }, t.prototype.add = function(t) {
        return t instanceof e.Event ? (this._eventObjs[t.getName()] = t, t.setGroup(this), t) : this._eventObjs[t] = new e.Event(this, t)
      }, t.prototype.all = function() {
        var t, e, n, r;
        n = this._eventObjs, r = [];
        for (e in n) t = n[e], r.push(t);
        return r
      }, t.prototype.get = function(t) {
        return this._eventObjs[t]
      }, t.prototype.remove = function(t) {
        var n;
        return n = t instanceof e.Event ? t.name : t, delete this._eventObjs[n]
      }, t
    }(), n(e.EventGroup.prototype), e.Broker = function() {
      function t() {
        this._eventGroups = {}
      }
      var n;
      return n = /(?:(.+):|)([^#]*)(?:#(.+)|)/, t.prototype.subscribe = function(t, e, n, i) {
        var a, s, u, c, l, h, d, p, f, m, y, v, g, w;
        if (null == i && (i = {}), a = this.get(t), l = function() {
            var n;
            return n = 1 <= arguments.length ? r.call(arguments, 0) : [], t = "string" == typeof n[0] ? n[1] : n[0], t.setDelivered(), e.apply(this, n)
          }, l._callback = e, i.delayed)
          if ("all" === a.getName()) {
            s = [a.getGroup()] || this._eventGroups;
            for (c in s)
              if (o.call(s, c))
                for (u = s[c], v = u.all(), h = 0, f = v.length; f > h; h++)
                  for (a = v[h], g = a.getMessages(), d = 0, m = g.length; m > d; d++) t = g[d], i.undelivered && t.isDelivered() || t.isHidden() || l.call(n, a.getName(), t)
          } else
            for (w = a.getMessages(), p = 0, y = w.length; y > p; p++) t = w[p], i.undelivered && t.isDelivered() || t.isHidden() || l.call(n, t);
        return a.getGroup().on(a.getName(), l, n)
      }, t.prototype.publish = function(t, n, r) {
        var o, i, a;
        return null == r && (r = {}), a = this.parse(t)[2], o = this.get(t), t = new e.Message(n, a, r), o.add(t), t.isHidden() || o.getGroup().trigger(o.getName(), t), r.hideAfter && (i = function() {
          return t.hide(r.storeHide ? !r.storeHide : void 0)
        }, setTimeout(i, r.hideAfter)), t
      }, t.prototype.unsubscribe = function(t, e, n) {
        var r, o, i, a, s;
        if (t) return r = this.get(t), r.getGroup().off(r.getName(), e, n);
        a = this._eventGroups, s = [];
        for (i in a) o = a[i], s.push(o.off(null, e, n));
        return s
      }, t.prototype.get = function(t) {
        var n, r, o, i, a, s;
        return s = this.parse(t), o = s[0], n = s[1], i = s[2], r = (a = this._eventGroups)[o] || (a[o] = new e.EventGroup(o)), r.get(n) || r.add(n)
      }, t.prototype.parse = function(t) {
        var e, r, o, i;
        return i = t.match(n).slice(1), r = i[0], e = i[1], o = i[2], [r, e || "all", o]
      }, t
    }(), e.MessagesList = function() {
      function t(t, e) {
        this._messages = [], this._events = {}, n(this._events), this.setBroker(t), this.setContext(e)
      }
      return t.prototype.getBroker = function() {
        return this.broker
      }, t.prototype.setBroker = function(t) {
        this.broker = t
      }, t.prototype.getContext = function() {
        return this.context
      }, t.prototype.setContext = function(t) {
        this.context = t
      }, t.prototype.getMessages = function() {
        return this._messages
      }, t.prototype.store = function(t) {
        var e;
        return this._messages.push(t), e = function() {
          var t, e, n;
          return e = arguments[0], t = 2 <= arguments.length ? r.call(arguments, 1) : [], (n = this._events).trigger.apply(n, [e].concat(r.call(t)))
        }, t.on("all", e, this), t
      }, t.prototype.trigger = function() {
        var t, e, n, o, i, a, s, u, c, l, h, d;
        for (i = arguments[0], o = arguments[1], n = 3 <= arguments.length ? r.call(arguments, 2) : [], "string" == typeof i ? (u = {}, e = i, t = [o].concat(n)) : (u = i, e = o, t = n), s = function() {
            var t, e, n;
            if (u.hidden) return this._messages;
            for (c = [], n = this._messages, t = 0, e = n.length; e > t; t++) a = n[t], a.isHidden() || c.push(a);
            return c
          }.call(this), d = [], l = 0, h = s.length; h > l; l++) a = s[l], d.push(a.trigger.apply(a, [e].concat(r.call(t))));
        return d
      }, t.prototype.on = function(t, e) {
        return this._events.on(t, e, this.context)
      }, t.prototype.off = function(t, e) {
        return this._events.off(t, e)
      }, t
    }(), e.Emitter = function(t) {
      function e() {
        return e.__super__.constructor.apply(this, arguments)
      }
      return i(e, t), e.prototype.emit = function(t, e, n) {
        return t = this.broker.publish(t, e, n), this._messages.push(t), t
      }, e
    }(e.MessagesList), e.Receiver = function(t) {
      function e() {
        e.__super__.constructor.apply(this, arguments)
      }
      return i(e, t), e.prototype.listen = function(t, e, n) {
        var o, i;
        return null == n && (n = {}), o = this, i = function() {
          var t, n;
          return n = arguments[0], t = 2 <= arguments.length ? r.call(arguments, 1) : [], o._messages.push(n), e.apply(this, arguments)
        }, e._callback = i, this.broker.subscribe(t, i, this.context, n)
      }, e.prototype.stop = function(t, e) {
        return this.broker.unsubscribe(t, (null != e ? e._callback : void 0) || e, this.context)
      }, e
    }(e.MessagesList), "undefined" != typeof window && null !== window ? window.Noted = e : module.exports = e
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function(t) {
    "use strict";
    t.Transitions = {
      _names: {
        transition: "transitionend",
        OTransition: "oTransitionEnd",
        WebkitTransition: "webkitTransitionEnd",
        MozTransition: "transitionend"
      },
      _parseTimes: function(t) {
        for (var e, n = t.split(/,\s*/), r = 0; r < n.length; r++) e = n[r], n[r] = parseFloat(e), e.match(/\ds/) && (n[r] = 1e3 * n[r]);
        return n
      },
      getEvent: function() {
        var t = !1;
        for (var e in this._names)
          if ("undefined" != typeof document.body.style[e]) {
            t = this._names[e];
            break
          }
        return this.getEvent = function() {
          return t
        }, t
      },
      animFrame: function(t) {
        var e = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;
        return this.animFrame = e ? function(t) {
          return e.call(window, t)
        } : function(t) {
          return setTimeout(t, 10)
        }, this.animFrame(t)
      },
      isSupported: function() {
        return this.getEvent() !== !1
      }
    }, t.extend(t.fn, {
      afterTransition: function(e, n) {
        if ("undefined" == typeof n && (n = e, e = 1), !t.Transitions.isSupported()) {
          for (var r = 0; r < this.length; r++) n.call(this[r], {
            type: "aftertransition",
            elapsedTime: 0,
            propertyName: "",
            currentTarget: this[r]
          });
          return this
        }
        for (var r = 0; r < this.length; r++) {
          var o = t(this[r]),
            i = o.css("transition-property").split(/,\s*/),
            a = o.css("transition-duration"),
            s = o.css("transition-delay");
          a = t.Transitions._parseTimes(a), s = t.Transitions._parseTimes(s);
          for (var u, c, l, h, d, p = 0; p < i.length; p++) u = i[p], c = a[1 == a.length ? 0 : p], l = s[1 == s.length ? 0 : p], h = l + c * e, d = c * e / 1e3,
            function(e, r, o, i) {
              setTimeout(function() {
                t.Transitions.animFrame(function() {
                  n.call(e[0], {
                    type: "aftertransition",
                    elapsedTime: i,
                    propertyName: r,
                    currentTarget: e[0]
                  })
                })
              }, o)
            }(o, u, h, d)
        }
        return this
      },
      transitionEnd: function(e) {
        for (var n = 0; n < this.length; n++) this[n].addEventListener(t.Transitions.getEvent(), function(t) {
          e.call(this, t)
        });
        return this
      }
    })
  }).call(this, jQuery)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  ! function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery)
  }(function(t) {
    function e(e) {
      var n = {},
        r = /^jQuery\d+$/;
      return t.each(e.attributes, function(t, e) {
        e.specified && !r.test(e.name) && (n[e.name] = e.value)
      }), n
    }

    function n(e, n) {
      var r = this,
        i = t(r);
      if (r.value == i.attr("placeholder") && i.hasClass("placeholder"))
        if (i.data("placeholder-password")) {
          if (i = i.hide().nextAll('input[type="password"]:first').show().attr("id", i.removeAttr("id").data("placeholder-id")), e === !0) return i[0].value = n;
          i.focus()
        } else r.value = "", i.removeClass("placeholder"), r == o() && r.select()
    }

    function r() {
      var r, o = this,
        i = t(o),
        a = this.id;
      if ("" === o.value) {
        if ("password" === o.type) {
          if (!i.data("placeholder-textinput")) {
            try {
              r = i.clone().attr({
                type: "text"
              })
            } catch (s) {
              r = t("<input>").attr(t.extend(e(this), {
                type: "text"
              }))
            }
            r.removeAttr("name").data({
              "placeholder-password": i,
              "placeholder-id": a
            }).bind("focus.placeholder", n), i.data({
              "placeholder-textinput": r,
              "placeholder-id": a
            }).before(r)
          }
          i = i.removeAttr("id").hide().prevAll('input[type="text"]:first').attr("id", a).show()
        }
        i.addClass("placeholder"), i[0].value = i.attr("placeholder")
      } else i.removeClass("placeholder")
    }

    function o() {
      try {
        return document.activeElement
      } catch (t) {}
    }
    var i, a, s = "[object OperaMini]" == Object.prototype.toString.call(window.operamini),
      u = "placeholder" in document.createElement("input") && !s,
      c = "placeholder" in document.createElement("textarea") && !s,
      l = t.valHooks,
      h = t.propHooks;
    u && c ? (a = t.fn.placeholder = function() {
      return this
    }, a.input = a.textarea = !0) : (a = t.fn.placeholder = function() {
      var t = this;
      return t.filter((u ? "textarea" : ":input") + "[placeholder]").not(".placeholder").bind({
        "focus.placeholder": n,
        "blur.placeholder": r
      }).data("placeholder-enabled", !0).trigger("blur.placeholder"), t
    }, a.input = u, a.textarea = c, i = {
      get: function(e) {
        var n = t(e),
          r = n.data("placeholder-password");
        return r ? r[0].value : n.data("placeholder-enabled") && n.hasClass("placeholder") ? "" : e.value
      },
      set: function(e, i) {
        var a = t(e),
          s = a.data("placeholder-password");
        return s ? s[0].value = i : a.data("placeholder-enabled") ? ("" === i ? (e.value = i, e != o() && r.call(e)) : a.hasClass("placeholder") ? n.call(e, !0, i) || (e.value = i) : e.value = i, a) : e.value = i
      }
    }, u || (l.input = i, h.value = i), c || (l.textarea = i, h.value = i), t(function() {
      t(document).delegate("form", "submit.placeholder", function() {
        var e = t(".placeholder", this).each(n);
        setTimeout(function() {
          e.each(r)
        }, 10)
      })
    }), t(window).bind("beforeunload.placeholder", function() {
      t(".placeholder").each(function() {
        this.value = ""
      })
    }))
  })
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  ! function(t) {
    t.fn.columnize = function(e) {
      function n(t, e) {
        try {
          t.append(e)
        } catch (n) {
          t[0].appendChild(e[0])
        }
      }
      var r = {
        width: 400,
        columns: !1,
        buildOnce: !1,
        overflow: !1,
        doneFunc: function() {},
        target: !1,
        ignoreImageLoading: !0,
        columnFloat: "left",
        lastNeverTallest: !1,
        accuracy: !1,
        manualBreaks: !1,
        cssClassPrefix: ""
      };
      return e = t.extend(r, e), "string" == typeof e.width && (e.width = parseInt(e.width, 10), isNaN(e.width) && (e.width = r.width)), this.each(function() {
        function o(t, e) {
          var n = e ? "." : "";
          return m.length ? n + m + "-" + t : n + t
        }

        function i(r, i, a, s) {
          for (;
            (f || a.height() < s) && i[0].childNodes.length;) {
            var u = i[0].childNodes[0];
            if (t(u).find(o("columnbreak", !0)).length) return;
            if (t(u).hasClass(o("columnbreak"))) return;
            n(r, t(u))
          }
          if (0 !== r[0].childNodes.length) {
            var c = r[0].childNodes,
              l = c[c.length - 1];
            r[0].removeChild(l);
            var h = t(l);
            if (3 == h[0].nodeType) {
              var d = h[0].nodeValue,
                p = e.width / 18;
              e.accuracy && (p = e.accuracy);
              for (var m, y = null; a.height() < s && d.length;) {
                var v = d.indexOf(" ", p);
                m = -1 != v ? d.substring(0, v) : d, y = document.createTextNode(m), n(r, t(y)), d = d.length > p && -1 != v ? d.substring(v) : ""
              }
              if (a.height() >= s && null !== y && (r[0].removeChild(y), d = y.nodeValue + d), !d.length) return !1;
              h[0].nodeValue = d
            }
            return i.contents().length ? i.prepend(h) : n(i, h), 3 == h[0].nodeType
          }
        }

        function a(t, e, r, s) {
          if (!t.contents(":last").find(o("columnbreak", !0)).length && !t.contents(":last").hasClass(o("columnbreak")) && e.contents().length) {
            var u = e.contents(":first");
            if ("undefined" == typeof u.get(0) || 1 != u.get(0).nodeType) return;
            var c = u.clone(!0);
            if (u.hasClass(o("columnbreak"))) n(t, c), u.remove();
            else if (f) n(t, c), u.remove();
            else if (1 == c.get(0).nodeType && !c.hasClass(o("dontend")))
              if (n(t, c), c.is("img") && r.height() < s + 20) u.remove();
              else if (u.hasClass(o("dontsplit")) && r.height() < s + 20) u.remove();
            else if (c.is("img") || u.hasClass(o("dontsplit"))) c.remove();
            else {
              if (c.empty(), i(c, u, r, s)) u.addClass(o("split"));
              else {
                if (u.addClass(o("split")), "OL" == u.get(0).tagName) {
                  var l = c.get(0).childElementCount + c.get(0).start;
                  u.attr("start", l + 1)
                }
                u.children().length && a(c, u, r, s)
              }
              0 === c.get(0).childNodes.length && (c.remove(), u.removeClass(o("split")))
            }
          }
        }

        function s() {
          if (!l.data("columnized") || 1 != l.children().length) {
            if (l.data("columnized", !0), l.data("columnizing", !0), l.empty(), l.append(t("<div class='" + o("first") + " " + o("last") + " " + o("column") + " ' style='width:100%; float: " + e.columnFloat + ";'></div>")), $col = l.children().eq(l.children().length - 1), $destroyable = d.clone(!0), e.overflow) {
              for (targetHeight = e.overflow.height, i($col, $destroyable, $col, targetHeight), $destroyable.contents().find(":first-child").hasClass(o("dontend")) || a($col, $destroyable, $col, targetHeight); $col.contents(":last").length && u($col.contents(":last").get(0));) {
                var r = $col.contents(":last");
                r.remove(), $destroyable.prepend(r)
              }
              for (var s = "", c = document.createElement("DIV"); $destroyable[0].childNodes.length > 0;) {
                var h = $destroyable[0].childNodes[0];
                if (h.attributes)
                  for (var p = 0; p < h.attributes.length; p++) 0 === h.attributes[p].nodeName.indexOf("jQuery") && h.removeAttribute(h.attributes[p].nodeName);
                c.innerHTML = "", c.appendChild($destroyable[0].childNodes[0]), s += c.innerHTML
              }
              var f = t(e.overflow.id)[0];
              f.innerHTML = s
            } else n($col, $destroyable.contents());
            l.data("columnizing", !1), e.overflow && e.overflow.doneFunc && e.overflow.doneFunc()
          }
        }

        function u(e) {
          return 3 == e.nodeType ? /^\s+$/.test(e.nodeValue) && e.previousSibling ? u(e.previousSibling) : !1 : 1 != e.nodeType ? !1 : t(e).hasClass(o("dontend")) ? !0 : 0 === e.childNodes.length ? !1 : u(e.childNodes[e.childNodes.length - 1])
        }

        function c() {
          if (y = 0, p != l.width()) {
            p = l.width();
            var r = Math.round(l.width() / e.width),
              c = e.width,
              m = e.height;
            if (e.columns && (r = e.columns), f && (r = d.find(o("columnbreak", !0)).length + 1, c = !1), 1 >= r) return s();
            if (!l.data("columnizing")) {
              l.data("columnized", !0), l.data("columnizing", !0), l.empty(), l.append(t("<div style='width:" + Math.floor(100 / r) + "%; float: " + e.columnFloat + ";'></div>")), k = l.children(":last"), n(k, d.clone()), h = k.height(), l.empty();
              var v = h / r,
                g = 3,
                w = !1;
              e.overflow ? (g = 1, v = e.overflow.height) : m && c && (g = 1, v = m, w = !0);
              for (var _ = 0; g > _ && 20 > _; _++) {
                l.empty();
                var b, C, k, $;
                try {
                  b = d.clone(!0)
                } catch (x) {
                  b = d.clone()
                }
                b.css("visibility", "hidden");
                for (var T = 0; r > T; T++) C = 0 === T ? o("first") : "", C += " " + o("column"), C = T == r - 1 ? o("last") + " " + C : C, l.append(t("<div class='" + C + "' style='width:" + Math.floor(100 / r) + "%; float: " + e.columnFloat + ";'></div>"));
                for (T = 0; T < r - (e.overflow ? 0 : 1) || w && b.contents().length;) {
                  for (l.children().length <= T && l.append(t("<div class='" + C + "' style='width:" + Math.floor(100 / r) + "%; float: " + e.columnFloat + ";'></div>")), k = l.children().eq(T), w && k.width(c + "px"), i(k, b, k, v), a(k, b, k, v); k.contents(":last").length && u(k.contents(":last").get(0));) $ = k.contents(":last"), $.remove(), b.prepend($);
                  T++, 0 === k.contents().length && b.contents().length ? k.append(b.contents(":first")) : T != r - (e.overflow ? 0 : 1) || e.overflow || b.find(o("columnbreak", !0)).length && r++
                }
                if (e.overflow && !w) {
                  var S = !1,
                    M = document.all && -1 != navigator.appVersion.indexOf("MSIE 7.");
                  if (S || M) {
                    for (var R = "", F = document.createElement("DIV"); b[0].childNodes.length > 0;) {
                      var E = b[0].childNodes[0];
                      for (T = 0; T < E.attributes.length; T++) 0 === E.attributes[T].nodeName.indexOf("jQuery") && E.removeAttribute(E.attributes[T].nodeName);
                      F.innerHTML = "", F.appendChild(b[0].childNodes[0]), R += F.innerHTML
                    }
                    var I = t(e.overflow.id)[0];
                    I.innerHTML = R
                  } else t(e.overflow.id).empty().append(b.contents().clone(!0))
                } else if (w) l.children().each(function(t) {
                  k = l.children().eq(t), k.width(c + "px"), 0 === t ? k.addClass(o("first")) : t == l.children().length - 1 ? k.addClass(o("last")) : (k.removeClass(o("first")), k.removeClass(o("last")))
                }), l.width(l.children().length * c + "px");
                else {
                  k = l.children().eq(l.children().length - 1), b.contents().each(function() {
                    k.append(t(this))
                  });
                  var A = (k.height(), 0),
                    W = 1e7,
                    j = 0,
                    O = !1,
                    N = 0;
                  l.children().each(function(t) {
                    return function(e) {
                      var n = t.children().eq(e),
                        r = n.children(":last").find(o("columnbreak", !0)).length;
                      if (!r) {
                        var i = n.height();
                        O = !1, A += i, i > j && (j = i, O = !0), W > i && (W = i), N++
                      }
                    }
                  }(l));
                  var P = A / N;
                  0 === A ? _ = g : e.lastNeverTallest && O ? (y += 5, v += 30, _ == g - 1 && g++) : j - W > 30 ? v = P + 30 : Math.abs(P - v) > 20 ? v = P : _ = g
                }
                l.append(t("<br style='clear:both;'>"))
              }
              l.find(o("column", !0)).find(":first" + o("removeiffirst", !0)).remove(), l.find(o("column", !0)).find(":last" + o("removeiflast", !0)).remove(), l.find(o("split", !0)).find(":first" + o("removeiffirst", !0)).remove(), l.find(o("split", !0)).find(":last" + o("removeiflast", !0)).remove(), l.data("columnizing", !1), e.overflow && e.overflow.doneFunc(), e.doneFunc()
            }
          }
        }
        var l = t(e.target ? e.target : this),
          h = t(this).height(),
          d = t("<div></div>"),
          p = 0,
          f = e.manualBreaks,
          m = r.cssClassPrefix;
        "string" == typeof e.cssClassPrefix && (m = e.cssClassPrefix);
        var y = 0;
        if (n(d, t(this).contents().clone(!0)), !e.ignoreImageLoading && !e.target && !l.data("imageLoaded") && (l.data("imageLoaded", !0), t(this).find("img").length > 0)) {
          var v = function(t, r) {
            return function() {
              t.data("firstImageLoaded") || (t.data("firstImageLoaded", "true"), n(t.empty(), r.children().clone(!0)), t.columnize(e))
            }
          }(t(this), d);
          return t(this).find("img").one("load", v), void t(this).find("img").one("abort", v)
        }
        l.empty(), c(), e.buildOnce || t(window).resize(function() {
          e.buildOnce || (l.data("timeout") && clearTimeout(l.data("timeout")), l.data("timeout", setTimeout(c, 200)))
        })
      })
    }
  }(jQuery)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  fotoramaVersion = "4.6.3",
    function(t, e, n, r, o) {
      "use strict";

      function i(t) {
        var e = "bez_" + r.makeArray(arguments).join("_").replace(".", "p");
        if ("function" != typeof r.easing[e]) {
          var n = function(t, e) {
            var n = [null, null],
              r = [null, null],
              o = [null, null],
              i = function(i, a) {
                return o[a] = 3 * t[a], r[a] = 3 * (e[a] - t[a]) - o[a], n[a] = 1 - o[a] - r[a], i * (o[a] + i * (r[a] + i * n[a]))
              },
              a = function(t) {
                return o[0] + t * (2 * r[0] + 3 * n[0] * t)
              },
              s = function(t) {
                for (var e, n = t, r = 0; ++r < 14 && (e = i(n, 0) - t, !(Math.abs(e) < .001));) n -= e / a(n);
                return n
              };
            return function(t) {
              return i(s(t), 1)
            }
          };
          r.easing[e] = function(e, r, o, i, a) {
            return i * n([t[0], t[1]], [t[2], t[3]])(r / a) + o
          }
        }
        return e
      }

      function a() {}

      function s(t, e, n) {
        return Math.max(isNaN(e) ? -1 / 0 : e, Math.min(isNaN(n) ? 1 / 0 : n, t))
      }

      function u(t) {
        return t.match(/ma/) && t.match(/-?\d+(?!d)/g)[t.match(/3d/) ? 12 : 4]
      }

      function c(t) {
        return jn ? +u(t.css("transform")) : +t.css("left").replace("px", "")
      }

      function l(t) {
        var e = {};
        return jn ? e.transform = "translate3d(" + t + "px,0,0)" : e.left = t, e
      }

      function h(t) {
        return {
          "transition-duration": t + "ms"
        }
      }

      function d(t, e) {
        return isNaN(t) ? e : t
      }

      function p(t, e) {
        return d(+String(t).replace(e || "px", ""))
      }

      function f(t) {
        return /%$/.test(t) ? p(t, "%") : o
      }

      function m(t, e) {
        return d(f(t) / 100 * e, p(t))
      }

      function y(t) {
        return (!isNaN(p(t)) || !isNaN(p(t, "%"))) && t
      }

      function v(t, e, n, r) {
        return (t - (r || 0)) * (e + (n || 0))
      }

      function g(t, e, n, r) {
        return -Math.round(t / (e + (n || 0)) - (r || 0))
      }

      function w(t) {
        var e = t.data();
        if (!e.tEnd) {
          var n = t[0],
            r = {
              WebkitTransition: "webkitTransitionEnd",
              MozTransition: "transitionend",
              OTransition: "oTransitionEnd otransitionend",
              msTransition: "MSTransitionEnd",
              transition: "transitionend"
            };
          V(n, r[bn.prefixed("transition")], function(t) {
            e.tProp && t.propertyName.match(e.tProp) && e.onEndFn()
          }), e.tEnd = !0
        }
      }

      function _(t, e, n, r) {
        var o, i = t.data();
        i && (i.onEndFn = function() {
          o || (o = !0, clearTimeout(i.tT), n())
        }, i.tProp = e, clearTimeout(i.tT), i.tT = setTimeout(function() {
          i.onEndFn()
        }, 1.5 * r), w(t))
      }

      function b(t, e) {
        if (t.length) {
          var n = t.data();
          jn ? (t.css(h(0)), n.onEndFn = a, clearTimeout(n.tT)) : t.stop();
          var r = C(e, function() {
            return c(t)
          });
          return t.css(l(r)), r
        }
      }

      function C() {
        for (var t, e = 0, n = arguments.length; n > e && (t = e ? arguments[e]() : arguments[e], "number" != typeof t); e++);
        return t
      }

      function k(t, e) {
        return Math.round(t + (e - t) / 1.5)
      }

      function $() {
        return $.p = $.p || ("https:" === n.protocol ? "https://" : "http://"), $.p
      }

      function x(t) {
        var n = e.createElement("a");
        return n.href = t, n
      }

      function T(t, e) {
        if ("string" != typeof t) return t;
        t = x(t);
        var n, r;
        if (t.host.match(/youtube\.com/) && t.search) {
          if (n = t.search.split("v=")[1]) {
            var o = n.indexOf("&"); - 1 !== o && (n = n.substring(0, o)), r = "youtube"
          }
        } else t.host.match(/youtube\.com|youtu\.be/) ? (n = t.pathname.replace(/^\/(embed\/|v\/)?/, "").replace(/\/.*/, ""), r = "youtube") : t.host.match(/vimeo\.com/) && (r = "vimeo", n = t.pathname.replace(/^\/(video\/)?/, "").replace(/\/.*/, ""));
        return n && r || !e || (n = t.href, r = "custom"), n ? {
          id: n,
          type: r,
          s: t.search.replace(/^\?/, ""),
          p: $()
        } : !1
      }

      function S(t, e, n) {
        var o, i, a = t.video;
        return "youtube" === a.type ? (i = $() + "img.youtube.com/vi/" + a.id + "/default.jpg", o = i.replace(/\/default.jpg$/, "/hqdefault.jpg"), t.thumbsReady = !0) : "vimeo" === a.type ? r.ajax({
          url: $() + "vimeo.com/api/v2/video/" + a.id + ".json",
          dataType: "jsonp",
          success: function(r) {
            t.thumbsReady = !0, M(e, {
              img: r[0].thumbnail_large,
              thumb: r[0].thumbnail_small
            }, t.i, n)
          }
        }) : t.thumbsReady = !0, {
          img: o,
          thumb: i
        }
      }

      function M(t, e, n, o) {
        for (var i = 0, a = t.length; a > i; i++) {
          var s = t[i];
          if (s.i === n && s.thumbsReady) {
            var u = {
              videoReady: !0
            };
            u[Qn] = u[Zn] = u[Xn] = !1, o.splice(i, 1, r.extend({}, s, u, e));
            break
          }
        }
      }

      function R(t) {
        function e(t, e, o) {
          var i = t.children("img").eq(0),
            a = t.attr("href"),
            s = t.attr("src"),
            u = i.attr("src"),
            c = e.video,
            l = o ? T(a, c === !0) : !1;
          l ? a = !1 : l = c, n(t, i, r.extend(e, {
            video: l,
            img: e.img || a || s || u,
            thumb: e.thumb || u || s || a
          }))
        }

        function n(t, e, n) {
          var o = n.thumb && n.img !== n.thumb,
            i = p(n.width || t.attr("width")),
            a = p(n.height || t.attr("height"));
          r.extend(n, {
            width: i,
            height: a,
            thumbratio: q(n.thumbratio || p(n.thumbwidth || e && e.attr("width") || o || i) / p(n.thumbheight || e && e.attr("height") || o || a))
          })
        }
        var o = [];
        return t.children().each(function() {
          var t = r(this),
            i = B(r.extend(t.data(), {
              id: t.attr("id")
            }));
          if (t.is("a, img")) e(t, i, !0);
          else {
            if (t.is(":empty")) return;
            n(t, null, r.extend(i, {
              html: this,
              _html: t.html()
            }))
          }
          o.push(i)
        }), o
      }

      function F(t) {
        return 0 === t.offsetWidth && 0 === t.offsetHeight
      }

      function E(t) {
        return !r.contains(e.documentElement, t)
      }

      function I(t, e, n, r) {
        return I.i || (I.i = 1, I.ii = [!0]), r = r || I.i, "undefined" == typeof I.ii[r] && (I.ii[r] = !0), t() ? e() : I.ii[r] && setTimeout(function() {
          I.ii[r] && I(t, e, n, r)
        }, n || 100), I.i++
      }

      function A(t) {
        n.replace(n.protocol + "//" + n.host + n.pathname.replace(/^\/?/, "/") + n.search + "#" + t)
      }

      function W(t, e, n, r) {
        var o = t.data(),
          i = o.measures;
        if (i && (!o.l || o.l.W !== i.width || o.l.H !== i.height || o.l.r !== i.ratio || o.l.w !== e.w || o.l.h !== e.h || o.l.m !== n || o.l.p !== r)) {
          console.log("fit");
          var a = i.width,
            u = i.height,
            c = e.w / e.h,
            l = i.ratio >= c,
            h = "scaledown" === n,
            d = "contain" === n,
            p = "cover" === n,
            f = Z(r);
          l && (h || d) || !l && p ? (a = s(e.w, 0, h ? a : 1 / 0), u = a / i.ratio) : (l && p || !l && (h || d)) && (u = s(e.h, 0, h ? u : 1 / 0), a = u * i.ratio), t.css({
            width: a,
            height: u,
            left: m(f.x, e.w - a),
            top: m(f.y, e.h - u)
          }), o.l = {
            W: i.width,
            H: i.height,
            r: i.ratio,
            w: e.w,
            h: e.h,
            m: n,
            p: r
          }
        }
        return !0
      }

      function j(t, e) {
        var n = t[0];
        n.styleSheet ? n.styleSheet.cssText = e : t.html(e)
      }

      function O(t, e, n) {
        return e === n ? !1 : e >= t ? "left" : t >= n ? "right" : "left right"
      }

      function N(t, e, n, r) {
        if (!n) return !1;
        if (!isNaN(t)) return t - (r ? 0 : 1);
        for (var o, i = 0, a = e.length; a > i; i++) {
          var s = e[i];
          if (s.id === t) {
            o = i;
            break
          }
        }
        return o
      }

      function P(t, e, n) {
        n = n || {}, t.each(function() {
          var t, o = r(this),
            i = o.data();
          i.clickOn || (i.clickOn = !0, r.extend(ne(o, {
            onStart: function(e) {
              t = e, (n.onStart || a).call(this, e)
            },
            onMove: n.onMove || a,
            onTouchEnd: n.onTouchEnd || a,
            onEnd: function(n) {
              n.moved || e.call(this, t)
            }
          }), {
            noMove: !0
          }))
        })
      }

      function z(t, e) {
        return '<div class="' + t + '">' + (e || "") + "</div>"
      }

      function L(t) {
        for (var e = t.length; e;) {
          var n = Math.floor(Math.random() * e--),
            r = t[e];
          t[e] = t[n], t[n] = r
        }
        return t
      }

      function H(t) {
        return "[object Array]" == Object.prototype.toString.call(t) && r.map(t, function(t) {
          return r.extend({}, t)
        })
      }

      function D(t, e, n) {
        t.scrollLeft(e || 0).scrollTop(n || 0)
      }

      function B(t) {
        if (t) {
          var e = {};
          return r.each(t, function(t, n) {
            e[t.toLowerCase()] = n
          }), e
        }
      }

      function q(t) {
        if (t) {
          var e = +t;
          return isNaN(e) ? (e = t.split("/"), +e[0] / +e[1] || o) : e
        }
      }

      function V(t, e, n, r) {
        e && (t.addEventListener ? t.addEventListener(e, n, !!r) : t.attachEvent("on" + e, n))
      }

      function U(t) {
        return !!t.getAttribute("disabled")
      }

      function G(t) {
        return {
          tabindex: -1 * t + "",
          disabled: t
        }
      }

      function Y(t, e) {
        V(t, "keyup", function(n) {
          U(t) || 13 == n.keyCode && e.call(t, n)
        })
      }

      function J(t, e) {
        V(t, "focus", t.onfocusin = function(n) {
          e.call(t, n)
        }, !0)
      }

      function Q(t, e) {
        t.preventDefault ? t.preventDefault() : t.returnValue = !1, e && t.stopPropagation && t.stopPropagation()
      }

      function X(t) {
        return t ? ">" : "<"
      }

      function Z(t) {
        return t = (t + "").split(/\s+/), {
          x: y(t[0]) || nr,
          y: y(t[1]) || nr
        }
      }

      function K(t, e) {
        var n = t.data(),
          o = Math.round(e.pos),
          i = function() {
            n.sliding = !1, (e.onEnd || a)()
          };
        "undefined" != typeof e.overPos && e.overPos !== e.pos && (o = e.overPos, i = function() {
          K(t, r.extend({}, e, {
            overPos: e.pos,
            time: Math.max(Bn, e.time / 2)
          }))
        });
        var s = r.extend(l(o), e.width && {
          width: e.width
        });
        n.sliding = !0, jn ? (t.css(r.extend(h(e.time), s)), e.time > 10 ? _(t, "transform", i, e.time) : i()) : t.stop().animate(s, e.time, tr, i)
      }

      function te(t, e, n, o, i, s) {
        var u = "undefined" != typeof s;
        if (u || (i.push(arguments), Array.prototype.push.call(arguments, i.length), !(i.length > 1))) {
          t = t || r(t), e = e || r(e);
          var c = t[0],
            l = e[0],
            h = "crossfade" === o.method,
            d = function() {
              if (!d.done) {
                d.done = !0;
                var t = (u || i.shift()) && i.shift();
                t && te.apply(this, t), (o.onEnd || a)(!!t)
              }
            },
            p = o.time / (s || 1);
          n.removeClass(Be + " " + De), t.stop().addClass(Be), e.stop().addClass(De), h && l && t.fadeTo(0, 0), t.fadeTo(h ? p : 0, 1, h && d), e.fadeTo(p, 0, d), c && h || l || d()
        }
      }

      function ee(t) {
        var e = (t.touches || [])[0] || t;
        t._x = e.pageX, t._y = e.clientY, t._now = r.now()
      }

      function ne(t, n) {
        function o(t) {
          return d = r(t.target), _.checked = m = y = g = !1, l || _.flow || t.touches && t.touches.length > 1 || t.which > 1 || ir && ir.type !== t.type && sr || (m = n.select && d.is(n.select, w)) ? m : (f = "touchstart" === t.type, y = d.is("a, a *", w), p = _.control, v = _.noMove || _.noSwipe || p ? 16 : _.snap ? 0 : 4, ee(t), h = ir = t, ar = t.type.replace(/down|start/, "move").replace(/Down/, "Move"), (n.onStart || a).call(w, t, {
            control: p,
            $target: d
          }), l = _.flow = !0, void((!f || _.go) && Q(t)))
        }

        function i(t) {
          if (t.touches && t.touches.length > 1 || Ln && !t.isPrimary || ar !== t.type || !l) return l && s(), void(n.onTouchEnd || a)();
          ee(t);
          var e = Math.abs(t._x - h._x),
            r = Math.abs(t._y - h._y),
            o = e - r,
            i = (_.go || _.x || o >= 0) && !_.noSwipe,
            u = 0 > o;
          f && !_.checked ? (l = i) && Q(t) : (Q(t), (n.onMove || a).call(w, t, {
            touch: f
          })), !g && Math.sqrt(Math.pow(e, 2) + Math.pow(r, 2)) > v && (g = !0), _.checked = _.checked || i || u
        }

        function s(t) {
          (n.onTouchEnd || a)();
          var e = l;
          _.control = l = !1, e && (_.flow = !1), !e || y && !_.checked || (t && Q(t), sr = !0, clearTimeout(ur), ur = setTimeout(function() {
            sr = !1
          }, 1e3), (n.onEnd || a).call(w, {
            moved: g,
            $target: d,
            control: p,
            touch: f,
            startEvent: h,
            aborted: !t || "MSPointerCancel" === t.type
          }))
        }

        function u() {
          _.flow || setTimeout(function() {
            _.flow = !0
          }, 10)
        }

        function c() {
          _.flow && setTimeout(function() {
            _.flow = !1
          }, Dn)
        }
        var l, h, d, p, f, m, y, v, g, w = t[0],
          _ = {};
        return Ln ? (V(w, "MSPointerDown", o), V(e, "MSPointerMove", i), V(e, "MSPointerCancel", s), V(e, "MSPointerUp", s)) : (V(w, "touchstart", o), V(w, "touchmove", i), V(w, "touchend", s), V(e, "touchstart", u), V(e, "touchend", c), V(e, "touchcancel", c), En.on("scroll", c), t.on("mousedown", o), In.on("mousemove", i).on("mouseup", s)), t.on("click", "a", function(t) {
          _.checked && Q(t)
        }), _
      }

      function re(t, e) {
        function n(n, r) {
          T = !0, c = h = n._x, y = n._now, m = [
            [y, c]
          ], d = p = R.noMove || r ? 0 : b(t, (e.getPos || a)()), (e.onStart || a).call(S, n)
        }

        function o(t, e) {
          g = R.min, w = R.max, _ = R.snap, C = t.altKey, T = x = !1, $ = e.control, $ || M.sliding || n(t)
        }

        function i(r, o) {
          R.noSwipe || (T || n(r), h = r._x, m.push([r._now, h]), p = d - (c - h), f = O(p, g, w), g >= p ? p = k(p, g) : p >= w && (p = k(p, w)), R.noMove || (t.css(l(p)), x || (x = !0, o.touch || Ln || t.addClass(on)), (e.onMove || a).call(S, r, {
            pos: p,
            edge: f
          })))
        }

        function u(o) {
          if (!R.noSwipe || !o.moved) {
            T || n(o.startEvent, !0), o.touch || Ln || t.removeClass(on), v = r.now();
            for (var i, u, c, l, f, y, b, k, $, x = v - Dn, M = null, F = Bn, E = e.friction, I = m.length - 1; I >= 0; I--) {
              if (i = m[I][0], u = Math.abs(i - x), null === M || c > u) M = i, l = m[I][1];
              else if (M === x || u > c) break;
              c = u
            }
            b = s(p, g, w);
            var A = l - h,
              W = A >= 0,
              j = v - M,
              O = j > Dn,
              N = !O && p !== d && b === p;
            _ && (b = s(Math[N ? W ? "floor" : "ceil" : "round"](p / _) * _, g, w), g = w = b), N && (_ || b === p) && ($ = -(A / j), F *= s(Math.abs($), e.timeLow, e.timeHigh), f = Math.round(p + $ * F / E), _ || (b = f), (!W && f > w || W && g > f) && (y = W ? g : w, k = f - y, _ || (b = y), k = s(b + .03 * k, y - 50, y + 50), F = Math.abs((p - k) / ($ / E)))), F *= C ? 10 : 1, (e.onEnd || a).call(S, r.extend(o, {
              moved: o.moved || O && _,
              pos: p,
              newPos: b,
              overPos: k,
              time: F
            }))
          }
        }
        var c, h, d, p, f, m, y, v, g, w, _, C, $, x, T, S = t[0],
          M = t.data(),
          R = {};
        return R = r.extend(ne(e.$wrap, r.extend({}, e, {
          onStart: o,
          onMove: i,
          onEnd: u
        })), R)
      }

      function oe(t, e) {
        var n, o, i, s = t[0],
          u = {
            prevent: {}
          };
        return V(s, Hn, function(t) {
          var s = t.wheelDeltaY || -1 * t.deltaY || 0,
            c = t.wheelDeltaX || -1 * t.deltaX || 0,
            l = Math.abs(c) && !Math.abs(s),
            h = X(0 > c),
            d = o === h,
            p = r.now(),
            f = Dn > p - i;
          o = h, i = p, l && u.ok && (!u.prevent[h] || n) && (Q(t, !0), n && d && f || (e.shift && (n = !0, clearTimeout(u.t), u.t = setTimeout(function() {
            n = !1
          }, qn)), (e.onEnd || a)(t, e.shift ? h : c)))
        }), u
      }

      function ie() {
        r.each(r.Fotorama.instances, function(t, e) {
          e.index = t
        })
      }

      function ae(t) {
        r.Fotorama.instances.push(t), ie()
      }

      function se(t) {
        r.Fotorama.instances.splice(t.index, 1), ie()
      }
      var ue = "fotorama",
        ce = "fullscreen",
        le = ue + "__wrap",
        he = le + "--css2",
        de = le + "--css3",
        pe = le + "--video",
        fe = le + "--fade",
        me = le + "--slide",
        ye = le + "--no-controls",
        ve = le + "--no-shadows",
        ge = le + "--pan-y",
        we = le + "--rtl",
        _e = le + "--only-active",
        be = le + "--no-captions",
        Ce = le + "--toggle-arrows",
        ke = ue + "__stage",
        $e = ke + "__frame",
        xe = $e + "--video",
        Te = ke + "__shaft",
        Se = ue + "__grab",
        Me = ue + "__pointer",
        Re = ue + "__arr",
        Fe = Re + "--disabled",
        Ee = Re + "--prev",
        Ie = Re + "--next",
        Ae = ue + "__nav",
        We = Ae + "-wrap",
        je = Ae + "__shaft",
        Oe = Ae + "--dots",
        Ne = Ae + "--thumbs",
        Pe = Ae + "__frame",
        ze = Pe + "--dot",
        Le = Pe + "--thumb",
        He = ue + "__fade",
        De = He + "-front",
        Be = He + "-rear",
        qe = ue + "__shadow",
        Ve = qe + "s",
        Ue = Ve + "--left",
        Ge = Ve + "--right",
        Ye = ue + "__active",
        Je = ue + "__select",
        Qe = ue + "--hidden",
        Xe = ue + "--fullscreen",
        Ze = ue + "__fullscreen-icon",
        Ke = ue + "__error",
        tn = ue + "__loading",
        en = ue + "__loaded",
        nn = en + "--full",
        rn = en + "--img",
        on = ue + "__grabbing",
        an = ue + "__img",
        sn = an + "--full",
        un = ue + "__dot",
        cn = ue + "__thumb",
        ln = cn + "-border",
        hn = ue + "__html",
        dn = ue + "__video",
        pn = dn + "-play",
        fn = dn + "-close",
        mn = ue + "__caption",
        yn = ue + "__caption__wrap",
        vn = ue + "__spinner",
        gn = '" tabindex="0" role="button',
        wn = r && r.fn.jquery.split(".");
      if (!wn || wn[0] < 1 || 1 == wn[0] && wn[1] < 8) throw "Fotorama requires jQuery 1.8 or later and will not run without it.";
      var _n = {},
        bn = function(t, e, n) {
          function r(t) {
            v.cssText = t
          }

          function o(t, e) {
            return typeof t === e
          }

          function i(t, e) {
            return !!~("" + t).indexOf(e)
          }

          function a(t, e) {
            for (var r in t) {
              var o = t[r];
              if (!i(o, "-") && v[o] !== n) return "pfx" == e ? o : !0
            }
            return !1
          }

          function s(t, e, r) {
            for (var i in t) {
              var a = e[t[i]];
              if (a !== n) return r === !1 ? t[i] : o(a, "function") ? a.bind(r || e) : a
            }
            return !1
          }

          function u(t, e, n) {
            var r = t.charAt(0).toUpperCase() + t.slice(1),
              i = (t + " " + _.join(r + " ") + r).split(" ");
            return o(e, "string") || o(e, "undefined") ? a(i, e) : (i = (t + " " + b.join(r + " ") + r).split(" "), s(i, e, n))
          }
          var c, l, h, d = "2.6.2",
            p = {},
            f = e.documentElement,
            m = "modernizr",
            y = e.createElement(m),
            v = y.style,
            g = ({}.toString, " -webkit- -moz- -o- -ms- ".split(" ")),
            w = "Webkit Moz O ms",
            _ = w.split(" "),
            b = w.toLowerCase().split(" "),
            C = {},
            k = [],
            $ = k.slice,
            x = function(t, n, r, o) {
              var i, a, s, u, c = e.createElement("div"),
                l = e.body,
                h = l || e.createElement("body");
              if (parseInt(r, 10))
                for (; r--;) s = e.createElement("div"), s.id = o ? o[r] : m + (r + 1), c.appendChild(s);
              return i = ["&#173;", '<style id="s', m, '">', t, "</style>"].join(""), c.id = m, (l ? c : h).innerHTML += i, h.appendChild(c), l || (h.style.background = "", h.style.overflow = "hidden", u = f.style.overflow, f.style.overflow = "hidden", f.appendChild(h)), a = n(c, t), l ? c.parentNode.removeChild(c) : (h.parentNode.removeChild(h), f.style.overflow = u), !!a
            },
            T = {}.hasOwnProperty;
          h = o(T, "undefined") || o(T.call, "undefined") ? function(t, e) {
            return e in t && o(t.constructor.prototype[e], "undefined")
          } : function(t, e) {
            return T.call(t, e)
          }, Function.prototype.bind || (Function.prototype.bind = function(t) {
            var e = this;
            if ("function" != typeof e) throw new TypeError;
            var n = $.call(arguments, 1),
              r = function() {
                if (this instanceof r) {
                  var o = function() {};
                  o.prototype = e.prototype;
                  var i = new o,
                    a = e.apply(i, n.concat($.call(arguments)));
                  return Object(a) === a ? a : i
                }
                return e.apply(t, n.concat($.call(arguments)))
              };
            return r
          }), C.csstransforms3d = function() {
            var t = !!u("perspective");
            return t
          };
          for (var S in C) h(C, S) && (l = S.toLowerCase(), p[l] = C[S](), k.push((p[l] ? "" : "no-") + l));
          return p.addTest = function(t, e) {
            if ("object" == typeof t)
              for (var r in t) h(t, r) && p.addTest(r, t[r]);
            else {
              if (t = t.toLowerCase(), p[t] !== n) return p;
              e = "function" == typeof e ? e() : e, "undefined" != typeof enableClasses && enableClasses && (f.className += " " + (e ? "" : "no-") + t), p[t] = e
            }
            return p
          }, r(""), y = c = null, p._version = d, p._prefixes = g, p._domPrefixes = b, p._cssomPrefixes = _, p.testProp = function(t) {
            return a([t])
          }, p.testAllProps = u, p.testStyles = x, p.prefixed = function(t, e, n) {
            return e ? u(t, e, n) : u(t, "pfx")
          }, p
        }(t, e),
        Cn = {
          ok: !1,
          is: function() {
            return !1
          },
          request: function() {},
          cancel: function() {},
          event: "",
          prefix: ""
        },
        kn = "webkit moz o ms khtml".split(" ");
      if ("undefined" != typeof e.cancelFullScreen) Cn.ok = !0;
      else
        for (var $n = 0, xn = kn.length; xn > $n; $n++)
          if (Cn.prefix = kn[$n], "undefined" != typeof e[Cn.prefix + "CancelFullScreen"]) {
            Cn.ok = !0;
            break
          }
      Cn.ok && (Cn.event = Cn.prefix + "fullscreenchange", Cn.is = function() {
        switch (this.prefix) {
          case "":
            return e.fullScreen;
          case "webkit":
            return e.webkitIsFullScreen;
          default:
            return e[this.prefix + "FullScreen"]
        }
      }, Cn.request = function(t) {
        return "" === this.prefix ? t.requestFullScreen() : t[this.prefix + "RequestFullScreen"]()
      }, Cn.cancel = function() {
        return "" === this.prefix ? e.cancelFullScreen() : e[this.prefix + "CancelFullScreen"]()
      });
      var Tn, Sn = {
          lines: 12,
          length: 5,
          width: 2,
          radius: 7,
          corners: 1,
          rotate: 15,
          color: "rgba(128, 128, 128, .75)",
          hwaccel: !0
        },
        Mn = {
          top: "auto",
          left: "auto",
          className: ""
        };
      ! function(t, e) {
        Tn = e()
      }(this, function() {
        function t(t, n) {
          var r, o = e.createElement(t || "div");
          for (r in n) o[r] = n[r];
          return o
        }

        function n(t) {
          for (var e = 1, n = arguments.length; n > e; e++) t.appendChild(arguments[e]);
          return t
        }

        function r(t, e, n, r) {
          var o = ["opacity", e, ~~(100 * t), n, r].join("-"),
            i = .01 + n / r * 100,
            a = Math.max(1 - (1 - t) / e * (100 - i), t),
            s = d.substring(0, d.indexOf("Animation")).toLowerCase(),
            u = s && "-" + s + "-" || "";
          return f[o] || (m.insertRule("@" + u + "keyframes " + o + "{0%{opacity:" + a + "}" + i + "%{opacity:" + t + "}" + (i + .01) + "%{opacity:1}" + (i + e) % 100 + "%{opacity:" + t + "}100%{opacity:" + a + "}}", m.cssRules.length), f[o] = 1), o
        }

        function i(t, e) {
          var n, r, i = t.style;
          for (e = e.charAt(0).toUpperCase() + e.slice(1), r = 0; r < p.length; r++)
            if (n = p[r] + e, i[n] !== o) return n;
          return i[e] !== o ? e : void 0
        }

        function a(t, e) {
          for (var n in e) t.style[i(t, n) || n] = e[n];
          return t
        }

        function s(t) {
          for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n) t[r] === o && (t[r] = n[r])
          }
          return t
        }

        function u(t) {
          for (var e = {
              x: t.offsetLeft,
              y: t.offsetTop
            }; t = t.offsetParent;) e.x += t.offsetLeft, e.y += t.offsetTop;
          return e
        }

        function c(t, e) {
          return "string" == typeof t ? t : t[e % t.length]
        }

        function l(t) {
          return "undefined" == typeof this ? new l(t) : void(this.opts = s(t || {}, l.defaults, y))
        }

        function h() {
          function e(e, n) {
            return t("<" + e + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', n)
          }
          m.addRule(".spin-vml", "behavior:url(#default#VML)"), l.prototype.lines = function(t, r) {
            function o() {
              return a(e("group", {
                coordsize: l + " " + l,
                coordorigin: -u + " " + -u
              }), {
                width: l,
                height: l
              })
            }

            function i(t, i, s) {
              n(d, n(a(o(), {
                rotation: 360 / r.lines * t + "deg",
                left: ~~i
              }), n(a(e("roundrect", {
                arcsize: r.corners
              }), {
                width: u,
                height: r.width,
                left: r.radius,
                top: -r.width >> 1,
                filter: s
              }), e("fill", {
                color: c(r.color, t),
                opacity: r.opacity
              }), e("stroke", {
                opacity: 0
              }))))
            }
            var s, u = r.length + r.width,
              l = 2 * u,
              h = 2 * -(r.width + r.length) + "px",
              d = a(o(), {
                position: "absolute",
                top: h,
                left: h
              });
            if (r.shadow)
              for (s = 1; s <= r.lines; s++) i(s, -2, "progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");
            for (s = 1; s <= r.lines; s++) i(s);
            return n(t, d)
          }, l.prototype.opacity = function(t, e, n, r) {
            var o = t.firstChild;
            r = r.shadow && r.lines || 0, o && e + r < o.childNodes.length && (o = o.childNodes[e + r], o = o && o.firstChild, o = o && o.firstChild, o && (o.opacity = n))
          }
        }
        var d, p = ["webkit", "Moz", "ms", "O"],
          f = {},
          m = function() {
            var r = t("style", {
              type: "text/css"
            });
            return n(e.getElementsByTagName("head")[0], r), r.sheet || r.styleSheet
          }(),
          y = {
            lines: 12,
            length: 7,
            width: 5,
            radius: 10,
            rotate: 0,
            corners: 1,
            color: "#000",
            direction: 1,
            speed: 1,
            trail: 100,
            opacity: .25,
            fps: 20,
            zIndex: 2e9,
            className: "spinner",
            top: "auto",
            left: "auto",
            position: "relative"
          };
        l.defaults = {}, s(l.prototype, {
          spin: function(e) {
            this.stop();
            var n, r, o = this,
              i = o.opts,
              s = o.el = a(t(0, {
                className: i.className
              }), {
                position: i.position,
                width: 0,
                zIndex: i.zIndex
              }),
              c = i.radius + i.length + i.width;
            if (e && (e.insertBefore(s, e.firstChild || null), r = u(e), n = u(s), a(s, {
                left: ("auto" == i.left ? r.x - n.x + (e.offsetWidth >> 1) : parseInt(i.left, 10) + c) + "px",
                top: ("auto" == i.top ? r.y - n.y + (e.offsetHeight >> 1) : parseInt(i.top, 10) + c) + "px"
              })), s.setAttribute("role", "progressbar"), o.lines(s, o.opts), !d) {
              var l, h = 0,
                p = (i.lines - 1) * (1 - i.direction) / 2,
                f = i.fps,
                m = f / i.speed,
                y = (1 - i.opacity) / (m * i.trail / 100),
                v = m / i.lines;
              ! function g() {
                h++;
                for (var t = 0; t < i.lines; t++) l = Math.max(1 - (h + (i.lines - t) * v) % m * y, i.opacity), o.opacity(s, t * i.direction + p, l, i);
                o.timeout = o.el && setTimeout(g, ~~(1e3 / f))
              }()
            }
            return o
          },
          stop: function() {
            var t = this.el;
            return t && (clearTimeout(this.timeout), t.parentNode && t.parentNode.removeChild(t), this.el = o), this
          },
          lines: function(e, o) {
            function i(e, n) {
              return a(t(), {
                position: "absolute",
                width: o.length + o.width + "px",
                height: o.width + "px",
                background: e,
                boxShadow: n,
                transformOrigin: "left",
                transform: "rotate(" + ~~(360 / o.lines * u + o.rotate) + "deg) translate(" + o.radius + "px,0)",
                borderRadius: (o.corners * o.width >> 1) + "px"
              })
            }
            for (var s, u = 0, l = (o.lines - 1) * (1 - o.direction) / 2; u < o.lines; u++) s = a(t(), {
              position: "absolute",
              top: 1 + ~(o.width / 2) + "px",
              transform: o.hwaccel ? "translate3d(0,0,0)" : "",
              opacity: o.opacity,
              animation: d && r(o.opacity, o.trail, l + u * o.direction, o.lines) + " " + 1 / o.speed + "s linear infinite"
            }), o.shadow && n(s, a(i("#000", "0 0 4px #000"), {
              top: "2px"
            })), n(e, n(s, i(c(o.color, u), "0 0 1px rgba(0,0,0,.1)")));
            return e
          },
          opacity: function(t, e, n) {
            e < t.childNodes.length && (t.childNodes[e].style.opacity = n)
          }
        });
        var v = a(t("group"), {
          behavior: "url(#default#VML)"
        });
        return !i(v, "transform") && v.adj ? h() : d = i(v, "animation"), l
      });
      var Rn, Fn, En = r(t),
        In = r(e),
        An = "quirks" === n.hash.replace("#", ""),
        Wn = bn.csstransforms3d,
        jn = Wn && !An,
        On = Wn || "CSS1Compat" === e.compatMode,
        Nn = Cn.ok,
        Pn = navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i),
        zn = !jn || Pn,
        Ln = navigator.msPointerEnabled,
        Hn = "onwheel" in e.createElement("div") ? "wheel" : e.onmousewheel !== o ? "mousewheel" : "DOMMouseScroll",
        Dn = 250,
        Bn = 300,
        qn = 1400,
        Vn = 5e3,
        Un = 2,
        Gn = 64,
        Yn = 500,
        Jn = 333,
        Qn = "$stageFrame",
        Xn = "$navDotFrame",
        Zn = "$navThumbFrame",
        Kn = "auto",
        tr = i([.1, 0, .25, 1]),
        er = 99999,
        nr = "50%",
        rr = {
          width: null,
          minwidth: null,
          maxwidth: "100%",
          height: null,
          minheight: null,
          maxheight: null,
          ratio: null,
          margin: Un,
          glimpse: 0,
          fit: "contain",
          position: nr,
          thumbposition: nr,
          nav: "dots",
          navposition: "bottom",
          navwidth: null,
          thumbwidth: Gn,
          thumbheight: Gn,
          thumbmargin: Un,
          thumbborderwidth: Un,
          thumbfit: "cover",
          allowfullscreen: !1,
          transition: "slide",
          clicktransition: null,
          transitionduration: Bn,
          captions: !0,
          hash: !1,
          startindex: 0,
          loop: !1,
          autoplay: !1,
          stopautoplayontouch: !0,
          keyboard: !1,
          arrows: !0,
          click: !0,
          swipe: !0,
          trackpad: !1,
          enableifsingleframe: !1,
          controlsonstart: !0,
          shuffle: !1,
          direction: "ltr",
          shadows: !0,
          spinner: null
        },
        or = {
          left: !0,
          right: !0,
          down: !1,
          up: !1,
          space: !1,
          home: !1,
          end: !1
        };
      I.stop = function(t) {
        I.ii[t] = !1
      };
      var ir, ar, sr, ur;
      jQuery.Fotorama = function(t, o) {
        function i() {
          r.each(xr, function(t, e) {
            if (!e.i) {
              e.i = fo++;
              var n = T(e.video, !0);
              if (n) {
                var r = {};
                e.video = n, e.img || e.thumb ? e.thumbsReady = !0 : r = S(e, xr, co), M(xr, {
                  img: r.img,
                  thumb: r.thumb
                }, e.i, co)
              }
            }
          })
        }

        function a(t) {
          return Zr[t] || co.fullScreen
        }

        function u(t) {
          var e = "keydown." + ue,
            n = ue + lo,
            r = "keydown." + n,
            i = "resize." + n + " orientationchange." + n;
          t ? (In.on(r, function(t) {
            var e, n;
            Rr && 27 === t.keyCode ? (e = !0, pr(Rr, !0, !0)) : (co.fullScreen || o.keyboard && !co.index) && (27 === t.keyCode ? (e = !0, co.cancelFullScreen()) : t.shiftKey && 32 === t.keyCode && a("space") || 37 === t.keyCode && a("left") || 38 === t.keyCode && a("up") ? n = "<" : 32 === t.keyCode && a("space") || 39 === t.keyCode && a("right") || 40 === t.keyCode && a("down") ? n = ">" : 36 === t.keyCode && a("home") ? n = "<<" : 35 === t.keyCode && a("end") && (n = ">>")), (e || n) && Q(t), n && co.show({
              index: n,
              slow: t.altKey,
              user: !0
            })
          }), co.index || In.off(e).on(e, "textarea, input, select", function(t) {
            !Fn.hasClass(ce) && t.stopPropagation()
          }), En.on(i, co.resize)) : (In.off(r), En.off(i))
        }

        function c(e) {
          e !== c.f && (e ? (t.html("").addClass(ue + " " + ho).append(go).before(yo).before(vo), ae(co)) : (go.detach(), yo.detach(), vo.detach(), t.html(mo.urtext).removeClass(ho), se(co)), u(e), c.f = e)
        }

        function d() {
          xr = co.data = xr || H(o.data) || R(t), Tr = co.size = xr.length, !$r.ok && o.shuffle && L(xr), i(), No = $(No), Tr && c(!0)
        }

        function f() {
          var t = 2 > Tr && !o.enableifsingleframe || Rr;
          Lo.noMove = t || Vr, Lo.noSwipe = t || !o.swipe, !Jr && _o.toggleClass(Se, !o.click && !Lo.noMove && !Lo.noSwipe), Ln && go.toggleClass(ge, !Lo.noSwipe)
        }

        function w(t) {
          t === !0 && (t = ""), o.autoplay = Math.max(+t || Vn, 1.5 * Yr)
        }

        function _() {
          function t(t, n) {
            e[t ? "add" : "remove"].push(n)
          }
          co.options = o = B(o), Vr = "crossfade" === o.transition || "dissolve" === o.transition, zr = o.loop && (Tr > 2 || Vr && (!Jr || "slide" !== Jr)), Yr = +o.transitionduration || Bn, Xr = "rtl" === o.direction, Zr = r.extend({}, o.keyboard && or, o.keyboard);
          var e = {
            add: [],
            remove: []
          };
          Tr > 1 || o.enableifsingleframe ? (Lr = o.nav, Dr = "top" === o.navposition, e.remove.push(Je), $o.toggle(!!o.arrows)) : (Lr = !1, $o.hide()), Be(), Mr = new Tn(r.extend(Sn, o.spinner, Mn, {
            direction: Xr ? -1 : 1
          })), An(), Wn(), o.autoplay && w(o.autoplay), Ur = p(o.thumbwidth) || Gn, Gr = p(o.thumbheight) || Gn, Ho.ok = Bo.ok = o.trackpad && !zn, f(), ir(o, [zo]), Hr = "thumbs" === Lr, Hr ? (dn(Tr, "navThumb"), Sr = Ro, uo = Zn, j(yo, r.Fotorama.jst.style({
            w: Ur,
            h: Gr,
            b: o.thumbborderwidth,
            m: o.thumbmargin,
            s: lo,
            q: !On
          })), To.addClass(Ne).removeClass(Oe)) : "dots" === Lr ? (dn(Tr, "navDot"), Sr = Mo, uo = Xn, To.addClass(Oe).removeClass(Ne)) : (Lr = !1, To.removeClass(Ne + " " + Oe)), Lr && (Dr ? xo.insertBefore(wo) : xo.insertAfter(wo), kn.nav = !1, kn(Sr, So, "nav")), Br = o.allowfullscreen, Br ? (Eo.prependTo(wo), qr = Nn && "native" === Br) : (Eo.detach(), qr = !1), t(Vr, fe), t(!Vr, me), t(!o.captions, be), t(Xr, we), t("always" !== o.arrows, Ce), Qr = o.shadows && !zn, t(!Qr, ve), go.addClass(e.add.join(" ")).removeClass(e.remove.join(" ")), Po = r.extend({}, o)
        }

        function k(t) {
          return 0 > t ? (Tr + t % Tr) % Tr : t >= Tr ? t % Tr : t
        }

        function $(t) {
          return s(t, 0, Tr - 1)
        }

        function x(t) {
          return zr ? k(t) : $(t)
        }

        function F(t) {
          return t > 0 || zr ? t - 1 : !1
        }

        function U(t) {
          return Tr - 1 > t || zr ? t + 1 : !1
        }

        function Z() {
          Lo.min = zr ? -1 / 0 : -v(Tr - 1, zo.w, o.margin, Ir), Lo.max = zr ? 1 / 0 : -v(0, zo.w, o.margin, Ir), Lo.snap = zo.w + o.margin
        }

        function ee() {
          Do.min = Math.min(0, zo.nw - So.width()), Do.max = 0, So.toggleClass(Se, !(Do.noMove = Do.min === Do.max))
        }

        function ne(t, e, n) {
          if ("number" == typeof t) {
            t = new Array(t);
            var o = !0
          }
          return r.each(t, function(t, r) {
            if (o && (r = t), "number" == typeof r) {
              var i = xr[k(r)];
              if (i) {
                var a = "$" + e + "Frame",
                  s = i[a];
                n.call(this, t, r, i, s, a, s && s.data())
              }
            }
          })
        }

        function ie(t, e, n, r) {
          (!Kr || "*" === Kr && r === Pr) && (t = y(o.width) || y(t) || Yn, e = y(o.height) || y(e) || Jn, co.resize({
            width: t,
            ratio: o.ratio || n || t / e
          }, 0, r !== Pr && "*"))
        }

        function He(t, e, n, i, a, s) {
          ne(t, e, function(t, u, c, l, h, d) {
            function p(t) {
              var e = k(u);
              ar(t, {
                index: e,
                src: C,
                frame: xr[e]
              })
            }

            function f() {
              w.remove(), r.Fotorama.cache[C] = "error", c.html && "stage" === e || !$ || $ === C ? (!C || c.html || v ? "stage" === e && (l.trigger("f:load").removeClass(tn + " " + Ke).addClass(en), p("load"), ie()) : (l.trigger("f:error").removeClass(tn).addClass(Ke), p("error")), d.state = "error", !(Tr > 1 && xr[u] === c) || c.html || c.deleted || c.video || v || (c.deleted = !0, co.splice(u, 1))) : (c[b] = C = $, He([u], e, n, i, a, !0))
            }

            function m() {
              r.Fotorama.measures[C] = _.measures = r.Fotorama.measures[C] || {
                width: g.width,
                height: g.height,
                ratio: g.width / g.height
              }, ie(_.measures.width, _.measures.height, _.measures.ratio, u), w.off("load error").addClass(an + (v ? " " + sn : "")).prependTo(l), W(w, (r.isFunction(n) ? n() : n) || zo, i || c.fit || o.fit, a || c.position || o.position), r.Fotorama.cache[C] = d.state = "loaded", setTimeout(function() {
                l.trigger("f:load").removeClass(tn + " " + Ke).addClass(en + " " + (v ? nn : rn)), "stage" === e ? p("load") : (c.thumbratio === Kn || !c.thumbratio && o.thumbratio === Kn) && (c.thumbratio = _.measures.ratio, Cr())
              }, 0)
            }

            function y() {
              var t = 10;
              I(function() {
                return !ao || !t-- && !zn
              }, function() {
                m()
              })
            }
            if (l) {
              var v = co.fullScreen && c.full && c.full !== c.img && !d.$full && "stage" === e;
              if (!d.$img || s || v) {
                var g = new Image,
                  w = r(g),
                  _ = w.data();
                d[v ? "$full" : "$img"] = w;
                var b = "stage" === e ? v ? "full" : "img" : "thumb",
                  C = c[b],
                  $ = v ? null : c["stage" === e ? "thumb" : "img"];
                if ("navThumb" === e && (l = d.$wrap), !C) return void f();
                r.Fotorama.cache[C] ? ! function x() {
                  "error" === r.Fotorama.cache[C] ? f() : "loaded" === r.Fotorama.cache[C] ? setTimeout(y, 0) : setTimeout(x, 100)
                }() : (r.Fotorama.cache[C] = "*", w.on("load", y).on("error", f)), d.state = "", g.src = C
              }
            }
          })
        }

        function De(t) {
          Oo.append(Mr.spin().el).appendTo(t)
        }

        function Be() {
          Oo.detach(), Mr && Mr.stop()
        }

        function qe() {
          var t = Fr[Qn];
          t && !t.data().state && (De(t), t.on("f:load f:error", function() {
            t.off("f:load f:error"), Be()
          }))
        }

        function on(t) {
          Y(t, wr), J(t, function() {
            setTimeout(function() {
              D(To)
            }, 0), qn({
              time: Yr,
              guessIndex: r(this).data().eq,
              minMax: Do
            })
          })
        }

        function dn(t, e) {
          ne(t, e, function(t, n, o, i, a, s) {
            if (!i) {
              i = o[a] = go[a].clone(), s = i.data(), s.data = o;
              var u = i[0];
              "stage" === e ? (o.html && r('<div class="' + hn + '"></div>').append(o._html ? r(o.html).removeAttr("id").html(o._html) : o.html).appendTo(i), o.caption && r(z(mn, z(yn, o.caption))).appendTo(i), o.video && i.addClass(xe).append(Ao.clone()), J(u, function() {
                setTimeout(function() {
                  D(wo)
                }, 0), yr({
                  index: s.eq,
                  user: !0
                })
              }), bo = bo.add(i)) : "navDot" === e ? (on(u), Mo = Mo.add(i)) : "navThumb" === e && (on(u), s.$wrap = i.children(":first"), Ro = Ro.add(i), o.video && s.$wrap.append(Ao.clone()))
            }
          })
        }

        function wn(t, e, n, r) {
          return t && t.length && W(t, e, n, r)
        }

        function _n(t) {
          ne(t, "stage", function(t, e, n, i, a, s) {
            if (i) {
              var u = k(e),
                c = n.fit || o.fit,
                l = n.position || o.position;
              s.eq = u, Vo[Qn][u] = i.css(r.extend({
                left: Vr ? 0 : v(e, zo.w, o.margin, Ir)
              }, Vr && h(0))), E(i[0]) && (i.appendTo(_o), pr(n.$video)), wn(s.$img, zo, c, l), wn(s.$full, zo, c, l)
            }
          })
        }

        function bn(t, e) {
          if ("thumbs" === Lr && !isNaN(t)) {
            var n = -t,
              i = -t + zo.nw;
            Ro.each(function() {
              var t = r(this),
                a = t.data(),
                s = a.eq,
                u = function() {
                  return {
                    h: Gr,
                    w: a.w
                  }
                },
                c = u(),
                l = xr[s] || {},
                h = l.thumbfit || o.thumbfit,
                d = l.thumbposition || o.thumbposition;
              c.w = a.w, a.l + a.w < n || a.l > i || wn(a.$img, c, h, d) || e && He([s], "navThumb", u, h, d)
            })
          }
        }

        function kn(t, e, n) {
          if (!kn[n]) {
            var i = "nav" === n && Hr,
              a = 0;
            e.append(t.filter(function() {
              for (var t, e = r(this), n = e.data(), o = 0, i = xr.length; i > o; o++)
                if (n.data === xr[o]) {
                  t = !0, n.eq = o;
                  break
                }
              return t || e.remove() && !1
            }).sort(function(t, e) {
              return r(t).data().eq - r(e).data().eq
            }).each(function() {
              if (i) {
                var t = r(this),
                  e = t.data(),
                  n = Math.round(Gr * e.data.thumbratio) || Ur;
                e.l = a, e.w = n, t.css({
                  width: n
                }), a += n + o.thumbmargin
              }
            })), kn[n] = !0
          }
        }

        function $n(t) {
          return t - Uo > zo.w / 3
        }

        function xn(t) {
          return !(zr || No + t && No - Tr + t || Rr)
        }

        function An() {
          var t = xn(0),
            e = xn(1);
          Co.toggleClass(Fe, t).attr(G(t)), ko.toggleClass(Fe, e).attr(G(e))
        }

        function Wn() {
          Ho.ok && (Ho.prevent = {
            "<": xn(0),
            ">": xn(1)
          })
        }

        function Pn(t) {
          var e, n, r = t.data();
          return Hr ? (e = r.l, n = r.w) : (e = t.position().left, n = t.width()), {
            c: e + n / 2,
            min: -e + 10 * o.thumbmargin,
            max: -e + zo.w - n - 10 * o.thumbmargin
          }
        }

        function Hn(t) {
          var e = Fr[uo].data();
          K(Fo, {
            time: 1.2 * t,
            pos: e.l,
            width: e.w - 2 * o.thumbborderwidth
          })
        }

        function qn(t) {
          var e = xr[t.guessIndex][uo];
          if (e) {
            var n = Do.min !== Do.max,
              r = t.minMax || n && Pn(Fr[uo]),
              o = n && (t.keep && qn.l ? qn.l : s((t.coo || zo.nw / 2) - Pn(e).c, r.min, r.max)),
              i = n && s(o, Do.min, Do.max),
              a = 1.1 * t.time;
            K(So, {
              time: a,
              pos: i || 0,
              onEnd: function() {
                bn(i, !0)
              }
            }), dr(To, O(i, Do.min, Do.max)), qn.l = o
          }
        }

        function Un() {
          tr(uo), qo[uo].push(Fr[uo].addClass(Ye))
        }

        function tr(t) {
          for (var e = qo[t]; e.length;) e.shift().removeClass(Ye)
        }

        function nr(t) {
          var e = Vo[t];
          r.each(Er, function(t, n) {
            delete e[k(n)]
          }), r.each(e, function(t, n) {
            delete e[t], n.detach()
          })
        }

        function rr(t) {
          Ir = Ar = No;
          var e = Fr[Qn];
          e && (tr(Qn), qo[Qn].push(e.addClass(Ye)), t || co.show.onEnd(!0), b(_o, 0, !0), nr(Qn), _n(Er), Z(), ee())
        }

        function ir(t, e) {
          t && r.each(e, function(e, n) {
            n && r.extend(n, {
              width: t.width || n.width,
              height: t.height,
              minwidth: t.minwidth,
              maxwidth: t.maxwidth,
              minheight: t.minheight,
              maxheight: t.maxheight,
              ratio: q(t.ratio)
            })
          })
        }

        function ar(e, n) {
          t.trigger(ue + ":" + e, [co, n])
        }

        function sr() {
          clearTimeout(ur.t), ao = 1, o.stopautoplayontouch ? co.stopAutoplay() : ro = !0
        }

        function ur() {
          ao && (o.stopautoplayontouch || (cr(), lr()), ur.t = setTimeout(function() {
            ao = 0
          }, Bn + Dn))
        }

        function cr() {
          ro = !(!Rr && !oo)
        }

        function lr() {
          if (clearTimeout(lr.t), I.stop(lr.w), !o.autoplay || ro) return void(co.autoplay && (co.autoplay = !1, ar("stopautoplay")));
          co.autoplay || (co.autoplay = !0, ar("startautoplay"));
          var t = No,
            e = Fr[Qn].data();
          lr.w = I(function() {
            return e.state || t !== No
          }, function() {
            lr.t = setTimeout(function() {
              if (!ro && t === No) {
                var e = Nr,
                  n = xr[e][Qn].data();
                lr.w = I(function() {
                  return n.state || e !== Nr
                }, function() {
                  ro || e !== Nr || co.show(zr ? X(!Xr) : Nr)
                })
              }
            }, o.autoplay)
          })
        }

        function hr() {
          co.fullScreen && (co.fullScreen = !1, Nn && Cn.cancel(po), Fn.removeClass(ce), Rn.removeClass(ce), t.removeClass(Xe).insertAfter(vo), zo = r.extend({}, io), pr(Rr, !0, !0), gr("x", !1), co.resize(), He(Er, "stage"), D(En, eo, to), ar("fullscreenexit"))
        }

        function dr(t, e) {
          Qr && (t.removeClass(Ue + " " + Ge), e && !Rr && t.addClass(e.replace(/^|\s/g, " " + Ve + "--")))
        }

        function pr(t, e, n) {
          e && (go.removeClass(pe), Rr = !1, f()), t && t !== Rr && (t.remove(), ar("unloadvideo")), n && (cr(), lr())
        }

        function fr(t) {
          go.toggleClass(ye, t)
        }

        function mr(t) {
          if (!Lo.flow) {
            var e = t ? t.pageX : mr.x,
              n = e && !xn($n(e)) && o.click;
            mr.p !== n && wo.toggleClass(Me, n) && (mr.p = n, mr.x = e)
          }
        }

        function yr(t) {
          clearTimeout(yr.t), o.clicktransition && o.clicktransition !== o.transition ? setTimeout(function() {
            var e = o.transition;
            co.setOptions({
              transition: o.clicktransition
            }), Jr = e, yr.t = setTimeout(function() {
              co.show(t)
            }, 10)
          }, 0) : co.show(t)
        }

        function vr(t, e) {
          var n = t.target,
            i = r(n);
          i.hasClass(pn) ? co.playVideo() : n === Io ? co.toggleFullScreen() : Rr ? n === jo && pr(Rr, !0, !0) : e ? fr() : o.click && yr({
            index: t.shiftKey || X($n(t._x)),
            slow: t.altKey,
            user: !0
          })
        }

        function gr(t, e) {
          Lo[t] = Do[t] = e
        }

        function wr(t) {
          var e = r(this).data().eq;
          yr({
            index: e,
            slow: t.altKey,
            user: !0,
            coo: t._x - To.offset().left
          })
        }

        function _r(t) {
          yr({
            index: $o.index(this) ? ">" : "<",
            slow: t.altKey,
            user: !0
          })
        }

        function br(t) {
          J(t, function() {
            setTimeout(function() {
              D(wo)
            }, 0), fr(!1)
          })
        }

        function Cr() {
          if (d(), _(), !Cr.i) {
            Cr.i = !0;
            var t = o.startindex;
            (t || o.hash && n.hash) && (Pr = N(t || n.hash.replace(/^#/, ""), xr, 0 === co.index || t, t)), No = Ir = Ar = Wr = Pr = x(Pr) || 0
          }
          if (Tr) {
            if (kr()) return;
            Rr && pr(Rr, !0), Er = [], nr(Qn), Cr.ok = !0, co.show({
              index: No,
              time: 0
            }), co.resize()
          } else co.destroy()
        }

        function kr() {
          return !kr.f === Xr ? (kr.f = Xr, No = Tr - 1 - No, co.reverse(), !0) : void 0
        }

        function $r() {
          $r.ok || ($r.ok = !0, ar("ready"))
        }
        Rn = r("html"), Fn = r("body");
        var xr, Tr, Sr, Mr, Rr, Fr, Er, Ir, Ar, Wr, jr, Or, Nr, Pr, zr, Lr, Hr, Dr, Br, qr, Vr, Ur, Gr, Yr, Jr, Qr, Xr, Zr, Kr, to, eo, no, ro, oo, io, ao, so, uo, co = this,
          lo = r.now(),
          ho = ue + lo,
          po = t[0],
          fo = 1,
          mo = t.data(),
          yo = r("<style></style>"),
          vo = r(z(Qe)),
          go = r(z(le)),
          wo = r(z(ke)).appendTo(go),
          _o = (wo[0], r(z(Te)).appendTo(wo)),
          bo = r(),
          Co = r(z(Re + " " + Ee + gn)),
          ko = r(z(Re + " " + Ie + gn)),
          $o = Co.add(ko).appendTo(wo),
          xo = r(z(We)),
          To = r(z(Ae)).appendTo(xo),
          So = r(z(je)).appendTo(To),
          Mo = r(),
          Ro = r(),
          Fo = (_o.data(), So.data(), r(z(ln)).appendTo(So)),
          Eo = r(z(Ze + gn)),
          Io = Eo[0],
          Ao = r(z(pn)),
          Wo = r(z(fn)).appendTo(wo),
          jo = Wo[0],
          Oo = r(z(vn)),
          No = !1,
          Po = {},
          zo = {},
          Lo = {},
          Ho = {},
          Do = {},
          Bo = {},
          qo = {},
          Vo = {},
          Uo = 0,
          Go = [];
        go[Qn] = r(z($e)), go[Zn] = r(z(Pe + " " + Le + gn, z(cn))), go[Xn] = r(z(Pe + " " + ze + gn, z(un))), qo[Qn] = [], qo[Zn] = [], qo[Xn] = [], Vo[Qn] = {}, go.addClass(jn ? de : he).toggleClass(ye, !o.controlsonstart), mo.fotorama = this, co.startAutoplay = function(t) {
          return co.autoplay ? this : (ro = oo = !1, w(t || o.autoplay), lr(), this)
        }, co.stopAutoplay = function() {
          return co.autoplay && (ro = oo = !0, lr()), this
        }, co.show = function(t) {
          var e;
          "object" != typeof t ? (e = t, t = {}) : e = t.index, e = ">" === e ? Ar + 1 : "<" === e ? Ar - 1 : "<<" === e ? 0 : ">>" === e ? Tr - 1 : e, e = isNaN(e) ? N(e, xr, !0) : e, e = "undefined" == typeof e ? No || 0 : e, co.activeIndex = No = x(e), jr = F(No), Or = U(No), Nr = k(No + (Xr ? -1 : 1)), Er = [No, jr, Or], Ar = zr ? e : No;
          var n = Math.abs(Wr - Ar),
            r = C(t.time, function() {
              return Math.min(Yr * (1 + (n - 1) / 12), 2 * Yr)
            }),
            i = t.overPos;
          t.slow && (r *= 10);
          var a = Fr;
          co.activeFrame = Fr = xr[No];
          var u = a === Fr && !t.user;
          pr(Rr, Fr.i !== xr[k(Ir)].i), dn(Er, "stage"), _n(zn ? [Ar] : [Ar, F(Ar), U(Ar)]), gr("go", !0), u || ar("show", {
            user: t.user,
            time: r
          }), ro = !0;
          var c = co.show.onEnd = function(e) {
            if (!c.ok) {
              if (c.ok = !0, e || rr(!0), u || ar("showend", {
                  user: t.user
                }), !e && Jr && Jr !== o.transition) return co.setOptions({
                transition: Jr
              }), void(Jr = !1);
              qe(), He(Er, "stage"), gr("go", !1), Wn(), mr(), cr(), lr()
            }
          };
          if (Vr) {
            var l = Fr[Qn],
              h = No !== Wr ? xr[Wr][Qn] : null;
            te(l, h, bo, {
              time: r,
              method: o.transition,
              onEnd: c
            }, Go)
          } else K(_o, {
            pos: -v(Ar, zo.w, o.margin, Ir),
            overPos: i,
            time: r,
            onEnd: c
          });
          if (An(), Lr) {
            Un();
            var d = $(No + s(Ar - Wr, -1, 1));
            qn({
              time: r,
              coo: d !== No && t.coo,
              guessIndex: "undefined" != typeof t.coo ? d : No,
              keep: u
            }), Hr && Hn(r)
          }
          return no = "undefined" != typeof Wr && Wr !== No, Wr = No, o.hash && no && !co.eq && A(Fr.id || No + 1), this
        }, co.requestFullScreen = function() {
          return Br && !co.fullScreen && (to = En.scrollTop(), eo = En.scrollLeft(), D(En), gr("x", !0), io = r.extend({}, zo), t.addClass(Xe).appendTo(Fn.addClass(ce)), Rn.addClass(ce), pr(Rr, !0, !0), co.fullScreen = !0, qr && Cn.request(po), co.resize(), He(Er, "stage"), qe(), ar("fullscreenenter")), this
        }, co.cancelFullScreen = function() {
          return qr && Cn.is() ? Cn.cancel(e) : hr(), this
        }, co.toggleFullScreen = function() {
          return co[(co.fullScreen ? "cancel" : "request") + "FullScreen"]()
        }, V(e, Cn.event, function() {
          !xr || Cn.is() || Rr || hr()
        }), co.resize = function(t) {
          if (!xr) return this;
          var e = arguments[1] || 0,
            n = arguments[2];
          ir(co.fullScreen ? {
            width: "100%",
            maxwidth: null,
            minwidth: null,
            height: "100%",
            maxheight: null,
            minheight: null
          } : B(t), [zo, n || co.fullScreen || o]);
          var r = zo.width,
            i = zo.height,
            a = zo.ratio,
            u = En.height() - (Lr ? To.height() : 0);
          return y(r) && (go.addClass(_e).css({
            width: r,
            minWidth: zo.minwidth || 0,
            maxWidth: zo.maxwidth || er
          }), r = zo.W = zo.w = go.width(), zo.nw = Lr && m(o.navwidth, r) || r, o.glimpse && (zo.w -= Math.round(2 * (m(o.glimpse, r) || 0))), _o.css({
            width: zo.w,
            marginLeft: (zo.W - zo.w) / 2
          }), i = m(i, u), i = i || a && r / a, i && (r = Math.round(r), i = zo.h = Math.round(s(i, m(zo.minheight, u), m(zo.maxheight, u))), wo.stop().animate({
            width: r,
            height: i
          }, e, function() {
            go.removeClass(_e)
          }), rr(), Lr && (To.stop().animate({
            width: zo.nw
          }, e), qn({
            guessIndex: No,
            time: e,
            keep: !0
          }), Hr && kn.nav && Hn(e)), Kr = n || !0, $r())), Uo = wo.offset().left, this
        }, co.setOptions = function(t) {
          return r.extend(o, t), Cr(), this
        }, co.shuffle = function() {
          return xr && L(xr) && Cr(), this
        }, co.destroy = function() {
          return co.cancelFullScreen(), co.stopAutoplay(), xr = co.data = null, c(), Er = [], nr(Qn), Cr.ok = !1, this
        }, co.playVideo = function() {
          var t = Fr,
            e = t.video,
            n = No;
          return "object" == typeof e && t.videoReady && (qr && co.fullScreen && co.cancelFullScreen(), I(function() {
            return !Cn.is() || n !== No
          }, function() {
            n === No && (t.$video = t.$video || r(r.Fotorama.jst.video(e)), t.$video.appendTo(t[Qn]), go.addClass(pe), Rr = t.$video, f(), $o.blur(), Eo.blur(), ar("loadvideo"))
          })), this
        }, co.stopVideo = function() {
          return pr(Rr, !0, !0), this
        }, wo.on("mousemove", mr), Lo = re(_o, {
          onStart: sr,
          onMove: function(t, e) {
            dr(wo, e.edge)
          },
          onTouchEnd: ur,
          onEnd: function(t) {
            dr(wo);
            var e = (Ln && !so || t.touch) && o.arrows && "always" !== o.arrows;
            if (t.moved || e && t.pos !== t.newPos && !t.control) {
              var n = g(t.newPos, zo.w, o.margin, Ir);
              co.show({
                index: n,
                time: Vr ? Yr : t.time,
                overPos: t.overPos,
                user: !0
              })
            } else t.aborted || t.control || vr(t.startEvent, e)
          },
          timeLow: 1,
          timeHigh: 1,
          friction: 2,
          select: "." + Je + ", ." + Je + " *",
          $wrap: wo
        }), Do = re(So, {
          onStart: sr,
          onMove: function(t, e) {
            dr(To, e.edge)
          },
          onTouchEnd: ur,
          onEnd: function(t) {
            function e() {
              qn.l = t.newPos, cr(), lr(), bn(t.newPos, !0)
            }
            if (t.moved) t.pos !== t.newPos ? (ro = !0, K(So, {
              time: t.time,
              pos: t.newPos,
              overPos: t.overPos,
              onEnd: e
            }), bn(t.newPos), Qr && dr(To, O(t.newPos, Do.min, Do.max))) : e();
            else {
              var n = t.$target.closest("." + Pe, So)[0];
              n && wr.call(n, t.startEvent)
            }
          },
          timeLow: .5,
          timeHigh: 2,
          friction: 5,
          $wrap: To
        }), Ho = oe(wo, {
          shift: !0,
          onEnd: function(t, e) {
            sr(), ur(), co.show({
              index: e,
              slow: t.altKey
            })
          }
        }), Bo = oe(To, {
          onEnd: function(t, e) {
            sr(), ur();
            var n = b(So) + .25 * e;
            So.css(l(s(n, Do.min, Do.max))), Qr && dr(To, O(n, Do.min, Do.max)), Bo.prevent = {
              "<": n >= Do.max,
              ">": n <= Do.min
            }, clearTimeout(Bo.t), Bo.t = setTimeout(function() {
              qn.l = n, bn(n, !0)
            }, Dn), bn(n)
          }
        }), go.hover(function() {
          setTimeout(function() {
            ao || fr(!(so = !0))
          }, 0)
        }, function() {
          so && fr(!(so = !1))
        }), P($o, function(t) {
          Q(t), _r.call(this, t)
        }, {
          onStart: function() {
            sr(), Lo.control = !0
          },
          onTouchEnd: ur
        }), $o.each(function() {
          Y(this, function(t) {
            _r.call(this, t)
          }), br(this)
        }), Y(Io, co.toggleFullScreen), br(Io), r.each("load push pop shift unshift reverse sort splice".split(" "), function(t, e) {
          co[e] = function() {
            return xr = xr || [], "load" !== e ? Array.prototype[e].apply(xr, arguments) : arguments[0] && "object" == typeof arguments[0] && arguments[0].length && (xr = H(arguments[0])), Cr(), co
          }
        }), Cr()
      }, r.fn.fotorama = function(e) {
        return this.each(function() {
          var n = this,
            o = r(this),
            i = o.data(),
            a = i.fotorama;
          a ? a.setOptions(e, !0) : I(function() {
            return !F(n)
          }, function() {
            i.urtext = o.html(), new r.Fotorama(o, r.extend({}, rr, t.fotoramaDefaults, e, i))
          })
        })
      }, r.Fotorama.instances = [], r.Fotorama.cache = {}, r.Fotorama.measures = {}, r = r || {}, r.Fotorama = r.Fotorama || {}, r.Fotorama.jst = r.Fotorama.jst || {}, r.Fotorama.jst.style = function(t) {
        {
          var e, n = "";
          _n.escape
        }
        return n += ".fotorama" + (null == (e = t.s) ? "" : e) + " .fotorama__nav--thumbs .fotorama__nav__frame{\npadding:" + (null == (e = t.m) ? "" : e) + "px;\nheight:" + (null == (e = t.h) ? "" : e) + "px}\n.fotorama" + (null == (e = t.s) ? "" : e) + " .fotorama__thumb-border{\nheight:" + (null == (e = t.h - t.b * (t.q ? 0 : 2)) ? "" : e) + "px;\nborder-width:" + (null == (e = t.b) ? "" : e) + "px;\nmargin-top:" + (null == (e = t.m) ? "" : e) + "px}"
      }, r.Fotorama.jst.video = function(t) {
        function e() {
          n += r.call(arguments, "")
        }
        var n = "",
          r = (_n.escape, Array.prototype.join);
        return n += '<div class="fotorama__video"><iframe src="', e(("youtube" == t.type ? t.p + "youtube.com/embed/" + t.id + "?autoplay=1" : "vimeo" == t.type ? t.p + "player.vimeo.com/video/" + t.id + "?autoplay=1&badge=0" : t.id) + (t.s && "custom" != t.type ? "&" + t.s : "")), n += '" frameborder="0" allowfullscreen></iframe></div>\n'
      }, r(function() {
        r("." + ue + ':not([data-auto="false"])').fotorama()
      })
    }(window, document, location, "undefined" != typeof jQuery && jQuery)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  ! function(t, e) {
    "object" == typeof exports ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.Spinner = e()
  }(this, function() {
    "use strict";

    function t(t, e) {
      var n, r = document.createElement(t || "div");
      for (n in e) r[n] = e[n];
      return r
    }

    function e(t) {
      for (var e = 1, n = arguments.length; n > e; e++) t.appendChild(arguments[e]);
      return t
    }

    function n(t, e, n, r) {
      var o = ["opacity", e, ~~(100 * t), n, r].join("-"),
        i = .01 + n / r * 100,
        a = Math.max(1 - (1 - t) / e * (100 - i), t),
        s = l.substring(0, l.indexOf("Animation")).toLowerCase(),
        u = s && "-" + s + "-" || "";
      return d[o] || (p.insertRule("@" + u + "keyframes " + o + "{0%{opacity:" + a + "}" + i + "%{opacity:" + t + "}" + (i + .01) + "%{opacity:1}" + (i + e) % 100 + "%{opacity:" + t + "}100%{opacity:" + a + "}}", p.cssRules.length), d[o] = 1), o
    }

    function r(t, e) {
      var n, r, o = t.style;
      for (e = e.charAt(0).toUpperCase() + e.slice(1), r = 0; r < h.length; r++)
        if (n = h[r] + e, void 0 !== o[n]) return n;
      return void 0 !== o[e] ? e : void 0
    }

    function o(t, e) {
      for (var n in e) t.style[r(t, n) || n] = e[n];
      return t
    }

    function i(t) {
      for (var e = 1; e < arguments.length; e++) {
        var n = arguments[e];
        for (var r in n) void 0 === t[r] && (t[r] = n[r])
      }
      return t
    }

    function a(t) {
      for (var e = {
          x: t.offsetLeft,
          y: t.offsetTop
        }; t = t.offsetParent;) e.x += t.offsetLeft, e.y += t.offsetTop;
      return e
    }

    function s(t, e) {
      return "string" == typeof t ? t : t[e % t.length]
    }

    function u(t) {
      return "undefined" == typeof this ? new u(t) : void(this.opts = i(t || {}, u.defaults, f))
    }

    function c() {
      function n(e, n) {
        return t("<" + e + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', n)
      }
      p.addRule(".spin-vml", "behavior:url(#default#VML)"), u.prototype.lines = function(t, r) {
        function i() {
          return o(n("group", {
            coordsize: l + " " + l,
            coordorigin: -c + " " + -c
          }), {
            width: l,
            height: l
          })
        }

        function a(t, a, u) {
          e(d, e(o(i(), {
            rotation: 360 / r.lines * t + "deg",
            left: ~~a
          }), e(o(n("roundrect", {
            arcsize: r.corners
          }), {
            width: c,
            height: r.width,
            left: r.radius,
            top: -r.width >> 1,
            filter: u
          }), n("fill", {
            color: s(r.color, t),
            opacity: r.opacity
          }), n("stroke", {
            opacity: 0
          }))))
        }
        var u, c = r.length + r.width,
          l = 2 * c,
          h = 2 * -(r.width + r.length) + "px",
          d = o(i(), {
            position: "absolute",
            top: h,
            left: h
          });
        if (r.shadow)
          for (u = 1; u <= r.lines; u++) a(u, -2, "progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");
        for (u = 1; u <= r.lines; u++) a(u);
        return e(t, d)
      }, u.prototype.opacity = function(t, e, n, r) {
        var o = t.firstChild;
        r = r.shadow && r.lines || 0, o && e + r < o.childNodes.length && (o = o.childNodes[e + r], o = o && o.firstChild, o = o && o.firstChild, o && (o.opacity = n))
      }
    }
    var l, h = ["webkit", "Moz", "ms", "O"],
      d = {},
      p = function() {
        var n = t("style", {
          type: "text/css"
        });
        return e(document.getElementsByTagName("head")[0], n), n.sheet || n.styleSheet
      }(),
      f = {
        lines: 12,
        length: 7,
        width: 5,
        radius: 10,
        rotate: 0,
        corners: 1,
        color: "#000",
        direction: 1,
        speed: 1,
        trail: 100,
        opacity: .25,
        fps: 20,
        zIndex: 2e9,
        className: "spinner",
        top: "auto",
        left: "auto",
        position: "relative"
      };
    u.defaults = {}, i(u.prototype, {
      spin: function(e) {
        this.stop();
        var n, r, i = this,
          s = i.opts,
          u = i.el = o(t(0, {
            className: s.className
          }), {
            position: s.position,
            width: 0,
            zIndex: s.zIndex
          }),
          c = s.radius + s.length + s.width;
        if (e && (e.insertBefore(u, e.firstChild || null), r = a(e), n = a(u), o(u, {
            left: ("auto" == s.left ? r.x - n.x + (e.offsetWidth >> 1) : parseInt(s.left, 10) + c) + "px",
            top: ("auto" == s.top ? r.y - n.y + (e.offsetHeight >> 1) : parseInt(s.top, 10) + c) + "px"
          })), u.setAttribute("role", "progressbar"), i.lines(u, i.opts), !l) {
          var h, d = 0,
            p = (s.lines - 1) * (1 - s.direction) / 2,
            f = s.fps,
            m = f / s.speed,
            y = (1 - s.opacity) / (m * s.trail / 100),
            v = m / s.lines;
          ! function g() {
            d++;
            for (var t = 0; t < s.lines; t++) h = Math.max(1 - (d + (s.lines - t) * v) % m * y, s.opacity), i.opacity(u, t * s.direction + p, h, s);
            i.timeout = i.el && setTimeout(g, ~~(1e3 / f))
          }()
        }
        return i
      },
      stop: function() {
        var t = this.el;
        return t && (clearTimeout(this.timeout), t.parentNode && t.parentNode.removeChild(t), this.el = void 0), this
      },
      lines: function(r, i) {
        function a(e, n) {
          return o(t(), {
            position: "absolute",
            width: i.length + i.width + "px",
            height: i.width + "px",
            background: e,
            boxShadow: n,
            transformOrigin: "left",
            transform: "rotate(" + ~~(360 / i.lines * c + i.rotate) + "deg) translate(" + i.radius + "px,0)",
            borderRadius: (i.corners * i.width >> 1) + "px"
          })
        }
        for (var u, c = 0, h = (i.lines - 1) * (1 - i.direction) / 2; c < i.lines; c++) u = o(t(), {
          position: "absolute",
          top: 1 + ~(i.width / 2) + "px",
          transform: i.hwaccel ? "translate3d(0,0,0)" : "",
          opacity: i.opacity,
          animation: l && n(i.opacity, i.trail, h + c * i.direction, i.lines) + " " + 1 / i.speed + "s linear infinite"
        }), i.shadow && e(u, o(a("#000", "0 0 4px #000"), {
          top: "2px"
        })), e(r, e(u, a(s(i.color, c), "0 0 1px rgba(0,0,0,.1)")));
        return r
      },
      opacity: function(t, e, n) {
        e < t.childNodes.length && (t.childNodes[e].style.opacity = n)
      }
    });
    var m = o(t("group"), {
      behavior: "url(#default#VML)"
    });
    return !r(m, "transform") && m.adj ? c() : l = r(m, "animation"), u
  })
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  ! function(t) {
    t.idleTimer = function(e, n) {
      var r;
      "object" == typeof e ? (r = e, e = null) : "number" == typeof e && (r = {
        timeout: e
      }, e = null), n = n || document, r = t.extend({
        idle: !1,
        timeout: 3e4,
        events: "mousemove keydown wheel DOMMouseScroll mousewheel mousedown touchstart touchmove MSPointerDown MSPointerMove"
      }, r);
      var o = t(n),
        i = o.data("idleTimerObj") || {},
        a = function(e) {
          var r = t.data(n, "idleTimerObj") || {};
          r.idle = !r.idle, r.olddate = +new Date;
          var o = t.Event((r.idle ? "idle" : "active") + ".idleTimer");
          t(n).trigger(o, [n, t.extend({}, r), e])
        },
        s = function(e) {
          var r = t.data(n, "idleTimerObj") || {};
          if (null == r.remaining) {
            if ("mousemove" === e.type) {
              if (e.pageX === r.pageX && e.pageY === r.pageY) return;
              if ("undefined" == typeof e.pageX && "undefined" == typeof e.pageY) return;
              var o = +new Date - r.olddate;
              if (200 > o) return
            }
            clearTimeout(r.tId), r.idle && a(e), r.lastActive = +new Date, r.pageX = e.pageX, r.pageY = e.pageY, r.tId = setTimeout(a, r.timeout)
          }
        },
        u = function() {
          var e = t.data(n, "idleTimerObj") || {};
          e.idle = e.idleBackup, e.olddate = +new Date, e.lastActive = e.olddate, e.remaining = null, clearTimeout(e.tId), e.idle || (e.tId = setTimeout(a, e.timeout))
        },
        c = function() {
          var e = t.data(n, "idleTimerObj") || {};
          null == e.remaining && (e.remaining = e.timeout - (+new Date - e.olddate), clearTimeout(e.tId))
        },
        l = function() {
          var e = t.data(n, "idleTimerObj") || {};
          null != e.remaining && (e.idle || (e.tId = setTimeout(a, e.remaining)), e.remaining = null)
        },
        h = function() {
          var e = t.data(n, "idleTimerObj") || {};
          clearTimeout(e.tId), o.removeData("idleTimerObj"), o.off("._idleTimer")
        },
        d = function() {
          var e = t.data(n, "idleTimerObj") || {};
          if (e.idle) return 0;
          if (null != e.remaining) return e.remaining;
          var r = e.timeout - (+new Date - e.lastActive);
          return 0 > r && (r = 0), r
        };
      if (null === e && "undefined" != typeof i.idle) return u(), o;
      if (null === e);
      else {
        if (null !== e && "undefined" == typeof i.idle) return !1;
        if ("destroy" === e) return h(), o;
        if ("pause" === e) return c(), o;
        if ("resume" === e) return l(), o;
        if ("reset" === e) return u(), o;
        if ("getRemainingTime" === e) return d();
        if ("getElapsedTime" === e) return +new Date - i.olddate;
        if ("getLastActiveTime" === e) return i.lastActive;
        if ("isIdle" === e) return i.idle
      }
      return o.on(t.trim((r.events + " ").split(" ").join("._idleTimer ")), function(t) {
        s(t)
      }), i = t.extend({}, {
        olddate: +new Date,
        lastActive: +new Date,
        idle: r.idle,
        idleBackup: r.idle,
        timeout: r.timeout,
        remaining: null,
        tId: null,
        pageX: null,
        pageY: null
      }), i.idle || (i.tId = setTimeout(a, i.timeout)), t.data(n, "idleTimerObj", i), o
    }, t.fn.idleTimer = function(e) {
      return this[0] ? t.idleTimer(e, this[0]) : this
    }
  }(jQuery)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function(t) {
    "use strict";
    t.Transitions = {
      _names: {
        transition: "transitionend",
        OTransition: "oTransitionEnd",
        WebkitTransition: "webkitTransitionEnd",
        MozTransition: "transitionend"
      },
      _parseTimes: function(t) {
        for (var e, n = t.split(/,\s*/), r = 0; r < n.length; r++) e = n[r], n[r] = parseFloat(e), e.match(/\ds/) && (n[r] = 1e3 * n[r]);
        return n
      },
      getEvent: function() {
        var t = !1;
        for (var e in this._names)
          if ("undefined" != typeof document.body.style[e]) {
            t = this._names[e];
            break
          }
        return this.getEvent = function() {
          return t
        }, t
      },
      animFrame: function(t) {
        var e = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;
        return this.animFrame = e ? function(t) {
          return e.call(window, t)
        } : function(t) {
          return setTimeout(t, 10)
        }, this.animFrame(t)
      },
      isSupported: function() {
        return this.getEvent() !== !1
      }
    }, t.extend(t.fn, {
      afterTransition: function(e, n) {
        if ("undefined" == typeof n && (n = e, e = 1), !t.Transitions.isSupported()) {
          for (var r = 0; r < this.length; r++) n.call(this[r], {
            type: "aftertransition",
            elapsedTime: 0,
            propertyName: "",
            currentTarget: this[r]
          });
          return this
        }
        for (var r = 0; r < this.length; r++) {
          var o = t(this[r]),
            i = o.css("transition-property").split(/,\s*/),
            a = o.css("transition-duration"),
            s = o.css("transition-delay");
          a = t.Transitions._parseTimes(a), s = t.Transitions._parseTimes(s);
          for (var u, c, l, h, d, p = 0; p < i.length; p++) u = i[p], c = a[1 == a.length ? 0 : p], l = s[1 == s.length ? 0 : p], h = l + c * e, d = c * e / 1e3,
            function(e, r, o, i) {
              setTimeout(function() {
                t.Transitions.animFrame(function() {
                  n.call(e[0], {
                    type: "aftertransition",
                    elapsedTime: i,
                    propertyName: r,
                    currentTarget: e[0]
                  })
                })
              }, o)
            }(o, u, h, d)
        }
        return this
      },
      transitionEnd: function(e) {
        for (var n = 0; n < this.length; n++) this[n].addEventListener(t.Transitions.getEvent(), function(t) {
          e.call(this, t)
        });
        return this
      }
    })
  }).call(this, jQuery)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  ! function(t) {
    "use strict";

    function e(t) {
      return new RegExp("(^|\\s+)" + t + "(\\s+|$)")
    }

    function n(t, e) {
      var n = r(t, e) ? i : o;
      n(t, e)
    }
    var r, o, i;
    "classList" in document.documentElement ? (r = function(t, e) {
      return t.classList.contains(e)
    }, o = function(t, e) {
      t.classList.add(e)
    }, i = function(t, e) {
      t.classList.remove(e)
    }) : (r = function(t, n) {
      return e(n).test(t.className)
    }, o = function(t, e) {
      r(t, e) || (t.className = t.className + " " + e)
    }, i = function(t, n) {
      t.className = t.className.replace(e(n), " ")
    });
    var a = {
      hasClass: r,
      addClass: o,
      removeClass: i,
      toggleClass: n,
      has: r,
      add: o,
      remove: i,
      toggle: n
    };
    "function" == typeof define && define.amd ? define(a) : t.classie = a
  }(window)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  ! function(t) {
    "use strict";

    function e(t, e) {
      for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      return t
    }

    function n(t, n) {
      this.el = t, this.options = e({}, this.options), e(this.options, n), this._init()
    }
    var r = {
        WebkitTransition: "webkitTransitionEnd",
        MozTransition: "transitionend",
        OTransition: "oTransitionEnd",
        msTransition: "MSTransitionEnd",
        transition: "transitionend"
      },
      o = r[Modernizr.prefixed("transition")],
      i = {
        transitions: Modernizr.csstransitions
      };
    n.prototype.options = {
      onSubmit: function() {
        return !1
      }
    }, n.prototype._init = function() {
      this.current = 0, this.questions = [].slice.call(this.el.querySelectorAll("ol.questions > li")), this.questionsCount = this.questions.length, classie.addClass(this.questions[0], "current"), this.ctrlNext = this.el.querySelector("button.next"), this.progress = this.el.querySelector("div.progress"), this.questionStatus = this.el.querySelector("span.number"), this.currentNum = this.questionStatus.querySelector("span.number-current"), this.currentNum.innerHTML = Number(this.current + 1), this.totalQuestionNum = this.questionStatus.querySelector("span.number-total"), this.totalQuestionNum.innerHTML = this.questionsCount, this.error = this.el.querySelector("span.error-message"), this.supportsHTML5Forms = "function" == typeof document.createElement("input").checkValidity, this._initEvents()
    }, n.prototype._initEvents = function() {
      var t = this,
        e = this.questions[this.current].querySelector("input"),
        n = function() {
          e.removeEventListener("focus", n), classie.addClass(t.ctrlNext, "show")
        };
      e.addEventListener("focus", n), this.ctrlNext.addEventListener("click", function(e) {
        e.preventDefault(), t._nextQuestion()
      }), document.addEventListener("keydown", function(e) {
        var n = e.keyCode || e.which;
        13 === n && (e.preventDefault(), t._nextQuestion())
      }), this.el.addEventListener("keydown", function(t) {
        var e = t.keyCode || t.which;
        9 === e && t.preventDefault()
      })
    }, n.prototype._nextQuestion = function() {
      if (!this._validate()) return !1;
      if (this.supportsHTML5Forms) {
        var t = this.questions[this.current].querySelector("input");
        if (t.setCustomValidity(""), !t.checkValidity()) return t.setCustomValidity("Whoops, that's not an email address!"), this._showError(t.validationMessage), !1
      }
      this.current === this.questionsCount - 1 && (this.isFilled = !0), this._clearError();
      var e = this.questions[this.current];
      if (++this.current, this._progress(), !this.isFilled) {
        this._updateQuestionNumber(), classie.addClass(this.el, "show-next");
        var n = this.questions[this.current];
        classie.removeClass(e, "current"), classie.addClass(n, "current")
      }
      var r = this,
        a = function() {
          i.transitions && this.removeEventListener(o, a), r.isFilled ? r._submit() : (classie.removeClass(r.el, "show-next"), r.currentNum.innerHTML = r.nextQuestionNum.innerHTML, r.questionStatus.removeChild(r.nextQuestionNum), n.querySelector("input").focus())
        };
      i.transitions ? this.progress.addEventListener(o, a) : a()
    }, n.prototype._progress = function() {
      this.progress.style.width = this.current * (100 / this.questionsCount) + "%"
    }, n.prototype._updateQuestionNumber = function() {
      this.nextQuestionNum = document.createElement("span"), this.nextQuestionNum.className = "number-next", this.nextQuestionNum.innerHTML = Number(this.current + 1), this.questionStatus.appendChild(this.nextQuestionNum)
    }, n.prototype._submit = function() {
      this.options.onSubmit(this.el)
    }, n.prototype._validate = function() {
      var t = this.questions[this.current].querySelector("input"),
        e = t.value,
        n = t.getAttribute("data-error-empty"),
        r = t.getAttribute("data-error-email"),
        o = "email" === t.getAttribute("name");
      if ("" === e) return this._showError(n), !1;
      var i = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      return o !== !0 || i.test(e.trim()) ? !0 : (this._showError(r), !1)
    }, n.prototype._showError = function(t) {
      var e = "";
      switch (t) {
        case "EMPTYSTR":
          e = "Please fill the field before continuing";
          break;
        case "INVALIDEMAIL":
          e = "Please fill a valid email address";
          break;
        default:
          e = t
      }
      this.error.innerHTML = e, classie.addClass(this.error, "show")
    }, n.prototype._clearError = function() {
      classie.removeClass(this.error, "show")
    }, t.stepsForm = n
  }(window)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    this.BounceRequest = function() {
      function t() {}
      return t.prototype.trackLead = function(t, e) {
        return "undefined" != typeof BounceTracker && null !== BounceTracker ? (new BounceTracker).conversion(t.id, this.getModalType(e)) : void 0
      }, t.prototype.trackSubscription = function(t, e) {
        return "undefined" != typeof BounceTracker && null !== BounceTracker ? (new BounceTracker).subscription(this.getModalType(e)) : void 0
      }, t.prototype.getModalType = function(t) {
        var e, n, r;
        for (n = 0, r = t.length; r > n; n++)
          if (e = t[n], "modal_type" === e.name) return e.value
      }, t.prototype.extendData = function(t) {
        var e;
        return e = this.gatherInfo(), e.lp_form = this.getModalType(t), t.push({
          name: "additional_info_json",
          value: JSON.stringify(e)
        }), t
      }, t.prototype.gatherInfo = function() {
        var t;
        return t = {
          origin: window.document.location.href,
          user_agent: window.navigator.userAgent,
          cookies: this.getCookie(),
          referer: this.getReferer(),
          lp_form: "ouibounce",
          lp_skill: window.bounceModalSettings.skill
        }, null != window.settings && (t.lp_variant = window.settings.locale, t.lp_iteration = window.settings.iteration, t.lp_submit_time = (new Date - window.settings.loaded) / 1e3), t
      }, t.prototype.getReferer = function() {
        return this.getCookie("referer") || window.document.referrer
      }, t.prototype.getCookie = function(t) {
        var e, n, r, o, i, a, s, u;
        if (null == t && (t = null), n = window.document.cookie, null === t) return n;
        for (s = n.split(/;\s*/), i = 0, a = s.length; a > i; i++)
          if (e = s[i], u = e.split("="), r = u[0], o = u[1], r === t) return decodeURIComponent(o)
      }, t
    }()
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    this.BounceForm = function() {
      function t(t, e, n) {
        this.$el = t, this.modal = e, this.dataUrl = n, this.initPlaceholders(), this.renderCustomSelects(), this.$el.on("submit", this.sendLead.bind(this)).on("remove_errors", this.removeAllErrors.bind(this)).on("submitted", this.showThankYou.bind(this)), this.$inputs().on("keypress", this.removeErrorOnChange.bind(this)).on("change", this.removeErrorOnChange.bind(this)), this.$el.find("a.button").on("click", this.sendLead.bind(this))
      }
      var e, n;
      return e = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/, n = 4e3, t.prototype.initPlaceholders = function() {
        return this.$inputs().placeholder()
      }, t.prototype.renderCustomSelects = function() {
        var t;
        return t = this.$el.find(".js-select"), t.each(function(t, e) {
          return new Select($(e))
        })
      }, t.prototype.sendLead = function(t) {
        return t.preventDefault(), !this.validateForm() && "minimal" !== this.modal.state() || this.$el.hasClass("is-disabled") ? void 0 : this.performLeadRequest()
      }, t.prototype.performLeadRequest = function() {
        var t = this;
        return this.showLoading(), setTimeout(function() {
          return t.sendRequest()
        }, n)
      }, t.prototype.sendRequest = function() {
        var t, e = this;
        return t = this.$el.filter(":visible").serializeArray(), "tshirt" === this.modal.state() ? new BounceSubscribeRequest(t, this.dataUrl, function() {
          return e.hideLoading(), e.clearInputs(), e.$el.trigger("submitted")
        }) : new BounceLeadRequest(t, this.dataUrl, function() {
          return e.hideLoading(), e.clearInputs(), e.$el.trigger("submitted")
        })
      }, t.prototype.showLoading = function() {
        return this.$el.css({
          position: "relative"
        }).addClass("is-disabled")
      }, t.prototype.hideLoading = function() {
        return this.$el.removeClass("is-disabled")
      }, t.prototype.showThankYou = function() {
        var t, e, n, r;
        return "tshirt" === this.modal.type() ? null != (t = this.modal) ? t.showTShirtThankYou() : void 0 : "minimal" === this.modal.type() ? null != (e = this.modal) ? e.showMinimalThankYou() : void 0 : "rich" === this.modal.type() ? null != (n = this.modal) ? n.showRichThankYou() : void 0 : null != (r = this.modal) ? r.showThankYou() : void 0
      }, t.prototype.validateForm = function() {
        var t, e = this;
        return t = !0, this.$inputs().each(function(n, r) {
          var o;
          return o = $(r), e.validateInput(o) ? e.removeErrorFromInput(o) : (t = !1, e.addErrorToInput(o))
        }), t
      }, t.prototype.validateInput = function(t) {
        var n;
        return n = t.val(), this.isFieldRequired(t) && 0 === n.trim().length ? !1 : this.isEmailField(t) ? e.test(n.trim()) : !0
      }, t.prototype.clearInputs = function() {
        return this.$inputs().val("")
      }, t.prototype.addErrorToInput = function(t) {
        return t.parent().addClass("is-invalid")
      }, t.prototype.removeAllErrors = function() {
        var t = this;
        return this.$inputs().each(function(e, n) {
          return t.removeErrorFromInput($(n))
        })
      }, t.prototype.removeErrorFromInput = function(t) {
        return t.parent().removeClass("is-invalid")
      }, t.prototype.removeErrorOnChange = function(t) {
        var e;
        return e = $(t.currentTarget), this.removeErrorFromInput(e)
      }, t.prototype.isFieldRequired = function(t) {
        return t.hasClass("required")
      }, t.prototype.isEmailField = function(t) {
        return "email" === t.attr("name")
      }, t.prototype.$inputs = function() {
        return this.$el.find("[name]").filter(":visible").not("[type=hidden]")
      }, t
    }()
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t = {}.hasOwnProperty,
      e = function(e, n) {
        function r() {
          this.constructor = e
        }
        for (var o in n) t.call(n, o) && (e[o] = n[o]);
        return r.prototype = n.prototype, e.prototype = new r, e.__super__ = n.prototype, e
      };
    this.BounceLeadRequest = function(t) {
      function n(t, e, n) {
        var r = this;
        $.ajax({
          url: e,
          type: "POST",
          dataType: "json",
          data: this.extendData(t),
          complete: function() {
            return "function" == typeof n ? n() : void 0
          }
        }).done(function(e) {
          return r.trackLead(e, t)
        })
      }
      return e(n, t), n
    }(BounceRequest)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t = {}.hasOwnProperty,
      e = function(e, n) {
        function r() {
          this.constructor = e
        }
        for (var o in n) t.call(n, o) && (e[o] = n[o]);
        return r.prototype = n.prototype, e.prototype = new r, e.__super__ = n.prototype, e
      };
    this.BounceSubscribeRequest = function(t) {
      function n(t, e, n) {
        var r = this;
        $.ajax({
          url: e,
          type: "POST",
          dataType: "json",
          data: this.extendData(t),
          complete: function() {
            return "function" == typeof n ? n() : void 0
          }
        }).done(function(e) {
          return r.trackSubscription(e, t)
        })
      }
      return e(n, t), n
    }(BounceRequest)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    this.BounceModal = function() {
      function t(t) {
        new BounceForm(this.$form(), this, t), this.$form().on("submitted", this.processFormSubmit.bind(this)), this.$modal().on("click", function(t) {
          return t.stopPropagation()
        })
      }
      var e, n;
      return e = "js-bounce_modal", n = 60, t.prototype.showSimpleFormModal = function() {
        return this.isSubmitted() || (this.$skypeFormContent().hide(), this.$fullFormContent().hide(), this.$tshirtFormContent().hide(), this.$richFormContent().hide(), this.$minimalFormContent().hide(), this.$simpleFormContent().show(), this.setState("simple"), this.setType("simple")), this.showModal()
      }, t.prototype.showSkypeFormModal = function() {
        return this.isSubmitted() || (this.$simpleFormContent().hide(), this.$fullFormContent().hide(), this.$tshirtFormContent().hide(), this.$richFormContent().hide(), this.$minimalFormContent().hide(), this.$skypeFormContent().show(), this.setState("skype"), this.setType("skype")), this.showModal()
      }, t.prototype.showRichFormModal = function() {
        return this.isSubmitted() || (this.$simpleFormContent().hide(), this.$fullFormContent().hide(), this.$tshirtFormContent().hide(), this.$skypeFormContent().hide(), this.$minimalFormContent().hide(), this.$richFormContent().show(), this.setState("skype"), this.setType("rich")), this.showModal()
      }, t.prototype.showTShirtFormModal = function() {
        return this.isSubmitted() || (this.$skypeFormContent().hide(), this.$fullFormContent().hide(), this.$simpleFormContent().hide(), this.$richFormContent().hide(), this.$minimalFormContent().hide(), this.$tshirtFormContent().show(), this.setState("tshirt"), this.setType("tshirt")), this.showModal()
      }, t.prototype.showFullFormModal = function() {
        return this.isSubmitted() || (this.$simpleFormContent().hide(), this.$skypeFormContent().hide(), this.$tshirtFormContent().hide(), this.$richFormContent().hide(), this.$minimalFormContent().hide(), this.$fullFormContent().show(), this.setState("full"), this.setType("full")), this.showModal()
      }, t.prototype.showMinimalModal = function() {
        var t;
        return this.isSubmitted() || (this.$simpleFormContent().hide(), this.$skypeFormContent().hide(), this.$richFormContent().hide(), this.$tshirtFormContent().hide(), this.$fullFormContent().hide(), this.$minimalFormContent().show(), this.setState("minimal"), this.setType("minimal")), null != window.stepsForm ? (t = $("#bounce_modal-steps_form"), new window.stepsForm(t.get(0), {
          onSubmit: function() {
            return t.submit(), t.find("input").blur()
          }
        }), this.showModal(), t.find("input").first().focus()) : void 0
      }, t.prototype.showThankYou = function() {
        return this.$modalContent().hide(), this.$thanksMessageContent().fadeIn(), this.showModal()
      }, t.prototype.showMinimalThankYou = function() {
        var t, e;
        return t = $("#bounce_modal-steps_form"), t.find(".bounce_modal-steps_form_inner").hide(), e = "Thank you!<br/><small>A member of our team will be in touch with you shortly.</small>", t.find(".final-message").html(e).addClass("show")
      }, t.prototype.showRichThankYou = function() {
        var t;
        return t = $("#bounce_modal-rich_form"), t.empty(), t.siblings(".bounce_modals_rich-title").text("Thank you!"), t.siblings(".bounce_modals_rich-subtitle").text("A member of our team will be in touch with you shortly.")
      }, t.prototype.showTShirtThankYou = function() {
        return this.$modalContent().hide(), this.$tShirtThanksMessageContent().fadeIn(), this.showModal()
      }, t.prototype.showModal = function() {
        return this.$modalWrap().show(), this.$overlay().show(), this.setFixedScroll(), this.$modal().addClass("bounce_animate-show").afterTransition(this.focusField.bind(this)), this.$overlay().addClass("bounce_animate-show"), this.replace(!0), this.bindCloseEvents(), this.bindResizeEvents()
      }, t.prototype.setFixedScroll = function() {
        var t, e, n, r, o;
        return t = $("html"), o = t.scrollTop(), r = this.$body().outerWidth(!0), this.$body().css({
          overflowY: "hidden"
        }), n = this.$body().outerWidth(!0), e = n - r, this.$pageWrap().css({
          marginRight: e
        }), this.$fixedBlocks().each(function(t, n) {
          var r, o;
          return r = $(n), o = r.attr("style"), o += "margin-right: " + e + "px !important;", r.attr("style", o)
        }), t.scrollTop(o)
      }, t.prototype.removeFixedScroll = function() {
        return this.$body().css({
          overflowY: "auto"
        }), this.$pageWrap().css({
          marginRight: 0
        }), this.$fixedBlocks().each(function(t, e) {
          return e.style.marginRight = ""
        })
      }, t.prototype.hideModal = function() {
        var t = this;
        return this.unbindResizeEvents(), this.unbindCloseEvents(), this.$form().trigger("remove_errors"), this.$overlay().removeClass("bounce_animate-show"), this.$modal().removeClass("bounce_animate-show").afterTransition(function() {
          return t.$overlay().hide(), t.$modalWrap().hide(), t.removeFixedScroll()
        })
      }, t.prototype.processFormSubmit = function() {
        return this.replace(!0), this.setAsSubmitted()
      }, t.prototype.bindCloseEvents = function() {
        var t = this;
        return this.$body().on("keyup.hide_modal", function(e) {
          return 27 === e.keyCode ? t.hideModal() : void 0
        }).on("click.hide_modal", function(n) {
          var r, o, i;
          return r = $(n.target), i = r.parents("." + e).length, o = r.hasClass(e), i || o ? void 0 : t.hideModal()
        }), this.$modal().find(".js-close_modal").on("click", this.hideModal.bind(this))
      }, t.prototype.unbindCloseEvents = function() {
        return this.$body().off(".hide_modal")
      }, t.prototype.bindResizeEvents = function() {
        return this.$window().on("resize.set_modal_position", this.replace.bind(this))
      }, t.prototype.unbindResizeEvents = function() {
        return this.$window().off(".set_modal_position")
      }, t.prototype.replace = function(t) {
        var e, r, o;
        return null == t && (t = !1), o = this.$window().height(), o !== this.lastWinHeight || t === !0 ? (r = this.$modal().outerHeight() + n, e = o > r ? parseInt((o - r) / 2, 10) : 0, this.$modalContainer().css({
          marginTop: e
        }), this.lastWinHeight = o) : void 0
      }, t.prototype.focusField = function() {
        return this.$modal().find("input:not([type]):visible").first().focus()
      }, t.prototype.$body = function() {
        return null != this._$body ? this._$body : this._$body = $("body")
      }, t.prototype.$pageWrap = function() {
        return null != this._$pageWrap ? this._$pageWrap : this._$pageWrap = $(".layout_layer")
      }, t.prototype.$window = function() {
        return null != this._$window ? this._$window : this._$window = $(window)
      }, t.prototype.$overlay = function() {
        return null != this._$overlay ? this._$overlay : this._$overlay = $(".bounce_modal-overlay")
      }, t.prototype.$modalWrap = function() {
        return null != this._$modalWrap ? this._$modalWrap : this._$modalWrap = $(".bounce_modal-wrap")
      }, t.prototype.$modalContainer = function() {
        return null != this._$modalContainer ? this._$modalContainer : this._$modalContainer = $(".bounce_modal-container")
      }, t.prototype.$modal = function() {
        return null != this._$modal ? this._$modal : this._$modal = $(".js-bounce_modal")
      }, t.prototype.$form = function() {
        return null != this._$form ? this._$form : this._$form = $(".js-bounce_modal_form")
      }, t.prototype.$thanksMessageContent = function() {
        return null != this._$thanksMessageContent ? this._$thanksMessageContent : this._$thanksMessageContent = $(".js-bounce_modal-thanks_message")
      }, t.prototype.$tShirtThanksMessageContent = function() {
        return null != this._$tShirtThanksMessageContent ? this._$tShirtThanksMessageContent : this._$tShirtThanksMessageContent = $(".js-bounce_modal-thanks_tshirt_message")
      }, t.prototype.$modalContent = function() {
        return null != this._$modalContent ? this._$modalContent : this._$modalContent = $(".js-bounce_modal-simple_form_content").add($(".js-bounce_modal-skype_form_content").add($(".js-bounce_modal-tshirt_form_content").add($(".js-bounce_modal-full_form_content"))))
      }, t.prototype.$fixedBlocks = function() {
        return null != this._$fixedBlocks ? this._$fixedBlocks : this._$fixedBlocks = $(".js-fixed").add($(".olrk-fixed-bottom"))
      }, t.prototype.$simpleFormContent = function() {
        return null != this._$simpleFormContent ? this._$simpleFormContent : this._$simpleFormContent = $(".js-bounce_modal-simple_form_content")
      }, t.prototype.$skypeFormContent = function() {
        return null != this._$skypeFormContent ? this._$skypeFormContent : this._$skypeFormContent = $(".js-bounce_modal-skype_form_content")
      }, t.prototype.$richFormContent = function() {
        return null != this._$richFormContent ? this._$richFormContent : this._$richFormContent = $(".js-bounce_modal-rich_form_content")
      }, t.prototype.$tshirtFormContent = function() {
        return null != this._$tshirtFormContent ? this._$tshirtFormContent : this._$tshirtFormContent = $(".js-bounce_modal-tshirt_form_content")
      }, t.prototype.$fullFormContent = function() {
        return null != this._$fullFormContent ? this._$fullFormContent : this._$fullFormContent = $(".js-bounce_modal-full_form_content")
      }, t.prototype.$minimalFormContent = function() {
        return null != this._$minimalFormContent ? this._$minimalFormContent : this._$minimalFormContent = $(".js-bounce_modal-minimal_form_content")
      }, t.prototype.setAsSubmitted = function() {
        return this._isSubmitted = !0
      }, t.prototype.isSubmitted = function() {
        return this._isSubmitted
      }, t.prototype.setState = function(t) {
        return this._state = t
      }, t.prototype.state = function() {
        return this._state || ""
      }, t.prototype.setType = function(t) {
        return this._type = t
      }, t.prototype.type = function() {
        return this._type || ""
      }, t
    }()
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    this.BounceTracker = function() {
      function t() {
        this.optimizely = window.optimizely || [], this.ga = window.ga || function() {}, this.ga(function(t) {
          return this.ga("set", "dimension10", t.get("clientId"))
        })
      }
      return t.prototype.conversion = function(t, e) {
        return this.ga("send", "event", "company_lead", e, "" + t), this._adWords(), this.optimizely.push(["trackEvent", "new_lead"])
      }, t.prototype.subscription = function(t) {
        return this.ga("send", "event", "BlogSubscription", t)
      }, t.prototype._adWords = function() {
        var t;
        return window.google_conversion_id = 1006887681, window.google_conversion_language = "en", window.google_conversion_format = "3", window.google_conversion_color = "ffffff", window.google_conversion_label = "jgLaCJ_SkwMQgcaP4AM", window.google_conversion_value = 10, $.getScript("http://www.googleadservices.com/pagead/conversion.js"), t = "http://www.googleadservices.com/pagead/conversion/" + window.google_conversion_id + "/?random=" + (new Date).getMilliseconds() + "&value=" + window.google_conversion_value + "&label=" + window.google_conversion_label + "&guid=ON&script=0&url=" + encodeURI(window.document.location.href), $('<img height="1" width="1" style="border-style:none;" alt="" src="' + t + '"/>').appendTo(document.body)
      }, t
    }()
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    this._bounceModalsTemplate = ''
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    this.BounceModals = function() {
      function t() {}
      var e, n, r, o, i, a;
      return n = 90, a = 3e3, i = 20, e = !1, r = 6e4, o = ["simple", "skype", "tshirt", "full", "rich", "minimal"], t.prototype._isMobile = function() {
        return "function" == typeof window.matchMedia ? window.matchMedia("only screen and (max-width: 768px)").matches : void 0
      }, t.prototype._isIE8 = function() {
        return $("html").hasClass("lt-ie9")
      }, t.prototype._availableToRun = function() {
        return "undefined" != typeof ouibounce && null !== ouibounce && "undefined" != typeof _bounceModalsTemplate && null !== _bounceModalsTemplate && !this._isIE8() && !this._isMobile()
      }, t.prototype.init = function(t) {
        var e = this;
        if (this._availableToRun()) return this.debug() ? (this.configure(), this.setUp()) : $.ajax({
          url: window.bounceModalSettings.geoTargetAPIUrl,
          type: "GET",
          dataType: "json"
        }).done(function(n) {
          var r;
          return r = window.bounceModalSettings, r.country = n, t && t(r), e.configure(), e.show ? e.setUp() : void 0
        })
      }, t.prototype.configure = function() {
        var t, e;
        return t = {
          type: "simple",
          modifier: !1,
          title: "",
          skill: "",
          show: !1
        }, e = $.extend({}, t, window.bounceModalSettings), this.debug() ? this.modalType = null != this._debugParams.skype ? "skype" : null != this._debugParams.tshirt ? "tshirt" : null != this._debugParams.full ? "full" : null != this._debugParams.rich ? "rich" : null != this._debugParams.minimal ? "minimal" : "simple" : (this.modalType = "simple", $.inArray(e.type, o) && (this.modalType = e.type)), this.title = e.title.length > 0 ? e.title : this.defaultTitle(), this.skill = e.skill, this.modifier = e.modifier, "tshirt" === this.modalType && !e.blogDataUrl || !e.leadsDataUrl ? (e.leadsDataUrl ? e.blogDataUrl || "undefined" != typeof console && null !== console && "function" == typeof console.error && console.error("BounceModals: unable to show, blogDataUrl is not configured") : "undefined" != typeof console && null !== console && "function" == typeof console.error && console.error("BounceModals: unable to show, leadsDataUrl is not configured"), this.show = !1) : this.show = e.show, this.leadsDataUrl = e.leadsDataUrl, this.blogDataUrl = e.blogDataUrl
      }, t.prototype.setUp = function() {
        var t, e, n, r, o, i;
        return $("body").append(_bounceModalsTemplate), this.updateTitles(), this.updateModifier(), this.modal = new BounceModal("tshirt" === this.modalType ? this.blogDataUrl : this.leadsDataUrl), this.debug() ? this._debugParams.skype ? "function" == typeof(t = this.modal).showSkypeFormModal ? t.showSkypeFormModal() : void 0 : this._debugParams.rich ? "function" == typeof(e = this.modal).showRichFormModal ? e.showRichFormModal() : void 0 : this._debugParams.tshirt ? "function" == typeof(n = this.modal).showTShirtFormModal ? n.showTShirtFormModal() : void 0 : this._debugParams.full ? "function" == typeof(r = this.modal).showFullFormModal ? r.showFullFormModal() : void 0 : this._debugParams.minimal ? "function" == typeof(o = this.modal).showMinimalModal ? o.showMinimalModal() : void 0 : "function" == typeof(i = this.modal).showSimpleFormModal ? i.showSimpleFormModal() : void 0 : (this.setIdleTimer(), this.registerOuibounce())
      }, t.prototype.defaultTitle = function() {
        switch (this.modalType) {
          case "simple":
            return "Find a top software developer!";
          case "full":
            return "Talk to me about your project";
          case "tshirt":
            return "Win a FREE Toptal T-Shirt";
          case "rich":
            return "Rich: Meet and Hire Top Developers";
          case "minimal":
            return "Find a top software developer!";
          default:
            return "Meet and Hire Top Developers"
        }
      }, t.prototype.updateTitles = function() {
        return $(".js-bounce_modal_header_title").html(this.title), $(".js-bounce_modal_skill_title").text("" + this.skill + " developers.")
      }, t.prototype.updateModifier = function() {
        return this.modifier ? $(".js-bounce_modal_modifier").addClass(this.modifier) : void 0
      }, t.prototype.setIdleTimer = function() {
        return $.idleTimer(r), $(document).on("idle.idleTimer", this.showBounceModal.bind(this))
      }, t.prototype.registerOuibounce = function() {
        return ouibounce($("#ouibounce-modal")[0], {
          aggressive: e,
          sensitivity: i,
          timer: a,
          cookieExpire: n,
          callback: this.showBounceModal.bind(this),
          sitewide: !0
        })
      }, t.prototype.showBounceModal = function() {
        var t, e, n, r, o, i;
        return $.idleTimer("destroy"), this.otherModalsAreVisible() || this._getCookie("viewedOuibounceModalByIdle") ? void 0 : ("skype" === this.modalType ? "function" == typeof(t = this.modal).showSkypeFormModal && t.showSkypeFormModal() : "rich" === this.modalType ? "function" == typeof(e = this.modal).showRichFormModal && e.showRichFormModal() : "minimal" === this.modalType ? "function" == typeof(n = this.modal).showMinimalModal && n.showMinimalModal() : "tshirt" === this.modalType ? "function" == typeof(r = this.modal).showTShirtFormModal && r.showTShirtFormModal() : "full" === this.modalType ? "function" == typeof(o = this.modal).showFullFormModal && o.showFullFormModal() : "function" == typeof(i = this.modal).showSimpleFormModal && i.showSimpleFormModal(), this._setCookie("viewedOuibounceModalByIdle", !0))
      }, t.prototype.otherModalsAreVisible = function() {
        return $(".modal-overlay").is(":visible") || $(".bounce_modal-overlay").is(":visible")
      }, t.prototype._getCookie = function(t) {
        return t ? decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(t).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null : null
      }, t.prototype._setCookie = function(t, e) {
        var r, o, i;
        return null == e && (e = !0), i = 24 * n * 60 * 60 * 1e3, r = new Date, r.setTime(r.getTime() + i), o = "; expires=" + r.toGMTString(), document.cookie = "" + t + "=" + e + "; expires=" + o + ";path=/"
      }, t.prototype.debug = function() {
        return this._debugParams || (this._debugParams = this._getSearchParameters()), null != this._debugParams.debug
      }, t.prototype._getSearchParameters = function() {
        var t;
        return t = window.location.search.substr(1), null != t && t.length > 0 ? this._transformToAssocArray(t) : {}
      }, t.prototype._transformToAssocArray = function(t) {
        var e, n, r, o, i, a;
        for (n = {}, r = t.split("&"), i = 0, a = r.length; a > i; i++) e = r[i], o = e.split("="), n[o[0]] = o[1];
        return n
      }, t
    }(), window.bounceModals = new BounceModals
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  ! function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery)
  }(function(t) {
    "use strict";

    function e(t) {
      if (t instanceof Date) return t;
      if (String(t).match(a)) return String(t).match(/^[0-9]*$/) && (t = Number(t)), new Date(t);
      throw new Error("Couldn't cast `" + t + "` to a date object.")
    }

    function n(t) {
      return function(e) {
        var n = e.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);
        if (n)
          for (var o = 0, i = n.length; i > o; ++o) {
            var a = n[o].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/),
              u = new RegExp(a[0]),
              c = a[1] || "",
              l = a[3] || "",
              h = null;
            a = a[2], s.hasOwnProperty(a) && (h = s[a], h = Number(t[h])), null !== h && ("!" === c && (h = r(l, h)), "" === c && 10 > h && (h = "0" + h.toString()), e = e.replace(u, h.toString()))
          }
        return e = e.replace(/%%/, "%")
      }
    }

    function r(t, e) {
      var n = "s",
        r = "";
      return t && (t = t.replace(/(:|;|\s)/gi, "").split(/\,/), 1 === t.length ? n = t[0] : (r = t[0], n = t[1])), 1 === Math.abs(e) ? r : n
    }
    var o = 100,
      i = [],
      a = [];
    a.push(/^[0-9]*$/.source), a.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source), a.push(/[0-9]{4}(\/[0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source), a = new RegExp(a.join("|"));
    var s = {
        Y: "years",
        m: "months",
        w: "weeks",
        d: "days",
        D: "totalDays",
        H: "hours",
        M: "minutes",
        S: "seconds"
      },
      u = function(e, n, r) {
        this.el = e, this.$el = t(e), this.interval = null, this.offset = {}, this.setFinalDate(n), this.instanceNumber = i.length, i.push(this), this.$el.data("countdown-instance", this.instanceNumber), r && (this.$el.on("update.countdown", r), this.$el.on("stoped.countdown", r), this.$el.on("finish.countdown", r)), this.start()
      };
    t.extend(u.prototype, {
      start: function() {
        if (null !== this.interval) throw new Error("Countdown is already running!");
        var t = this;
        this.update(), this.interval = setInterval(function() {
          t.update.call(t)
        }, o)
      },
      stop: function() {
        clearInterval(this.interval), this.interval = null, this.dispatchEvent("stoped")
      },
      pause: function() {
        this.stop.call(this)
      },
      resume: function() {
        this.start.call(this)
      },
      remove: function() {
        this.stop(), delete i[this.instanceNumber]
      },
      setFinalDate: function(t) {
        this.finalDate = e(t)
      },
      update: function() {
        return 0 === this.$el.closest("html").length ? void this.remove() : (this.totalSecsLeft = this.finalDate.valueOf() - (new Date).valueOf(), this.totalSecsLeft = Math.ceil(this.totalSecsLeft / 1e3), this.totalSecsLeft = this.totalSecsLeft < 0 ? 0 : this.totalSecsLeft, this.offset = {
          seconds: this.totalSecsLeft % 60,
          minutes: Math.floor(this.totalSecsLeft / 60) % 60,
          hours: Math.floor(this.totalSecsLeft / 60 / 60) % 24,
          days: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
          totalDays: Math.floor(this.totalSecsLeft / 60 / 60 / 24),
          weeks: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7),
          months: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 30),
          years: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 365)
        }, void(0 === this.totalSecsLeft ? (this.stop(), this.dispatchEvent("finish")) : this.dispatchEvent("update")))
      },
      dispatchEvent: function(e) {
        var r = t.Event(e + ".countdown");
        r.finalDate = this.finalDate, r.offset = t.extend({}, this.offset), r.strftime = n(this.offset), this.$el.trigger(r)
      }
    }), t.fn.countdown = function() {
      var e = Array.prototype.slice.call(arguments, 0);
      return this.each(function() {
        var n = t(this).data("countdown-instance");
        if (void 0 !== n) {
          var r = i[n],
            o = e[0];
          u.prototype.hasOwnProperty(o) ? r[o].apply(r, e.slice(1)) : null === String(o).match(/^[$A-Z_][0-9A-Z_$]*$/i) ? r.setFinalDate.call(r, o) : t.error("Method %s does not exist on jQuery.countdown".replace(/\%s/gi, o))
        } else new u(this, e[0], e[1])
      })
    }
  })
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  ! function(t) {
    function e() {
      if (!h) {
        h = !0;
        for (var e in l) t(e).each(function() {
          var n, r;
          n = t(this), r = n.data("jqae"), (r.containerWidth != n.width() || r.containerHeight != n.height()) && u(n, l[e])
        });
        h = !1
      }
    }

    function n(t) {
      l[t] && (delete l[t], l.length || c && (window.clearInterval(c), c = void 0))
    }

    function r(t, n) {
      l[t] = n, c || (c = window.setInterval(function() {
        e()
      }, 200))
    }

    function o() {
      return 3 === this.nodeType
    }

    function i(e) {
      if (e.contents().length) {
        var n = e.contents(),
          r = n.eq(n.length - 1);
        if (r.filter(o).length) {
          var a = r.get(0).nodeValue;
          return a = t.trim(a), "" == a ? (r.remove(), !0) : !1
        }
        for (; i(r););
        return r.contents().length ? !1 : (r.remove(), !0)
      }
      return !1
    }

    function a(t) {
      if (t.contents().length) {
        var e = t.contents(),
          n = e.eq(e.length - 1);
        return n.filter(o).length ? n : a(n)
      }
      t.append("");
      var e = t.contents();
      return e.eq(e.length - 1)
    }

    function s(e) {
      var n = a(e);
      if (n.length) {
        var r = n.get(0).nodeValue,
          o = r.lastIndexOf(" ");
        return o > -1 ? (r = t.trim(r.substring(0, o)), n.get(0).nodeValue = r) : n.get(0).nodeValue = "", !0
      }
      return !1
    }

    function u(e, n) {
      var r = e.data("jqae");
      r || (r = {});
      var o = r.wrapperElement;
      o || (o = e.wrapInner("<div/>").find(">div"), o.css({
        margin: 0,
        padding: 0,
        border: 0
      }));
      var u = o.data("jqae");
      u || (u = {});
      var c = u.originalContent;
      c ? o = u.originalContent.clone(!0).data("jqae", {
        originalContent: c
      }).replaceAll(o) : o.data("jqae", {
        originalContent: o.clone(!0)
      }), e.data("jqae", {
        wrapperElement: o,
        containerWidth: e.width(),
        containerHeight: e.height()
      });
      var l = e.height(),
        h = (parseInt(e.css("padding-top"), 10) || 0) + (parseInt(e.css("border-top-width"), 10) || 0) - (o.offset().top - e.offset().top),
        d = !1,
        p = o;
      n.selector && (p = t(o.find(n.selector).get().reverse())), p.each(function() {
        var e = t(this),
          r = e.text(),
          u = !1;
        if (o.innerHeight() - e.innerHeight() > l + h) e.remove();
        else if (i(e), e.contents().length) {
          for (d && (a(e).get(0).nodeValue += n.ellipsis, d = !1); o.innerHeight() > l + h;) {
            if (u = s(e), !u) {
              d = !0, e.remove();
              break
            }
            if (i(e), !e.contents().length) {
              d = !0, e.remove();
              break
            }
            a(e).get(0).nodeValue += n.ellipsis
          }
          "onEllipsis" == n.setTitle && u || "always" == n.setTitle ? e.attr("title", r) : "never" != n.setTitle && e.removeAttr("title")
        }
      })
    }
    var c, l = {},
      h = !1,
      d = {
        ellipsis: "...",
        setTitle: "never",
        live: !1
      };
    t.fn.ellipsis = function(e, o) {
      var i, a;
      return i = t(this), "string" != typeof e && (o = e, e = void 0), a = t.extend({}, d, o), a.selector = e, i.each(function() {
        var e = t(this);
        u(e, a)
      }), a.live ? r(i.selector, a) : n(i.selector), this
    }
  }(jQuery)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  printStackTrace.implementation = function() {}, printStackTrace.implementation.prototype = {
    run: function(t, e) {
      return t = t || this.createException(), e = e || this.mode(t), "other" === e ? this.other(arguments.callee) : this[e](t)
    },
    createException: function() {
      try {
        this.undef()
      } catch (t) {
        return t
      }
    },
    mode: function(t) {
      return t.arguments && t.stack ? "chrome" : t.stack && t.sourceURL ? "safari" : "string" == typeof t.message && "undefined" != typeof window && window.opera ? t.stacktrace ? t.message.indexOf("\n") > -1 && t.message.split("\n").length > t.stacktrace.split("\n").length ? "opera9" : t.stack ? t.stacktrace.indexOf("called from line") < 0 ? "opera10b" : "opera11" : "opera10a" : "opera9" : t.stack ? "firefox" : "other"
    },
    instrumentFunction: function(t, e, n) {
      t = t || window;
      var r = t[e];
      t[e] = function() {
        return n.call(this, printStackTrace().slice(4)), t[e]._instrumented.apply(this, arguments)
      }, t[e]._instrumented = r
    },
    deinstrumentFunction: function(t, e) {
      t[e].constructor === Function && t[e]._instrumented && t[e]._instrumented.constructor === Function && (t[e] = t[e]._instrumented)
    },
    chrome: function(t) {
      var e = (t.stack + "\n").replace(/^\S[^\(]+?[\n$]/gm, "").replace(/^\s+(at eval )?at\s+/gm, "").replace(/^([^\(]+?)([\n$])/gm, "{anonymous}()@$1$2").replace(/^Object.<anonymous>\s*\(([^\)]+)\)/gm, "{anonymous}()@$1").split("\n");
      return e.pop(), e
    },
    safari: function(t) {
      return t.stack.replace(/\[native code\]\n/m, "").replace(/^@/gm, "{anonymous}()@").split("\n")
    },
    firefox: function(t) {
      return t.stack.replace(/(?:\n@:0)?\s+$/m, "").replace(/^[\(@]/gm, "{anonymous}()@").split("\n")
    },
    opera11: function(t) {
      for (var e = "{anonymous}", n = /^.*line (\d+), column (\d+)(?: in (.+))? in (\S+):$/, r = t.stacktrace.split("\n"), o = [], i = 0, a = r.length; a > i; i += 2) {
        var s = n.exec(r[i]);
        if (s) {
          var u = s[4] + ":" + s[1] + ":" + s[2],
            c = s[3] || "global code";
          c = c.replace(/<anonymous function: (\S+)>/, "$1").replace(/<anonymous function>/, e), o.push(c + "@" + u + " -- " + r[i + 1].replace(/^\s+/, ""))
        }
      }
      return o
    },
    opera10b: function(t) {
      for (var e = /^(.*)@(.+):(\d+)$/, n = t.stacktrace.split("\n"), r = [], o = 0, i = n.length; i > o; o++) {
        var a = e.exec(n[o]);
        if (a) {
          var s = a[1] ? a[1] + "()" : "global code";
          r.push(s + "@" + a[2] + ":" + a[3])
        }
      }
      return r
    },
    opera10a: function(t) {
      for (var e = "{anonymous}", n = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i, r = t.stacktrace.split("\n"), o = [], i = 0, a = r.length; a > i; i += 2) {
        var s = n.exec(r[i]);
        if (s) {
          var u = s[3] || e;
          o.push(u + "()@" + s[2] + ":" + s[1] + " -- " + r[i + 1].replace(/^\s+/, ""))
        }
      }
      return o
    },
    opera9: function(t) {
      for (var e = "{anonymous}", n = /Line (\d+).*script (?:in )?(\S+)/i, r = t.message.split("\n"), o = [], i = 2, a = r.length; a > i; i += 2) {
        var s = n.exec(r[i]);
        s && o.push(e + "()@" + s[2] + ":" + s[1] + " -- " + r[i + 1].replace(/^\s+/, ""))
      }
      return o
    },
    other: function(t) {
      for (var e, n, r = "{anonymous}", o = /function\s*([\w\-$]+)?\s*\(/i, i = [], a = 10; t && t.arguments && i.length < a;) e = o.test(t.toString()) ? RegExp.$1 || r : r, n = Array.prototype.slice.call(t.arguments || []), i[i.length] = e + "(" + this.stringifyArguments(n) + ")", t = t.caller;
      return i
    },
    stringifyArguments: function(t) {
      for (var e = [], n = Array.prototype.slice, r = 0; r < t.length; ++r) {
        var o = t[r];
        void 0 === o ? e[r] = "undefined" : null === o ? e[r] = "null" : o.constructor && (o.constructor === Array ? e[r] = o.length < 3 ? "[" + this.stringifyArguments(o) + "]" : "[" + this.stringifyArguments(n.call(o, 0, 1)) + "..." + this.stringifyArguments(n.call(o, -1)) + "]" : o.constructor === Object ? e[r] = "#object" : o.constructor === Function ? e[r] = "#function" : o.constructor === String ? e[r] = '"' + o + '"' : o.constructor === Number && (e[r] = o))
      }
      return e.join(",")
    },
    sourceCache: {},
    ajax: function(t) {
      var e = this.createXMLHTTPObject();
      if (e) try {
        return e.open("GET", t, !1), e.send(null), e.responseText
      } catch (n) {}
      return ""
    },
    createXMLHTTPObject: function() {
      for (var t, e = [function() {
          return new XMLHttpRequest
        }, function() {
          return new ActiveXObject("Msxml2.XMLHTTP")
        }, function() {
          return new ActiveXObject("Msxml3.XMLHTTP")
        }, function() {
          return new ActiveXObject("Microsoft.XMLHTTP")
        }], n = 0; n < e.length; n++) try {
        return t = e[n](), this.createXMLHTTPObject = e[n], t
      } catch (r) {}
    },
    isSameDomain: function(t) {
      return "undefined" != typeof location && -1 !== t.indexOf(location.hostname)
    },
    getSource: function(t) {
      return t in this.sourceCache || (this.sourceCache[t] = this.ajax(t).split("\n")), this.sourceCache[t]
    },
    guessAnonymousFunctions: function(t) {
      for (var e = 0; e < t.length; ++e) {
        var n = /\{anonymous\}\(.*\)@(.*)/,
          r = /^(.*?)(?::(\d+))(?::(\d+))?(?: -- .+)?$/,
          o = t[e],
          i = n.exec(o);
        if (i) {
          var a = r.exec(i[1]);
          if (a) {
            var s = a[1],
              u = a[2],
              c = a[3] || 0;
            if (s && this.isSameDomain(s) && u) {
              var l = this.guessAnonymousFunction(s, u, c);
              t[e] = o.replace("{anonymous}", l)
            }
          }
        }
      }
      return t
    },
    guessAnonymousFunction: function(t, e) {
      var n;
      try {
        n = this.findFunctionName(this.getSource(t), e)
      } catch (r) {
        n = "getSource failed with url: " + t + ", exception: " + r.toString()
      }
      return n
    },
    findFunctionName: function(t, e) {
      for (var n, r, o, i = /function\s+([^(]*?)\s*\(([^)]*)\)/, a = /['"]?([0-9A-Za-z_]+)['"]?\s*[:=]\s*function\b/, s = /['"]?([0-9A-Za-z_]+)['"]?\s*[:=]\s*(?:eval|new Function)\b/, u = "", c = Math.min(e, 20), l = 0; c > l; ++l)
        if (n = t[e - l - 1], o = n.indexOf("//"), o >= 0 && (n = n.substr(0, o)), n) {
          if (u = n + u, r = a.exec(u), r && r[1]) return r[1];
          if (r = i.exec(u), r && r[1]) return r[1];
          if (r = s.exec(u), r && r[1]) return r[1]
        }
      return "(?)"
    }
  }
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  ! function(t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : "object" == typeof exports ? exports.sniffFns = e() : t.sniffFns = e()
  }(this, function() {
    return function(t) {
      function e(r) {
        if (n[r]) return n[r].exports;
        var o = n[r] = {
          exports: {},
          id: r,
          loaded: !1
        };
        return t[r].call(o.exports, o, o.exports, e), o.loaded = !0, o.exports
      }
      var n = {};
      return e.m = t, e.c = n, e.p = "", e(0)
    }([function(t, e, n) {
      var r = n(1),
        o = n(2),
        i = n(3),
        a = n(4),
        s = n(5),
        u = n(6),
        c = n(7),
        l = n(8),
        h = n(9),
        d = n(10),
        p = n(11),
        f = n(12),
        m = n(13),
        y = {
          isAndroid: i,
          isMobileAndroid: a,
          isBb10: s,
          browser: {
            isChrome: r,
            isChromeMobile: o,
            isFirefox: u,
            isOpera: c,
            isSafari: l
          },
          isIphone: h,
          isIpad: d,
          isMac: p,
          isWindowsPhone: f,
          isMobile: m
        };
      t.exports = y
    }, function(t, e, n) {
      var r = n(14),
        o = function(t) {
          return r(t, "chrome")
        };
      t.exports = o
    }, function(t, e, n) {
      var r = n(14),
        o = n(1),
        i = n(3),
        a = function(t) {
          return o(t) && i(t) || r(t, "CriOS")
        };
      t.exports = a
    }, function(t, e, n) {
      var r = n(14),
        o = function(t) {
          return r(t, "android") ? parseFloat(t.replace(/^.* android (\d+)\.(\d+).*$/, "$1.$2")) || !0 : !1
        };
      t.exports = o
    }, function(t, e, n) {
      var r = n(14),
        o = n(3),
        i = function(t) {
          return o(t) && r(t, "mobile")
        };
      t.exports = i
    }, function(t, e, n) {
      var r = n(14),
        o = function(t) {
          return r(t, "bb10")
        };
      t.exports = o
    }, function(t, e, n) {
      var r = n(14),
        o = function(t) {
          return r(t, "firefox")
        };
      t.exports = o
    }, function(t, e, n) {
      var r = n(14),
        o = function(t) {
          return r(t, "OPR/") || r(t, "opera")
        };
      t.exports = o
    }, function(t, e, n) {
      var r = n(14),
        o = n(1),
        i = n(3),
        a = function(t) {
          return r(t, "safari") && r(t, "apple") && !(o(t) && i(t))
        };
      t.exports = a
    }, function(t, e, n) {
      var r = n(14),
        o = function(t) {
          return r(t, "iphone;") || r(t, "ipod touch;")
        };
      t.exports = o
    }, function(t, e, n) {
      var r = n(14),
        o = function(t) {
          return r(t, "ipad;")
        };
      t.exports = o
    }, function(t, e, n) {
      var r = n(14),
        o = function(t) {
          return r(t, "mac os")
        };
      t.exports = o
    }, function(t, e, n) {
      var r = n(14),
        o = function(t) {
          return r(t, "windows phone") || r(t, "iemobile") ? parseFloat(t.replace(/^.* windows phone (os )?(\d+)\.(\d+).*$/, "$2.$3")) || !0 : !1
        };
      t.exports = o
    }, function(t, e, n) {
      var r = (n(14), n(4)),
        o = n(9),
        i = (n(10), n(12)),
        a = n(5),
        s = function(t) {
          return r(t) || o(t) || i(t) || a(t)
        };
      t.exports = s
    }, function(t) {
      var e = function(t, e) {
        return RegExp(e.toLowerCase()).test(t.toLowerCase())
      };
      t.exports = e
    }])
  })
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  ! function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : t(window.jQuery || window.$)
  }(function(t) {
    var e, n = {
        className: "autosizejs",
        append: "",
        callback: !1,
        resizeDelay: 10
      },
      r = '<textarea tabindex="-1" style="position:absolute; top:-999px; left:0; right:auto; bottom:auto; border:0; padding: 0; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden; transition:none; -webkit-transition:none; -moz-transition:none;"/>',
      o = ["fontFamily", "fontSize", "fontWeight", "fontStyle", "letterSpacing", "textTransform", "wordSpacing", "textIndent"],
      i = t(r).data("autosize", !0)[0];
    i.style.lineHeight = "99px", "99px" === t(i).css("lineHeight") && o.push("lineHeight"), i.style.lineHeight = "", t.fn.autosize = function(r) {
      return this.length ? (r = t.extend({}, n, r || {}), i.parentNode !== document.body && t(document.body).append(i), this.each(function() {
        function n() {
          var e, n;
          "getComputedStyle" in window ? (e = window.getComputedStyle(d, null), n = d.getBoundingClientRect().width, t.each(["paddingLeft", "paddingRight", "borderLeftWidth", "borderRightWidth"], function(t, r) {
            n -= parseInt(e[r], 10)
          }), i.style.width = n + "px") : i.style.width = Math.max(p.width(), 0) + "px"
        }

        function a() {
          var a = {};
          if (e = d, i.className = r.className, c = parseInt(p.css("maxHeight"), 10), t.each(o, function(t, e) {
              a[e] = p.css(e)
            }), t(i).css(a), n(), window.chrome) {
            var s = d.style.width;
            d.style.width = "0px"; {
              d.offsetWidth
            }
            d.style.width = s
          }
        }

        function s() {
          var t, o;
          e !== d ? a() : n(), i.value = d.value + r.append, i.style.overflowY = d.style.overflowY, o = parseInt(d.style.height, 10), i.scrollTop = 0, i.scrollTop = 9e4, t = i.scrollTop, c && t > c ? (d.style.overflowY = "scroll", t = c) : (d.style.overflowY = "hidden", l > t && (t = l)), t += f, o !== t && (d.style.height = t + "px", m && r.callback.call(d, d))
        }

        function u() {
          clearTimeout(h), h = setTimeout(function() {
            var t = p.width();
            t !== v && (v = t, s())
          }, parseInt(r.resizeDelay, 10))
        }
        var c, l, h, d = this,
          p = t(d),
          f = 0,
          m = t.isFunction(r.callback),
          y = {
            height: d.style.height,
            overflow: d.style.overflow,
            overflowY: d.style.overflowY,
            wordWrap: d.style.wordWrap,
            resize: d.style.resize
          },
          v = p.width();
        p.data("autosize") || (p.data("autosize", !0), ("border-box" === p.css("box-sizing") || "border-box" === p.css("-moz-box-sizing") || "border-box" === p.css("-webkit-box-sizing")) && (f = p.outerHeight() - p.height()), l = Math.max(parseInt(p.css("minHeight"), 10) - f || 0, p.height()), p.css({
          overflow: "hidden",
          overflowY: "hidden",
          wordWrap: "break-word",
          resize: "none" === p.css("resize") || "vertical" === p.css("resize") ? "none" : "horizontal"
        }), "onpropertychange" in d ? "oninput" in d ? p.on("input.autosize keyup.autosize", s) : p.on("propertychange.autosize", function() {
          "value" === event.propertyName && s()
        }) : p.on("input.autosize", s), r.resizeDelay !== !1 && t(window).on("resize.autosize", u), p.on("autosize.resize", s), p.on("autosize.resizeIncludeStyle", function() {
          e = null, s()
        }), p.on("autosize.destroy", function() {
          e = null, clearTimeout(h), t(window).off("resize", u), p.off("autosize").off(".autosize").css(y).removeData("autosize")
        }), s())
      })) : this
    }
  })
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  ! function(t) {
    "use strict";
    t.ajaxPrefilter(function(t) {
      return t.iframe ? (t.originalURL = t.url, "iframe") : void 0
    }), t.ajaxTransport("iframe", function(e, n) {
      function r() {
        s.each(function(e, n) {
          var r = t(n);
          r.data("clone").replaceWith(r)
        }), o.remove(), i.one("load", function() {
          i.remove()
        }), i.attr("src", "javascript:false;")
      }
      var o = null,
        i = null,
        a = "iframe-" + t.now(),
        s = t(e.files).filter(":file:enabled"),
        u = null,
        c = null;
      return e.dataTypes.shift(), e.data = n.data, s.length ? (o = t("<form enctype='multipart/form-data' method='post'></form>").hide().attr({
        action: e.originalURL,
        target: a
      }), "string" == typeof e.data && e.data.length > 0 && t.error("data must not be serialized"), t.each(e.data || {}, function(e, n) {
        t.isPlainObject(n) && (e = n.name, n = n.value), t("<input type='hidden' />").attr({
          name: e,
          value: n
        }).appendTo(o)
      }), t("<input type='hidden' value='IFrame' name='X-Requested-With' />").appendTo(o), c = e.dataTypes[0] && e.accepts[e.dataTypes[0]] ? e.accepts[e.dataTypes[0]] + ("*" !== e.dataTypes[0] ? ", */*; q=0.01" : "") : e.accepts["*"], t("<input type='hidden' name='X-HTTP-Accept'>").attr("value", c).appendTo(o), u = s.after(function() {
        var e = t(this),
          n = e.clone().prop("disabled", !0);
        return e.data("clone", n), n
      }).next(), s.appendTo(o), {
        send: function(e, n) {
          i = t("<iframe src='javascript:false;' name='" + a + "' id='" + a + "' style='display:none'></iframe>"), i.one("load", function() {
            i.one("load", function() {
              var t = this.contentWindow ? this.contentWindow.document : this.contentDocument ? this.contentDocument : this.document,
                e = t.documentElement ? t.documentElement : t.body,
                o = e.getElementsByTagName("textarea")[0],
                i = o && o.getAttribute("data-type") || null,
                a = o && o.getAttribute("data-status") || 200,
                s = o && o.getAttribute("data-statusText") || "OK",
                u = {
                  html: e.innerHTML,
                  text: i ? o.value : e ? e.textContent || e.innerText : null
                };
              r(), n(a, s, u, i ? "Content-Type: " + i : null)
            }), o[0].submit()
          }), t("body").append(o, i)
        },
        abort: function() {
          null !== i && (i.unbind("load").attr("src", "javascript:false;"), r())
        }
      }) : void 0
    })
  }(jQuery)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  ! function(t) {
    var e;
    t.remotipart = e = {
      setup: function(n) {
        var r = n.data("ujs:submit-button"),
          o = t('meta[name="csrf-param"]').attr("content"),
          i = t('meta[name="csrf-token"]').attr("content"),
          a = n.find('input[name="' + o + '"]').length;
        n.one("ajax:beforeSend.remotipart", function(s, u, c) {
          return delete c.beforeSend, c.iframe = !0, c.files = t(t.rails.fileInputSelector, n), c.data = n.serializeArray(), r && c.data.push(r), c.files.each(function(t, e) {
            for (var n = c.data.length - 1; n >= 0; n--) c.data[n].name == e.name && c.data.splice(n, 1)
          }), c.processData = !1, void 0 === c.dataType && (c.dataType = "script *"), c.data.push({
            name: "remotipart_submitted",
            value: !0
          }), i && o && !a && c.data.push({
            name: o,
            value: i
          }), t.rails.fire(n, "ajax:remotipartSubmit", [u, c]) && (t.rails.ajax(c), setTimeout(function() {
            t.rails.disableFormElements(n)
          }, 20)), e.teardown(n), !1
        }).data("remotipartSubmitted", !0)
      },
      teardown: function(t) {
        t.unbind("ajax:beforeSend.remotipart").removeData("remotipartSubmitted")
      }
    }, t(document).on("ajax:aborted:file", "form", function() {
      var n = t(this);
      return e.setup(n), t.rails.handleRemote(n), !1
    })
  }(jQuery)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {}).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    this.Toptal = {}
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    Vtree.onNodeInit(function(t) {
      var e, n;
      if (null != t.namespaceName && null != t.nodeName && 0 !== t.nodeName.length) return e = null != (n = window["" + t.namespaceName + "Component"]) ? n["" + t.nodeName + "View"] : void 0, null != e ? t.setData("view", new e({
        el: t.el
      })) : void 0
    })
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e, n, r = {}.hasOwnProperty,
      o = function(t, e) {
        function n() {
          this.constructor = t
        }
        for (var o in e) r.call(e, o) && (t[o] = e[o]);
        return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
      };
    e = modula.require("frames/pub_sub_module"), t = modula.require("frames/jquery_query_module"), Toptal.View = function(r) {
      function i() {
        return n = i.__super__.constructor.apply(this, arguments)
      }
      return o(i, r), i.include(e), i.include(t), i.prototype.$append = function(t, e) {
        return Vtree.DOM.append(t, e), this.__initPlaceholders()
      }, i.prototype.$before = function(t, e) {
        return Vtree.DOM.before(t, e), this.__initPlaceholders()
      }, i.prototype.$html = function(t, e) {
        return Vtree.DOM.html(t, e), this.__initPlaceholders()
      }, i.prototype.$beforeAsync = function(t, e) {
        var n = this;
        return Vtree.DOM.beforeAsync(t, e).done(function() {
          return n.__initPlaceholders()
        })
      }, i.prototype.$htmlAsync = function(t, e) {
        var n = this;
        return Vtree.DOM.htmlAsync(t, e).done(function() {
          return n.__initPlaceholders()
        })
      }, i.prototype.__initPlaceholders = function() {
        return this.$("input, textarea").placeholder()
      }, i
    }(Frames.View)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    Frames.hook("loaded", function() {
      return $.ajaxSettings.dataType = "json"
    })
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    Frames.hook("loaded", function() {
      var t;
      return t = -1 !== location.search.search("flexbox=false"), t ? $("html").toggleClass("flexbox no-flexbox") : void 0
    })
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    Frames.hook("ready", function() {
      var t;
      return t = document.cookie.indexOf("show_breadcrumbs"), t > -1 ? $("#breadcrumbs").addClass("is-visible") : void 0
    })
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    Frames.hook("ready", function() {
      var t, e, n, r;
      if (!Modernizr.csscolumns) {
        t = {
          ".multi_column_list": 4,
          ".page_footer_links-column.is-2 .page_footer_links-list": 2
        }, r = [];
        for (n in t) e = t[n], r.push($(n).each(function(t, n) {
          var r;
          return r = $(n), r.is(":empty") ? void 0 : r.columnize({
            columns: e,
            lastNeverTallest: !0
          })
        }));
        return r
      }
    })
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    Frames.hook("ready", function() {
      var t, e;
      return e = /MSIE/.test(navigator.userAgent) && !/Opera/.test(navigator.userAgent), e && (t = parseInt(navigator.userAgent.match(/Trident\/([0-9.]+)/)[1]) + 4, 8 >= t) ? $("*:last-child").addClass("is-last_child") : void 0
    })
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    Frames.hook("ready", function() {
      return $("input, textarea").placeholder()
    })
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    Frames.hook("ready", function() {
      var t;
      return _.isEmpty(window.location.hash) ? void 0 : (t = window.location.hash.substring(1), t = decodeURIComponent(t), $.post("/referrers", {
        referrer_slug: t
      }))
    })
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    Frames.hook("ready", function() {
      return window.setImmediate || (window.setImmediate = function() {
        var t, e, n, r;
        return e = {}, r = e, t = Math.random(), n = function(n) {
          var r;
          if (n.data === t) return e = e.next, r = e.func, delete e.func, r()
        }, window.addEventListener ? window.addEventListener("message", n, !1) : window.attachEvent("onmessage", n), window.postMessage ? function(e) {
          return r = r.next = {
            func: e
          }, window.postMessage(t, "*")
        } : function(t) {
          return setTimeout(t, 0)
        }
      }())
    })
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    window.googleMapsReady = !1, window.googleMapsReadyCallback = function() {
      var t, e, n, r, o;
      if (window.googleMapsReady = !0, null != window.googleMapsCallbacks) {
        for (r = window.googleMapsCallbacks, o = [], e = 0, n = r.length; n > e; e++) t = r[e], o.push(t());
        return o
      }
    }, this.Map = function() {
      function t(t, e, n, r) {
        this.el = t, this.location = null != e ? e : {}, this.options = null != n ? n : {}, this.initCallback = r, window.googleMapsReady ? this.initMapBlock() : (this.prepareCallback(), this.loadScript())
      }
      var e, n, r, o;
      return e = 13, n = "//assets.toptal.io/assets/public/blocks/contacts/marker-995aa362d78b0ee122d89b831de3af21.png", r = 43, o = 147, t.prototype.prepareCallback = function() {
        return null == window.googleMapsCallbacks && (window.googleMapsCallbacks = []), window.googleMapsCallbacks.push(this.initMapBlock.bind(this))
      }, t.prototype.loadScript = function() {
        var t;
        return t = "https://maps.googleapis.com/maps/api/js?v=3.exp", t += "&sensor=false&callback=googleMapsReadyCallback", 0 === $("script[src='" + t + "']").length ? $("body").append("<script src='" + t + "'></script>") : void 0
      }, t.prototype.initMapBlock = function() {
        return "undefined" != typeof google && null !== google && this.el ? (this.map = new google.maps.Map(this.el, this.options), this.geocoder = new google.maps.Geocoder, null == this.options.zoom && (this.options.zoom = e), this.location.address ? this.initWithAddress(this.location.address) : null != this.location.lat && null != this.location.lng && this.initWithCoords(this.location.lat, this.location.lng), "function" == typeof this.initCallback ? this.initCallback(this) : void 0) : void 0
      }, t.prototype.initWithAddress = function(t) {
        return this.geocoder.geocode({
          address: t
        }, this.onGeocodeResultsUpdate.bind(this))
      }, t.prototype.onGeocodeResultsUpdate = function(t, e) {
        return e === google.maps.GeocoderStatus.OK ? (this.map.fitBounds(t[0].geometry.viewport), this.map.setCenter(t[0].geometry.location)) : void 0
      }, t.prototype.initWithCoords = function(t, e) {
        return this.map.setCenter(new google.maps.LatLng(t, e)), this.map.setZoom(this.options.zoom)
      }, t.prototype.addMarker = function(t, e, o, i) {
        var a, s;
        return null == e && (e = n), null == o && (o = r), null == i && (i = r), s = new google.maps.Size(o, i), a = new google.maps.MarkerImage(e, null, null, null, s), this.marker = new google.maps.Marker({
          position: t,
          map: this.map,
          icon: a
        })
      }, t.prototype.addPopup = function(t) {
        var e, n = this;
        return null == t && (t = "public/components/map/templates/popup"), e = JST[t](), this.popup = new google.maps.InfoWindow({
          content: e,
          maxWidth: o
        }), google.maps.event.addListener(this.marker, "click", function() {
          return n.popup.open(n.map, n.marker)
        }), this.popup.open(this.map, this.marker)
      }, t.prototype.makeCoords = function(t, e) {
        return new google.maps.LatLng(t, e)
      }, t.prototype.geocodeAndRun = function(t, e) {
        return this.geocoder.geocode({
          address: t
        }, function(t, n) {
          return n === google.maps.GeocoderStatus.OK && "function" == typeof e ? e(t[0].geometry.location) : void 0
        })
      }, t.prototype.getGoogleMap = function() {
        return this.map
      }, t
    }()
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e, n, r = [].slice;
    t = {
      lines: 9,
      length: 3,
      width: 2,
      radius: 4,
      corners: 1,
      rotate: 0,
      color: "#000",
      speed: 1,
      trail: 50,
      shadow: !1,
      hwaccel: !1,
      className: "spinner",
      zIndex: 2e9,
      top: "auto",
      left: "auto"
    }, n = {
      mini: {},
      search: {
        lines: 11,
        length: 9,
        width: 4,
        radius: 11,
        trail: 70,
        color: "#555"
      }
    }, e = {
      background: "white",
      position: "absolute",
      opacity: .9,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    }, Object.merge(Frames.View.prototype, {
      spin: function() {
        var t, e, n, o, i;
        return n = arguments[0], o = arguments[1], e = 3 <= arguments.length ? r.call(arguments, 2) : [], null == n && (n = this.el), null == o && (o = 500), t = $(n), t.data("spinner-timeout", setTimeout((i = this._spin).bind.apply(i, [this, n].concat(r.call(e))), o))
      },
      stopSpin: function(t) {
        var e, n, r;
        return null == t && (t = this.el), e = $(t), (r = e.data("spinner-timeout")) ? (e.removeData("spinner-timeout"), clearTimeout(r)) : (n = e.data("spinner")) ? (n.stop(), e.removeClass("has-spinner").removeData("spinner").data("spinner-overlay").remove()) : void 0
      },
      _spin: function(r, o, i) {
        var a, s, u, c, l;
        return null == o && (o = "mini"), null == i && (i = {}), a = $(r), u = _.extend({}, e, i.overlayCss), s = $("<div>").appendTo(a).css(u), a.removeData("spinner-timeout"), this.stopSpin(r), c = Object.extended(t).clone().merge(n[o]).merge(i), l = new Spinner(c).spin(a[0]), a.addClass("has-spinner").data("spinner", l).data("spinner-overlay", s)
      }
    })
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    this.SocialShare = function() {
      function t() {}
      return t.twitterUrl = function(t, e) {
        var n;
        return n = "http://twitter.com/share?", n += "text=" + encodeURIComponent(e), n += "&url=" + encodeURIComponent(t), n += "&counturl=" + encodeURIComponent(t)
      }, t.facebookUrl = function(t, e, n, r) {
        var o;
        return null == n && (n = ""), null == r && (r = ""), o = "http://www.facebook.com/sharer.php?s=100", o += "&p[title]=" + encodeURIComponent(e), o += "&p[summary]=" + encodeURIComponent(n), o += "&p[url]=" + encodeURIComponent(t), o += "&p[images][0]=" + encodeURIComponent(r)
      }, t.linkedinUrl = function(t, e, n) {
        var r;
        return null == n && (n = ""), r = "https://www.linkedin.com/shareArticle?mini=true", r += "&url=" + encodeURIComponent(t), r += "&title=" + encodeURIComponent(e), r += "&summary=" + encodeURIComponent(n)
      }, t.gplusUrl = function(t) {
        return "https://plus.google.com/share?url=" + encodeURIComponent(t)
      }, t.popup = function() {
        return window.open("/popup.html", "", "toolbar=0,status=0,width=626,height=436")
      }, t
    }()
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    this.jsErrorLogger = new JsErrorLogger({
      errorProcessFn: function(t, e) {
        return "undefined" != typeof Rollbar && null !== Rollbar ? Rollbar.error(t.message, t, e) : void 0
      }
    })
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    this.AnchorsRouter = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      return n(r, e), r
    }(Frames.Router)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    this.CommunityEventsComponent = {}
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    CommunityEventsComponent.EventGalleryView = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      return n(r, e), r.prototype.initialize = function() {
        return this.$el.fotorama()
      }, r
    }(Toptal.View)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    CommunityEventsComponent.MapView = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      return n(r, e), r.prototype.initialize = function() {
        var t, e;
        return t = this.$el.data("address"), e = new CommunityEventsComponent.MapViewModel(t), new Map(this.el, e.address(), e.options(), function(e) {
          return e.geocodeAndRun(t, e.addMarker.bind(e))
        })
      }, r
    }(Toptal.View)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    CommunityEventsComponent.PromoSwitcherView = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      return n(r, e), r.prototype.events = {
        "click @promo-switcher": "showPromo"
      }, r.prototype.els = {
        $triggers: "@promo-switcher",
        $slides: "@promo-event"
      }, r.prototype.showPromo = function(t) {
        var e, n;
        return t.preventDefault(), e = $(t.target), n = e.data("slide"), this._showSlide(n), this._swapActive(e)
      }, r.prototype._showSlide = function(t) {
        return this.$slides().addClass("is-hidden"), this.$slides().filter(".slide-" + t).removeClass("is-hidden")
      }, r.prototype._swapActive = function(t) {
        return this.$triggers().removeClass("is-active"), t.addClass("is-active")
      }, r
    }(Toptal.View)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    CommunityEventsComponent.MapViewModel = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      return n(r, e), r.prototype.initialize = function(t) {
        this.country = t
      }, r.prototype.options = function() {
        return {
          zoom: 13,
          scrollwheel: !1,
          streetViewControl: !1,
          mapTypeControl: !1
        }
      }, r.prototype.address = function() {
        return {
          address: this.country
        }
      }, r
    }(Frames.ViewModel)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    this.CommunityBoomingComponent = {}
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    CommunityBoomingComponent.GalleryView = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      return n(r, e), r.prototype.els = {
        $squares: "@square",
        $horizontals: "@horizontal"
      }, r.prototype.initialize = function() {
        return this.horImages = this.$el.data("horizontals"), this.sqrImages = this.$el.data("squares"), this.initImages(), this.flipFlop()
      }, r.prototype.initImages = function() {
        var t, e, n, r;
        return e = this.$horizontals().length, r = this.$squares().length, t = _.sample(this.horImages, 2 * e), n = _.sample(this.sqrImages, 2 * r), $.each(this.$horizontals(), function(n, r) {
          return $(r).children("@top_image").css("background-image", "url(" + t[n] + ")"), $(r).children("@bottom_image").css({
            "background-image": "url(" + t[n + e] + ")"
          }), $(r).data("top-shown", !0)
        }), $.each(this.$squares(), function(t, e) {
          return $(e).children("@top_image").css("background-image", "url(" + n[t] + ")"), $(e).children("@bottom_image").css({
            "background-image": "url(" + n[t + r] + ")"
          }), $(e).data("top-shown", !0)
        })
      }, r.prototype.flipFlop = function() {
        var t, e;
        return t = $(this.chooseCard()), this.flipCard(t), e = Math.floor(6 * Math.random()) + 4, setTimeout(this.flipFlop.bind(this), 2500)
      }, r.prototype.chooseCard = function() {
        return _.sample(Math.random() > .25 ? this.$squares() : this.$horizontals())
      }, r.prototype.flipCard = function(t) {
        return t.data("top-shown") === !0 ? (t.children("@top_image").animate({
          opacity: 0
        }, "slow"), t.children("@bottom_image").animate({
          opacity: 1
        }, "slow"), t.data("top-shown", !1)) : (t.children("@bottom_image").animate({
          opacity: 0
        }, "slow"), t.children("@top_image").animate({
          opacity: 1
        }, "slow"), t.data("top-shown", !0))
      }, r
    }(Toptal.View)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    this.MapComponent = {}
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    this.JST || (this.JST = {}), this.JST["public/components/map/templates/popup"] = function() {
      return this.Skim = {
          access: function(t) {
            var e;
            return e = this[t], "function" == typeof e && (e = e.call(this)), e === !0 ? [this] : e === !1 || null == e ? !1 : "[object Array]" !== Object.prototype.toString.call(e) ? [e] : 0 === e.length ? !1 : e
          },
          withContext: function(t, e) {
            var n, r;
            return n = function(t) {
              var e;
              return e = function() {}, e.prototype = t, new e
            }, t = n(t), t.safe || (t.safe = this.safe || function(t) {
              var e;
              return (null != t ? t.skimSafe : void 0) ? t : (e = new String(null != t ? t : ""), e.skimSafe = !0, e)
            }), t.isArray = Array.isArray || function(t) {
              return "[object Array]" === {}.toString.call(t)
            }, t.flatten = r = function(t) {
              var e, n, o, i;
              for (n = [], o = 0, i = t.length; i > o; o++) e = t[o], e instanceof Array ? n = n.concat(r(e)) : n.push(e);
              return n
            }, t.escape || (t.escape = this.escape || function(t) {
              return null == t ? "" : t.skimSafe || !/[&<>\"]/.test(t) ? t : this.safe(("" + t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"))
            }), e.call(t)
          }
        },
        function(t) {
          return null == t && (t = {}), Skim.withContext.call({}, t, function() {
            var t;
            return t = "", t += '<div class="contacts_popup"><div class="contacts_popup-logo"></div><header class="contacts_popup-legal">Toptal, LLC</header><p class="contacts_popup-address">548 Market St #36879<br />San Francisco<br />CA 94104-5401</p></div>'
          })
        }
    }.call(this)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    MapComponent.MapView = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      return n(r, e), r.prototype.initialize = function() {
        var t;
        return t = new MapComponent.MapViewModel, new Map(this.el, t.address(), t.options(), function(e) {
          var n;
          return n = e.makeCoords(t.markerLat(), t.markerLng()), e.addMarker(n), e.addPopup(t.markerPopup())
        })
      }, r
    }(Toptal.View)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    MapComponent.MapViewModel = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      var o, i, a, s;
      return n(r, e), i = 37.7908346, a = -122.40066110000001, o = .015, s = 13, r.prototype.options = function() {
        return {
          zoom: s,
          scrollwheel: !1
        }
      }, r.prototype.address = function() {
        return {
          lat: i + o,
          lng: a
        }
      }, r.prototype.markerLat = function() {
        return i
      }, r.prototype.markerLng = function() {
        return a
      }, r.prototype.markerPopup = function() {
        return "public/components/map/templates/popup"
      }, r
    }(Frames.ViewModel)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    this.LayoutComponent = {}
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    LayoutComponent.HeightEqualizerView = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      return n(r, e), r.prototype.els = {
        $unheightered: "@unleveled"
      }, r.prototype.initialize = function() {
        return $("html").hasClass("no-flexbox") ? this.equalize() : void 0
      }, r.prototype.equalize = function() {
        var t, e;
        return t = this.$unheightered().map(function(t, e) {
          return $(e).height()
        }), e = _.max(t), this.$unheightered().height(e)
      }, r
    }(Toptal.View)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    LayoutComponent.LayoutView = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      return n(r, e), r.prototype.initialize = function() {
        return new LayoutComponent.UserSignedInBehavior({
          el: this.el
        }), Modernizr.svg || new LayoutComponent.SvgImagesBehavior({
          el: this.$el
        }), new LayoutComponent.HoverEventsControllerBehavior({
          el: this.$el
        }), new LayoutComponent.AnchorScrollerBehavior({
          el: this.$el
        }), new LayoutComponent.DeferredImageBehavior({
          el: this.$el
        }), new LayoutComponent.CoreTeamTopImageBehavior({
          el: this.$el
        }), new LayoutComponent.CustomSocialShareBehavior({
          el: this.$el
        })
      }, r
    }(Toptal.View)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    LayoutComponent.MenuView = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      return n(r, e), r.prototype.els = {
        $menu: "@menu",
        $menuWrapper: "@menu_wrapper"
      }, r.prototype.events = {
        "click @expand_menu": "toggle"
      }, r.prototype.initialize = function() {
        return this.sticky = new LayoutComponent.StickyMenuBehavior({
          el: this.$menuWrapper()
        })
      }, r.prototype.toggle = function() {
        return this.$menu().toggleClass("is-expanded"), !1
      }, r
    }(Toptal.View)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    LayoutComponent.OverlayView = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      return n(r, e), r.prototype.FADE_IN = 100, r.prototype.FADE_OUT = 300, r.prototype.events = {
        click: "hideNotification"
      }, r.prototype.initialize = function() {
        return this.listen("overlay:open", this.open), this.listen("overlay:close", this.close)
      }, r.prototype.open = function() {
        var t = this;
        return this.$el.fadeIn(this.FADE_IN, function() {
          return t.emit("overlay:show", t.$el)
        })
      }, r.prototype.hideNotification = function() {
        return this.emit("overlay:hide", this.$el)
      }, r.prototype.close = function() {
        var t;
        return this.emit("overlay:closed"), t = $(".layout-overlay"), t.fadeOut(this.FADE_OUT, function() {
          return $(this).children().remove()
        })
      }, r
    }(Toptal.View)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    LayoutComponent.AnchorScrollerBehavior = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      var o, i, a;
      return n(r, e), i = "body,html", o = "swing", a = 400, r.prototype.els = {
        $header: "@menu_wrapper:not(:hidden)"
      }, r.prototype.events = {
        "click a[href*=#]:not([href=#])": "scroll"
      }, r.prototype.initialize = function() {
        var t = this;
        return $(window).on("load", this.scrollOnLoad.bind(this)).one("scroll", function(e, n) {
          return $(n).off("load", t.scrollOnLoad)
        }).on("resize", this.clearHeaderOffsetCache.bind(this).debounce(500))
      }, r.prototype.scrollOnLoad = function() {
        return "" !== this.hash() ? this.scrollTo() : void 0
      }, r.prototype.scroll = function(t) {
        var e, n, r, o, i, a;
        return e = $(t.target), n = e.closest("a").attr("href"), r = n.match(/(.+)?#(.+)$/), null == r || (a = r[0], o = r[1], i = r[2], !document.getElementById(i) || null != o && o !== this.currentPage()) ? void 0 : (t.preventDefault(), this.scrollTo("#" + i))
      }, r.prototype.scrollTo = function(t) {
        var e, n;
        return null == t && (t = this.hash()), !_.isEmpty(t) && document.getElementById(t.slice(1)) ? (e = $(t), n = e.offset().top - this.headerOffset() - 8, $(i).animate({
          scrollTop: n
        }, a, o), window.location.hash = t) : void 0
      }, r.prototype.hash = function() {
        return window.location.hash
      }, r.prototype.currentPage = function() {
        return window.location.pathname
      }, r.prototype.clearHeaderOffsetCache = function() {
        return this._offset = void 0
      }, r.prototype.headerOffset = function() {
        return this._offset || (this._offset = this.$header().height())
      }, r
    }(Toptal.View)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    LayoutComponent.CoreTeamTopImageBehavior = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      return n(r, e), r.prototype.els = {
        $image: ".core_team_jobs-top_image",
        $gradient: "@top_image_gradient"
      }, r.prototype.initialize = function() {
        var t;
        return t = _.throttle(this.adjustPosition.bind(this), 100), $(window).resize(t), this.adjustPosition()
      }, r.prototype.adjustPosition = function() {
        var t, e, n, r;
        return r = $(window).width(), r > 2560 && (r = 2560), e = r / 1.51, n = 10, r > 1440 && (n -= (r - 1440) / 1e3 * 8), t = e / n + 5, this.setDelta(t, r)
      }, r.prototype.setDelta = function(t, e) {
        var n, r;
        return r = 100 * (t / 100), n = 768 > e ? 75 + t / 2 : 200 + t / 2, this.$image().css("background-position", "center -" + t + "px"), this.$gradient().css("margin-top", "" + n + "px")
      }, r
    }(Toptal.View)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    LayoutComponent.CustomSocialShareBehavior = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      return n(r, e), r.prototype.events = {
        "click @custom_social_share": "sharePopup"
      }, r.prototype.sharePopup = function(t) {
        var e, n, r, o, i;
        return t.preventDefault(), e = $(t.currentTarget), r = e.data("text"), i = e.data("utm"), o = $('link[rel="canonical"]').attr("href"), null != i && i.length > 0 && (o += "?" + i), n = SocialShare.popup(), n.location.href = function() {
          switch (e.data("type")) {
            case "twitter":
              return SocialShare.twitterUrl(o, r)
          }
        }()
      }, r
    }(Toptal.View)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    LayoutComponent.DeferredImageBehavior = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      return n(r, e), r.prototype.els = {
        $deferred: "@deferred"
      }, r.prototype.initialize = function() {
        var t;
        return this.preloadFirstImages(), t = _.throttle(this.loadImages.bind(this), 100), $(window).bind("scroll.image-load", t)
      }, r.prototype.preloadFirstImages = function() {
        return $(window).bind("load", function() {
          return setTimeout(function() {
            return $(window).trigger("scroll.image-load")
          }, 1)
        })
      }, r.prototype.loadImages = function() {
        var t, e, n, r, o, i, a, s;
        for (r = $(window).scrollTop(), n = $(window).height(), a = this.$deferred(), s = [], o = 0, i = a.length; i > o; o++) e = a[o], t = $(e), t.is(":visible") && (t.offset().top > r + n || s.push(this.loadImage(t)));
        return s
      }, r.prototype.loadImage = function(t) {
        var e;
        return e = $("<img>").attr({
          src: t.data("src")
        }).replaceAll(t), e.addClass(t.attr("class"))
      }, r
    }(Toptal.View)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    LayoutComponent.HoverEventsControllerBehavior = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      var o, i;
      return n(r, e), o = 600, i = '<div class="layout_layer-hover_cover"></div>', r.attr("hoverCover"), r.attr("disabled", {
        "boolean": !0,
        "true": "enable",
        "false": "disable"
      }), r.prototype.initialize = function() {
        return this.enable(), this.createHoverCover(), this.bindScroll()
      }, r.prototype.createHoverCover = function() {
        var t;
        return t = $(i).insertAfter(this.$el), t.bind("click", this.delegateClick.bind(this)), this.setHoverCover(t)
      }, r.prototype.delegateClick = function(t) {
        var e, n, r, o;
        return r = t.currentTarget, o = r.ownerDocument, e = o.createEvent("MouseEvents"), e.initEvent(t.type, !0, !0), this.enableHover(), n = o.elementFromPoint(t.clientX, t.clientY), n.dispatchEvent(e)
      }, r.prototype.bindScroll = function() {
        var t;
        return t = this.enableHover.bind(this).debounce(o), $(window).on("scroll", this.disableHoverWhileScrolling.bind(this, t))
      }, r.prototype.disableHoverWhileScrolling = function(t) {
        return this.isDisabled() || this.disableHover(), t()
      }, r.prototype.disableHover = function() {
        return this.enable(), this.$hoverCover().show()
      }, r.prototype.enableHover = function() {
        return this.disable(), this.$hoverCover().hide()
      }, r.prototype.$hoverCover = function() {
        return this.getHoverCover()
      }, r
    }(Toptal.View)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    LayoutComponent.StickyMenuBehavior = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      return n(r, e), r.attr("top"), r.attr("clone"), r.attr("timer"), r.attr("lastFixedVal"), r.prototype.initialize = function() {
        var t, e;
        return this.cloneMenu(), this.listen("session:signedin", this.signedInStickyMenu), this.listen("session:less", this.sessionLessStickyMenu), this.cacheSizes(), t = _.throttle(this.cacheSizes.bind(this), 100), $(window).resize(t), e = _.throttle(this.processScroll.bind(this), 100), $(window).scroll(e)
      }, r.prototype.cloneMenu = function() {
        var t;
        return t = this.$el.clone(), t.hide().addClass("is-fixed").appendTo("body"), this.setClone(t)
      }, r.prototype.processScroll = function() {
        var t, e, n, r = this;
        return n = $(window).scrollTop(), e = n > this.getTop(), t = e !== this.lastFixedVal, t ? (this.$clone().toggle(e), function() {
          return r.$clone().toggleClass("is-visible", e)
        }.delay(), this.lastFixedVal = e) : void 0
      }, r.prototype.cacheSizes = function() {
        var t;
        return t = this.$prev().offset().top + this.$prev().outerHeight(), this.setTop(t)
      }, r.prototype.$clone = function() {
        return this.getClone()
      }, r.prototype.$prev = function() {
        return this.$el.prev()
      }, r.prototype.sessionLessStickyMenu = function() {
        return this.$clone().find(".page_header_menu-contact-items").addClass("is-replaceable"), this.$clone().find(".page_header_menu-hire").attr({
          id: "ab-header_hire_button"
        }).show()
      }, r.prototype.signedInStickyMenu = function() {
        return this.$clone().find(".page_header_menu-hire").remove()
      }, r
    }(Toptal.View)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    LayoutComponent.SvgImagesBehavior = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      return n(r, e), r.prototype.els = {
        $images: "img[src$=svg]"
      }, r.prototype.initialize = function() {
        return this.setFallbacks()
      }, r.prototype.setFallbacks = function() {
        return this.$images().each(function() {
          var t, e;
          return t = $(this), e = t.data("png-src"), e ? t.attr({
            src: e
          }) : void 0
        })
      }, r
    }(Toptal.View)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    LayoutComponent.UserSignedInBehavior = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      return n(r, e), r.prototype.els = {
        $sessionless: '[data-visible-when="sessionless"]',
        $signedin: '[data-visible-when="signedin"]',
        $withConditionalClass: "[data-signedin-class],[data-sessionless-class]",
        $sessionGroups: "@session_based_group"
      }, r.prototype.initialize = function() {
        return this.userIsSignedIn(), this.listen("session:check_if_signed_in", this.userIsSignedIn.bind(this))
      }, r.prototype.userIsSignedIn = function() {
        var t = this;
        return gon.check_session_url ? $.ajax({
          url: gon.check_session_url,
          type: "GET",
          dataType: "JSON",
          xhrFields: {
            withCredentials: !0
          },
          success: function(e) {
            return e.signed_in ? t.resolveSignedInUser(e.role) : t.resolveGuest()
          },
          error: function() {
            return t.resolveGuest()
          }
        }) : void this.resolveGuest()
      }, r.prototype.signedInUser = function(t) {
        return this._simpleSignedIn(), this._groupedSignedIn(t)
      }, r.prototype._simpleSignedIn = function() {
        return this.$sessionless().remove(), this.$signedin().filter(":not([data-leave-it-invisible])").show(), this.applyConditionalClassFor("signedin"), this.disableBounceModals()
      }, r.prototype._groupedSignedIn = function(t) {
        var e = this;
        return this.$sessionGroups().each(function(n, r) {
          var o, i, a;
          return i = $(r), o = i.find('[data-session-based-group="default"]'), a = i.find('[data-session-based-group="role-conditional"]'), e._swapRoleConditionals(t, o, a)
        })
      }, r.prototype._swapRoleConditionals = function(t, e, n) {
        var r, o, i, a;
        return r = this._simplifiedRole(t), i = n.data("for-roles"), a = !0, null != i ? (o = i.split(","), a = !_.contains(o, r)) : a = !1, a ? (e.show(), n.remove()) : (e.remove(), n.show())
      }, r.prototype.resolveSignedInUser = function(t) {
        return this.emit("session:signedin", t), this.signedInUser(t.role_type), window.AbTestingService.onSignInFinish.resolve(t)
      }, r.prototype.resolveGuest = function() {
        return this.emit("session:less"), this.noSession(), window.AbTestingService.onSignInFinish.resolve()
      }, r.prototype.noSession = function() {
        return this._simpleNoSession(), this._groupedNoSession()
      }, r.prototype._simpleNoSession = function() {
        return this.$signedin().remove(), this.$sessionless().filter(":not([data-leave-it-invisible])").show(), this.applyConditionalClassFor("sessionless")
      }, r.prototype._groupedNoSession = function() {
        return this.$sessionGroups().each(function(t, e) {
          var n, r;
          return r = $(e), n = r.find('[data-session-based-group="default"]').first().clone(), r.before(n).remove()
        })
      }, r.prototype.applyConditionalClassFor = function(t) {
        return this.$withConditionalClass().each(function() {
          var e, n;
          return e = $(this), (n = e.data("" + t + "-class")) ? e.addClass(n) : void 0
        })
      }, r.prototype.disableBounceModals = function() {
        var t, e, n;
        return n = 7776e6, t = new Date, t.setTime(t.getTime() + n), e = "; expires=" + t.toGMTString(), document.cookie = "viewedOuibounceModal=true; expires=" + e + ";path=/", document.cookie = "viewedOuibounceModalByIdle=true; expires=" + e + ";path=/"
      }, r.prototype._simplifiedRole = function(t) {
        return "Developer" === t ? "developer" : "Company" === t || "CompanyRepresentative" === t || "TalentPartner" === t ? "client" : "staff"
      }, r
    }(Toptal.View)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    this.UiComponent = {}
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    UiComponent.CheckboxView = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      return n(r, e), r.prototype.els = {
        $checkbox: "@checkbox",
        $wrapper: "@checkbox_wrapper"
      }, r.prototype.events = {
        click: "toggle",
        "change @checkbox": "apply",
        "flagchanged @checkbox": "apply"
      }, r.prototype.initialize = function() {
        return this.apply()
      }, r.prototype.toggle = function(t) {
        var e;
        return e = $(t.target), e.data("pass-click-event") ? void 0 : (this.$wrapper().removeClass("is-invalid").children(".error").remove(), this.$checkbox().prop({
          checked: !this.isChecked()
        }).change(), !1)
      }, r.prototype.apply = function() {
        return this.$wrapper().toggleClass("is-checked", this.isChecked())
      }, r.prototype.isChecked = function() {
        return this.$checkbox().is(":checked")
      }, r
    }(Toptal.View)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    this.FormComponent = {}
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    FormComponent.CleanupBehavior = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      return n(r, e), r.prototype.els = {
        $inputs: "input, textarea"
      }, r.prototype.events = {
        "form:clean": "clean"
      }, r.prototype.initialize = function() {
        return this.hasNativePlaceholders = $.fn.placeholder.input
      }, r.prototype.clean = function() {
        return this.$inputs().each(function(t, e) {
          var n, r, o;
          return n = $(e), r = !this.hasNativePlaceholders && n.val() === n.attr("placeholder"), o = "hidden" === n.attr("type"), r || o ? void 0 : n.val("")
        })
      }, r
    }(Toptal.View)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    FormComponent.ConfirmationBehavior = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      return n(r, e), r.prototype.els = {
        $form: "@form",
        $confirmation: "@confirmation-block"
      }, r.prototype.events = {
        "ajax:success": "showConfirmation"
      }, r.prototype.showConfirmation = function() {
        var t = this;
        return this.$form().fadeOut(function() {
          return t.$confirmation().fadeIn(function() {
            return t.$el.trigger("form:submitted")
          })
        })
      }, r
    }(Toptal.View)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    FormComponent.SpinnerBehavior = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      return n(r, e), r.prototype.events = {
        "ajax:before": "showFormSpinner",
        "ajax:complete": "hideFormSpinner"
      }, r.prototype.showFormSpinner = function() {
        return this.spin(this.$el)
      }, r.prototype.hideFormSpinner = function() {
        return this.stopSpin(this.$el)
      }, r
    }(Toptal.View)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    FormComponent.AssociatedFieldsView = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      return n(r, e), r.prototype.els = {
        $trigger: "@linked_trigger",
        $target: "@linked_target"
      }, r.prototype.events = {
        "change @linked_trigger": "updateVisibility"
      }, r.prototype.updateVisibility = function() {
        return this.isChecked() ? this.$target().slideDown() : this.$target().slideUp()
      }, r.prototype.isChecked = function() {
        return this.$trigger().is(":checked")
      }, r
    }(Toptal.View)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    FormComponent.FileFieldView = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      return n(r, e), r.prototype.els = {
        $browse: "@browse",
        $input: "input[type='file']",
        $value: "@value"
      }, r.prototype.events = {
        "click @browse": "browse",
        "change input[type='file']": "fileSelected"
      }, r.prototype.initialize = function() {
        return this.isIE() ? this.$input().css({
          visibility: "visible"
        }) : void 0
      }, r.prototype.browse = function() {
        return this.isIE() ? void 0 : this.$input().trigger("click")
      }, r.prototype.fileSelected = function() {
        var t;
        return t = this.$input().val().split(/(\\|\/)/g).pop(), this.$value().html(t), this.$el.addClass("has-active_smart_placeholder")
      }, r.prototype.isIE = function() {
        return /MSIE|Trident/.test(navigator.userAgent) && !/Opera/.test(navigator.userAgent)
      }, r
    }(Toptal.View)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    FormComponent.FormView = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      return n(r, e), r.prototype.ERROR_TOP_OFFSET = -25, r.prototype.els = {
        $submitButton: '[type="submit"]'
      }, r.prototype.events = {
        "keypress .is-invalid": "clearFieldOnFocus",
        "change .is-invalid": "clearFieldOnChange",
        clear: "clear",
        "ajax:before": "processBeforeSubmit",
        "ajax:error": "processErrorSubmit",
        "ajax:custom_error": "displayCustomErrors",
        "ajax:success": "processSubmit"
      }, r.prototype.initialize = function() {
        return this.$el.data("autoexpand-textareas") ? this.$el.find("textarea").autosize() : void 0
      }, r.prototype.processSubmit = function(t, e) {
        var n = this;
        return this.setDisabledState(!1), this.validatorFns = [], this.$el.trigger("form:after_submit", this.addValidation.bind(this)), this.displayNotifications(e), this.handleValidators().done(function() {
          return e.redirect ? n.followRedirect(e.redirect) : void 0
        })
      }, r.prototype.addValidation = function(t) {
        return this.validatorFns.push(t)
      }, r.prototype.handleValidators = function() {
        var t;
        return this.validatorFns.length ? (t = this.validatorFns.map(function(t) {
          var e, n;
          return n = t(), n && null != n.promise ? e = n : (e = $.Deferred(), n || "undefined" == typeof n ? e.resolve() : e.reject()), e
        }), $.when.apply($, t)) : $.Deferred().resolve()
      }, r.prototype.processBeforeSubmit = function() {
        return this.setDisabledState(!0), this.showLoader(), this.clear()
      }, r.prototype.processErrorSubmit = function(t, e) {
        return this.setDisabledState(!1), this.displayErrors(t, e)
      }, r.prototype.displayErrors = function(t, e) {
        var n, r;
        return this.hideLoader(), r = e.responseText, r && r.indexOf("App backtrace") > -1 ? this.displayNotifications({
          alert: r.replace(/\n/g, "<br/>")
        }) : (n = function() {
          try {
            return JSON.parse(r)
          } catch (t) {}
        }()) ? n.redirect ? this.followRedirect(n.redirect) : (this.displayNotifications(n), this.showErrors(n.errors)) : void 0
      }, r.prototype.displayCustomErrors = function(t, e) {
        return this.hideLoader(), this.showErrors(e)
      }, r.prototype.showErrors = function(t) {
        var e, n, r, o, i, a, s = this;
        a = [];
        for (o in t) r = t[o], "base" === o ? a.push([].concat(r).each(function(t) {
          return s.emit("notifications:alert", t)
        })) : (e = this.$("[name='" + this.fieldName(o) + "']"), e.addClass("is-invalid"), i = this.errorTopOffset(e), n = r.join(", "), "hidden" === e.attr("type") ? (e.parents("@checkbox_wrapper").addClass("is-invalid"), a.push(e.not(":hidden").after("<span class='error' style='top: " + i + "px' title='" + n + "'>" + n + "</span>"))) : e.hasClass("file") ? (e.parents("@file_field_wrapper").addClass("is-invalid"), a.push(e.parents("@file_field_wrapper").after("<span class='error' style='top: " + i + "px' title='" + n + "'>" + n + "</span>"))) : a.push(e.after("<span class='error' style='top: " + i + "px' title='" + n + "'>" + n + "</span>")));
        return a
      }, r.prototype.fieldName = function(t) {
        var e;
        return t = t.replace(/^user\./i, ""), (e = this.entity()) ? "" + e + "[" + t + "]" : t
      }, r.prototype.errorTopOffset = function(t) {
        var e, n;
        return n = 0, this.fieldHasSmartPlaceholder(t) && (e = t.parents(".form-field").children(".form-smart_placeholder"), "static" === e.css("position") && (n = e.height())), this.ERROR_TOP_OFFSET + n
      }, r.prototype.fieldHasSmartPlaceholder = function(t) {
        return t.parents(".form-field").hasClass("has-smart_placeholder")
      }, r.prototype.clear = function() {
        return this.$(".is-invalid").removeClass("is-invalid"), this.$(".error").remove()
      }, r.prototype.clearFieldOnChange = function(t) {
        return this.clearField($(t.currentTarget))
      }, r.prototype.clearFieldOnFocus = function(t) {
        return this.clearField($(t.currentTarget))
      }, r.prototype.clearField = function(t) {
        return t.removeClass("is-invalid").next(".error").remove()
      }, r.prototype.followRedirect = function(t) {
        return "back" === t ? window.location.reload() : window.location.replace(t)
      }, r.prototype.displayNotifications = function(t) {
        var e = this;
        return ["alert", "notice"].each(function(n) {
          return t[n] ? [].concat(t[n]).each(function(t) {
            return e.emit("notifications:" + n, t)
          }) : void 0
        })
      }, r.prototype.showLoader = function() {
        var t, e, n;
        return t = this.$submitButton(), null == (e = t.data("loader")) || t.hasClass("is-disabled") ? void 0 : (n = t.is("input") ? "val" : "text", this.initialButtonText = t[n](), t.addClass("is-disabled")[n](e))
      }, r.prototype.hideLoader = function() {
        var t, e;
        return t = this.$submitButton(), t.hasClass("is-disabled") ? (e = t.is("input") ? "val" : "text", t.removeClass("is-disabled")[e](this.initialButtonText)) : void 0
      }, r.prototype.setDisabledState = function(t) {
        return this.$el.find("@submit").attr("disabled", t)
      }, r.prototype.entity = function() {
        return this.$el.data("entity")
      }, r
    }(Toptal.View)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    FormComponent.SelectView = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      return n(r, e), r.prototype.els = {
        $label: "@label",
        $input: "@input",
        $options: "@input option"
      }, r.prototype.events = {
        "change @input": "applyLabel"
      }, r.prototype.initialize = function() {
        return this.applyLabel()
      }, r.prototype.applyLabel = function() {
        return this.$label().text(this.label())
      }, r.prototype.label = function() {
        return this.$option(this.value()).text()
      }, r.prototype.value = function() {
        return this.$input().val()
      }, r.prototype.$option = function(t) {
        return this.$options().filter("[value='" + t + "']")
      }, r
    }(Toptal.View)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    FormComponent.SmartPlaceholderView = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      return n(r, e), r.prototype.els = {
        $placeholder: "@placeholder",
        $input: ".input"
      }, r.prototype.events = {
        "click .form-smart_placeholder": "smartPlaceholderClick",
        "input input": "handleEdit",
        "input textarea": "handleEdit"
      }, r.prototype.initialize = function() {
        var t;
        if (this.placeholderSupported()) return t = this.$input().attr("placeholder"), this.$input().removeAttr("placeholder"), this.$el.prepend("<div class='form-smart_placeholder' data-role='placeholder'>" + t + "</div>"), this.renderSmartPlaceholder()
      }, r.prototype.placeholderSupported = function() {
        return Modernizr.input.placeholder
      }, r.prototype.handleEdit = function() {
        return this.placeholderSupported() ? this.renderSmartPlaceholder() : void 0
      }, r.prototype.renderSmartPlaceholder = function() {
        return this.$el.toggleClass("has-active_smart_placeholder", this.$input().val().length > 0)
      }, r.prototype.smartPlaceholderClick = function() {
        return this.$input().focus()
      }, r
    }(Toptal.View)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    this.HomeTestimonialsComponent = {}
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    HomeTestimonialsComponent.EqualHeightsBehavior = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      return n(r, e), r.prototype.els = {
        $testimonials: "@testimonial",
        $text: "@text",
        $textWrapper: "@text_wrapper"
      }, r.prototype.initialize = function() {
        return this.calculateHeight(), $(window).resize(this.calculateHeight.bind(this))
      }, r.prototype.calculateHeight = function() {
        return this.$useTextDummy(function(t) {
          var e;
          return e = this.textHeights(t).max(), this.$textWrapper().css({
            height: e
          })
        })
      }, r.prototype.textHeights = function(t) {
        var e, n, r, o, i;
        for (i = [], e = r = 0, o = this.$testimonials().length; o >= 0 ? o >= r : r >= o; e = o >= 0 ? ++r : --r) n = $(this.$testimonials()[e]).data("text"), t.text(n), i.push(t.height());
        return i
      }, r.prototype.$useTextDummy = function(t) {
        var e;
        return e = this.$textDummy(), t.call(this, e), e.remove()
      }, r.prototype.$textDummy = function() {
        var t;
        return t = this.$text().width(), this.$text().clone().css({
          position: "absolute",
          visibility: "hidden",
          width: t,
          height: "auto"
        }).appendTo("body")
      }, r
    }(Toptal.View)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    HomeTestimonialsComponent.TestimonialsView = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      return n(r, e), r.prototype.els = {
        $current: "@testimonial.is-current",
        $text: "@text",
        $textWrapper: "@text_wrapper"
      }, r.prototype.events = {
        "click @testimonial": "showTestimonial"
      }, r.prototype.initialize = function() {
        return this.equalHeightsBehavior = new HomeTestimonialsComponent.EqualHeightsBehavior({
          el: this.el
        })
      }, r.prototype.showTestimonial = function(t) {
        var e;
        return e = $(t.currentTarget), e.is(".is-current") ? void 0 : (this.clearCurrent(), e.addClass("is-current"), this.setText(e.data("text")))
      }, r.prototype.clearCurrent = function() {
        return this.$current().removeClass("is-current")
      }, r.prototype.setText = function(t) {
        var e, n;
        return n = this.$text(), e = n.clone(), e.text(t).addClass("animate-show").appendTo(this.$textWrapper()),
          function() {
            return e.removeClass("animate-show")
          }.delay(), n.addClass("animate-hide").afterTransition(function() {
            return n.remove()
          })
      }, r.prototype.text = function() {
        return this.$el.data("text")
      }, r
    }(Toptal.View)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    this.ContactsComponent = {}
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    ContactsComponent.FormView = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      return n(r, e), r.prototype.events = {
        "ajax:success": "showSuccess"
      }, r.prototype.showSuccess = function(t, e) {
        return this.$el.replaceWith(this.$successMessage(e.message))
      }, r.prototype.$successMessage = function(t) {
        return $(JST["public/components/contacts/templates/success"]({
          message: t
        }))
      }, r
    }(Toptal.View)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    this.JST || (this.JST = {}), this.JST["public/components/contacts/templates/success"] = function() {
      return this.Skim = {
          access: function(t) {
            var e;
            return e = this[t], "function" == typeof e && (e = e.call(this)), e === !0 ? [this] : e === !1 || null == e ? !1 : "[object Array]" !== Object.prototype.toString.call(e) ? [e] : 0 === e.length ? !1 : e
          },
          withContext: function(t, e) {
            var n, r;
            return n = function(t) {
              var e;
              return e = function() {}, e.prototype = t, new e
            }, t = n(t), t.safe || (t.safe = this.safe || function(t) {
              var e;
              return (null != t ? t.skimSafe : void 0) ? t : (e = new String(null != t ? t : ""), e.skimSafe = !0, e)
            }), t.isArray = Array.isArray || function(t) {
              return "[object Array]" === {}.toString.call(t)
            }, t.flatten = r = function(t) {
              var e, n, o, i;
              for (n = [], o = 0, i = t.length; i > o; o++) e = t[o], e instanceof Array ? n = n.concat(r(e)) : n.push(e);
              return n
            }, t.escape || (t.escape = this.escape || function(t) {
              return null == t ? "" : t.skimSafe || !/[&<>\"]/.test(t) ? t : this.safe(("" + t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"))
            }), e.call(t)
          }
        },
        function(t) {
          return null == t && (t = {}), Skim.withContext.call({}, t, function() {
            var t;
            return t = "", t += '<div class="contacts_success"><div class="contacts_success-inner">', t += this.escape(this.message), t += "</div></div>"
          })
        }
    }.call(this)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    this.ResumesComponent = {}
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    this.JST || (this.JST = {}), this.JST["public/components/resumes/templates/countdown-timer"] = function() {
      return this.Skim = {
          access: function(t) {
            var e;
            return e = this[t], "function" == typeof e && (e = e.call(this)), e === !0 ? [this] : e === !1 || null == e ? !1 : "[object Array]" !== Object.prototype.toString.call(e) ? [e] : 0 === e.length ? !1 : e
          },
          withContext: function(t, e) {
            var n, r;
            return n = function(t) {
              var e;
              return e = function() {}, e.prototype = t, new e
            }, t = n(t), t.safe || (t.safe = this.safe || function(t) {
              var e;
              return (null != t ? t.skimSafe : void 0) ? t : (e = new String(null != t ? t : ""), e.skimSafe = !0, e)
            }), t.isArray = Array.isArray || function(t) {
              return "[object Array]" === {}.toString.call(t)
            }, t.flatten = r = function(t) {
              var e, n, o, i;
              for (n = [], o = 0, i = t.length; i > o; o++) e = t[o], e instanceof Array ? n = n.concat(r(e)) : n.push(e);
              return n
            }, t.escape || (t.escape = this.escape || function(t) {
              return null == t ? "" : t.skimSafe || !/[&<>\"]/.test(t) ? t : this.safe(("" + t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"))
            }), e.call(t)
          }
        },
        function(t) {
          return null == t && (t = {}), Skim.withContext.call({}, t, function() {
            var t;
            return t = "", this.timerText ? (t += '<div class="resume_countdown-text">', t += this.escape(this.timerText), t += "</div>") : this.timeIsOver ? t += '<div class="resume_countdown-text is-red">Expired. Please schedule immediately.</div>' : (t += '<div class="resume_countdown-text">Time left to schedule interview:</div><div class="resume_countdown-time">', this.showDays && (t += '<span class="resume_countdown-days"><span class="resume_countdown-value">%-d</span><span class="resume_countdown-label">DAY%!D</span></span>'), t += '<span class="resume_countdown-hours"><span class="resume_countdown-value">%H</span><span class="resume_countdown-label">HR</span></span><span class="resume_countdown-minutes"><span class="resume_countdown-value">%M</span><span class="resume_countdown-label">MIN</span></span><span class="resume_countdown-seconds"><span class="resume_countdown-value">%S</span><span class="resume_countdown-label">SEC</span></span></div>'), t
          })
        }
    }.call(this)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    this.JST || (this.JST = {}), this.JST["public/components/resumes/templates/preview"] = function() {
      return this.Skim = {
          access: function(t) {
            var e;
            return e = this[t], "function" == typeof e && (e = e.call(this)), e === !0 ? [this] : e === !1 || null == e ? !1 : "[object Array]" !== Object.prototype.toString.call(e) ? [e] : 0 === e.length ? !1 : e
          },
          withContext: function(t, e) {
            var n, r;
            return n = function(t) {
              var e;
              return e = function() {}, e.prototype = t, new e
            }, t = n(t), t.safe || (t.safe = this.safe || function(t) {
              var e;
              return (null != t ? t.skimSafe : void 0) ? t : (e = new String(null != t ? t : ""), e.skimSafe = !0, e)
            }), t.isArray = Array.isArray || function(t) {
              return "[object Array]" === {}.toString.call(t)
            }, t.flatten = r = function(t) {
              var e, n, o, i;
              for (n = [], o = 0, i = t.length; i > o; o++) e = t[o], e instanceof Array ? n = n.concat(r(e)) : n.push(e);
              return n
            }, t.escape || (t.escape = this.escape || function(t) {
              return null == t ? "" : t.skimSafe || !/[&<>\"]/.test(t) ? t : this.safe(("" + t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"))
            }), e.call(t)
          }
        },
        function(t) {
          return null == t && (t = {}), Skim.withContext.call({}, t, function() {
            var t, e, n, r, o, i;
            switch (e = "", e += '<div class="resume-nav-arrow-trigger"></div><div class="resume-nav-arrow-preview"><div class="resume-nav-arrow-preview-info"><img class="resume-nav-arrow-preview-photo"', i = this.photo_url) {
              case !0:
                e += ' src="src"';
                break;
              case !1:
              case null:
                break;
              default:
                e += ' src="', e += this.escape(i), e += '"'
            }
            for (e += ' /><div class="resume-nav-arrow-preview-title"><div class="resume-nav-arrow-preview-name is-blue">', e += this.escape(this.full_name), e += '</div><div class="resume-nav-arrow-preview-since">Member since ', e += this.escape(this.member_since), e += '</div></div><div class="resume-nav-arrow-preview-tags">', o = this.skill_sets, n = 0, r = o.length; r > n; n++) t = o[n], e += '<div class="tag">', e += this.escape(t.skill_set.name), e += "</div>";
            return e += "</div></div></div>"
          })
        }
    }.call(this)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    ResumesComponent.CountdownTimerView = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      var o;
      return n(r, e), o = "public/components/resumes/templates/countdown-timer", r.prototype.els = {
        $timerWrapper: "@timer-wrapper"
      }, r.prototype.initialize = function() {
        return this.setupTimer()
      }, r.prototype.setupTimer = function() {
        var t, e, n, r = this;
        return n = this.$el.data("content"), "timer:show_countdown" === n ? (t = new Date(this.$el.data("engagement-expiration-date")), e = new Date >= t || this.$el.data("engagement-pending-expiration"), this.$timerWrapper().countdown(t, function(t) {
          return r.$timerWrapper().html(t.strftime(JST[o]({
            showDays: !!t.offset.days,
            timeIsOver: e
          })))
        })) : this.$timerWrapper().html(JST[o]({
          timerText: n
        }))
      }, r
    }(Toptal.View)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    ResumesComponent.DetailsHeightView = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      return n(r, e), r.prototype.els = {
        $cells: "cached @details-cell"
      }, r.prototype.initialize = function() {
        return this.adjustCellHeights()
      }, r.prototype.adjustCellHeights = function() {
        var t, e;
        if (!sniffFns.isMobile(navigator.userAgent)) return e = this.$cells().toArray().max(function(t) {
          return $(t).height()
        }), t = $(e).height(), this.$cells().css({
          height: t
        })
      }, r
    }(Toptal.View)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    ResumesComponent.FixedHeaderView = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      return n(r, e), r.prototype.els = {
        $emailMessageText: "@email-message-text",
        $container: "@message-container"
      }, r.prototype.events = {
        "mouseenter @email-message-text": "expandHeight",
        "mouseleave @email-message-text": "reduceHeight"
      }, r.prototype.initialize = function() {
        return 0 === this.$emailMessageText().length ? this.setupExternalFixedHeader() : (this.initialContainerHeight = this.$container().height(), this.initialMessageHeight = this.$emailMessageText().height(), this.maxMessageHeight = this.$emailMessageText().get(0).scrollHeight, this.heightDelta = this.maxMessageHeight - this.initialMessageHeight)
      }, r.prototype.setupExternalFixedHeader = function() {
        var t = this;
        return $(window).on("scroll", function() {
          var e;
          return e = $(window).scrollTop() >= t.triggerHeight(), $(".resume-fixed-header").toggleClass("is-shown", e)
        })
      }, r.prototype.triggerHeight = function() {
        var t = this;
        return this._tHeight || (this._tHeight = function() {
          var e, n, r;
          return e = $(".layout-header").innerHeight(), r = $(".resume_top-section").innerHeight(), n = t.$el.innerHeight(), e + r - n
        }())
      }, r.prototype.expandHeight = function() {
        return this.$container().animate({
          height: this.initialContainerHeight + this.heightDelta
        }), this.$emailMessageText().animate({
          height: this.maxMessageHeight
        })
      }, r.prototype.reduceHeight = function() {
        return this.$container().animate({
          height: this.initialContainerHeight
        }), this.$emailMessageText().animate({
          height: this.initialMessageHeight
        })
      }, r
    }(Toptal.View)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    ResumesComponent.NavButtonView = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      var o;
      return n(r, e), o = "public/components/resumes/templates/preview", r.prototype.events = {
        click: "leadToResume"
      }, r.prototype.initialize = function() {
        return this.url = this.$el.data("url"), this.model = new ResumesComponent.ResumeViewModel, this.model.fetchFor(this.url, this.initBlock.bind(this))
      }, r.prototype.initBlock = function(t) {
        return this.$el.html(JST[o](t)), this.slug_url = t.slug_url, this.$el.addClass("is-shown")
      }, r.prototype.leadToResume = function() {
        return null != this.slug_url ? window.location = this.slug_url : void 0
      }, r
    }(Toptal.View)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    ResumesComponent.ScrollMoreHintView = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      return n(r, e), r.prototype.events = {
        click: "disableClick"
      }, r.prototype.initialize = function() {
        return this.bindWindowEvents()
      }, r.prototype.bindWindowEvents = function() {
        return this.scroll_handler = $(window).on("scroll", this.hideScrollHint.bind(this)), $(window).on("load", _.debounce(this.showScrollHint.bind(this), 600))
      }, r.prototype.showScrollHint = function() {
        return 0 === $(window).scrollTop() ? this.$el.addClass("is-shown") : void 0
      }, r.prototype.hideScrollHint = function() {
        return this.$el.removeClass("is-shown"), $(window).off("scroll", this.scroll_handler)
      }, r.prototype.disableClick = function(t) {
        return t.preventDefault()
      }, r
    }(Toptal.View)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    ResumesComponent.TopAlignerView = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      var o;
      return n(r, e), r.prototype.TAGS_LIST_INIT_MARGIN = 25, r.prototype.HIRE_BUTTON_INIT_MARGIN = 30, o = 108, r.prototype.els = {
        $leftPanel: "@left_panel",
        $rightPanel: "@right_panel",
        $hireButton: "@hire_button",
        $tagsList: "@tags_list",
        $tags: ".tag"
      }, r.prototype.initialize = function() {
        var t = this;
        return this.$tagsList().get(0).scrollHeight > o && this.reduceTagsList(), this.showTagsList(), sniffFns.isMobile(navigator.userAgent) ? void 0 : setTimeout(function() {
          return t.leftHeight = t.$leftPanel().height(), t.rightHeight = t.$rightPanel().height(), t.leftHeight !== t.rightHeight ? t.alignHeights() : void 0
        }, 100)
      }, r.prototype.reduceTagsList = function() {
        var t;
        for (t = []; this.$tagsList().get(0).scrollHeight > o;) t.push(this.$tags().not(".is-more").slice(-1).remove());
        return t
      }, r.prototype.showTagsList = function() {
        return this.$tagsList().removeClass("is-hidden")
      }, r.prototype.alignHeights = function() {
        var t;
        return this.leftHeight > this.rightHeight ? (t = this.TAGS_LIST_INIT_MARGIN + (this.leftHeight - this.rightHeight), this.$tagsList().css({
          "margin-top": t
        })) : (t = this.HIRE_BUTTON_INIT_MARGIN + (this.rightHeight - this.leftHeight), this.$hireButton().css({
          "margin-top": t
        }))
      }, r
    }(Toptal.View)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    ResumesComponent.ResumeViewModel = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      return n(r, e), r.prototype.fetchFor = function(t, e) {
        return $.ajax({
          url: t,
          type: "GET",
          success: function(t) {
            return t.slug_url && "function" == typeof e ? e(t) : void 0
          }
        })
      }, r
    }(Frames.ViewModel)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    this.VideoEmbedComponent = {}
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    VideoEmbedComponent.EmbedLinkView = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      return n(r, e), r.prototype.events = {
        click: "show"
      }, r.prototype.initialize = function() {
        var t;
        return t = navigator.userAgent, sniffFns.isMobile(t) || sniffFns.isIpad(t) || this.autoplay() ? this.show() : void 0
      }, r.prototype.show = function() {
        var t;
        return t = this.videoHtml(), this.$el.addClass("have-embedded_player"), this.$el.html(t)
      }, r.prototype.videoHtml = function() {
        var t;
        switch (t = this.id(), this.type()) {
          case "vimeo":
            return this.vimeoHtml(t, "100%", this.height());
          case "youtube":
            return this.youtubeHtml(t, "100%", this.height())
        }
      }, r.prototype.height = function() {
        return this.$el.height()
      }, r.prototype.type = function() {
        return this.$el.data("type")
      }, r.prototype.id = function() {
        return this.$el.data("id")
      }, r.prototype.autoplay = function() {
        return this.$el.data("autoplay")
      }, r.prototype.vimeoHtml = function(t, e, n, r) {
        var o;
        return null == r && (r = !0), o = r ? 1 : 0, "<iframe src='//player.vimeo.com/video/" + t + "?byline=0&amp;portrait=0&amp;color=ffffff&amp;autoplay=" + o + "' width='" + e + "' height='" + n + "' frameborder='0' webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>"
      }, r.prototype.youtubeHtml = function(t, e, n, r) {
        var o;
        return null == r && (r = !0), o = r ? 1 : 0, "<iframe src='http://www.youtube.com/embed/" + t + "?autoplay=" + o + "&color=white&hd=1&wmode=opaque' type='text/html' width='" + e + "' height='" + n + "' frameborder='0' webkitallowfullscreen mozallowfullscreen allowfullscreen />"
      }, r
    }(Toptal.View)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    this.BlogVideoComponent = {}
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    BlogVideoComponent.BlogVideoView = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      return n(r, e), r.prototype.els = {
        $videoWrapper: "@video_wrapper",
        $video: "@video",
        $youtubePlaceholder: "@youtube_placeholder",
        $captions: "@captions",
        $captionsBody: "@captions_body",
        $captionItems: "@captions_item",
        $autoScrollToggleCheckbox: "@checkbox"
      }, r.prototype.events = {
        "click @video": "play",
        "click @captions_item": "activateClickedItem",
        "change @checkbox": "toggleAutoScroll"
      }, r.prototype.initialize = function() {
        var t;
        return this.captionsEnabled = !(sniffFns.isMobile(navigator.userAgent) || sniffFns.isIpad(navigator.userAgent)), this.captionsEnabled && this.$captions().addClass("enabled"), this.autoScrollEnabled = !0, this.videoHeight = this.$videoWrapper().height(), this.playerDOMId = "video-" + this.videoId(), this.$youtubePlaceholder().attr("id", this.playerDOMId), this.cacheCaptionItems(), this.setUpYouTubeAPI(), t = _.throttle(this.disableAutoScroll.bind(this), 100), this.$captionsBody().on("mousewheel", t), this.$captionsBody().on("wheel", t)
      }, r.prototype.cacheCaptionItems = function() {
        var t;
        return this.captionItems = [], t = this.$captionItems(), t.length ? t.each(this.cacheCaptionItem.bind(this)) : this.captionsEnabled = !1
      }, r.prototype.cacheCaptionItem = function(t, e) {
        var n;
        return n = $(e), this.captionItems.push({
          $el: n,
          start: n.data("start-ts"),
          end: n.data("end-ts"),
          id: n.data("id")
        })
      }, r.prototype.setUpYouTubeAPI = function() {
        return $.getScript("https://www.youtube.com/iframe_api", this.enablePlayButton.bind(this))
      }, r.prototype.enablePlayButton = function() {
        return this.$video().addClass("active"), this.playBackEnabled = !0, this.captionsEnabled ? void 0 : this.play()
      }, r.prototype.play = function() {
        return this.playBackEnabled ? this.renderYouTubePlayer() : void 0
      }, r.prototype.renderYouTubePlayer = function(t) {
        var e;
        return null == t && (t = 0), null != (null != (e = window.YT) ? e.Player : void 0) ? this.player = new YT.Player(this.playerDOMId, {
          height: this.videoHeight,
          width: "100%",
          playerVars: {
            autoplay: 1,
            color: "white",
            wmode: "opaque",
            start: Math.floor(t / 1e3),
            hd: 1
          },
          videoId: this.videoId(),
          events: {
            onStateChange: this.onPlayerStateChange.bind(this)
          }
        }) : void 0
      }, r.prototype.onPlayerStateChange = function(t) {
        return this.videoState = t.data, this.syncActive = this.videoState === YT.PlayerState.PLAYING, this.captionsEnabled ? this.startCaptionsSyncrhonizer() : void 0
      }, r.prototype.startCaptionsSyncrhonizer = function() {
        return this.synchronizerStarted ? void 0 : (setInterval(this.synchronizerTick.bind(this), 200), this.synchronizerStarted = !0)
      }, r.prototype.synchronizerTick = function() {
        return this.syncActive && null != this.player ? this.activateCurrentItem(this.player.getCurrentTime()) : void 0
      }, r.prototype.activateClickedItem = function(t) {
        var e, n;
        return e = $(t.target).data("id"), n = this.captionItems.find(function(t) {
          return t.id === e
        }), null != n ? this.synchronizerStarted ? (this.activateItem(n), this.player.seekTo(n.start / 1e3)) : this.playBackEnabled ? this.renderYouTubePlayer(n.start) : void 0 : void 0
      }, r.prototype.activateCurrentItem = function(t) {
        var e;
        return t = 1e3 * t, e = this.captionItems.find(function(e) {
          return e.start <= t && t <= e.end
        }), null != e ? this.activateItem(e) : void 0
      }, r.prototype.activateItem = function(t) {
        var e, n, r;
        return null != this.currentItem && this.currentItem.id !== t.id && this.deactivateItem(this.currentItem), n = t.$el, e = this.$captionsBody(), n.addClass("active"), this.autoScrollEnabled && (r = e.scrollTop() + n.position().top - e.position().top - e.height() / 2, e.animate({
          scrollTop: r
        }, 200)), this.currentItem = t
      }, r.prototype.deactivateItem = function(t) {
        return t.$el.removeClass("active")
      }, r.prototype.toggleAutoScroll = function() {
        return this.autoScrollEnabled = !this.autoScrollEnabled, this.renderAutoScrollComponent()
      }, r.prototype.disableAutoScroll = function() {
        return this.autoScrollEnabled = !1, this.renderAutoScrollComponent(), !0
      }, r.prototype.renderAutoScrollComponent = function() {
        return this.$autoScrollToggleCheckbox().prop("checked", this.autoScrollEnabled).trigger("flagchanged")
      }, r.prototype.videoId = function() {
        return this.$el.data("id")
      }, r
    }(Toptal.View)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    this.ClientsShowcaseComponent = {}
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    ClientsShowcaseComponent.ClientHoverBehavior = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      return n(r, e), r.prototype.events = {
        mouseenter: "addHoverClass",
        mouseleave: "removeHoverClass"
      }, r.prototype.initialize = function(t) {
        return this.$target = t.$target
      }, r.prototype.addHoverClass = function() {
        return this.$target.addClass("is-hovered")
      }, r.prototype.removeHoverClass = function() {
        return this.$target.removeClass("is-hovered")
      }, r
    }(Toptal.View)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    ClientsShowcaseComponent.ClientsShowcaseView = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      return n(r, e), r.prototype.els = {
        $showcase: "cached @showcase"
      }, r.prototype.initialize = function() {
        return Modernizr.cssgradients ? this.createLinksOverlay() : void 0
      }, r.prototype.createLinksOverlay = function() {
        var t;
        return t = this.$showcase().clone(), t.css({
          position: "absolute",
          zIndex: 10,
          opacity: 0,
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }).appendTo(this.$el), this.addHoverBehaviors(t)
      }, r.prototype.addHoverBehaviors = function(t) {
        var e;
        return e = t.find("@client"), this.$showcase().find("@client").each(function(t, n) {
          var r, o;
          return r = $(n), o = e[t], new ClientsShowcaseComponent.ClientHoverBehavior({
            el: o,
            $target: r
          })
        })
      }, r
    }(Toptal.View)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    this.SkillDeveloperComponent = {}
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    SkillDeveloperComponent.TagsView = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      var o;
      return n(r, e), r.attr("rowsLimit"), r.attr("tagModifier"), r.attr("moreUrl"), o = '<a class="tag is-more {{modifier}}" data-role="more" href="{{more_url}}">+<span data-role="count">99</span> more</a>', r.prototype.els = {
        $tags: "@tag",
        $showMore: "@more",
        $showMoreCount: "@more @count"
      }, r.prototype.events = {
        "click @more": "showTags"
      }, r.prototype.initialize = function() {
        return this.setRowsLimit(this.$el.data("rows") || 2), this.setTagModifier(this.$el.data("tag-modifier") || ""), this.setMoreUrl(this.$el.data("more-url") || "#"), this.showMoreButtonIsNeeded() && this.applyShowMoreButton(), this.$el.trigger("tags:processed")
      }, r.prototype.applyShowMoreButton = function() {
        return this.appendShowMoreButton(), this.hideExtraTags(), this.applyCollapsedState()
      }, r.prototype.appendShowMoreButton = function() {
        var t;
        return t = o.replace("{{modifier}}", this.getTagModifier()).replace("{{more_url}}", this.getMoreUrl()), this.$el.append(t)
      }, r.prototype.hideExtraTags = function() {
        var t, e, n;
        return e = this.$tags().length, n = this.calculateCountOfVisibleTags(), t = n - 1, $(this.$tags()[t]).nextAll("@tag").addClass("is-extra"), this.$showMoreCount().text(e - n)
      }, r.prototype.calculateCountOfVisibleTags = function() {
        var t, e, n, r;
        for (r = this.$el.width(), t = this.$el.clone(), t.css({
            opacity: 0,
            width: r
          }).appendTo("body"), n = this.rowsCount(); n > 2 && t.find("@tag").length > 0;) t.find("@tag:last").remove(), n = t.outerHeight() / this.tagHeightWithMargin();
        return e = t.find("@tag").length, t.remove(), e
      }, r.prototype.applyCollapsedState = function() {
        return this.$el.addClass("is-collapsed")
      }, r.prototype.showTags = function() {
        return "#" === this.$showMore().attr("href") ? (this.$el.removeClass("is-collapsed"), this.$showMore().remove(), !1) : void 0
      }, r.prototype.showMoreButtonIsNeeded = function() {
        return this.rowsCount() > this.getRowsLimit()
      }, r.prototype.rowsCount = function() {
        return this.containerHeight() / this.tagHeightWithMargin()
      }, r.prototype.containerHeight = function() {
        return this.$el.outerHeight()
      }, r.prototype.tagHeightWithMargin = function() {
        var t = this;
        return this._tagHeightWithMargin || (this._tagHeightWithMargin = function() {
          var e, n;
          return n = parseInt(t.$firstTag().css("marginTop")), e = parseInt(t.$firstTag().css("marginBottom")), t.$firstTag().outerHeight() + n + e
        }())
      }, r.prototype.$firstTag = function() {
        return this._$firstTag || (this._$firstTag = this.$tags().filter(":first"))
      }, r
    }(Toptal.View)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    this.NotificationsComponent = {}
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    NotificationsComponent.NotificationView = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      var o, i;
      return n(r, e), i = '<div class="notification is-hidden">\n  <div class="notification-inner">\n    <div class="notification-message" data-role="message"></div>\n    <a class="notification-close" href="#" data-role="close">\n      <span class="notification-close_charcon">\xd7</span>\n      <span class="notification-close_counter" data-role="counter"></span>\n    </a>\n  </div>\n</div>', o = 5e3, r.prototype.els = {
        $message: "@message",
        $counter: "@counter"
      }, r.prototype.events = {
        "click @close": "stopAndHide",
        mouseenter: "pause",
        mouseleave: "continue"
      }, r.prototype.initialize = function(t) {
        return this.options = t, this.options.message.on("hide", this.stopAndHide.bind(this)), this.renderTo(this.options.$container)
      }, r.prototype.renderTo = function() {
        var t, e = this;
        return t = $(i), this.setElement(t), t.addClass("is-" + this.options.type), this.setMessage(this.options.message.body), t.appendTo(this.options.$container),
          function() {
            return t.removeClass("is-hidden").afterTransition(function() {
              return e.start()
            })
          }.delay(0)
      }, r.prototype.start = function() {
        var t, e, n, r = this;
        return t = this.options.message.delay || o, n = Math.round(t / 1e3), e = function() {
          return r.isPaused() ? void 0 : (n--, r.updateCounter(n), 0 === n ? r.stopAndHide() : void 0)
        }, this.timer = setInterval(e, 1e3)
      }, r.prototype.stop = function() {
        return clearInterval(this.timer)
      }, r.prototype.hide = function() {
        return this.$el.addClass("is-hidden").afterTransition(function() {
          return $(this).remove()
        })
      }, r.prototype.stopAndHide = function() {
        return this.stop(), this.hide(), !1
      }, r.prototype.setMessage = function(t) {
        return this.$message().html(t)
      }, r.prototype.updateCounter = function(t) {
        return this.$counter().text(t)
      }, r.prototype.messageOptions = function() {
        return this.options.message.options
      }, r.prototype.pause = function() {
        return this._paused = !0
      }, r.prototype["continue"] = function() {
        return this._paused = !1
      }, r.prototype.isPaused = function() {
        return this._paused
      }, r
    }(Toptal.View)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    NotificationsComponent.ServiceView = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      return n(r, e), r.prototype.initialize = function() {
        return this.listen("notifications:", this["new"], {
          delayed: !0
        }), this.emitServerMessages()
      }, r.prototype["new"] = function(t, e) {
        return new NotificationsComponent.NotificationView({
          type: t,
          message: e,
          $container: this.$el
        })
      }, r.prototype.emitServerMessages = function() {
        var t, e, n, r;
        n = "undefined" != typeof gon && null !== gon ? gon.flash : void 0, r = [];
        for (e in n) t = n[e], r.push(this.emit("notifications:" + e, t));
        return r
      }, r
    }(Toptal.View)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    this.BlogSubscribeComponent = {}
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    BlogSubscribeComponent.SubscribeView = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      var o;
      return n(r, e), o = "Subscribing...", r.attr("default_submit_text"), r.prototype.els = {
        $successTemplate: "@success_template",
        $emailInput: "@email",
        $submit: "@submit"
      }, r.prototype.events = {
        "ajax:before": "prepareSubmit",
        "ajax:success": "renderSuccess",
        "ajax:error": "renderError"
      }, r.prototype.initialize = function() {
        return this.cacheDefaultSubmitText()
      }, r.prototype.cacheDefaultSubmitText = function() {
        return this.setDefaultSubmitText(this.$submit().val())
      }, r.prototype.revertSubmitText = function() {
        return this.$submit().val(this.getDefaultSubmitText())
      }, r.prototype.prepareSubmit = function() {
        var t = this;
        return this.$submit().hasClass("is-disabled") ? !1 : (setTimeout(function() {
          return t.$emailInput().prop({
            disabled: !0
          })
        }, 0), this.$submit().addClass("is-disabled").val(o))
      }, r.prototype.renderSuccess = function() {
        var t;
        return window.googleAnalytics.trackBlogSubscription(this.blockPlacement()), window.optimizely = window.optimizely || [], window.optimizely.push(["trackEvent", "blog_subscription"]), this.trackBounceExchange(), t = $(this.$successTemplate().data("template").html), this.$html(this.$el, t), this.initSocialButtons()
      }, r.prototype.trackBounceExchange = function() {
        return window.bouncex ? window.bouncex.report_conversion({
          order_id: 0,
          amount: 1,
          email: this.getEmail()
        }) : void 0
      }, r.prototype.renderError = function(t, e) {
        var n;
        return n = JSON.parse(e.responseText).error, this.emit("notifications:alert", n), this.$submit().removeClass("is-disabled").val(this.getDefaultSubmitText()), this.$emailInput().prop({
          disabled: !1
        })
      }, r.prototype.isBlank = function() {
        return this.getEmail().isBlank()
      }, r.prototype.getEmail = function() {
        return this.$emailInput().val()
      }, r.prototype.blockPlacement = function() {
        return this.$el.data("placement")
      }, r.prototype.initSocialButtons = function() {
        var t = this;
        return function() {
          var e;
          return e = t.$el[0], "undefined" != typeof FB && null !== FB && FB.XFBML.parse(e), "undefined" != typeof twttr && null !== twttr && twttr.widgets.load(e), "undefined" != typeof gapi && null !== gapi ? gapi.plusone.go(e) : void 0
        }.delay(200)
      }, r
    }(Toptal.View)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    this.AwesomeDevelopersComponent = {}
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    AwesomeDevelopersComponent.DisabledEditingView = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      return n(r, e), r.prototype.els = {
        $input: "input"
      }, r.prototype.events = {
        "click input": "selectInputText",
        "cut input": "disableKeypress",
        "keypress input": "disableKeypress",
        "paste input": "disableKeypress"
      }, r.prototype.initialize = function() {
        return this.inputValue = this.$input().val()
      }, r.prototype.disableKeypress = function(t) {
        var e, n = this;
        return e = $(t.currentTarget), setImmediate(function() {
          return e.val(n.inputValue), n.$input().focus().select()
        })
      }, r.prototype.selectInputText = function() {
        return this.$input().select()
      }, r
    }(Toptal.View)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    AwesomeDevelopersComponent.FormView = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      return n(r, e), r.prototype.els = {
        $firstTextInput: 'input[type="text"]:first',
        $form: "form",
        $button: ".button"
      }, r.prototype.events = {
        "ajax:success form": "renderForm",
        "ajax:before form": "validateSelect",
        "submit form": "trackClick"
      }, r.prototype.renderForm = function(t, e) {
        var n, r = this;
        if (e.success) return n = $(e.html).hide(), this.$html(this.$el, n), n.fadeIn("slow", function() {
          return r.$firstTextInput().focus().select()
        })
      }, r.prototype.validateSelect = function(t) {
        var e, n, r;
        return e = this.$(t.currentTarget).find(".select.required"), e.length && e.val().isBlank() ? (r = e.attr("name").match(/\[(\w+)\]$/)[1], n = {}, n[r] = ["You can't leave this empty"], this.$form().trigger("ajax:custom_error", n), !1) : void 0
      }, r.prototype.trackClick = function() {
        return window.googleAnalytics.trackButtonClick(this.$button().data("button-id"))
      }, r
    }(Toptal.View)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    AwesomeDevelopersComponent.HashFieldView = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      return n(r, e), r.prototype.els = {
        $hashField: "cached @hash_field",
        $hint: "cached .hint"
      }, r.prototype.events = {
        "keydown @hash_field": "updateHint",
        "keyup @hash_field": "updateHint",
        "paste @hash_field": "updateHint",
        "change @hash_field": "updateHint",
        "focus @hash_field": "updateHint"
      }, r.prototype.initialize = function() {
        return this.initialHintHtml = this.$hint().html(), this.$el.closest("form").on("ajax:before", this.validateHash.bind(this))
      }, r.prototype.validateHash = function() {
        var t, e, n;
        return n = this.$hashField().val(), e = this.filterHashValue(n), this.$hashField().val(e), e.isBlank() ? (t = this.$hashField().closest("form"), t.trigger("ajax:custom_error", {
          slug: ["We can't build your link"]
        }), !1) : !0
      }, r.prototype.updateHint = function() {
        var t;
        return t = this.$hashField().val(), this.$hint().html((t = this.filterHashValue(t)).isBlank() ? this.initialHintHtml : 'Link preview:<br>\n<div class="text_overflow">www.toptal.com/' + this.blogCategoryTitle() + "#" + t + "</div>")
      }, r.prototype.filterHashValue = function(t) {
        return t.replace(/\W+/g, "-").replace(/(^\W+|\W+$)/g, "").toLowerCase()
      }, r.prototype.blogCategoryTitle = function() {
        return this.$hashField().data("blog-category")
      }, r
    }(Toptal.View)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    AwesomeDevelopersComponent.ShowAwesomeView = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      return n(r, e), r.prototype.initialize = function() {
        var t, e;
        return t = window.location.hash.substring(1).trim(), t.isBlank() || document.getElementById(t) ? void 0 : (e = window.location.pathname + ".json", $.getJSON(e, {
          awesome_slug: t,
          http_referrer: document.referrer
        }).done(this.renderDevelopersList.bind(this)).done(this.showNotifications.bind(this)))
      }, r.prototype.renderDevelopersList = function(t) {
        return t.html ? this.$html(this.$el, t.html) : void 0
      }, r.prototype.showNotifications = function(t) {
        var e = this;
        return ["alert", "notice"].each(function(n) {
          return t[n] ? e.emit("notifications:" + n, t[n]) : void 0
        })
      }, r
    }(Toptal.View)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    AwesomeDevelopersComponent.TrimDevelopersView = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      return n(r, e), r.prototype.els = {
        $developers: "@developer",
        $developersWrapper: "@developers-wrapper",
        $extraWrapper: "@extra-wrapper",
        $body: "@content-body"
      }, r.prototype.initialize = function() {
        return sniffFns.isMobile(navigator.userAgent) || sniffFns.isIpad(navigator.userAgent) ? void this.showDevelopers() : (this.developersArray = $.makeArray(this.$developers()), this.checkHeights())
      }, r.prototype.checkHeights = function() {
        return this.bodyHeight = this.$body().height(), this.sidebarHeight = this.$extraWrapper().height() + this.$developersWrapper().height() - 200, this.sidebarHeight > this.bodyHeight ? this.balanceHeights() : this.showDevelopers()
      }, r.prototype.balanceHeights = function() {
        for (var t; this.sidebarHeight > this.bodyHeight && this.developersArray.length > 0;) t = $(this.developersArray.pop()), this.sidebarHeight -= t.height(), t.remove();
        return this.showDevelopers()
      }, r.prototype.showDevelopers = function() {
        return this.$developersWrapper().addClass("is-visible")
      }, r
    }(Toptal.View)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    AwesomeDevelopersComponent.TrimTestimonialsView = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      return n(r, e), r.prototype.els = {
        $testimonials: ".skill_testimonial",
        $testimonialsWrapper: "@testimonials-wrapper",
        $developersWrapper: "@developers-wrapper",
        $hiringWrapper: "@hiring-wrapper",
        $developersSkills: ".skill_developer-skills"
      }, r.prototype.initialize = function() {
        var t = this;
        return sniffFns.isMobile(navigator.userAgent) || sniffFns.isIpad(navigator.userAgent) ? void this.$testimonialsWrapper().addClass("is-visible") : (this.testimonialsArray = $.makeArray(this.$testimonials()), this.developersReady().done(function() {
          return t.checkHeights()
        }))
      }, r.prototype.developersReady = function() {
        var t;
        return t = $.makeArray(this.$developersSkills()).map(function(t) {
          return $.Deferred(function(e) {
            var n, r;
            return n = $(t), r = setTimeout(function() {
              return e.resolve()
            }, 100), n.on("tags:processed", function() {
              return clearTimeout(r), e.resolve()
            })
          }).promise()
        }), $.when.apply($, t)
      }, r.prototype.checkHeights = function() {
        return this.developersHeight = this.$developersWrapper().height(), this.testimonialsHeight = this.$testimonialsWrapper().height() + this.$hiringWrapper().height(), this.testimonialsHeight > this.developersHeight ? this.balanceHeight() : this.$testimonialsWrapper().addClass("is-visible")
      }, r.prototype.balanceHeight = function() {
        var t, e, n, r, o;
        for (o = []; this.testimonialsHeight > this.developersHeight;) t = $(this.testimonialsArray.pop()), e = t.outerHeight(!0), this.testimonialsHeight -= e, o.push({
          $el: t.detach(),
          height: e
        });
        return n = this.developersHeight - this.testimonialsHeight, r = o.find(function(t) {
          return t.height < n
        }), r && this.$testimonialsWrapper().append(r.$el), this.$testimonialsWrapper().addClass("is-visible")
      }, r
    }(Toptal.View)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    this.BadDevelopersComponent = {}
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    BadDevelopersComponent.HeroView = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      var o, i, a;
      return n(r, e), i = 36, o = 8e3, a = ["projects", "teams", "investments", "startups"], r.prototype.els = {
        $motto: "@motto",
        $mottoLabels: "@motto_label",
        $mottoTextVersions: "@motto_text_version",
        $images: "@image"
      }, r.prototype.initialize = function() {
        return this.versions = a, this.animateMottoLabelWidth(), this.refresh.bind(this).every(o)
      }, r.prototype.getNextVersion = function() {
        return this.versions.push(this.versions.shift()), this.versions[0]
      }, r.prototype.animateMottoLabelWidth = function() {
        return this.$motto().css("width", this.$mottoLabels().filter(".is-active").outerWidth() + i)
      }, r.prototype.refresh = function() {
        var t;
        return t = this.getNextVersion(), this.$mottoLabels().removeClass("is-active").filter("[data-id='" + t + "']").addClass("is-active"), this.$mottoTextVersions().removeClass("is-active").filter("[data-id='" + t + "']").addClass("is-active"), this.animateMottoLabelWidth(), this.$images().removeClass("is-active").filter("[data-id='" + t + "']").addClass("is-active")
      }, r
    }(Toptal.View)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    this.CompaniesApplyComponent = {}
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    CompaniesApplyComponent.CompaniesApplyView = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      var o, i;
      return n(r, e), o = '<div class="modal-form_disabled_overlay"></div>', i = '<input type="hidden" name="geofix_flag" value="1">', r.prototype.els = {
        $form: "form#new_company",
        $countriesList: ".signup_country_list-countries"
      }, r.prototype.events = {
        "click @enableFormLink": "enableForm",
        "click @showCountriesLink": "toggleShowCountries",
        "form:after_submit form": "ensureOptimizelyTracking"
      }, r.attr("disabledOverlay"), r.prototype.toggleShowCountries = function(t) {
        return t.preventDefault(), $(t.target).blur(), this.$countriesList().css(this.$countriesList().toggleClass("closed").hasClass("closed") ? {
          height: 0
        } : {
          height: "auto"
        })
      }, r.prototype.initialize = function() {
        return this.$form().hasClass("disabled") ? this.disableForm() : void 0
      }, r.prototype.disableForm = function() {
        return this.$form().find("input").prop("disabled", !0), this.createOverlay()
      }, r.prototype.enableForm = function(t) {
        return t.preventDefault(), this.$form().find("input").prop("disabled", !1), this.hideOverlay(), this.setGeofixHiddenAttr(), this.$form().find("input:visible:first").focus()
      }, r.prototype.createOverlay = function() {
        return this.$disabledOverlay = $(o).appendTo(this.$form())
      }, r.prototype.hideOverlay = function() {
        return this.$disabledOverlay.remove()
      }, r.prototype.setGeofixHiddenAttr = function() {
        return $(i).appendTo(this.$form())
      }, r.prototype.trackOptimizelyEvent = function() {
        return $.Deferred(function(t) {
          return null != window.optimizely && window.optimizely.push(["trackEvent", "new_lead_via_company_apply"]), setTimeout(function() {
            return t.resolve()
          }, 200)
        })
      }, r.prototype.ensureOptimizelyTracking = function(t, e) {
        return e(this.trackOptimizelyEvent.bind(this))
      }, r
    }(Toptal.View)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    this.ReviewsComponent = {}
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    ReviewsComponent.ListView = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      return n(r, e), r.prototype.MIN_TIME = .2, r.prototype.MAX_TIME = .7, r.prototype.els = {
        $reviews: "@reviews-item"
      }, r.prototype.initialize = function() {
        return this.prefixedCssProperty = Modernizr.prefixed("animationDuration"), this.allIsShown = !1, Modernizr.cssanimations && !sniffFns.isMobile(navigator.userAgent) ? (this.prepareBlocks(), this.bindWindowEvents(), this.updateValues()) : this.showAll()
      }, r.prototype.calculateHeight = function(t) {
        var e;
        return e = 0, t.find(".reviews_list-item_wrapper").each(function(t, n) {
          var r, o;
          return r = $(n), o = r.data(), o.height || (o.height = r.height(), r.data("height", o.height)), e += o.height
        }), e
      }, r.prototype.swapBlocks = function(t, e, n) {
        var r, o, i, a;
        for (r = [], a = 0; n - a > 300;) o = t.find(".reviews_list-item_wrapper:last").detach(), i = o.data("height"), r.push(o), a += i, n -= i;
        return e.append(r)
      }, r.prototype.prepareBlocks = function() {
        var t, e, n, r, o;
        return t = this.$el.find(".reviews_column"), e = t.eq(0), r = t.eq(1), n = this.calculateHeight(e), o = this.calculateHeight(r), n > o ? this.swapBlocks(e, r, n - o) : void 0
      }, r.prototype.bindWindowEvents = function() {
        return $(window).on("scroll", _.throttle(this.scrollHandler.bind(this), 200)), $(window).on("resize", _.debounce(this.updateValues.bind(this), 1e3))
      }, r.prototype.updateValues = function() {
        var t = this;
        return this.windowHeight = $(window).height(), this.$reviews().each(function(e, n) {
          var r, o;
          return r = $(n), r.data("offsetTop", r.offset().top), o = Math.random() * (t.MAX_TIME - t.MIN_TIME) + t.MIN_TIME, r.css(t.prefixedCssProperty, o + "s")
        })
      }, r.prototype.showAll = function() {
        return this.$reviews().addClass("is-visible")
      }, r.prototype.scrollHandler = function() {
        var t;
        return this.allIsShown ? !1 : (t = $(window).scrollTop() + this.windowHeight, this.$reviews().each(function(e, n) {
          var r;
          return r = $(n), r.data("offsetTop") <= t ? r.addClass("is-animated") : void 0
        }), this.$reviews().length === this.$reviews().filter(".is-animated").length ? this.allIsShown = !0 : void 0)
      }, r
    }(Toptal.View)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    this.HandbookComponent = {}
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    HandbookComponent.ExpandableView = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      return n(r, e), r.prototype.els = {
        $itemsList: "@items_list"
      }, r.prototype.events = {
        "click @expand_trigger": "handleClick"
      }, r.prototype.initialize = function() {
        return $(window).on("resize", _.debounce(this.updateHeight.bind(this), 500))
      }, r.prototype.updateHeight = function() {
        return this.$el.hasClass("is-expanded") ? this.$itemsList().css({
          height: "auto"
        }) : this.$itemsList().data("height", null)
      }, r.prototype.handleClick = function() {
        var t, e;
        if (!sniffFns.isMobile(navigator.userAgent)) return e = this.$itemsList(), t = e.data().height, t || (e.css({
          display: "block",
          position: "absolute",
          visibility: "hidden",
          height: "auto"
        }), t = e.height(), e.data("height", t).removeAttr("style")), e.height(this.$el.toggleClass("is-expanded").hasClass("is-expanded") ? t : 0)
      }, r
    }(Toptal.View)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    this.CoreTeamJobsComponent = {}
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    this.JST || (this.JST = {}), this.JST["public/components/core_team_jobs/templates/map_popup"] = function() {
      return this.Skim = {
          access: function(t) {
            var e;
            return e = this[t], "function" == typeof e && (e = e.call(this)), e === !0 ? [this] : e === !1 || null == e ? !1 : "[object Array]" !== Object.prototype.toString.call(e) ? [e] : 0 === e.length ? !1 : e
          },
          withContext: function(t, e) {
            var n, r;
            return n = function(t) {
              var e;
              return e = function() {}, e.prototype = t, new e
            }, t = n(t), t.safe || (t.safe = this.safe || function(t) {
              var e;
              return (null != t ? t.skimSafe : void 0) ? t : (e = new String(null != t ? t : ""), e.skimSafe = !0, e)
            }), t.isArray = Array.isArray || function(t) {
              return "[object Array]" === {}.toString.call(t)
            }, t.flatten = r = function(t) {
              var e, n, o, i;
              for (n = [], o = 0, i = t.length; i > o; o++) e = t[o], e instanceof Array ? n = n.concat(r(e)) : n.push(e);
              return n
            }, t.escape || (t.escape = this.escape || function(t) {
              return null == t ? "" : t.skimSafe || !/[&<>\"]/.test(t) ? t : this.safe(("" + t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"))
            }), e.call(t)
          }
        },
        function(t) {
          return null == t && (t = {}), Skim.withContext.call({}, t, function() {
            var t;
            return t = "", t += '<div class="contacts_popup"><div class="contacts_popup-logo"></div><header class="contacts_popup-legal">Toptal, LLC</header><p class="contacts_popup-address">548 Market St #36879<br />San Francisco<br />CA 94104-5401</p></div>'
          })
        }
    }.call(this)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    CoreTeamJobsComponent.MapViewModel = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      return n(r, e), r.prototype.options = function() {
        return {
          zoom: this._zoom(),
          scrollwheel: !1,
          streetViewControl: !1,
          mapTypeControl: !1,
          styles: this._mapStyles()
        }
      }, r.prototype.popupTemplate = function() {
        return "public/components/core_team_jobs/templates/map_popup"
      }, r.prototype.markerPath = function() {
        return "//assets.toptal.io/assets/public/blocks/core_team_jobs/map/marker-a3bfd0b84cbd53bf7d92dcb7dff1294c.png"
      }, r.prototype.markerWidth = function() {
        return 29
      }, r.prototype.markerHeight = function() {
        return 45
      }, r.prototype.center = function() {
        return {
          lat: 49.81749199999999,
          lng: 15.472962000000052
        }
      }, r.prototype.cities = function() {
        return {
          "Moscow, Russia": [55.755826, 37.6173],
          "Krasnoyarsk, Russia": [56.01528339999999, 92.8932476],
          "Omsk, Russia": [54.98333299999999, 73.366667],
          "San Francisco, USA": [37.7749295, -122.41941550000001],
          "Zhytomyr, Ukraine": [50.25465, 28.658667000000037],
          "Kharkiv, Ukraine": [49.9935, 36.230383000000074],
          "Gda\u0144sk, Poland": [54.35202520000001, 18.64663840000003],
          "Minsk, Belarus": [53.9, 27.566667000000052],
          "Pardubice, Czech Republic": [50.0343092, 15.781199399999991],
          "Colima, Mexico": [19.2452342, -103.72408680000001],
          "Sofia, Bulgaria": [42.6977082, 23.321867500000053],
          "Ho Chi Minh, Vietnam": [10.8230989, 106.6296638],
          "Warsaw, Poland": [52.2296756, 21.012228700000037],
          "Zagreb, Croatia": [45.8150108, 15.981919000000062],
          "Kazan, Russia": [55.790278, 49.13472200000001],
          "Saint Petersburg, Russia": [59.9342802, 30.335098600000038],
          "Saratov, Russia": [51.533333, 46.016666999999984],
          "Barcelona, Spain": [41.3850639, 2.1734034999999494],
          "Belgrade, Serbia": [44.786568, 20.44892159999995],
          "Bangkok, Thailand": [13.7563309, 100.50176510000006],
          "New York, USA": [40.7127837, -74.00594130000002],
          "C\xf3rdoba, Argentina": [-31.3989296, -64.18212890000001],
          "S\xe3o Jos\xe9 dos Campos, Brazil": [-23.223701, -45.900907399999994],
          "Missoula, USA": [46.8625, -114.01166699999999]
        }
      }, r.prototype._zoom = function() {
        return sniffFns.isMobile(navigator.userAgent) ? 1 : 2
      }, r.prototype._mapStyles = function() {
        return [{
          featureType: "all",
          elementType: "labels",
          stylers: [{
            visibility: "off"
          }]
        }, {
          featureType: "landscape",
          elementType: "all",
          stylers: [{
            visibility: "on"
          }, {
            color: "#f3f4f4"
          }]
        }, {
          featureType: "landscape.man_made",
          elementType: "geometry",
          stylers: [{
            weight: .9
          }, {
            visibility: "off"
          }]
        }, {
          featureType: "poi.park",
          elementType: "geometry.fill",
          stylers: [{
            visibility: "on"
          }, {
            color: "#83cead"
          }]
        }, {
          featureType: "road",
          elementType: "all",
          stylers: [{
            visibility: "on"
          }, {
            color: "#ffffff"
          }]
        }, {
          featureType: "road",
          elementType: "labels",
          stylers: [{
            visibility: "off"
          }]
        }, {
          featureType: "road.highway",
          elementType: "all",
          stylers: [{
            visibility: "on"
          }, {
            color: "#fee379"
          }]
        }, {
          featureType: "road.arterial",
          elementType: "all",
          stylers: [{
            visibility: "on"
          }, {
            color: "#fee379"
          }]
        }, {
          featureType: "water",
          elementType: "all",
          stylers: [{
            visibility: "on"
          }, {
            color: "#7fc8ed"
          }]
        }]
      }, r
    }(Frames.ViewModel)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    CoreTeamJobsComponent.ApplicationFormView = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      return n(r, e), r.prototype.els = {
        $form: "@form",
        $title: "@form_title",
        $thanks: "@thanks_block"
      }, r.prototype.events = {
        "ajax:before": "showCommentFormSpinner",
        "ajax:error": "hideCommentFormSpinner",
        "ajax:success": "successfullyApplied"
      }, r.prototype.showCommentFormSpinner = function() {
        return this.spin(this.$form())
      }, r.prototype.hideCommentFormSpinner = function() {
        return this.stopSpin(this.$form())
      }, r.prototype.successfullyApplied = function() {
        return this.hideCommentFormSpinner(), this._scrollUp(this._fadeOut.bind(this))
      }, r.prototype._scrollUp = function(t) {
        return $("html, body").animate({
          scrollTop: this.$el.offset().top - 60
        }, 1e3, t)
      }, r.prototype._fadeOut = function() {
        var t = this;
        return this._fadeOutTitle(), this.$form().fadeOut(function() {
          return t.$thanks().fadeIn()
        })
      }, r.prototype._fadeOutTitle = function() {
        return this.$title().fadeOut()
      }, r
    }(Toptal.View)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    CoreTeamJobsComponent.MapView = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      var o;
      return n(r, e), r.prototype.els = {
        $map: "@map",
        $cities: "@cities_list"
      }, o = "multi_column_list-item", r.prototype.initialize = function() {
        var t;
        return this.mapData = new CoreTeamJobsComponent.MapViewModel, t = this.$map().get(0), new Map(t, this.mapData.center(), this.mapData.options(), this.addCities.bind(this))
      }, r.prototype.addCities = function(t) {
        var e = this;
        return _.each(this.mapData.cities(), function(n, r) {
          var o;
          return o = t.makeCoords(n[0], n[1]), t.addMarker(o, e.mapData.markerPath(), e.mapData.markerWidth(), e.mapData.markerHeight()), e.cityToList(r)
        }), Modernizr.csscolumns ? void 0 : this.$cities().columnize({
          columns: 4
        })
      }, r.prototype.cityToList = function(t) {
        var e;
        return e = $("<li>" + t + "</li>").addClass(o), this.$cities().append(e)
      }, r
    }(Toptal.View)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    this.InstantSignupComponent = {}
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    InstantSignupComponent.FloatingSignupView = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      return n(r, e), r.prototype.els = {
        $emailStep: "@email_step",
        $infoStep: "@info_step",
        $finishStep: "@finish_step"
      }, r.prototype.events = {
        "submit @email_step_form": "submitEmailForm",
        "submit @info_step_form": "submitInfoForm",
        "click @finish_step": "hideForm",
        "click @close_floating_signup": "hideForm"
      }, r.prototype.ajaxWithCredentials = function(t, e) {
        var n, r = this;
        return n = $(t.target), $.ajax({
          method: "post",
          data: n.serialize(),
          url: n.attr("action"),
          xhrFields: {
            withCredentials: !0
          }
        }).done(function(n) {
          return e.call(r, t, n)
        }).fail(function(t) {
          return console.error(t)
        })
      }, r.prototype.submitEmailForm = function(t) {
        return t.preventDefault(), t.stopPropagation(), this.ajaxWithCredentials(t, this.emailStepSubmitted)
      }, r.prototype.submitInfoForm = function(t) {
        return t.preventDefault(), t.stopPropagation(), this.ajaxWithCredentials(t, this.infoStepSubmitted)
      }, r.prototype.prepareForHeightTransition = function() {
        var t;
        return t = this.$el.outerHeight(), this.paddingHeightDiff = t - this.$emailStep().outerHeight(), this.$el.css("height", t)
      }, r.prototype.emailStepSubmitted = function() {
        return this.prepareForHeightTransition(), this.switchSteps(this.$emailStep(), this.$infoStep()), this.emit("session:check_if_signed_in")
      }, r.prototype.infoStepSubmitted = function() {
        return this.switchSteps(this.$infoStep(), this.$finishStep()), this.hideForm.bind(this).delay(4e3)
      }, r.prototype.hideForm = function() {
        return this.$el.addClass("is-hidden")
      }, r.prototype.switchSteps = function(t, e) {
        var n;
        return n = e.outerHeight() + this.paddingHeightDiff, t.addClass("is-hidden"), e.removeClass("is-hidden"), this.$el.css("height", n)
      }, r
    }(Toptal.View)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    this.SkillBattlesComponent = {}
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    this.JST || (this.JST = {}), this.JST["public/components/skill_battles/templates/reason_thanks"] = function() {
      return this.Skim = {
          access: function(t) {
            var e;
            return e = this[t], "function" == typeof e && (e = e.call(this)), e === !0 ? [this] : e === !1 || null == e ? !1 : "[object Array]" !== Object.prototype.toString.call(e) ? [e] : 0 === e.length ? !1 : e
          },
          withContext: function(t, e) {
            var n, r;
            return n = function(t) {
              var e;
              return e = function() {}, e.prototype = t, new e
            }, t = n(t), t.safe || (t.safe = this.safe || function(t) {
              var e;
              return (null != t ? t.skimSafe : void 0) ? t : (e = new String(null != t ? t : ""), e.skimSafe = !0, e)
            }), t.isArray = Array.isArray || function(t) {
              return "[object Array]" === {}.toString.call(t)
            }, t.flatten = r = function(t) {
              var e, n, o, i;
              for (n = [], o = 0, i = t.length; i > o; o++) e = t[o], e instanceof Array ? n = n.concat(r(e)) : n.push(e);
              return n
            }, t.escape || (t.escape = this.escape || function(t) {
              return null == t ? "" : t.skimSafe || !/[&<>\"]/.test(t) ? t : this.safe(("" + t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"))
            }), e.call(t)
          }
        },
        function(t) {
          return null == t && (t = {}), Skim.withContext.call({}, t, function() {
            var t, e, n, r;
            switch (n = "", n += '<div class="tech_battle_thanks"><div class="tech_battle_thanks-title">Your vote has successfully been submitted!</div>', t = "" + this.titleWon + " is way better than " + this.titleLoose + ". #" + this.skillA + " vs. #" + this.skillB, e = "" + this.skillA + "-vs-" + this.skillB, n += '<div class="tech_battle_thanks-share_text">', n += this.escape(t), n += '</div><a class="button is-green_candy is-social is-twitter" data-role="custom_social_share"', r = t) {
              case !0:
                n += ' data-text="data-text"';
                break;
              case !1:
              case null:
                break;
              default:
                n += ' data-text="', n += this.escape(r), n += '"'
            }
            return n += ' data-type="twitter" data-utm="utm_source=toptal&amp;utm_medium=tweet&amp;utm_campaign=', n += this.escape(e), n += '" href="#"><span class="icon"></span>Tweet this</a></div>'
          })
        }
    }.call(this)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    this.SkillBattlesComponent.CommentsView = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      var o, i, a, s, u;
      return n(r, e), o = 500, s = ["Admin", "Editor"], i = '<a href="#" data-role="remove_link" class="tech_battle_comment-remove_link" title="Delete this comment">\xd7</a>', a = "skill_battle_comments", u = "skill_battle_reasons", r.prototype.els = {
        $loadMoreButton: "@load_more_button"
      }, r.prototype.events = {
        "click @remove_link": "removeEntity",
        "click @load_more_button": "loadMoreComments"
      }, r.prototype.initialize = function() {
        return this.listen("session:signedin", this.applyRole.bind(this)), this.listen("tech_battle_form:submit", this.addEditorButtons.bind(this)), this.listen("tech_battle_form:submit", this.hideUserInfoFields.bind(this))
      }, r.prototype.applyRole = function(t) {
        return this.emit("tech_battle_form:apply_role"), this._hideUserInfoField = !0, this.hideUserInfoFields(), _.find(s, function(e) {
          return e === t.body.role_type
        }) ? (this._displayEditorsButtons = !0, this.addEditorButtons()) : void 0
      }, r.prototype.hideUserInfoFields = function() {
        return this._hideUserInfoField ? $("@name, @email").hide() : void 0
      }, r.prototype.addEditorButtons = function() {
        return this._displayEditorsButtons ? $("@reason_wrapper, @comment_wrapper").each(function(t, e) {
          return $(e).find("@remove_link").length > 0 ? void 0 : $(e).append(i)
        }) : void 0
      }, r.prototype.removeEntity = function(t) {
        var e, n, r = this;
        return t.preventDefault(), confirm("Are you sure?") ? (e = $(t.currentTarget).closest("@comment_wrapper, @reason_wrapper"), n = [window.location.pathname], n.push(function() {
          switch (e.data("role")) {
            case "comment_wrapper":
              return a;
            case "reason_wrapper":
              return u
          }
        }()), n.push(e.data("id")), n = n.join("/"), $.ajax({
          url: n,
          dateType: "JSON",
          method: "DELETE",
          success: function() {
            return r.removeElement(e)
          }
        })) : void 0
      }, r.prototype.removeElement = function(t) {
        return "reason_wrapper" === t.data("role") && (t = t.closest("@comments_group")), t.fadeOut(o, function() {
          return t.remove()
        })
      }, r.prototype.loadMoreComments = function(t) {
        var e, n, r = this;
        return t.preventDefault(), n = [window.location.pathname, u].join("/"), e = {
          last_id: this.$el.find("@reason_wrapper").last().data("id")
        }, $.ajax({
          url: n,
          dateType: "JSON",
          data: e,
          success: function(t) {
            return r.renderComments(t), r.hideUserInfoFields(), r.addEditorButtons()
          }
        })
      }, r.prototype.renderComments = function(t) {
        var e;
        return e = $(t.html), this.$before(this.$loadMoreButton(), e), t.has_more ? void 0 : this.$loadMoreButton().remove()
      }, r
    }(Toptal.View)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    this.SkillBattlesComponent.PlayerView = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      var o, i, a, s, u;
      return n(r, e), s = 1e3, u = 60, i = 10, a = .02, o = .98, r.prototype.els = {
        $playButton: "@play_button",
        $progressbar: "@progressbar",
        $progressbarWrapper: "@progressbar_wrapper",
        $timePast: "@time_past",
        $timeRemaining: "@time_remaining",
        $positionPointer: "@position_pointer",
        $jumpToDebate: "@jump_to_transcript"
      }, r.prototype.events = {
        "click @play_button": "togglePlayback",
        "click @progressbar_wrapper": "seek",
        mouseleave: "hideSeeker",
        "mouseenter @progressbar_wrapper": "showSeeker",
        "mousemove @progressbar_wrapper": "seeking"
      }, r.prototype.initialize = function() {
        var t = this;
        return this.audio = $("@audio")[0], this.audio ? (this.audio.volume = 1, this.audio.onloadeddata = function() {
          return t.updateTime()
        }, this.audio.onended = function() {
          return t.resetPlayer()
        }) : void 0
      }, r.prototype.resetPlayer = function() {
        return this.audio.currentTime = 0, this.$playButton().toggleClass("is-active")
      }, r.prototype.togglePlayback = function() {
        return this.$progressbar().show(), this.$playButton().toggleClass("is-active"), this.audio.paused ? (this.initPlaybackTimer(), this.audio.play()) : (this.pausePlaybackTimer(), this.audio.pause())
      }, r.prototype.initPlaybackTimer = function() {
        return this.intervalId = setInterval(this.updateProgress.bind(this), s)
      }, r.prototype.pausePlaybackTimer = function() {
        return clearInterval(this.intervalId)
      }, r.prototype.showSeeker = function() {
        return this.$positionPointer().addClass("is-visible")
      }, r.prototype.hideSeeker = function() {
        return this.$positionPointer().removeClass("is-visible")
      }, r.prototype.seeking = function(t) {
        var e, n, r;
        return r = this.$progressbarWrapper().outerWidth(), n = this.$progressbarWrapper().offset().left, e = this.debounceClickPosition((t.clientX - n) / r), this.$positionPointer().css({
          width: "" + 100 * e + "%"
        })
      }, r.prototype.seek = function(t) {
        var e, n, r;
        return this.$progressbar().show(), r = this.$progressbarWrapper().outerWidth(), n = this.$progressbarWrapper().offset().left, e = this.debounceClickPosition((t.clientX - n) / r), this.hideSeeker(), this.updateProgress(e)
      }, r.prototype.debounceClickPosition = function(t) {
        return a > t ? t = 0 : t > o ? t = 1 : t
      }, r.prototype.updateProgress = function(t) {
        return null == t && (t = null), t && this.setTime(t), this.updateTime(), this.updateProgressbar()
      }, r.prototype.setTime = function(t) {
        return this.audio.currentTime = this.audioDuration * t
      }, r.prototype.updateTime = function() {
        var t, e, n, r;
        return t = this.audio.currentTime, e = this.audio.duration, t && e ? (this.audioDuration = e, n = this.formatTime(t), r = this.formatTime(e - t), this.$timePast().text(n), this.$timeRemaining().text(r)) : void 0
      }, r.prototype.updateProgressbar = function() {
        var t, e;
        return t = this.audio.currentTime / this.audioDuration, e = this.$progressbarWrapper().outerWidth(), this.$progressbar().css(i > e * t ? {
          width: i
        } : {
          width: "" + 100 * t + "%"
        })
      }, r.prototype.formatTime = function(t) {
        var e, n, r;
        return t ? (t = Math.ceil(t), e = Math.floor(t / u), r = Math.floor(t % u), n = _.map([e, r], function(t) {
          return t >= 10 ? t : t > 0 ? "0" + t : "00"
        }), n.join(":")) : "--:--"
      }, r
    }(Toptal.View)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    this.SkillBattlesComponent.ReasonView = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      var o, i, a, s, u, c, l, h;
      return n(r, e), c = 100, a = 2e3, u = 1e3, o = 1e3, s = 3e3, i = 100, l = '<p class="tech_battle_form-upvote_confirmation">Thank you for your vote</p>', h = !1, r.prototype.els = {
        $formWrappers: "@upvote_form_wrapper, @reply_form_wrapper"
      }, r.prototype.events = {
        "click @show_form_link": "showForm",
        "click @hide_form_link": "hideForm",
        "ajax:before @upvote_form_wrapper, @reply_form_wrapper": "disableForm",
        "ajax:complete @upvote_form_wrapper, @reply_form_wrapper": "enableForm",
        "ajax:success @upvote_form_wrapper, @reply_form_wrapper": "handleFormSuccess"
      }, r.prototype.initialize = function() {
        return this.$formWrappers().each(function(t, e) {
          return new FormComponent.CleanupBehavior({
            el: $(e)
          })
        }), this.listen("tech_battle_form:show", this.tryHideForm.bind(this)), this.listen("tech_battle_form:apply_role", this.applyRole.bind(this))
      }, r.prototype.applyRole = function() {
        return h = !0
      }, r.prototype.disableForm = function(t) {
        var e;
        return e = $(t.currentTarget), this.spin(e)
      }, r.prototype.enableForm = function(t) {
        var e;
        return e = $(t.currentTarget), this.stopSpin(e)
      }, r.prototype.handleFormSuccess = function(t, e) {
        var n, r, o, i, a, s = this;
        switch (a = this.getEventInfo(t), i = a[0], o = a[1], n = a[2], r = a, this.enableForm(t), o.data("role")) {
          case "upvote_form_wrapper":
            return this.updateUpvotes(n), this.showUpvoteConfirmation(o, function() {
              return s.hideForm(t)
            });
          case "reply_form_wrapper":
            return this.emit("tech_battle_form:submit"), this.hideForm(r, function() {
              return s.updateComments(e)
            })
        }
      }, r.prototype.updateUpvotes = function(t) {
        var e, n;
        return e = t.find("@vote_counter"), n = "Upvote" === e.text() ? 0 : parseInt(e.text(), 10), e.text(n + 1).removeClass("is-zero_hint"), e.closest("@show_form_link").addClass("is-touched"), this.isMobile() ? this.focusOnBlock(t) : void 0
      }, r.prototype.showUpvoteConfirmation = function(t, e) {
        return t.data("submitted", !0), t.fadeIn(o), t.html(l), setTimeout(function() {
          return t.fadeOut(o, e)
        }, a)
      }, r.prototype.updateComments = function(t) {
        var e;
        return e = $(t.html), this.$append(this.$el, e), this.focusOnBlock(e), this.emit("tech_battle_form:submit")
      }, r.prototype.showForm = function(t) {
        var e, n, r, s;
        return s = this.getEventInfo(t), r = s[0], n = s[1], e = s[2], n.data("submitted") && setTimeout(function() {
          return n.fadeOut(o)
        }, a), h && "upvote_form_wrapper" === n.data("role") ? void n.find("@form").submit() : ("reply_form_wrapper" === n.data("role") && this.addInterlocutor(n, e), this.emit("tech_battle_form:show", n), n.slideDown(c, function() {
          return $("body, html").animate({
            scrollTop: n.offset().top - i
          }, u)
        }), e.addClass("is-active"), $.fn.placeholder.input ? n.find("@first_field").focus() : void 0)
      }, r.prototype.hideForm = function(t, e) {
        var n, r, o, i;
        return i = this.getEventInfo(t), o = i[0], r = i[1], n = i[2], r.slideUp(c, e), n.removeClass("is-active"), r.trigger("form:clean")
      }, r.prototype.tryHideForm = function(t) {
        var e, n = this;
        return e = t.body, this.$el.find("@upvote_form_wrapper, @reply_form_wrapper").each(function(t, r) {
          var o, i;
          return i = $(r), o = n.getCommentBlock(i), e.is(i) ? void 0 : (o.removeClass("is-active"), i.slideUp(c))
        })
      }, r.prototype.getEventInfo = function(t) {
        var e, n, r, o;
        if (!t.currentTarget) return t;
        switch (t.preventDefault(t), r = $(t.currentTarget), r.data("role")) {
          case "show_form_link":
            o = "@" + r.data("target"), e = r.closest("@reason_wrapper, @comment_wrapper"), n = e.nextAll(o).first();
            break;
          case "hide_form_link":
            n = r.closest("@upvote_form_wrapper, @reply_form_wrapper"), e = this.getCommentBlock(n);
            break;
          case "reply_form_wrapper":
          case "upvote_form_wrapper":
            n = r, e = this.getCommentBlock(n)
        }
        return [r, n, e]
      }, r.prototype.addInterlocutor = function(t, e) {
        var n;
        return n = e.find("@author").text(), t.find("@body").val("@" + n + ", ")
      }, r.prototype.getCommentBlock = function(t) {
        return t.prevAll("@reason_wrapper, @comment_wrapper").first()
      }, r.prototype.focusOnBlock = function(t) {
        var e;
        return e = t.offset().top - i, $("body, html").animate({
          scrollTop: e
        }, {
          duration: u,
          complete: function() {
            return t.addClass("is-highlighted"), setTimeout(function() {
              return t.removeClass("is-highlighted")
            }, s)
          }
        })
      }, r.prototype.isMobile = function() {
        return null != this._isMobile ? this._isMobile : this._isMobile = sniffFns.isMobile(navigator.userAgent)
      }, r
    }(Toptal.View)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e = {}.hasOwnProperty,
      n = function(t, n) {
        function r() {
          this.constructor = t
        }
        for (var o in n) e.call(n, o) && (t[o] = n[o]);
        return r.prototype = n.prototype, t.prototype = new r, t.__super__ = n.prototype, t
      };
    SkillBattlesComponent.VotingView = function(e) {
      function r() {
        return t = r.__super__.constructor.apply(this, arguments)
      }
      var o, i;
      return n(r, e), r.prototype.REASONS_URL = "" + window.location + "/skill_battle_reasons", i = "public/components/skill_battles/templates/reason_thanks", o = 100, r.prototype.els = {
        $voteLinks: "@vote",
        $form: "@form",
        $formWrapper: "@form_wrapper",
        $formArrow: "@form_arrow",
        $skillIdInput: "@skill_id",
        $nameInput: "@full_name",
        $emailInput: "@email",
        $skillTitle: "@skill_title",
        $submit: "@submit"
      }, r.prototype.events = {
        "click @vote": "showReasonForm",
        "click @cancel": "cancelForm",
        "ajax:success @form_wrapper": "showConfirmation"
      }, r.prototype.initialize = function() {
        return new FormComponent.CleanupBehavior({
          el: this.$formWrapper()
        }), this.listen("session:signedin", this.markAsSignedIn), this.skillATitle = this.$el.data("skill-a"), this.skillBTitle = this.$el.data("skill-b")
      }, r.prototype.markAsSignedIn = function() {
        return this.$nameInput().hide(), this.$emailInput().hide()
      }, r.prototype.showReasonForm = function(t) {
        var e, n;
        return t.preventDefault(), this._resetVotingState(), e = $(t.currentTarget), e.addClass("is-active"), n = e.data("id"), this.$skillIdInput().val(n), this.choosenSkill = e.find("@skill_title").text(), "left" === e.data("position") ? (this.$formArrow().removeClass("is-right_aligned"), this.$formArrow().addClass("is-left_aligned")) : (this.$formArrow().removeClass("is-left_aligned"), this.$formArrow().addClass("is-right_aligned")), this.updatePlaceholder(e.data("technology-title")), this.$formWrapper().slideDown(o), $.fn.placeholder.input ? this.$form().find("@first_field").focus() : void 0
      }, r.prototype.updatePlaceholder = function(t) {
        return $.fn.placeholder.input ? this.$el.find("@body").prop("placeholder", "Why do you think " + t + " is better?") : void 0
      }, r.prototype.cancelForm = function() {
        return this._resetVotingState(), this.$formWrapper().slideUp(o), this.$form().trigger("clear"), !1
      }, r.prototype.showConfirmation = function(t) {
        var e, n, r;
        return e = $(t.currentTarget), this.$voteLinks().removeClass("is-active"), r = this.choosenSkill, n = r === this.skillATitle ? this.skillBTitle : this.skillATitle, e.addClass("is-white"), e.html(JST[i]({
          titleWon: r,
          titleLoose: n,
          skillA: this.skillATitle,
          skillB: this.skillBTitle
        }))
      }, r.prototype._resetVotingState = function() {
        return this.$voteLinks().removeClass("is-active"), this.$formWrapper().trigger("form:clean")
      }, r
    }(Toptal.View)
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t = function(t, e) {
      return function() {
        return t.apply(e, arguments)
      }
    };
    null == this.Widgets && (this.Widgets = {}), Widgets.GoogleAnalytics = function() {
      function e(e, n) {
        this.applicationId = e, this.cookies = null != n ? n : "auto", this.trackBlogSubscription = t(this.trackBlogSubscription, this), this.contextLessSend = t(this.contextLessSend, this), this.enabled() && (this.setup(), this.ga = window.ga, this.call("create", this.applicationId, this.cookies)), this.ga || (this.ga = function() {}), this.ga(function(t) {
          var e;
          return e = t.get("clientId"), this.ga("require", "displayfeatures"), this.ga("set", "dimension10", e)
        })
      }
      return e.prototype.enabled = function() {
        return null != this.applicationId && this.applicationId.replace(/^\s+|\s+$/gm, "").length > 0
      }, e.prototype.setup = function() {
        return function(t, e, n, r, o, i, a) {
          t.GoogleAnalyticsObject = o, t[o] = t[o] || function() {
            (t[o].q = t[o].q || []).push(arguments)
          }, t[o].l = 1 * new Date, i = e.createElement(n), a = e.getElementsByTagName(n)[0], i.async = 1, i.src = r, a.parentNode.insertBefore(i, a)
        }(window, document, "script", "//www.google-analytics.com/analytics.js", "ga")
      }, e.prototype.call = function() {
        return this.ga.apply(window, this._flatten(arguments))
      }, e.prototype.send = function() {
        return this.call("send", arguments)
      }, e.prototype.sendEvent = function() {
        return this.send("event", arguments)
      }, e.prototype.bucketRole = function(t, e) {
        return t && e ? this.ga(function() {
          var n;
          return n = "" + t + "-" + e, this.ga("set", "dimension11", n)
        }) : void 0
      }, e.prototype.grouping = function(t) {
        return t ? this.ga("set", "contentGroup1", t) : void 0
      }, e.prototype.trackProfileCreated = function(t, e, n) {
        return this.sendEvent("" + t + "_lead", e, n)
      }, e.prototype.trackPageview = function() {
        return this.send("pageview")
      }, e.prototype.contextLessSend = function() {
        return (window.ga || function() {}).apply(window, this._flatten(["send", "event", arguments]))
      }, e.prototype.trackBlogSubscription = function(t) {
        return this.contextLessSend("BlogSubscription", t)
      }, e.prototype.track15secondsRead = function() {
        var t = this;
        return setTimeout(function() {
          return t.contextLessSend("15_seconds", "read")
        }, 15e3)
      }, e.prototype.trackBlogAction = function(t, e, n) {
        return null != n && null != window.ga ? window.ga("send", "event", "BlogCTAs", t, e, {
          hitCallback: n
        }) : (this.contextLessSend("BlogCTAs", t, e), n())
      }, e.prototype.trackBlogReferralAction = function(t, e) {
        return this.contextLessSend("referrals", t, e)
      }, e.prototype.trackFactSheetDownload = function() {
        return this.sendEvent("Downloads", "Fact Sheet")
      }, e.prototype.trackOptimizelyExperiment = function(t) {
        return _.isEmpty(t) ? void 0 : this.sendEvent("optimizely", "experiment", JSON.stringify(t))
      }, e.prototype.trackButtonClick = function(t) {
        return this.contextLessSend("button", "click", t)
      }, e.prototype._flatten = function(t) {
        var e, n, r, o, i, a;
        for (n = [], r = i = 0, a = t.length; a >= 0 ? a > i : i > a; r = a >= 0 ? ++i : --i) o = Object.prototype.toString.call(t[r]).split(" ").pop().split("]").shift().toLowerCase(), null != o && (e = /^(array|collection|arguments|object)$/.test(o), n = n.concat(e ? this._flatten(t[r]) : t[r]));
        return n
      }, e
    }()
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    this.AbTestingService = {}, this.AbTestingService.onSignInFinish = new $.Deferred
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    this.AbTestingService.BlogPostPage = function() {
      function t() {}
      return t.showLateralDefaultBanner = function() {}, t.showLateralAuthorBanner = function() {}, t.showLateralReferralLogoBanner = function() {}, t.showLateralReferralFaceBanner = function() {}, t.showAlvaroPanel = function() {}, t
    }()
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    this.AbTestingService.InterviewQuestionsPage = function() {
      function t() {}
      return t.showBottomStickyPanel = function() {}, t
    }()
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {
    var t, e;
    t = 1, e = 7, this.AbTestingService.SkillPage = function() {
      function t() {}
      return t.showPlainResourcesList = function() {
        var t;
        return t = $("#ab-plain_resources_list"), t.length > 0 ? ($("#skill_page_clients").hide(), t.show()) : void 0
      }, t.showResourcesListWidget = function() {
        var t;
        return t = $("#ab-skill_page_resources_list_widget"), t.length > 0 ? ($("#ab-skill_page_hiring_guide_preview").hide(), t.show()) : void 0
      }, t.showButtonLabel = function() {}, t.showBackground1 = function() {}, t.showBackground2 = function() {}, t.showBackground3 = function() {}, t.showBackground4 = function() {}, t.showBackground5 = function() {}, t.showBackground6 = function() {}, t.showBackground7 = function() {}, t.showRandomBackground = function() {}, t._showFloatingForm = function(t) {
        var e, n;
        return null == t && (t = !1), e = $(".skill_panel"), n = $(".floating_signup"), e.on("panel_show", function() {
          return n.addClass("is-alvaro_activated")
        }), e.on("panel_hide", function() {
          return n.removeClass("is-alvaro_activated")
        }), this._pageScroll().add(function(t, e) {
          return n.toggleClass("is-hidden", e)
        }), $("#floating_signup_send_resumes").val(t.toString()), n.removeClass("is-hidden").addClass("is-active")
      }, t.showFloatingDefaultForm = function() {
        return this._showFloatingForm(!1)
      }, t.showFloatingResumesForm = function() {
        var t;
        return t = $(".floating_signup"), t.find("[data-alt-text]").each(function(t, e) {
          var n;
          return n = $(e), n.html(n.data("alt-text"))
        }), t.find("[data-alt-value]").each(function(t, e) {
          var n;
          return n = $(e), n.attr("value", n.data("alt-value"))
        }), this._showFloatingForm(!0)
      }, t.showSkillResumesFloatingHeaderButton = function() {
        var t;
        return t = $(".skill_header").data("skill-name"), this._showAlternativeFloatingHeaderButton("Send me " + t + " resumes", "skill_resumes_floating_header_button")
      }, t.showSkillFloatingHeaderButton = function() {
        var t;
        return t = $(".skill_header").data("skill-name"), this._showAlternativeFloatingHeaderButton("Hire a top " + t + " developer", "skill_floating_header_button")
      }, t._showAlternativeFloatingHeaderButton = function(t, e) {
        var n, r, o;
        return n = $(".page_header_menu-hire"), r = n.data("original-href") || n.attr("href"), o = $(".skill_header").data("skill-slug"), n.data("original-href", r).attr("href", "" + r + "?source=" + e + "&category=" + o).html(t)
      }, t._showBackground = function() {}, t.switchHireDevButtonToViewDevButton = function() {}, t.showBottomStickyPanel = function() {}, t._pageScroll = function() {
        var t, e, n, r, o;
        return t = $("footer"), e = null, r = $.Callbacks(), n = _.throttle(function() {
            return e = 100 - $(window).height()
          }, 200), o = _.throttle(function() {
            var t;
            return t = $(window).scrollTop(), r.fire(t, t > e)
          }, 200), $(window).on("resize", n).on("scroll", o).triggerHandler("resize"),
          function() {
            return {
              add: function(t) {
                return r.add(t)
              },
              remove: function(t) {
                return r.remove(t)
              }
            }
          }
      }(), t.showPopups = function() {}, t
    }()
  }).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}
try {
  (function() {}).call(this)
} catch (e) {
  if ("undefined" == typeof Core || "undefined" == typeof Core.catchWithoutRethrow) throw e;
  Core.catchWithoutRethrow(e)
}