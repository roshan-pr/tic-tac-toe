const assignSession = (req, res) => {
  const timeStamp = new Date().getTime();
  if (!req.session.isPopulated) {
    req.session.id = timeStamp;
    req.session.username = req.body.username;
  }
  res.redirect('/ticTacToe');
  res.end();
};

module.exports = { assignSession };
