const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const config = require('../config');
const session = require('express-session');

module.exports.init = () => {
  let app = express();
  this.initMiddleware(app);
  this.initConfigs(app);
  this.initRoutes(app);
  this.initErrorRoutes(app);
  return app;
};

module.exports.initConfigs = app => {
  config.files.server.configs.forEach(configPath => {
    require(path.resolve(configPath))(app);
  });
};

module.exports.initRoutes = app => {
  config.files.server.routes.forEach(configPath => {
    require(path.resolve(configPath))(app);
  });
};

module.exports.initErrorRoutes = app => {
  app.use((err, req, res, next) => {
    if (!err) {
      return next();
    }
    console.error(err.stack);
    res.redirect('/server-error');
  });
};

module.exports.initMiddleware = app => {
  // for parsing application/json
  app.use(bodyParser.json());
  // for parsing application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({extended: true}));
  // use session
  app.use(session({
    secret: config.sessionSecret,
    key: config.sessionKey,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: config.sessionCookie.maxAge
    }
  }))
};
