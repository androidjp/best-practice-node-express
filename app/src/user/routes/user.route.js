'use strict';
const UserSessionLoginController = require('../controllers/user.session.login.controller');
const {checkLogin,checkNotLogin} = require('../controllers/user.session.validator.controller');

module.exports = app => {
  app.route('/api/session/login').post(checkNotLogin, UserSessionLoginController.login);
  app.route('/api/session/register').post(checkNotLogin, UserSessionLoginController.register);

  app.route('/api').get(checkLogin, UserSessionLoginController.checkSession)
};