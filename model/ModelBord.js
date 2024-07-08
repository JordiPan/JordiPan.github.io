export class ModelBord {
  constructor() {
    this.turnColor;
    this.currentTurnName = "???";
    this.placement;
    this.name1;
    this.name2;
    this.counter1 = 0;
    this.counter2 = 0;
    this.spaces = new Array(6);
  }
  makeModelBoard() {
    for (let i = 0; i < 6; i++) {
      this.spaces[i] = new Array(7);
    }
    // Het zet in alle vakken van de model "-"
    for (let row = 0; row < 6; row++)
      for (let column = 0; column < 7; column++) this.spaces[rij][kolom] = "-";
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
  placeModelChip(event) {
    let kolom = event.target.id % 7;

    for (let rij = 5; rij >= 0; rij--) {
      if (this.vakjes[rij][kolom] === "-") {
        this.placement = (rij*7)+(kolom); 
        this.vakjes[rij][kolom] = this.turnColor;  
        return true;
      }
    }
    return false;
  }

  getPlacement() {
    return this.placement;
  }
  getTurn() {
    return this.currentTurnName;
  }

  getColor() {
    console.log(this.turnColor)
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
}
