var redis = require("redis");
var client = redis.createClient();

client.on("error", function (err) {
  console.log("Error in Redis: " + err);
});

client.flushdb(redis.print);

// add a site to sites list
client.rpush("sites", "http://substack.net/blog.xml", redis.print);

// add site properties to a hash
client.hmset("http://substack.net/blog.xml", "order", 0, redis.print);

// add articles to read set
// client.sadd('http://substack.net/blog.xml:read', "http://substack.net/many_things", redis.print);

// add articles to unread set
// client.sadd('http://substack.net/blog.xml:read', "http://substack.net/how_I_write_modules", redis.print);

client.quit();

