const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRY } = require('../config');

module.exports = user => {
  const { id, spotifyId, displayName, accessToken } = user;
  const userInfo = { id, spotifyId, displayName, accessToken };

  return jwt.sign({ user: userInfo }, JWT_SECRET, {
    subject: user.spotifyId,
    expiresIn: JWT_EXPIRY
  });
};
