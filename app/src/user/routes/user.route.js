'use strict';
const UserController = require('../controllers/user.controller');
const UserSessionController = require('../controllers/user.session.controller');

module.exports = app => {
  app.route('/api/token/login').post(UserSessionController.checkNotLogin, UserController.login);
  app.route('/api/token/register').post(UserSessionController.checkNotLogin, UserController.register);
};