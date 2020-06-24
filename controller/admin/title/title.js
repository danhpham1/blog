const mongoose = require('mongoose');
const titleModel = require('../../../models/admin/title')

//get index
module.exports.getTitleIndex = async (req, res) => {

    //connect to mongo get all title
    const listTitle = await titleModel.findAllTitle();


    let main = 'title/index';
    res.render('admin/index', { main: main, listTitle: listTitle, username: req.session.passport.user });
    // console.log(titleList);
}

//add title
module.exports.getTitleAdd = async (req, res) => {
    let main = 'title/add';
    res.render('admin/index', { main: main, username: req.session.passport.user });
}

module.exports.processPostTitle = (req, res) => {
    // let main = 'title/add';
    // res.render('admin/index',{main:main});
    //connect to mongodb and add title
    let title = new titleModel.TitleModel({
        name: req.body.nametitle
    })

    titleModel.saveTitle(title)
        .then(rs => {
            console.log('add success');
            res.redirect('/admin/title');
        })
        .catch(err => {
            console.log('add faild');
        })
}

//edit title
module.exports.getTitleEdit = async (req, res) => {
    //connect to mongo and find
    let title = await titleModel.findTitleById(req.params.id);
    // console.log(title);

    let main = 'title/edit';
    res.render('admin/index', { main: main, title: title, username: req.session.passport.user });
}

module.exports.processEditTitle = async (req, res) => {
    let id = req.body.id;
    titleModel.updateTitleById(id, { name: req.body.nametitle }, { new: true })
        .then(rs => {
            res.redirect('/admin/title');
        })
        .catch(err => {
            console.log('update faild');
        });
}

//delete title
module.exports.processDeleteTitle = async (req, res) => {
    titleModel.deleteTitleById({ _id: req.params.id })
        .then(rs => {
            console.log('delete success');
            res.redirect('/admin/title');
        })
        .catch(err => {
            console.log('delete faild');
        })
        ;
}