const router = require('express').Router();
const passport = require('passport');
const request = require('request-promise');
const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = require('../config');
const spotifyAuth = passport.authenticate('spotify');
const User = require('../models/User');
const jwtAuth = passport.authenticate('jwt');
router.get('/:spotifyId', (req, res, next) => {
  console.log(req.user);
  const { spotifyId } = req.params;
  return User.findOne({ spotifyId }).then(user => {
    if (user) {
      const { accessToken, spotifyId, displayName } = user;
      return res.json({ accessToken, spotifyId, displayName });
    } else return;
  });
});

router.get('/:spotifyId/refresh', (req, res, next) => {
  const { spotifyId } = req.params;
  return User.findOne({ spotifyId }).then(user => {
    const options = {
      url: 'https://accounts.spotify.com/api/token',
      form: { grant_type: 'refresh_token', refresh_token: user.refreshToken },
      headers: {
        Authorization: `Basic ${new Buffer.from(
          SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET
        ).toString('base64')}`
      },
      json: true
    };

    request.post(options, (error, response, body) => {
      const { access_token: accessToken } = body;
      return res.json({ accessToken });
    });
  });
});

module.exports = router;
