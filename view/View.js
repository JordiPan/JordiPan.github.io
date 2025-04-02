import { BaseView } from "./BaseView.js";
export class View extends BaseView {
  constructor() {
    super();
  }
  // prevent(event) {
  //   event.preventDefault();
  // }
  bindInitBoard(handler) {
    this.start.addEventListener("submit", (event) => {
      this.formName1 = document.getElementById("player1-name");
      this.formName2 = document.getElementById("player2-name");
      this.gamemode = document.getElementById("gamemode");
      this.difficulty = document.getElementById("difficulty");
      handler(event);
    });
  }
  bindStop(handler) {
    this.stop.addEventListener("click", handler);
  }
  bindPlaceChip(handler) {
    //reageert niet als er op bord randen wordt geklikt
    this.board.addEventListener("click", (event) => {
      if (event.target && event.target.classList.contains("item")) {
        //geeft kolom mee ipv volgorde nummer van div
        handler(event.target.id % 7);
      }
    });
    // this.board.addEventListener('click', handler);
  }
  bindRematch(handler) {
    this.rematch.addEventListener("click", handler);
  }
  
  // Maakt automatisch 42 <div> vakjes
  makeBoard(event) {
    event.preventDefault();
    this.board.textContent = "";
    for (let i = 0; i < 42; i++) {
      this.hole = document.createElement("div");
      this.hole.className = "item";
      this.hole.setAttribute("id", i);
      this.board.appendChild(this.hole);
    }
  }
  hideStartWindow() {
    this.start.classList.toggle("hidden");
    this.playingField.classList.toggle("hidden");
  }
  hidePlayingField() {
    this.winsScore1.textContent = 0;
    this.winsScore2.textContent = 0;

    this.playingField.classList.toggle("hidden");
    this.start.classList.toggle("hidden");
    this.statBlock1.classList.remove("player-one-turn");
    this.statBlock2.classList.remove("player-two-turn");
    this.stop.classList.toggle("inactive");
    this.board.classList.toggle("inactive");
  }
  getNames() {
    return [this.formName1.value, this.formName2.value];
  }
  getDifficulty() {
    return this.difficulty.value;
  }
  getGamemode() { 
    return this.gamemode.value;
  }
  setNames(players) {
    this.scoreName1.textContent = players[0];
    this.scoreName2.textContent = players[1];
  }
  updateTurn(turn) {
    this.turn.textContent = turn;
    this.statBlock1.classList.toggle("player-one-turn");
    this.statBlock2.classList.toggle("player-two-turn");
  }
  async decideFirst(players, turnColor) {
    let interval = 10;
    let count = 0;
    //ik voeg dit toe zodat het de goede schaduw meegeeft
    this.statBlock2.classList.toggle("player-two-turn");
    return new Promise((resolve) => {
      const switcher = () => {
        if (count < 15) {
          if (count % 2 === 0) {
            this.turn.textContent = players[0];
          } else {
            this.turn.textContent = players[1];
          }
          this.statBlock1.classList.toggle("player-one-turn");
          this.statBlock2.classList.toggle("player-two-turn");
          count++;
          interval += 20;
          setTimeout(switcher, interval);
        } else {
          //geef de ECHTE turn mee
          if (turnColor === "blue") {
            this.turn.textContent = players[0];
            this.statBlock1.classList.add("player-one-turn");
            this.statBlock2.classList.remove("player-two-turn");
          } else {
            this.turn.textContent = players[1];
            this.statBlock1.classList.remove("player-one-turn");
            this.statBlock2.classList.add("player-two-turn");
          }
          this.stop.classList.toggle("inactive");
          this.board.classList.toggle("inactive");
          resolve();
        }
      };
      setTimeout(switcher, interval);
    });
  }

  placeChip(id, color) {
    document.getElementById(id).style.backgroundColor = color;
  }
  endGame(winner) {
    if (winner === null) {
      this.winner.textContent = "Niemand heeft gewonnen...";
    }
    else {
      this.winner.textContent = winner + " heeft gewonnen!";
    }
    this.end.classList.toggle("hidden");
    this.toggleInteractivity();
  }
  updateWins(stats) {
    document.getElementById(stats[1]).textContent = stats[0];
  }
  hideResultsWindow() {
    this.end.classList.toggle("hidden");
  }
  toggleTitle() {
    this.title.classList.toggle("hidden");
  }
  resetNames() {
    this.formName1.value = "";
    this.formName2.value = "";
  } 
  toggleInteractivity() {
    this.board.classList.toggle("inactive");
    this.stop.classList.toggle("inactive");
  }
  resetListeners() {
    this.start.removeEventListener();
  }
}
