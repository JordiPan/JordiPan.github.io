export class ModelBord {
    constructor() {
        this.color;
        this.turn = '???';
        this.name1;
        this.name2;
        this.counter1 = 0;
        this.counter2 = 0;
    }
    makeModelBoard() {
        this.vakjes=new Array(6);
        for (let i=0;i<6;i++)
            {
                this.vakjes[i]=new Array(7);
            }
            // Het zet in alle vakken van de model "leeg"
            for(let rij=0;rij<6;rij++)
                for(let kolom=0;kolom<7;kolom++)
                    this.vakjes[rij][kolom]="leeg";
    }
    resetWins = () => {
        this.counter1 = 0;
        this.counter2 = 0;
    }
    decideFirst() {
        //1 of 2 randomizer
        this.decider = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
        if (this.decider == 1) {
            this.turn = this.name1
        }
        else {
            this.turn = this.name2
        }
    }
    setNames(players) {
        this.name1 = players[0]
        this.name2 = players[1]
    }
    getNames() {
        return [this.name1, this.name2]
    }
    getTurn() {
        return this.turn;
    }
    switchTurn() {

    }
}