'use strict';
const ApeController = require('../controllers/ape.controller');

module.exports = app => {
    app.route('/api/ape/cmd/:cmdKey').get(ApeController.getCmdList);
    app.route('/api/ape/keymap/:keymapKey').get(ApeController.getKeymapList);
};