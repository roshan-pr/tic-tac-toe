const serveLoginPage = (templateRoot, readFile) =>
  (req, res, next) => {
    const loginPage = readFile(templateRoot + '/login.html');
    res.end(loginPage);
  };

module.exports = { serveLoginPage };
