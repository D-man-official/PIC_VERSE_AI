/* ScrollAnimations
 */
(function(t, i, a, n) {
    var e = "scrollAnimations"
      , s = {
        offset: .7
    };
    var o;
    function m(a, n) {
        if (a) {
            this.element = a;
            this.animationElements = [];
            this.triggerPoint = null;
            this.lastScrollPos = -1;
            this.options = t.extend({}, s, n);
            this._defaults = s;
            this._name = e;
            i.onload = this.init()
        }
    }
    m.prototype = {
        init: function() {
            var a = this;
            var n = t(this.element);
            i.requestAnimationFrame = i.requestAnimationFrame || i.mozRequestAnimationFrame || i.webkitRequestAnimationFrame || i.msRequestAnimationFrame || function(t) {
                setTimeout(t, 1e3 / 60)
            }
            ;
            a.setup(n);
            a.updatePage();
            t(i).on("resize", function() {
                a.resize()
            })
        },
        resize: function() {
            var t = this;
            clearTimeout(o);
            o = setTimeout(function() {
                t.setTriggerpoint()
            }, 50)
        },
        setTriggerpoint: function() {
            this.triggerPoint = i.innerHeight * this.options.offset
        },
        setup: function(i) {
            this.setTriggerpoint();
            var a = t(i)
              , n = a.find("[data-animation-text]");
            if (n.length) {
                n.each(function() {
                    var i = t(this);
                    var a = i.attr("data-animation-delay");
                    i.css({
                        "-webkit-animation-delay": a,
                        "-moz-animation-delay": a,
                        "-ms-animation-delay": a,
                        "-o-animation-delay": a,
                        "animation-delay": a
                    })
                })
            } else {
                var e = a.attr("data-animation-delay");
                a.css({
                    "-webkit-animation-delay": e,
                    "-moz-animation-delay": e,
                    "-ms-animation-delay": e,
                    "-o-animation-delay": e,
                    "animation-delay": e
                })
            }
            this.animationElements.push(a)
        },
        updatePage: function() {
            var t = this;
            this.animateElements();
            requestAnimationFrame(this.updatePage.bind(this))
        },
        animateElements: function() {
            var a = this;
            var n = i.pageYOffset;
            if (n === this.lastScrollPos)
                return;
            this.lastScrollPos = n;
            t(a.animationElements).each(function() {
                var i = t(this)
                  , e = i.find("[data-animation-text]");
                if (i.hasClass("animated") || n < i.offset().top - a.triggerPoint)
                    return;
                if (e.length) {
                    i.addClass("animated");
                    e.each(function() {
                        t(this).addClass("animated").addClass(t(this).attr("data-animation"))
                    })
                } else {
                    i.addClass("animated").addClass(i.attr("data-animation"))
                }
            })
        }
    };
    t.fn[e] = function(i) {
        return this.each(function() {
            if (!t.data(this, "plugin_" + e)) {
                t.data(this, "plugin_" + e, new m(this,i))
            }
        })
    }
    ;
    if (typeof define === "function" && define.amd) {
        define(function() {
            return m
        })
    }
}
)(jQuery, window, document);

/*
 animsition 
 */
