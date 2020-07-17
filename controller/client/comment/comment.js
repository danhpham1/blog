const Comment = require("../../../models/admin/comment");

module.exports.processCommentPost = (req, res) => {
  //   console.log(req.body);
  let comment = new Comment.commentModel({
    idPost: req.body.idPost,
    comment: req.body.comment,
    time: req.body.time,
    username: req.body.username,
  });
  //   console.log(comment);
  Comment.saveComment(comment)
    .then((comment) => {
      res.status(200).json(comment);
    })
    .catch((err) => {
      res.redirect(req.session.redirectTo);
    });
};
