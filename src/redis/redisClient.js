const config = require('../config/config');
const logger = require('../config/logger');
const { publisher } = require('./pubClient');
const { redisClient } = require('./setupRedis');

const cacheUser = async (userId, socketId) => {
  try {
    await redisClient.select(config.redis.DB_NUMBER.user);
    await redisClient.sadd(`user:${userId}`, socketId);
  } catch (error) {
    logger.error('❌ Error setting users in Redis:', error);
  }
};

const notifyUserStatus = (userId, participants) => {
  participants.forEach(async (participant) => {
    const socketIds = await redisClient.smembers(`user:${participant}`);
    if (socketIds.length > 0) {
      socketIds.forEach((socketId) => {
        publisher('user_status', {
          userId,
          socketId,
          status: 'online',
        });
      });
    }
  });
};

module.exports = {
  cacheUser,
  notifyUserStatus,
};
