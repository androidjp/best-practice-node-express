const underscore = require('underscore');
const _ = require('lodash');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const glob = require('glob');


const getGlobbedPaths = (globPatterns, excludes) => {
    let urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');

    let output = [];

    if (_.isArray(globPatterns)) {
        globPatterns.forEach((globPattern => {
            output = _.union(output, getGlobbedPaths(globPattern, excludes));
        }));
    } else if (_.isString(globPatterns)) {
        if (urlRegex.test(globPatterns)) {
            output.push(globPatterns);
        } else {
            var files = glob.sync(globPatterns);
            if (excludes) {
                files = files.map((file) => {
                    if (_.isArray(excludes)) {
                        for (let i in excludes) {
                            if (excludes.hasOwnProperty(i)) {
                                file = file.replace(excludes[i], '');
                            }
                        }
                    } else {
                        file = file.replace(excludes, '');
                    }
                    return file;
                });
            }
            output = _.union(output, files);
        }
    }
    return output;
};

const validateEnvironmentVariable = () => {
    let environmentFiles = glob.sync('./env/' + process.env.NODE_ENV + '.js');
    if (!environmentFiles.length) {
        if (process.env.NODE_ENV) {
            console.error(chalk.red('+ Error: No configuration file found for "' + process.env.NODE_ENV + '" environment using development instead'));
        } else {
            console.error(chalk.yellow('+ Error: NODE_ENV is not defined! Using default development environment'));
        }
        process.env.NODE_ENV = 'development';
    }
    // Reset console color
    console.log(chalk.white(''));
};

const validateSecureMode = config => {
    if (!config.secure || config.secure.ssl !== true) {
        return true;
    }

    let privateKey = fs.existsSync(path.resolve(config.secure.privateKey));
    let certificate = fs.existsSync(path.resolve(config.secure.certificate));

    if (!privateKey || !certificate) {
        console.log(chalk.red('+ Error: Certificate file or key file is missing, falling back to non-SSL mode'));
        console.log(chalk.red('  To create them, simply run the following from your shell: sh ./scripts/generate-ssl-certs.sh'));
        console.log();
        config.secure.ssl = false;
    }
};

const validateSessionSecret = (config, testing) => {

    if (process.env.NODE_ENV !== 'production') {
        return true;
    }

    if (config.sessionSecret === 'OVA') {
        if (!testing) {
            console.log(chalk.red('+ WARNING: It is strongly recommended that you change sessionSecret config while running in production!'));
            console.log(chalk.red('  Please add `sessionSecret: process.env.SESSION_SECRET || \'super amazing secret\'` to '));
            console.log(chalk.red('  `config/env/production.js` or `config/env/local.js`'));
            console.log();
        }
        return false;
    } else {
        return true;
    }
};

const initGlobalConfigFolders = (config) => {
    config.folders = {
        server: {},
    };
};

const initGlobalConfigFiles = (config, assets) => {
    config.files = {
        server: {},
    };

    // Setting Globbed model files
    config.files.server.models = getGlobbedPaths(assets.server.models);

    // Setting Globbed route files
    config.files.server.routes = getGlobbedPaths(assets.server.routes);

    // Setting Globbed config files
    config.files.server.configs = getGlobbedPaths(assets.server.config);

    // Setting Globbed socket files
    config.files.server.sockets = getGlobbedPaths(assets.server.sockets);

    // Setting Globbed policies files
    config.files.server.policies = getGlobbedPaths(assets.server.policies);
};

const initGlobalConfig = () => {
    // Validate NODE_ENV existence
    validateEnvironmentVariable();

    // Get the default assets
    let defaultAssets = require(path.join(process.cwd(), 'config/assets/default'));

    // Get the current assets
    let environmentAssets = require(path.join(process.cwd(), 'config/assets/', process.env.NODE_ENV)) || {};

    // Merge assets
    let assets = _.merge(defaultAssets, environmentAssets);

    // Get the default config
    let defaultConfig = require(path.join(process.cwd(), 'config/env/default'));

    // Get the current config
    let environmentConfig = require(path.join(process.cwd(), 'config/env/', process.env.NODE_ENV)) || {};

    // Merge config files
    let config = _.merge(defaultConfig, environmentConfig);

    // read package.json for MEAN.JS project information
    let pkg = require(path.resolve('./package.json'));
    config.meanjs = pkg;

    // Extend the config object with the local-NODE_ENV.js custom/local environment. This will override any settings present in the local configuration.
    config = _.merge(config, (fs.existsSync(path.join(process.cwd(), 'config/env/local-' + process.env.NODE_ENV + '.js')) && require(path.join(process.cwd(), 'config/env/local-' + process.env.NODE_ENV + '.js'))) || {});

    // Initialize global globbed files
    initGlobalConfigFiles(config, assets);

    // Initialize global globbed folders
    initGlobalConfigFolders(config, assets);

    // Validate Secure SSL mode can be used
    validateSecureMode(config);

    // Validate session secret
    validateSessionSecret(config);

    // Expose configuration utilities
    config.utils = {
        getGlobbedPaths: getGlobbedPaths,
        validateSessionSecret: validateSessionSecret,
    };

    return config;
};

module.exports = initGlobalConfig();