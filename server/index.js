const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const path = require('path');

const jwtStrategy = require('./passport/jwt-strategy');
const spotifyStrategy = require('./passport/spotify-strategy');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');

const { PORT, CLIENT_ORIGIN } = require('./config');
const { dbConnect } = require('./db/mongoose');

const app = express();

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: () => process.env.NODE_ENV === 'test'
  })
);

app.use(
  cors({
    origin: '*'
  })
);

// Parse request body
app.use(express.json());
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(spotifyStrategy);
passport.use(jwtStrategy);

//Routes
app.use('/api/auth/spotify', authRouter);
app.use('/api/user', userRouter);

// Catch-all 404
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Custom Error Handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.status) {
    const errBody = Object.assign({}, err, { message: err.message });
    res.status(err.status).json(errBody);
  } else {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  console.log('CONNECTED');
  dbConnect();
  runServer();
}

module.exports = { app };
