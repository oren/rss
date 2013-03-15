// var feedparser = require('feedparser');
// var i = 0;
// 
// function callback (article) {
//   console.log(i);
//   i += 1;
//   console.log('Got article: %s', JSON.stringify(article));
// }
// 
// feedparser.parseUrl('http://cyber.law.harvard.edu/rss/examples/rss2sample.xml').on('article', callback);


// But you should probably be using conditional GETs and passing the results to
// parseString() or piping it right into the stream, if possible

// var request = require('request');
// var reqObj = { 'uri': 'http://cyber.law.harvard.edu/rss/examples/rss2sample.xml',
//                'headers': { 'If-Modified-Since' : '2004-07-10T04:00:00.000Z'
//                //              'If-None-Match' : <your cached 'etag' value>
//                           }
//              };
// 
// // parseString()
// request(reqObj, function (err, response, body){
//   feedparser.parseString(body).on('article', callback);
// });
// 


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

var db = require('./mock-db.js');
var getAll = require('./mock-getAll.js');
var getRead = require('./mock-getRead.js');
var getUnread = require('./getUnread.js');

var feeds = ['foo.com', 'bar.com'];
var all = [];
var read = [];
var unread = [];
var count = 0;

feeds.forEach(function(feedUrl) {
  getAll(feedUrl, done); // http call
  getRead(feedUrl, db, done); // db call
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
