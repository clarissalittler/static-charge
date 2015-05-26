var express = require('express');
var router = express.Router();
var fs = require('fs');
var marked = require('marked');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var postsDir = __dirname + '/../posts/';
fs.readdir(postsDir, function(error, directoryContents) {
  if (error) {
    throw new Error(error);
  }

  directoryContents.forEach(function(postFileName) {
    var postName = postFileName.replace('.md', '');
    fs.readFile(postsDir + postFileName, {encoding: 'utf-8'}, function(error, fileContents) {
      if (error) {
        throw new Error(error);
      }

      var renderedPost = marked(fileContents);

      router.get('/' + postName, function(request, response) {
        response.render('post', {postContents: renderedPost});
      });
    })
  });
});

module.exports = router;
