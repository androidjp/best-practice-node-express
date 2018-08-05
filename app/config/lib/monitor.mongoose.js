const path = require('path');
const chalk = require('chalk');
const mongoose = require('mongoose');
const config = require('../config');

module.exports.connect = mongoUrl => {
    return mongoose.connect(mongoUrl);
};

module.exports.loadModels = () => {
    config.files.server.models.forEach(modelPath => {
        require(path.resolve(modelPath));
    });
};

module.exports.disconnect = cb => {
    mongoose.disconnect(err => {
        console.info(chalk.yellow('Disconnected from MongoDB.'));
        cb(err);
    });
};