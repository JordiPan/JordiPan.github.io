let vakjes=new Array(6);
for (let i=0;i<6;i++)
{
    vakjes[i]=new Array(7);
}

for(let rij=0;rij<6;rij++)
    for(let kolom=0;kolom<7;kolom++)
        vakjes[rij][kolom]="leeg";


let el = document.querySelector(".container");
let message = document.querySelector("#messageWindow");

el.addEventListener('click' , event => {
    handleClick(event);
})

function handleClick(event)
{
    let teller=0;
    const vakjesHTML=document.querySelectorAll('.container > div');
    vakjesHTML.forEach(element => {
        if(element===event.target)
        {
            element.style.backgroundColor = "red";
            message.innerHTML = "Je klikte op nummer: " + teller;
            plaatsFiche(teller%7);

            toonModel();
        }
        teller++;
    })
}

let container = document.getElementById("cont");
for(var i = 0; i < 42; i++){
    var backside = document.createElement("div");
    backside.className = 'items';
    container.appendChild(backside);
}


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

function toonModel()
{
    let teller=0;
    console.log(vakjes);
    const vakjesHTML=document.querySelectorAll('.container > div');
    vakjesHTML.forEach(element=>{
        element.style.backgroundColor = "white";
    })

    vakjesHTML.forEach(element => {

        let rij=Math.floor(teller/7);
        let kolom=teller%7;
        console.log(rij + ' ' + kolom +vakjes[rij][kolom]);
        if(vakjes[rij][kolom]=="vol"){
            element.style.backgroundColor = "red";
            console.log("hoi");
        }
        teller++;
    })
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
