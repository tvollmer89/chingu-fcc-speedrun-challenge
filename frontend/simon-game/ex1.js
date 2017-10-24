//GLOBAL SETTINGS
var cpuMoves, strictMode;

//PANEL BUTTONS

//handlers for #start-new are also in place in the CPU and Player gameplay functions.
$('#start-new').click(startNewGame);

$('#strict-select').click(function(){
 strictMode = !strictMode; $('#strict').toggleClass('highlighted');
});

//GAMEPLAY FUNCTIONALITY
function startNewGame(){
  $('.s-button').off();
  $('#start-new').off();
  cpuMoves = [getRandom(1, 4)];
  cpuTurn();
}

function cpuTurn(){
  $('.s-button').removeClass('active');
  $('#start-new').off();

  $('#start-new').click(function(){
    clearInterval(nIntervalID);
    startNewGame();
  });

  var counter = cpuMoves.length;
  $('#simon-display').text(counter);

  var i = 0;
  var nIntervalID = setInterval(function(){
    if (counter > 0){
    showMove(cpuMoves[i]);
    counter--;
    i++;
    } else {
      playerTurn();
      clearInterval(nIntervalID);
    }
  },200 + getGameSpeed());
}

function playerTurn(){
  $('#start-new').off();
  $('#start-new').click(startNewGame);
  $('.s-button').addClass('active');

  var counter = cpuMoves.length;
  var i = 0;
  $('.s-button').mousedown(function(){
    counter--;
    var id = $(this).data('simon-index');

    sounds['a' + id].play();

    if (id !== cpuMoves[i]) {
      //INCORRECT STATE
      $('.s-button').off();

      $('#simon-display').text('XXX');

      if (strictMode) {
        setTimeout(startNewGame,3000);
      } else {
        setTimeout(cpuTurn,1500);
      }
    } else if (!counter) {
        //CORRECT STATE
      $('.s-button').off();
      if (cpuMoves.length === 20){
        $('#simon-display').text('WIN');
        setTimeout(startNewGame,3000);
    } else {
        cpuMoves.push(getRandom(1,4));
        setTimeout(cpuTurn,1000);
        }
    }

    i++;
  });
}

//UTILITIES
function showMove(move){
  var el = $('.s-button[data-simon-index="' + move + '"]');
  var highlightClass = 'button-' + move + '-lighten';

  sounds['a' + move].play()
  el.addClass(highlightClass);
  setTimeout(function(){
    el.removeClass(highlightClass);
  },getGameSpeed());
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getGameSpeed(){
  var round = cpuMoves.length;

  if (round < 5){
    return 500;
  } else if (round < 9) {
    return 400;
  } else if (round < 13) {
    return 300;
  } else {
    return 200;
  }
}

//SOUNDS
var sounds = {};
var synth = new Tone.Synth().toMaster()

sounds.a1 = {
  play: function() {
    synth.triggerAttackRelease('E3', '8n');
  }
};
sounds.a2 = {
  play: function() {
    synth.triggerAttackRelease('A4', '8n');
  }
};
sounds.a3 = {
  play: function() {
    synth.triggerAttackRelease('C#4', '8n');
  }
};
sounds.a4 = {
  play: function() {
    synth.triggerAttackRelease('E4', '8n');
  }
};

// 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'
