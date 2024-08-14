const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes.js');
const messageRoutes = require('./routes/message.route.js');
const chatRoutes = require('./routes/chat.route.js');
const sellerRoutes = require('./routes/seller.route.js');
const authRoutes = require('./routes/auth.route.js');
const adminRoutes = require('./routes/adminRoutes.js');
const contactUs = require('./routes/aboutUs.route.js');
const postRoute = require('./routes/post.route.js');
const doneDeals = require('./routes/doneDeals.route.js');
require('./config/dataBaseConfig.js');

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
}));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

// Routes
app.use('/chat', chatRoutes);
app.use('/doneDeals', doneDeals);
app.use('/message', messageRoutes);
app.use('/user', userRoutes);
app.use('/seller', sellerRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);
app.use('/contact', contactUs);
app.use('/properties', postRoute);



// Start server
server.listen(8081, () => {
    console.log("Server is running on port 8081");
});
