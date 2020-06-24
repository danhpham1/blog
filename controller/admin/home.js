module.exports.getHome = (req, res) => {
    let main = 'partials/partial'

    res.render('admin/index', { main: main, username: req.session.passport.user });
}