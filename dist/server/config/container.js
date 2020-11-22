"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfigContainer = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ConfigContainer = /*#__PURE__*/function () {
  function ConfigContainer() {
    _classCallCheck(this, ConfigContainer);
  }

  _createClass(ConfigContainer, null, [{
    key: "init",
    value: function init(_ref) {
      var dbConfig = _ref.dbConfig;
      this.config = {}; // initial configs

      this.config.dbConfig = dbConfig;
    }
  }, {
    key: "getConfigs",
    value: function getConfigs() {
      return this.config;
    }
  }]);

  return ConfigContainer;
}();

exports.ConfigContainer = ConfigContainer;