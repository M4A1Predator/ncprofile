"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _routes = _interopRequireDefault(require("./controller/admin/routes"));

var _routes2 = _interopRequireDefault(require("./controller/cms-info/routes"));

var _main = require("../../dist/ncprofileweb/server/main.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // router.get('/', (req, res) => {
//   res.send('Hello World!')
// })


router.get('/static/*', function (req, res) {
  var reqPath = req.path;
  reqPath = reqPath.slice("/static".length);

  if (reqPath[0] === '/') {
    reqPath = reqPath.slice(1);
  }

  res.sendFile(_path["default"].join(__dirname + "/../../asset/".concat(reqPath)));
}); // ==================== serve Admin ==============================
// static file

router.get('/admin/*.*', function (req, res) {
  var reqPath = req.path;
  reqPath = reqPath.slice("/admin".length);

  if (reqPath[0] === '/') {
    reqPath = reqPath.slice(1);
  } // serve static file


  res.sendFile(_path["default"].join(__dirname + "/../admin/".concat(reqPath)), function (err) {// get to admin uri
    // res.sendFile(path.join(__dirname + '/../admin/index.html'))
  });
}); // admin index

router.get('/admin*', function (req, res) {
  res.sendFile(_path["default"].join(__dirname + '/../admin/index.html')); // res.render('index')
}); // router.get('/admin/*.*', express.static('../admin', {
//   maxAge: '1y'
// }));
// Admin API

router.use('/api/admin', _routes["default"]); //==========================================================
//==========================PUBLIC==========================
// static files
// router.use('/*.*', express.static(__dirname + '/../../ncprofileweb/browser'))

router.get('/*.*', function (req, res) {
  var reqPath = req.path;

  if (reqPath[0] === '/') {
    reqPath = reqPath.slice(1);
  }

  res.sendFile(_path["default"].join(__dirname + "/../ncprofileweb/browser/".concat(reqPath)));
}); // Public API

router.use('/api', _routes2["default"]); // web UI

router.use('/', _main.APP_SERVER);
var _default = router;
exports["default"] = _default;