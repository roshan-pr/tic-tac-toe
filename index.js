const { createApp } = require('./src/app');
const fs = require('fs');

const appConfig = {
  staticRoot: 'public',
  templateRoot: 'template',
};

const readFile = filename => fs.readFileSync(filename, 'utf-8');

const main = () => {
  const session = JSON.parse(readFile('.session.json'));
  const app = createApp(appConfig, session, readFile);
  app.listen(8000, () => { console.log('listening on 8000'); });
};

main();
