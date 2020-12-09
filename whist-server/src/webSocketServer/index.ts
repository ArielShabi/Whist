import { Server } from 'ws';
import createUserContainer from './userContainer';
import { tryParseJson } from '../utils';

const startWebSocketServer = (httpServer) => {
    const webSocketServer = new Server({ server: httpServer });
    const userContainer = createUserContainer();

    webSocketServer.on('connection', webSocketConnection => {
        const userId = userContainer.addUser(webSocketConnection);
        let currentUser = userContainer.getUser(userId);        

        webSocketConnection.on('message', rawMessage => {
            const parsedMessage = tryParseJson(rawMessage);

            if (!parsedMessage) {
                return;
            }

            //messageHandlers.handleMessage(parsedMessage, userId, userContainer);
        });

        webSocketConnection.on('close', (code, reason) => {
            userContainer.removeUser(userId);
            // const userRemovedMessage = messageCreator.createServerMessage(userRemovedMessageType, { id: userId })
            // userContainer.getAllOpenUsers().forEach(user => user.connection.send(userRemovedMessage));
        });
    });

    return webSocketServer;
}

export default {
    startWebSocketServer
};
