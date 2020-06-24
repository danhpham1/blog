const express = require('express');
const routerLogin = express.Router();

const controllerLogin = require('../../controller/admin/login');
const passPort = require('passport');
const localStrategy = require('passport-local').Strategy;

passPort.use(new localStrategy(function (username, password, done) {
    if (username == 'admin') {
        if (password == 123456) {
            return done(null, username);
        } else {
            return done(null, false);
        }
    } else {
        return done(null, false);
    }
}));

passPort.serializeUser((username, done) => {
    return done(null, username);
})

passPort.deserializeUser((user, done) => {
    if (user == 'admin') {
        return done(null, user);
    } else {
        return done(null, false);
    }
})


routerLogin.get('/login', controllerLogin.getIndexLogin);
routerLogin.post('/login', passPort.authenticate('local', {
    // failureRedirect:'/login',
    // successRedirect:'/'
    successRedirect: '/admin/index',
    failureRedirect: '/admin/index/login'
}));

module.exports = routerLogin;