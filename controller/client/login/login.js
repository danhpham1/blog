const User = require("../../../models/admin/user");
const bcrypt = require("bcryptjs");

module.exports.getIndexLogin = (req, res) => {
  res.render("client/login-register/login");
};

module.exports.processPostLogin = async (req, res) => {
  let user = await User.getUserByUsername(req.body.username);
  if (user.length > 0) {
    if (
      bcrypt.compareSync(req.body.password, user[0].password) &&
      user[0].status == true
    ) {
      req.session.user = { username: user[0].username };
      res.redirect(req.session.redirectTo);
    } else {
      res.redirect("/login");
    }
  } else {
    res.redirect("/login");
  }
  // res.redirect(req.session.redirectTo);
};

module.exports.processLogout = (req, res) => {
  // console.log(req.session.cookie);
  delete req.session.user;
  res.redirect(req.session.redirectTo);
};
