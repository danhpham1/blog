const titleModel = require("../../../models/admin/title");
const postModel = require("../../../models/admin/post");

module.exports.getCategoryIndex = async (req, res) => {
  let main = "category/category";
  //set session redirectTo
  req.session.redirectTo = req.originalUrl;
  //get url
  let urlActive = req.originalUrl.split("/").slice(-1)[0];
  // console.log(urlPost);
  // console.log(urlActive);
  //get all post with title
  let allPostsTitle;
  if (req.params.name == "news") {
    allPostsTitle = (await postModel.getAllPosts()).reverse();
  } else {
    allPostsTitle = (
      await postModel.getAllPostsTitle(req.params.name)
    ).reverse();
  }
  // console.log(titleRequest);
  //get all title
  const allTitle = await titleModel.findAllTitle();

  const postViews = await postModel.getPostViews(4);
  // console.log(postViews);
  //get last post
  const postLast = (await postModel.getAllPosts()).reverse().splice(0, 4);

  //get all post with title

  let currentPage = req.query.page || 1;
  let postsPerPage = 2;
  let start = (currentPage - 1) * postsPerPage;
  let allPage = Math.ceil(allPostsTitle.length / postsPerPage);
  // console.log(allPostsTitle);

  res.render("client/index", {
    main: main,
    allTitle: allTitle,
    postViews: postViews,
    postLast: postLast,
    currentPage: currentPage,
    allPage: allPage,
    allPostsTitle: allPostsTitle.splice(start, postsPerPage),
    urlActive: urlActive,
    username: req.session.user,
  });
};
