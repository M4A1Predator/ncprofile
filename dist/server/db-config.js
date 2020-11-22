"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DbConfig = void 0;

var _appSetting = require("../model/app-setting");

var _lowdb = _interopRequireDefault(require("lowdb"));

var _FileSync = _interopRequireDefault(require("lowdb/adapters/FileSync"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DbConfig = /*#__PURE__*/function () {
  function DbConfig() {
    _classCallCheck(this, DbConfig);
  }

  _createClass(DbConfig, [{
    key: "init",
    value: function init() {
      var ENV = process.argv[0]; // Connect DB

      var dbFile = 'db-dev.json';

      if (ENV === 'PROD') {
        dbFile = 'db-prod.json';
      }

      var adapter = new _FileSync["default"](dbFile);
      this.db = (0, _lowdb["default"])(adapter);
      var appSetting = new _appSetting.AppSetting();
      this.db.defaults(_defineProperty({}, _appSetting.AppSetting_DB_KEY, appSetting)).write();
    }
  }]);

  return DbConfig;
}();

exports.DbConfig = DbConfig;