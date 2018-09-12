const jwt = require('jsonwebtoken');
const config = require('../../../config/config');
const UserTokenRepository = require('../repositories/user.token.repostitory');
const moment = require('moment');
const objectIdToTimestamp = require('objectid-to-timestamp');

module.exports.login = async (userInfo = {}) => {
  const existedUser = await UserTokenRepository.get({name: userInfo.name}).catch(err => {
    return {
      success: false,
      message: err,
    };
  });
  if (existedUser) {
    let isMatch = existedUser.password === userInfo.password;
    return {
      success: isMatch,
      message: isMatch ? '登录成功' : '密码错误',
      user: userInfo.name,
      token: createToken(userInfo.name),
      time: moment(objectIdToTimestamp(existedUser._id))
        .format('YYYY-MM-DD HH:mm:ss'),
    };
  } else {
    return {
      success: false,
      message: '账号不存在',
    };
  }
};

module.exports.register = async (userInfo = {}) => {
  const existedUser = await UserTokenRepository.get({name: userInfo.name}).catch(err => {
    return {
      success: false,
      message: err,
    };
  });
  if (existedUser) {
    return {
      success: false,
      message: '该账户已注册',
    };
  } else {
    userInfo.token = createToken(userInfo.name);
    await UserTokenRepository.save(userInfo).catch(err => {
      return {success: false, message: err};
    });
    return {
      success: true,
      message: '注册成功',
    };
  }
};


function createToken (name) {
  const token = jwt.sign({name: name}, 'secret', {
    expiresIn: config.token.maxAge,
  });
  return token;
};