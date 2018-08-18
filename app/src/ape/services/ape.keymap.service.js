'use strict';
const mongoose = require('mongoose');
const KeymapModel = mongoose.model('Keymap');

module.exports = {
  getKeymapList: (keymapKey) => {
    return KeymapModel.find({type:keymapKey}).lean().exec();
  },
  saveKeymap: (keymap) => {
    return new KeymapModel(keymap).save();
  }
};