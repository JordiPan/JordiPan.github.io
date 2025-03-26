import { OnlineGameHandler } from "./websockets/OnlineGameHandler.js";
// past niet echt in mvc model
let startWindow = document.getElementById("start-window");

window.addEventListener("load", function(){
    changeToOffline();
}, false);

startWindow.addEventListener("click", (event) => {
  if (event.target && event.target.id === "back-button") {
    changeToOffline();
  }
  if (event.target && event.target.id === "online-button") {
    changeToOnline();
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
  <label for="username" class="form-label">Gebruikersnaam:</label>
  <input
    type="text"
    class="form-control"
    id="username"
    placeholder="Silence"
    maxlength="15"
    required
  />
</div>

<!-- betere design later? -->
<div id="online-buttons">
  <button class="btn btn-success" id="find-button">Zoek spellen!</button>
  <button class="btn btn-info" id="create-button">Maak een kamer!</button>
  <button class="btn btn-danger" id="back-button">
    <img
      src="./img/offline-icon.svg"
      alt="back to offline"
      class="icon menu-icon"
    />
  </button>
</div>

<div id="rooms-list">
  <div class="room">
    <div class="row room-row">
      <div class="col info-col">
        <p class="room-id">Room: #12A4R#!</p>
        <p class="creator-name">Creator: Jeff</p>
        <p class="player-count">1/2</p>
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
    </div>
  </div>
  <div class="room">
    <div class="row room-row">
      <div class="col info-col">
        <p class="room-id">Room: #12A4R#!</p>
        <p class="creator-name">Creator: Jeff2</p>
        <p class="player-count">1/2</p>
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
    </div>
  </div>
  <div class="room">
    <div class="row room-row">
      <div class="col info-col">
        <p class="room-id">Room: #12A4R#!</p>
        <p class="creator-name">Creator: Jeff3</p>
        <p class="player-count">1/2</p>
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
    </div>
  </div>
</div>`
}
async function onlineTest() {
    let serverUrl = "http://localhost:3000";
    let client = new OnlineGameHandler(serverUrl);
    await client.initialize();
    // client.send("Hello from the client!");
    client.showSocketId();
    client.setUsername("Player");
    client.createRoom();
    client.getRooms();
}

onlineTest();
