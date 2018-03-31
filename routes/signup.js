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

// route for user signup
router
	.get('/', sessionChecker, (req, res, next) => {
        //res.sendFile(__dirname + '/public/signup.html');
    	//res.render('signup', { title: 'singup' });
    	res.sendFile(path.join(__dirname, '../public/signup.html'));
        //res.json({status:"signup"})
    })
    .post('/', (req, res, next) => {
        User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        .then(user => {
            req.session.user = user.dataValues;
            res.redirect('/dashboard');
        })
        .catch(error => {
            res.redirect('/signup');
        });
    });

module.exports = router;
