const logout = (req, res) => {
  req.session = null;
  res.redirect('/login');
  res.end();
};

module.exports = { logout };
