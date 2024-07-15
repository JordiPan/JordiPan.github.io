export class ViewBord {
  constructor() {
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
    this.board.classList.toggle("inactive");
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
  }
  placeChip(id, color) {
    console.log(id)
    document.getElementById(id).style.backgroundColor = color;
  }
  endGame(winner) {
    this.winner.textContent = winner + " heeft gewonnen!"
    this.end.classList.toggle("hidden");
    this.board.classList.toggle("inactive");
  }
  updateWins(stats) {
    document.getElementById(stats[1]).textContent = stats[0]
  }
  hideResultsWindow() {
    this.end.classList.toggle("hidden");
  }
}
