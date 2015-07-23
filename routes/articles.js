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

// GET my new article page!
router.get('/articles/new', function(req, res, next) {
  res.render('articles/new');
});

//POST information into my database
router.post('/articles', function(req,res,next){
  articleCollection.insert({
    title: req.body.title,
    url: req.body.url,
    background: req.body.background,
    excerpt: req.body.excerpt,
    body: req.body.articleBody,
  });
  res.redirect('/articles');
});



router.get('/articles/edit', function(req, res, next) {
  res.render('articles/edit');
});

router.get('/articles/show', function(req, res, next) {
  res.render('articles/show');
});

module.exports = router;
