//changeto later vervangen met render
class Templates {
  getOfflineWindow() {
    return `<div class="content">
    <h2>Offline modus</h2>
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
</div>
<div class="button-collection">
<button id="start-button" class="icon-button green-hover" title="Speel">
  <img
    src="./img/black/enter-icon.svg"
    alt="enter-icon"
    id="enter-icon"
    class="menu-icon icon"
  />
</button>

<button id="online-button" type="button" class="icon-button blue-hover" title="Ga online">
  <img
    src="./img/black/wifi-icon.svg"
    alt="play online button"
    id="online-icon"
    class="menu-icon icon"
  />
</button>
</div>
`;
  }
  getOnlineWindow() {
    return `<div class="content"><h2>Online modus</h2>

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
  <div id="rooms-list">
  </div>
</div>

<div class="button-collection">
<button class="icon-button red-hover" id="back-button" type="button" title="Terug naar offline">
    <img
      src="./img/black/offline-icon.svg"
      alt="back to offline button"
      class="icon menu-icon"
    />
  </button>
  <button class="icon-button green-hover" id="create-button" type="button" title="Maak een kamer">
    <img
      src="./img/black/create-icon.svg"
      alt="create a room button"
      class="icon menu-icon"
    />
  </button>
  <button class="icon-button blue-hover" id="find-button" type="button" title="Zoek spelers">
    <img
      src="./img/black/search-icon2.svg"
      alt="check for rooms button"
      class="icon menu-icon"
    />
  </button>
</div>
`;
  }
  getWaitingRoom(roomId, count, players) {
    let list = ``;
    let button = this.getOnlineStartButton();
    let loading = this.getLoadingIcon();

    if(count < 2) {button = '';}
    else {loading = '';}

    for (let player of players) {
      let playerDiv = `<div class="player-info" data-player-id="${player.id}"><b>${player.username} (W: ${player.wins})</b></div>`
      list += playerDiv;
    }
    return `
    <div class="content">
    <p>Kamer: ${roomId} ${count}/2</p>
    <div class="player-list">
      ${list}
    </div>
      ${loading}
    </div>
    <div class="button-collection">
    <button type="button" id="exit-waiting-button" class="icon-button red-hover" title="Terug">
      <img
        src="./img/black/back-icon.svg"
        alt="back to online button"
        class="icon menu-icon"
      />
    </button>
    ${button}
  </div>`;
  }
  getErrorWindow() {
    return `<div class="content"><h2>Probleem met server...</h2></div>
    <div class="button-collection">
  <button class="icon-button red-hover" id="back-button" type="button" title="Naar offline modus">
    <img
      src="./img/white/offline-icon.svg"
      alt="back to offline"
      class="icon menu-icon"
    />
  </button>
  </div>`;
  }
  getNoPlayersError() {
    return `Niemand wilt dit spel spelen....`;
  }
  getRoom(roomId, creator, count) {
    return `
    <div class="room-row">
      <div class="info-col">
        <p class="room-id">${roomId}</p>
        <p class="creator-name"><b>${creator}</b></p>
        <p class="player-count">${count}/2</p>
      </div>
      <div class="join-button-col">
        <button id="join-button" type="button" data-room-id="${roomId}" class="icon-button green-hover" title="Kamer binnengaan">
          <img
            src="./img/black/enter-icon.svg"
            alt="enter icon"
            class="menu-icon icon"
          />
        </button>
      </div>
    </div>`;
  }

  getLoadingIcon() {
    return `<img
  src="./img/white/loading.svg"
  alt="loading"
  class="icon loading-icon"
  />`;
  }

  getOnlineStartButton() {
    return `
    <button type="button" id="start-online-button" class="icon-button green-hover" title="Start online spel">
      <img
        src="./img/black/enter-icon.svg"
        alt="enter icon"
        class="menu-icon icon"
      />
    </button>`;
  }
}

export default new Templates();