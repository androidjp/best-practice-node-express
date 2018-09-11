const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    index: true,
    unique:true
  },
  password: String,
  createTime: Date,
  token: String
}, {timestamps: true});

const UserModel = module.exports = mongoose.model('User', UserSchema);