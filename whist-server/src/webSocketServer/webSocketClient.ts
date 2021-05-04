import { UserEventCallback, IWebSocketClient, Message } from './types';
import { tryParseJson } from '../utils';

class WebSocketClient implements IWebSocketClient {
    #connection: WebSocket;
    #events: { [key: string]: UserEventCallback[] }

    constructor(connection: WebSocket) {
        this.#connection = connection;
        this.#connection.onmessage = this.#onMessage;
    }

    sendMessage(type: string, data?: unknown): void {
        const messageString = JSON.stringify({ type, data });

        this.#connection.send(messageString);
    }

    get isReady() {
        return this.#connection.readyState === WebSocket.OPEN;
    }

    on(event: string, callback: UserEventCallback): void {
        if (!this.#events[event]) {
            this.#events[event] = [callback];
            return;
        }

        this.#events[event].push(callback);
    }

    off(eventType: string, callback: UserEventCallback): void {
        if (!callback) {
            this.#events[eventType] = [];
        }

        if (this.#events[eventType]) {
            this.#events[eventType] = this.#events[eventType].filter(c => c !== callback);
        }
    }

    #onMessage = (messageEvent: MessageEvent<string>): void => {
        const { type, data } = messageEvent;

        if (!this.#events[type] || this.#events[type].length === 0) {
            return;
        }

        const message = tryParseJson(data) as Message;
        
        if (!message?.type) {
            //log
            return;
        }

        this.#events[type].forEach(callback => {
            callback(message);
        });
    };
}

export default WebSocketClient;
