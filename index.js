const fs = require('fs');
const { createApp } = require('./src/app');
const { Game } = require('./src/game');

const appConfig = {
  staticRoot: 'public',
  templateRoot: 'template',
};

const readFile = filename => fs.readFileSync(filename, 'utf-8');

const main = () => {
  const maxPlayers = 2;
  const game = new Game(maxPlayers);
  const session = JSON.parse(readFile('.session.json'));
  const app = createApp(game, appConfig, session, readFile);
  app.listen(8000, () => { console.log('listening on 8000'); });
};

main();
