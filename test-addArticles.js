var add = require('./addArticles.js');

var articles = [
  'http://substack.net/how_I_write_modules',
  'http://substack.net/many_things'
];

add('http://substack.net/blog.xml', articles, function(err, unread) {
  if (err) {
    console.log('error', err);
  } else {
    console.log('unread articles:', unread);
  }
});

