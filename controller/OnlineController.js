import { View } from "../view/View";
//mayhaps interface met dit (niet echt nodig, idk)???
export class OnlineController {
    constructor() {
        this.view = new View();
        this.view.bindMakeBoard(this.handleStart.bind(this))
        this.view.bindStop(this.handleStop.bind(this))
        this.view.bindPlaceChip(this.handlePlacing.bind(this))
        this.view.bindRematch(this.handleRematch.bind(this))
    }
    handleStart(){}
    handlePlacing(){}
    handleRematch(){}
    handleStop(){}
}