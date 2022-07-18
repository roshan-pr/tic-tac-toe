const addPlayer = game => (req, res, next) => {
  const { session: { id }, body: { name } } = req;
  game.addPlayer(id, name);
  next();
};

const serveLoginPage = (templateRoot, readFile) =>
  (req, res, next) => {
    const loginPage = readFile(templateRoot + '/login.html');
    res.end(loginPage);
  };

module.exports = { addPlayer, serveLoginPage };
