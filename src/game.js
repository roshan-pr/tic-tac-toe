const { Player } = require('./player.js');

const createPlayer = (id, name, nthPlayer) => {
  const symbols = ['x', 'o'];
  return new Player(id, name, symbols[nthPlayer]);
};

class Game {
  #players;
  #currentPlayerIndex;
  #maxPlayers;

  constructor(maxPlayers) {
    this.#players = [];
    this.#currentPlayerIndex = 0;
    this.#maxPlayers = maxPlayers;
  }

  addPlayer(id, name) {
    if (this.isReady()) {
      return;
    }
    const player = createPlayer(id, name, this.#players.length);
    this.#players.push(player);
  }

  #isPossibleMove(move) {
    return this.#players.every(player => player.isPossibleMove(move));
  }

  nextPlayer() {
    this.#currentPlayerIndex++;
    const numberOfPlayers = this.#players.length;
    this.#currentPlayerIndex = this.#currentPlayerIndex % numberOfPlayers;
    return this.#currentPlayerIndex;
  }

  isReady() {
    return this.#players.length === this.#maxPlayers;
  }

  makeMove(move) {
    const player = this.#players[this.#currentPlayerIndex];
    if (this.#isPossibleMove(move)) {
      player.logMove(move);
    }
  };

  isOver() { return false; }

  status() {
    if (this.#players.length <= 0) {
      return {};
    }

    const players = this.#players.map(player => {
      return player.getInfo();
    });

    const { id } = this.#players[this.#currentPlayerIndex].getInfo();
    return { currentPlayerId: id, players };
  }
}

module.exports = { Game };
