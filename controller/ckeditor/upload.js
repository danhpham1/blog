const fs = require('fs');
const path = require('path');

module.exports.getUploadIndex = (req,res)=>{
    const imgs = fs.readdirSync(path.join(__dirname + '../../../public/img/post-img'));
    // console.log(imgs);
    res.render('ckeditor-upload/upload',{image:imgs});
}

module.exports.processUpload = (req,res)=>{
    res.redirect('/ckeditor/browser');
}

module.exports.processDelete = (req,res)=>{
    let dir = path.join(__dirname + '../../../public/img/post-img');
    if(fs.existsSync(`${dir}/${req.query.filename}`)){
        fs.unlinkSync(`${dir}/${req.query.filename}`);
    };
    res.redirect('/ckeditor/browser');
}