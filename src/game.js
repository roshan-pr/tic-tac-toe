const { Player } = require('./player.js');

const createPlayer = (name, nthPlayer) => {
  const symbols = ['x', 'o'];
  const id = 'p'.concat(nthPlayer + 1);
  return new Player(id, name, symbols[nthPlayer]);
};

class Game {
  players;
  currentPlayerIndex;

  constructor() {
    this.players = [];
    this.currentPlayerIndex = 0;
  }

  addPlayer(name) {
    const player = createPlayer(name, this.players.length);
    this.players.push(player);
  }

  isPossibleMove(move) {
    return this.players.every(player => player.isPossibleMove(move));
  }

  nextPlayer() {
    this.currentPlayerIndex++;
    const numberOfPlayers = this.players.length;
    this.currentPlayerIndex = this.currentPlayerIndex % numberOfPlayers;
  }

  makeMove(move) {
    const player = this.players[this.currentPlayerIndex];
    if (this.isPossibleMove(move)) {
      player.logMove(move);
      this.nextPlayer();
    }
  };

  status() {
    const players = this.players.map(player => {
      return player.getInfo();
    });

    const { id } = this.players[this.currentPlayerIndex].getInfo();
    return { currentPlayerId: id, players };
  }

}

module.exports = { Game };
