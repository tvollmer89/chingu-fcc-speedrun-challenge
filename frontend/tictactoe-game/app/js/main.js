/*
Global Variables
 */
var game, board, playerID, compID, currentPlayer, endMessage;

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
    moves: 1,
  };
  $('#choiceModal').modal('show');
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
  newGame();
});
