let players = document.querySelectorAll(".player");
let score = document.getElementById("score");
let timer = document.getElementById("timer");
let greenBtn = document.querySelector(".greenBtn");
let rules = document.getElementById("rules");
let popup = document.querySelector(".popup");
let closePopup = document.querySelector(".close-popup");
let finalScore = document.querySelector("#final-score");
let highScore = document.querySelector("#highest-score");
let gameOver = document.querySelector(".game-over");
let closeOver = document.querySelector(".close-x");

let gameSound = new Audio("assets/Sounds/Game-sound.mp3");
let missSound = new Audio("assets/Sounds/Miss-sound.mp3");

let timeLeft;
let lastRandom;

let gameScore;
let highestScore;

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
  timeLeft = 30;
  gameScore = 0;
  score.textContent = 0;

  function activateMole() {
    let random;

    do {
      random = Math.floor(Math.random() * players.length);
    } while (random === lastRandom);

    players[random].classList.add("active");

    setTimeout(() => {
      if (players[random].classList.contains("active")) {
        missSound.currentTime = 0;
        missSound.play();
        missedAnimation(players[random]);

        if (gameScore > 0) {
          gameScore--;
          score.textContent = gameScore;
        }
      }

      players[random].classList.remove("active");
    }, 900);

    lastRandom = random;
  }

  activateMole();

  let gameInterval = setInterval(() => {
    activateMole();
  }, 1000);

  let countdown = setInterval(() => {
    timeLeft--;
    timer.textContent = `Time Left : ${timeLeft}S`;

    if (timeLeft === 0) {
      clearInterval(countdown);
      clearInterval(gameInterval);

      highestScore = Number(localStorage.getItem("highestScore")) || 0;

      if (gameScore > highestScore) {
        localStorage.setItem("highestScore", gameScore);
        highestScore = gameScore;
      }

      finalGameScore();
      timer.disabled = false;
      timer.textContent = "START!";
    }
  }, 1000);
}

const finalGameScore = () => {
  gameOver.classList.add("active");
  finalScore.textContent = gameScore;
  highScore.textContent = highestScore;
};

const missedAnimation = (player) => {
  const hole = player.querySelector(".dirt");

  const missText = document.createElement("div");
  missText.textContent = "Missed";
  missText.classList.add("missed");
  hole.appendChild(missText);

  setTimeout(() => {
    hole.removeChild(missText);
  }, 500);
};

timer.addEventListener("click", () => {
  game();
  gameSound.currentTime = 3;
  gameSound.play();
  timer.disabled = true;
});

greenBtn.addEventListener("click", () => {
  greenBtn.classList.add("expanded");
});

rules.addEventListener("click", () => {
  popup.classList.add("active");
});

closePopup.addEventListener("click", () => {
  popup.classList.remove("active");
});
closeOver.addEventListener("click", () => {
  gameOver.classList.remove("active");
});
