'use strict';
const UserDao = require('../facades/user.facade');
const moment = require('moment');
const objectIdToTimestamp = require('objectid-to-timestamp');

module.exports.login = async (userInfo = {}) => {
  const existedUser = await UserDao.get({name: userInfo.name}).catch(err => {
    return {
      success: false,
      message: err,
    };
  });
  if (existedUser) {
    let isMatch = existedUser.password === userInfo.password;
    return {
      success: isMatch,
      message: isMatch ? '登录成功' : 'error Password.',
      user: userInfo.name,
      time: moment(objectIdToTimestamp(existedUser._id))
        .format('YYYY-MM-DD HH:mm:ss')
    };
  } else {
    return {
      success: false,
      message: '账号不存在',
    };
  }
};