export function registerFn() {


  $(".e-phone-register").click(function () {
    $(".maill-register-cont").css({
      display: "none"
    });
    $(".phone-register-cont").css({
      display: "block"
    });
  });
  $(".e-maill-register").click(function () {
    $(".maill-register-cont").css({
      display: "block"
    });
    $(".phone-register-cont").css({
      display: "none"
    });
  });

  $(".dialog-close").click(function () {
    $(".register-dialog-opacity").css({
      display: "none"
    });
  });
  $(".register-dialog-opacity").click(function (ev) {
    let e = ev || event;
    if (e.pageX < $(".register-dialog").offset().left || e.pageX > $(".register-dialog").offset().left + $(".register-dialog").width() || e.pageY < $(".register-dialog").offset().top || e.pageY > $(".register-dialog").offset().top + $(".register-dialog").height()) {
      $(".register-dialog-opacity").css({
        display: "none"
      });
    }
  });


  // 表单验证
  // 正则
  //tel
  let regTel = /^1[358]\d{9}$/;
  // pwd
  let regPwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)\w{8,}$/;
  //6位手机验证码
  let regRed = /^\d{6}$/;

  // 开关
  let tel = false;
  let pwd = false;
  let repwd = false;
  let code = false;
  let check = false;




  $(".e-checkbox").click(function () {
    $(".remeberMe").toggleClass("is-active");
    if ($("#mobileAgree").attr("class").indexOf("is-active") == -1) {
      $("#mobileAgree").find(".msg-block").css({
        display: "block",
        fontSize: "12px",
        color: "#f00"
      });
      check = true;
    } else {
      $("#mobileAgree").find(".msg-block").css({
        display: "none"
      });
    }
    if ($("#emailAgree").attr("class").indexOf("is-active") == -1) {
      $("#emailAgree").find(".msg-block").css({
        display: "block",
        fontSize: "12px",
        color: "#f00"
      });
      check = true;
    } else {
      $("#emailAgree").find(".msg-block").css({
        display: "none"
      });
    }
  });

  if ($("#mobileAgree").attr("class").indexOf("is-active") != -1) {
    check = true;
  }
  if ($("#emailAgree").attr("class").indexOf("is-active") != -1) {
    check = true;
  }

  let telData = "";
  let pwdData = "";

  // 验证
  // tel
  $("#registerMobile").blur(function () {
    if (regTel.test($(this).val())) {
      tel = true;
      telData = $(this).val();
      $(this).parent().removeClass("is-error");
    } else {
      $(this).parent().addClass("is-error");
    }
  });
  // pwd
  $("#registerpassword").blur(function () {
    if ($(this).val() == "") {
      $(this).next().children().html("请输入您的密码");
      $(this).parent().addClass("is-error");
    } else {
      if (regPwd.test($(this).val())) {
        pwd = true;
        pwdData = $(this).val();
        $(this).parent().removeClass("is-error");
      } else {
        $(this).next().children().html("最小长度8位，包含大小写字母和数字（或符号）");
        $(this).parent().addClass("is-error");
      }
    }
  });
  // repwd
  $("#registerrepassword").blur(function () {
    if ($(this).val() != $("#registerpassword").val()) {
      $(this).parent().addClass("is-error");
    } else {
      $(this).parent().removeClass("is-error");
      repwd = true;
    }
  });
  // code
  $("#registerpullcatpchaCode").blur(function () {
    if ($(this).val() != $(this).parent().next().find(".code").html()) {
      $(this).parent().parent().addClass("is-error");
    } else {
      $(this).parent().parent().removeClass("is-error");
      code = true;
    }
  });

  $("#mobileRegister").click(function () {
    if (tel && pwd && repwd && code && check) {
      // 整合数据
      let ajaxData = [telData, pwdData, ""];
      $.ajax({
        url: "../register.php",
        type: "post",
        data: "data=" + ajaxData,
        success: (res) => {
          if (res == 1) {
            alert("注册成功！");
            $(".register-dialog-opacity").css({
              display: "none",
              opacity: 0
            });
          }
        }
      })
    }
  });




  // 邮箱注册
  let regEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  let email = false;
  let emailData = "";
  // 验证
  // email
  $("#registerEmail").blur(function () {
    if (regEmail.test($(this).val())) {
      email = true;
      emailData = $(this).val();
      $(this).parent().removeClass("is-error");
    } else {
      $(this).parent().addClass("is-error");
    }
  });
  // tel
  $("#registerEmailmobileNum").blur(function () {
    if (regTel.test($(this).val())) {
      tel = true;
      telData = $(this).val();
      $(this).parent().removeClass("is-error");
    } else {
      $(this).parent().addClass("is-error");
    }
  });
  // pwd
  $("#registerEmailpassword").blur(function () {
    if ($(this).val() == "") {
      $(this).next().children().html("请输入您的密码");
      $(this).parent().addClass("is-error");
    } else {
      if (regPwd.test($(this).val())) {
        pwd = true;
        pwdData = $(this).val();
        $(this).parent().removeClass("is-error");
      } else {
        $(this).next().children().html("最小长度8位，包含大小写字母和数字（或符号）");
        $(this).parent().addClass("is-error");
      }
    }
  });
  // repwd
  $("#registerEmailrepassword").blur(function () {
    if ($(this).val() != $("#registerEmailpassword").val()) {
      $(this).parent().addClass("is-error");
    } else {
      $(this).parent().removeClass("is-error");
      repwd = true;
    }
  });
  // code
  $("#registerEmailCatpchcode").blur(function () {
    if ($(this).val() != $(this).parent().next().find(".code").html()) {
      $(this).parent().parent().addClass("is-error");
    } else {
      $(this).parent().parent().removeClass("is-error");
      code = true;
    }
  });

  $("#emailRegister").click(function () {
    if (tel && pwd && repwd && code && check) {
      // 整合数据
      let ajaxData = [telData, pwdData, emailData];
      $.ajax({
        url: "../register.php",
        type: "post",
        data: "data=" + ajaxData,
        success: (res) => {
          if (res == 1) {
            alert("注册成功！");
            $(".register-dialog-opacity").css({
              display: "none",
              opacity: 0
            });
          }
        }
      })
    }
  });


  // code
  // console.log(Math.random().toString().substring(5, 9));

  $(".code").text(Math.random().toString().substring(5, 9));

  $(".changeEmailRegisterCaptchaCode").click(function () {
    $(".code").text(Math.random().toString().substring(5, 9));
  });
}