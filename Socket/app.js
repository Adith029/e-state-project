import { Server } from 'socket.io';

const io = new Server({
  cors: {
    origin: 'http://localhost:3000', // Adjust as per your client origin
  },
});

let onlineUsers = [];

const addUser = (userId, socketId) => {
  const userExists = onlineUsers.find((user) => user.userId === userId);
  if (!userExists) {
    onlineUsers.push({ userId, socketId });
    console.log(`User added: ${userId}, socket: ${socketId}`);
  }
};

const removeUser = (socketId) => {
  const userIndex = onlineUsers.findIndex((user) => user.socketId === socketId);
  if (userIndex !== -1) {
    const removedUser = onlineUsers.splice(userIndex, 1)[0];
    console.log(`User removed: ${removedUser.userId}, socket: ${socketId}`);
  }
};

const getUser = (userId) => {
  return onlineUsers.find((user) => user.userId === userId);
};

io.on('connection', (socket) => {
  console.log(`New connection: ${socket.id}`);

  socket.on('newUser', (userId) => {
    addUser(userId, socket.id);
  });

  socket.on('sendMessage', ({ receiverId, data }) => {
    const receiver = getUser(receiverId);
    if (receiver) {
      io.to(receiver.socketId).emit('getMessage', data);
      console.log(`Message sent to ${receiverId}`);
    } else {
      console.log(`Failed to send message. User not found: ${receiverId}`);
    }
  });

  socket.on('disconnect', () => {
    removeUser(socket.id);
  });
});

io.listen(4000); // Start listening on port 4000
