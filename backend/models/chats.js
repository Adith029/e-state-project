const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  }],
  userIDs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  seenBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  }],
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'messages',
  }],
  lastMessage: String,
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
