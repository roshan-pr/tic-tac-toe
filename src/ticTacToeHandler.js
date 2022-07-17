const serveTicTacToePage = (templateRoot, readFile) =>
  (req, res) => {
    const ticTacToePage = readFile(templateRoot + '/ticTacToe.html');
    res.end(ticTacToePage);
  };

module.exports = { serveTicTacToePage };
