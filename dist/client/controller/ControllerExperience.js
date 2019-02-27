'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _client = require('soundworks/client');

var _SharedParamsComponent = require('./SharedParamsComponent');

var _SharedParamsComponent2 = _interopRequireDefault(_SharedParamsComponent);

var _LogComponent = require('./LogComponent');

var _LogComponent2 = _interopRequireDefault(_LogComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var template = '\n  <div id="shared-params"></div>\n  <div id="log"></div>\n';

var ControllerExperience = function (_Experience) {
  (0, _inherits3.default)(ControllerExperience, _Experience);

  function ControllerExperience() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, ControllerExperience);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ControllerExperience.__proto__ || (0, _getPrototypeOf2.default)(ControllerExperience)).call(this));

    _this.sharedParams = _this.require('shared-params');
    _this.sharedParamsComponent = new _SharedParamsComponent2.default(_this, _this.sharedParams);
    _this.logComponent = new _LogComponent2.default(_this);

    _this.setGuiOptions('numPlayers', { readonly: true }); //ici c'est cool

    if (options.auth) _this.auth = _this.require('auth');
    return _this;
  }

  (0, _createClass3.default)(ControllerExperience, [{
    key: 'start',
    value: function start() {
      var _this2 = this;

      (0, _get3.default)(ControllerExperience.prototype.__proto__ || (0, _getPrototypeOf2.default)(ControllerExperience.prototype), 'start', this).call(this);

      this.view = new _client.View(template, {}, {}, { id: 'controller' });

      this.show().then(function () {
        _this2.sharedParamsComponent.enter();
        _this2.logComponent.enter();

        _this2.receive('log', function (type) {
          var _logComponent;

          for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }

          switch (type) {
            case 'error':
              (_logComponent = _this2.logComponent).error.apply(_logComponent, args);
              break;
          }
        });

        // new controllers.Slider({
        //   label: 'period',
        //   min: 0.01,
        //   max: 4,
        //   step: 0.01,
        //   container: '#container',
        //   default: 1,
        //   callback: (value) => {
        //     patternEngine.period = value;
        //   }
        // });
      });
    }
  }, {
    key: 'setGuiOptions',
    value: function setGuiOptions(name, options) {
      this.sharedParamsComponent.setGuiOptions(name, options);
    }
  }]);
  return ControllerExperience;
}(_client.Experience);

