const jwt = require('jsonwebtoken');
const secret = require('../api/secrets');

function makeToken(user) {
  const payload = {
    userid: user.id,
  };
  const options = {
    expiresIn: '1d',
  };

  return jwt.sign(payload, secret.jwtSecret, options);
}

function auth(req, res, next) {
  jwt.verify(req.headers.authorization, secret.jwtSecret, function (
    err,
    decoded
  ) {
    if (err) {
      res.status(400).json({ error: 'not logged in' });
    } else {
      req.token = decoded;
      next();
    }
  });
}

module.exports = { makeToken, auth };
