module.exports.loginMiddleware = function isEnsureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/admin/index/login')
    }
}