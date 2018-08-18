'use strict';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const config = require('./config/config');
const ExpressMonitor = require('./config/lib/monitor.express');
const MongooseMonitor = require('./config/lib/monitor.mongoose');
const _ = require('lodash');
const chalk = require('chalk');

module.exports.start = () => {
    const _this = this;
    MongooseMonitor.loadModels();
    _this.init();
};

module.exports.init = () => {
    MongooseMonitor.connect(config.mongoURL).then(db => {
        let app = ExpressMonitor.init(null);
        app.listen(config.port, config.host, () => {
            const server = (process.env.NODE_ENV === 'secure' ? 'https://' : 'http://') + config.host + ':' + config.port;
            // Logging initialization
            console.log('--');
            console.log(chalk.green(config.app.title));
            console.log();
            console.log(chalk.green('Environment:     ' + process.env.NODE_ENV));
            console.log(chalk.green('Server:          ' + server));
            console.log(chalk.green('Database:        ' + config.mongoURL));
            console.log('--');
        });
    }, error => {
        console.error('start app error for db connection error', error);
    });
};