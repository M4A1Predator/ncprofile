"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initConfig = void 0;

var _container = require("./container");

var _dbConfig = require("./db-config");

var initConfig = function initConfig() {
  var dbConfig = new _dbConfig.DbConfig();
  dbConfig.init();

  _container.ConfigContainer.init({
    dbConfig: dbConfig
  });
};

exports.initConfig = initConfig;