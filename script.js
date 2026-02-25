let players = document.querySelectorAll(".player");

let lastRandom;

function game () {
    setInterval (() => {
        // Random Player becomes visible
        players.forEach( player => {
            player.classList.remove("active");
        })
        let random; 

        do {
            random = Math.floor(Math.random() * players.length);
        } while ( random === lastRandom)
        
        players[random].classList.add("active");

        setTimeout(() => {
            // That random player disappears after a short period of time
            players[random].classList.remove("active")
        }, 500);

        lastRandom = random;

    }, 1000)
}

game();