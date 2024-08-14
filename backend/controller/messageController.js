const Chat = require('../models/chats');
const Message = require('../models/messeges'); // Assuming you have a Message model

const addMessage = async (req, res) => {
  const tokenUserId = req.userId;
  const chatId = req.params.chatId;
  const text = req.body.text;

  try {
    // Check if the chat exists and tokenUserId is part of it
    const chat = await Chat.findOne({
      _id: chatId,
      userIDs: { $in: [tokenUserId] },
    });

    if (!chat) {
      return res.status(404).json({ message: "Chat not found!" });
    }

    // Create a new message
    const newMessage = new Message({
      text,
      userId: tokenUserId,
      chatId,
    });

    // Save the message to MongoDB
    const message = await newMessage.save();

    // Update the chat document
    chat.messages.push(message); // Push the message into the messages array
    chat.lastMessage = text;
    chat.seenBy = [tokenUserId]; // Update seenBy field

    await chat.save(); // Save the updated chat document

    res.status(200).json(message);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add message!" });
  }
};

module.exports = { addMessage };
