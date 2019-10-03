require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 8080,
  DATABASE_URL: process.env.DATABASE_URL,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
  SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: process.env.JWT_EXPIRY || '7d',
  CALLBACK_URL:
    process.env.CALLBACK_URL ||
    'http://localhost:8080/api/auth/spotify/callback'
};
