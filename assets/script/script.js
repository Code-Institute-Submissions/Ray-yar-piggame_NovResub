/*jshint esversion: 6 */

let scores, currentScore, activePlayer, playing, playerOneName, playerTwoName;

// DOM Loaded
document.addEventListener('DOMContentLoaded', function() {

  playerOneName = prompt('Please enter player 1 name:');
  while (playerOneName == ""){
    playerOneName = prompt('Please enter player 1 name:');
  }

  playerTwoName = prompt("please enter player 2 name:");
  while (playerTwoName == ""){
    playerTwoName = prompt('Please enter player 2 name:');
  }
  
  document.getElementById("player_one_name").textContent = playerOneName;
  document.getElementById("player_two_name").textContent = playerTwoName;
  startNewGame();

});

/**
 * This method initialize the game basic configurations,
 * And initialize new game for players
 **/
 var diceImage = document.getElementById('dice');
 var player_one_score = document.getElementById('player_score_1');
 var player_two_score = document.getElementById('player_score_2');
 var current_one = document.getElementById('current_1');
 var current_two = document.getElementById('current_2');
 var player1 = document.getElementById('player_1');
 var player2 = document.getElementById('player_2');
 
 function startNewGame() {

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 1;
  playing = true;

  player_one_score.textContent = 0;
  player_two_score.textContent = 0;
  current_one.textContent = 0;
  current_two.textContent = 0;

  diceImage.classList.add('hidden');
  player1.classList.remove('player_winner');
  player2.classList.remove('player_winner');
  player1.classList.add('player_active');
  player2.classList.remove('player_active');
  
}

/**
 * This method handle the random generating numbers for dice,
 * And then assign it for the active player
 **/
 function handleRoll() {

  // Check if game is running and players are not finished
  if (playing) {
    // 1. Generating a random dice roll between (1 and 6)
    var dice_number = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceImage.classList.remove('hidden');
    diceImage.src = `assets/images/dice-${dice_number}.png`;

    // 3. Check for rolled 1
    if (dice_number !== 1) {
      // Add dice to current score
      currentScore += dice_number;
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
    scores[activePlayer-1] += currentScore;

    document.getElementById(`player_score_${activePlayer}`).textContent = scores[activePlayer-1];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer-1] >= 100) {
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
    activePlayer = activePlayer === 1 ? 2 : 1;
    player1.classList.toggle('player_active');
    player2.classList.toggle('player_active');

  }


 /**
  * This method finish the game
  **/
  function finishGame(){

    playing = false;
    diceImage.classList.add('hidden');
    document.getElementById(`player_${activePlayer}`).classList.add('player_winner');
    document.getElementById(`player_${activePlayer}`).classList.remove('player_active');
    alert("Congratulations " + (activePlayer === 1 ? playerOneName : playerTwoName) + ", You are the winner!!!");
    
  }
