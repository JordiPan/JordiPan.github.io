import { BaseController } from "./BaseController";
//Backend server houd the bord bij (basically model)
export class OnlineController extends BaseController{
    constructor() {
        super();
    }
    async handleStart(event){}
    handleStop() {}
    handlePlacing(placementLocation) {}
    async handleRematch(event){}
    changeTurns() {}
}