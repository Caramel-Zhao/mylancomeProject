export function footerFn () {
  //显示微信二维码
  $(".out-wechat").mouseenter(function () {
    $(".wechat").css({ display: "block" });
  }).mouseleave(function () {
    $(".wechat").css({ display: "none" });
  });
}