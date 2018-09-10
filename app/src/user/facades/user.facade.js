const UserModel = require('../models/user');
const moment = require('moment');
const objectIdToTimestamp = require('objectid-to-timestamp');

module.exports.get = (criteria) => {
  return UserModel.findOne(criteria).exec();
};


module.exports.save = async (user) => {
  let userModel = new UserModel(user);
  userModel.createTime = moment(objectIdToTimestamp(userModel._id));
  return await userModel.save();
};