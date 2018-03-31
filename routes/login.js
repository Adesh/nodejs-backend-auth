var express = require('express');
var router = express.Router();
var path = require("path");
var User = require('../models/user');
var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/dashboard');
    } else {
        next();
    }    
};

// route for user Login
router
    .get('/', sessionChecker, (req, res, next) => {
        //res.sendFile(__dirname + '/public/login.html');
    	//res.render('login', { title: 'login' });
    	res.sendFile(path.join(__dirname, '/../public/login.html'));
        //res.json({"status":"login"})
    })
    .post('/', (req, res, next) => {
        var username = req.body.username,
            password = req.body.password;

        User.findOne({ where: { username: username } }).then(function (user) {
            if (!user) {
                res.redirect('/login');
            } else if (!user.validPassword(password)) {
                res.redirect('/login');
            } else {
                req.session.user = user.dataValues;
                res.redirect('/dashboard');
            }
        });
    });

module.exports = router;
