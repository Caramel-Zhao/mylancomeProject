export function lip() {
  $(".select-color-dropdown").children().click(function () {
    if ($(".e-changecolor").css("display") == "none") {
      $(".e-changecolor").css({
        display: "block",
        opacity: 1
      });
      $(".icon-caret").eq(0).css({
        transform: "rotate(180deg)"
      });
    } else {
      $(".e-changecolor").css({
        display: "none",
        opacity: 0
      });
      $(".icon-caret").eq(0).css({
        transform: "none"
      });
    }
  });

  function eventFn(params) {
    params.addClass("is-active").siblings().removeClass("is-active");
    let src = params.children().attr("src");
    src = src.replace("258X258", "460X460");
    $(".master-con").children().attr("src", src);
  }

  function showButton() {
    if ($(".swiper-slide").length >= 5) {
      $(".swiper-button").css({
        display: "block"
      });
    }
  }

  showButton();

  $(".swiper-slide").click(function () {
    eventFn($(this));
  });

  let detailSrc = [
    ["15564406636842077_258X258", "15688728154108772_258X258"],
    ["15566093188002383_258X258", "15564405358066555_258X258", "15564434401149893_258X258", "15566093249839824_258X258"],
    ["15688729031971738_258X258", "15564406365096820_258X258", "15566093523496068_258X258"],
    ["15688728870173633_258X258", "15564406519204665_258X258", "15566093729721024_258X258"],
    ["1568872764277488_258X258", "15564406835365089_258X258", "15566094330231044_258X258"],
    ["15688727261554688_258X258", "15564407027474597_258X258", "15566094518109290_258X258"],
    ["15688727894052103_258X258", "15564406740101035_258X258", "15566094148752332_258X258"]
  ];

  $(".choose-color").find("li").mousemove(function () {
    $(this).css({
      backgroundColor: "#eee"
    }).children().children().css({
      color: "#f00"
    });
    $(this).siblings().css({
      backgroundColor: "#fff"
    }).children().children().css({
      color: "#999"
    });
  }).click(function () {
    $(".swiper-wrapper").children().eq($(this).index()).click();
  });

  $(".swiper-wrapper").find("li").click(function () {
    $(this).children().addClass("is-active").end().siblings().children().removeClass("is-active");
    $(".dropdown-text-block").css({
      background: $(this).children().children().css("background")
    });
    $(".get-propertyValue").html($(".choose-color").find("li").eq($(this).index()).children().children().eq(1).html());
    // $(".swiper-wrapper").children().eq($(this).index()).children().addClass("is-active").end().siblings().children().removeClass("is-active");
    let src = detailSrc[$(this).index()];
    let e = "";
    for (let i = 0; i < src.length; i++) {
      e += `<li class="swiper-slide"><img src="./img/${src[i]}.jpg" alt=""></li>`;
    }
    $(".thumbnail-list").html(e);
    $(".thumbnail-list").children().eq(0).addClass("goods-img");
    showButton();
    eventFn($(".swiper-slide").eq(0));
    $(".swiper-slide").click(function () {
      eventFn($(this));
    });
  });

  $(".form-checkbox").click(function () {
    $(this).toggleClass("is-active");
  });

  // xiugai shuliang 
  $(".select-size-dropdown").click(function () {
    if ($(this).find(".sub-menu").css("display") == "none") {
      $(this).find(".sub-menu").css({
        display: "block",
        opacity: 1
      });
      $(this).find(".icon-caret").css({
        transform: "rotate(180deg)"
      });
    } else {
      $(this).find(".sub-menu").css({
        display: "none",
        opacity: 0
      });
      $(this).find(".icon-caret").css({
        transform: "none"
      });
    }
  });

  $("#sizecount").find("li").mousemove(function () {
    $(this).css({
      backgroundColor: "#eee"
    }).children().css({
      color: "#f00"
    });
    $(this).siblings().css({
      backgroundColor: "#fff"
    }).children().css({
      color: "#999"
    });
  }).click(function () {
    $(".select-size-dropdown").find(".dropdown-text").text($(this).text());
    // 
    $("#select-num").find(".dropdown-text").text($(".select-size-dropdown").find(".dropdown-text").text());
  });


  // 加入购物车

  let ls = localStorage;

  $(".btn.btn-black.btn-big-height.addCart").click(function () {
    let goodsArr = [];

    $(".e-header-shopping-bag").addClass("is-full").removeClass("is-empty");


    let goodsObj = {};
    let name = $(".goods-title").children("h1").text();
    let size = $(".get-propertyValue").text();
    let color = $(".dropdown-text-block").css("backgroundColor");
    let num = $("#select-num").find(".dropdown-text").text();
    let price = $("#price").text();
    let img = $(".goods-img").children("img").attr("src").split("/");
    img = img[img.length - 1];
    img = img.split("_")[0];
    goodsObj = {
      "name": name,
      "size": size,
      "color": color,
      "num": num,
      "price": price,
      "img": img
    }


    let lsGoods = JSON.parse(ls.getItem("goodsItem"));

    if (lsGoods) {
      let index = [];
      for (let i = 0; i < lsGoods.length; i++) {
        if (lsGoods[i]["name"] == goodsObj["name"] && lsGoods[i]["size"] == goodsObj["size"]) {
          index.push(i);
        }
      }
      for (let i = 0; i < index.length; i++) {
        lsGoods[index[i]]["num"] = goodsObj["num"];
      }
      if (index.length == 0) {
        lsGoods.push(goodsObj);
      }
      ls.removeItem("goodsItem");
      ls.setItem("goodsItem", JSON.stringify(lsGoods));
    } else {
      goodsArr.push(goodsObj);
      ls.setItem("goodsItem", JSON.stringify(goodsArr));
    }

    let goodsList = JSON.parse(ls.getItem("goodsItem"));

    let goods = "";
    for (let i = 0; i < goodsList.length; i++) {
      goods += `<li>
      <div class="product-information">
        <a href="#"><img src="../img/${goodsList[i]["img"]}_258X258.jpg" alt=""></a>
        <div class="product-information-wrap">
          <p class="title"><a href="#">${goodsList[i]["name"]}</a></p>
          <p class="color">
            <span style="width:20px;height:20px;background: ${goodsList[i]["color"]};"></span>
            <span>${goodsList[i]["size"]}</span>
          </p>
        </div>
      </div>
      <div class="num">
        <span>${goodsList[i]["num"]}</span>
      </div>
      <div class="price">
        <span>¥<span class="goods-price">${+goodsList[i]["price"] * +goodsList[i]["num"]}</span></span>
      </div>
    </li>`;
    }
    $("#min-cart-list").html(goods);
    ls.setItem("min-list", goods);

    let inner = ls.getItem("min-list");
    $("#min-cart-list").html(inner);
    let total = 0;
    $(".goods-price").each(function () {
      total += +$(this).text();
    });
    $("#min-cart-total").text(total);

    $("#goods-num").text($("#min-cart-list").children().length);

    $("#style").html('.nav-right>ul>li.header-shopping-bag.is-full>a .icon::after {content:"' + $("#min-cart-list").children().length + '"!important}');

  });

  $("#detail-buy").click(function () {
    $(".addCart").click();
    location.href = '../cart.html';
  });

}