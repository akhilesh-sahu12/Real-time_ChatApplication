const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const https = require('https');
const sequelize = require('./config/postgres');
const { Server } = require("socket.io");
const path = require("path");
const { initializeWebSocket } = require('./src/utils/websocket');
const authController=require('./src/controllers/authController')
const redisClient = require('./src/utils/redisUtils/redisConfig');
require('dotenv').config();


const port = process.env.PORT || 3000;


// Test the connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// Invoke the function to test the connection
testConnection();


const produceMessage = require('./src/utils/kafkaUtils/kafkaProducer');
const consumeMessages = require('./src/utils/kafkaUtils/kafkaConsumer');

// Test Kafka
produceMessage('chat-app', 'Hello Kafka!');
consumeMessages('chat-app');

async function nodeRedisDemo() {
  try {
    await redisClient.connect();
    await redisClient.set('Akhilesh', 'Hello from node redis');
    const myKeyValue = await redisClient.get('Akhilesh');
    console.log(myKeyValue);
    await redisClient.quit();
  } catch (error) {
    console.error(error);
  }
}
// Redis test
nodeRedisDemo();


// Export the Sequelize instance
module.exports = sequelize;

// Import routes
const authRoutes = require('./src/routes/authRoutes');
const massageRoutes = require('./src/routes/massageRoutes');

// Middleware
app.use(bodyParser.json());

// Read SSL certificate files 
const credentials = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert'),
};

const httpsServer = https.createServer(credentials, app);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', massageRoutes);

// Store user data 
const usersList=[];
async function getUsers() {
  try {
    usersList = await authController.getAllUsers();
    console.log(usersList);
  } catch (error) {
    console.error(error.message);
  }
}

getUsers();

const io = new Server(httpsServer);

// Socket.io
io.on('connection', (socket) => {
  console.log('New user connected', socket.id);
  // Emit event to send list of users to the client

  socket.emit('user-list', usersList.map(user => user.username));

  socket.on('disconnect', () => {
      console.log('User disconnected');
  });

  // Public chat message event
  socket.on('public-message', (message) => {
      console.log('Public message:', message);
      io.emit('public-message', message);
  });

  // Private chat message event
  socket.on('private-message', ({ message, recipient }) => {
      console.log('Private message:', message, 'Recipient:', recipient);
      const recipientSocket = usersList.find(user => user.username === recipient);
      console.log(recipientSocket);
      if (recipientSocket) {
          io.to(recipientSocket.id).emit('private-message', message);
      } else {
          console.log('Recipient not found');
      }
  });
});

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
  return res.sendFile("./public/index.html");
});

// Initialize WebSocket
// const wss = initializeWebSocket(httpsServer);
// app.set('wss', wss);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
httpsServer.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
