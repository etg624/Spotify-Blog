const router = require('express').Router();
const passport = require('passport');
const { CLIENT_ORIGIN } = require('../config');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRY } = require('../config');

const createAuthToken = user => {
  const { id, spotifyId, displayName, accessToken } = user;
  const userInfo = { id, spotifyId, displayName, accessToken };
  return jwt.sign({ user: userInfo }, JWT_SECRET, {
    subject: user.id,
    expiresIn: JWT_EXPIRY
  });
};

router.get(
  '/',
  passport.authenticate('spotify', {
    scope: [
      'user-read-email',
      'user-read-private',
      'playlist-read-collaborative',
      'playlist-modify-private',
      'playlist-modify-public',
      'playlist-read-private'
    ],
    showDialog: true
  }),
  function(req, res) {
    // The request will be redirected to spotify for authentication, so this
    // function will not be called.
  }
);

router.get(
  '/callback',
  passport.authenticate('spotify', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    const { spotifyId } = req.user;
    const authToken = createAuthToken(req.user);

    res.redirect(
      `${CLIENT_ORIGIN}/profile?user=${spotifyId}&authToken=${authToken}`
    );
  }
);

module.exports = router;
