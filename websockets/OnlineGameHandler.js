export class OnlineGameHandler {
    constructor(serverUrl) {
        this.socket = io(serverUrl);
        this.socketId = null;
        this.username = null;
        this.room = null;
    }
    initialize() {
        return new Promise((resolve) => {
            this.socket.on("connect", () => {
                console.log("Connected to WebSocket server!");
            });

            this.socket.on('socketId', (id) => {
                this.socketId = id;
                resolve();
            });
        })
    }
    setUsername(username) {
        this.username = username;
    }

    disconnect() {
        this.socket.disconnect();
    }
    send(msg) {
        this.socket.emit('test', msg);
    }
    showSocketId() {
        console.log(this.socketId);
    }   
}  