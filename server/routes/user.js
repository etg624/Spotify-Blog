const router = require('express').Router();
const passport = require('passport');
const request = require('request-promise');
const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = require('../config');

const createAuthToken = require('../helpers/createAuthToken');
const User = require('../models/User');
const jwtAuth = passport.authenticate('jwt', { session: false });

router.get('/:spotifyId', (req, res, next) => {
  const { spotifyId } = req.params;
  return User.findOne({ spotifyId }).then(user => {
    if (user) {
      const { spotifyId, displayName } = user;
      return res.json({ spotifyId, displayName });
    } else return;
  });
});

router.post('/:spotifyId/refresh', jwtAuth, (req, res, next) => {
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

    request
      .post(options, (error, response, body) => {
        console.log(error);
        if (body) {
          const { access_token: accessToken } = body;
          req.user.accessToken = accessToken;

          const authToken = createAuthToken(req.user);

          return res.json({ authToken });
        }

        res.redirect('/');
      })

      .catch(err => next(err));
  });
});

module.exports = router;
