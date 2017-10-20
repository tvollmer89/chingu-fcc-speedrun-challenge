/**
 * Check Javacript30 Day 13 on how to use this for time interval
 *
 **/
function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};


/**
 *  Trigger sound and color change when button computer or user
 *  triggers a color
 *  @param  string   color [Color button ID]
 */
function flash(color){
  let c = color;
  let audio = document.getElementById(`audio-${c}`);
  $('#'+c).toggleClass('light');
  audio.play();
  game.cTimer = setTimeout(function(){
   // toggle back after 1 second
   $('#'+c).toggleClass('light');
  },500);
};

function displaySequence(){
  var flTimer = function(c){
      //console.log(game.sequence[i]);
      setTimeout(function(){
        flash(c);
        console.log(game.sequence[i]);
    },2000);
  }
  for(var i=0; i< game.level; i++){
    let c= game.sequence[i];
    flTimer(c);
  }
  clearTimeout(game.dTimer);
  game.playerTurn("start");
}

/**
 *  Update the current level display
 *  @return void
 */
function updateLevelDisplay(){
  let l = ("00" + game.level).slice(-2);
  scoreBox.innerHTML = l;
}

function playerMove(color){
  let c = color;
  if(!game.locked){
    flash(c);
    if(c === game.sequence[game.level-1]){
      game.score++;
      game.level++;
      game.playerTurn("end");
    } else{
      this.active = false;
      game.handleError();
    }
  }
}