'use strict';

module.exports = {
    app: {
        title: 'best pratice for node express',
        description: 'MongoDB, Express and Node.js',
        keywords: 'mongodb, express, node.js, mongoose, passport',
    },
    port: process.env.PORT || 9999,
    host: process.env.HOST || '0.0.0.0',
    templateEngine: 'swig',
    // Session Cookie settings
    sessionCookie: {
        // session expiration is set by default to 24 hours
        maxAge: 24 * (60 * 60 * 1000),
        // httpOnly flag makes sure the cookie is only accessed
        // through the HTTP protocol and not JS/browser
        httpOnly: true,
        // secure cookie should be turned to true to provide additional
        // layer of security so that the cookie is set only when working
        // in HTTPS mode.
        secure: false,
    },
    // sessionSecret should be changed for security measures and concerns
    sessionSecret: process.env.SESSION_SECRET || 'OVA',
    sessionKey: 'sessionId',
    sessionCollection: 'sessions',
    // Lusca config
    csrf: {
        csrf: true,
        csp: {
            policy: {
                'default-src': '\'self\'',
                'img-src': '*',
            },
        },
        xframe: 'SAMEORIGIN',
        p3p: 'ABCDEF',
        hsts: {maxAge: 31536000, includeSubDomains: true, preload: true},
        xssProtection: true,
        nosniff: true,
    },
};