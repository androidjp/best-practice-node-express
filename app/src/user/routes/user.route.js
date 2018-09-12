'use strict';
const UserLoginController = require('../controllers/user.login.controller');
const {checkLogin,checkNotLogin} = require('../interceptors/user.session.validator.controller');

module.exports = app => {
  app.route('/api/session/login').post(checkNotLogin, UserLoginController.login);
  app.route('/api/session/register').post(UserLoginController.register);
  app.route('/api/session/logout').get(checkLogin, UserLoginController.deleteSession);

  app.route('/api/token/login').post(checkNotLogin, UserLoginController.login);
  app.route('/api/token/register').post(UserLoginController.register);
  app.route('/api/token/logout').get(checkLogin, UserLoginController.deleteSession);

  app.route('/api').get(checkLogin, UserLoginController.checkSession)
};