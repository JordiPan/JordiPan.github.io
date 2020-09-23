let vakjes = new Array(6);
for (let i = 0; i < 6; i++) {
    vakjes[i] = new Array(7);
}

let el = document.querySelector(".container");
el.addEventListener('click' , event => {
    handleClick(event);
})

function handleClick(event)
{
    let teller=0;
    console.log(event);
    const vakjesHTML=document.querySelectorAll('.container > div');
    vakjesHTML.forEach(element => {
        if(element===event.target)
        {
            console.log(teller%7);
        }
        teller++;
    })
}


/*function test() {

    id = 0;

    for (i = 0; i < 1; i++) {
        el[i] = id;
        console.log(el);
        id++;
    }
}

test();
*/
