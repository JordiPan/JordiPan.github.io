import { BaseController } from "./BaseController.js";
//Backend server houd the bord bij (basically model)

//Ik wil zo min mogelijk emits doen btw, dus de server doet veel logica zelf zonder controller 
export class OnlineController extends BaseController {
    constructor(View, Client) {
        super(View);
        this.client = Client;
        this.client.on("startGame", (turnColor) => {this.handleStart(turnColor)})
        this.client.on("updateBoard", () =>{this.updateBoard()})
    }
    async handleStart(turnColor) {
        const namesArray = this.client.getNames();
        this.view.toggleTitle();
        this.view.setNames(namesArray);
        this.view.renderBoard();
        this.view.hideStartWindow();
        await this.view.decideFirst(namesArray, turnColor);

        if(this.client.getPlayerColor() != turnColor) {
            this.view.toggleInteractivity();
        }
    }
    startOnlineGame() {
        this.client.startGame();
    }
    handleStop() {

    }
    async handlePlacing(placementCol) {
        this.view.toggleInteractivity();
        const result = await this.client.placeChip(placementCol);
        //kolom vol kan gecheckt worden via board van OGH/client
        if (result === 3) {
            alert("KOLOM IS VOL")
            this.view.toggleInteractivity();
        }
    }
    async handleRematch(event) {

    }

    //update view turnname, update board chips, update interactivity, 
    updateBoard() {
        const room = this.client.getRoom();
        this.view.placeChip(room.board);
        console.log(room.gameState)
        switch(room.gameState) {
            case 0: {
                this.view.updateTurn(room.turn.name, room.turn.color);

                if(this.client.getPlayerColor() === room.turn.color) {
                    this.view.toggleInteractivity();
                }
                break;
            }
            case 1: {
                this.view.toggleInteractivity();
                this.view.endGame();
                break;
            }
            case 2: {
                const wins = this.client.getWins();
                console.log(wins);
                this.view.toggleInteractivity();
                this.view.endGame(room.turn.name);
                this.view.updateWins(wins[0], wins[1])
                break;
            }
        }
    }

    cleanup() {
        super.cleanup();
        this.client = null;
    }
}