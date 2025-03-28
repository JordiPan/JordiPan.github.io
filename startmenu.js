import { OnlineGameHandler } from "./websockets/OnlineGameHandler.js";
// past niet echt in mvc model
const startWindow = document.getElementById("start-window");
const regex = /^[^ ].+[^ ]$/;
const backendUrl = "http://localhost:3000";
const client = new OnlineGameHandler();

//TODO: maak buttons unclickable terwijl het wacht voor backend dingen ofzo?
window.addEventListener("load", async function(){
    // changeToOffline();
    await connect();
}, false);

//switch case mayhaps?
startWindow.addEventListener("click", async (event) => {
  if(!event.target) {
    return;
  }
  if (event.target.id === "back-button") {
    client.disconnect();
    changeToOffline();
    return;
  }
  if (event.target.id === "online-button") {
    await connect();
    // changeToOnline();
    return;
  }
  if (event.target.id === "create-button") {
    const usernameField = document.getElementById("online-username");
    if(isValidName(usernameField)) {
      setOnlineUsername(usernameField.value);
      createRoom();
    }
    return;
  }
  //TODO: terug naar username knop later (basically disconnect)
  if (event.target.id === "find-button") {
    const usernameField = document.getElementById("online-username");
    if(isValidName(usernameField)) {
      setOnlineUsername(usernameField.value);
      const rooms = await getRooms();
      showRooms(rooms);
    } 
  }

  if (event.target.id === "exit-waiting-button") {
    await client.leaveRoom();
    changeToOnline();
    return;
  }
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
  startWindow.innerHTML = `<h2>Offline modus</h2>
<div class="row mb-3">
  <div class="col-md-6">
    <label for="gamemode" class="form-label">Selecteer modus</label>
    <select
      type="text"
      class="form-select"
      id="gamemode"
      name="gamemode"
      required
    >
      <option selected value="">Kies een optie!!</option>
      <option value="local">Lokaal</option>
      <option value="ai">AI</option>
    </select>
  </div>
  <div class="col-md-6">
    <label for="difficulty" class="form-label">Moeilijkheid (AI)</label>
    <select
      type="text"
      class="form-select"
      id="difficulty"
      name="gamemode"
      disabled
    >
      <option selected value="easy">Makkelijk</option>
      <option value="medium">Minder makkelijk</option>
    </select>
  </div>
</div>

<div class="mb-3 player1-field" id="player1-field">
  <label for="speler-naam-1" class="form-label">Speler 1:</label>
  <input
    type="text"
    class="form-control"
    id="player1-name"
    placeholder="John"
    maxlength="15"
    required
    disabled
  />
</div>

<div class="mb-3 player2-field" id="player2-field">
  <label for="speler-naam-2" class="form-label">Speler 2:</label>
  <input
    type="text"
    class="form-control"
    id="player2-name"
    placeholder="Titor"
    maxlength="15"
    required
    disabled
  />
</div>

<button class="btn btn-success" id="start-button">Start spel!</button>

<button id="online-button" type="button">
  <img
    src="./img/online-icon.svg"
    alt="online-icon"
    id="online-icon"
    class="menu-icon icon"
  />
</button>
`
}

function changeToOnline() {
  startWindow.innerHTML = `<h2>Online multiplaya!!</h2>

<div class="mb-3 player1-field" id="player1-field">
  <label for="online-username" class="form-label">Gebruikersnaam:</label>
  <input
    type="text"
    class="form-control"
    id="online-username"
    placeholder="Silence"
    maxlength="15"
    pattern="^[^ ].+[^ ]$"
  />
</div>

<!-- betere design later? -->
<div id="online-buttons">
  <button class="btn btn-success" id="find-button" type="button">Zoek spellen!</button>
  <button class="btn btn-info" id="create-button" type="button">Maak een kamer!</button>
  <button class="btn btn-danger" id="back-button" type="button">
    <img
      src="./img/offline-icon.svg"
      alt="back to offline"
      class="icon menu-icon"
    />
  </button>
</div>
<div class="list-container">
  <div id="rooms-list">
  </div>
</div>`
}
function changeToWaitingRoom() {
  startWindow.innerHTML = `
  <div class="waiting-container">
    <p>Kamer: ${client.getRoomId()}</p>
    <p>gebruikersnaam: ${client.getUsername()}</p>
    <p>Wachten voor andere speler...</p>
    <img
    src="./img/loading-white.svg"
    alt="loading"
    class="icon loading-icon"
  />
    <button type="button" id="exit-waiting-button">terug</button>
  </div>`
}

function changeToError() {
  startWindow.innerHTML = `<h2>Probleem met server...</h2>
<button class="btn btn-danger" id="back-button" type="button">
    <img
      src="./img/offline-icon.svg"
      alt="back to offline"
      class="icon menu-icon"
    />
  </button>`;
}
function showRooms(rooms) {
  const roomsList = document.getElementById("rooms-list");
  roomsList.innerHTML = ``;
  console.log("print rooms");
  if (Object.keys(rooms).length === 0) {
    roomsList.innerHTML = `Niemand wilt dit spel spelen....`
  return;
  }

  const fragment = document.createDocumentFragment();
  for(const roomId in rooms) {
    const roomFragment = document.createElement("div");
    roomFragment.classList.add("room");
    roomFragment.innerHTML = `
    <div class="row room-row">
      <div class="col info-col">
        <p class="room-id">Room: ${roomId}</p>
        <p class="creator-name">Creator: ${rooms[roomId]?.players[0]?.username} (${rooms[roomId]?.creatorId})</p>
        <p class="player-count">${rooms[roomId]?.players?.length}/2</p>
      </div>
      <div class="col join-button-col">
        <button class="join-button">
          <img
            src="./img/enter-icon.svg"
            alt="enter icon"
            class="enter-icon icon"
          />
        </button>
      </div>
    </div>`
    fragment.appendChild(roomFragment);
  }
  roomsList.appendChild(fragment);
}
// ik kan roomslist niet bij opstart zetten sinds het er misschien niet is op het scherm via offline en online wissel. get element id checkt alleen 1 keer 
async function getRooms() {
  const roomsList = document.getElementById("rooms-list");
  showLoading(roomsList);
  // roomsList.innerHTML = `<img
  //   src="./img/loading.svg"
  //   alt="loading"
  //   class="icon loading-icon"
  // />`;

  const rooms = await client.getRooms();
  return rooms;
}

async function connect() {
  // startWindow.innerHTML=`<img
  // src="./img/loading-white.svg"
  // alt="loading"
  // class="icon loading-icon"
  // />`;
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
  target.innerHTML=`<img
  src="./img/loading-white.svg"
  alt="loading"
  class="icon loading-icon"
  />`;
}

// function emptyWindow() {
//   startWindow.innerHTML=``;
// }