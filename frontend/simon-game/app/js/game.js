/**
 *  creting the game object
 *  @type {Object}
 */
var game = {};

game.reset = function() {
  this.init();
  this.strict = false;
}

game.init = function() {
  this.score = 0;
  this.sequence = [];
}