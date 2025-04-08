
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

  constructor() {
    this.AiModel = new AiModel();
    this.gamemode;
    this.turnColor;
    this.currentTurnName = "???";
    this.placement;
    this.name1;
    this.name2;
    this.aiName = 'AI';
    this.counter1 = 0;
    this.counter2 = 0;
    this.turnCount = 0;
    this.board = new Array(Model.rows);
  }

  makeModelBoard() {
    for (let i = 0; i < this.board.length; i++) {
      this.board[i] = new Array(Model.cols);
    }
    // Het zet in alle vakken van de model "-"
    for (let row = 0; row < Model.rows; row++)
      for (let col = 0; col < Model.cols; col++) this.board[row][col] = "-";
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
    this.turnCount = 0;
  }
  resetNames() {
    this.name1 = '';
    this.name2 = '';
  }
  resetWins = () => {
    this.counter1 = 0;
    this.counter2 = 0;
  };
  decideFirst() {
    //1 of 2 randomizer
    this.decider = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
    if (this.decider == 1) {
      this.currentTurnName = this.name1;
      this.turnColor = 'blue';
    } else {
      this.currentTurnName = this.name2;
      this.turnColor = 'red';
    }
  }
  setNames(players) {
    this.name1 = players[0];

    if (players[1] === '') {
      this.name2 = this.AiModel.getDifficulty()+ "-" + this.aiName;
    }
    else {
      this.name2 = players[1];
    }
  }
  getNames() {
    return [this.name1, this.name2];
  }
  // for-loop begint beneden en gaat naar boven, zodat het zwaartekracht simuleert. Als de vakje "leeg" is dan wordt het "vol"
  placeModelChip(col) {
    for (let row = 5; row >= 0; row--) {
      if (this.board[row][col] === "-") {
        this.placement = (row*Model.cols)+(col); 
        this.board[row][col] = this.turnColor;  
        return [row, col];
      }
    }
    return false;
  }

  //0 is geen winnaar, 1 is gelijkspel, 2 is winnaar
  checkWinner(placement) {
    let lastCol = placement[1];
    let lastRow = placement[0];

    for (let { row: dirRow, col: dirCol } of Model.directions) {
      const forwardCount = this.counter(lastRow, lastCol, dirRow, dirCol);
      const backwardCount = this.counter(lastRow, lastCol, -dirRow, -dirCol);
      //het telt de geplaatste fische 2 keer, daarom - 1
      const count = forwardCount + backwardCount - 1;

      if (count >= 4) return 2;
    }
    this.turnCount++;
    if (this.turnCount == 42) {
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
        this.board[row][col] === this.turnColor
    ) {
        count++;
        row += dirRow;
        col += dirCol;
    }
    return count;
  }
  getPlacement() {
    return this.placement;
  }
  getTurnName() {
    return this.currentTurnName;
  }

  getColor() {
    return this.turnColor;
  }
  switchTurn() {
    if (this.turnColor == 'blue') {
        this.currentTurnName = this.name2;
        this.turnColor = 'red'
    }
    else {
        this.currentTurnName = this.name1
        this.turnColor = 'blue'
    }
  }
  updateWins(winnerColor) {
    //win1 en win2 zijn de id's van de scores. niet handig maar het werkt
    if(winnerColor == 'blue') {
      this.counter1 += 1;
      return [this.counter1, 'win1'];
    }
    this.counter2 += 1;
      return [this.counter2, 'win2'];
  }

  isAiTurn() {
    return this.getGameMode() == 'ai' && this.getColor() == 'red';
  }
  
  getAiMove() {
    return this.AiModel.decide(this.board);
  }
}
export default new Model();