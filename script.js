let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  tie: 0,
};

function pickComputerMove() {
  let gameText = ["rock", "paper", "scissors"];
  let randomNumber = Math.floor(Math.random() * gameText.length);
  let ramdomMove = gameText[randomNumber];
  let computerMove = "";
  if (ramdomMove === "rock") {
    computerMove = "rock";
  } else if (ramdomMove === "paper") {
    computerMove = "paper";
  } else if (ramdomMove === "scissors") {
    computerMove = "scissors";
  }
  return computerMove;
}

let autoPlay = document.querySelector(".autoPlay");
let isAutoPlaying = false;
let intervalId;

autoPlay.addEventListener("click", () => {
  if (!isAutoPlaying) {
    intervalId = setInterval(function () {
      let playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
});

document.querySelector(".rockBtn").addEventListener("click", () => {
  playGame("rock");
});
document.querySelector(".paperBtn").addEventListener("click", () => {
  playGame("paper");
});
document.querySelector(".scissorsBtn").addEventListener("click", () => {
  playGame("scissors");
});

document.body.addEventListener("keydown", (events) => {
  if (events.key === "r") {
    playGame("rock");
  } else if (events.key === "p") {
    playGame("paper");
  } else if (events.key === "s") {
    playGame("scissors");
  }
});

function playGame(playerMove) {
  let computerMove = pickComputerMove();
  let result = "";
  let PlayerIcons;
  let computerIcons;

  if (computerMove === "rock") {
    computerIcons = "✊";
  } else if (computerMove === "paper") {
    computerIcons = "🖐";
  } else if (computerMove === "scissors") {
    computerIcons = "✌";
  }

  if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie.";
    } else if (computerMove === "paper") {
      result = "You lose.";
    } else if (computerMove === "scissors") {
      result = "You win.";
    }
    PlayerIcons = "✊";
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You win.";
    } else if (computerMove === "paper") {
      result = "Tie.";
    } else if (computerMove === "scissors") {
      result = "You lose.";
    }
    PlayerIcons = "🖐";
  } else if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You lose.";
    } else if (computerMove === "paper") {
      result = "You win.";
    } else if (computerMove === "scissors") {
      result = "Tie.";
    }
    PlayerIcons = "✌";
  }

  if (result === "You win.") {
    score.wins += 1;
  } else if (result === "You lose.") {
    score.losses += 1;
  } else if (result === "Tie.") {
    score.tie += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));

  playerScore();

  document.getElementById("playerResult").innerHTML = `${result}`;

  if (document.getElementById("playerResult").innerHTML === "You win.") {
    document.getElementById("playerResult").style.color = "#2ed573";
  } else if (document.getElementById("playerResult").innerHTML === "Tie.") {
    document.getElementById("playerResult").style.color = "#ffeb3b";
  } else {
    document.getElementById("playerResult").style.color = "red";
  }

  document.getElementById(
    "choicess"
  ).innerHTML = `You <span>${PlayerIcons}</span> - <span>${computerIcons}</span> Computer`;
}

function reset() {
  score.wins = 0;
  score.losses = 0;
  score.tie = 0;
  localStorage.removeItem("score");
  playerScore();
}

function playerScore() {
  let total = score.wins + score.losses + score.tie;
  document.getElementById(
    "playerScore"
  ).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Tie: ${score.tie}, Total: ${total}`;
}

playerScore();

setTimeout(function () {
  document.querySelector(".loaderContainer").style.display = "none";
  document.querySelector("main").style.display = "block";
}, 3000);
