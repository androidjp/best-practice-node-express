'use strict';
const ApeCmdService = require('../services/ape.cmd.service');
const ApeKeymapService = require('../services/ape.keymap.service');

module.exports = {
  getCmdList: async (req, res) => {
    const cmdKey = req.params.cmdKey;
    const cmdList = await ApeCmdService.getCmdList(cmdKey);
    res.json(cmdList);
  },
  getKeymapList: async (req, res) => {
    const keymapKey = req.params.keymapKey;
    const keymapList = await ApeKeymapService.getKeymapList(keymapKey);
    res.json(keymapList);
  },
};