const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for Message
const messageSchema = new Schema({
  text: { type: String, required: true },
  userId: { type: String, required: true },
  chatId: { type: Schema.Types.ObjectId, ref: 'chats', required: true },
  createdAt: { type: Date, default: Date.now }
});

// Create the Message model
const Message = mongoose.model('messages', messageSchema);

module.exports = Message;
