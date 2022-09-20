/*jshint esversion: 6 */

const player0El = document.querySelector('.player_0');
const player1El = document.querySelector('.player_1');
const score0El = document.querySelector('#score_0');
const score1El = document.getElementById('score_1');
const current0El = document.getElementById('current_0');
const current1El = document.getElementById('current_1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn_new');
const btnRoll = document.querySelector('.btn_roll');
const btnHold = document.querySelector('.btn_hold');

let scores, currentScore, activePlayer, playing, playerOneName, playerTwoName;

// DOM Loaded
document.addEventListener('DOMContentLoaded', function() {

  playerOneName = prompt('Please enter player 1 name:');
  playerTwoName = prompt("please enter player 2 name:");
  if(playerOneName == ""){
    playerOneName = "Player 1";
  }
  if(playerTwoName == ""){
    playerTwoName = "Player 2";
  }
  document.getElementById("name_0").textContent = playerOneName;
  document.getElementById("name_1").textContent = playerTwoName;
  startNewGame();

});

// New Button Clicked
btnNew.addEventListener('click', startNewGame);

// Roll Button Clicked
btnRoll.addEventListener('click', handleRoll);

// Hold Button Clicked
btnHold.addEventListener('click', handleHoldButton);

/**
 * This method initialize the game basic configurations,
 * And initialize new game for players
 **/
 function startNewGame() {

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player_winner');
  player1El.classList.remove('player_winner');
  player0El.classList.add('player_active');
  player1El.classList.remove('player_active');
  
}

/**
 * This method handle the random generating numbers for dice,
 * And then assign it for the active player
 **/
 function handleRoll() {

  // Check if game is running and players are not finished
  if (playing) {
    // 1. Generating a random dice roll between (1 and 6)
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `assets/images/dice-${dice}.png`;

    // 3. Check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current_${activePlayer}`).textContent = currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }

}

/**
 * By calling this method the current score of active player will
 * be saved and switch playing turn for another player
 **/
 function handleHoldButton() {

  // Check if game is running and players are not finished
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;

    document.getElementById(`score_${activePlayer}`).textContent =
    scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      finishGame();
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }

}

 /**
  * This method swith playing turn to the next player
  **/
  function switchPlayer() {

    document.getElementById(`current_${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player_active');
    player1El.classList.toggle('player_active');

  }


 /**
  * This method finish the game
  **/
  function finishGame(){

    playing = false;
    diceEl.classList.add('hidden');
    document.querySelector(`.player_${activePlayer}`).classList.add('player_winner');
    document.querySelector(`.player_${activePlayer}`).classList.remove('player_active');
    alert("Congratulations " + (activePlayer === 0 ? playerOneName : playerTwoName) + ", You are the winner!!!");
    
  }
