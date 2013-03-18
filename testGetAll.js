var get = require('./getAll.js');

// get('http://cyber.law.harvard.edu/rss/examples/rss2sample.xml', function(err, posts) {
//   console.log('posts', posts);
// });

// get('http://substack.net/rss', function(err, posts) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('posts', posts);
//   }
// });

get('http://substack.net/blog.xml', 3, function(err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log('posts', data.posts);
    console.log('length', data.posts.length);
  }
});

// get('http://engineering.yp.com/rss.xml', function(err, posts) {
//   console.log('posts', posts);
// });

// get('http://tjholowaychuk.com/rss', function(err, posts) {
//   console.log('posts', posts);
// });


// <link rel="alternate" type="application/rss+xml" name="RSS" href="http://tjholowaychuk.com/rss"/>
// <link rel="alternate" type="application/atom+xml" title="substack.net" href="/blog.xml">
// Feed readers can send If-Modified-Since or If-None-Match as part of the request so the server only sends back the full feed if there's something new (Otherwise a 304 Not Modified)
//
// Feed readers can send If-Modified-Since or If-None-Match as part of the request so the server only sends back the full feed if there's something new (Otherwise a 304 Not Modified)
