const { userStatus } = require('../socket/handleEvents');
const { subClient } = require('./setupRedis');
const { getIO } = require('../socket/index');
const logger = require('../config/logger');

const io = getIO();
subClient.subscribe('user_status', 'user_message', (err, count) => {
  if (err) {
    logger.error('❌ Error subscribing to user_status channel:', err);
  } else {
    logger.info(`✅ Subscribed to user_status channel. Current subscription count: ${count}`);
  }
});

subClient.on('message', (channel, message) => {
  switch (channel) {
    case 'user_status':
      try {
        const data = JSON.parse(message);
        userStatus(io, data);
      } catch (error) {
        logger.error(`❌ Error parsing message from user_status channel:`, error);
      }
      break;
    default:
      break;
  }
});
