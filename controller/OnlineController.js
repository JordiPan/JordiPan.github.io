import { BaseController } from "./BaseController.js";
//Backend server houd the bord bij (basically model)
export class OnlineController extends BaseController {
    constructor(View, Client) {
        super(View);
        this.client = Client;
        this.client.on("startGame", (turnColor) => {this.handleStart(turnColor)})
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
    handlePlacing(placementLocation) {
        
    }
    async handleRematch(event) {

    }
    changeTurns() {

    }
    cleanup() {
        super.cleanup();
        this.client = null;
    }
}