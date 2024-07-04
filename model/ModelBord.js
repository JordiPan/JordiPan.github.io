export class ModelBord {
  constructor() {
    this.turnColor;
    this.turnName = "???";
    this.name1;
    this.name2;
    this.counter1 = 0;
    this.counter2 = 0;
    this.vakjes = new Array(6);
  }
  makeModelBoard() {
    for (let i = 0; i < 6; i++) {
      this.vakjes[i] = new Array(7);
    }
    // Het zet in alle vakken van de model "leeg"
    for (let rij = 0; rij < 6; rij++)
      for (let kolom = 0; kolom < 7; kolom++) this.vakjes[rij][kolom] = "-";
  }
  resetWins = () => {
    this.counter1 = 0;
    this.counter2 = 0;
  };
  decideFirst() {
    //1 of 2 randomizer
    this.decider = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
    if (this.decider == 1) {
      this.turnName = this.name1;
      this.turnColor = 'blue';
    } else {
      this.turnName = this.name2;
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
        let idForView = (rij*7)+(kolom); 
        this.vakjes[rij][kolom] = this.turnColor;  
        // this.checkWinnaar(kolom, rij, this.beurtNum);
        // this.viewBord.actueelBeurt();
        // this.viewBord.beurtViewUpdate(this.beurtNum);
        return idForView;
      }
    }
  }
  getTurn() {
    return this.turnName;
  }
  getColor() {
    console.log(this.turnColor)
    return this.turnColor;
  }
  switchTurn() {}
}
