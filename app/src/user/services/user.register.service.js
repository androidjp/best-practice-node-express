const UserModel = require('../facades/user.facade');

module.exports.register = async (userInfo) => {
  let existedUser = await UserModel.get({name: (userInfo.name).toLowerCase()});
  if (existedUser) {
    return {
      success: false,
      error: 'has existed user!',
    };
  } else {
    await UserModel.save(userInfo);
    return {
      success: true,
    };
  }
};

