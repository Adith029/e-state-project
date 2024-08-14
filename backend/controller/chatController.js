const Chat = require('../models/chats');
const User = require('../models/users'); // Assuming you have a User model


const getChats = async (req, res) => {
    const tokenUserId = req.userId;
  
    try {
      // Find all chats where tokenUserId is in the userIDs array
      const chats = await Chat.find({
        userIDs: { $in: [tokenUserId] }
      });
  
      // Map over the chats to populate the receiver field
      const populatedChats = await Promise.all(chats.map(async (chat) => {
        const receiverId = chat.userIDs.find(id => id != tokenUserId);
  
        // Find the receiver user details
        const receiver = await User.findById(receiverId, {
          id: true,
          name: true,
          photo: true,
        });
  
        // Attach receiver details to chat object
        return {
          ...chat.toObject(), // Convert Mongoose document to plain JavaScript object
          receiver,
        };
      }));
  
      res.status(200).json(populatedChats);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to get chats!" });
    }
  };

// Get a single chat by ID
 const getChat = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    // Find the chat based on ID and where tokenUserId is in userIDs
    const chat = await Chat.findOne({
      _id: req.params.id,
      userIDs: { $in: [tokenUserId] },
    }).populate({
        path: 'messages',
        options: { sort: { createdAt: 'asc' } }
    });

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    // Update seenBy array with tokenUserId
    await Chat.findByIdAndUpdate(req.params.id, {
      $addToSet: { seenBy: tokenUserId },
    });

    res.status(200).json(chat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get chat!" });
  }
};

// Add a new chat
const addChat = async (req, res) => {
  const tokenUserId = req.userId;
  const { receiverId } = req.body;

  try {
    // Check if a chat between the token user and receiver already exists
    const existingChat = await Chat.findOne({
      userIDs: { $all: [tokenUserId, receiverId] }
    });

    if (existingChat) {
      return res.status(200).json({ message: "Chat already exists", _id: existingChat._id });
    }

    // Create a new chat if none exists
    const newChat = await Chat.create({
      userIDs: [tokenUserId, receiverId],
    });

    res.status(200).json(newChat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add chat!" });
  }
};


// Mark a chat as read
 const readChat = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    // Update chat where ID matches and tokenUserId is in userIDs
    const chat = await Chat.findByIdAndUpdate(req.params.id, {
      $set: { seenBy: [tokenUserId] },
    }, { new: true });

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    res.status(200).json(chat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to read chat!" });
  }
};


module.exports = {getChat,addChat,getChats,readChat}