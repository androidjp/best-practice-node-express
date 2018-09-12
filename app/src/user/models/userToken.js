const mongoose = require('mongoose');

const UserTokenSchema = mongoose.Schema({
  name: {
    type: String,
    index: true,
    unique:true
  },
  password: String,
  createTime: Date,
  token: String
}, {timestamps: true});

const UserTokenModel = module.exports = mongoose.model('UserToken', UserTokenSchema);