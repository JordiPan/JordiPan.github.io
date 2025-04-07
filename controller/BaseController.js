export class BaseController {
    constructor(View){
        this.view = View;
        this.boundEvents = new Map();
        this.view.bindStop(this.handleStop.bind(this))
        this.view.bindPlaceChip(this.handlePlacing.bind(this))
        this.view.bindRematch(this.handleRematch.bind(this))
    }
    bindEvent(element, event, handler) {
        
    }
    async handleStart() {}
    handleStop() {}
    handlePlacing(placementLocation) {}
    async handleRematch(event) {}
    changeTurns() {}
    cleanup() {}
}