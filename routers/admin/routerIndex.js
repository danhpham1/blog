const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const routerIndex = express.Router();

routerIndex.use(bodyParser.urlencoded({ extended: true }));

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../public/img/logo'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
})

var upload = multer({ storage: storage });

//require
const homeController = require('../../controller/admin/home');
//title controller
const controllerTitle = require('../../controller/admin/title/title');
//post controller
const controllerPost = require('../../controller/admin/post/post');

routerIndex.get('/index', homeController.getHome);

//Titile
routerIndex.get('/title', controllerTitle.getTitleIndex);
//add Titile
routerIndex.get('/title/add', controllerTitle.getTitleAdd);

routerIndex.post('/title/process-add', controllerTitle.processPostTitle);
//edit Titile
routerIndex.get('/title/edit/:id', controllerTitle.getTitleEdit);

routerIndex.post('/title/process-edit', controllerTitle.processEditTitle);

//delete title
routerIndex.post('/title/delete/:id', controllerTitle.processDeleteTitle);


//Posts

//get index
routerIndex.get('/posts', controllerPost.getPostIndex);


//add
routerIndex.get('/post/add', controllerPost.getPostAdd);

routerIndex.post('/post/process-add', upload.single('logo'), controllerPost.processPost);


//edit
routerIndex.get('/post/edit/:id', controllerPost.getPostEdit);

routerIndex.post('/post/process-edit', upload.none(), controllerPost.processEdit);


//delte
routerIndex.post('/post/delete/:id', controllerPost.processDelete);

//search
routerIndex.get('/post/search', controllerPost.processSearch);
routerIndex.post('/post/search', controllerPost.processPostSearch)

//sort by title
routerIndex.get('/post/sort', controllerPost.sortPostsByTitle);

//logout 

routerIndex.get('/logout', controllerPost.logout);

module.exports = routerIndex;

