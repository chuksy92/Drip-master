/** @format */

const redis = require('redis');

// Create a Redis client
const client = redis.createClient();


exports.client = client;