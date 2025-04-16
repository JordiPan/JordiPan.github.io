import { BaseController } from "./BaseController.js";
//Backend server houd the bord bij (basically model)

//Ik wil zo min mogelijk emits doen btw, dus de server doet veel logica zelf zonder controller en dingen zoals rematch is non consensual
export class OnlineController extends BaseController {
    constructor(View, Client) {
        super(View);
        this.client = Client;
        this.client.on("startGame", (turnColor) => {this.handleStart(turnColor)})
        this.client.on("updateBoard", () =>{this.updateBoard()})
        this.client.on("rematch", (turnColor) =>{this.rematch(turnColor)})
        this.client.on("stopGame", () =>{this.stopGame()})
    }
    async handleStart(turnColor) {
        const names = this.client.getNames();
        const wins = this.client.getWins();
        this.view.setNames(names);
        this.view.setWins(wins);
        this.view.renderBoard();
        this.view.showPlayingField();
        await this.view.decideFirst(names, turnColor);

        this.disableIfNotTurn(turnColor);
    }
    startOnlineGame() {
        this.client.startGame();
    }

    handleStop() {
        this.client.stopGame();
    }

    async handleRematch() {
        this.client.rematch();
    }

    async handlePlacing(placementCol) {
        this.view.toggleInteractivity();
        const valid = this.client.checkValidColumn(placementCol);
        if (!valid) {
            alert("KOLOM IS VOL");
            this.view.toggleInteractivity();
            return;
        }
        await this.client.placeChip(placementCol);
    }
    /* GAMESTATES
      0=geen winnaar, ga door
      1=gelijkspel
      2=winnaar SPOTTED
    */
    updateBoard() {
        const room = this.client.getRoom();
        this.view.placeChip(room.board);
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
                this.view.endGame(null);
                break;
            }
            case 2: {
                const wins = this.client.getWins();
                this.view.toggleInteractivity();
                this.view.endGame(room.turn.name);
                this.view.setWins(wins)
                break;
            }
        }
    }

    async rematch(turnColor) {
        const namesArray = this.client.getNames();
        this.view.renderBoard();
        this.view.hideResultsWindow();
        await this.view.decideFirst(namesArray, turnColor);
        this.disableIfNotTurn(turnColor);
    }

    disableIfNotTurn(turnColor) {
        if(this.client.getPlayerColor() != turnColor) {
            this.view.toggleInteractivity();
        }
    }

    cleanup() {
        super.cleanup();
        this.client = null;
    }
}