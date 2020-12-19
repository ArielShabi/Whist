import { MessageHandlerCallback, MessageHandlersDictionary } from './types';
import { Message } from '../messages/types';

const messageHandlers: MessageHandlersDictionary = {};

const subscribe = (messageType: string, callback: MessageHandlerCallback) => {
    if (messageHandlers[messageType]) {
        messageHandlers[messageType].push(callback);
        return;
    }

    messageHandlers[messageType] = [callback];
};

const unsubscribe = (messageType: string, callback: MessageHandlerCallback) => {
    const itemToRemove = messageHandlers[messageType]?.indexOf(callback);

    if (itemToRemove !== -1) {
        messageHandlers[messageType].splice(itemToRemove, 1);
    }
};

const handleMessage = (message: Message) => {
    messageHandlers[message.type]?.forEach((callback) => {
        callback(message);
    });
};

export default {
    subscribe,
    unsubscribe,
    handleMessage
};
