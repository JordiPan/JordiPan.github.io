export class Bord {
    constructor() {
// Maakt automatisch 42 <div> vakjes
        let container = document.getElementById("cont");
        for(let i = 0; i < 42; i++){
            let backside = document.createElement("div");
            backside.className = 'items';
            container.appendChild(backside);
        }

   // Maakt een 4 op 1 rij model bord
        let vakjes =new Array(6);
        for (let i=0;i<6;i++)
        {
            vakjes[i]=new Array(7);
        }
        // Het zet in alle vakken van de model "leeg"
        for(let rij=0;rij<6;rij++)
            for(let kolom=0;kolom<7;kolom++)
                vakjes[rij][kolom]="leeg";

        let el = document.querySelector(".container");
        let message = document.querySelector("#messageWindow");

// Het gaat naar function handleClick als er geklikt wordt in de container.
        el.addEventListener('click' , event => {
            handleClick(event);
        })

// Het gaat door elke div in de container af en als je klikt op een div (vak), dan ga je naar de functions plaatsFische() en toonModel().

        // for-loop begint beneden en gaat naar boven, zodat het lijkt op zwaartekracht simuleert. Als de vakje "leeg" is dan wordt het "vol"
        function plaatsFiche(kolom)
        {
            for(let rij=5;rij>=0;rij--)
            {
                if(vakjes[rij][kolom]==="leeg")
                {
                    vakjes[rij][kolom]="vol";
                    return true;
                }
            }
            return false;
        }
        let reset = document.querySelector("#resetButton")
        reset.addEventListener('click', restart);

        function restart() {
            const vakjesHTML=document.querySelectorAll('.container > div');
            vakjesHTML.forEach(element=>{
                element.style.backgroundColor = "white";
                message.innerHTML = "reset...";
            })

            for(let rij=0;rij<6;rij++) {
                for(let kolom=0;kolom<7;kolom++) {
                    vakjes[rij][kolom] = "leeg";
                }
            }
        }
        document.getElementById("startButton").addEventListener('click',enterNames);
        function enterNames() {
            let player1 = document.getElementById("pName1").value;
            let player2 = document.getElementById("pName2").value;
            if (player1 != "" && player2 != "") {
                let scoreName1 = document.getElementById("speler1");
                let scoreName2 = document.getElementById("speler2");
                scoreName1.innerHTML = player1;
                scoreName2.innerHTML = player2;
            }

        }
    }

}