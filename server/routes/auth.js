const router = require('express').Router();
const passport = require('passport');
const { CLIENT_ORIGIN } = require('../config');
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
    //res.cookie('id', req.user._id);
    res.redirect(`${CLIENT_ORIGIN}/profile?user=${spotifyId}`);
  }
);

module.exports = router;