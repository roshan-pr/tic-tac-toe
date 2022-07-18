const assignSession = (req, res, next) => {
  const timeStamp = new Date().getTime();
  if (!req.session.isPopulated) {
    req.session.id = timeStamp;
    req.session.username = req.body.username;
  }
  next();
};

module.exports = { assignSession };
