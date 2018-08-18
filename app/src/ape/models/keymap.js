'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const KeymapSchema = new Schema({
  option: String,
  keymap: String,
  type: String,
});

mongoose.model('Keymap', KeymapSchema, 'keymap');