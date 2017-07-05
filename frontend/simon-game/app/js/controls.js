$('#start').click(function(){
  console.log('Start the game');
});

$('#switch').click(function() {
  //turn off
  if($(this).hasClass('on')){
    game.reset;
    $('#light').toggleClass("on", false);
  }
  $(this).toggleClass("on");
  $('.controls-container').toggleClass("power-off");
  $('.btn').prop('disabled', function(i, v) { return !v; });
  /**
   * need to toogle this when not player's turn here is only temporary
   */
  $('.color-btn').toggleClass('clickable');
});

$('#strict').click(function() {
  $('#light').toggleClass("on");
});

$('.color-btn').click(function(e) {
  $(this).addClass('light');
  let c = e.target.id;
  let audio = document.getElementById(`audio-${c}`);
  audio.play();
  /**

    TODO:
    - remove '.light' class when audio is finished playing

   */

})
