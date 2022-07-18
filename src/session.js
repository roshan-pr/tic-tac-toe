const assignSession = (req, res, next) => {
  const timeStamp = new Date().getTime();
  if (!req.session.isPopulated) {
    req.session.id = timeStamp;
    req.session.name = req.body.name;
  }
  next();
};

module.exports = { assignSession };
