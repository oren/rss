"use strict";

// add articles to unread set if they don't exist
// return unread articles
//
// arguments: articles is array of urls

// npm packages
var redis = require("redis");
var client = redis.createClient();

var numOfArticles = 0;
var lastArticle = false;

client.on("error", function (err) {
  console.log("Error in Redis: " + err);
});

module.exports = function(site, articles, cb) {
  numOfArticles = articles.length;

  articles.forEach(function(url, index) {
    lastArticle = ((index + 1) === numOfArticles);

    (function(lastArticle) {
      client.sismember(site + ':read', url, function (err, articleFound) {
        if (articleFound) {
          if (lastArticle) {
            client.smembers(site + ':unread', function (err, unread) {
              return cb(null, unread); 
            });
          }
        } else {
          // insert to unread set
          client.sadd(site + ':unread', url, function (err, value) {
            client.smembers(site + ':unread', function (err, unread) {
              if (lastArticle) {
                console.log('article not found in read');
                return cb(null, unread); 
              }
            });
          });
        }
      });})(lastArticle);
  });  
}
