"use strict";

// ========== ELEMENT SELECTORS ==========
const playerSection = [
  document.querySelector(".player--0"),
  document.querySelector(".player--1"),
];
const scoreDisplay = [
  document.getElementById("score--0"),
  document.getElementById("score--1"),
];
const currentDisplay = [
  document.getElementById("current--0"),
  document.getElementById("current--1"),
];

const diceImg = document.querySelector(".dice");
const newGameBtn = document.querySelector(".btn--new");
const rollBtn = document.querySelector(".btn--roll");
const holdBtn = document.querySelector(".btn--hold");

// ========== GAME VARIABLES ==========
let totalScores, currentTurnScore, active, isGameActive;

// ========== INITIAL GAME SETUP ==========
const resetGame = () => {
  totalScores = [0, 0];
  currentTurnScore = 0;
  active = 0;
  isGameActive = true;

  scoreDisplay[0].textContent = 0;
  scoreDisplay[1].textContent = 0;
  currentDisplay[0].textContent = 0;
  currentDisplay[1].textContent = 0;

  diceImg.classList.add("hidden");

  playerSection[0].classList.remove("player--winner", "player--inactive");
  playerSection[1].classList.remove("player--winner", "player--inactive");

  playerSection[0].classList.add("player--active");
  playerSection[1].classList.remove("player--active");
};
resetGame();

// ========== SWITCH PLAYER ==========
const switchPlayer = () => {
  currentDisplay[active].textContent = 0;
  currentTurnScore = 0;
  active = active === 0 ? 1 : 0;

  playerSection[0].classList.toggle("player--active");
  playerSection[1].classList.toggle("player--active");
};

// ========== ROLL DICE ==========
rollBtn.addEventListener("click", () => {
  if (!isGameActive) return;

  const rolledNumber = Math.trunc(Math.random() * 6) + 1;
  diceImg.src = `dice-${rolledNumber}.png`;
  diceImg.classList.remove("hidden");

  if (rolledNumber !== 1) {
    currentTurnScore += rolledNumber;
    currentDisplay[active].textContent = currentTurnScore;
  } else {
    switchPlayer();
  }
});

// ========== HOLD SCORE ==========
holdBtn.addEventListener("click", () => {
  if (!isGameActive) return;

  totalScores[active] += currentTurnScore;
  scoreDisplay[active].textContent = totalScores[active];

  if (totalScores[active] >= 100) {
    isGameActive = false;
    diceImg.classList.add("hidden");

    playerSection[active].classList.add("player--winner");
    playerSection[active].classList.remove("player--active");
  } else {
    switchPlayer();
  }
});

// ========== NEW GAME ==========
newGameBtn.addEventListener("click", resetGame);
