var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.ARTICLES_INFO);
var articleCollection = db.get('articles');

// GET my home Index page!
router.get('/articles', function(req,res,next){
  articleCollection.find({}, function(err, zineIndex){
    res.render('articles/index', {allZine: zineIndex});
  });
});

router.get('/articles/new', function(req, res, next) {
  res.render('articles/new');
});


router.get('/articles/edit', function(req, res, next) {
  res.render('articles/edit');
});

router.get('/articles/show', function(req, res, next) {
  res.render('articles/show');
});

module.exports = router;
