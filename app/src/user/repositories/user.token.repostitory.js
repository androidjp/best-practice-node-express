const UserTokenModel = require('../models/userToken');
const moment = require('moment');
const objectIdToTimestamp = require('objectid-to-timestamp');

module.exports.get = (criteria) => {
  return UserTokenModel.findOne(criteria).exec();
};


module.exports.save = async (user) => {
  let userModel = new UserTokenModel(user);
  userModel.createTime = moment(objectIdToTimestamp(userModel._id));
  return await userModel.save();
};