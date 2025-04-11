import { BaseController } from "./BaseController.js";
//Backend server houd the bord bij (basically model)

//Ik wil zo min mogelijk emits doen btw, dus de server doet veel logica zelf zonder controller 
export class OnlineController extends BaseController {
    constructor(View, Client) {
        super(View);
        this.client = Client;
        this.client.on("startGame", (turnColor) => {this.handleStart(turnColor)})
        this.client.on("updateBoard", (room) =>{this.updateBoard()})
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
        if (!result) {
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
        console.log(room)
        this.view.updateTurn(room.turn.name, room.turn.color);

        if(this.client.getPlayerColor() === room.turn.color) {
            this.view.toggleInteractivity();
        }
    }

    yourTurn() {

    }
    cleanup() {
        super.cleanup();
        this.client = null;
    }
}