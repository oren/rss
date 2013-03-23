"use strict";

// Get the recent x blog posts of a given feed
//
// Parameters: url to rss feed, number of posts to retrieve and callback
//
// Returns: the callback's second parameter is an object that looks like this:
// { 
//   url: 'http://substack.net/blog.xml',
//   posts:[ 
//     { link: null,
//        title: 'many things',
//        guid: 'http://substack.net/many_things' 
//     },
//     { link: null,
//       title: 'how I write modules',
//       guid: 'http://substack.net/how_I_write_modules' 
//     }
//   ]
// }

// npm packages
var request = require('request');
var feedparser = require('feedparser');

var postCount = 0;        // we want to stop when we got 10 posts
var x = null;
var requestOptions = {};
var results = {
  url: '',
  posts: []
};

module.exports = function(options, cb) {
  results.url = options.uri;
  requestOptions = {
    'uri': options.uri, 
    'headers': { 'If-Modified-Since': options['If-Modified-Since'] }
  };

  function articleDone (article) {
    postCount += 1;

    if (postCount <= options.limit) {
      results.posts.push({link: article.link, title: article.title, guid: article.guid});
    } else {
      x.removeAllListeners(); // if we don't do that the article and done events will still get fired!
      return cb(null, results);
    };
  }

  function feedDone (meta, articles) {
    return cb(null, results);
  }

  x = feedparser.parseUrl(requestOptions)

  x.on('article', articleDone); // fired on each blog post
  x.on('complete', feedDone);
  x.on('304', function() { // fired if no new blog posts
    return cb(null, results);
  });
  x.on('error', function(err) {
    return cb("Error in parsing the rss feed: " + err);
  });
};
