import { Model } from "../model/Model.js";
import { BaseController } from "./BaseController.js";
//TODO: de bord met scores en beurten kan waarschijnlijk liever gegenereerd in de script ipv html
export class Controller extends BaseController {
    constructor(View) {
        super(View);
        this.model = new Model();
        this.handleStart();
    }

    async handleStart() {
        this.view.setElements();
        this.model.makeModelBoard();
        this.model.setgameMode(this.view.getGamemode());

        if(this.model.getGameMode() == 'ai') {
            this.model.setDifficulty(this.view.getDifficulty());
        }

        this.model.setNames(this.view.getNames());
        this.model.decideFirst();

        this.view.setNames(this.model.getNames());
        this.view.renderBoard();
        this.view.showPlayingField();
        await this.view.decideFirst(this.model.getNames(), this.model.getTurnColor());

        await this.checkForAiMove();
    }

    handleStop() {
        this.model.resetTurnCount();
        this.model.resetPlayers();
        this.view.hidePlayingField();
    }
    //kan meer opgesplitst worden placing/winnaar checking/verander beurt
    handlePlacing(colPlacement) {
        let placement = this.model.placeModelChip(colPlacement);

        //TODO: kolom is vol (misschien shake animatie toevoegen)
        if(!placement) {
            return;
        }

        this.view.placeChip(this.model.getBoard());

        let gamestate = this.model.checkWinner(placement);
        if(gamestate === 1) {
            this.view.endGame(null);
            return;
        }
        
        if(gamestate === 2) {
            let winnerColor = this.model.getTurnColor();
            this.model.updateWins(winnerColor);

            this.view.setWins(this.model.getWins());
            this.view.endGame(this.model.getTurnName());
            return;
        }
        
        this.changeTurns();
    }
    async handleRematch() {
        this.model.resetTurnCount();
        this.model.makeModelBoard();
        this.model.decideFirst();

        this.view.renderBoard();
        this.view.hideResultsWindow();
        await this.view.decideFirst(this.model.getNames(), this.model.getTurnColor());
        
        this.checkForAiMove();
    }
    changeTurns() {
        this.model.switchTurn();
        this.view.updateTurn(this.model.getTurnName(), this.model.getTurnColor());
        
        this.checkForAiMove();
    }
    //TODO: misschien kan de controller liever direct aimodel roepen ipv model die de functies heeft?
    async checkForAiMove() {
        if(!this.model.isAiTurn()) {
            return;
        }

        this.view.toggleInteractivity();
        const col = await this.model.makeAiMove();
        this.view.toggleInteractivity();
        this.handlePlacing(col);
    }
    cleanup() {
        this.model = null;
        super.cleanup();
    }
}   
