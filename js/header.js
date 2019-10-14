import {
  registerFn
} from './rejister.js';
export function headerFn() {
  // 首页nav鼠标移入事件
  $("#changeLoginHoverSmsCaptchaCode").click(function () {
    $(".code").text(Math.random().toString().substring(5, 9));
  });
  $(".sub-menu-btn").mouseenter(function () {
    $(this).children(1).css({
      display: "flex"
    }).stop().animate({
      opacity: 1
    }).end().children("a").addClass("change");
  }).mouseleave(function () {
    $(".sub-menu").css({
      display: "none"
    }).stop().animate({
      opacity: 0
    }).prev().removeClass("change");
  });

  $(".nav-wrap").children(0).children("li").children("a").mouseenter(function () {
    $(this).css({
      fontWeight: 600
    });
  }).mouseleave(function () {
    $(this).css({
      fontWeight: "normal"
    });
  });

  //吸顶动画
  $(window).scroll(function () {
    if ($(this).scrollTop() >= $(".header-logo").height()) {
      $("header").css({
        position: "sticky",
        top: $(".header-logo").height() * -1
      });
      $(".nav-logo").css({
        display: "block",
        height: "inherit",
        float: "left",
        position: "relative",
        top: "12px",
        marginRight: "29px"
      }).stop().animate({
        width: 112
      }, 200);
      $(".nav-right").stop().animate({
        right: 29
      }, 150);
    }
    if ($(this).scrollTop() <= $(".header-logo").height() || $(this).scrollTop() == 0) {
      $(".nav-logo").css({
        display: "none"
      }).stop().animate({
        width: 0
      }, 0);
      $(".nav-right").stop().animate({
        right: 90
      }, 0);
    }
  });

  // 搜索
  $(".e-nav-search").mouseenter(function () {
    $(this).addClass("active");
    $(".search-menu").stop().fadeIn();
  }).mouseleave(function () {
    $(this).removeClass("active");
    $(".search-menu").stop().fadeOut();
  });

  // mincart内容动态添加
  let ls = localStorage;

  // let a = "[]";
  // ls.setItem("goodsItem", a);

  let goodsList = JSON.parse(ls.getItem("goodsItem"));

  if (goodsList.length != 0) {
    $(".e-header-shopping-bag").addClass("is-full").removeClass("is-empty");
  } else {
    $(".e-header-shopping-bag").addClass("is-empty").removeClass("is-full");
  }

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



  let total = 0;
  $(".goods-price").each(function () {
    total += +$(this).text();
  });
  $("#min-cart-total").text(total);

  $("#goods-num").text($("#min-cart-list").children().length);

  $("#style").html('.nav-right>ul>li.header-shopping-bag.is-full>a .icon::after {content:"' + $("#min-cart-list").children().length + '"!important}');
  // $(".li.header-shopping-bag.is-full>a .icon:after").css({
  //   content: $("#min-cart-list").children().length
  // });


  // mincart
  $(".e-header-shopping-bag").mouseenter(function () {
    if ($(this).attr("class").indexOf("is-full") != -1) {
      $(".sub-menu-full").stop().fadeIn();
      $(this).addClass("active");
    } else {
      $(".sub-menu-empty").css({
        opacity: 1
      }).stop().fadeIn();
      $(this).addClass("active");
    }
  }).mouseleave(function () {
    $(".sub-menu-full").stop().fadeOut();
    $(".sub-menu-empty").css({
      opacity: 0
    }).stop().fadeOut();
    $(this).removeClass("active");
  });


  // 跳转购物车
  $("#header-buy").click(function () {
    location.href = '../cart.html';
  });


  //登陆页
  $("#hoverSmsLogin").click(function () {
    $(".reg-login").css({
      display: "block"
    });
    $(".pwd-login").css({
      display: "none"
    });
    $(".forget-password").css({
      display: "none"
    });
    $(this).find("a").css({
      textDecoration: "none",
      color: "#000",
    });
    $("#hoverPasswordLogin").find("a").css({
      textDecoration: "underline",
      color: "#666",
    });
  });
  $("#hoverPasswordLogin").click(function () {
    $(".reg-login").css({
      display: "none"
    });
    $(".pwd-login").css({
      display: "block"
    });
    $(".forget-password").css({
      display: "inline-block"
    });
    $(this).find("a").css({
      textDecoration: "none",
      color: "#000",
    });
    $("#hoverSmsLogin").find("a").css({
      textDecoration: "underline",
      color: "#666",
    });
  });

  $(".e-header-login").mouseenter(function () {
    $(".login-dialog.lancome-dialog").stop().fadeIn();
    $(this).addClass("active");
  }).mouseleave(function () {
    $(".login-dialog.lancome-dialog").stop().fadeOut();
    $(this).removeClass("active");
  });

  $(".e-register").click(function () {
    $(".register-dialog-opacity").css({
      display: "flex"
    });
  });

  //登陆验证
  //tel
  let regTel = /^1[358]\d{9}$/;
  // pwd
  let regPwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)\w{8,}$/;
  //6位手机验证码
  let regRed = /^\d{6}$/;

  // 登陆操作loginHover
  $("#loginHover").click(function () {
    let ajaxData = [$("#loginHoverName").val(), $("#loginHoverPassword").val()];
    $.ajax({
      type: "post",
      url: "../login.php",
      data: "data=" + ajaxData,
      success: function (res) {
        console.log(res);
      }
    });
  });

  // register
  $("#register").load("../components/Register.html", () => {
    registerFn();
  });



};