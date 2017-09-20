function createGame(s){
  return {
    score: 0,
    level: 1,
    strict: (!s)? false : true,
    locked: true,
    sequence: []
  }
}

let game = createGame();