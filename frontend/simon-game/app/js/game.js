/**
 *  creting the game object
 *  @type {Object}
 */
let game = {};

game.init = function() {
  this.level = 1;
  this.turn = 0;
  this.score = 0;
  this.strict = false;
  this.sequence = [];
  this.active = false; // false until player presses start
  this.locked = true;
}

game.reset = function(){
  this.init();
  document.getElementById("score").innerHTML = "--";
}
/**
 *  Generate the computer's planned sequence
 *  @return {[type]} [description]
 */
game.genSequence = function(){
  let colors = ["g", "r", "y", "b"];
  for(let i=0; i<20; i++){
    this.sequence.push(colors[Math.floor(Math.random() * 4)]);
  }
}

game.playerTurn = function(a){
  if(a === "start"){
    this.locked = false;
    $('.color-btn').toggleClass('clickable', true);
  } else {
    this.locked = true;
    $('.color-btn').toggleClass('clickable', false);
    if(this.active == true){
      game.dTimer = setTimeout(displaySequence(), 2000);
    }
  }
};

game.erMessage = function(msg){
  //lock button clicks
  this.locked = true;
  $('.color-btn').toggleClass('clickable', true);

  //update score text
  $('#score').text(msg);

  let sBox = function(){
    $('.score-box').addClass('off');
    game.erTimeout = setTimeout(function(){
      $('.score-box').removeClass('off');
    },250);
  };
  let count = 0;
  sBox();
  game.erInterval = setInterval(function(){
    sBox();
    count++;
    if(count === 3)
      clearInterval(game.erInterval);
  },500)
  clearTimeout(this.eTimer);
};

game.handleError = function(){
  game.erMessage("!!");
  if(this.strict === true){
    game.reset();
  }
}


