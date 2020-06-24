
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const titleModel = require('../../../models/admin/title');
const postModel = require('../../../models/admin/post');
const { type } = require('os');

let keyword;

//get Index post
module.exports.getPostIndex = async (req, res) => {
    let main = 'posts/index';
    //connect to get posts
    let listPosts = await postModel.getAllPosts();
    listPosts = listPosts.reverse();
    //pagination page
    let currentPage = req.query.page || 1;
    let numberPosts = 5;
    let start = (currentPage - 1) * numberPosts;
    // let end = currentPage * numberPosts;

    // console.log(Math.ceil(listPosts.length / numberPosts));
    let totalPage = Math.ceil(listPosts.length / numberPosts);
    // console.log(listPosts.splice(start, end));
    res.render('admin/index', {
        main: main,
        listPosts: listPosts.splice(start, 5),
        totalPage: totalPage,
        start: start,
        currentPage: currentPage,
        username: req.session.passport.user
    });
}


//get index post add
module.exports.getPostAdd = async (req, res) => {
    //connect to mongo get title
    const listTitle = await titleModel.findAllTitle();

    let main = 'posts/add';
    res.render('admin/index', { main: main, listTitle: listTitle, username: req.session.passport.user });
}

//process post
module.exports.processPost = async (req, res) => {
    let views = 0;
    let date = new Date(Date.now());
    let post;

    date = date.toISOString().split('T')[0];
    // console.log(req.body.nametitle);

    const idTitle = mongoose.Types.ObjectId(req.body.nametitle);
    let nameTitle = await titleModel.findTitleById(idTitle);

    post = new postModel.postModel({
        title: req.body.title,
        logo: req.file.filename,
        views: views,
        date: date,
        idTitle: req.body.nametitle,
        content: req.body.content,
        nameTitle: nameTitle.name,
        contentSub: req.body.contentsub
    });

    postModel.savePost(post)
        .then(rs => {
            res.redirect('/admin/posts');
        })
        .catch(err => {
            console.log('post not saved');
        })
}

//get one post

module.exports.getPostEdit = async (req, res) => {
    //get all title
    const listTitle = await titleModel.findAllTitle();

    //get post edit
    const idPost = mongoose.Types.ObjectId(req.params.id)
    const post = await postModel.getPostById(idPost);

    let main = 'posts/edit';
    res.render('admin/index', { main: main, listTitle: listTitle, post: post, username: req.session.passport.user });

}

//process edit post

module.exports.processEdit = async (req, res) => {
    // console.log(req.body);
    const id = mongoose.Types.ObjectId(req.body.nametitle);
    let nameTitle = await titleModel.findTitleById(id);

    const idPost = mongoose.Types.ObjectId(req.body.id);

    postModel.updatePostById(idPost, {
        title: req.body.title,
        logo: req.body.logo,
        views: req.body.views,
        date: req.body.date,
        idTitle: req.body.nametitle,
        content: req.body.content,
        nameTitle: nameTitle.name,
        contentSub: req.body.contentsub
    })
        .then(rs => {
            console.log('update success');
            res.redirect('/admin/posts');
        })

        .catch(err => {
            console.log('not updated');
        })
}

//delete post
module.exports.processDelete = async (req, res) => {
    const idPost = mongoose.Types.ObjectId(req.params.id);
    // console.log(idPost, req.params.id);
    let post = await postModel.getPostById(idPost);
    // console.log(post);

    // // console.log(post.logo);

    let dir = path.join(__dirname + '../../../../public/img/logo');
    // console.log(dir);
    if (fs.existsSync(`${dir}/${post.logo}`)) {
        fs.unlinkSync(`${dir}/${post.logo}`);
    };

    postModel.deletePost(idPost)
        .then(rs => {
            console.log('Delete');
            res.redirect('/admin/posts');
        })
        .catch(err => {
            console.log('Delete faild');
        })
}



//search post

module.exports.processPostSearch = (req, res) => {
    keyword = req.body.keyword;
    res.redirect('/admin/post/search');
}

module.exports.processSearch = async (req, res) => {

    // console.log(keyword);

    let main = 'posts/search';

    let listPosts = await postModel.searchPostByTitle(keyword);
    // console.log(listPost);
    //pagination page
    let currentPage = req.query.page || 1;
    let numberPosts = 5;
    let start = (currentPage - 1) * numberPosts;
    // let end = currentPage * numberPosts;

    // console.log(Math.ceil(listPosts.length / numberPosts));
    let totalPage = Math.ceil(listPosts.length / numberPosts);


    res.render('admin/index', {
        main: main,
        listPosts: listPosts.splice(start, numberPosts),
        totalPage: totalPage,
        start: start,
        currentPage: currentPage,
        username: req.session.passport.user
    })
}

//sort post by title 
module.exports.sortPostsByTitle = async (req, res) => {

    let main = 'posts/sort'

    //pagination page
    let listPosts = await postModel.sortPostByTitle();
    // console.log(listPost);
    let currentPage = req.query.page || 1;
    let numberPosts = 5;
    let start = (currentPage - 1) * numberPosts;
    // let end = currentPage * numberPosts;
    let totalPage = Math.ceil(listPosts.length / numberPosts);


    res.render('admin/index', {
        main: main,
        listPosts: listPosts.splice(start, 5),
        totalPage: totalPage,
        start: start,
        currentPage: currentPage,
        username: req.session.passport.user
    })
}


//logout 

module.exports.logout = (req, res) => {
    req.logout();
    res.redirect('/admin/index/login');
}