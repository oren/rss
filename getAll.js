"use strict";

// npm packages
var request = require('request');
var feedparser = require('feedparser');

var i = 0;
var posts = [];
var reqObj = {};
var x = null;

module.exports = function(feedUrl, cb) {
  function callback (article) {
    i += 1;
    if (i<10) {
      // posts.push(article);
      posts.push({link: article.link, title: article.title, guid: article.guid});
    } else {
      cb(null, {type: 'all', posts: posts });
    };
  }

  function callback2 (meta, articles) {
    // console.log('articles', articles);
    articles.forEach(function (article) {
      posts.push({link: article.link, title: article.title, guid: article.guid});
    });

    cb(null, {type: 'all', posts: posts });
  }

  reqObj = { 'uri': feedUrl,
               'headers': { 'If-Modified-Since' : '2004-07-10T04:00:00.000Z'
               //              'If-None-Match' : <your cached 'etag' value>
                          }
             };

  request(reqObj, function (err, response, body) {
    x = feedparser.parseString(body);
    x.on('article', callback);
    x.on('complete', callback2);
  });
};
