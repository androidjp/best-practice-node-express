'use strict';
const sha1 = require('sha1');
const UserLoginService = require('../services/user.login.service');

module.exports = {
  login: login,
};

function login (req, res) {
  let userLogin = {
    name: req.body.name,
    password: sha1(req.body.password),
  };

  UserLoginService.login(userLogin).then(result => {
    if (result.success) {
      req.session.user = userLogin.name;
    }
    res.json(result);
  });
}

