const express = require("express");
const routerClient = express.Router();

routerClient.use(express.static("public"));

//controller
const homeController = require("../../controller/client/home");

const categoryController = require("../../controller/client/category/category");

const postController = require("../../controller/client/post/post");

const loginController = require("../../controller/client/login/login");

const registerController = require("../../controller/client/register/register");

const searController = require("../../controller/client/sreach/search");

const commentController = require("../../controller/client/comment/comment");

//get home index
routerClient.get("", homeController.getHome);

//get category index
routerClient.get("/category/:name", categoryController.getCategoryIndex);

//get post index
routerClient.get("/post/:id", postController.getPostIndex);

//get search post index
routerClient.get("/search", searController.processSearchPost);

//get index login
routerClient.get("/login", loginController.getIndexLogin);
routerClient.post("/login", loginController.processPostLogin);

//process logout
routerClient.get("/logout", loginController.processLogout);

//process comment
routerClient.post("/comment", commentController.processCommentPost);

//get index register
routerClient.get("/register", registerController.getIndexRegister);
routerClient.post("/register", registerController.processPostRegister);

module.exports = routerClient;
