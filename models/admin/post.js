const mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
  title: String,
  logo: String,
  idTitle: mongoose.Schema.Types.ObjectId,
  views: Number,
  nameTitle: String,
  contentSub: String,
  content: String,
  date: String,
});

var postModel = mongoose.model("post", postSchema);

module.exports = {
  postModel: postModel,

  savePost: function (post) {
    return post.save();
  },

  getAllPosts: function () {
    return postModel.find();
  },

  getPostNews: function (count) {
    return postModel.aggregate([
      { $sort: { date: -1 } },
      { $project: { _id: 1, logo: 1, title: 1, date: 1, views: 1 } },
      { $limit: count },
    ]);
  },
  getPostById: function (id) {
    return postModel.findById(id);
  },
  getPostRandom: function (count) {
    return postModel.aggregate([
      { $project: { _id: 1, title: 1, logo: 1 } },
      { $sample: { size: count } },
    ]);
  },

  getAllPostsTitle: function (title) {
    return postModel.aggregate([
      { $match: { nameTitle: `${title}` } },
      {
        $project: {
          _id: 1,
          title: 1,
          contentSub: 1,
          logo: 1,
          date: 1,
          views: 1,
        },
      },
    ]);
  },

  getPostTitle: function (title, count) {
    return postModel.aggregate([
      { $match: { nameTitle: `${title}` } },
      { $sort: { date: -1 } },
      {
        $project: {
          _id: 1,
          title: 1,
          date: 1,
          views: 1,
          logo: 1,
          contentSub: 1,
        },
      },
      { $limit: count },
    ]);
  },

  getPostViews: function (count) {
    return postModel.aggregate([
      { $sort: { views: -1 } },
      { $project: { _id: 1, title: 1, logo: 1 } },
      { $limit: count },
    ]);
  },

  updatePostById: function (id, value) {
    return postModel.findByIdAndUpdate(id, value, { new: true });
  },

  deletePost: function (id) {
    return postModel.deleteOne({ _id: id });
  },

  searchPostByTitle: function (keyword) {
    return postModel.find({
      $or: [
        { title: { $regex: `${keyword}`, $options: "i" } },
        { content: { $regex: `${keyword}`, $options: "i" } },
        { nameTitle: { $regex: `${keyword}`, $options: "i" } },
      ],
    });
  },

  sortPostByTitle: function () {
    return postModel.aggregate([{ $sort: { title: 1 } }]);
  },
};
