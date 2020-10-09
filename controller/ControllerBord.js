import {ModelBord} from "../model/ModelBord.js";
import {ViewBord} from "../view/ViewBord.js";

export class ControllerBord {
    constructor() {
        this.active = false;
        this.eersteBeurt=false;
        this.beurtNum = 0;
        this.modelBord = new ModelBord();
        this.viewBord = new ViewBord(this, this.modelBord);
    }

    // for-loop begint beneden en gaat naar boven, zodat het lijkt op zwaartekracht simuleert. Als de vakje "leeg" is dan wordt het "vol"

    plaatsFiche = (kolom) =>
    {
        console.log("plaatsfiche denkt: " + this.active)
        if(this.active) {
            for(let rij=5;rij>=0;rij--)
            {
                if(this.modelBord.vakjes[rij][kolom]==="leeg")
                {
                    if(this.beurtNum === 0) {
                        this.modelBord.vakjes[rij][kolom]="blauw";
                    }
                    else {
                        this.modelBord.vakjes[rij][kolom]="rood";
                    }
                    this.viewBord.actueelBeurt();
                    this.viewBord.beurtViewUpdate(this.beurtNum);

                    return;
                }
            }
        }
        else {
            alert("typ eerst de namen in!")
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

    checkWinnaar() {

    }
}