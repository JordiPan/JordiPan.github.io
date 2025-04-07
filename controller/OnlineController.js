import { BaseController } from "./BaseController.js";
//Backend server houd the bord bij (basically model)
export class OnlineController extends BaseController{
    constructor(View) {
        super(View);
    }
    async handleStart(event) {}
    handleStop() {}
    handlePlacing(placementLocation) {}
    async handleRematch(event) {}
    changeTurns() {}
    cleanup() {}
}