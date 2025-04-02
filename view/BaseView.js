export class BaseView {
  //ik kan functies hier forceren voor extenders. misschien ooit.
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
    this.formName1;
    this.formName2;
    this.gamemode;
    this.difficulty;
  }
}
