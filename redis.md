## delete all keys in all dbs
flushall

## delete all keys in current db
flushdb

## add feed update time (hash)
HMSET feed:foo.com update 'Tue, 19 Mar 2013 10:41:11 GMT'

## get feed update time
HGETALL feed:foo.com

## add feeds (set)
SADD feeds foo.com bar.com aaa.com
SMEMBERS feeds
1) "aaa.com"
2) "foo.com"
3) "bar.com"

## add urls to feed (set)
SADD foo.com foo.com/1 foo.com/2 foo.com/3

SMEMBERS foo.com
1) "foo.com/3"
2) "foo.com/4"
3) "foo.com/1"
4) "foo.com/2"

## check if post exist
SISMEMBER foo.com foo.com/5
0

SISMEMBER foo.com foo.com/1
1

## get unread
sdiff all read

read, in db
a, b, c

all, app memory
a, b, c, d 

