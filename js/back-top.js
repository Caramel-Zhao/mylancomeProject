export function backTop() {
  // 回到顶部 出现
  $(window).scroll(function () {
    if ($(window).scrollTop() >= $(document).height() / 10) {
      $("#back-top").stop().fadeIn();
    } else {
      $("#back-top").stop().fadeOut();
    }
  });

  // 回到顶部
  $(".back-top-btn").click(function () {
    $("html,body").stop().animate({
      scrollTop: 0
    });
  });
}