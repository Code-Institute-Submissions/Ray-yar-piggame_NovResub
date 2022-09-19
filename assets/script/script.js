/*jshint esversion: 6 */

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

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
  document.getElementById("name--0").textContent = playerOneName;
  document.getElementById("name--1").textContent = playerTwoName;

});
