## delete all keys in all dbs
flushall

## delete all keys in current db
flushdb

## feeds set
SADD feeds foo.com bar.com aaa.com
SMEMBERS feeds
1) "aaa.com"
2) "foo.com"
3) "bar.com"

## feed set
ADD foo.com foo.com/1 foo.com/2 foo.com/3

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

