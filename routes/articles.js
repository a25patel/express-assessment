var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.ARTICLES_INFO);
var articleCollection = db.get('articles');

//make index latest to oldest
//format forms
// paragraphs, validations, excerpt, body
// fix the styling
//etc 

// go back and completely redo the entire thing ground up
// set up middleware correctly!!!
//make a note of everything needed to wire things up correctly


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

//Show one article
router.get('/articles/:id', function(req,res,next){
  articleCollection.findOne({_id:req.params.id},function(err,zineIndex){
   res.render('articles/show', {oneArticle: zineIndex});
  });
});

// EDIT one article
router.get('/articles/:id/edit', function(req, res, next) {
  articleCollection.findOne({_id:req.params.id}, function(err, zineIndex){
    res.render('articles/edit', {oneArticle: zineIndex});
  });
});

//POST my UPDATES
router.post('/articles/:id/update', function(req,res,next){
  articleCollection.update({_id:req.params.id},{
    title: req.body.title,
    url: req.body.url,
    background: req.body.background,
    excerpt: req.body.excerpt,
    body: req.body.articleBody,
  });
  res.redirect('/articles');
});

// DELETE an article
router.post('delete', function(req,res,next){
  articleCollection.remove({_id:req.params.id}, function(err, zineIndex){
    res.redirect('/articles');
  });
});




module.exports = router;
