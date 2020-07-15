const titleModel = require("../../../models/admin/title");
const postModel = require("../../../models/admin/post");
const mongoose = require("mongoose");

module.exports.getPostIndex = async (req, res) => {
  let main = "post-blog/post";
  //set session redirectTo
  req.session.redirectTo = req.originalUrl;
  //get all title
  const allTitle = await titleModel.findAllTitle();

  //get post with id
  const post = await postModel.getPostById(req.params.id);
  //update views of post
  await postModel.updatePostById(req.params.id, { views: +post.views + 1 });

  let urlActive = post.nameTitle;

  const postViews = await postModel.getPostViews(4);
  // console.log(postViews);
  //get last post
  const postLast = (await postModel.getAllPosts()).reverse().splice(0, 4);

  let postRelate = [
    ...(await postModel.getAllPostsTitle(post.nameTitle)),
  ].filter((el) => el._id.toString() != post._id.toString());
  // console.log(postRelate);

  // console.log(typeof post._id);

  //get post with title
  res.render("client/index", {
    main: main,
    allTitle: allTitle,
    urlActive: urlActive,
    postViews: postViews,
    postLast: postLast,
    post: post,
    postRelate: postRelate.splice(0, 4),
    username: req.session.passport,
  });
};
