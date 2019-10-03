const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const { DATABASE_URL } = require('../config');

function dbConnect(url = DATABASE_URL) {
  console.log('DATABASE_URL', DATABASE_URL);
  return mongoose
    .connect(url, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    .catch(err => {
      err.message = 'Mongoose failed to connect';
      return err;
    });
}

mongoose.connection.on('connected', () => {
  console.log('CONNECT TO MONGOOSE');
});

mongoose.connection.on('reconnected', () => {
  console.log('Connection Reestablished');
});

mongoose.connection.on('disconnected', () => {
  console.log('Connection Disconnected');
});

mongoose.connection.on('close', () => {
  console.log('Connection Closed');
});

mongoose.connection.on('error', error => {
  console.log('ERROR: ' + error);
});

function dbDisconnect() {
  return mongoose.disconnect();
}

function dbDrop() {
  return mongoose.connection.db.dropDatabase();
}

module.exports = {
  dbConnect,
  dbDisconnect,
  dbDrop
};
