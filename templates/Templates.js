export class Templates {
  getOfflineWindow() {
    return `<h2>Offline modus</h2>
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
`;
  }
  getOnlineWindow() {
    return `<h2>Online multiplaya!!</h2>

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
</div>`;
  }
  getWaitingRoom(roomId, username) {
    return `
  <div class="waiting-container">
    <p>Kamer: ${roomId}</p>
    <p>gebruikersnaam: ${username}</p>
    <p>Wachten voor andere speler...</p>
    <img
    src="./img/loading-white.svg"
    alt="loading"
    class="icon loading-icon"
  />
    <button type="button" id="exit-waiting-button">terug</button>
  </div>`;
  }
  getErrorWindow() {
    return `<h2>Probleem met server...</h2>
<button class="btn btn-danger" id="back-button" type="button">
    <img
      src="./img/offline-icon.svg"
      alt="back to offline"
      class="icon menu-icon"
    />
  </button>`;
  }
  getNoPlayersError() {
    return `Niemand wilt dit spel spelen....`;
  }
  getRoom(roomId, creator, creatorId, count) {
    return `
    <div class="row room-row">
      <div class="col info-col">
        <p class="room-id">Room: ${roomId}</p>
        <p class="creator-name">Creator: ${creator} (${creatorId})</p>
        <p class="player-count">${count}/2</p>
      </div>
      <div class="col join-button-col">
        <button id="join-button" type="button">
          <img
            src="./img/enter-icon.svg"
            alt="enter icon"
            class="enter-icon icon"
          />
        </button>
      </div>
    </div>`;
  }
  getLoadingIcon() {
    return `<img
  src="./img/loading-white.svg"
  alt="loading"
  class="icon loading-icon"
  />`;
  }
}
