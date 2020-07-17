const User = require("../../../models/admin/user");
const bcrypt = require("bcryptjs");

module.exports.getIndexRegister = (req, res) => {
  res.render("client/login-register/register");
};

module.exports.processPostRegister = (req, res) => {
  // console.log(username, email, password);
  let salt = 10;
  let genSalt = bcrypt.genSaltSync(salt);
  let password = bcrypt.hashSync(req.body.password, genSalt);
  let user = new User.userModel({
    username: req.body.username,
    email: req.body.email,
    password: password,
  });

  User.saveUser(user)
    .then((rs) => {
      res.status(201).json({
        result: true,
      });
    })
    .catch((err) => {
      res.json({
        result: false,
        err: "Your email or username is duplicate",
      });
    });
};
