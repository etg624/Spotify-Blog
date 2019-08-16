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
    callbackURL: 'http://localhost:8080/api/auth/spotify/callback'
  },
  function(accessToken, refreshToken, expires_in, profile, done) {
    const { displayName, id } = profile;
    const newUser = { displayName, spotifyId: id, accessToken, refreshToken };
    return User.findOne({ spotifyId: id }).then(user => {
      if (!user) {
        User.create(newUser);
      }
      return done(null, user);
    });
  }
);

module.exports = spotifyStrategy;
