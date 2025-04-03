import { View } from "../view/View.js";
export class BaseController {
    constructor(){
        this.view = new View();
        this.view.bindStop(this.handleStop.bind(this))
        this.view.bindPlaceChip(this.handlePlacing.bind(this))
        this.view.bindRematch(this.handleRematch.bind(this))
    }
    async handleStart(){}
    handleStop() {}
    handlePlacing(placementLocation) {}
    async handleRematch(event){}
    changeTurns() {}
}