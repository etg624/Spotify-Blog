const SpotifyStrategy = require('passport-spotify').Strategy;
const {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  CALLBACK_URL
} = require('../config');
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
    callbackURL: CALLBACK_URL
  },
  function(accessToken, refreshToken, expires_in, profile, done) {
    const { displayName, id } = profile;
    const newUser = { displayName, spotifyId: id, accessToken, refreshToken };
    process.nextTick(() => {
      console.log(
        'heereeeeee',
        User.find({ spotifyId: id }).then(user => user)
      );
      return User.find({ spotifyId: id })
        .then(user => {
          console.log('HEERREEEE 28', newUser);
          if (!user) {
            console.log('HEERREEEE 30', newUser);
            return User.create(newUser)
              .then(user => done(null, user))
              .catch(err => done(err));
          } else {
            return User.update({ spotifyId: id }, { accessToken }).then(user =>
              done(null, user)
            );
          }
        })
        .catch(err => done(err));
    });
  }
);

module.exports = spotifyStrategy;
