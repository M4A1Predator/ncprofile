"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _appSetting = require("../model/app-setting");

var _container = require("../config/container");

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    key: "getAppSetting",
    value: function getAppSetting() {
      var _ConfigContainer$getC = _objectSpread({}, _container.ConfigContainer.getConfigs()),
          dbConfig = _ConfigContainer$getC.dbConfig;

      var db = dbConfig.db;
      return db.get('appSetting').value();
    }
  }, {
    key: "installFirst",
    value: function installFirst(data) {
      var _ConfigContainer$getC2 = _objectSpread({}, _container.ConfigContainer.getConfigs()),
          dbConfig = _ConfigContainer$getC2.dbConfig;

      var db = dbConfig.db;

      var _data = _objectSpread({}, data),
          username = _data.username,
          password = _data.password; // encrypt password


      var salt = _bcryptjs["default"].genSaltSync(10);

      var hashPassword = _bcryptjs["default"].hashSync(password, salt); // save basic setting


      var appSetting = new _appSetting.AppSetting();
      appSetting.isInstalled = true;
      appSetting.user = username;
      appSetting.password = hashPassword;
      db.set(_appSetting.AppSetting_DB_KEY, appSetting).write();
    }
  }]);

  return InstallationService;
}();

exports["default"] = InstallationService;