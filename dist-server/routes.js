"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _routes = _interopRequireDefault(require("./controller/admin/routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get('/', function (req, res) {
  res.send('Hello World!');
});
router.get('/admin', function (req, res) {
  // res.send('Welcome Admin')
  res.sendFile(_path["default"].join(__dirname + '/../public/index.html'));
});
router.use('/api/admin', _routes["default"]);
var _default = router;
exports["default"] = _default;