const UserModel = require('../models/user');

module.exports.get = (criteria) => {
  return UserModel.findOne(criteria).exec();
};


module.exports.save = (user) => {
  return new UserModel(user).save();
};