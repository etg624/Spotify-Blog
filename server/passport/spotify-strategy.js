const SpotifyStrategy = require('passport-spotify').Strategy;
const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = require('../config');
const User = require('../models/User');
const passport = require('passport');
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});
const spotifyStrategy = new SpotifyStrategy(
  {
    clientID: SPOTIFY_CLIENT_ID,
    clientSecret: SPOTIFY_CLIENT_SECRET,
    callbackURL:
      'https://spotify-blog-backend.herokuapp.com/api/auth/spotify/callback' ||
      'http://localhost:8080/api/auth/spotify/callback'
  },
  function(accessToken, refreshToken, expires_in, profile, done) {
    const { displayName, id } = profile;
    const newUser = { displayName, spotifyId: id, accessToken, refreshToken };
    return User.findOneAndUpdate({ spotifyId: id }, { accessToken })
      .then(user => {
        if (!user) {
          return User.create(newUser)
            .then(user => done(null, user))
            .catch(err => done(err));
        } else {
          return done(null, user);
        }
      })
      .catch(err => done(err));
  }
);

module.exports = spotifyStrategy;
