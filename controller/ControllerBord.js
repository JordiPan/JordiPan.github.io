import {ModelBord} from "../model/ModelBord.js";
import {ViewBord} from "../view/ViewBord.js";

export class ControllerBord {
    constructor() {
       
        this.model = new ModelBord();
        this.view = new ViewBord();
        //op dit moment geen idee over bind this
        this.view.bindMakeBoard(this.handleStart.bind(this))
        this.view.bindStop(this.handleStop.bind(this))
        this.view.bindPlaceChip(this.handlePlacing.bind(this))
        this.view.bindRematch(this.handleRematch.bind(this))
    }

    handleStart(event) {
        this.model.makeModelBoard();
        this.model.setNames(this.view.getNames());
        this.model.decideFirst();
        
        this.view.makeBoard(event);
        this.view.setNames(this.model.getNames());
        this.view.updateTurn(this.model.getTurn());
        this.view.hideStartWindow();
    }

    handleStop() {
        this.model.resetWins();
        this.view.resetBoard();
    }
    // for-loop begint beneden en gaat naar boven, zodat het lijkt op zwaartekracht simuleert. Als de vakje "leeg" is dan wordt het "vol"
    handlePlacing(event) {
        let placement = this.model.placeModelChip(event);
        if(!placement) {
            return;
        }
        this.view.placeChip(this.model.getPlacement(), this.model.getColor());
        let winner = this.model.checkWinner(placement);
        if(winner) {
            let stats = this.model.updateWins(winner);
            this.view.updateWins(stats);
            this.view.endGame(winner);
            return;
        }
        this.model.switchTurn();
        this.view.updateTurn(this.model.getTurn());
    }
    handleRematch(event) {
        
        this.model.makeModelBoard();
        this.model.decideFirst(event);

        this.view.makeBoard(event);
        this.view.updateTurn(this.model.getTurn());
        this.view.hideResultsWindow();
    }
    // plaatsFiche = (kolom) =>
    // {
    //     if(this.active) {
    //         for(let rij=5;rij>=0;rij--)
    //         {
    //             if(this.modelBord.vakjes[rij][kolom]==="leeg")
    //             {
    //                 if(this.beurtNum === 0) {
    //                     this.modelBord.vakjes[rij][kolom]="blauw";
    //                 }
    //                 else {
    //                     this.modelBord.vakjes[rij][kolom]="rood"; 
    //                 }
    //                 this.checkWinnaar(kolom, rij, this.beurtNum);
    //                 this.viewBord.actueelBeurt();
    //                 this.viewBord.beurtViewUpdate(this.beurtNum);
    //                 return;
    //             }
    //         }
    //     }
    // }

    // Koppelt de model aan de view
    // toonModel = () =>
    // {
    //     // Gaat door alle divs en maakt alles wit
    //     let teller=0;
    //     const vakjesHTML=document.querySelectorAll('.container > div');
    //     vakjesHTML.forEach(element=>{
    //         element.style.backgroundColor = "rgba(255, 255, 255, 0)";
    //     })
    //     // Gaat door alle divs en zoekt naar de divs die "vol" zijn. Als het vol is dan wordt het rood
    //     vakjesHTML.forEach(element => {
    //         let rij=Math.floor(teller/7);
    //         let kolom=teller%7;
    //         if(this.modelBord.vakjes[rij][kolom]==="blauw"){
    //             element.style.backgroundColor = "blue";
    //         }
    //         else if (this.modelBord.vakjes[rij][kolom] === "rood") {
    //             element.style.backgroundColor = "red";
    //         }
    //         teller++;
    //     })
    // }

