var express = require('express');
var router = express.Router();

router.get('/signin', (req, res, next) => {
  res.render('signin.ejs');
});

router.get('/signup', (req, res, next) => {
  res.render('signup.ejs');
});

router.get('/signout', (req, res, next) => {
  res.render('signin.ejs');
});

module.exports = router;
