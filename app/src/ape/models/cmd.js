'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CmdSchema = new Schema({
  option: String,
  isCmdList: {
    type: Boolean,
    default: false,
  },
  cmd: {
    type: Object,
    default: 'Nothing',
  },
  type: {
    type: String,
  },
});

mongoose.model('Cmd', CmdSchema, 'cmd');