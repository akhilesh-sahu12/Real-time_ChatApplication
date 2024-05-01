const WebSocket = require('ws');

function initializeWebSocket(server) {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    console.log('WebSocket client connected');

    ws.on('message', (message) => {
      console.log('Received message:', message);
      broadcastMessage(wss, message);
    });
  });

  return wss;
}

function broadcastMessage(wss, message) {
    console.log('Received message:', message);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

module.exports = { initializeWebSocket,  broadcastMessage};
