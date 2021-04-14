import { tryParseJson } from '../utils';
import { UserEventCallback } from './types';

class WebSocketClient {
    #connection: WebSocket;
    #events: { [key: string]: UserEventCallback[] }

    constructor(connection: WebSocket) {
        this.#connection = connection;
        this.#connection.onmessage = this.#onMessage;
    }

    sendMessage(type: string, data?: unknown) {
        const message = JSON.stringify({ type, data });

        this.#connection.send(message);
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
            this.#events[eventType] = this.#events[eventType].filter(c => c !== callback)
        }
    }

    #onMessage = (messageEvent: MessageEvent<string>): void => {
        const { type, data } = messageEvent;

        if (!this.#events[type] || this.#events[type].length === 0) {
            return;
        }

        const message = tryParseJson(data);

        this.#events[type].forEach(callback => {
            callback(message);
        });
    }
}
