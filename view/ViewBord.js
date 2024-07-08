export class ViewBord {
  constructor() {
    // this.controllerBord = c;
    // this.modelBord = m;
    this.turn = document.getElementById("turn");
    this.winsScore1 = document.getElementById("win1");
    this.winsScore2 = document.getElementById("win2");
    this.message = document.querySelector("#result-window");
    this.board = document.getElementById("board");
    this.playingField = document.querySelector(".margin-container");
    this.scoreName1 = document.getElementById("player-name-one");
    this.scoreName2 = document.getElementById("player-name-two");
    this.spaces = document.getElementsByClassName("item");
    const speelWeerBtn = document.getElementById("speelWeer");
    this.start = document.getElementById("start-window");
    speelWeerBtn.addEventListener("click", this.speelWeer);
    this.reset = document.getElementById("restart");
  }
  bindMakeBoard(handler) {
    this.start.addEventListener("submit", handler);
  }
  bindReset(handler) {
    this.reset.addEventListener("click", handler);
  }
  bindPlaceChip(handler) {
    //reageert niet als er op bord randen wordt geklikt 
    this.board.addEventListener("click", (event) => {
      if (event.target && event.target.classList.contains("item")) {
        handler(event);
      }
    });
    // this.board.addEventListener('click', handler);
  }
  // Maakt automatisch 42 <div> vakjes
  makeBoard(event) {
    event.preventDefault();
    for (let i = 0; i < 42; i++) {
      this.hole = document.createElement("div");
      this.hole.className = "item";
      this.hole.setAttribute("id", i);
      this.board.appendChild(this.hole);
    }
  }
  hideStartWindow() {
    this.start.classList.add("hidden");
    this.playingField.classList.remove("hidden");
  }
  resetBoard() {
    this.winsScore1.textContent = 0;
    this.winsScore2.textContent = 0;

    this.board.textContent = "";
    this.playingField.classList.add("hidden");
    this.start.classList.remove("hidden");
  }
  getNames() {
    return [
      document.getElementById("speler-naam-1").value,
      document.getElementById("speler-naam-2").value,
    ];
  }
  setNames(players) {
    this.scoreName1.textContent = players[0];
    this.scoreName2.textContent = players[1];
  }
  updateTurn(turn) {
    console.log(turn)
    this.turn.textContent = turn;

  }
//   beurtView(player1, player2) {
//     this.actueelBeurt();
//     if (this.controllerBord.beurtNum === 0) {
//       this.beurt.innerHTML = "Beurt: " + player1;
//       this.beurt.style.color = "blue";
//     } else {
//       this.beurt.innerHTML = "Beurt: " + player2;
//       this.beurt.style.color = "red";
//     }
//   }

//   actueelBeurt() {
//     if (this.controllerBord.eersteBeurt) {
//       this.controllerBord.beurtNum = Math.floor(Math.random() * 2);
//       this.controllerBord.eersteBeurt = false;
//     } else {
//       if (this.controllerBord.beurtNum === 0) {
//         this.controllerBord.beurtNum = 1;
//       } else {
//         this.controllerBord.beurtNum = 0;
//       }
//     }
//     console.log(this.controllerBord.beurtNum);
//     return this.controllerBord.beurtNum;
//   }

//   beurtViewUpdate(beurtNum) {
//     let player1 = document.getElementById("pName1").value;
//     let player2 = document.getElementById("pName2").value;
//     this.beurt = document.getElementById("beurt");

//     if (this.controllerBord.active) {
//       if (beurtNum === 0) {
//         this.beurt.innerHTML = "Beurt: " + player1;
//         this.beurt.style.color = "blue";
//       } else {
//         this.beurt.innerHTML = "Beurt: " + player2;
//         this.beurt.style.color = "red";
//       }
//     }
//   }
  placeChip(id, color) {
    document.getElementById(id).style.backgroundColor = color;
  }
  // handleClick = (event) => {
  //   this.teller = 0;
  //   const vakjesHTML = document.querySelectorAll(".container > div");
  //   vakjesHTML.forEach((element) => {
  //     if (element === event.target) {
  //       event.target.id;
  //       this.controllerBord.plaatsFiche(this.teller % 7);
  //       this.controllerBord.toonModel();
  //     }
  //     this.teller++;
  //   });
  // };
  gameEnd(beurtNum) {
    this.controllerBord.active = false;
    this.message.classList.toggle("hidden");
    if (beurtNum === 0) {
      this.teller1++;
      this.beurt.innerHTML = "Speler 1 heeft gewonnen!";
      this.winst1.innerHTML = "Winsten: " + this.teller1;
    } else {
      this.teller2++;
      this.beurt.innerHTML = "Speler 2 heeft gewonnen!";
      this.winst2.innerHTML = "Winsten: " + this.teller2;
    }
  }
  speelWeer = () => {
    const vakjesHTML = document.querySelectorAll(".container > div");
    vakjesHTML.forEach((element) => {
      element.style.backgroundColor = "rgba(255, 255, 255, 0)";
    });

    for (let rij = 0; rij < 6; rij++) {
      for (let kolom = 0; kolom < 7; kolom++) {
        this.modelBord.vakjes[rij][kolom] = "leeg";
      }
    }
    this.controllerBord.active = true;
    this.message.classList.toggle("hidden");
    this.beurtViewUpdate(this.controllerBord.beurtNum);
  };
}
