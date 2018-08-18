'use strict';
const ApeCmdService = require('../services/ape.cmd.service');

module.exports = {
  getCmdList: (req, res) => {
    const cmdKey = req.params.cmdKey;
    const cmdList = ApeCmdService.getCmdList(cmdKey);
    res.json(cmdList);
  },
};