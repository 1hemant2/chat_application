const Thread = require('../models/thread.model');

// This function should return the participants of the thread
const getParticipants = async (userId) => {
  const userThreads = await Thread.find({ participants: userId });
  const participants = userThreads.map((thread) => {
    return thread.participants.filter((participant) => participant.toString() !== userId);
  });
  return participants || [];
};

module.exports = { getParticipants };
