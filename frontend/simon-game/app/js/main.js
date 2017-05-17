/*
Global Variables
 */
var game, playerID, compID, currentPlayer, gameMessage;
var cMove = 0;
var board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

/**
 *  Begins a new game. Initializes game object and board to blank.
 *  Board values: 0 = empty, 1 = computer, -1 = user
 *  @return void displays modal for user to make selection
 */
function newGame(){
  game = {
    user: '',
    comp: '',
    currentPlayer: '',
    moves: 0,
    over: false
  };
  $('#game-message').text(gameMessage);

  $('#choiceModal').modal({backdrop:false, keyboard:false}).modal('show');
};

// Set player choice
$('#player-x').on('click', function () {
  $('#choiceModal').modal('hide');
  game.user = 'X';
  game.comp = 'O';
  startGame();
});

$('#player-o').on('click', function () {
  $('#choiceModal').modal('hide');
  game.user = 'O';
  game.comp = 'X';
  startGame();
});

$(document).ready(function() {
  gameMessage = "Tic Tac Toe";
  newGame();
});
