export class Mf {
  constructor(newBox) {
    this.oBox = newBox;
    this.oldSrc = "";
    this.src = "";
  }

  mouseover () {
    let that = this;
    this.oBox.mouseover(function () {
      that.oldSrc = $(this).find("img").attr("src");
      that.src = "url(" + $(this).find("img").attr("src") + ")";
      that.src = that.src.replace("460X460", "920X920");
      $(this).css({
        width: "460px",
        height: "460px",
        backgroundImage: that.src,
        backgroundRepeat: "no-repeat"
      }).find("img").attr("src", "");
    });
  }

  mouseout () {
    let that = this;
    this.oBox.mouseout(function () {
      $(this).css({
        backgroundImage: "",
      }).find("img").attr("src", that.oldSrc);
    });
  }

  mousemove () {
    this.oBox.mousemove(function (ev) {
      let e = ev || event;
      //$(this)
      let left = e.pageX - $(this).offset().left - 230 / 2;
      let top = e.pageY - $(this).offset().top - 230 / 2;

      if (left < 0) {
        left = 0;
      }
      let maxL = 460 - 230;
      if (left > maxL) {
        left = maxL;
      }
      if (top < 0) {
        top = 0;
      }
      let maxT = 460 - 230;
      if (top > maxT) {
        top = maxT;
      }

      let x = left / (230 / 460);
      let y = top / (230 / 460);

      $(this).css({
        backgroundPositionX: -x + "px",
        backgroundPositionY: -y + "px"
      });
    });
  }
}