exports.default = ControllerExperience;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbnRyb2xsZXJFeHBlcmllbmNlLmpzIl0sIm5hbWVzIjpbInRlbXBsYXRlIiwiQ29udHJvbGxlckV4cGVyaWVuY2UiLCJvcHRpb25zIiwic2hhcmVkUGFyYW1zIiwicmVxdWlyZSIsInNoYXJlZFBhcmFtc0NvbXBvbmVudCIsIlNoYXJlZFBhcmFtc0NvbXBvbmVudCIsImxvZ0NvbXBvbmVudCIsIkxvZ0NvbXBvbmVudCIsInNldEd1aU9wdGlvbnMiLCJyZWFkb25seSIsImF1dGgiLCJ2aWV3IiwiVmlldyIsImlkIiwic2hvdyIsInRoZW4iLCJlbnRlciIsInJlY2VpdmUiLCJ0eXBlIiwiYXJncyIsImVycm9yIiwibmFtZSIsIkV4cGVyaWVuY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLHlFQUFOOztJQUtNQyxvQjs7O0FBQ0osa0NBQTBCO0FBQUEsUUFBZEMsT0FBYyx1RUFBSixFQUFJO0FBQUE7O0FBQUE7O0FBR3hCLFVBQUtDLFlBQUwsR0FBb0IsTUFBS0MsT0FBTCxDQUFhLGVBQWIsQ0FBcEI7QUFDQSxVQUFLQyxxQkFBTCxHQUE2QixJQUFJQywrQkFBSixRQUFnQyxNQUFLSCxZQUFyQyxDQUE3QjtBQUNBLFVBQUtJLFlBQUwsR0FBb0IsSUFBSUMsc0JBQUosT0FBcEI7O0FBRUEsVUFBS0MsYUFBTCxDQUFtQixZQUFuQixFQUFpQyxFQUFFQyxVQUFVLElBQVosRUFBakMsRUFQd0IsQ0FPOEI7O0FBRXRELFFBQUlSLFFBQVFTLElBQVosRUFDRSxNQUFLQSxJQUFMLEdBQVksTUFBS1AsT0FBTCxDQUFhLE1BQWIsQ0FBWjtBQVZzQjtBQVd6Qjs7Ozs0QkFFTztBQUFBOztBQUNOOztBQUVBLFdBQUtRLElBQUwsR0FBWSxJQUFJQyxZQUFKLENBQVNiLFFBQVQsRUFBbUIsRUFBbkIsRUFBdUIsRUFBdkIsRUFBMkIsRUFBRWMsSUFBSSxZQUFOLEVBQTNCLENBQVo7O0FBRUEsV0FBS0MsSUFBTCxHQUFZQyxJQUFaLENBQWlCLFlBQU07QUFDckIsZUFBS1gscUJBQUwsQ0FBMkJZLEtBQTNCO0FBQ0EsZUFBS1YsWUFBTCxDQUFrQlUsS0FBbEI7O0FBRUEsZUFBS0MsT0FBTCxDQUFhLEtBQWIsRUFBb0IsVUFBQ0MsSUFBRCxFQUFtQjtBQUFBOztBQUFBLDRDQUFUQyxJQUFTO0FBQVRBLGdCQUFTO0FBQUE7O0FBQ3JDLGtCQUFRRCxJQUFSO0FBQ0UsaUJBQUssT0FBTDtBQUNFLHNDQUFLWixZQUFMLEVBQWtCYyxLQUFsQixzQkFBMkJELElBQTNCO0FBQ0E7QUFISjtBQUtELFNBTkQ7O0FBUUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVDLE9BeEJEO0FBeUJEOzs7a0NBRWFFLEksRUFBTXBCLE8sRUFBUztBQUMzQixXQUFLRyxxQkFBTCxDQUEyQkksYUFBM0IsQ0FBeUNhLElBQXpDLEVBQStDcEIsT0FBL0M7QUFDRDs7O0VBaERnQ3FCLGtCOztrQkFtRHBCdEIsb0IiLCJmaWxlIjoiQ29udHJvbGxlckV4cGVyaWVuY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge8KgRXhwZXJpZW5jZSwgVmlldyB9IGZyb20gJ3NvdW5kd29ya3MvY2xpZW50JztcbmltcG9ydCBTaGFyZWRQYXJhbXNDb21wb25lbnQgZnJvbSAnLi9TaGFyZWRQYXJhbXNDb21wb25lbnQnO1xuaW1wb3J0IExvZ0NvbXBvbmVudCBmcm9tICcuL0xvZ0NvbXBvbmVudCc7XG5cbmNvbnN0IHRlbXBsYXRlID0gYFxuICA8ZGl2IGlkPVwic2hhcmVkLXBhcmFtc1wiPjwvZGl2PlxuICA8ZGl2IGlkPVwibG9nXCI+PC9kaXY+XG5gO1xuXG5jbGFzcyBDb250cm9sbGVyRXhwZXJpZW5jZSBleHRlbmRzIEV4cGVyaWVuY2Uge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5zaGFyZWRQYXJhbXMgPSB0aGlzLnJlcXVpcmUoJ3NoYXJlZC1wYXJhbXMnKTtcbiAgICB0aGlzLnNoYXJlZFBhcmFtc0NvbXBvbmVudCA9IG5ldyBTaGFyZWRQYXJhbXNDb21wb25lbnQodGhpcywgdGhpcy5zaGFyZWRQYXJhbXMpO1xuICAgIHRoaXMubG9nQ29tcG9uZW50ID0gbmV3IExvZ0NvbXBvbmVudCh0aGlzKTtcblxuICAgIHRoaXMuc2V0R3VpT3B0aW9ucygnbnVtUGxheWVycycsIHsgcmVhZG9ubHk6IHRydWUgfSk7IC8vaWNpIGMnZXN0IGNvb2xcblxuICAgIGlmIChvcHRpb25zLmF1dGgpXG4gICAgICB0aGlzLmF1dGggPSB0aGlzLnJlcXVpcmUoJ2F1dGgnKTtcbiAgfVxuXG4gIHN0YXJ0KCkge1xuICAgIHN1cGVyLnN0YXJ0KCk7XG5cbiAgICB0aGlzLnZpZXcgPSBuZXcgVmlldyh0ZW1wbGF0ZSwge30sIHt9LCB7IGlkOiAnY29udHJvbGxlcicgfSk7XG5cbiAgICB0aGlzLnNob3coKS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMuc2hhcmVkUGFyYW1zQ29tcG9uZW50LmVudGVyKCk7XG4gICAgICB0aGlzLmxvZ0NvbXBvbmVudC5lbnRlcigpO1xuXG4gICAgICB0aGlzLnJlY2VpdmUoJ2xvZycsICh0eXBlLCAuLi5hcmdzKSA9PiB7XG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgIGNhc2UgJ2Vycm9yJzpcbiAgICAgICAgICAgIHRoaXMubG9nQ29tcG9uZW50LmVycm9yKC4uLmFyZ3MpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgLy8gbmV3IGNvbnRyb2xsZXJzLlNsaWRlcih7XG4gICAgLy8gICBsYWJlbDogJ3BlcmlvZCcsXG4gICAgLy8gICBtaW46IDAuMDEsXG4gICAgLy8gICBtYXg6IDQsXG4gICAgLy8gICBzdGVwOiAwLjAxLFxuICAgIC8vICAgY29udGFpbmVyOiAnI2NvbnRhaW5lcicsXG4gICAgLy8gICBkZWZhdWx0OiAxLFxuICAgIC8vICAgY2FsbGJhY2s6ICh2YWx1ZSkgPT4ge1xuICAgIC8vICAgICBwYXR0ZXJuRW5naW5lLnBlcmlvZCA9IHZhbHVlO1xuICAgIC8vICAgfVxuICAgIC8vIH0pO1xuXG4gICAgfSk7XG4gIH1cblxuICBzZXRHdWlPcHRpb25zKG5hbWUsIG9wdGlvbnMpIHtcbiAgICB0aGlzLnNoYXJlZFBhcmFtc0NvbXBvbmVudC5zZXRHdWlPcHRpb25zKG5hbWUsIG9wdGlvbnMpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENvbnRyb2xsZXJFeHBlcmllbmNlO1xuIl19