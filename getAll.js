"use strict";

// Get the recent x blog posts of a given feed
//
// Parameters: url to rss feed, number of posts to retrieve and callback
//
// Returns: the callback's second parameter is an object that looks like this:
// { 
//   url: 'http://substack.net/blog.xml',
//   type: 'all',
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
var results = {
  url: '',
  type: 'all',
  posts: []
};

module.exports = function(feedUrl, limit, cb) {
  function articleDone (article) {
    postCount += 1;

    if (postCount <= limit) {
      results.posts.push({link: article.link, title: article.title, guid: article.guid});
    } else {
      x.removeAllListeners(); // if we don't do that the article and done events will still get fired!
      return cb(null, results);
    };
  }

  function feedDone (meta, articles) {
    articles.forEach(function (article) {
      result.sposts.push({link: article.link, title: article.title, guid: article.guid});
    });

    return cb(null, {url: feedUrl, type: 'all', posts: posts });
  }

  results.url = feedUrl;

  x = feedparser.parseStream(request({'uri': feedUrl}))

    x.on('article', articleDone); // fired on each blog post
    x.on('complete', feedDone);
    x.on('error', function(err) {
      return cb("Error in parsing the rss feed: " + err);
    });
  // });
};
