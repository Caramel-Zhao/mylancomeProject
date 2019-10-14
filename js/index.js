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
  Banner,
  GoodsBanner
} from './banner.js';
$(function () {
  //header 
  $("header").load("../components/Header.html", () => {
    headerFn();
  });

  //banner
  $("#warp").children().css({
    width: $(window).width()
  });
  $("#warp").css({
    // width: $("#warp").children(0).width() * $("#warp").children().length,
    left: $("#con").width() * -1
  })
  // $("#con").css({
  //     height: $("#warp").height()
  // });
  $("#con").mouseenter(function () {
    $("#left,#right").css({
      display: "block"
    });
  }).mouseleave(function () {
    $("#left,#right").css({
      display: "none"
    });
  });

  $(".goods-btn").click(function () {
    console.log(123);

    // $(this).attr("href", "../detail.html");
    // location.href = '../detail.html';
  });

  let b = new Banner($("#con"), $("#warp"), $("#warp").children(), $(".banner-point").children(), $("#left"), $("#right"));
  b.eventBind();

  let gb = new GoodsBanner($(".goods-con-1"), $(".goods-wrap-1"), $(".item-1"), $(".goods-point-1").children());
  gb.eventBind();

  let gb2 = new GoodsBanner($(".goods-con-2"), $(".goods-wrap-2"), $(".item-2"), $(".goods-point-2").children());
  gb2.eventBind();

  //back-top
  $("#back-top").load("../components/Back-top.html", () => {
    backTop();
  });

  //footer
  $("footer").load("../components/Footer.html", () => {
    footerFn();
  });



});