import {
  headerFn
} from './header.js';
import {
  footerFn
} from './footer.js';
import {
  backTop
} from './back-top.js';
import {
  lip
} from './lip.js';
import {
  Mf
} from './mf.js';

$(function () {
  //header 
  $("header").load("../components/Header.html", () => {
    headerFn();
  });

  //back-top
  $("#back-top").load("../components/Back-top.html", () => {
    backTop();
  });

  //footer
  $("footer").load("../components/Footer.html", () => {
    footerFn();
  });

  $(".lip").load("../components/Lip.html", () => {
    lip();
  });

  // 商品放大镜
  let mf = new Mf($(".master-con"));
  mf.mouseover();
  mf.mouseout();
  mf.mousemove();

  // 商品导航
  $(window).scroll(function () {
    if ($(this).scrollTop() >= $(".article-pdp-img-wrapper").offset().top - 200) {
      $(".article-navigation-wrapper").css({
        display: "block"
      });
      $(".product-nav-wrapper .article-container").children().find("li").eq(0).addClass("is-active").siblings().removeClass("is-active");
    } else {
      $(".article-navigation-wrapper").css({
        display: "none"
      });
    }
    if ($(this).scrollTop() >= $(".article-official-website-review-wrapper").offset().top - 200) {
      $(".product-nav-wrapper .article-container").children().find("li").eq(3).addClass("is-active").siblings().removeClass("is-active");
    }
  });

  $(".product-nav-wrapper .article-container").children().find("li").click(function () {
    if ($(this).index() == 0) {
      //$(this).addClass("is-active").siblings().removeClass("is-active");
      $('html,body').animate({
        scrollTop: $(".article-pdp-img-wrapper").offset().top - 100
      }, 800);
    } else if ($(this).index() == 3) {
      //$(this).addClass("is-active").siblings().removeClass("is-active");
      $('html,body').animate({
        scrollTop: $(".article-official-website-review-wrapper").offset().top - 100
      }, 800);
    }
  });



  // 
  $(".custom-dropdown").click(function () {
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
    $("#select-num").find(".dropdown-text").text($(this).text());
    // 
    $(".select-size-dropdown").find(".dropdown-text").text($("#select-num").find(".dropdown-text").text());
  });


  // 储存商品信息localstorage
  let ls = localStorage;


  // $("#min-cart-list").html(ls.getItem("min-list"));


  // 添加商品
  $(".addCart").click(function () {
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


});