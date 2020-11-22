"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ServiceContainer = void 0;

var _installationService = _interopRequireDefault(require("./installation-service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ServiceContainer = /*#__PURE__*/function () {
  function ServiceContainer() {
    _classCallCheck(this, ServiceContainer);
  }

  _createClass(ServiceContainer, null, [{
    key: "init",
    value: function init(services) {
      // this.services = {}
      // init and set services
      this.services = services;
    }
  }, {
    key: "getServices",
    value: function getServices() {
      return this.services;
    }
  }]);

  return ServiceContainer;
}();

exports.ServiceContainer = ServiceContainer;