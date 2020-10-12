import {ModelBord} from "../model/ModelBord.js";
import {ViewBord} from "../view/ViewBord.js";

export class ControllerBord {
    constructor() {
        this.kleur;
        this.active = false;
        this.eersteBeurt=false;
        this.beurtNum = 0;
        this.modelBord = new ModelBord();
        this.viewBord = new ViewBord(this, this.modelBord);
    }

    // for-loop begint beneden en gaat naar boven, zodat het lijkt op zwaartekracht simuleert. Als de vakje "leeg" is dan wordt het "vol"

    plaatsFiche = (kolom) =>
    {
        if(this.active) {
            for(let rij=5;rij>=0;rij--)
            {
                if(this.modelBord.vakjes[rij][kolom]==="leeg")
                {
                    if(this.beurtNum === 0) {
                        this.modelBord.vakjes[rij][kolom]="blauw";
                        this.checkWinnaar(kolom, rij);
                    }
                    else {
                        this.modelBord.vakjes[rij][kolom]="rood"; 
                        this.checkWinnaar(kolom, rij);
                    }
                    this.viewBord.actueelBeurt();
                    this.viewBord.beurtViewUpdate(this.beurtNum);
                    return;
                }
            }
        }
    }

    // Koppelt de model aan de view
    toonModel = () =>
    {
        // Gaat door alle divs en maakt alles wit
        let teller=0;
        const vakjesHTML=document.querySelectorAll('.container > div');
        vakjesHTML.forEach(element=>{
            element.style.backgroundColor = "white";
        })
        // Gaat door alle divs en zoekt naar de divs die "vol" zijn. Als het vol is dan wordt het rood
        vakjesHTML.forEach(element => {
            let rij=Math.floor(teller/7);
            let kolom=teller%7;
            if(this.modelBord.vakjes[rij][kolom]==="blauw"){
                element.style.backgroundColor = "blue";
            }
            else if (this.modelBord.vakjes[rij][kolom] === "rood") {
                element.style.backgroundColor = "red";
            }
            teller++;
        })
    }

    checkWinnaar(kolom, rij) {
        console.log("KOLOM: "+kolom + " RIJ: " + rij + ' BeurtNummer: ' + beurtNum);
        if(beurtNum === 0) {
            this.kleur = "blauw";
        }
        else {
            this.kleur = "rood";
        }
        
    //verticaal onder check 
        if(rij <= 2) {
            if(this.modelBord.vakjes[rij + 1][kolom] === this.kleur && this.modelBord.vakjes[rij + 2][kolom] === this.kleur && this.modelBord.vakjes[rij + 3][kolom] === this.kleur) {
            this.gameEnd();
            }
        }
    //horizontaal check (geplaatst op [0]000)
        if(kolom >= 3) {
            if(this.modelBord.vakjes[rij][kolom - 1] === this.kleur && this.modelBord.vakjes[rij][kolom - 2] === this.kleur && this.modelBord.vakjes[rij][kolom - 3] === this.kleur) {
            this.gameEnd();
            }
        }
    //horizontaal check (geplaatst op 0[0]00)
        if(kolom >= 1) {
            if(this.modelBord.vakjes[rij][kolom - 1] === this.kleur && this.modelBord.vakjes[rij][kolom + 1] === this.kleur && this.modelBord.vakjes[rij][kolom + 2] === this.kleur) {
            this.gameEnd();
            }
        }
    //horizontaal check (geplaatst op 00[0]0)
        if(kolom <= 5) {
            if(this.modelBord.vakjes[rij][kolom + 1] === this.kleur && this.modelBord.vakjes[rij][kolom - 1] === this.kleur && this.modelBord.vakjes[rij][kolom - 2] === this.kleur) {
            this.gameEnd();
            }
        }
    //horizontaal check (geplaatst op 000[0])
        if(kolom >= 3) {
            if(this.modelBord.vakjes[rij][kolom + 1] === this.kleur && this.modelBord.vakjes[rij][kolom + 2] === this.kleur && this.modelBord.vakjes[rij][kolom + 3] === this.kleur) {
            this.gameEnd();
            }
        }
    }

    gameEnd(){
        console.log("gameEnd denkt: " + this.beurtNum);
        if(this.beurtNum === 0) {
            console.log("game end blauw wint");
        }
        else {
            console.log("game end rood wint");
        }
        this.active = false;
    }
}