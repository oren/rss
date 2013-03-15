// POST /sub 
// DEL /sub
// GET /sub

// returned from GET
// ['foo.com/1', 'foo.com/2', 'foo.com/3']

//in DB
// blog foobar
// 'foo.com/1'
// 'foo.com/2'
// 'foo.com/3'

// module 1
// get posts from feed
// 'foo.com' => ['foo.com/1', 'foo.com/2', 'foo.com/3']

// module 2
// get unread posts out of feed links and db links
// ['foo.com/1', 'foo.com/2', 'foo.com/3'], ['foo.com/1', 'foo.com/2'] => ['foo.com/3']

// module 3
// get all feeds
//

"use strict";

var environment = process.env.NODE_ENV || 'development';
var config = require('./config/' + environment + '.js');
var getUnread = require('./getUnread.js');

var feeds = {
  'http://cyber.law.harvard.edu/rss/examples/rss2sample.xml': {count: 0}, 
  'http://www.alistapart.com/site/rss" htmlUrl="http://alistapart.com': {count: 0},
  'http://feeds.feedburner.com/VirtuousCode?format=xml': {count: 0}
};

Object.keys(feeds).forEach(function(url, value) {
  config.getAll(url, done); // http call
  config.getRead(url, config.db, done); // db call
});

function done(err, res) {
  feeds[res.url].count += 1;

  if (res.type === 'all') {
    feeds[res.url].all = res.posts; 
  } else {
    feeds[res.url].read = res.posts; 
  };

  // both callbacks were called
  if (feeds[res.url].count === 2) {
    feeds[res.url].unread= getUnread(feeds[res.url].all, feeds[res.url].read); // memory
    console.log('feeds', feeds[res.url]);
  }; 
}
