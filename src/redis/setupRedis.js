// redisSetup.js
const { createAdapter } = require('@socket.io/redis-adapter');
const Redis = require('ioredis');
const logger = require('../config/logger');

// Redis for pub/sub (Socket.IO scaling)
const pubClient = new Redis({ host: 'localhost', port: 6379 });
const subClient = pubClient.duplicate();

// Redis for application-level caching / commands
const redisClient = new Redis({ host: 'localhost', port: 6379 });

const setupRedisAdapter = (io) => {
  pubClient.on('error', (err) => {
    logger.error('❌ Redis pub error:', err);
  });

  subClient.on('error', (err) => {
    logger.error('❌ Redis sub error:', err);
  });
  logger.info('Redis pub/sub clients initialized successfully. 🎉');
  io.adapter(createAdapter(pubClient, subClient));
};

module.exports = {
  setupRedisAdapter,
  pubClient,
  subClient,
  redisClient,
};
