"use strict";

module.exports = function(feedUrl, db, cb) {
  cb(null, {type: 'read', posts: ['foo.com/1', 'foo.com/2']});
};
