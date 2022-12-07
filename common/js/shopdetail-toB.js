$(function() {
  var productDOM = $(".product-detail-value");

  if (productDOM.length && typeof(baseurl) != "undefined") {
    init()

    async function init() {
      var ulrs = window.location.pathname.split("/");
      var productInfo = await loadProduct(ulrs[ulrs.length - 1]);

      initData(productInfo);
    }

    function initData(productInfo) {
      var selectTags = "";
      var buyType = 1;
      var dayDiff = 0;
      var showNumber = 2;
      var shipInfo = {};
      var checkShopId = "";
      // initModalForm();
      initModalSample();
      initShopForm();

      loadCountryList();

      $(document).click(function(e) {
        var e = e || window.event; //浏览器兼容性   
        var elem = e.target || e.srcElement;

        while (elem) {
          //循环判断至跟节点，防止点击的是div子元素   
          if ($(elem).hasClass("unit-show") || $(elem).hasClass("unit-content") || $(elem).hasClass("schedule-content")) {
            return;
          }
          // if ($(elem).hasClass("unit-content")) {
          //     return;
          // }
          elem = elem.parentNode;
        }
        $(".unit-content").hide();
        if (typeof hideScheduleView == 'function') {
          hideScheduleView()
        }
      })

      var shopList = productInfo.enable_attribute ? productInfo.attribute_combinations.map(item => {
        item.value = 0;
        return item;
      }) : [];

      initAttributeView($(".attribute-list-value"));
      // initViewForm();
      loadShopList();

      if (productInfo.product_custom_plan_id && productInfo.customs.length > showNumber) {
        var html = `<div class="checkboxW  customization-value active"> 
                        <label for="customization" class="d-flex justify-content-between"> 
                            <span class="customization-title-value more-view">
                            ${languageMapFun("More")}
                                <svg t="1624865867808" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8021" width="12" height="12">
                                    <path stroke-width="100"  d="M936.486 336.907c13.839-14.39000001 13.393-37.274-0.999-51.113-14.39-13.84-37.274-13.393-51.113 0.999L513.98399999 660.57 138.417 288.375c-14.188-14.068-37.092-13.97-51.162 0.219-14.06700001 14.187-13.969 37.092 0.22 51.161L486.623 735.32c0.612 0.621 1.41 0.767 2.02 1.34 0.136 0.136 0.174 0.32 0.32 0.464l0.008 0.007c14.174 14.054 37.055 13.954 51.11-0.22l395.594-399.187c0.276-0.266 0.546-0.54 0.81-0.817z" p-id="8022"></path>
                                </svg>
                            </span>
                        </label>
                    </div>`

        productDOM.find(".customization-list-value").each(function() {
          $(this).find(".checkboxW[data-number]").each(function(index) {
            if (index > showNumber - 1) {
              $(this).hide();
            }
          })
        })
        productDOM.find(".customization-list-value").append(html);
      }

      if (productInfo.related_products && productInfo.related_products.length) {
        var html = ""
        productInfo.related_products.forEach(item => {
          html += `<div class="item col-md-3 align-items-center mb-md-20">
                       <div class="row">
                           <div class="col-3 col-md-12">
                               <img src="${item.files && item.files.images.length && item.files.images[0].path}" alt="">
                           </div>
                           <div class="col-9 col-md-12 d-flex flex-column justify-content-between">
                               <a class="title mb-20 mb-md-10" href="${window.location.origin + item.url_visit}">${item.name}</a>
                               <div class="d-flex justify-content-between">
                                   <p><strong class="price-value">${item.currency} ${item.special_price}</strong>/<span class="measure-box">${productInfo.measure}</span></p>
                                   <div class="btn-buy-now d-block d-md-none">${languageMapFun("Buy Now")}</div>
                               </div>
                           </div>
                       </div>
                   </div>`
        })
        $(".spot-Modal .product-list-box").html(html);
      } else {
        $(".btn-buy-spot").closest(".btn-type-2").remove();
      }

      if (!productInfo.customs.length) {
        $(".type-list-box").addClass("d-none");
        $(".type-list-box").removeClass("d-flex");

        $(".btn-type-2").remove();
        $(".btn-type-1").removeClass("d-none");
        $(".order-view").removeClass("d-none");

      } else {
        $(".order-view").addClass("hasCustom");
      }


      if (productInfo.product_contract_days.length) {
        var html = ""
        var curTime = new Date();
        productInfo.product_contract_days.forEach((item, index) => {
          if (index == 0) {
            dayDiff = item.days;
          }
          curTime.setDate(curTime.getDate() + item.days);
          html += `<div class="flex-grow-1 item ${index == 0 ? "active" : ""}" data-days="${item.days}">
                    <strong>${curTime.getMonth() + 1}.${curTime.getDate()}</strong>
                    <p>${item.days} ${languageMapFun("days later")}</p>
                </div>`
        })
        html += `<div class="flex-grow-1 item custom">
                      <div class="content d-flex align-items-center justify-content-center ">
                          <div class="mr-10 mr-md-20">
                              <input name="date" type="hidden">
                              <strong>${languageMapFun("Date")}</strong>
                              <p>${languageMapFun("Custom")}</p>
                              
                          </div>
                          <svg t="1624865867808" class="icon" viewbox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8021" width="12" height="12">
                              <path stroke-width="100" d="M936.486 336.907c13.839-14.39000001 13.393-37.274-0.999-51.113-14.39-13.84-37.274-13.393-51.113 0.999L513.98399999 660.57 138.417 288.375c-14.188-14.068-37.092-13.97-51.162 0.219-14.06700001 14.187-13.969 37.092 0.22 51.161L486.623 735.32c0.612 0.621 1.41 0.767 2.02 1.34 0.136 0.136 0.174 0.32 0.32 0.464l0.008 0.007c14.174 14.054 37.055 13.954 51.11-0.22l395.594-399.187c0.276-0.266 0.546-0.54 0.81-0.817z" p-id="8022"></path>
                          </svg>
                      </div>
                      <div id="schedule-box"></div>
                  </div>
                  `
        $(".lead-time .text-center").html(html);
        $(".lead-time").removeClass("d-none");

        $(productDOM).on("click", ".lead-time .item", function(event) {
          if (!$(this).hasClass("active")) {
            $(".lead-time .item.active").removeClass("active");
            $(this).addClass("active");
            dayDiff = this.dataset.days;
          }
          if ($(this).hasClass("custom")) {
            event.stopPropagation();
          }
        })

        $(productDOM).on("click", ".lead-time .item .content", function() {
          if (!$(this).hasClass("active")) {
            $("#schedule-box").fadeIn();
            $(".order-view").css("z-index", 30000010);
            $(this).addClass("active");
          } else {
            hideScheduleView()
          }

        })


        $(productDOM).on("click", "#schedule-box", function(event) {
          if (event.target == this) {
            hideScheduleView()
          }
        })

        function hideScheduleView() {
          $("#schedule-box").fadeOut();
          $(".lead-time .item .content").removeClass("active");
          $(".order-view").css("z-index", 3000001);
        }


        var mySchedule = new Schedule({
          el: '#schedule-box', //指定包裹元素（可选）
          disabledBefore: new Date(),
          clickCb: function(y, m, d) {
            var list = y.split("-");
            //点击日期回调（可选）
            hideScheduleView();
            $(".lead-time .item.custom strong").text(`${parseInt(list[1])}.${parseInt(list[2])}`);
            var endTime = new Date(y.replace(/-/g, "/"));
            var dateDiff = endTime.getTime() - new Date().getTime();
            dayDiff = Math.ceil(dateDiff / (24 * 3600 * 1000)); //计算出相差天数
          },
          nextMonthCb: function(y, m, d) {
            //点击下个月回调（可选）
          },
          nextYeayCb: function(y, m, d) {
            //点击下一年回调（可选）
          },
          prevMonthCb: function(y, m, d) {
            //点击上个月回调（可选）
          },
          prevYearCb: function(y, m, d) {
            //点击上一年月回调（可选）
          }
        });


      } else {
        $(".lead-time").remove();
      }

      if (productInfo.related_custom && productInfo.related_custom.length) {
        $(".custom-view").removeClass("d-none");
        $(document).on("click", ".custom-view>div", function() {
          window.open(window.location.origin + productInfo.related_custom[0].url_visit, "_self");
        })
      }

      $(document).on("click", ".btn-buy-now", function() {
        var href = $(this).closest(".item").find("a").attr("href");
        window.open(href, "_self");
      })

      $(productDOM).on("click", ".btn-buy-spot", function(event) {

        if (productInfo.related_products.length == 1) {
          window.open(window.location.origin + productInfo.related_products[0].url_visit, "_self")
          event.stopPropagation();
        }
      })

      $(productDOM).on("click", ".description-value .title", function(event) {
        var contentDOM = $(this).closest(".description-value").find(".description-content-value");
        var svgDOM = $(this).find("svg.plus");
        if ($(contentDOM).is(":hidden")) {
          svgDOM.hide();
          svgDOM.siblings("svg").show();
        } else {
          svgDOM.show();
          svgDOM.siblings("svg").hide();
        }
        contentDOM.fadeToggle();
      })


      $(productDOM).on("click", ".attribute-list-value .item:not(.last-item) .attribute-value", function() {

        $(this).closest(".item").find("span").text(firstUpperCase($(this).data("name")));
        var ul = $(this).closest("ul");
        ul.find(".attribute-value.active").removeClass("active");
        $(this).addClass("active");

        $(".attribute-list-value .last-item .addNum span").removeClass("disabled");

        checkSampleState();
        queryProductStock();
      })

      $(productDOM).on("click", ".more-view", function() {
        var DOM = $(this).closest(".customization-list-value");
        if (this.dataset.open == 1) {
          this.dataset.open = 0;
          $(this).find("svg").css({
            "transform": "rotate(0deg)",
            "transition": "all 0.5s"
          })
          DOM.find(`*[data-number]`).each(function(index) {
            if (index > showNumber - 1) {
              $(this).hide();
            }
          })
        } else {
          this.dataset.open = 1;
          DOM.find(`*[data-number]`).each(function(index) {
            if (index > showNumber - 1) {
              $(this).show();
            }
          })
          $(this).find("svg").css({
            "transform": "rotate(180deg)",
            "transition": "all 0.5s"
          });
        }

      })

      $(productDOM).on("click", ".unit-show", function() {
        if (parseInt($(this).find(".total-number").text()) > 0 && productInfo.attribute_combinations.length) {
          $(this).siblings(".unit-content").toggle();
        }
      })

      if ($(productDOM).find(".attribute-list-value item:not(.last-item)").length) {
        $(productDOM).find(".attribute-list-value ul").each(function() {
          $(this).children().eq(0).click();
        });
      } else {
        queryProductStock();
      }


      $(document).on("click", ".btn-inquiry", function() {
        setProductForm()
      })

      $(document).on("input", "input[name='quantity_form']", function() {
        var val = this.value || '';
        val = val.replace(/[^\d]/g, '').replace(/^[0]+/g, "");
        val = val.slice(0, 6);
        this.value = val;
        setProductForm()
      })

      function setProductForm() {
        var product = [{
          name: productInfo.name,
          count: $("input[name='quantity_form']").val(),
          unit_price: productInfo.special_price,
          href: document.location.origin + productInfo.url_visit
        }]
        localStorage.setItem("product_form", JSON.stringify(product))
      }


      $(productDOM).on("click", ".btn-cart", function() {
        addCart(this, 1)
      })

      $(productDOM).on("click", ".type-list-box div", function() {
        if ($(this).hasClass("active")) return;
        $(".type-list-box div").removeClass("active");
        $(this).addClass("active");
        buyType = $(this).data("type");

        if (buyType == 2) {
          $(".btn-customization").closest(".btn-type-1").removeClass("d-md-block");
          $(".btn-cart").closest(".btn-type-1").removeClass("col-6").addClass("col-12");
          $(".btn-cart").text(languageMapFun("Start Order"));
          $(".customization-list-value .customization-value span:not(.customization-title-value)").hide();
        } else {
          $(".btn-cart").closest(".btn-type-1").removeClass("col-12").addClass("col-6");
          $(".btn-customization").closest(".btn-type-1").addClass("d-md-block");
          $(".btn-cart").text(languageMapFun("Add to Cart"));
          $(".customization-list-value .customization-value span:not(.customization-title-value)").show();

        }
        queryProductStock(2);
      })


      $(productDOM).on("click", ".btn-custom-order,.variations-content-view", function() {
        $(".order-view").addClass("active");
        setTimeout(() => {
          $(".order-view>div").css("margin-top", "40vh");
        }, 50);
        $(".btn-buy .flexW").addClass("active");
      })


      //直接购买
      $(productDOM).on("click", ".btn-customization", function() {
        addCart(this, 2)
      })

      if ($(window).width() < 875) {


        $(productDOM).on("click", ".order-view>div", function(event) {
          event.stopPropagation();
        })

        $(productDOM).on("click", ".order-view", function() {
          $(".order-view>div").css("margin-top", "100vh");
          setTimeout(() => {
            $(".order-view").removeClass("active");
          }, 600);
          $(".btn-buy .flexW").removeClass("active");
        })

        if ($(productDOM).find(".description-list-value .description-value").length) {
          $(productDOM).find(".description-value").eq(0).find(".title").eq(0).click();
        }

        if (productInfo.customs.length == 0) {
          $(".variations-view").removeClass("d-block").addClass("d-none");
        }

        // if ($(".btn-buy")) {
        //   var offsetTop = $(".btn-buy").offset().top;
        //   var buyHeight = $(".btn-buy>div").eq(0).height();
        //   var windowHeight = $(window).height();
        //   $(document).on("scroll", function() {
        //     let scrollTop = $(document).scrollTop();
        //     if (scrollTop > offsetTop || scrollTop - buyHeight < offsetTop - windowHeight + 16) {
        //       $(".btn-buy>div").eq(0).addClass("fixed");
        //     } else {
        //       $(".btn-buy>div").eq(0).removeClass("fixed");
        //     }
        //   })
        // }

        var superDOM = productDOM.closest("div[data-group]");
        if (superDOM.length) {
          var nextGroup = superDOM.next("div[data-group]");
          var totalView = $(".btn-buy .flexW");
          if (totalView.length) {
            var height = parseFloat(window.getComputedStyle(totalView[0], null).height) + 20;
            nextGroup.css("padding-bottom", height + "px");
          }
        }
      }

      function addCart(DOM, type) {
        if ($(DOM).hasClass("disabled")) {
          $(".error_tip").text(languageMapFun("Please purchase at least one item"));
          if ($(window).width() < 875) {
            $("html, body").animate({
              scrollTop: $(".attribute-list-value .item.last-item").offset().top - 200
            }, {
              duration: 500,
              easing: "swing"
            });
          }
          return
        }

        if (buyType == 2) {
          let sum = 0;
          shopList.forEach(item => {
            sum += item.value;
          })
          if (sum > productInfo.sample_mpq) {
            $(".error_tip").text(`${languageMapFun("The maximum purchase quantity of samples cannot be greater than")} ${productInfo.sample_mpq}`);
            return
          }
        }
        $(".error_tip").text("");
        if (buyType == 2) {
          buySample();
        } else {
          buyProduct(type);
        }

      }

      function buySample() {
        var storageParams = [];
        if (shopList.length) {
          shopList.forEach((item, index) => {
            if (item.value > 0) {
              var cart = {
                id: new Date().getTime() + index,
                product: productInfo,
                product_attribute_combination: item,
                product_combination_id: item.id,
                product_id: productInfo.id,
                contract_days: dayDiff,
                qty: item.value
              }
              storageParams.push(cart);
            }
          })
        } else {
          var cart = {
            id: new Date().getTime(),
            product: productInfo,
            product_attribute_combination: null,
            product_combination_id: null,
            product_id: productInfo.id,
            contract_days: dayDiff,
            qty: $(this).closest("#buySamplesModal").find("input[name='product_quantity']").val()

          }
          storageParams.push(cart);
        }
        localStorage.setItem("cartInfo", JSON.stringify(storageParams));
        var baseHref = $("base").attr("href");
        window.open(`${baseHref}cart?buysample=1`, "_self");
      }

      function buyProduct(type) {
        var params = {};
        if (shopList.length) {
          var values = shopList.filter(item => item.value > 0).map(item => {
            var temp = {};
            temp.combination_id = item.id;
            temp.qty = item.value;
            return temp;
          });

          params.combinations = values;
        } else {
          params.qty = $(productDOM).find("input[name='product_quantity']").val();
        }
        params.contract_days = dayDiff;
        $.ajax({
          method: "POST",
          url: baseurl + "/api/cart/products/" + productInfo.id,
          data: params,
          success: (res) => {
            if (res.code == 200) {
              cocoMessage.success(languageMapFun("Add shopping cart successfully"), 3000);
              if (shopList.length) {
                shopList.map(item => {
                  item.value = 0;
                  return item;
                });
              }
              $(".addNum .plus").removeClass("disabled");
              if (type == 1) {
                $(".carNum").addClass("d-block");
                $(".carNum").text(res.data.product_kind_quantity);
                queryProductStock(2);
              } else {
                var baseHref = $("base").attr("href");
                window.open(`${baseHref}cart?cart_id=${res.data.id}`, "_self");
              }

            } else {
              cocoMessage.error(languageMapFun(res.message), 3000);
            }

          },
          error: function(error) {
            cocoMessage.error(languageMapFun("Failed to add shopping cart"), 3000);
          }
        });
      }


      $('#ship_form').on("change", "input[name='programme']", function() {
        $(this).closest(".ship-list-view").find(".shop-content").removeClass("active");
        $(this).siblings(".shop-content").addClass("active");
        var shopDetail = shipInfo.list.find(item => item.id == this.value);
        checkShopId = this.value;
        setShopProgramme(shopDetail);
      });

      $('#ship_form').on("change", "select[name='country']", function() {
        var addressDOM = $(this).closest(".to-box");
        addressDOM.find("span").text($(this).find("option:selected").text());
        addressDOM.find("img").attr("src", `${OSS_CDN_DOMAIN}common/flags/${this.value.toLocaleLowerCase()}.svg`);
        loadShopList(this.value);
      });

      function setShopProgramme(shopDetail) {

        if (!shopDetail || shopDetail.amount == -1) {
          $(".ship-view .name-box").text(languageMapFun("Please contact us to confirm shipping costs"));
          $(".ship-view .desc-box").hide();
          $(".ship-view .price-box").hide();
          $(".ship-view .free-ship-view").text("");

        } else {
          $(".ship-view .desc-box").show();
          $(".ship-view .name-box").text(shopDetail.name);
          $(".ship-view .desc-box").text(shopDetail.description);

          if (parseInt(shopDetail.amount) == 0) {
            $(".ship-view .free-ship-view").text(languageMapFun("Free Shipping"));
          } else {
            $(".ship-view .free-ship-view").text("");
            $(".ship-view .price-box").show();
            $(".ship-view .price-box").text(`${shopDetail.currency} ${parseInt(shopDetail.amount).toFixed(2)}`);

          }
        }

      }


      productDOM.on("click", ".addNum .plus", function() {
        if ($(this).hasClass("disabled")) return
        var par = $(this).parents('.addNum');

        var val = parseInt(par.find('input').val());
        val += 1;
        if (val > 999999) {
          return
        }

        var tag = shopList.find(item => item.id == par.find('input').attr("data-id"));

        if (tag && val >= tag.qty) {
          val = tag.qty;
          $(this).addClass("disabled")
        }
        $(par).find(".less").removeClass("disabled");
        par.find('input').val(val);
        productDOM.find(`input[data-id=${par.find('input').attr("data-id")}]`).val(val);

        queryProductStock();
      })

      productDOM.on("click", ".addNum .less", function() {
        if ($(this).hasClass("disabled")) return

        var par = $(this).parents('.addNum');
        var val = parseInt(par.find('input').val());

        val -= 1;

        if (val <= 0 || !val) {
          val = 0;
          $(this).addClass("disabled")
        }
        $(par).find(".plus").removeClass("disabled");
        par.find('input').val(val);
        productDOM.find(`input[data-id=${par.find('input').attr("data-id")}]`).val(val);

        queryProductStock();
      })

      productDOM.on("input", "input[name='product_quantity']", function() {
        var par = $(this).parents('.addNum');
        var val = this.value || '';
        val = val.replace(/[^\d]/g, '').replace(/^[0]+/g, "");
        val = val.slice(0, 6);
        if (val == 0 || !val) {
          val = 0;
          $(par).find(".less").addClass("disabled");
        } else {
          $(par).find(".less").removeClass("disabled");
        }

        var tag = shopList.find(item => item.id == $(this).attr("data-id"));
        if (tag) {
          if (val >= tag.qty) {
            $(par).find(".plus").addClass("disabled");
            if (val > tag.qty) {
              if (tag.qty == 0) {
                cocoMessage.warning(languageMapFun(`This attribute has no inventory`), 3000)
              } else {
                cocoMessage.warning(`${languageMapFun("Purchase")} ${tag.qty} ${tag.qty == 1 ? productInfo.measure : productInfo.measures} ${languageMapFun("at most")}`, 3000)
              }
            }
            val = tag.qty;
          } else {
            $(par).find(".plus").removeClass("disabled");
          }
        }
        this.value = val;
        productDOM.find(`input[data-id=${$(this).attr("data-id")}]`).val(this.value);
        queryProductStock();
      })

      // productDOM.on("blur", "input[name='product_quantity']", function () {
      //     var val = this.value;
      //     if (val == 0 || !val) {
      //         val = 0;
      //         $(par).find(".less").addClass("disabled");
      //     }
      //     var tag = shopList.find(item => item.id == $(this).attr("data-id"));
      //     if (val != this.value || this.value == "") {
      //         this.value = val;
      //     } else if (shopList.length) {
      //         if(val >= tag.qty){
      //             $(par).find(".plus").addClass("disabled");
      //             this.value = tag.qty;
      //             if(val > tag.qty){
      //                 cocoMessage.warning(`Purchase ${tag.qty} ${tag.qty==1?productInfo.measure:productInfo.measures} at most`, 3000)
      //             }
      //         }else{
      //             $(par).find(".plus").removeClass("disabled");
      //         }
      //     }
      //     productDOM.find(`input[data-id=${$(this).attr("data-id")}]`).val(this.value);
      //     queryProductStock();

      // })



      //滚动到指定图片
      // function scrollToImage() {
      //     var index = -1;
      //     productDOM.find(`.iniBanner .item[data-tag]`).each(function () {
      //         var tagList = this.dataset.tag.split("--");
      //         if (tagList.length && tagList.find(item => item == selectTags)) {
      //             index = $(this).attr("data-slick-index");
      //         }
      //     })
      //     if (index > -1) {
      //         productDOM.find('.iniBanner').slick("slickGoTo", index);
      //     }

      // }



      function queryProductStock(type) {
        var sum = 0;
        if (shopList.length) {

          var choostAttache = getChooseAttache();
          productDOM.find(".cartForm .last-item ul li").each(function() {
            var inputDOM = $(this).find("input");
            if (inputDOM.attr("data-id")) {
              var tag = shopList.find(item => item.id == inputDOM.attr("data-id"));
            } else {
              var tag = shopList.find(item => item.combination == (choostAttache ? choostAttache + "," : "") + inputDOM.data("name"));
              if (tag) {
                inputDOM.attr("data-id", tag.id);
              }
            }

            if (tag) {
              if (type == 2) {
                tag.value = 0;
                inputDOM.val(0);
              } else {

                tag.value = parseInt(inputDOM.val());
              }
            }

          })
          shopList.forEach(item => {
            sum += item.value;
          })

          var cartDOM = productDOM.find(".unit-content ul");
          shopList.forEach(item => {
            var isFlag = false;
            var price = productInfo.special_price;
            if (buyType == 1) {
              if (productInfo.enable_price_ladder && productInfo.price_ladders.length) {

                if (productInfo.ladder_billing_type == "discount") {
                  productInfo.price_ladders.forEach(ladder => {
                    if (sum >= ladder.qty) {
                      price = item.price * (ladder.discount / 100);
                      isFlag = true;
                    }
                  })
                } else {
                  productInfo.price_ladders.forEach(ladder => {
                    if (sum >= ladder.qty) {
                      price = ladder.price;
                      isFlag = true;
                    }
                  })
                }

              }

              if (!isFlag && productInfo.enable_attribute && productInfo.attribute_combinations.length) {
                price = item.price;
              }
            } else {
              if (productInfo.enable_attribute && productInfo.attribute_combinations.length) {
                price = item.price;
              }
            }

            productDOM.find(`.cartForm .addNum input[data-id='${item.id}']`).closest("li").find(".price-box span").text(parseFloat(price).toFixed(2));

            var li = cartDOM.find(`li[data-id='${item.id}']`);
            if (item.value) {
              if (li.length) {
                li.find("input").val(item.value);
                li.find(".text-right span").text(parseFloat(price).toFixed(2));
              } else {
                var html = `<li data-id='${item.id}' class="d-flex align-items-center">
                                <div class="attribute-box" data-name="${encodeURIComponent(item.combination)}">${firstUpperCase(item.combination)}</div>
                                <div class="addNum">
                                    <input type="number" class="cart-input"  data-id='${item.id}' name="product_quantity" autocomplete="off"  value="${item.value}" min="0">
                                    <span class="plus focusOn"></span>
                                    <span class="less"></span>
                                </div>
                                <div class="text-right">${productInfo.currency}<span class="ml-5">${parseFloat(price).toFixed(2)}</span></div>
                            </li>`
                cartDOM.append(html);
              }
            } else {
              if (li.length) {
                li.remove();
              }
            }
          })
        } else {
          sum = productDOM.find(".cartForm .addNum input").val();
          var price = productInfo.special_price;
          if (productInfo.enable_price_ladder && productInfo.price_ladders.length) {

            if (productInfo.ladder_billing_type == "discount") {
              productInfo.price_ladders.forEach(ladder => {
                if (sum >= ladder.qty) {
                  price = productInfo.special_price * (ladder.discount / 100);
                }
              })
            } else {
              productInfo.price_ladders.forEach(ladder => {
                if (sum >= ladder.qty) {
                  price = ladder.price;
                }
              })
            }

          }
          $(".new.price-value").text(productInfo.currency + " " + parseFloat(price).toFixed(2));


          // productDOM.find(".cartForm .addNum input").val(value);
        }

        productDOM.find(".total-number").text(sum);
        if (sum <= 1) {
          productDOM.find(".unit-show .measure-value").text(productInfo.measure);
        } else {
          productDOM.find(".unit-show .measure-value").text(productInfo.measures);
        }

        if (productInfo.price_ladders.length > 0) {
          var itemActive = null;
          productDOM.find(".discount .item").each(function() {
            var maxNumber = this.dataset.number;
            if (sum >= parseInt(maxNumber)) {
              itemActive = $(this);
            }
          })
          if (itemActive != productDOM.find(".discount .item.active")) {
            productDOM.find(".discount .item.active").removeClass("active");
            itemActive && itemActive.addClass("active");
          }
        }

        if (productInfo.customs.length > 0) {
          productDOM.find(".customization .checkboxW[data-number]").each(function(index) {
            var maxNumber = this.dataset.number;
            if (sum >= parseInt(maxNumber)) {
              if (index == 0) {
                productDOM.find(".btn-customization").removeClass("disabled");
              }
              $(this).addClass("active");
            } else {
              if (index == 0) {
                productDOM.find(".btn-customization").addClass("disabled");
              }
              $(this).removeClass("active");
            }
          })
        }

        if (sum == 0) {
          productDOM.find(".unit-content").hide();
          productDOM.find(".btn-type-1 .btn:not(.btn-inquiry)").addClass("disabled");
          $("input[name='quantity_form']").val(productInfo.moq || 1);
        } else {
          productDOM.find(".btn-type-1 .btn:not(.btn-inquiry)").removeClass("disabled");
          $("input[name='quantity_form']").val(sum);
          $(".error_tip").text("");

        }
        loadShopList();
      }

      function initAttributeView(superDOM) {
        superDOM.html("");
        var text = "";


        if (productInfo.attributes.length == 0 || !productInfo.enable_attribute) {
          var html = `<div class="item row last-item">
                            <ul class="col-12 col-md-auto">
                                <li>
                                    <div class="attribute-value flex-grow-1">Quantity:</div>
                                    <div class="addNum">
                                        <input type="number" id="quantity" name="product_quantity" autocomplete="off" value="0" min="1">
                                        <span class="plus focusOn"></span>
                                        <span class="less"></span>
                                    </div>
                                </li>
                            </ul>
                        </div>`;
          superDOM.append(html);
          superDOM.find(".price-box span").text(parseInt(productInfo.special_price).toFixed(2));
        } else {
          productInfo.attributes.forEach((custom, index) => {
            var customDOM = document.createElement("div");
            customDOM.className = `item row ${index == productInfo.attributes.length - 1 ? 'last-item' : ''}`;
            customDOM.innerHTML = `<label class="col-12 col-md-auto attribute-title-value">${custom.name}:<span class="ml-10"></span></label>
                    <ul class="col-12 mt-10"></ul>`
            if (index < productInfo.attributes.length - 1) {
              custom.list.forEach((attache, index) => {
                if (custom.show_type == "image") {
                  var li = `<li class="attribute-value mb-10 ${index == 0 ? 'active' : ''}" data-name="${attache.value}">
                                            <img src="${attache.image.path}?x-oss-process=image/resize,w_120/quality,q_80"  title="${attache.value}"/>
                                          </li>`
                } else {
                  var li = `<li class="attribute-value mb-10 ${index == 0 ? 'active' : ''}" data-name="${attache.value}">${attache.value}</li>`
                }
                $(customDOM).find("ul").append(li);
              })
            } else {
              custom.list.forEach(attache => {
                var attacheDOM = ""
                if (custom.show_type == "image") {
                  attacheDOM = `<div class="attribute-value" data-name="${attache.value}"><img src="${attache.image.path}?x-oss-process=image/resize,w_120/quality,q_80"  title="${attache.value}"/></div>`
                } else {
                  attacheDOM = `<div class="attribute-value" data-name="${attache.value}">${attache.value}</div>`
                }

                var li = `<li>${attacheDOM}
                                    <div class="price-box">${productInfo.currency}<span class="ml-5 font-weight-bold">${productInfo.special_price}</span><i class="unit-box">/${productInfo.measure}</i></div>
                                    <div class="addNum">
                                        <input type="number" id="quantity" data-name="${attache.value}" name="product_quantity" autocomplete="off" value="0" min="1">
                                        <span class="plus focusOn"></span>
                                        <span class="less"></span>
                                    </div></li>`

                $(customDOM).find("ul").append(li);
              })

            }
            text += `${custom.name} : ${custom.list.length} `
            superDOM.append(customDOM);
          })

          $(".variations-view .attribute-title-list").text(text);
          $(".attribute-list-value .attribute-value").each(function(index) {
            if (index < 10) {
              var valueHtml = $(this).html();
              if (!$(this).find("img").length) {
                valueHtml = `<span>${valueHtml}</span>`
              }
              valueHtml = `<div>${valueHtml}</div>`
              $(".variations-view .attribute-value-list").append(valueHtml);
            }
          })
        }
      }

      function initModalForm() {
        var html = `<div class="modal fade light" id="contact_form" tabindex="-1" aria-labelledby="contact_formLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content ">
                                    <div class="modal-header d-flex align-items-center pt-10 pb-10">
                                        <h5 class="modal-title flex-grow-1">Contact US</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="row">
                                            <div>
                                                <div class="row product-info">
                                                    <div class="col-12 col-md-7 mb-20 mb-md-0">
                                                        <div class="product-tr">Product Information</div>
                                                        <div class="d-flex mt-10">
                                                            <img class="product_img" src="" />
                                                            <div class="ml-10 mr-10">
                                                                <p class="product-title-box"></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-6 col-md-4">
                                                        <div class="product-tr">Quantity</div>
                                                        <div class="mr-50">
                                                            <input class="w-100" value="1" min="1" type="number" name="quantity_form" />
                                                        </div>
                                                    </div>
                                                    <div class="flex-grow-1">
                                                        <div class="product-tr">Unit</div>
                                                        <div class="product-unit-box">Piece</div>
                                                    </div> 
                                                </div>
                                                <p class="mb-10">Support order samples, customization, wholesale direct, and complete payment.
                                                If the product you look for does not have corresponding customized content, pls fill out the form below to contact us, and we will reply ASAP.</p>
                                                <div class="crm_form-wrap mb-20"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`
        $("body").append(html);

        if ($("#contact_form .crm_form-wrap").html().replace(/\s\n/g, "") == "") {

          // $("#contact_form .crm_form-wrap").html($(".crm_form-wrap .crm-form").html())
          $("#contact_form .crm_form-wrap").html($(".crm_form-wrap .crm-form").prop("outerHTML"));

          var oldScript = $(".crm_form-wrap").find("script");
          oldScript.remove();

          var newScript = document.createElement('script');
          newScript.type = 'text/javascript';
          newScript.innerHTML = oldScript.html();
          $(".crm_form-wrap").eq(0).append(newScript);

        }
      }

      function initModalSample() {
        var html = `<div class="modal fade light spot-Modal" id="spotModal" tabindex="-1" aria-labelledby="spotModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header d-flex align-items-center m-10">
                                        <h5 class="modal-title flex-grow-1" id="spotModalLabel">${languageMapFun("Samples")}</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <div class="mt-0 mb-md-20">
                                                <div class="product-list-box d-flex flex-column flex-wrap flex-md-row m-0 m-md-20">
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`
        $("body").append(html);
      }

      function initShopForm() {
        var html = `<div class="modal fade light" id="ship_form" tabindex="-1" aria-labelledby="ship_formLabel">
                                <div class="modal-dialog">
                                    <div class="modal-content ">
                                        <div class="modal-header d-flex align-items-center pt-10 pb-10 border-bottom">
                                        <h5 class="modal-title flex-grow-1">${languageMapFun("Shipping")}</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">×</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            
                                            <div class="row mt-20 mb-20">
                                                <div class="col-md-4 d-flex align-items-center mr-md-30 mb-10 mb-md-0">
                                                <span>${languageMapFun("From")}:</span>
                                                    <div class="d-flex align-items-center address-box ml-10 form-box">
                                                        <span class="mr-10">--</span>
                                                        <img src="" alt="">
                                                    </div>
                                                </div>
                                                <div class="col-auto d-flex align-items-center">
                                                <span>${languageMapFun("To")}:</span>
                                                    <div class="d-flex align-items-center address-box ml-10 to-box">
                                                    <span class="mr-10">${languageMapFun("Please Select")}</span>
                                                        <img src="" alt="">
                                                        <svg t="1627350244259" class="icon" viewBox="0 0 1000 1000" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9269" width="16" height="16">
                                                            <path d="M801.138 547.753l-359.02099999-386.738-165.645 0 359.01999999 386.737-359.021 359.006 165.645 0 359.021-359.006zM801.138 547.753z" p-id="9270" fill="#333333"></path>
                                                        </svg>
                                                        <select name="country"></select>
                                                    </div>
                                                </div>
                                            </div>
                                            <p class="p-10 desc mb-20">
                                            ${languageMapFun("Please add product/custom quantity in variation to see exact shipping fee")}
                                            <div class="ship-list-view">
                                                <div class="loading-view">
                                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50" xml:space="preserve">
                                                        <path d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z" transform="rotate(275.098 25 25)">
                                                            <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="1s" repeatCount="indefinite"></animateTransform>
                                                        </path>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`
        $("body").append(html);
      }

      function initViewForm() {
        $(".contactus-001 .product-header").show();
        $(".contactus-001 .product-info .product_img").attr("src", productInfo.files.images && productInfo.files.images[0].path + "?x-oss-process=image/resize,w_120/quality,q_80");
        $(".contactus-001 .product-info .product-unit-box").text(productInfo.currency + " " + productInfo.special_price + "/" + productInfo.measure);
        $(".contactus-001 .product-info .product-title-box").text(productInfo.name);
      }

      // 获取货运方式
      function loadShopList(country_code) {
        var params = {
          product_id: productInfo.id
        };
        if (shopList.length) {
          var values = shopList.filter(item => item.value > 0).map(item => {
            var temp = {};
            temp.combination_id = item.id;
            temp.qty = item.value;
            return temp;
          });

          params.combinations = values;
        } else {
          params.qty = $(productDOM).find("input[name='product_quantity']").val();
        }
        if (country_code) {
          params.country_code = country_code;
        }
        window.clearTimeout(this._changeTimer)
        this._changeTimer = null;
        this._changeTimer = setTimeout(() => {
          $("#ship_form .loading-view").css("display", "flex");
          $.ajax({
            method: "GET",
            url: baseurl + "/api/shipping/fee",
            data: params,
            success: (res) => {
              var html = "";
              shipInfo = res.data;
              $("#ship_form .ship-list-view label,#ship_form .ship-list-view .desc").remove();
              if (shipInfo.to && shipInfo.from) {
                $("#ship_form select[name='country']").val(shipInfo.to.country_code);
                $("#ship_form .to-box span").text(shipInfo.to.country_name);
                $("#ship_form .to-box img").attr("src", `${OSS_CDN_DOMAIN}common/flags/${shipInfo.to.country_code.toLocaleLowerCase()}.svg`);

                $("#ship_form .form-box span").text(shipInfo.from.country);
                $("#ship_form .form-box img").attr("src", `${OSS_CDN_DOMAIN}common/flags/${shipInfo.from.country_code.toLocaleLowerCase()}.svg`);
                $(".ship-view .from-box").text(shipInfo.from.country);
                $(".ship-view .to-box").text(shipInfo.to.country_name);
              }
              if (res.data.list && res.data.list.length) {
                res.data.list.forEach((item, index) => {
                  var shopPrice = ""
                  if (item.amount == -1) {
                    shopPrice = `<p>${languageMapFun("To be negotiated")}</p>`
                  } else if (parseInt(item.amount) == 0) {
                    shopPrice = ` <p>${languageMapFun("Free Shipping")}</p>`
                  } else {
                    shopPrice = ` <p>${item.currency} ${parseInt(item.amount).toFixed(2)}</p>`
                  }
                  html += `<label class="d-flex align-items-center mb-10 ">
                                <input type="radio" name="programme" ${index == 0 ? "checked" : ""} value="${item.id}">
                                <div class="shop-content  flex-grow-1 ml-20 ${index == 0 ? "active" : ""}">
                                    <div class="d-flex justify-content-between">
                                        <p>${item.name}</p>
                                        ${shopPrice}
                                    </div>
                                    <div class="d-flex justify-content-between">
                                        <p class="row col-8">${item.description}</p>
                                        <p>${languageMapFun("Estimated Cost")}</p>
                                    </div>
                                </div>
                            </label>`
                })
                $("#ship_form .ship-list-view").append(html);


                if (!checkShopId || checkShopId == 0) {
                  checkShopId = res.data.list[0].id;
                  setShopProgramme(res.data.list[0])
                } else {
                  var shopDetail = res.data.list.find(item => item.id == checkShopId);
                  setShopProgramme(shopDetail);
                }
              } else {
                $(".ship-view .name-box").text(languageMapFun("Please contact us to confirm shipping costs"));
                $(".ship-view .desc-box").hide();
                $(".ship-view .price-box").hide();
                $(".ship-view .free-ship-view").text("");
                $("#ship_form .ship-list-view").append(`<div class='p-10 desc mb-20'>${languageMapFun("Please contact us to confirm shipping costs")}</div>`);
              }
              $("#ship_form .loading-view").css("display", "none");
            },
            error: function(error) {
              $("#ship_form .loading-view").css("display", "none");
            }
          });
        }, 200)
      }

      // 获取国家列表
      function loadCountryList() {

        $.ajax({
          method: "GET",
          url: baseurl + "/api/countries",
          success: (res) => {
            var html = "";
            res.data.forEach((item, index) => {
              html += `<option value="${item.country_code}">${item.name}</option>`
            })
            $("select[name='country']").html(html);
          },
          error: function(error) {}
        });

      }



      //获取已选属性
      function getChooseAttache() {
        var list = [];
        productDOM.find(".attribute-list-value .item:not(.last-item)").each(function() {
          var text = $(this).find("li.active").data("name");
          $(this).find(".attribute-title-value span").text(firstUpperCase(text));
          list.push(text);
        })
        return list.join(",");
      }

      //选择属性
      function checkSampleState() {
        var choostAttache = getChooseAttache();
        $(productDOM).find(".cartForm .last-item ul li").each(function() {
          var attache_text = (choostAttache ? choostAttache + "," : "") + $(this).find(".attribute-value").data("name");
          var attache = shopList.find(item => item.combination == attache_text);
          if (attache) {
            $(this).find("input").val(attache.value);
            $(this).find("input").attr("data-id", attache.id);
          } else {
            $(this).find("input").val(0);
          }
        })
      }

      //首字母大写
      function firstUpperCase(str) {

        if (!str) {
          return str;
        }
        str += "";
        return str.charAt(0).toUpperCase() + str.slice(1)
      }
    }

    //加载产品详情
    function loadProduct(productID) {
      return new Promise((resolve, reject) => {
        $.ajax({
          method: "GET",
          url: baseurl + "/api/product/url/" + productID,
          data: {},
          success: (res) => {
            resolve(res.data);
          },
          error: function(error) {}
        });
      })

    }

  }
})