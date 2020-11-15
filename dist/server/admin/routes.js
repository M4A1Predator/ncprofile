"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _installationService = _interopRequireDefault(require("../../service/installation-service"));

var _container = require("../../config/container");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var adminRoutes = _express["default"].Router();

adminRoutes.get('/', function (req, res) {
  // check installation
  // const service = new InstallationService()
  res.json(service.isInstalled());

  var _ConfigContainer$getC = _objectSpread({}, _container.ConfigContainer.getConfigs()),
      dbConfig = _ConfigContainer$getC.dbConfig;

  var db = dbConfig.db;
  res.json(db.get('appSetting').value());
});
adminRoutes.get('/appConfig', function (req, res) {
  // check installation
  // const service = new InstallationService()
  // res.json(service.isInstalled())
  var _ConfigContainer$getC2 = _objectSpread({}, _container.ConfigContainer.getConfigs()),
      dbConfig = _ConfigContainer$getC2.dbConfig;

  var db = dbConfig.db;
  res.json(db.get('appSetting').value());
});
adminRoutes.post('/install', function (req, res) {// register user
});
var _default = adminRoutes;
exports["default"] = _default;