class View {
  constructor() {
    this.title = document.getElementById("title");
    this.footer = document.getElementById("footer");
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
    this.startWindow = document.getElementById("form-container");
    this.stop = document.getElementById("stop");
    this.cancel = document.getElementById("cancel");
    this.statBlock1 = document.getElementById("shadow-one");
    this.statBlock2 = document.getElementById("shadow-two");
    this.formName1;
    this.formName2;
    this.gamemode;
    this.difficulty;
  }
  //moet elements nu pas zetten, omdat het soms niet zeker is of de elementen er zijn
  setElements() {
      this.formName1 = document.getElementById("player1-name");
      this.formName2 = document.getElementById("player2-name");
      this.gamemode = document.getElementById("gamemode");
      this.difficulty = document.getElementById("difficulty");
  };

  // Maakt automatisch 42 <div> vakjes
  renderBoard() {
    this.board.textContent = "";
    for (let i = 0; i < 42; i++) {
      this.hole = document.createElement("div");
      this.hole.className = "item";
      this.hole.setAttribute("id", i);
      this.board.appendChild(this.hole);
    }
  }
  showPlayingField() {
    this.startWindow.classList.add("hidden");
    this.playingField.classList.remove("hidden");
    this.title.classList.add("hidden");
    this.footer.classList.add("hidden");
  }
  hidePlayingField() {
    //onnodig??
    this.winsScore1.textContent = 0;
    this.winsScore2.textContent = 0;

    this.playingField.classList.add("hidden");
    this.stop.classList.add("inactive");
    this.board.classList.add("inactive");
    this.end.classList.add("hidden");
    this.statBlock1.classList.remove("player-one-turn");
    this.statBlock2.classList.remove("player-two-turn");
    this.startWindow.classList.remove("hidden");
    this.title.classList.remove("hidden");
    this.footer.classList.remove("hidden");
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
  updateTurn(name, turnColor) {
    this.turn.textContent = name;
    if(turnColor === "blue") {
      this.changeTurnPlayer1();
    }
    else {
      this.changeTurnPlayer2();
    }
  }
  async decideFirst(players, actualTurnColor) {
    let interval = 10;
    let count = 0;
    this.turn.textContent = "Bezig...";
    this.statBlock2.classList.toggle("player-two-turn");
    return new Promise((resolve) => {
      const switcher = () => {
        if (count < 15) {
          this.statBlock1.classList.toggle("player-one-turn");
          this.statBlock2.classList.toggle("player-two-turn");
          count++;
          interval += 20;
          setTimeout(switcher, interval);
        } 
        else {
          let turnName = players[1];
          //geef de ECHTE turn mee
          if (actualTurnColor === "blue") {
            turnName = players[0]
          }
          this.updateTurn(turnName, actualTurnColor)

          this.toggleInteractivity();
          resolve();
        }
      };
      setTimeout(switcher, interval);
    });
  }
  //clone de model bord
  placeChip(board) {
    let holeId = 0; 
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 7; col++) {
        // let locationStatus = document.getElementById(holeId).style.backgroundColor;
        // if(locationStatus != board[row][col]) {
          
          // document.getElementById(holeId).style.backgroundColor = board[row][col];
          let className = "placed-"
          document.getElementById(holeId).classList.add(className + board[row][col]); 
        // }
        holeId++;
      }
    }
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
  setWins(wins) {
    this.winsScore1.textContent = wins[0];
    this.winsScore2.textContent = wins[1];
  }
  hideResultsWindow() {
    this.end.classList.toggle("hidden");
  }
  resetNames() {
    this.formName1.value = "";
    this.formName2.value = "";
  } 
  toggleInteractivity() {
    this.board.classList.toggle("inactive");
    this.stop.classList.toggle("inactive");
  }
  changeTurnPlayer1() {
    this.statBlock1.classList.add("player-one-turn");
    this.statBlock2.classList.remove("player-two-turn");
  }
  changeTurnPlayer2() {
    this.statBlock2.classList.add("player-two-turn");
    this.statBlock1.classList.remove("player-one-turn");        
  }
}
export default new View();