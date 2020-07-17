const postModel = require("../../models/admin/post");
const titleModel = require("../../models/admin/title");

module.exports.getHome = async (req, res) => {
  let main = "patials/index";
  //set session redirectTo
  req.session.redirectTo = req.originalUrl;
  //get urlActive
  let urlActive = req.originalUrl.split("/").slice(-1)[0];
  // console.log(urlPost);
  // console.log(urlActive);
  //get random 3 posts
  const postsRandom = await postModel.getPostRandom(3);

  //get 6 post news
  const postsNews = await postModel.getPostNews(6);
  //get post with title
  const postJavascript = await postModel.getPostTitle("Javascript", 4);
  const postMongodb = await postModel.getPostTitle("Mongodb", 3);
  const postNodejs = await postModel.getPostTitle("Nodejs", 3);
  const postCSS = await postModel.getPostTitle("CSS", 3);
  const postHTML = await postModel.getPostTitle("HTML", 3);

  //get all post with views hight
  const postViews = await postModel.getPostViews(4);
  // console.log(postViews);
  //get last post
  const postLast = (await postModel.getAllPosts()).reverse().splice(0, 4);
  // get title
  const allTitle = await titleModel.findAllTitle();
  console.log(req.session.user);

  res.render("client/index", {
    main: main,
    postsNews: postsNews,
    postsRandom: postsRandom,
    postJavascript: postJavascript,
    postNodejs: postNodejs,
    postHTML: postHTML,
    postCSS: postCSS,
    postMongodb: postMongodb,
    postViews: postViews,
    postLast: postLast,
    allTitle: allTitle,
    urlActive: urlActive,
    username: req.session.user,
  });
};
