const request = require('request-promise');

function keepClientAwake() {
  return function(req, res, next) {
    setInterval(() => {
      request.get('https://spotify-blog-client.herokuapp.com/');
    }, 240000); //4min
    next();
  };
}
function keepServerAwake() {
  return function(req, res, next) {
    setInterval(() => {
      request.get('https://spotify-blog-backend.herokuapp.com/');
    }, 240000); //4min
    next();
  };
}

module.exports = {
  keepClientAwake,
  keepServerAwake
};
