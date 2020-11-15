"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dbConfig = _interopRequireDefault(require("../config/db-config"));

var _appSetting = require("../model/app-setting");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var InstallationService = /*#__PURE__*/function () {
  function InstallationService() {
    _classCallCheck(this, InstallationService);
  }

  _createClass(InstallationService, [{
    key: "init",
    value: function init() {}
  }, {
    key: "isInstalled",
    value: function isInstalled() {
      return _dbConfig["default"].get(_appSetting.AppSetting_DB_KEY).find().value();
    }
  }]);

  return InstallationService;
}();

exports["default"] = InstallationService;