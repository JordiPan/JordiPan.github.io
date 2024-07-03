export class ViewBord {
    constructor() {
        // this.controllerBord = c;
        // this.modelBord = m;
        this.beurt = document.getElementById("beurt");
        this.winst1 = document.getElementById("winst1");
        this.winst2 = document.getElementById("winst2");
        this.message = document.querySelector("#result-window");
        this.container = document.getElementById("board");
        this.playingField = document.querySelector(".margin-container");
        this.scoreName1 = document.getElementById("speler1");
        this.scoreName2 = document.getElementById("speler2");
        this.vakjesHTML = document.querySelectorAll('#board > div');
        const speelWeerBtn = document.getElementById("speelWeer");
        this.start = document.getElementById("start-window");
        speelWeerBtn.addEventListener('click', this.speelWeer)
        this.reset = document.getElementById("restart")
        let el = document.querySelector("#board");

// Het gaat naar function handleClick als er geklikt wordt in de container.
        el.addEventListener('click' , event => {
            this.handleClick(event);
        })
    }
    bindMakeBoard(handler) {
        this.start.addEventListener('submit', handler);
    }
    bindReset(handler) {
        this.reset.addEventListener('click', handler);
    }
    // Maakt automatisch 42 <div> vakjes
    makeBoard(event) {
        event.preventDefault();
        for(let i = 0; i < 42; i++) {
            this.backside = document.createElement("div");
            this.backside.className = 'item';
            this.container.appendChild(this.backside);
        }
    }
    hideStartWindow() {
        this.start.classList.add("hidden");
        this.playingField.classList.remove("hidden");
    }
    resetBoard() {
        
        this.vakjesHTML.forEach(element => {
            element.style.backgroundColor = "rgba(255, 255, 255, 0)";
        })
        this.winst1.innerHTML = "Winsten: 0";
        this.winst2.innerHTML = "Winsten: 0";
        
        this.beurt.innerHTML = "Beurt: ???";
        this.playingField.classList.add("hidden");
        this.start.classList.remove("hidden");
    }
    startGame = () => {
        this.player1Name = document.getElementById("speler-naam-1").value;
        this.player2Name = document.getElementById("speler-naam-2").value;
        if (this.player1Name !== "" && this.player2Name !== "") {
            this.controllerBord.active = true;
            this.controllerBord.eersteBeurt = true;
            let scoreName1 = document.getElementById("speler1");
            let scoreName2 = document.getElementById("speler2");

            scoreName1.innerHTML = this.player1Name;
            scoreName2.innerHTML = this.player2Name;

            this.form = document.getElementById("form");
            this.form.classList.add("hidden");
            this.beurtView(this.player1Name, this.player2Name);
        }
    }

    beurtView(player1, player2) {
              this.actueelBeurt();
            if (this.controllerBord.beurtNum === 0) {
                this.beurt.innerHTML = "Beurt: " + player1;
                this.beurt.style.color = "blue";
            } 
            else {
                this.beurt.innerHTML = "Beurt: " + player2;
                this.beurt.style.color = "red";
            }
    }

    actueelBeurt() {
        if (this.controllerBord.eersteBeurt) {
            this.controllerBord.beurtNum = Math.floor(Math.random() * 2);
            this.controllerBord.eersteBeurt = false;
        } 
        else {
            if (this.controllerBord.beurtNum === 0) {
                this.controllerBord.beurtNum = 1;
            } else {
                this.controllerBord.beurtNum = 0;
            }
        }
        console.log(this.controllerBord.beurtNum);
        return this.controllerBord.beurtNum;
    }

    beurtViewUpdate(beurtNum) {
        let player1 = document.getElementById("pName1").value;
        let player2 = document.getElementById("pName2").value;
        this.beurt = document.getElementById("beurt");

        if(this.controllerBord.active) {
        if (beurtNum === 0) {
            this.beurt.innerHTML = "Beurt: " + player1;
            this.beurt.style.color = "blue";
        } else {
            this.beurt.innerHTML = "Beurt: " + player2;
            this.beurt.style.color = "red";
        }
    }
    }

    handleClick = (event) =>
    {
        this.teller=0;
        const vakjesHTML=document.querySelectorAll('.container > div');
        vakjesHTML.forEach(element => {
            if(element===event.target)
            {
                this.controllerBord.plaatsFiche(this.teller%7);
                this.controllerBord.toonModel();
            }
            this.teller++;
        })
    }
    gameEnd(beurtNum){ 
        this.controllerBord.active = false;
        this.message.classList.toggle("hidden");
        if(beurtNum === 0) {
            this.teller1++;
            this.beurt.innerHTML = "Speler 1 heeft gewonnen!";
            this.winst1.innerHTML = "Winsten: " + this.teller1;
        }
        else {
            this.teller2++;
            this.beurt.innerHTML = "Speler 2 heeft gewonnen!";
            this.winst2.innerHTML = "Winsten: " + this.teller2;
        }
    }
    speelWeer = () => {
        const vakjesHTML = document.querySelectorAll('.container > div');
        vakjesHTML.forEach(element => {
            element.style.backgroundColor = "rgba(255, 255, 255, 0)";
        })

        for (let rij = 0; rij < 6; rij++) {
            for (let kolom = 0; kolom < 7; kolom++) {
                this.modelBord.vakjes[rij][kolom] = "leeg";
            }
        }
        this.controllerBord.active = true;
        this.message.classList.toggle("hidden");
        this.beurtViewUpdate(this.controllerBord.beurtNum);
    }
}