class WebSocketClient {
    private connection: WebSocket;

    constructor(connection: WebSocket) {
        this.connection = connection
    }

    sendMessage(type: string, data?: unknown) {
        const message = JSON.stringify({ type, data });

        this.connection.send(message);
    }

    get isReady() {
        return this.connection.readyState === WebSocket.OPEN;
    }
}
