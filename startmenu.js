import { OnlineGameHandler } from "./websockets/OnlineGameHandler.js";
// past niet echt in mvc model 
let select = document.getElementById("gamemode");
let player1Field = document.getElementById("player1-name");
let player2Field = document.getElementById("player2-name");
let difficulty = document.getElementById("difficulty");
select.addEventListener("change", () => {
    if (select.value == 'local') {
        difficulty.disabled = true;
        player1Field.disabled = false;
        player2Field.disabled = false;
    }
    else if (select.value == 'ai') {
        difficulty.disabled = false;
        player1Field.disabled = false;
        player2Field.disabled = true;
    }
    else {
        difficulty.disabled = true;
        player1Field.disabled = true;
        player2Field.disabled = true;
    }
});

async function onlineTest() { 
    let serverUrl = 'http://localhost:3000';
    let client = new OnlineGameHandler(serverUrl);
    await client.initialize();
    // client.send("Hello from the client!");
    client.showSocketId();
    client.setUsername("Player");
    //await niet nodig uiteindelijk
    client.createRoom();
    client.getRooms();
}

onlineTest();