"use strict";

// get the recent 10 blog posts of a given feed
// the posts are returned as an array in the callback which looks like this:
// [   
//   { link: 'http://devblog.avdi.org/2013/03/11/rubytapas-freebie-streaming/',
//     title: 'RubyTapas Freebie: Streaming',
//     guid: 'http://devblog.avdi.org/?p=7546' 
//   },
//   { link: 'http://devblog.avdi.org/2013/02/18/rubytapas-freebie-blocks-procs-lambdas/',
//     title: 'RubyTapas Freebie: Blocks, Procs, & Lambdas',
//     guid: 'http://devblog.avdi.org/?p=7425' 
//   },
//   { link: 'http://devblog.avdi.org/2013/01/24/im-sorry-too/',
//     title: 'I’m sorry too.',
//     guid: 'http://devblog.avdi.org/?p=6801' 
//   }
// ]

// npm packages
var request = require('request');
var feedparser = require('feedparser');

var i = 0;
var posts = [];
var reqObj = {};
var x = null;

module.exports = function(feedUrl, cb) {
  function articleDone (article) {
    i += 1;
    if (i<10) {
      // posts.push(article);
      posts.push({link: article.link, title: article.title, guid: article.guid});
    } else {
      console.log(posts);

      cb(null, {url: feedUrl, type: 'all', posts: posts });
    };
  }

  function feedDone (meta, articles) {
    // console.log('articles', articles);
    articles.forEach(function (article) {
      posts.push({link: article.link, title: article.title, guid: article.guid});
    });

    cb(null, {url: feedUrl, type: 'all', posts: posts });
  }

  reqObj = { 'uri': feedUrl };

  request(reqObj, function (err, response, body) {
      x = feedparser.parseString(body);
    x.on('article', articleDone);
    x.on('complete', feedDone);
    x.on('error', function(err) {
      cb("Error in parsing the rss feed: " + err);
    });
  });
};
