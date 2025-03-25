export class OnlineGameHandler {
    constructor(serverUrl) {
        this.socket = io(serverUrl, {
                reconnectionAttempts: 2,
                reconnectionDelay: 2000,
                timeout: 5000,
            });

        this.socketId = null;
        this.username = null;
        this.roomId = null;
        this.room = null;
    }
    initialize() {
        return new Promise((resolve, reject) => {
            this.socket.on("connect", () => {
                console.log("Connected to WebSocket server!");
            });

            // this.socket.on("showRooms", (rooms) => {
            //     console.log(rooms);
            // });
            this.socket.on('socketId', (id) => {
                this.socketId = id;
                resolve();
            });

            this.socket.on("connect_error", (err) => {
                console.warn("⚠️ Uhh, ignore error up above :)", err.message);
            });
    
            // this.socket.on("connect_failed", () => {
            //     console.error("🚫 Max reconnection attempts reached.");
            //     reject(new Error("Max retries reached."));
            // });
        }) 
    }
    setUsername(username) {
        this.username = username;
    }

    createRoom() {
        this.socket.emit('createRoom', this.username, (roomId, room) => {
            this.roomId = roomId;
            this.room = room;
            // room.players.forEach(player => {
                // console.log("Player: "+player?.username);
            // });
            console.log("Created room with id: " + JSON.stringify(room));
        });
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
    getRooms() {
        this.socket.emit('getRooms', (rooms) => {
            console.log("GETROOMS: "+JSON.stringify(rooms));
        });
    }
    joinRoom(roomId) {
        if (this.room) {
            console.log('cannot exist in multiple rooms!!!');
            return;
        }
        this.socket.emit('joinRoom', roomId, this.username, (room) => {
            if (room) {
                this.room = room;
                room?.players.forEach(player => {
                    console.log("Player: "+player);
                });
                console.log("Joined room with id: " + this.room);
            }
            else {
                console.log("Failed to join room with id: " + room);
            }
        });
    }
}  