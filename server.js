const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passPort = require("passport");
const localStrategy = require("passport-local").Strategy;

//require
const routerIndex = require("./routers/admin/routerIndex");

const routerUpload = require("./routers/ckeditor/upload");

const routerLogin = require("./routers/admin/routerLogin");

const loginMiddleware = require("./middleware/middleware-login");

const routerClient = require("./routers/client/routerClient");

const app = express();

// connecto to atlas
mongoose.connect(
  "mongodb+srv://danh:hanhphucao@clusterblog-sbxju.mongodb.net/blog?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  function (err) {
    if (err) {
      console.log("connect to mongo faild");
    } else {
      console.log("connect to mongo success");
    }
  }
);
//connect to local
// mongoose.connect('mongodb://127.0.0.1:27017/blog', {
//     useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false
// }, function (err) {
//     if (err) {
//         console.log('connect to mongo faild');
//     } else {
//         console.log('connect to mongo success')
//     }
// });

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "blog",
    saveUninitialized: true,
    resave: true,
    cookie: { maxAge: 60 * 60 * 60 * 60 },
  })
);

app.use(passPort.initialize());
app.use(passPort.session());

app.use("/admin/index", routerLogin);

app.use("/admin", loginMiddleware.loginMiddleware, routerIndex);
//upload img to server user ckeditor
app.use("/admin/ckeditor", routerUpload);
//client
app.use("/", routerClient);

//check ensureAuthenticated

app.listen(process.env.PORT || 3000, () => console.log("server start"));
