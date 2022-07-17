const { Game } = require('./game.js');

const game = new Game();
game.addPlayer('player1');
game.addPlayer('player2');

const moves = [2, 3, 9, 5];

moves.forEach(move => {
  game.makeMove(move);
  console.log(game.status());
});
