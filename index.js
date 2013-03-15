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

var feeds = ['foo.com', 'bar.com'];
var all = [];
var read = [];
var unread = [];
var count = 0;

feeds.forEach(function(feedUrl) {
  config.getAll(feedUrl, done); // http call
  config.getRead(feedUrl, config.db, done); // db call
});

function done(err, res) {
  count += 1;
  if (res.type === 'all') {
    all = res.posts; 
  } else {
    read = res.posts; 
  };

  // both callbacks were called
  if (count === 2) {
    unread = getUnread(all, read); // memory
    console.log('all', all);
    console.log('read', read);
    console.log('unread', unread);
  }; 
}
