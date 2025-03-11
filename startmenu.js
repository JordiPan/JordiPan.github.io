// past niet echt in mvc model 
let select = document.getElementById("gamemode");
let player1Field = document.getElementById("player1-name");
let player2Field = document.getElementById("player2-name");


select.addEventListener("change", () => {
    if (select.value == 'local') {
        player1Field.disabled = false;
        player2Field.disabled = false;
    }
    else if (select.value == 'ai') {
        player1Field.disabled = false;
        player2Field.disabled = true;
    }
    else {
        player1Field.disabled = true;
        player2Field.disabled = true;
    }
});
