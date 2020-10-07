let active = false;  
let a=true;
let beurtNum;
let vakjes=new Array(6);

for (let i=0;i<6;i++)
{
    vakjes[i]=new Array(7);
}

// Het zet in alle vakken van de model "leeg"
for(let rij=0;rij<6;rij++)
    for(let kolom=0;kolom<7;kolom++)
        vakjes[rij][kolom]="leeg";

// Maakt automatisch 42 <div> vakjes
let container = document.getElementById("cont");
for(var i = 0; i < 42; i++){
    var backside = document.createElement("div");
    backside.className = 'items';
    container.appendChild(backside);
}
let el = document.querySelector(".container");
let message = document.querySelector("#messageWindow");

// Het gaat naar function handleClick als er geklikt wordt in de container.
el.addEventListener('click' , event => {
    handleClick(event);
})

// Het gaat door elke div in de container af en als je klikt op een div (vak), dan ga je naar de functions plaatsFische() en toonModel().
function handleClick(event)
{
    let teller=0;
    const vakjesHTML=document.querySelectorAll('.container > div');
    vakjesHTML.forEach(element => {
        if(element===event.target)
        {
            message.innerHTML = "Je klikte op nummer: " + teller;
            plaatsFiche(teller%7);
            toonModel();
        }
        teller++;
    })
}
    // for-loop begint beneden en gaat naar boven, zodat het lijkt op zwaartekracht simuleert. Als de vakje "leeg" is dan wordt het "vol"
function plaatsFiche(kolom)
{
    if(active) {
        for(let rij=5;rij>=0;rij--)
    {
        if(vakjes[rij][kolom]==="leeg")
        {
            vakjes[rij][kolom]="vol";
            return;
        }
    }
    return;
    }
    else {
        alert("typ eerst de namen in!")
    }
}


// Koppelt de model aan de view
function toonModel()
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
        if(vakjes[rij][kolom]=="vol"){
            if (beurtNum == 0 && vakjes[rij][kolom] != "leeg") {
                element.style.backgroundColor = "blue";
                console.log("blauw1");
            }
            else if (beurtNum == 1 && vakjes[rij][kolom] != "leeg") {
                element.style.backgroundColor = "red";
                console.log("red2");
              
            }
        } 
          actueelBeurt()
        teller++;
    })
}

let reset = document.querySelector("#resetButton")
reset.addEventListener('click', () => {
    restart();
})

function restart() {
    active = false;
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

    let form = document.getElementById("form");
    form.classList.remove("hidden");

    let scoreName1 = document.getElementById("speler1");
    let scoreName2 = document.getElementById("speler2");
        scoreName1.innerHTML = "Speler1";
        scoreName2.innerHTML = "Speler2";

    beurt.innerHTML = "Beurt: geen idee";
    beurt.style.color = "black";
}
document.getElementById("startButton").addEventListener('click',enterNames);
function enterNames() {
    
    let player1 = document.getElementById("pName1").value;
    let player2 = document.getElementById("pName2").value;

    if (player1 != "" && player2 != "") {
        active = true;
        let scoreName1 = document.getElementById("speler1");
        let scoreName2 = document.getElementById("speler2");

        scoreName1.innerHTML = player1;
        scoreName2.innerHTML = player2;

        let form = document.getElementById("form");
        form.classList.add("hidden");
        beurtView(player1, player2)
    }   
}

function beurtView(player1, player2) {
        let beurt = document.getElementById("beurt");
        actueelBeurt(); 
            if(beurtNum == 0) {
                beurt.innerHTML = "Beurt: " + player1;
                beurt.style.color = "blue";
            }
            else {
                beurt.innerHTML = "Beurt: " + player2;
                beurt.style.color = "red";
            }
    }

function actueelBeurt() {
    console.log(a);
    if(a) {
        beurtNum = Math.floor(Math.random() * 2);
        a = false;
    }
    else {
        if(beurtNum == 0) {
            beurtNum = 1;
        }
        else {
            beurtNum = 0;
        }
    }
    return beurtNum;
}