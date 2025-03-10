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
        this.view.toggleTitle();
        this.model.makeModelBoard();
        this.model.setNames(this.view.getNames());
        this.model.decideFirst();
        
        this.view.makeBoard(event);
        this.view.setNames(this.model.getNames());
        this.view.hideStartWindow();
        await this.view.funny(this.model.getNames(), this.model.getTurn());
        // this.view.updateTurn(this.model.getTurn());
        
    }

    handleStop() {
        this.model.resetWins();
        this.view.resetBoard();
        this.view.toggleTitle();
    }
    
    handlePlacing(event) {
        let placement = this.model.placeModelChip(event);
        if(!placement) {
            return;
        }
        this.view.placeChip(this.model.getPlacement(), this.model.getColor());
        let winner = this.model.checkWinner(placement);
        if(winner) {
            let stats = this.model.updateWins(winner);
            this.view.updateWins(stats);
            this.view.endGame(winner);
            return;
        }
        this.model.switchTurn();
        this.view.updateTurn(this.model.getTurn());
    }
    async handleRematch(event) {
        this.model.makeModelBoard();
        this.model.decideFirst(event);

        this.view.makeBoard(event);
        this.view.hideResultsWindow();
        await this.view.funny(this.model.getNames(), this.model.getTurn());
        // this.view.updateTurn(this.model.getTurn());
    }
}   