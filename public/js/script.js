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

  //process comment
  $("#form-comment").submit(function (e) {
    e.preventDefault();
    // console.log($("#comment-content").val());
    let currentDate = new Date();
    let comment = {
      comment: $("#comment-content").val(),
      time: currentDate.toTimeString().split(" ")[0],
      idPost: $("#id-post").val(),
      username: $("#username").val(),
    };

    if (comment.length <= 0) {
      alert("please input content in textarea");
    } else {
      $.ajax({
        type: "POST",
        url: "/comment",
        data: comment,
        dataType: "json",
        success: function (response) {
          // console.log(response);
          $("#parent-comment").prepend(`<div class="comment">
                    <div class="comment-title">
                      <p>${response.username}</p>
                      <p>${response.date.split("T")[0]} ${response.time}</p>
                    </div>
                    <div class="comment-sub">
                      <p>
                        ${response.comment}
                      </p>
                    </div>
                  </div>`);
        },
      });
    }
  });
});
