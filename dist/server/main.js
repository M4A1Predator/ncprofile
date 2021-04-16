"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireWildcard(require("path"));

var _routes = _interopRequireDefault(require("./routes.js"));

var _init = require("./config/init");

var _init2 = require("./service/init");

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _expressFileupload = _interopRequireDefault(require("express-fileupload"));

var _helmet = _interopRequireDefault(require("helmet"));

var _fs = require("fs");

var _main = require("../../dist/ncprofileweb/server/main.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// ENV
var ENV = process.argv[0]; // init config

(0, _init.initConfig)();
(0, _init2.initServices)(); // Set up server Config

var port = 9300;
var app = (0, _express["default"])();
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204

};
app.use((0, _helmet["default"])()); // enable cors

app.use((0, _cors["default"])(corsOptions)); // parse application/x-www-form-urlencoded

app.use(_bodyParser["default"].urlencoded({
  extended: false
})); // parse application/json

app.use(_bodyParser["default"].json()); // static file

app.use('/static', _express["default"]["static"](_path["default"].join(__dirname, '/../public')));
app.use((0, _expressFileupload["default"])({
  createParentPath: true
})); // set up routes

app.use('/', _routes["default"]);
app.use('/test', _main.APP_SERVER); // start server

app.listen(port, function () {
  console.log("Example app listening at http://localhost:".concat(port));
});