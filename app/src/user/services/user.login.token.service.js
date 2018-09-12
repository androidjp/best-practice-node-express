const jwt = require('jsonwebtoken');
const config = require('../../../config/config');

module.exports.createToken = name => {
  const token = jwt.sign({name: name,}, 'secret', {
    expiresIn: config.token.maxAge,
  });
  return token;
};