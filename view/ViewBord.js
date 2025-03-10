export class ViewBord {
  constructor() {
    this.title = document.getElementById("title");
    this.turn = document.getElementById("turn");
    this.winsScore1 = document.getElementById("win1");
    this.winsScore2 = document.getElementById("win2");
    this.end = document.querySelector("#result-window");
    this.board = document.getElementById("board");
    this.playingField = document.querySelector(".margin-container");
    this.scoreName1 = document.getElementById("player-name-one");
    this.scoreName2 = document.getElementById("player-name-two");
    this.spaces = document.getElementsByClassName("item");
    this.winner = document.getElementById("winner");
    this.rematch = document.getElementById("rematch");
    this.start = document.getElementById("start-window");
    this.stop = document.getElementById("stop");
    this.statBlock1 = document.getElementById("shadow-one");
    this.statBlock2 = document.getElementById("shadow-two");
  }
  bindMakeBoard(handler) {
    this.start.addEventListener("submit", handler);
  }
  bindStop(handler) {
    this.stop.addEventListener("click", handler);
  }
  bindPlaceChip(handler) {
    //reageert niet als er op bord randen wordt geklikt 
    this.board.addEventListener("click", (event) => {
      if (event.target && event.target.classList.contains("item")) {
        handler(event);
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
  resetBoard() {
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
    return [
      document.getElementById("speler-naam-1").value,
      document.getElementById("speler-naam-2").value,
    ];
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
  async funny(players, turn) {
    let interval = 10;
    let count = 0;
    //voeg dit toe zodat het de goede schaduw meegeeft
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
          } 
          else {
            //geef de ECHTE turn mee
            if(players[0] === turn) {
              this.turn.textContent = players[0];
              this.statBlock1.classList.add("player-one-turn");
              this.statBlock2.classList.remove("player-two-turn");
            }
            else {
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
    this.winner.textContent = winner + " heeft gewonnen!"
    this.end.classList.toggle("hidden");
    this.board.classList.toggle("inactive");
    this.stop.classList.toggle("inactive");
  }
  updateWins(stats) {
    document.getElementById(stats[1]).textContent = stats[0]
  }
  hideResultsWindow() {
    this.end.classList.toggle("hidden");
  }
  toggleTitle() {
    this.title.classList.toggle("hidden");
  }
}
