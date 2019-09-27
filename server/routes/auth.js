const router = require('express').Router();
const passport = require('passport');
const { CLIENT_ORIGIN } = require('../config');

const createAuthToken = require('../helpers/createAuthToken');
router.get(
  '/',
  passport.authenticate('spotify', {
    scope: [
      'user-read-email',
      'user-read-private',
      'playlist-read-collaborative',
      'playlist-modify-private',
      'playlist-modify-public',
      'playlist-read-private',
      'user-modify-playback-state',
      'user-read-playback-state'
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
