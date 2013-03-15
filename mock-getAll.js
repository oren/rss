"use strict";

module.exports = function(feedUrl, cb) {
  cb(null, {type: 'all', posts: ['foo.com/1', 'foo.com/2', 'foo.com/3']});
};
