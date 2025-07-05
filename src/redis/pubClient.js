const logger = require('../config/logger');
const { pubClient } = require('./setupRedis');

const publisher = (channel, message) => {
  pubClient.publish(channel, JSON.stringify(message), (err, res) => {
    if (err) {
      logger.error('❌ Error publishing message:', err);
    } else {
      logger.info(`✅ Message published to ${channel}:`, res);
    }
  });
};

module.exports = {
  publisher,
};
