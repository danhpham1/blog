const titleModel = require("../../../models/admin/title");
const postModel = require("../../../models/admin/post");
const mongoose = require("mongoose");

module.exports.getPostIndex = async (req, res) => {
  let main = "post-blog/post";

  //get all title
  const allTitle = await titleModel.findAllTitle();

  //get post with id
  const post = await postModel.getPostById(req.params.id);

  //update views of post
  // console.log(typeof post._id);
  const idPost = mongoose.Types.ObjectId(post._id);
  await postModel.updatePostById(idPost, { views: +post.views + 1 });

  //get post with title
  let postsTitle = await postModel.getAllPostsTitle(post.nameTitle);
  let postsTitleFilter = [...postsTitle].filter(
    (el) => el._id.toString() != post._id.toString()
  );

  res.render("client/index", {
    main: main,
    allTitle: allTitle,
    post: post,
    postsTitleFilter: postsTitleFilter,
  });
};
