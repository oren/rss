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

    // without this function lastArticle will be true since sismember is async and executed
    // later on. by creating a clojure we keep lastArticle's correct value.
    // http://book.mixu.net/ch4.html - example 2 and 4
    (function(lastArticle) {
      client.sismember(site + ':read', url, function (err, articleFound) {
        if (err) { return cb(err); }
        if (articleFound) {
          if (lastArticle) {
            client.smembers(site + ':unread', function (err, unread) {
              if (err) { return cb(err); }
              return cb(null, unread); 
            });
          }
        } else {
          // insert to unread set
          client.sadd(site + ':unread', url, function (err, value) {
            if (err) { return cb(err); }
            client.smembers(site + ':unread', function (err, unread) {
              if (err) { return cb(err); }
              if (lastArticle) {
                return cb(null, unread); 
              }
            });
          });
        }
      });})(lastArticle);
  });  
}
