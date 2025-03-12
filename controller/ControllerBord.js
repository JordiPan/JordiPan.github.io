import {ModelBord} from "../model/ModelBord.js";
import {ViewBord} from "../view/ViewBord.js";
export class ControllerBord {
    constructor() {
       
        this.model = new ModelBord();
        this.view = new ViewBord();
        //op dit moment geen idee over bind this
        this.view.bindMakeBoard(this.handleStart.bind(this))
        this.view.bindStop(this.handleStop.bind(this))
        this.view.bindPlaceChip(this.handlePlacing.bind(this))
        this.view.bindRematch(this.handleRematch.bind(this))
    }

    async handleStart(event) {
        if (this.model.checkDuplicateNames(this.view.getNames())) {
            alert('Namen mogen niet hetzelfde zijn/AI mag niet dezelfde naam hebben als speler');
            return;
        }

        this.model.makeModelBoard();
        this.model.setgameMode(this.view.getGamemode());
        this.model.setNames(this.view.getNames());
        this.model.decideFirst();

        this.view.toggleTitle();
        this.view.setNames(this.model.getNames());
        this.view.makeBoard(event);
        this.view.hideStartWindow();
        await this.view.decideFirst(this.model.getNames(), this.model.getTurn());

        this.checkForAiMove();
        // this.view.updateTurn(this.model.getTurn());
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

        //kolom is vol (misschien shake animatie toevoegen)
        if(!placement) {
            return;
        }
        
        this.view.placeChip(this.model.getPlacement(), this.model.getColor());
        let winner = this.model.checkWinner(placement);

        if(winner == 'draw') {
            this.view.endGame(winner);
            return;
        }
        
        if(winner) {
            let stats = this.model.updateWins(winner);
            this.view.updateWins(stats);
            this.view.endGame(winner);
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
        await this.view.decideFirst(this.model.getNames(), this.model.getTurn());
        
        this.checkForAiMove();
        // this.view.updateTurn(this.model.getTurn());
    }
    changeTurns() {
        this.model.switchTurn();
        this.view.updateTurn(this.model.getTurn());
        
        this.checkForAiMove();
    }
    checkForAiMove() {
        if(this.model.isAiTurn()) {
            this.handlePlacing(this.model.getAiMove());
            
        }
    }
}   