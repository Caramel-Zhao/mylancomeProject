let ls = localStorage;

let goodsArr = JSON.parse(ls.getItem("goodsItem"));
let goods = "";

$("#cart-num").text(goodsArr.length);

for (let i = 0; i < goodsArr.length; i++) {

  goods += `<div data-itemcode="" class="shopcart-list events-shopcart-list ">
  <label class="form-checkbox form-checkbox-cart e-checkbox-cart is-active" data-id="863039886442092">
  <i class="icon icon-checkbox-border"></i>
  </label>
  <div class="shopcart-list-right float-clearfix">
  <div class="shopcart-goods">
    <div class="shopcart-list-leftimg" style="cursor: default;">
      <img src="./img/${goodsArr[i].img}_258X258.jpg"
        alt="" style="width:130px;height:130px"/>
    </div>
    <!--商品信息 -->
    <div class="shopcart-details">
      <p class="category">${goodsArr[i].name}</p>
      <span>
        <span class="shopcart-details-block"
          style="background: ${goodsArr[i].color};width:22px;height:22px;"></span>
        ${goodsArr[i].size}
      </span>
    </div>
  </div>
  <!--单价 -->
  <div class="shopcart-unit-price ">
    <p>&#165;
      <span  class="goods-price">${goodsArr[i].price}</span></p>
  </div>
  <!--数量最多x个 -->
  <div class="select shopcart-qty is-error">
    <div class="dropdown events-dropdown">
      <a class="btn"> <span class="dropdown-text goods-num">${goodsArr[i].num}</span>
        <span class="dropdown-icon"><i class="icon icon-caret"></i></span>
      </a>
      <div class="sub-menu tinyscrollbar">
        <div class="viewport">
          <div class="overview">
            <!-- 库存显示数量 -->
            <ul>
              <li data-id="863039886442092"><a>1</a></li>
              <li data-id="863039886442092"><a>2</a></li>
              <li data-id="863039886442092"><a>3</a></li>
              <li data-id="863039886442092"><a>4</a></li>
              <li data-id="863039886442092"><a>5</a></li>
            </ul>
          </div>
        </div>
        <div class="scrollbar">
          <div class="track">
            <div class="thumb">
              <div class="end"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 小计 -->
  <div class="shopcart-sum none-sm">
    <div>
      <p>¥<span class="goods-sub-price"></span></p>
    </div>
  </div>
  <!-- 编辑 -->
  <div class="shopcart-compile float-clearfix">
    <ul>
      <li><a class="events-compile-dialog compile-content">修改</a></li>
      <li><a class="add-wish-list events-add-menu"> <span>＋收藏夹</span></a></li>
      <li><a class="remove" data-id="863039886442092">删除</a></li>
    </ul>
  </div>
  </div>
  </div>`;
}

$(".event-content").html(goods);




