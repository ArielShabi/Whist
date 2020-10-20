const WebSocket = require('ws');

const startWebSocketServer = (httpServer) => {
    const webSocketServer = new WebSocket.Server({ server: httpServer });
    return webSocketServer;
}

module.exports = {
    startWebSocketServer
};
