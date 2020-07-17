$(window).ready(function () {
  //Register
  $("#form-register").submit(function (e) {
    e.preventDefault();
    // alert($("#password").val() + "/" + $("#confirm-password").val());
    let username = $("#username").val();
    let password = $("#password").val();
    let email = $("#email").val();
    let isValid = true;
    if ($("#username").val().length < 5) {
      isValid = false;
      console.log($("#username"));
      $("#username").after(
        '<p class="text-valid">username must be more than 5 characters</p>'
      );
    }
    if ($("#password").val().length < 6) {
      isValid = false;
      $("#password").after(
        '<p class="text-valid">password must be more than 6 characters</p>'
      );
    }

    if ($("#confirm-password").val() != $("#password").val()) {
      isValid = false;
      console.log($("#confirm-password").val(), $("#password").val());
      $("#confirm-password").after(
        '<p class="text-valid">password and confirm password not match</p>'
      );
    }

    if (isValid == true) {
      //   console.log("asdas");
      $.ajax({
        type: "POST",
        url: "/register",
        data: { username: username, password: password, email: email },
        dataType: "json",
        success: function (response) {
          console.log(response);
          if (response.result == true) {
            // console.log("success");
            window.location.href = "/login";
          } else {
            // console.log("faild");
            alert(response.err);
          }
        },
      });
    }
  });
});
