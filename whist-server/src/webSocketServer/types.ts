import { UserInfo } from '../types'

export type UserEventCallback = (message: Message) => void

export type Message = {
    sender: UserInfo,
    type: string;
    data?: unknown
}

export interface IWebSocketClient {
    sendMessage(type: string, data?: unknown): void;
    on(event: string, callback: UserEventCallback): void;
    off(eventType: string, callback: UserEventCallback): void;
    readonly isReady: boolean;
}
