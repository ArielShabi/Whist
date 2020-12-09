import { Server } from 'http';
import { Server as WebSocketServer } from 'ws';
import createUserContainer from './userContainer';
import { tryParseJson } from '../utils';

const startWebSocketServer = (httpServer: Server) => {
    const webSocketServer = new WebSocketServer({ server: httpServer });
    const userContainer = createUserContainer();

    webSocketServer.on('connection', webSocketConnection => {
        //@ts-ignore
        const userId = userContainer.addUser(webSocketConnection);
        const currentUser = userContainer.getUser(userId);

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
