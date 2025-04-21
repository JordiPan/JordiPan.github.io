
import { AiModel } from "./AiModel.js";
export class Model {
  static directions = [
    { row: 0, col: 1 },  // Horizontaal
    { row: 1, col: 0 },  // Verticaal
    { row: 1, col: 1 },  // Diagonaal (rechts)
    { row: 1, col: -1 }  // Diagonaal (links)
  ];
  static rows = 6;
  static cols = 7;

  //misschien beter om de spelernaam en turn kleur te linken in object?
  constructor() {
    this.AiModel = new AiModel();
    this.gamemode;
    this.players = [];
    this.turnInfo = {
      player: {},
      count: 0
    }
    this.board = new Array(Model.rows);
  }

  makeModelBoard() {
    for (let i = 0; i < this.board.length; i++) {
      this.board[i] = new Array(Model.cols);
    }
    // Het zet in alle vakken van de model ""
    for (let row = 0; row < Model.rows; row++)
      for (let col = 0; col < Model.cols; col++) this.board[row][col] = "";
  }
  setgameMode(mode) {
    this.gamemode = mode;
  }
  setDifficulty(diff) {
    this.AiModel.setDifficulty(diff);
  }
  getGameMode() {
    return this.gamemode;
  }
  resetTurnCount() {
    this.turnInfo.count = 0;
  }
  resetPlayers() {
    this.players = [];
  }
  decideFirst() {
    //1 of 2 randomizer
    this.decider = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
    if (this.decider == 1) {
      this.turnInfo.player = this.players[0];
    } else {
      this.turnInfo.player = this.players[1];
    }
  }
  setNames(players) {
    for (let i = 0; i < players.length; i++) {
      if (players[i] === '') {
        this.players.push(this.makePlayer(this.AiModel.getDifficulty()+ "-" + this.AiModel.getName(), i));
      }
      this.players.push(this.makePlayer(players[i], i));
    }
  }
  getNames() {
    return [this.players[0].username, this.players[1].username];
  }
  // for-loop begint beneden en gaat naar boven, zodat het zwaartekracht simuleert. Als de vakje "leeg" is dan wordt het "vol"
  placeModelChip(col) {
    for (let row = 5; row >= 0; row--) {
      if (this.board[row][col] === "") {
        this.board[row][col] = this.turnInfo.player.color;  
        //placement niet echt nodig??
        return [row, col];
      }
    }
    return false;
  }

  //0 is geen winnaar, 1 is gelijkspel, 2 is winnaar
  checkWinner(placement) {
    const lastCol = placement[1];
    const lastRow = placement[0];

    for (let { row: dirRow, col: dirCol } of Model.directions) {
      const forwardCount = this.counter(lastRow, lastCol, dirRow, dirCol);
      const backwardCount = this.counter(lastRow, lastCol, -dirRow, -dirCol);
      //het telt de geplaatste fische 2 keer, daarom - 1
      const count = forwardCount + backwardCount - 1;

      if (count >= 4) return 2;
    }
    this.turnInfo.count++;
    if (this.turnInfo.count == 42) {
      return 1;
    }
    return 0;
  }

  counter(row, col, dirRow, dirCol) {
    let count = 0;
    //checkt of het buiten bord zit en of juiste kleur is
    while (
        row >= 0 && row < Model.rows &&
        col >= 0 && col < Model.cols &&
        this.board[row][col] === this.turnInfo.player.color
    ) {
        count++;
        row += dirRow;
        col += dirCol;
    }
    return count;
  }
  getTurnName() {
    return this.turnInfo.player.username;
  }
  getTurnColor() {
    return this.turnInfo.player.color;
  }
  switchTurn() {
    if (this.turnInfo.player.color === this.players[0].color) {
        this.turnInfo.player = this.players[1];
    }
    else {
        this.turnInfo.player = this.players[0];
    }
  }
  updateWins(winnerColor) {
    if(winnerColor === this.players[0].color) {
      this.players[0].wins += 1;
      return;
    }
    this.players[1].wins += 1;
  }
  isAiTurn() {
    return this.getGameMode() == 'ai' && this.getTurnColor() == 'red';
  }
  makeAiMove() {
    return this.AiModel.decide(this.board);
  }
  getBoard() {
    return this.board;
  }
  getWins() {
    let wins = [];
    this.players.forEach(player => {
      wins.push(player.wins)
    });
    return wins;
  }
  makePlayer(username, pos) {
    let color = 'blue';
    if(pos === 1) {
      color = 'red';
    }
    return {
      username,
      wins: 0,
      color
    };
  }
}
export default new Model();