import { OnlineGameHandler } from "../websockets/OnlineGameHandler.js";
import { Templates } from "../templates/templates.js";
import { Controller } from "../controller/Controller.js";
// past niet echt in mvc model
const startWindow = document.getElementById("start-window");
const regex = /^[^ ].+[^ ]$/;
const backendUrl = "http://localhost:3000";
const client = new OnlineGameHandler();
const templates = new Templates();
let activeController;

window.addEventListener("load", async function(){
    changeToOffline();
}, false);

startWindow.addEventListener("click", async (event) => {
  if(!event.target) {
    return;
  }

  switch(event.target.id) {
    case "back-button": {
      client.disconnect();
      changeToOffline();
      break;
    }

    case "online-button": {
      await connect();
      break;
    }
    
    case "create-button": {
      const usernameField = document.getElementById("online-username");
      if(isValidName(usernameField)) {
        setOnlineUsername(usernameField.value);
        createRoom();
      }
      break;
    }

    case "find-button": {
      const usernameField = document.getElementById("online-username");
      if(isValidName(usernameField)) {
        setOnlineUsername(usernameField.value);
        const rooms = await getRooms();
        showRooms(rooms);
      }
      break;
    }

    case "exit-waiting-button": {
      await client.leaveRoom();
      changeToOnline();
      break;
    }

    case "join-button": {
      console.log("wwwwww");
    }

    case "start-button": {

    }
    default: {}
  }
})

startWindow.addEventListener("submit", (event) => {
  event.preventDefault();
  activeController = new Controller();
})
startWindow.addEventListener("change", (event) => {
  if(event.target && event.target.id === "gamemode") {
    const select = event.target;
    const difficulty = document.getElementById("difficulty");
    const player1Field = document.getElementById("player1-name");
    const player2Field = document.getElementById("player2-name");

    if (select.value === "local") {
      difficulty.disabled = true;
      player1Field.disabled = false;
      player2Field.disabled = false;
    } 
    else if (select.value === "ai") {
      difficulty.disabled = false;
      player1Field.disabled = false;
      player2Field.disabled = true;
    } 
    else {
      difficulty.disabled = true;
      player1Field.disabled = true;
      player2Field.disabled = true;
    }
  }
})

function isValidName(usernameField) {
  if(!regex.test(usernameField.value)) {
    alert("slechte gebruikersnaam");
    usernameField.value = '';
    return false;
  }
  usernameField.disabled = true;
  return true;
}

function changeToOffline() {
  startWindow.innerHTML = templates.getOfflineWindow();
}

function changeToOnline() {
  startWindow.innerHTML = templates.getOnlineWindow();
}
function changeToWaitingRoom() {
  const roomId = client.getRoomId();
  const username = client.getUsername();

  startWindow.innerHTML = templates.getWaitingRoom(roomId, username);
}

function changeToError() {
  startWindow.innerHTML = templates.getErrorWindow();
}
function showRooms(rooms) {
  const roomsList = document.getElementById("rooms-list");
  roomsList.innerHTML = ``;
  // console.log("print rooms");
  if (Object.keys(rooms).length === 0) {
    roomsList.innerHTML = templates.getNoPlayersError();
  return;
  }

  const fragment = document.createDocumentFragment();
  for(const roomId in rooms) {
    const roomFragment = document.createElement("div");
    roomFragment.classList.add("room");

    const creator = rooms[roomId]?.players[0]?.username;
    const creatorId = rooms[roomId]?.creatorId;
    const playerCount = rooms[roomId]?.players?.length;

    roomFragment.innerHTML = templates.getRoom(roomId, creator, creatorId, playerCount);

    fragment.appendChild(roomFragment);
  }
  roomsList.appendChild(fragment);
}
// ik kan roomslist niet bij opstart zetten sinds het er misschien niet is op het scherm via offline en online wissel. get element id checkt alleen 1 keer 
async function getRooms() {
  const roomsList = document.getElementById("rooms-list");
  showLoading(roomsList);

  const rooms = await client.getRooms();
  return rooms;
}

async function connect() {
  showLoading(startWindow);
  const result = await client.initialize(backendUrl);

  if(result) {
    changeToOnline();
    return;
  }
  changeToError();
  // client.showSocketId();
}
function setOnlineUsername(username) {
  client.setUsername(username);
}
async function createRoom() {
  await client.createRoom();
  changeToWaitingRoom();
}

function showLoading(target) {
  target.innerHTML = templates.getLoadingIcon();
}

// function emptyWindow() {
//   startWindow.innerHTML=``;
// }