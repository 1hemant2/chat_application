const { cacheUser, notifyUserStatus } = require('../redis/redisClient');
const { getParticipants } = require('../services/thread.server');

/**
 * @param {*} socket
 * @param {*} data
 * This function handles the logic when a user come online for first time.
 * - It caches the user ID and socket ID in Redis.
 * - It retrieves the threads associated with the user.
 * - It notifies all participants in those threads about the user's online status.
 */
const handleUserJoin = async (socket, data) => {
  const userId = data?.userId;
  const socketId = socket.id;
  await cacheUser(userId, socketId);
  const participants = await getParticipants(userId);
  notifyUserStatus(userId, participants);
};

const handleUserStatus = (io, data) => {
  const userId = data?.userId;
  const socketId = data?.socketId;
  const socket = io.sockets.sockets.get(socketId);
  if (socket) {
    io.to(socketId).emit('user_status', { userId, status: 'online' });
  }
};

module.exports = { handleUserJoin, handleUserStatus };
