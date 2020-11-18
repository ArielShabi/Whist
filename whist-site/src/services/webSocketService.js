let socket;

const connectToServer = url => {
    socket = new WebSocket(url);
};

const subscribeTo = (eventName, callback) => {
    socket.addEventListener(eventName, callback);
};

const close = (reason, code) => {
    socket.close(code, reason);
};

const send = (data) => {
    socket.send(data);
}

export default {
    connectToServer,
    subscribeTo,
    send,
    close
};
