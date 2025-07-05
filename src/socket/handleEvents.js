const logger = require('../config/logger');
const { handleUserJoin } = require('./eventHelper');

const handleEvents = (socket, io) => {
  // Handle disconnection
  socket.on('disconnect', () => {
    logger.info(`Client disconnected: ${socket.id}`);
  });

  // Handle custom events here
  socket.on('user_join', async (data) => {
    await handleUserJoin(socket, data);
  });

  socket.on('chat_message', (data) => {
    // Broadcast the chat message to all connected clients
    io.emit('chat_message', data);
  });
};

module.exports = { handleEvents };
