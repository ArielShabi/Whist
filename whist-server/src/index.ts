import { createServer } from 'http';
import webSocketServer from './webSocketServer';
import config from './config';

const serverPort = config.port;

const httpServer = createServer();
webSocketServer.startWebSocketServer(httpServer);

httpServer.listen(serverPort, () => {
    console.log(`Listening on http://localhost:${serverPort}`);
});
