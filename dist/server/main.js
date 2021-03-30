"use strict";

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _routes = _interopRequireDefault(require("./routes.js"));

var _init = require("./config/init");

var _init2 = require("./service/init");

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _expressFileupload = _interopRequireDefault(require("express-fileupload"));

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
app.use((0, _cors["default"])(corsOptions)); // parse application/x-www-form-urlencoded

app.use(_bodyParser["default"].urlencoded({
  extended: false
})); // parse application/json

app.use(_bodyParser["default"].json()); // static file

app.use('/static', _express["default"]["static"](_path["default"].join(__dirname, '/../public')));
app.use((0, _expressFileupload["default"])({
  createParentPath: true
})); // set up routes

app.use('/', _routes["default"]); // start server

app.listen(port, function () {
  console.log("Example app listening at http://localhost:".concat(port));
});