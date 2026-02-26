let players = document.querySelectorAll(".player");
let score = document.getElementById("score");
let timer = document.getElementById("timer");

let gameSound = new Audio("assets/Sounds/Game-sound.mp3");
let missSound = new Audio("assets/Sounds/Miss-sound.mp3");

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
    let random;

    do {
      random = Math.floor(Math.random() * players.length);
    } while (random === lastRandom);

    // Enabling active class only on one random player
    players[random].classList.add("active");

    setTimeout(() => {
      if (players[random].classList.contains("active")) {
        missSound.currentTime = 0;
        missSound.play();

        if (gameScore > 0) {
          gameScore--;
          score.textContent = gameScore;
        }
      }
      // That random player disappears after given period of time
      players[random].classList.remove("active");
    }, 600);

    lastRandom = random;
  }, 1000);
}

timer.addEventListener("click", () => {
  game();
  gameSound.currentTime = 0;
  gameSound.play();
});
