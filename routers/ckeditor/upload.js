const express = require('express');
const routerUpload = express.Router();
const path = require('path');
const multer = require('multer');

var storage = multer.diskStorage({
    destination:function(req,file,cb) {
        cb(null,path.join(__dirname + '../../../public/img/post-img'));        
    },
    filename:function(req,file,cb){
        cb(null,Date.now() + '-' + file.originalname);
    }
})

var upload = multer({storage:storage});

const controllerUpload = require('../../controller/ckeditor/upload');


routerUpload.get('/browser',controllerUpload.getUploadIndex);

routerUpload.post('/upload',upload.single('uploadfile'),controllerUpload.processUpload);

routerUpload.get('/delete',controllerUpload.processDelete);


module.exports = routerUpload;