"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppSetting_DB_KEY = exports.AppSetting = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AppSetting = function AppSetting() {
  _classCallCheck(this, AppSetting);

  this.isInstalled = false;
  this.user = undefined;
  this.password = undefined;
};

exports.AppSetting = AppSetting;
var AppSetting_DB_KEY = 'appSetting';
exports.AppSetting_DB_KEY = AppSetting_DB_KEY;