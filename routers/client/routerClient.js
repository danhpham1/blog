const express = require("express");
const routerClient = express.Router();

routerClient.use(express.static("public"));

//controller
const homeController = require("../../controller/client/home");

const categoryController = require("../../controller/client/category/category");

const postController = require("../../controller/client/post/post");

//get home index
routerClient.get("", homeController.getHome);

//get category index
routerClient.get("/category/:name", categoryController.getCategoryIndex);

//get post index
routerClient.get("/post/:id", postController.getPostIndex);
module.exports = routerClient;
