var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  res.render('work.ejs');
});

router.post('/work', (req, res, next) => {
  res.render('work.ejs');
});

module.exports = router;
