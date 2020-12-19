import { Server } from 'http';
import { Server as WebSocketServer } from 'ws';
import createUserContainer from './userContainer';
import { Message } from './messages/types';
import messageHandler from './messageHandler';
import { tryParseJson } from '../utils';

const startWebSocketServer = (httpServer: Server) => {
    const webSocketServer = new WebSocketServer({ server: httpServer });
    const userContainer = createUserContainer();

    webSocketServer.on('connection', webSocketConnection => {
        //@ts-ignore
        const userId = userContainer.addUser(webSocketConnection);
        const currentUser = userContainer.getUser(userId);

        webSocketConnection.on('message', rawMessage => {
            const parsedMessage = tryParseJson<Message>(rawMessage.toString());

            if (!parsedMessage) {
                return;
            }

            messageHandler.handleMessage(parsedMessage);
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
