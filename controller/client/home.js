const postModel = require('../../models/admin/post');
const titleModel = require('../../models/admin/title');

module.exports.getHome = async (req, res) => {
    let main = 'patials/index';

    //get random 6 posts
    const postsRandom = await postModel.getPostRandom(6);

    //get post with title
    const postJavscript = await postModel.getPostTitle('Javascript');
    const postNodejs = await postModel.getPostTitle('Nodejs');
    const postHTML = await postModel.getPostTitle('HTML');
    const postCSS = await postModel.getPostTitle('CSS');

    //get all post 
    const allPosts = await (await postModel.getAllPosts()).reverse();
    let postsPerPage = 5;
    let allPage = Math.ceil(allPosts.length / 5);
    let currentPage = req.query.page || 1;
    let start = (currentPage - 1) * postsPerPage;

    // get title
    const allTitle = await titleModel.findAllTitle();

    // console.log(postNodejs, postJavscript);
    res.render('client/index', {
        main: main,
        postsRandom: postsRandom,
        postJavscript: postJavscript,
        postNodejs: postNodejs,
        postHTML: postHTML,
        postCSS: postCSS,
        allPosts: allPosts.splice(start, 5),
        allPage: allPage,
        currentPage: currentPage,
        allTitle: allTitle
    });

};