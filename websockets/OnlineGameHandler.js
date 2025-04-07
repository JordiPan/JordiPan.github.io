class OnlineGameHandler {
  constructor() {
    this.socket = null;
    this.socketId = null;
    this.username = null;
    this.roomId = null;
    this.room = null;

    this.callbacks = {
        refresh: null
    }
  }
  initialize(serverUrl) {
    return new Promise((resolve, reject) => {
      this.socket = io(serverUrl, {
        reconnectionAttempts: 2,
        reconnectionDelay: 2000,
        timeout: 5000,
      });

      //succesvol reconnect poging moet waarschijnlijk de view updaten
      this.socket.on("connect", () => {
        console.log("Connected to WebSocket server!");
      });

      this.socket.on("refresh", (room, roomId) => {
        this.setRoomInfo(roomId, room);
        if (this.callbacks.refresh) {
            this.callbacks.refresh();
        }
      });
      
      this.socket.on("socketId", (id) => {
        this.socketId = id;
        resolve(true);
      });

      this.socket.on("connect_error", (err) => {
        console.warn("⚠️ Uhh, ignore error up above :)", err.message);
      });

      // Reconnection error
      this.socket.io.on("reconnect_error", (error) => {
        resolve(false);
      });
    });
  }
  setUsername(username) {
    this.username = username;
  }

  createRoom() {
    return new Promise((resolve) => {
      this.socket.emit("createRoom", this.username, (roomId, room) => {
        this.setRoomInfo(roomId, room);
        // room.players.forEach(player => {
        // console.log("Player: "+player?.username);
        // });
        console.log("Created room with id: " + JSON.stringify(room));
        resolve();
      });
    });
  }

  disconnect() {
    console.log("DISContectINg!!!");
    this.socket?.disconnect();
    this.socket = null;
    this.socketId = null;
    this.username = null;
    this.roomId = null;
    this.room = null;
  }
  // send(msg) {
  //     this.socket.emit('test', msg);
  // }
  getSocketId() {
    return this.socketId;
  }
  showSocketId() {
    console.log(this.socketId);
  }
  getRooms() {
    return new Promise((resolve) => {
      this.socket.emit("getRooms", (rooms) => {
        console.log("GETROOMS: " + JSON.stringify(rooms));
        setTimeout(() => {
          console.log("Timeout executed!");
          resolve(rooms);
        }, 3000);
      });
    });
  }
  async joinRoom(roomId) {
    if (this.room) {
      console.log("cannot exist in multiple rooms!!!");
      return;
    }
    return new Promise((resolve) => {
      this.socket.emit("joinRoom", roomId, this.username, (room) => {
        
        this.setRoomInfo(roomId, room);
        // if (room) {
        //   this.room = room;
        //   room?.players.forEach((player) => {
        //     console.log("Player: " + player);
        //   });
        //   console.log("Joined room with id: " + this.room);
        // } else {
        //   console.log("Failed to join room with id: " + room);
        // }
        resolve(room);
      });
    });
  }
  leaveRoom() {
    return new Promise((resolve) => {
      this.socket.emit("leaveRoom", this.roomId, () => {
        this.setRoomInfo(null,null);
        console.log("left room...");
        resolve();
      });
    });
  }
  getRoomId() {
    return this.roomId;
  }
  getUsername() {
    console.log(this.username);
    return this.username;
  }
  getPlayers() {
    return this.room?.players;
  }
  on(event, callback) {
    if (this.callbacks.hasOwnProperty(event)) {
        this.callbacks[event] = callback;
      }
  }
  setRoomInfo(roomId, room) {
    this.roomId = roomId;
    this.room = room;
  }
}
export default new OnlineGameHandler();