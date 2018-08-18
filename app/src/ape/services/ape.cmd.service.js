'use strict';
const mongoose = require('mongoose');
const CmdModel = mongoose.model('Cmd');

module.exports = {
  getCmdList: (cmdKey) => {
    return CmdModel.find({type:cmdKey}).lean().exec();
  },
  saveCmd: (cmd) => {
    return new CmdModel(cmd).save();
  }
};