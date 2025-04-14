class OnlineGameHandler {
  constructor() {
    //speler info
    this.socket = null;
    this.socketId = null;
    this.username = null;
    this.roomId = null;
    this.room = null;
    this.playerColor = null;

    this.callbacks = {
        refresh: null,
        startGame: null,
        updateBoard: null
    }
  }
  initialize(serverUrl) {
    return new Promise((resolve) => {
      this.socket = io(serverUrl, {
        reconnectionAttempts: 2,
        reconnectionDelay: 2000,
        timeout: 5000,
      });

      this.socket.on("startGame", (turnColor) => {
        this.assignPlayerColor();
        if (this.callbacks.startGame) {
          this.callbacks.startGame(turnColor);
        }
      })
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
      this.socket.on("updateBoard", (room) => {
        this.room = room;
        if (this.callbacks.updateBoard) {
          this.callbacks.updateBoard();
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

  getSocketId() {
    return this.socketId;
  }

  getRooms() {
    return new Promise((resolve) => {
      this.socket.emit("getRooms", (rooms) => {
        setTimeout(() => {
          console.log("Timeout executed!");
          resolve(rooms);
        }, 3000);
      });
    });
  }

  async joinRoom(roomId) {
    if (this.roomId) {
      console.log("cannot exist in multiple rooms!!!");
      return;
    }

    return new Promise((resolve) => {
      this.socket.emit("joinRoom", roomId, this.username, (room) => {
        this.setRoomInfo(roomId, room);
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

  getNames() {
    let names = [];
    for (let player of this.room?.players) {
      names.push(player?.username);
    }
    return names;
  }
  getWins() {
    let wins = [];
    for (let player of this.room?.players) {
      wins.push(player?.wins);
    }
    return wins;
  }
  //VERGEET NIET OM DIT TE UPDATEN
  setRoomInfo(roomId, room) {
    this.roomId = roomId;
    this.room = room;
  }

  getRoom() {
    return this.room;
  }

  startGame() {
    this.socket.emit("startGame", this.roomId);
  }
  // ik doe het zo voor een misschien toekomstige spectator functie... for loop is wasteful
  assignPlayerColor() {
    if (this.room?.players[0].id === this.socketId) {
      this.playerColor = 'blue';
    }
    else if (this.room?.players[1].id === this.socketId) {
      this.playerColor = 'red';
    }
  }

  getPlayerColor() {
    return this.playerColor;
  }
  //UHH, als kolom vol is zal het programma nog steeds een emit sturen... fix later?
  placeChip(placementCol) {
    return new Promise((resolve) => {
      this.socket.emit("placeChip", this.roomId, placementCol, (result) => {
        resolve(result);
      })
    });
  }
  
  on(event, callback) {
    if (this.callbacks.hasOwnProperty(event)) {
        this.callbacks[event] = callback;
      }
  }
}
export default new OnlineGameHandler();