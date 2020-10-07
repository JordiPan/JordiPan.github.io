import {Bord} from "../model/Bord.js"
import {BordView} from "../view/BordView.js"

export class Controller {
constructor() {
this.bord = new Bord();
this.bordView = new BordView();
}
}