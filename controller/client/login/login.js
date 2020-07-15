module.exports.getIndexLogin = (req, res) => {
  // console.log(req.session.redirectTo);
  res.render("client/login-register/login");
};

module.exports.processPostLogin = (req, res) => {
  // console.log("ok");
  res.redirect(req.session.redirectTo);
};
