$(window).ready(function () {
  $(".smooth-scroll").hide();
  $(window).scroll(function () {
    // console.log($(document).height());
    $(".smooth-scroll").fadeIn(1000);
    if ($(window).scrollTop() == 0) {
      $(".smooth-scroll").fadeOut(500);
    }
  });

  $("#smooth-scroll").click(function () {
    // $(window).scrollTop(0);
    $("html, body").animate({ scrollTop: 0 }, "slow", function () {});
  });
});
