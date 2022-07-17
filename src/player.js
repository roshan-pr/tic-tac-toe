class Player {
  #name;
  #symbol;
  #moves;
  #id;
  constructor(id, name, symbol) {
    this.#id = id;
    this.#name = name;
    this.#symbol = symbol;
    this.#moves = [];
  }

  logMove(move) {
    this.#moves.push(move);
  }

  isPossibleMove(move) {
    return !this.#moves.includes(move);
  }

  getInfo() {
    return { id: this.#id, name: this.#name, symbol: this.#symbol, moves: this.#moves }
  }
}

module.exports = { Player };
