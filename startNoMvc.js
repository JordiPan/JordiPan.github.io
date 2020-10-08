import {ControllerBord} from "./controller/ControllerBord.js";
import {ModelBord} from "./model/ModelBord.js";
import {ViewBord} from "./view/ViewBord.js";


let controllerBord = new ControllerBord();


// Maakt automatisch 42 <div> vakjes
/*let container = document.getElementById("cont");
for(let i = 0; i < 42; i++){
    let backside = document.createElement("div");
    backside.className = 'items';
    container.appendChild(backside);
}*/


// Het gaat door elke div in de container af en als je klikt op een div (vak), dan ga je naar de functions plaatsFische() en toonModel().





