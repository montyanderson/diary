const Bluebird = require("bluebird");
const redis = require("redis");

Bluebird.promisifyAll(redis.RedisClient.prototype);
Bluebird.promisifyAll(redis.Multi.prototype);

module.exports = redis.createClient();
