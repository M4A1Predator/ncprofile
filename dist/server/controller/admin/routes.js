"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _container = require("../../config/container");

var _container2 = require("../../service/container");

var _authMiddle = require("../../middleware/auth-middle");

var _cmsSetting = _interopRequireDefault(require("./cms-setting/cms-setting"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var adminRoutes = _express["default"].Router();

adminRoutes.get('/', function (req, res) {
  // check installation
  var _ConfigContainer$getC = _objectSpread({}, _container.ConfigContainer.getConfigs()),
      dbConfig = _ConfigContainer$getC.dbConfig;

  var db = dbConfig.db;
  res.json(db.get('appSetting').value());
});
adminRoutes.get('/appConfig', function (req, res) {
  var _ServiceContainer$get = _objectSpread({}, _container2.ServiceContainer.getServices()),
      installationService = _ServiceContainer$get.installationService;

  console.log(installationService);
  res.json(installationService.getAppSetting());
});
adminRoutes.post('/install', _authMiddle.verifyToken, function (req, res) {
  // register user
  var _req$body = _objectSpread({}, req.body),
      username = _req$body.username,
      password = _req$body.password;

  var account = {
    username: username,
    password: password
  };

  var _ServiceContainer$get2 = _objectSpread({}, _container2.ServiceContainer.getServices()),
      installationService = _ServiceContainer$get2.installationService;

  installationService.installFirst(account);
  res.json({});
});
adminRoutes.post('/token', function (req, res) {
  var _ServiceContainer$get3 = _objectSpread({}, _container2.ServiceContainer.getServices()),
      adminService = _ServiceContainer$get3.adminService;

  var result = adminService.verifyCredential(req.body);

  if (result.error) {
    res.sendStatus(401);
    return;
  } // issue token


  var token = _jsonwebtoken["default"].sign({
    user: 'admin'
  }, 'the_secret', {
    expiresIn: '24H'
  });

  res.json({
    accessToken: token
  });
});
adminRoutes.use('/cms-setting', [_cmsSetting["default"]]);
var _default = adminRoutes;
exports["default"] = _default;