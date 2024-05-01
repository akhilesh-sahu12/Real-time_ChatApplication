const { createClient } = require('redis');

const redisClient = createClient({
  host: 'localhost', // Redis server host
  port: 6379, // Redis server port
});

// Event listener for when the Redis client connects
redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

// Event listener for Redis client errors
redisClient.on('error', (error) => {
  console.error('Redis client error:', error);
});

module.exports = redisClient;
