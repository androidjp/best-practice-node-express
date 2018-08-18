'use strict';

const defaultEnvConfig = require('./default');

module.exports = {

    mongoURL: 'mongodb://47.106.86.64:27017/ape_esoterica',

    proxies: {
        cs4: {
            baseURL: 'http://ws.ssm2014.cargosmart.org',
            // baseURL: 'http://ws.ssm2014pp.cargosmart.org',
            timeout: 120000
        },
        openapi: {
            baseURL: 'http://itwww.bigschedules.com',
            timeout: 120000,
            appKey: '28d9c3f0-8be2-11e8-819d-132c3c3ee3fb',
        },
    }
};
