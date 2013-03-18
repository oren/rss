var get = require('./getAll.js');

// get('http://cyber.law.harvard.edu/rss/examples/rss2sample.xml', function(err, posts) {
//   console.log('posts', posts);
// });

get('http://substack.net/rss', function(err, posts) {
  if (err) {
    console.log(err);
  } else {
    console.log('posts', posts);
  }
});

get('http://substack.net/blog.xml', function(err, posts) {
  if (err) {
    console.log(err);
  } else {
    console.log('posts', posts);
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
