const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const { serveLoginPage } = require('./loginHandler.js');
const { serveTicTacToePage } = require('./ticTacToeHandler.js');
const { assignSession } = require("./session.js");

const auth = (req, res, next) => {
  if (!req.session.isPopulated) {
    res.redirect('/login');
    return;
  }
  next();
};

const createApp = (config, session, readFile) => {
  const { staticRoot, templateRoot } = config;
  const app = express();
  app.use(morgan('tiny'));

  app.use(cookieSession(session));
  app.post('/*', express.urlencoded({ extended: true }));

  app.get('/login', serveLoginPage(templateRoot, readFile));
  app.post('/login', assignSession);

  app.get('/ticTacToe', auth, serveTicTacToePage(templateRoot, readFile));

  app.use(express.static(staticRoot));
  return app;
};

module.exports = { createApp };
