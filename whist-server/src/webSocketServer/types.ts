export type UserEventCallback = (message: unknown) => void

export interface IWebSocketClient {
    sendMessage(type: string, data: unknown): void;
    on(event: string, callback: UserEventCallback): void;
    off(eventType: string, callback: UserEventCallback): void;
    readonly isReady: boolean;
}
