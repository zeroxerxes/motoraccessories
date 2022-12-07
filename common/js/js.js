function initVideo(t, e = {}) {
  var s = t.closest("body")[0],
    i = s.querySelector("script.video-js-script"),
    o = s.querySelector("script.youtube-js-script"),
    n = s.querySelector("link.video-css");

  function r(s) {
    s.find(".video-js").each((function(s) {
      var i = this,
        o = {
          controls: !0,
          fluid: !0
        },
        n = $(this).attr("src");
      n || (n = $(this).attr("data-setup") ? JSON.parse($(this).attr("data-setup")).sources[0].src : $(this).find("source").attr("src"));
      n && (n.indexOf("://youtu.be") > -1 || n.indexOf("://www.youtube.com") > -1) ? (n.indexOf("?") > -1 ? n += "&rel=0" : n += "?rel=0", o.techOrder = ["youtube"], o.sources = [{
        type: "video/youtube",
        src: n
      }]) : o.sources = [{
        type: "video/mp4",
        src: n
      }], videojs(i, o).ready((function() {
        i.hasAttribute("autoplay") && $(i).closest("div.video-js").addClass("vjs-has-started"), e.isShowMore && this.on("play", (function(e) {
          t.find(".video-js").each((function(t) {
            s !== t && this.player.pause()
          }))
        }))
      }))
    }))
  }
  n || (n = document.createElement("link"), $(n).attr("rel", "stylesheet"), $(n).attr("type", "text/css"), $(n).addClass("video-css"), $(n).attr("href", "https://shopsource.singoo.cc/common/css/video-js.min.css"), s.prepend(n)), t.find(".video-js").each((function() {
    if ($(this).attr("data-setup")) {
      var t = JSON.parse($(this).attr("data-setup")).sources[0].src;
      $(this).removeAttr("data-setup"), $(this).attr("src", t)
    }
  })), (i = document.createElement("script")).className = "video-js-script", s.prepend(i), i.addEventListener("load", (function() {
    (function() {
      var e = !1;
      t.find(".video-js").each((function() {
        var t = $(this).attr("src");
        t || (t = $(this).attr("data-setup") ? JSON.parse($(this).attr("data-setup")).sources[0].src : $(this).find("source").attr("src"));
        t && (t.indexOf("://youtu.be") > -1 || t.indexOf("://www.youtube.com") > -1) && (e = !0, o || ((o = document.createElement("script")).className = "youtube-js-script", s.prepend(o)))
      })), o && (o.addEventListener("load", (function() {
        r(t), $(o).remove()
      })), o.setAttribute("src", "https://shopsource.singoo.cc/common/js/youtube.min.js"));
      return e
    })() || (r(t), $(i).remove())
  })), i.setAttribute("src", "https://shopsource.singoo.cc/common/js/video-js.min.js")
}
$((function() {
  $("#menuBtn").click((function() {
    $("#nav").toggleClass("toLeft"), $(this).stop().toggleClass("active")
  })), $(".nav li").each((function() {
    $(this).find("li").length && $(this).addClass("hasUl")
  }));
  var t = $("base").attr("href");
  $("header .cart-list-value .svgW").click((function() {
    window.open(t + "cart", "_self")
  })), $("header .person-box .svgW").click((function() {
    isLogin ? $("header .person-box .carDrop").toggle() : window.open(t + "login", "_self")
  })), $("header .person-center-box").click((function() {
    window.open(t + "member/order", "_self")
  })), $("header .address-box").click((function() {
    window.open(t + "member/address", "_self")
  })), $("header .logout-box").click((function() {
    window.open(t + "logout", "_self")
  }));
  var e = $("div[data-group='autopopup']");
  if (e.length) {
    function s(t, i) {
      if (t.length) {
        let o = t.attr("id"),
          n = JSON.parse(localStorage.getItem("modalList") || "{}");
        if (!n[o]) return setTimeout((() => {
          $(`#${o}`).modal("show"), n[o] = 1, localStorage.setItem("modalList", JSON.stringify(n))
        }), 3e3), $(`#${o}`).on("hidden.bs.modal", (function(t) {
          i < e.length - 1 && s(e.eq(i + 1).find(".modal"), ++i)
        })), !1
      }
      return !0
    }
    e.each((function(t) {
      if (!s($(this).find(".modal"), t)) return !1
    }))
  }
  $(document).on("click", "svg.open-view", (function() {
      1 == this.dataset.open ? (this.dataset.open = 0, $(this).css({
        transform: "rotate(0deg)",
        transition: "all 0.5s"
      })) : (this.dataset.open = 1, $(this).css({
        transform: "rotate(180deg)",
        transition: "all 0.5s"
      })), $(this).siblings("ul").toggle()
    })),
    $(window).width() < 875 && $("#nav > li > a").click((function(t) {
      let e = $(this).parents("li");
      if (e.find("li").length > 0) return e.toggleClass("icon2").siblings().removeClass("icon2"), e.find(">ul").stop().slideToggle(), e.siblings().find(">ul").stop().slideUp(), !1
    }));
  var i = $("header"),
    o = 0;
  if (i.css("position") == "fixed") {
    var n = i.closest("div[data-group]");
    console.log(n)
    n.length && (o = i.height(), n.css("padding-bottom", o + "px"))
  }
  var r = $("footer").closest("div[data-group]"),
    a = $("*[id].fixed-bottom");
  r.length && a.length && r.css("padding-bottom", a.height() + "px"), $("#tags li").click((function() {
    $(this).addClass("icon").siblings("#tags li").removeClass("icon");
    var t = $("#tags li").index($(this));
    $(".tagContent").eq(t).show().siblings(".tagContent").hide()
  })), $("#tags li").eq(0).trigger("click"), $(".popgroup").each((function() {
    $(this).find("a").not($(".noPop")).magnificPopup({
      type: "image",
      gallery: {
        enabled: !0
      }
    })
  }));
  var c = $(window.location.hash);
  if (c.length > 0) {
    var d = c.offset().top;
    $("html,body").animate({
      scrollTop: d - o
    }, 500)
  }
  $("a").on("click", (function(t) {
    var e = $(this).attr("href");
    if ($(this).attr("data-mfp-src") || $(this).attr("data-toggle") || !e || void 0 === e) t.preventDefault();
    else if (e) {
      var s = e.indexOf("#");
      if (s > -1) {
        var i = e.substr(s);
        if (e.indexOf("home") > -1 && "/" == window.location.pathname) return $("html,body").animate({
          scrollTop: $(i).offset().top - o
        }, 500, "swing", (function() {
          history.pushState("", "", window.location.origin + window.location.pathname + i)
        })), t.preventDefault(), !1
      }
    }
  })), $.fn.numChange = function() {
    var t = this;
    console.log(t)
    $(window).scroll((function() {
      $(window).scrollTop() > t.offset().top - $(window).height() - 100 && (t.attr("data-change") || t.find(".num,.num-value").each((function() {
        let t = $(this).text(),
          e = parseInt(t),
          s = 100 * e,
          i = 0,
          o = Math.round(s / 50),
          n = $(this);
        var r = t.indexOf(e),
          a = "";
        r > -1 && (a = t.substr(r + (e + "").length)), n.text(0);
        var c = setInterval((function() {
          i += o, n.text(Math.round(i / 100) + a), (i >= s || isNaN(i)) && (isNaN(i) && n.text(t), clearInterval(c))
        }), 30)
      })), t.attr("data-change", "true"))
    }))
  }, $.fn.viewDiff = function(t) {
    var e = $.extend({}, {
        speed: .2
      }, t),
      s = $(this);
    $(window).scroll((function() {
      offsetT = s.offset().top * e.speed, s.css("backgroundPosition", "50% " + offsetT + "px");
      let t = $(window).scrollTop(),
        i = offsetT - t * e.speed;
      s.css("backgroundPosition", "50% " + i + "px")
    })), $(window).trigger("scroll")
  }
})), Number.prototype.toFixed = function(t) {
  if (t > 20 || t < 0) throw new RangeError("toFixed() digits argument must be between 0 and 20");
  var e = Number(this);
  if (isNaN(e) || e >= Math.pow(10, 21)) return e.toString();
  if (void 0 === t || 0 == t) return Math.round(e).toString();
  var s = e.toString(),
    i = s.split(".");
  if (i.length < 2) return l(s);
  var o = i[0],
    n = i[1],
    r = n.substr(t, 1);
  if (n.length == t) return s;
  if (n.length < t) return l(s);
  if (n.length > 14) {
    var a = 10 - n.substr(n.length - 1, 1);
    r = (n = parseInt(n) + a + "").substr(t, 1)
  }
  if (s = o + "." + n.substr(0, t), parseInt(r, 10) >= 5) {
    var c = Math.pow(10, t),
      d = Number(s.replace(".", ""));
    d++, s = l((d /= c) + "")
  }
  return s;

  function l(e) {
    var s = e.indexOf(".");
    if (-1 === s) {
      e += ".";
      for (var i = 0; i < t; i++) e += "0";
      return e
    }
    for (var o = t - (e.length - s - 1), n = 0; n < o; n++) e += "0";
    return e
  }
};