'use strict';
const UserLoginController = require('../controllers/user.login.controller');
const UserSessionController = require('../controllers/user.session.controller');

module.exports = app => {
    app.route('/api/token/login').post(UserSessionController.checkNotLogin, UserLoginController.login)
};