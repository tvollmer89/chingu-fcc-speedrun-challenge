/**

  TODO:
  - add checkStatus
  - add compMove
 */

/**
 *  Function to set player token (either X or O)
 *  @param  {string} p player's choice
 *  @return {void}   starts the game
 */

function startGame() {
  console.log(game.user);
  board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  $('.cell').text("").removeClass('user comp').addClass('empty');
  updateBoard(board);
  userMove();
}

function updateBoard(b) {
  console.log(b);
  b.forEach(function(el, i) {
    var cellId = '#' + i.toString();
    if (el === -1) {
      $(cellId).text(game.user).addClass('user');
    } else if (el === 1) {
      $(cellId).text(game.comp).addClass('comp');
    }
  });
}

function userMove() {
  $('.cell:empty').click(function() {
    $(this).removeClass('empty');
    var cellNum = parseInt($(this).attr('id'));
    board[cellNum] = -1;
    updateBoard(board);
    $('.cell').off();

    if(!gameOver()) {
      setTimeout(compMove(), 100);
    } else {
      endGame();
    }
  });
}

function compMove() {
  console.log("computer's turn");
}

/**
 *  Determine if game is over, Displays end message if over -
 *  "You Won!", "You Lost!", "It's a Draw!"
 *  @return {bool} If game is over, returns true if not, returns false
 */
function gameOver() {
  return false;

}

/**
 *  Display game over message and restart the game.
 *  @return {void}
 */
function endGame() {
  //show end game modal
  newGame();
}