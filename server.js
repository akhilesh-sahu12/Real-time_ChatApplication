const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const https = require('https');
const sequelize = require('./config/postgres');
const { Server } = require("socket.io");
const path = require("path");
const { initializeWebSocket } = require('./src/utils/websocket');
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

// Export the Sequelize instance
module.exports = sequelize;

// Import routes
const authRoutes = require('./src/routes/authRoutes');
const chatRoutes = require('./src/routes/chatRoutes');

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
app.use('/api/chat', chatRoutes);

const io = new Server(httpsServer);

// Socket.io
io.on("connection", (socket) => {
  socket.on("user-message", (message) => {
    io.emit("message", message);
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
