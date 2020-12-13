"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initServices = void 0;

var _container = require("../service/container");

var _installationService = _interopRequireDefault(require("../service/installation-service"));

var _cmsSettingService = _interopRequireDefault(require("./cms-setting-service"));

var _adminService = _interopRequireDefault(require("./admin-service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var initServices = function initServices() {
  var installationService = new _installationService["default"]();
  installationService.init();
  var adminService = new _adminService["default"]();
  adminService.init();
  var cmsSettingService = new _cmsSettingService["default"]();
  cmsSettingService.init();

  _container.ServiceContainer.init({
    installationService: installationService,
    adminService: adminService,
    cmsSettingService: cmsSettingService
  });
};

exports.initServices = initServices;