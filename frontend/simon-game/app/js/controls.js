/** Event Listeners */

/**
 * Start the game functino
 * @param  {e} ){               game.active true
 * @return {null}     should
 */
$('#start').click(function(){
  game.active = true;
  game.locked = true;
  updateLevelDisplay();
  game.genSequence();
  $('.btn').prop('disabled', true);
  game.dTimer = setTimeout(displaySequence(), 2000);
});

$('#switch').click(function() {
  //turn off
  if($(this).hasClass('on')){
    $('#light').toggleClass("on", false);
    $('.btn').prop('disabled', true);
    game.reset();
  } else{
    $('.btn').prop('disabled', false);
  }
  //turn on and start game
  $(this).toggleClass("on");
  $('.controls-container').toggleClass("power-off");
  game.init();
  /**
   * need to toogle this when not player's turn here is only temporary
   */
});

$('#strict').click(function() {
  $('#light').toggleClass("on");
  game.strict = (game.strict === true)?false: true;
  console.log(game);
});

$('.color-btn').click(function(e) {
  let c = e.target.id;
  playerMove(c);
  game.locked = true;
  $('.color-btn').toggleClass('clickable', true);
  //game.erMessage("!!");
});
