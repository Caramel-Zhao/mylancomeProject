export class Banner {
  constructor(newCon, newWrap, newImg, newLi, newLeft, newRight) {
    this.index = 0;
    this.timer = null;
    this.oCon = newCon;
    this.oWrap = newWrap;
    this.oImg = newImg;
    this.oLi = newLi;
    this.oLeft = newLeft;
    this.oRight = newRight;
  }

  setBackLeft () {
    this.oWrap.stop().animate({
      left: this.index * -1 * this.oImg.width() - this.oImg.width()
    }, () => {
      if (this.oWrap.position().left <= -1 * this.oImg.width() * (this.oImg.length - 1)) {
        this.oWrap.animate({ left: -1 * this.oImg.width() }, 0);
        this.index = 0;
        this.setLiColor();
      }
      if (this.oWrap.position().left >= 0) {
        this.oWrap.animate({ left: -1 * this.oImg.width() * (this.oImg.length - 2) }, 0);
        this.index = 4;
        this.setLiColor();
      }
    });
  }

  //设置li颜色
  setLiColor () {
    this.oLi.eq(this.index).addClass("active").siblings("li").removeClass("active");
    // console.log(this.oLi);
  }

  //btnNext
  btnNext () {
    this.index++;
    this.setBackLeft();
    this.setLiColor();
  }

  //btnBack
  btnBack () {
    this.index--;
    this.setBackLeft();
    this.setLiColor();
  }

  //eventBind
  eventBind () {
    this.autoMove();

    this.oRight.click(() => {
      this.btnNext();
    })
    this.oLeft.click(() => {
      this.btnBack();
    })

    //eventBindAuto
    this.oCon.mouseover(() => {
      this.stopMove();
    }).mouseout(() => {
      this.autoMove();
    })

    this.eventBindLi();
  }

  //eventBindLi
  eventBindLi () {
    let that = this;
    this.oLi.mouseover(function () {
      that.stopMove();
      that.index = $(this).index();
      that.setBackLeft();
      that.setLiColor();
    }).mouseout(() => {
      this.autoMove();
    });
  }

  //autoMove
  autoMove () {
    this.timer = setInterval(() => {
      this.btnNext();
    }, 3000);
  }

  //stopMove
  stopMove () {
    clearInterval(this.timer);
  }

}

export class GoodsBanner {
  constructor(newCon, newWrap, newItem, newLi) {
    this.index = 0;
    this.timer = null;
    this.oCon = newCon;
    this.oWrap = newWrap;
    this.oItem = newItem;
    this.oLi = newLi;
  }

  setBackLeft () {
    if (this.oItem.length < (this.index + 1) * 3) {
      // console.log(this.index);
      this.oWrap.stop().animate({
        left: this.index * this.oItem.outerWidth() * -3 + (3 - this.oItem.length % 3) * this.oItem.outerWidth()
      }, () => {
        this.index = -1;
      });
    } else {
      this.oWrap.stop().animate({
        left: this.index * this.oItem.outerWidth() * -3
      }, () => {

      });
    }
  }

  //设置li颜色
  setLiColor () {
    this.oLi.eq(this.index).addClass("active").siblings("li").removeClass("active");
    // console.log(this.oLi);
  }

  //eventBind
  eventBind () {
    this.autoMove();

    //eventBindAuto
    this.oCon.mouseover(() => {
      this.stopMove();
    }).mouseout(() => {
      this.autoMove();
    })

    this.eventBindLi();
  }

  //eventBindLi
  eventBindLi () {
    let that = this;
    this.oLi.mouseover(function () {
      that.stopMove();
      that.index = $(this).index();
      that.setBackLeft();
      that.setLiColor();
    }).mouseout(() => {
      this.autoMove();
    });
  }

  //autoMove
  autoMove () {
    this.timer = setInterval(() => {
      this.index++;
      this.setBackLeft();
      this.setLiColor();
    }, 4000);
  }

  //stopMove
  stopMove () {
    clearInterval(this.timer);
  }
}