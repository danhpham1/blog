const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  idPost: {
    type: mongoose.Types.ObjectId,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  comment: {
    type: String,
  },
  time: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true,
  },
  username: {
    type: String,
  },
});

let commentModel = mongoose.model("comments", commentSchema);

module.exports = {
  commentModel: commentModel,
  saveComment: function (comment) {
    return comment.save();
  },
  getAllCommentWithPostId: function (idPost) {
    return commentModel.find({ idPost: idPost });
  },
};
