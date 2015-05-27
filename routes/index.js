var express = require('express');
var router = express.Router();
var fs = require('fs');
var marked = require('marked');

var postsDir = __dirname + '/../posts/';
var configfile = __dirname + '/../config.json'
fs.readdir(postsDir, function(error, directoryContents) {
  if (error) {
    throw new Error(error);
  }

  var posts = directoryContents.map(function(filename) {
      var postName = filename.replace('.md', '');
      var contents = fs.readFileSync(postsDir + filename, {encoding: 'utf-8'});
      var hierarchy = JSON.parse(fs.readFileSync(configfile,'utf-8'));
      console.log(hierarchy);
      return {postName: postName, contents: marked(contents), children : hierarchy[postName]};
  });

  router.get('/', function(request, response) {
    response.render('index', {posts: posts, title: 'all posts'} )
  });

  posts.forEach(function(post) {
    router.get('/' + post.postName, function(request, response) {
	console.log(post.children);
      response.render('post', {postContents: post.contents, postChildren: post.children});
    });
  });
});

module.exports = router;
