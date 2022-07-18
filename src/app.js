const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const cookieSession = require('cookie-session');
const { addPlayer, serveLoginPage } = require('./loginHandler.js');
const { assignSession } = require("./session.js");
const { createGameRouter } = require("./gameHandler");
const { Game } = require('./game.js');
const { logout } = require('./logout.js');

const redirectToGame = (req, res) => {
  res.redirect('/tic-tac-toe');
  res.end();
};

const createApp = (game, config, session, readFile) => {
  const { staticRoot, templateRoot } = config;

  const time = new Date().toLocaleString().split(' ')[1];
  let logStream = fs.createWriteStream(`.log/logRequest_${time}.txt`);
  logStream = process.stdout;
  const app = express();
  app.use(morgan('tiny', { stream: logStream }));

  app.use(cookieSession(session));
  app.use(express.urlencoded({ extended: true }));

  app.get('/login', serveLoginPage(templateRoot, readFile));
  app.post('/login', assignSession, addPlayer(game), redirectToGame);
  app.get('/logout', logout);
  // app.use((req, res, next) => { console.log(req.game); next(); });

  app.use('/tic-tac-toe', createGameRouter(game, templateRoot, readFile));

  app.use(express.static(staticRoot));
  return app;
};

module.exports = { createApp };
