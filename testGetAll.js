var get = require('./getAll.js');

get('http://cyber.law.harvard.edu/rss/examples/rss2sample.xml', function(err, posts) {
  console.log('posts', posts);
});


