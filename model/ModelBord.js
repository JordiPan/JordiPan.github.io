
export class ModelBord {
  static directions = [
    { row: 0, col: 1 },  // Horizontaal
    { row: 1, col: 0 },  // Verticaal
    { row: 1, col: 1 },  // Diagonaal (rechts)
    { row: 1, col: -1 }  // Diagonaal (links)
  ];
  static rows = 6;
  static cols = 7;

  constructor() {
    this.turnColor;
    this.currentTurnName = "???";
    this.placement;
    this.name1;
    this.name2;
    this.counter1 = 0;
    this.counter2 = 0;
    this.board = new Array(ModelBord.rows);
  }
  makeModelBoard() {
    for (let i = 0; i < this.board.length; i++) {
      this.board[i] = new Array(ModelBord.cols);
    }
    // Het zet in alle vakken van de model "-"
    for (let row = 0; row < 6; row++)
      for (let col = 0; col < 7; col++) this.board[row][col] = "-";
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
    this.name2 = players[1];
  }
  getNames() {
    return [this.name1, this.name2];
  }
  // for-loop begint beneden en gaat naar boven, zodat het zwaartekracht simuleert. Als de vakje "leeg" is dan wordt het "vol"
  placeModelChip(event) {
    let col = event.target.id % 7;

    for (let row = 5; row >= 0; row--) {
      if (this.board[row][col] === "-") {
        this.placement = (row*7)+(col); 
        this.board[row][col] = this.turnColor;  
        return [row, col];
      }
    }
    return false;
  }

  checkWinner(placement) {
    let lastCol = placement[1];
    let lastRow = placement[0];

    for (let { row: dirRow, col: dirCol } of ModelBord.directions) {
      const forwardCount = this.counter(lastRow, lastCol, dirRow, dirCol);
      const backwardCount = this.counter(lastRow, lastCol, -dirRow, -dirCol);
      //het telt de geplaatste fische 2 keer, daarom - 1
      const count = forwardCount + backwardCount - 1;

      if (count >= 4) return this.currentTurnName;
  }

  return null;
  }

  counter(row, col, dirRow, dirCol) {
    let count = 0;
    //checkt of het buiten bord zit en of juiste kleur is
    while (
        row >= 0 && row < ModelBord.rows &&
        col >= 0 && col < ModelBord.cols &&
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
  getTurn() {
    return this.currentTurnName;
  }

  getColor() {
    return this.turnColor;
  }
  switchTurn() {
    if (this.currentTurnName == this.name1) {
        this.currentTurnName = this.name2;
        this.turnColor = 'red'
    }
    else {
        this.currentTurnName = this.name1
        this.turnColor = 'blue'
    }
  }
  updateWins(winner) {
    if(winner == this.name1) {
      this.counter1 += 1;
      return [this.counter1, 'win1'];
    }
    this.counter2 += 1;
      return [this.counter2, 'win2'];
  }
  // getWins1() {
  //   return this.counter1;
  // }
  // getWins2() {
  //   return this.counter2;
  // }
}