!function(t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof exports ? module.exports = t(require("jquery")) : t(jQuery)
}(function(t) {
    "use strict";
    var n = "animsition"
      , i = {
        init: function(a) {
            a = t.extend({
                inClass: "fade-in",
                outClass: "fade-out",
                inDuration: 1500,
                outDuration: 800,
                linkElement: ".animsition-link",
                loading: !0,
                loadingParentElement: "body",
                loadingClass: "animsition-loading",
                loadingInner: "",
                timeout: !1,
                timeoutCountdown: 5e3,
                onLoadEvent: !0,
                browser: ["animation-duration", "-webkit-animation-duration"],
                overlay: !1,
                overlayClass: "animsition-overlay-slide",
                overlayParentElement: "body",
                transition: function(t) {
                    window.location.href = t
                }
            }, a),
            i.settings = {
                timer: !1,
                data: {
                    inClass: "animsition-in-class",
                    inDuration: "animsition-in-duration",
                    outClass: "animsition-out-class",
                    outDuration: "animsition-out-duration",
                    overlay: "animsition-overlay"
                },
                events: {
                    inStart: "animsition.inStart",
                    inEnd: "animsition.inEnd",
                    outStart: "animsition.outStart",
                    outEnd: "animsition.outEnd"
                }
            };
            var o = i.supportCheck.call(this, a);
            if (!o && a.browser.length > 0 && (!o || !this.length))
                return "console"in window || (window.console = {},
                window.console.log = function(t) {
                    return t
                }
                ),
                this.length || console.log("Animsition: Element does not exist on page."),
                o || console.log("Animsition: Does not support this browser."),
                i.destroy.call(this);
            var e = i.optionCheck.call(this, a);
            return e && t("." + a.overlayClass).length <= 0 && i.addOverlay.call(this, a),
            a.loading && t("." + a.loadingClass).length <= 0 && i.addLoading.call(this, a),
            this.each(function() {
                var o = this
                  , e = t(this)
                  , s = t(window)
                  , r = t(document)
                  , l = e.data(n);
                l || (a = t.extend({}, a),
                e.data(n, {
                    options: a
                }),
                a.timeout && i.addTimer.call(o),
                a.onLoadEvent && s.on("load." + n, function() {
                    i.settings.timer && clearTimeout(i.settings.timer),
                    i["in"].call(o)
                }),
                s.on("pageshow." + n, function(t) {
                    t.originalEvent.persisted && i["in"].call(o)
                }),
                s.on("unload." + n, function() {}),
                r.on("click." + n, a.linkElement, function(n) {
                    n.preventDefault();
                    var a = t(this)
                      , e = a.attr("href");
                    2 === n.which || n.metaKey || n.shiftKey || -1 !== navigator.platform.toUpperCase().indexOf("WIN") && n.ctrlKey ? window.open(e, "_blank") : i.out.call(o, a, e)
                }))
            })
        },
        addOverlay: function(n) {
            t(n.overlayParentElement).prepend('<div class="' + n.overlayClass + '"></div>')
        },
        addLoading: function(n) {
            t(n.loadingParentElement).append('<div class="' + n.loadingClass + '">' + n.loadingInner + "</div>")
        },
        removeLoading: function() {
            var i = t(this)
              , a = i.data(n).options
              , o = t(a.loadingParentElement).children("." + a.loadingClass);
            o.fadeOut().remove()
        },
        addTimer: function() {
            var a = this
              , o = t(this)
              , e = o.data(n).options;
            i.settings.timer = setTimeout(function() {
                i["in"].call(a),
                t(window).off("load." + n)
            }, e.timeoutCountdown)
        },
        supportCheck: function(n) {
            var i = t(this)
              , a = n.browser
              , o = a.length
              , e = !1;
            0 === o && (e = !0);
            for (var s = 0; o > s; s++)
                if ("string" == typeof i.css(a[s])) {
                    e = !0;
                    break
                }
            return e
        },
        optionCheck: function(n) {
            var a, o = t(this);
            return a = n.overlay || o.data(i.settings.data.overlay) ? !0 : !1
        },
        animationCheck: function(i, a, o) {
            var e = t(this)
              , s = e.data(n).options
              , r = typeof i
              , l = !a && "number" === r
              , d = a && "string" === r && i.length > 0;
            return l || d ? i = i : a && o ? i = s.inClass : !a && o ? i = s.inDuration : a && !o ? i = s.outClass : a || o || (i = s.outDuration),
            i
        },
        "in": function() {
            var a = this
              , o = t(this)
              , e = o.data(n).options
              , s = o.data(i.settings.data.inDuration)
              , r = o.data(i.settings.data.inClass)
              , l = i.animationCheck.call(a, s, !1, !0)
              , d = i.animationCheck.call(a, r, !0, !0)
              , u = i.optionCheck.call(a, e)
              , c = o.data(n).outClass;
            e.loading && i.removeLoading.call(a),
            c && o.removeClass(c),
            u ? i.inOverlay.call(a, d, l) : i.inDefault.call(a, d, l)
        },
        inDefault: function(n, a) {
            var o = t(this);
            o.css({
                "animation-duration": a + "ms"
            }).addClass(n).trigger(i.settings.events.inStart).animateCallback(function() {
                o.removeClass(n).css({
                    opacity: 1
                }).trigger(i.settings.events.inEnd)
            })
        },
        inOverlay: function(a, o) {
            var e = t(this)
              , s = e.data(n).options;
            e.css({
                opacity: 1
            }).trigger(i.settings.events.inStart),
            t(s.overlayParentElement).children("." + s.overlayClass).css({
                "animation-duration": o + "ms"
            }).addClass(a).animateCallback(function() {
                e.trigger(i.settings.events.inEnd)
            })
        },
        out: function(a, o) {
            var e = this
              , s = t(this)
              , r = s.data(n).options
              , l = a.data(i.settings.data.outClass)
              , d = s.data(i.settings.data.outClass)
              , u = a.data(i.settings.data.outDuration)
              , c = s.data(i.settings.data.outDuration)
              , m = l ? l : d
              , g = u ? u : c
              , f = i.animationCheck.call(e, m, !0, !1)
              , v = i.animationCheck.call(e, g, !1, !1)
              , h = i.optionCheck.call(e, r);
            s.data(n).outClass = f,
            h ? i.outOverlay.call(e, f, v, o) : i.outDefault.call(e, f, v, o)
        },
        outDefault: function(a, o, e) {
            var s = t(this)
              , r = s.data(n).options;
            s.css({
                "animation-duration": o + 1 + "ms"
            }).addClass(a).trigger(i.settings.events.outStart).animateCallback(function() {
                s.trigger(i.settings.events.outEnd),
                r.transition(e)
            })
        },
        outOverlay: function(a, o, e) {
            var s = this
              , r = t(this)
              , l = r.data(n).options
              , d = r.data(i.settings.data.inClass)
              , u = i.animationCheck.call(s, d, !0, !0);
            t(l.overlayParentElement).children("." + l.overlayClass).css({
                "animation-duration": o + 1 + "ms"
            }).removeClass(u).addClass(a).trigger(i.settings.events.outStart).animateCallback(function() {
                r.trigger(i.settings.events.outEnd),
                l.transition(e)
            })
        },
        destroy: function() {
            return this.each(function() {
                var i = t(this);
                t(window).off("." + n),
                i.css({
                    opacity: 1
                }).removeData(n)
            })
        }
    };
    t.fn.animateCallback = function(n) {
        var i = "animationend webkitAnimationEnd";
        return this.each(function() {
            var a = t(this);
            a.on(i, function() {
                return a.off(i),
                n.call(this)
            })
        })
    }
    ,
    t.fn.animsition = function(a) {
        return i[a] ? i[a].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof a && a ? void t.error("Method " + a + " does not exist on jQuery." + n) : i.init.apply(this, arguments)
    }
});
