import { createAction } from 'redux-actions';
import { webSocketService } from '../../services';
import config from '../../config';

const webSocketUrl = config.websocketUrl;

const connectedWebSocket = createAction('WS_CONNECTED');
const closedWebSocket = createAction('WS_CLOSED');

const connectWebSocket = () => dispatch => {
    webSocketService.connectToServer(webSocketUrl);
    dispatch(connectedWebSocket());
};

const sendWebSocket = data => () => {
    const jsonData = JSON.stringify(data);
    webSocketService.send(jsonData);
};

const subscribeToWebSocket = (eventName, callback) => () => {
    webSocketService.subscribeTo(eventName, callback);
};

const closeWebSocket = (reason, code = 1000) => dispatch => {
    webSocketService.close(reason, code);
};

const messageReceived = rawData => dispatch => {
    const message = dataParser.tryParseServerMessageEvent(rawData);

    if (message.from.id === 'server') {
        dispatch(serverCommendsActions.serverCommendArrived(message));
        return;
    }

    dispatch(messageActions.userMessageArrived(message));
}