$(function () {
  // 全选
  $(".events-check-all")
  // 商品前选框
  $(".icon.icon-checkbox-border")

  function computed() {
    let subPrice = 0;
    $(".goods-sub-price").each(function (i) {
      $(this).text(+$(this).parent().parent().parent().parent().parent().find(".goods-num").text() * +$(this).parent().parent().parent().parent().parent().find(".goods-price").text());
      if ($(this).parent().parent().parent().parent().parent().find(".e-checkbox-cart").attr("class").indexOf("is-active") != -1) {
        subPrice += +$(this).text();
      }
      $(".goods-sub-total").text(subPrice);
      $(".goods-total").text($(".goods-sub-total").eq(0).text());
    });
  }

  // sub-price
  let subPrice = 0;
  $(".goods-sub-price").each(function () {
    $(this).text(+$(this).parent().parent().parent().parent().parent().find(".goods-num").text() * +$(this).parent().parent().parent().parent().parent().find(".goods-price").text());
    if ($(this).parent().parent().parent().parent().parent().find(".e-checkbox-cart").attr("class").indexOf("is-active") != -1) {
      subPrice += +$(this).text();
    }
    $(".goods-sub-total").text(subPrice);
    $(".goods-total").text($(".goods-sub-total").eq(0).text());
  });

  // check
  $(".form-checkbox-cart").click(function () {
    let subPrice = 0;
    $(this).toggleClass("is-active");
    $(".goods-sub-price").each(function () {
      if ($(this).parent().parent().parent().parent().parent().find(".e-checkbox-cart").attr("class").indexOf("is-active") != -1) {
        subPrice += +$(this).text();
      }
      $(".goods-sub-total").text(subPrice);
      $(".goods-total").text($(".goods-sub-total").eq(0).text());
    });
  });

  $(".e-checkbox-cart-all").click(function () {
    let subPrice = 0;
    if ($(this).attr("class").indexOf("is-active") != -1) {
      $(".form-checkbox-cart").addClass("is-active");
      $(".goods-sub-price").each(function () {
        if ($(this).parent().parent().parent().parent().parent().find(".e-checkbox-cart").attr("class").indexOf("is-active") != -1) {
          subPrice += +$(this).text();
        }
        $(".goods-sub-total").text(subPrice);
        $(".goods-total").text($(".goods-sub-total").eq(0).text());
      });
    } else {
      $(".form-checkbox-cart").removeClass("is-active");
      $(".goods-sub-price").each(function () {
        if ($(this).parent().parent().parent().parent().parent().find(".e-checkbox-cart").attr("class").indexOf("is-active") != -1) {
          subPrice += +$(this).text();
        }
        $(".goods-sub-total").text(subPrice);
        $(".goods-total").text($(".goods-sub-total").eq(0).text());
      });
    }
  });

  // xiugai shuliang
  $(".events-dropdown").each(function () {
    $(this).click(function () {
      $(this).children(".sub-menu.tinyscrollbar").stop().toggle().find("li").mousemove(function () {
        $(this).css({
          backgroundColor: "#ccc"
        }).siblings().css({
          backgroundColor: "#fff"
        }).end().children().css({
          color: "#d61b52"
        }).end().siblings().children().css({
          color: "#000"
        });
      });
    }).find("li").click(function () {
      $(this).parent().parent().parent().parent().prev().children(".dropdown-text.goods-num").text($(this).children().text());
      computed();
      let lsGoods = JSON.parse(ls.getItem("goodsItem"));

      if (lsGoods) {
        let index = [];
        for (let i = 0; i < lsGoods.length; i++) {
          if (lsGoods[i]["name"] == $(".category").eq(i).text() && lsGoods[i]["size"] == $(".shopcart-details-block").eq(i).parent().text().trim()) {
            index.push(i);
          }
        }

        for (let i = 0; i < index.length; i++) {
          lsGoods[index[i]]["num"] = $(".dropdown-text.goods-num").eq(i).text();
        }
        ls.removeItem("goodsItem");
        ls.setItem("goodsItem", JSON.stringify(lsGoods));
      }
    });

  });

  $(".remove").click(function () {
    $(this).parent().parent().parent().parent().parent().remove();
    let lsGoods = JSON.parse(ls.getItem("goodsItem"));

    if (lsGoods) {
      let index = null;
      for (let i = 0; i < lsGoods.length; i++) {
        // console.log(lsGoods[i]["name"]);
        // console.log($(this).parent().parent().parent().parent().find(".category").text());
        // console.log(lsGoods[i]["size"]);
        // console.log($(this).parent().parent().parent().parent().find(".category").next().text().trim());

        if (lsGoods[i]["name"] == $(this).parent().parent().parent().parent().find(".category").text() && lsGoods[i]["size"] == $(this).parent().parent().parent().parent().find(".category").next().text().trim()) {
          index = i;
        }
      }
      lsGoods.splice(index);
      console.log(lsGoods);
      ls.removeItem("goodsItem");
      ls.removeItem("min-list");
      ls.setItem("goodsItem", JSON.stringify(lsGoods));
    }
  });




  // button
  $(".buy-now")
})