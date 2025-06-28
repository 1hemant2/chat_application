const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const MessageSchema = mongoose.Schema(
  {
    threadId: {
      type: String,
      required: true,
      trim: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['text', 'image', 'video'],
      required: true,
    },
    status: {
      type: String,
      enum: ['sent', 'delivered', 'read'],
      default: 'sent',
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
MessageSchema.plugin(toJSON);
MessageSchema.plugin(paginate);

/**
 * @typedef Message
 */
const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
