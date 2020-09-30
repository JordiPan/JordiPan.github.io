// Maakt een 4 op 1 rij model bord
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
let rezero = document.querySelector("#resetButton")
let el = document.querySelector(".container");
let message = document.querySelector("#messageWindow");

rezero.addEventListener('click', stop => {
    Aaa();
})
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
// Koppelt de model aan de view
function toonModel()
{
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

function Aaa() {

    const vakjesHTML=document.querySelectorAll('.container > div');
    vakjesHTML.forEach(element=>{
        element.style.backgroundColor = "white";
    })

    for (let rij = 0; rij >= 5; rij++) {
        for (let kolom = 0; kolom >= 6; kolom++) {
            vakjes[rij][kolom] = "leeg";
            console.log("rij:" + rij +' '+ "kolom:" + kolom + " status:"+vakjes[rij][kolom] + teller)
        }
    }
}


/*function test() {

    id = 0;

    for (i = 0; i < 1; i++) {
        el[i] = id;
        console.log(el);
        id++;
    }
}

test();
*/
