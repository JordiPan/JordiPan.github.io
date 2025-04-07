import Client from "../websockets/OnlineGameHandler.js";
import Templates from "../templates/Templates.js";
import { Controller } from "../controller/Controller.js";
import { OnlineController } from "../controller/OnlineController.js";
import View from "../view/View.js";
//waarschijnlijk was het omzetten naar klasse onnodig...
export class StartMenu {
  constructor() {
    this.startWindow = document.getElementById("start-window");
    this.regex = /^[^ ].+[^ ]$/;
    // TODO: doe in env aan het eind (niet super nodig, maar ja)
    this.backendUrl = "http://localhost:3000";
    // Templates = new Templates();
    this.activeController;
    this.init();
  }
  //event listener dingen kan opgesplitst worden in specifieke functies (doe later...)
  init(){
    window.addEventListener("load", () => {
        this.changeToOffline();
      },
      false);

    Client.on("refresh", () => {
      this.changeToWaitingRoom();
    });
    
    this.startWindow.addEventListener("click", async (event) => {
      if (!event.target) {
        return;
      }
    
      switch (event.target.id) {
        case "back-button": {
          Client.disconnect();
          this.changeToOffline();
          break;
        }
    
        case "online-button": {
          await this.connect();
          break;
        }
    
        case "create-button": {
          const usernameField = document.getElementById("online-username");
          if (this.isValidName(usernameField)) {
            this.setOnlineUsername(usernameField.value);
            this.createRoom();
          }
          break;
        }
    
        case "find-button": {
          const usernameField = document.getElementById("online-username");
          if (this.isValidName(usernameField)) {
            this.setOnlineUsername(usernameField.value);
            const rooms = await this.getRooms();
            this.showRooms(rooms);
          }
          break;
        }
    
        case "exit-waiting-button": {
          await Client.leaveRoom();
          this.changeToOnline();
          break;
        }
    
        case "join-button": {
          const targetRoom = event.target.dataset.roomId;
          const room = await Client.joinRoom(targetRoom);
          if (!room) {
            alert("failed to join");
            this.changeToOnline();
            break;
          }
          this.changeToWaitingRoom();
          break;
        }
        
        case "start-online-button": {
          console.log("wafehjwfg");
        }

        default: {
        }
      }
    });
    //offline start
    this.startWindow.addEventListener("submit", (event) => {
      event.preventDefault();
      if(this.activeController) {
        this.activeController.cleanup();
      }
      this.activeController = new Controller(View);
    });

    this.startWindow.addEventListener("change", (event) => {
      if (event.target && event.target.id === "gamemode") {
        const select = event.target;
        const difficulty = document.getElementById("difficulty");
        const player1Field = document.getElementById("player1-name");
        const player2Field = document.getElementById("player2-name");
    
        if (select.value === "local") {
          difficulty.disabled = true;
          player1Field.disabled = false;
          player2Field.disabled = false;
        } else if (select.value === "ai") {
          difficulty.disabled = false;
          player1Field.disabled = false;
          player2Field.disabled = true;
        } else {
          difficulty.disabled = true;
          player1Field.disabled = true;
          player2Field.disabled = true;
        }
      }
    });
  }
  
  isValidName(usernameField) {
    if (!this.regex.test(usernameField.value)) {
      alert("slechte gebruikersnaam");
      usernameField.value = "";
      return false;
    }
    usernameField.disabled = true;
    return true;
  }
  
  changeToOffline() {
    this.startWindow.innerHTML = Templates.getOfflineWindow();
  }
  
  changeToOnline() {
    this.startWindow.innerHTML = Templates.getOnlineWindow();
  }
  changeToWaitingRoom() {
    console.log(JSON.stringify(Client.getPlayers()));
    const roomId = Client.getRoomId();
    const count = Client.getPlayers().length;
    const players = Client.getPlayers();
    this.startWindow.innerHTML = Templates.getWaitingRoom(roomId, count, players);
  }
  
  changeToError() {
    this.startWindow.innerHTML = Templates.getErrorWindow();
  }
  showRooms(rooms) {
    const roomsList = document.getElementById("rooms-list");
    roomsList.innerHTML = ``;
    // console.log("print rooms");
    if (Object.keys(rooms).length === 0) {
      roomsList.innerHTML = Templates.getNoPlayersError();
      return;
    }
  
    const fragment = document.createDocumentFragment();
    for (const roomId in rooms) {
      const roomFragment = document.createElement("div");
      roomFragment.classList.add("room");
  
      const creator = rooms[roomId]?.players[0]?.username;
      const creatorId = rooms[roomId]?.creatorId;
      const playerCount = rooms[roomId]?.players?.length;
  
      roomFragment.innerHTML = Templates.getRoom(
        roomId,
        creator,
        creatorId,
        playerCount
      );
  
      fragment.appendChild(roomFragment);
    }
    roomsList.appendChild(fragment);
  }
  // ik kan roomslist niet bij opstart zetten sinds het er misschien niet is op het scherm via offline en online wissel. get element id checkt alleen 1 keer
  async getRooms() {
    const roomsList = document.getElementById("rooms-list");
    this.showLoading(roomsList);
  
    const rooms = await Client.getRooms();
    return rooms;
  }
  
  async connect() {
    this.showLoading(this.startWindow);
    const result = await Client.initialize(this.backendUrl);
  
    if (result) {
      this.changeToOnline();
      return;
    }
    this.changeToError();
    // Client.showSocketId();
  }
  setOnlineUsername(username) {
    Client.setUsername(username);
  }
  async createRoom() {
    await Client.createRoom();
    this.changeToWaitingRoom();
  }
  
  showLoading(target) {
    target.innerHTML = Templates.getLoadingIcon();
  }
}
new StartMenu();







