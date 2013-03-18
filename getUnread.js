"use strict";

// get all urls and read urls and return array of unread

module.exports = function(all, read) {
  return all.filter(function(x) { return read.indexOf(x.guid) < 0 })
};
