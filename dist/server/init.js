"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initServices = void 0;

var _container = require("../service/container");

var _installationService = _interopRequireDefault(require("../service/installation-service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var initServices = function initServices() {
  var installationService = new _installationService["default"]();
  installationService.init();

  _container.ServiceContainer.init({
    installationService: installationService
  });
};

exports.initServices = initServices;