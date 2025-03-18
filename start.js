import {Controller} from "./controller/Controller.js";
window.addEventListener("load", function(){
    new Controller();
    new OnlineGameHandler().initialize();
}, false);