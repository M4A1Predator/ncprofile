"use strict";

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _routes = _interopRequireDefault(require("./routes.js"));

var _init = require("./config/init");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// ENV
var ENV = process.argv[0]; // Connect DB
// let dbFile = 'db-dev.json'
// if (ENV === 'PROD') {
//   dbFile = 'db-prod.json'
// }
// const adapter = new FileSync(dbFile)
// const db = low(adapter)
// const appSetting = new AppSetting()
// db.defaults({
//     [AppSetting_DB_KEY]: appSetting
//   })
//   .write()

(0, _init.initConfig)(); // Set up server Config

var port = 9300;
var app = (0, _express["default"])(); // static file

app.use('/static', _express["default"]["static"](_path["default"].join(__dirname, '/../public'))); // set up routes

app.use('/', _routes["default"]); // start server

app.listen(port, function () {
  console.log("Example app listening at http://localhost:".concat(port));
});