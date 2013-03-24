db 
--
(sets)
SADD feeds substack.com reddit.com/node

(hash)
HMSET feed:substack.com update 'Tue, 19 Mar 2013 10:41:11 GMT'

(sets)
SADD substuck.com substack.com/post1.html substack.com/post2.html
substack.com:unread
  substack.com/post1.html
  substack.com/post2.html
reddit.com/node:unread
  reddit.com/node/post1.html
  
flow
----
get substack feed - getAll(substack.com)
  substuck.com/post1.html
  substuck.com/post2.html
  substuck.com/post3.html

add unread posts to db -db.addPosts('substack.com', 'substuck.com/post1.html', 'substuck.com/post2.html', 'substuck.com/post3.html')
SADD substuck.com:unread sabstuck.com/post1.html sabstuck.com/post2.html substack.com/post3.html

ui
--
substack 3

read post2 - readPost('substack.com', 'substuck.com/post2.html')
SADD substuck.com:read sabstuck.com/post1.html sabstuck.com/post2.html substack.com/post3.html

substack 2

get substack feed






// user actions
// add feed
// delete feed
// show unread posts of a feed
// show unread posts of all feeds
// read post
// unread post

// POST /addFeed (feedUrl)
// DEL /delFeed (feedUrl)
// GET /unread?feedUrl=foo.com/rss.xml
// GET /unread
// POST /markRead?postUrl=foo.com/rss.xml
// POST /markUnread?postUrl=foo.com/rss.xml


// POST /feedUrl/postUrl?action=unread
// POST /http://liftoff.msfc.nasa.gov/http://liftoff.msfc.nasa.gov/2003/05/20.html#item570?action=read

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
  'http://www.alistapart.com/site/rss" htmlUrl="http://alistapart.com': {count: 0}
  // 'http://feeds.feedburner.com/VirtuousCode?format=xml': {count: 0}
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
    feeds[res.url].unread = getUnread(feeds[res.url].all, feeds[res.url].read); // memory
    console.log('unread');
    console.log(feeds[res.url].unread);
  }; 
}
