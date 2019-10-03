const mongoose = require('mongoose');

const user = new mongoose.Schema(
  {
    spotifyId: String,
    refreshToken: String,
    displayName: String,
    accessToken: String
  },
  { bufferCommands: false }
);

module.exports = mongoose.model('User', user);
