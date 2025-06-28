const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const threadSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
      required: true,
    },
    lastSeenMessageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
      required: true,
    },
    unreadCount: {
      type: Number,
      default: 0,
    },
    isMuted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
threadSchema.plugin(toJSON);
threadSchema.plugin(paginate);

/**
 * @typedef UserRoomStatus
 */
const UserRoomStatus = mongoose.model('UserRoomStatus', threadSchema);

module.exports = UserRoomStatus;