    checkWinnaar(kolom, rij, beurtNum) {
        this.vakjes = this.modelBord.vakjes;
        console.log("KOLOM: "+kolom + " RIJ: " + rij + ' BeurtNummer: ' + beurtNum);
        if(beurtNum === 0) {
            this.kleur = "blauw";
        }
        else {
            this.kleur = "rood";
        }
        
    //verticaal onder check 
        if(rij <= 2) {
            if(this.vakjes[rij + 1][kolom] === this.kleur && this.vakjes[rij + 2][kolom] === this.kleur && this.vakjes[rij + 3][kolom] === this.kleur) {
            this.viewBord.gameEnd(this.beurtNum);
            return;
            }
        }
    //horizontaal check (geplaatst op [0]000)
        if(this.vakjes[rij][kolom - 1] === this.kleur && this.vakjes[rij][kolom - 2] === this.kleur && this.vakjes[rij][kolom - 3] === this.kleur) {
            this.viewBord.gameEnd(this.beurtNum);
            console.log(this.vakjes[rij][kolom - 1]);
            return;
        }
    //horizontaal check (geplaatst op 0[0]00)
        else if(this.vakjes[rij][kolom - 1] === this.kleur && this.vakjes[rij][kolom + 1] === this.kleur && this.vakjes[rij][kolom + 2] === this.kleur) {
            this.viewBord.gameEnd(this.beurtNum);
            return;
        }
    //horizontaal check (geplaatst op 00[0]0)
        else if(this.vakjes[rij][kolom + 1] === this.kleur && this.vakjes[rij][kolom - 1] === this.kleur && this.vakjes[rij][kolom - 2] === this.kleur) {
            this.viewBord.gameEnd(this.beurtNum);
            return;
        }
    //horizontaal check (geplaatst op 000[0])
        else if(this.vakjes[rij][kolom + 1] === this.kleur && this.vakjes[rij][kolom + 2] === this.kleur && this.vakjes[rij][kolom + 3] === this.kleur) {
            this.viewBord.gameEnd(this.beurtNum);
            return;
        }


    //diagonaal check (links 1/4 boven naar beneden)
        if(rij <= 2) {
            if(this.vakjes[rij + 1][kolom + 1] === this.kleur && this.vakjes[rij + 2][kolom + 2] === this.kleur && this.vakjes[rij + 3][kolom + 3] === this.kleur) {
                this.viewBord.gameEnd(this.beurtNum);
                return;
            }
        }
    //diagonaal check (links 2/4 boven naar beneden)
        if(rij <= 3 && rij > 0) {
            if(this.vakjes[rij - 1][kolom - 1] === this.kleur && this.vakjes[rij + 1][kolom + 1] === this.kleur && this.vakjes[rij + 2][kolom + 2] === this.kleur) {
                this.viewBord.gameEnd(this.beurtNum);
                return;
            }
        }
    //diagonaal check (links 3/4 boven naar beneden)
        if(rij <= 4 && rij > 1) {
            if(this.vakjes[rij - 1][kolom - 1] === this.kleur && this.vakjes[rij - 2][kolom - 2] === this.kleur && this.vakjes[rij + 1][kolom + 1] === this.kleur) {
                this.viewBord.gameEnd(this.beurtNum);
                return;
            }
        }
    //diagonaal check (links 4/4 boven naar beneden)
        if(rij >= 3) {
            if(this.vakjes[rij - 1][kolom - 1] === this.kleur && this.vakjes[rij - 2][kolom - 2] === this.kleur && this.vakjes[rij - 3][kolom - 3] === this.kleur) {
                this.viewBord.gameEnd(this.beurtNum);
                return;
            }
        }
    //diagonaal check (rechts 1/4 boven naar beneden)
        if(rij <= 2) {
            if(this.vakjes[rij + 1][kolom - 1] === this.kleur && this.vakjes[rij + 2][kolom - 2] === this.kleur && this.vakjes[rij + 3][kolom - 3] === this.kleur) {
                this.viewBord.gameEnd(this.beurtNum);
                return;
            }
        }
    //diagonaal check (rechts 2/4 boven naar beneden)
        if(rij <= 3 && rij > 0) {
            if(this.vakjes[rij - 1][kolom + 1] === this.kleur && this.vakjes[rij + 1][kolom - 1] === this.kleur && this.vakjes[rij + 2][kolom - 2] === this.kleur) {
                this.viewBord.gameEnd(this.beurtNum);
                return;
            }
        }
    //diagonaal check (rechts 3/4 boven naar beneden)
        if(rij <= 4 && rij > 1) {
            if(this.vakjes[rij + 1][kolom - 1] === this.kleur && this.vakjes[rij - 1][kolom + 1] === this.kleur && this.vakjes[rij - 2][kolom + 2] === this.kleur) {
                this.viewBord.gameEnd(this.beurtNum);
                return;
            }
        }
    //diagonaal check (rechts 4/4 boven naar beneden)
        if(rij >= 3) {
            if(this.vakjes[rij - 1][kolom + 1] === this.kleur && this.vakjes[rij - 2][kolom + 2] === this.kleur && this.vakjes[rij - 3][kolom + 3] === this.kleur) {
                this.viewBord.gameEnd(this.beurtNum);
                return;
            }
        }
    }
}   