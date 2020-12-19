import { Message } from '../messages/types';

export type MessageHandlersDictionary = {
    [key: string]: [MessageHandlerCallback]
};

export type MessageHandlerCallback = (message: Message) => void;
