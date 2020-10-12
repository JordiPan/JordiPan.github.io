import {ModelBord} from "../model/ModelBord.js";

export class ViewBord {
    constructor(c, m) {
        this.controllerBord = c;
        this.modelBord = m;

        this.form = document.getElementById("form");

        this.message = document.querySelector("#messageWindow");

        const startBtn = document.getElementById("startButton");
        startBtn.addEventListener('click', this.startGame);

        let reset = document.querySelector("#resetButton")
        reset.addEventListener('click', () => {
            this.restart();
        })
        let el = document.querySelector(".container");

// Het gaat naar function handleClick als er geklikt wordt in de container.
        el.addEventListener('click' , event => {
            this.handleClick(event);
        })
    }


    startGame = () => {
        this.player1Name = document.getElementById("pName1").value;
        this.player2Name = document.getElementById("pName2").value;
        if (this.player1Name !== "" && this.player2Name !== "") {
            this.controllerBord.active = true;
            //console.log(this.controllerBord.active);
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

    actueelBeurt() {
        if (this.controllerBord.eersteBeurt) {
            this.controllerBord.beurtNum = Math.floor(Math.random() * 2);
            this.controllerBord.eersteBeurt = false;
        } else {
            if (this.controllerBord.beurtNum === 0) {
                this.controllerBord.beurtNum = 1;
            } else {
                this.controllerBord.beurtNum = 0;
            }
        }
        return this.controllerBord.beurtNum;
    }


    beurtView(player1, player2) {
        this.beurt = document.getElementById("beurt");
        this.actueelBeurt();
        if (this.controllerBord.beurtNum === 0) {
            this.beurt.innerHTML = "Beurt: " + player1;
            this.beurt.style.color = "blue";
        } else {
            this.beurt.innerHTML = "Beurt: " + player2;
            this.beurt.style.color = "red";
        }
    }


    beurtViewUpdate(beurtNum) {
        let player1 = document.getElementById("pName1").value;
        let player2 = document.getElementById("pName2").value;
        this.beurt = document.getElementById("beurt");

        if (beurtNum === 0) {
            this.beurt.innerHTML = "Beurt: " + player1;
            this.beurt.style.color = "blue";
        } else {
            this.beurt.innerHTML = "Beurt: " + player2;
            this.beurt.style.color = "red";
        }
    }

    restart = () => {
        this.controllerBord.active = false;
        const vakjesHTML = document.querySelectorAll('.container > div');
        vakjesHTML.forEach(element => {
            element.style.backgroundColor = "white";
            this.message.innerHTML = "reset...";
        })

        for (let rij = 0; rij < 6; rij++) {
            for (let kolom = 0; kolom < 7; kolom++) {
                this.modelBord.vakjes[rij][kolom] = "leeg";
            }
        }

        this.form.classList.remove("hidden");

        let scoreName1 = document.getElementById("speler1");
        let scoreName2 = document.getElementById("speler2");
        scoreName1.innerHTML = "Speler1";
        scoreName2.innerHTML = "Speler2";

        this.beurt.innerHTML = "Beurt: ???";
        this.beurt.style.color = "black";
    }

    handleClick = (event) =>
    {
        this.teller=0;
        const vakjesHTML=document.querySelectorAll('.container > div');
        vakjesHTML.forEach(element => {
            if(element===event.target)
            {
                this.message.innerHTML = "Je klikte op nummer: " + this.teller;
                this.controllerBord.plaatsFiche(this.teller%7);
                this.controllerBord.toonModel();
            }
            this.teller++;
        })
    }
}