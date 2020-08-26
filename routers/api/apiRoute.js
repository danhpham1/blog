const express = require("express");
const apiRoute = express.Router();

const categoryController = require("../../controller/api/category");

const postController = require("../../controller/api/post");

//category
apiRoute.get("/category/getAllCategory", categoryController.getAllTitle);
//post
apiRoute.get("/post/getAllPosts", postController.getAllPost);
apiRoute.get("/post/getPost/:id", postController.getPost);
apiRoute.get("/post/getPopularPost", postController.getPopularPosts);
apiRoute.get("/post/getLastPost", postController.getLastPost);
apiRoute.get("/post/getPostRandom", postController.getPostRandom);

module.exports = apiRoute;