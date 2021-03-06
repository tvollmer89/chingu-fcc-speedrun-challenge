/**
 *  Function to set player token (either X or O)
 *  @param  {string} p player's choice
 *  @return {void}   starts the game
 */

function startGame() {
  $('.cell').text("").removeClass('user comp').addClass('empty');
  board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  updateBoard(board);
  userMove();
}

function updateBoard(b) {
  b.forEach(function(el, i) {
    var cellId = '#' + i.toString();
    if (el === -1) {
      $(cellId).text(game.user).addClass('user');
    } else if (el === 1) {
      $(cellId).text(game.comp).addClass('comp');
    }
  });
}

/**
 *  Allows user to take turn, adds click function to available cells.
 *  @return {void} Updates board with user's move and either advances turn to computer or ends game
 */
function userMove() {
  game.currentPlayer = 'user';
  $('.cell:empty').click(function() {
    $(this).removeClass('empty');
    var cellNum = parseInt($(this).attr('id'));
    board[cellNum] = -1;
    updateBoard(board);

    if(gameOver(board)) {
      var result = gameOver(board);
      setTimeout(endGame(result),(result === 'win') ? 700 : 100);
    } else {
      setTimeout(compMove, 10);
    }
    $('.cell').off();
  });
}

/**
 *  Contructs move that computer player will make
 *  @return {void} Fills a square with computer move then either advances the turn or ends game
 */
function compMove() {
  game.currentPlayer = 'comp';
  console.log(game.currentPlayer);
  miniMax(board, game.currentPlayer);
  board[cMove] = 1;
  $('#'+cMove.toString()).removeClass('empty');
  updateBoard(board);

  // Game over or player turn
  if(gameOver(board)) {
    var result = gameOver(board);
    setTimeout(endGame(result),(result === 'win') ? 700 : 100);
  } else {
    userMove();
  }
}

/**
 *  Get the score of given state of the board
 *  @param  {array} b Current state of the board
 *  @return {int}   Score based on status of the game
 */
function score(b) {
  var s = gameOver(b);
  if (s === 'win') {
    return 10;
  } else if (s === 'lose') {
    return -10;
  } else if (s === 'draw'){
    return 0;
  }
}

/**
 *  Calculate the next move for the computer player, depth set at 3 for medium skill level
 *  @param  {array} state  current board state array
 *  @param  {string} playerID current player
 *  @param  {num}    d     counter for recursive
 *  @return {score}        Value of the state of the board
 */
function miniMax(state, player) {
  var s = gameOver(state);
  if (s === 'win') {
    return 10;
  } else if (s === 'lose') {
    return -10;
  } else if (s === 'draw'){
    return 0;
  }

  var moves = [], scores = [];

  openCells(state).forEach(function(cell) {
    state[cell] = (player === 'comp') ? 1 : -1;
    scores.push(miniMax(state, (player === 'comp') ? 'opponent' : 'comp'));
    moves.push(cell);
    state[cell] = 0;
  });

  //scores.sort(function(a, b){return b-a});
  var n = Math.random()*100;
  if (player === 'opponent' && n >= 10) {
    cMove = moves[scores.indexOf(Math.max.apply(Math, scores))];
    return Math.max.apply(Math, scores);
  } else {
    cMove = moves[scores.indexOf(Math.min.apply(Math, scores))];
    return Math.min.apply(Math, scores);
  }

}

/**
 *  Find current empty cells
 *  @param  {array} b array of cells
 *  @return {array}   array listing of open cells
 */
function openCells(b) {
  return b.map(function(curr, idx) {
    if (!curr) {
      return idx;
    }
  }).filter(function(e) {
    return (typeof e !== "undefined");
  });
}

/**
 *  Determine if game is over, Displays end message if over -
 *  "You Won!", "You Lost!", "It's a Draw!"
 *  @return {string/bool} If game is over, returns true if not, returns false
 */
function gameOver(b) {
  var playedCells = b.reduce(function(prev, cur) {
    return Math.abs(prev) + Math.abs(cur);
  });

  var result = winCombos.map(function(combos) {
    return combos.map(function(c) {
      return board[c];
    }).reduce(function(prev, cur) {
      return prev + cur;
    });
  }).filter(function(total) {
    return Math.abs(total) === 3;
  });

  if (result[0] === 3) {
    return 'lose';
  } else if (result[0] === -3) {
    return 'win';
  } else if (playedCells === 9) {
    return 'draw';
  } else {
    return false;
  }
}

/**
 *  Display game over message and restart the game.
 *  @return {void}
 */
function endGame(r) {
  //show end game modal
  if (r === 'win') {
    gameMessage = "You won! Play again?";
  } else if (r === 'lose') {
    gameMessage = "You lost! Play again?";
  } else if (r === 'draw') {
    gameMessage = "It's a draw! Play again?";
  }
  newGame();
}