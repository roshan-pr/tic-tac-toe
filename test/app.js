const assert = require('assert');
const fs = require('fs');
const request = require('supertest');
const { createApp } = require('../src/app.js');
const { Game } = require('../src/game.js');

const appConfig = {
  staticRoot: 'public',
  templateRoot: 'template',
};

const session = { name: 'session', keys: ['secretKey'] };

const readFile = filename => fs.readFileSync(filename, 'utf-8');

describe('end points', () => {
  let game;
  let app;
  beforeEach(() => {
    game = new Game(2);
    app = createApp(game, appConfig, session, readFile);
  });

  describe('/ticTacToe', () => {
    it('Should redirect to login page for unauthorized user', (done) => {
      // No cookie is set
      request(app)
        .get('/tic-tac-toe')
        .expect('location', '/login')
        .expect(302, done)
    });
  });

  describe('/login', () => {
    it('Should serve login page', (done) => {
      // No cookie is set
      request(app)
        .get('/login')
        .expect(/Login Page/)
        .expect(200, done)
    });

    it('Should set cookie for new user', (done) => {
      // No cookie is set
      request(app)
        .post('/login')
        .send('username=ram')
        .expect('Set-Cookie', /.*/)
        .expect(302, done)
    });
  });

  describe('/tic-tac-toe', () => {
    it('Should start the game', () => {
      game.addPlayer(1, 'ram');
      game.addPlayer(2, 'raj');

      assert.ok(game.isReady());
    });
  });
});
