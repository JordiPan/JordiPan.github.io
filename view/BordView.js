import {Bord} from "../model/Bord.js";

export class BordView {
    constructor() {
            // Gaat door alle divs en maakt alles wit
            let teller=0;
            console.log(vakjes);
            const vakjesHTML=document.querySelectorAll('.container > div');
            vakjesHTML.forEach(element=>{
                element.style.backgroundColor = "white";
            })
            // Gaat door alle divs en zoekt naar de divs die "vol" zijn. Als het vol is dan wordt het rood
            vakjesHTML.forEach(element => {
                let rij=Math.floor(teller/7);
                let kolom=teller%7;
                console.log("rij:" + rij +' '+ "kolom:" + kolom + " status:"+vakjes[rij][kolom] + teller)
                if(vakjes[rij][kolom]=="vol"){
                    element.style.backgroundColor = "red";
                }
                teller++;
            })
    }
}