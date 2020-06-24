const titleModel = require("../../../models/admin/title");
const postModel = require("../../../models/admin/post");

module.exports.getCategoryIndex = async (req, res) => {
  let main = "category/category";

  //get all title
  const allTitle = await titleModel.findAllTitle();

  //get random 4 posts
  const postsRandom = await postModel.getPostRandom(4);

  //get post most view
  const postsMostView = await postModel.getPostViews(6);
  // console.log(postsMostView);

  //get all post with title
  const allPostsTitle = await (
    await postModel.getAllPostsTitle(req.params.name)
  ).reverse();
  let currentPage = req.query.page || 1;
  let postsPerPage = 5;
  let start = (currentPage - 1) * postsPerPage;
  let allPage = Math.ceil(allPostsTitle.length / postsPerPage);
  // console.log(allPostsTitle);

  res.render("client/index", {
    main: main,
    title: req.params.name,
    allTitle: allTitle,
    postsRandom: postsRandom,
    postsMostView: postsMostView,
    allPostsTitle: allPostsTitle.splice(start, 5),
    allPage: allPage,
    currentPage: currentPage,
  });
};
