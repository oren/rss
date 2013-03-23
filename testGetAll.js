var get = require('./getAll.js');

var options = {
  'uri': 'http://shawn.dahlen.me/atom.xml',
  'If-Modified-Since': 'Tue, 19 Mar 2013 10:41:11 GMT',
  'limit': 3
};

get(options, function(err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log('posts', data.posts);
    console.log('length', data.posts.length);
  }
});

