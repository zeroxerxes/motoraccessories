function sentData(event, str) {
  try {
    if (sentDatas && "function" == typeof sentDatas) {
      var curr_str = "";
      if ("copy" == event || "email_copy" == event) {
        curr_str = window.getSelection ? window.getSelection() : document.selection.createRange().text;
        var curr_str = curr_str.toString();
        sentDatas(event, curr_str)
      } else sentDatas(event, str)
    }
    try {
      if ("function" == typeof eval("gtag")) return gtag("event", event, {
        event_category: event,
        event_label: event
      }), !1;
      if ("function" == typeof eval("ga")) return ga("send", "event", event, event, event), !1
    } catch (t) {
      t.message
    }
  } catch (t) {}
}

function viewport() {
  var t = window,
    e = "inner";
  return "innerWidth" in window || (e = "client", t = document.documentElement || document.body), {
    width: t[e + "Width"],
    height: t[e + "Height"]
  }
}

function getQueryVariable(t) {
  for (var e = window.location.search.substring(1).split("&"), i = 0; i < e.length; i++) {
    var n = e[i].split("=");
    if (n[0] == t) return n[1]
  }
  return !1
}
$((function() {
    AOS.init({
      easing: "ease-in-out-sine"
    });
    viewport().width;
    var t = viewport().height;

    function e(t) {
      t.bind({
        focus: function() {
          t.addClass("focusOn"), t.next().addClass("focusOn")
        },
        blur: function() {
          if ("" == t.val()) t.removeClass("focusOn"), t.next().removeClass("focusOn");
          else if ("" != t.val()) return t.addClass("focusOn"), t.next().removeClass("focusOn"), void t.next().addClass("focusOn")
        }
      })
    }

    function i(t, e) {
      t && (t.startsWith("mailto:") ? sentData(`email_${e}`) : t.startsWith("https://api.whatsapp.com/send") && sentData(`whatsapp_${e}`))
    }
    $(window).resize((function() {
        viewport().width, t = viewport().height
      })), $.support.leadingWhitespace || $(".lazyload").each((function() {
        var t = $(this).attr("data-src");
        $(this).attr("src", t)
      })), $("form").submit((function(t) {
        if ($(this).find("input[name='keyword']").length) {
          var e = "";
          $(this).find(".row").find("input").length && $(this).find(".row").find("input").each((function() {
            $.trim($(this).val()) && (e = $(this).val())
          }));
          var i = $(this).find("input[name='keyword']").val();
          if (!$.trim(i) && !e) return $.alertText("Enter keyword please. "), void t.preventDefault()
        }
      })), $("a[class*='pop']").click((function(t) {
        t.preventDefault()
      })), $(".popup-modal-dismiss").click((function() {
        $.magnificPopup.close()
      })), $(".popform").magnificPopup({
        closeOnBgClick: !1,
        type: "iframe",
        iframe: {
          markup: '<div class="mfp-form-custom mfp-form-order" style="max-height:' + (t - 55) + 'px"><div class="mfp-close"></div><iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe></div>'
        }
      }), $(".popimg").magnificPopup({
        type: "image"
      }), $(".popgroup").each((function() {
        $(this).find(".item").not($(".slick-cloned")).find("a").not($(".noPop")).magnificPopup({
          type: "image",
          gallery: {
            enabled: !0
          }
        })
      })), $(".popyt").magnificPopup({
        closeOnBgClick: !1,
        type: "iframe",
        iframe: {
          markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe></div>',
          patterns: {
            youtube: {
              id: null,
              src: "%id%"
            }
          }
        }
      }),
      $("table").each((function() {
        var t = $(this).html();
        t = t.replace(/&nbsp;/g, " "), $(this).html(t)
      })),
      $(".footerBarPro").click((function() {
        $(".toolMask").addClass("moveLeft"), $("body").addClass("clear")
      })),
      $("#toolCloseBtn").click((function() {
        $(".toolMask").removeClass("moveLeft"), $("body").removeClass("clear")
      })),
      $("#footerBarClose").click((function() {
        $("#footerToolBar").toggleClass("close"), $("#footer").toggleClass("close")
      })),
      $(".listStyle>li").each((function() {
        if ($(this).find("li").length) {
          $(this).addClass("hasUl");
          $(this).find(">a").click((function(t) {
            t.preventDefault(), $(this).parent("li").toggleClass("icon").siblings(".listStyle>li").removeClass("icon").find("ul").slideUp(), $(this).next("ul").slideToggle()
          }))
        } else {
          $(this).find("ul").hide()
        }
      })),
      $(window).scroll((function() {
        $(window).scrollTop() > 200 ? $("#goTop").fadeIn() : $("#goTop").fadeOut()
      })),
      $("#goTop").click((function() {
        return $("body,html").animate({
          scrollTop: 0
        }, 400), !1
      })),
      $(window.document).find("textarea").each((function() {
        e($(this)), "" != $(this).val() && $(this).addClass("focusOn")
      })),
      $(window.document).find("input").each((function() {
        e($(this)), "" != $(this).val() && $(this).addClass("focusOn")
      })),
      $(document).on("click", ".shopBtn", (function() {
        var t = $("base").attr("href");
        window.open(t + "shop", "_self")
      })),
      $("a").on("click", (function() {
        i($(this).attr("href"), "click")
      })), $("a").on("copy", (function() {
        i($(this).attr("href"), "copy")
      }))
  })), cocoMessage.config({
    duration: 1e4
  }),
  function(t) {
    t.alertText = function(e, i, n) {
      n = arguments[2] || "";
      t.magnificPopup.open({
        closeOnBgClick: !1,
        items: {
          src: '<div class="small-popup"><p>' + e + '</p><button class="popup-modal-dismiss">close</button></div>'
        },
        type: "inline",
        callbacks: {
          close: function() {
            i && (window.location.href = i), n && t(window.parent.document).find(".mfp-close").trigger("click")
          }
        }
      }), t(".popup-modal-dismiss").click((function() {
        t.magnificPopup.close()
      }))
    }
  }(jQuery);

// 获取语言包内容
function getLanguageFun() {
  let get0bj = sessionStorage.getItem('lanuageData') ? JSON.parse(sessionStorage.getItem('lanuageData')) : {}
  if (Object.keys(get0bj).length != 0) {
    return;
  }
  $.ajax({
    async: false,
    type: "GET",
    url: `https://shopsource.singoo.cc/common/lang/${LANG}.json`,
    success: function(res) {
      if (!res.code) {
        sessionStorage.setItem('lanuageData', JSON.stringify(res));
      } else {
        console.log("请求语言包失败");
      }
    }
  });
}
getLanguageFun();
// 展示翻译后的内容
function languageMapFun(text) {
  if (sessionStorage.getItem('lanuageData')) {
    let language_map = JSON.parse(sessionStorage.getItem('lanuageData'));
    console.log('language. map---', language_map);
    if (Object.keys(language_map).length != 0) {
      let item = language_map[text] ? language_map[text] : text;
      console.log("当前翻译的句子", text, '-----', item);
      return item;
    }
  } else {
    return text;
  }
}