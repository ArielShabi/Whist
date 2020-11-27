const WebSocket = require('ws');
const createUserContainer = require('./userContainer');

const startWebSocketServer = (httpServer) => {
    const webSocketServer = new WebSocket.Server({ server: httpServer });
    const userContainer = createUserContainer();

    webSocketServer.on('connection', webSocketConnection => {
        const userId = userContainer.addUser(webSocketConnection);
        let currentUser = userContainer.getUser(userId);

        webSocketConnection.on('message', rawMessage => {
            const parsedMessage = utils.tryParseJson(rawMessage);

            if (!parsedMessage) {
                return;
            }

            messageHandlers.handleMessage(parsedMessage, userId, userContainer);
        });

        webSocketConnection.on('close', (code, reason) => {
            userContainer.removeUser(userId);
            const userRemovedMessage = messageCreator.createServerMessage(userRemovedMessageType, { id: userId })
            userContainer.getAllOpenUsers().forEach(user => user.connection.send(userRemovedMessage));
        });
    });

    return webSocketServer;
}

module.exports = {
    startWebSocketServer
};
