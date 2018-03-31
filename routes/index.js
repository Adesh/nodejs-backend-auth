var express = require('express');
var router = express.Router();

var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/dashboard');
    } else {
        next();
    }    
};

router.get('/', sessionChecker, (req, res, next) => {
    //res.render('index', { title: 'Express' });
    res.redirect('/login');
});

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

module.exports = router;
