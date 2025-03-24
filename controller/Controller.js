import {Model} from "../model/Model.js";
import {View} from "../view/View.js";

//TODO: de bord met scores en beurten kan waarschijnlijk liever gegenereerd in de script ipv html
export class Controller {

    constructor() {
        // this.client = new Client(serverUrl);
        this.model = new Model();
        this.view = new View();
        this.view.bindMakeBoard(this.handleStart.bind(this))
        this.view.bindStop(this.handleStop.bind(this))
        this.view.bindPlaceChip(this.handlePlacing.bind(this))
        this.view.bindRematch(this.handleRematch.bind(this))
    }

    async handleStart(event) {
        // event.preventDefault();
        // if (this.model.checkDuplicateNames(this.view.getNames())) {
        //     alert('Namen mogen niet hetzelfde zijn/AI mag niet dezelfde naam hebben als speler');
        //     return;
        // }
        this.model.makeModelBoard();
        this.model.setgameMode(this.view.getGamemode());

        if(this.model.getGameMode() == 'ai') {
            this.model.setDifficulty(this.view.getDifficulty());

        }

        this.model.setNames(this.view.getNames());
        this.model.decideFirst();

        this.view.toggleTitle();
        this.view.setNames(this.model.getNames());
        this.view.makeBoard(event);
        this.view.hideStartWindow();
        await this.view.decideFirst(this.model.getNames(), this.model.getTurnName());

        await this.checkForAiMove();
        // this.view.updateTurn(this.model.getTurnName());
    }

    handleStop() {
        this.model.resetTurnCount();
        this.model.resetWins();
        this.model.resetNames();

        this.view.resetNames();
        this.view.hidePlayingField();
        this.view.toggleTitle();
    }
    
    handlePlacing(placementLocation) {
        let placement = this.model.placeModelChip(placementLocation);

        //TODO: kolom is vol (misschien shake animatie toevoegen)
        if(!placement) {
            return;
        }
        this.view.placeChip(this.model.getPlacement(), this.model.getColor());
        
        let gamestate = this.model.checkWinner(placement);

        if(gamestate === 1) {
            this.view.endGame(null);
            return;
        }
        
        if(gamestate === 2) {
            let winnerColor = this.model.getColor();
            let stats = this.model.updateWins(winnerColor);
            this.view.updateWins(stats);
            this.view.endGame(this.model.getTurnName());
            return;
        }
        this.changeTurns();
    }
    async handleRematch(event) {
        this.model.resetTurnCount();
        this.model.makeModelBoard();
        this.model.decideFirst();

        this.view.makeBoard(event);
        this.view.hideResultsWindow();
        await this.view.decideFirst(this.model.getNames(), this.model.getTurnName());
        
        this.checkForAiMove();
        // this.view.updateTurn(this.model.getTurnName());
    }
    changeTurns() {
        this.model.switchTurn();
        this.view.updateTurn(this.model.getTurnName());
        
        this.checkForAiMove();
    }
    async checkForAiMove() {
        if(this.model.isAiTurn()) {
            this.view.toggleInteractivity();
            let aiMove = await this.model.getAiMove();
            this.view.toggleInteractivity();
            this.handlePlacing(aiMove);
        }
    }
}   