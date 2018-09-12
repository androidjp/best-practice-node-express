'use strict';
const UserLoginSessionService = require('../services/user.login.session.service');
const UserLoginTokenService = require('../services/user.login.token.service');

module.exports = {
  login: login,
  register: register,
  deleteSession: deleteSession,

  loginWithToken:loginWithToken,
  registerWithToken: registerWithToken
};

function login (req, res) {
  let userLogin = req.body;
  UserLoginSessionService.login(userLogin).then(result => {
    if (result.success) {
      req.session.user = userLogin.name;
    }
    res.json(result);
  }).catch(err => res.json(err));
}

function register (req, res) {
  let userInfo = req.body;
  UserLoginSessionService.register(userInfo).then(result => {
    res.json(result);
  }).catch(err => res.json(err));
}


function loginWithToken(req, res) {
  let userInfo = req.body;
  UserLoginTokenService.login(userInfo).then(result => {
    res.json(result);
  }).catch(err => res.json(err));
}

function registerWithToken(req, res) {
  let userInfo = req.body;
  UserLoginTokenService.register(userInfo).then(result => {
    res.json(result);
  }).catch(err => res.json(err));
}

function deleteSession (req, res) {
  req.session.user = null;
  res.json({
    success: true,
    session: true,
    message: '登出成功'
  })
}
