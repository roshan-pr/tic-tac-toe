const express = require('express');
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

const serveGameStatus = game => (req, res) => res.json(game.status());

const createGameRouter = (game, templateRoot, readFile) => {
  const gameRouter = express.Router();

  gameRouter.use(auth);
  gameRouter.get('/', serveTicTacToePage(templateRoot, readFile));
  gameRouter.get('/api', serveGameStatus(game));
  gameRouter.post('/', gameHandler(game));
  return gameRouter;
};

module.exports = { createGameRouter };
