const express = require('express');
const { Game } = require('./game.js');
const { serveTicTacToePage } = require('./ticTacToeHandler.js');

const auth = (req, res, next) => {
  if (!req.session.isPopulated) {
    res.redirect('/login');
    return;
  }
  next();
};

const gameHandler = game => (req, res) => {
  if (game.isReady()) {
    game.makeMove(req.body.move);
    if (!game.isOver()) {
      game.nextPlayer();
    }
  }
  res.json(game.status());
};

const serveGameStatus = game => (req, res) => {
  const { currentPlayerId, players } = game.status();
  const board = Array(9).fill('').map((_, index) => {
    let cell = '';
    players.forEach(({ symbol, moves }) => {
      if (moves.includes(index + 1)) cell = symbol;
    });
    return cell;
  });

  res.json({ currentPlayerId, board });
};

const createGameRouter = (game, templateRoot, readFile) => {
  const gameRouter = express.Router();

  gameRouter.use(auth);
  gameRouter.get('/', serveTicTacToePage(templateRoot, readFile));
  gameRouter.get('/api', serveGameStatus(game));
  gameRouter.post('/', gameHandler(game));
  return gameRouter;
};

module.exports = { createGameRouter };
