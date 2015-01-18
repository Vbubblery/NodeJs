exports.authorize = function(req, res, next) {
  if (!req.session.email) {
    res.redirect('/Login');
  } else {
    next();
  }
}