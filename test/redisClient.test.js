const redis = require('redis-mock');
const { createClient } = require('redis');
const redisClient = require('../src/utils/redisUtils/redisConfig');

jest.mock('redis', () => require('redis-mock'));

describe('Redis Client', () => {
  test('It should connect to Redis server', () => {
    expect(createClient).toHaveBeenCalledWith({
      host: 'localhost',
      port: 6379,
    });
  });

  test('It should log "Connected to Redis" when connected', () => {
    const logSpy = jest.spyOn(console, 'log');
    redisClient.emit('connect');
    expect(logSpy).toHaveBeenCalledWith('Connected to Redis');
    logSpy.mockRestore();
  });

  test('It should log Redis client errors', () => {
    const errorSpy = jest.spyOn(console, 'error');
    const errorMessage = 'Redis connection error';
    redisClient.emit('error', errorMessage);
    expect(errorSpy).toHaveBeenCalledWith('Redis client error:', errorMessage);
    errorSpy.mockRestore();
  });
});
