const addPlayer = game => (req, res, next) => {
  game.addPlayer(req.body.name);
  next();
};

const serveLoginPage = (templateRoot, readFile) =>
  (req, res, next) => {
    const loginPage = readFile(templateRoot + '/login.html');
    res.end(loginPage);
  };

module.exports = { addPlayer, serveLoginPage };
