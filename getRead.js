"use strict";

// get all blog posts that were already read

module.exports = function(feedUrl, db, cb) {
  db(feedUrl, function(err, posts){
    cb(null, {url: feedUrl, type: 'read', posts: posts});
  });
  
};
