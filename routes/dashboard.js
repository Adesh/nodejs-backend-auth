var express = require('express');
var router = express.Router();
var path = require("path");
/*var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/dashboard');
    } else {
        next();
    }    
};*/

// route for user's dashboard
router.get('/', (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        //res.sendFile(__dirname + '/public/dashboard.html');
    	//res.render('dashboard', { title: 'dashboard' });
    	res.sendFile(path.join(__dirname, '/../public/dashboard.html'));
        //res.json({status:"dashboard"})
    }	
    else {
        res.redirect('/login');
    }
});

module.exports = router;
