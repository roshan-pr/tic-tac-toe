const fs = require('fs');
const request = require('supertest');
const { createApp } = require("../src/app");

const appConfig = {
  staticRoot: 'public',
  templateRoot: 'template',
};

const session = { name: 'session', keys: ['secretKey'] };

const readFile = filename => fs.readFileSync(filename, 'utf-8');

describe('/ticTacToe', () => {
  it('Should redirect to login page for unauthorized user', (done) => {
    const app = createApp(appConfig, session, readFile);
    // No cookie is set
    request(app)
      .get('/ticTacToe')
      .expect('location', '/login')
      .expect(302, done)
  });
});

describe('/login', () => {
  it('Should serve login page', (done) => {
    const app = createApp(appConfig, session, readFile);
    // No cookie is set
    request(app)
      .get('/login')
      .expect(/Login Page/)
      .expect(200, done)
  });
});

describe('/login', () => {
  it('Should set cookie for new user', (done) => {
    const app = createApp(appConfig, session, readFile);
    // No cookie is set
    request(app)
      .post('/login')
      .send('username=ram')
      .expect('Set-Cookie', /.*/)
      .expect(302, done)
  });
});
