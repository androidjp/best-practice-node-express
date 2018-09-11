'use strict';
const UserLoginService = require('../services/user.login.service');
const UserRegisterService = require('../services/user.register.service');

module.exports = {
  login: login,
  register: register,
  checkSession: checkSession,
  deleteSession: deleteSession
};

function login (req, res) {
  let userLogin = req.body;
  UserLoginService.login(userLogin).then(result => {
    if (result.success) {
      req.session.user = userLogin.name;
    }
    res.json(result);
  }).catch(err => res.json(err));
}

function register (req, res) {
  let userInfo = req.body;
  console.log(JSON.stringify(userInfo));
  UserRegisterService.register(userInfo).then(result => {
    res.json(result);
  }).catch(err => res.json(err));
}

function checkSession (req, res) {
  res.json({
    session: true // 提供前端验证session存在与否
  });
}

function deleteSession (req, res) {
  req.session.user = null;
  res.json({
    session: false,
    message: '登出成功'
  })
}
