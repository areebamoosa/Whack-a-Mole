let players = document.querySelectorAll(".player");
let score = document.getElementById("score");
let timer = document.getElementById("timer");

let gameScore = 0;
let timeLeft = 30;
let lastRandom;

players.forEach((player) => {
  player.addEventListener("click", () => {
    if (player.classList.contains("active")) {
      gameScore++;
      score.textContent = gameScore;
      player.classList.remove("active");
    }
  });
});

function game() {
  let countdown = setInterval(() => {
    timeLeft--;

    timer.textContent = `Time Left : ${timeLeft}`;

    if (timeLeft === 0) {
      clearInterval(countdown);
      clearInterval(gameInterval);
    }
  }, 1000);

  let gameInterval = setInterval(() => {
    players.forEach((player) => {
      // Removing active class from all players initially
      player.classList.remove("active");
    });

    let random;

    do {
      random = Math.floor(Math.random() * players.length);
    } while (random === lastRandom);

    // Enabling active class only on one random player
    players[random].classList.add("active");

    setTimeout(() => {
      // That random player disappears after given period of time
      players[random].classList.remove("active");
    }, 1000);

    lastRandom = random;
  }, 1000);
}

timer.addEventListener("click", () => {
  game();
});