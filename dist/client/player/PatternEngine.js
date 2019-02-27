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

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _client = require('soundworks/client');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var audioContext = _client.audio.audioContext;

var SinePatternEngine = function (_audio$TimeEngine) {
	(0, _inherits3.default)(SinePatternEngine, _audio$TimeEngine);

	function SinePatternEngine(scheduler) {
		var pattern = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
		var frequency = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 500;
		var masterGain = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
		(0, _classCallCheck3.default)(this, SinePatternEngine);

		var _this = (0, _possibleConstructorReturn3.default)(this, (SinePatternEngine.__proto__ || (0, _getPrototypeOf2.default)(SinePatternEngine)).call(this));

		_this.period = Infinity;
		_this.pattern = pattern;
		_this.patternIndex = 0;
		_this.scheduler = scheduler;
		_this.frequency = frequency;
		_this.masterGain = masterGain;
		return _this;
	}

	(0, _createClass3.default)(SinePatternEngine, [{
		key: 'advanceTime',
		value: function advanceTime(synctime) {
			if (this.pattern[this.patternIndex] === 1) {
				var time = this.scheduler.audioTime;
				var sine = audioContext.createOscillator();
				sine.frequency.value = this.frequency;
				var _masterGain = audioContext.createGain();
				var env = audioContext.createGain();
				// console.log(this.masterGain)

				env.gain.setValueAtTime(0, time);
				env.gain.linearRampToValueAtTime(1, time + 0.01);
				env.gain.exponentialRampToValueAtTime(0.0001, time + 0.5);
				_masterGain.gain.value = this.masterGain;

				env.connect(_masterGain);
				_masterGain.connect(audioContext.destination);
				sine.connect(env);

				sine.start(time);
				sine.stop(time + 0.5);
			}

			this.patternIndex = (this.patternIndex + 1) % this.pattern.length;

			return synctime + this.period;
		}
	}]);
	return SinePatternEngine;
}(_client.audio.TimeEngine);

exports.default = SinePatternEngine;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlBhdHRlcm5FbmdpbmUuanMiXSwibmFtZXMiOlsiYXVkaW9Db250ZXh0IiwiYXVkaW8iLCJTaW5lUGF0dGVybkVuZ2luZSIsInNjaGVkdWxlciIsInBhdHRlcm4iLCJmcmVxdWVuY3kiLCJtYXN0ZXJHYWluIiwicGVyaW9kIiwiSW5maW5pdHkiLCJwYXR0ZXJuSW5kZXgiLCJzeW5jdGltZSIsInRpbWUiLCJhdWRpb1RpbWUiLCJzaW5lIiwiY3JlYXRlT3NjaWxsYXRvciIsInZhbHVlIiwiX21hc3RlckdhaW4iLCJjcmVhdGVHYWluIiwiZW52IiwiZ2FpbiIsInNldFZhbHVlQXRUaW1lIiwibGluZWFyUmFtcFRvVmFsdWVBdFRpbWUiLCJleHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lIiwiY29ubmVjdCIsImRlc3RpbmF0aW9uIiwic3RhcnQiLCJzdG9wIiwibGVuZ3RoIiwiVGltZUVuZ2luZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUdBLElBQU1BLGVBQWVDLGNBQU1ELFlBQTNCOztJQUdNRSxpQjs7O0FBQ0wsNEJBQVlDLFNBQVosRUFBc0U7QUFBQSxNQUEvQ0MsT0FBK0MsdUVBQXJDLEVBQXFDO0FBQUEsTUFBakNDLFNBQWlDLHVFQUFyQixHQUFxQjtBQUFBLE1BQWhCQyxVQUFnQix1RUFBSCxDQUFHO0FBQUE7O0FBQUE7O0FBRXJFLFFBQUtDLE1BQUwsR0FBY0MsUUFBZDtBQUNBLFFBQUtKLE9BQUwsR0FBZUEsT0FBZjtBQUNBLFFBQUtLLFlBQUwsR0FBb0IsQ0FBcEI7QUFDQSxRQUFLTixTQUFMLEdBQWlCQSxTQUFqQjtBQUNBLFFBQUtFLFNBQUwsR0FBaUJBLFNBQWpCO0FBQ0EsUUFBS0MsVUFBTCxHQUFrQkEsVUFBbEI7QUFQcUU7QUFRckU7Ozs7OEJBRVdJLFEsRUFBVTtBQUNyQixPQUFJLEtBQUtOLE9BQUwsQ0FBYSxLQUFLSyxZQUFsQixNQUFvQyxDQUF4QyxFQUEyQztBQUMxQyxRQUFNRSxPQUFPLEtBQUtSLFNBQUwsQ0FBZVMsU0FBNUI7QUFDQSxRQUFNQyxPQUFPYixhQUFhYyxnQkFBYixFQUFiO0FBQ0FELFNBQUtSLFNBQUwsQ0FBZVUsS0FBZixHQUF1QixLQUFLVixTQUE1QjtBQUNBLFFBQU1XLGNBQWNoQixhQUFhaUIsVUFBYixFQUFwQjtBQUNBLFFBQU1DLE1BQU1sQixhQUFhaUIsVUFBYixFQUFaO0FBQ0E7O0FBRUFDLFFBQUlDLElBQUosQ0FBU0MsY0FBVCxDQUF3QixDQUF4QixFQUEyQlQsSUFBM0I7QUFDQU8sUUFBSUMsSUFBSixDQUFTRSx1QkFBVCxDQUFpQyxDQUFqQyxFQUFvQ1YsT0FBTyxJQUEzQztBQUNBTyxRQUFJQyxJQUFKLENBQVNHLDRCQUFULENBQXNDLE1BQXRDLEVBQThDWCxPQUFPLEdBQXJEO0FBQ0FLLGdCQUFZRyxJQUFaLENBQWlCSixLQUFqQixHQUF5QixLQUFLVCxVQUE5Qjs7QUFHQVksUUFBSUssT0FBSixDQUFZUCxXQUFaO0FBQ0FBLGdCQUFZTyxPQUFaLENBQW9CdkIsYUFBYXdCLFdBQWpDO0FBQ0FYLFNBQUtVLE9BQUwsQ0FBYUwsR0FBYjs7QUFHQUwsU0FBS1ksS0FBTCxDQUFXZCxJQUFYO0FBQ0FFLFNBQUthLElBQUwsQ0FBVWYsT0FBTyxHQUFqQjtBQUNBOztBQUVELFFBQUtGLFlBQUwsR0FBb0IsQ0FBQyxLQUFLQSxZQUFMLEdBQW9CLENBQXJCLElBQTBCLEtBQUtMLE9BQUwsQ0FBYXVCLE1BQTNEOztBQUVBLFVBQU9qQixXQUFXLEtBQUtILE1BQXZCO0FBQ0E7OztFQXRDOEJOLGNBQU0yQixVOztrQkF5Q3ZCMUIsaUIiLCJmaWxlIjoiUGF0dGVybkVuZ2luZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGF1ZGlvIH0gZnJvbSAnc291bmR3b3Jrcy9jbGllbnQnO1xuXG5cbmNvbnN0IGF1ZGlvQ29udGV4dCA9IGF1ZGlvLmF1ZGlvQ29udGV4dDtcblxuXG5jbGFzcyBTaW5lUGF0dGVybkVuZ2luZSBleHRlbmRzIGF1ZGlvLlRpbWVFbmdpbmUge1xuXHRjb25zdHJ1Y3RvcihzY2hlZHVsZXIsIHBhdHRlcm4gPSBbXSwgZnJlcXVlbmN5ID0gNTAwLCBtYXN0ZXJHYWluID0gMSkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5wZXJpb2QgPSBJbmZpbml0eTtcblx0XHR0aGlzLnBhdHRlcm4gPSBwYXR0ZXJuO1xuXHRcdHRoaXMucGF0dGVybkluZGV4ID0gMDtcblx0XHR0aGlzLnNjaGVkdWxlciA9IHNjaGVkdWxlcjtcblx0XHR0aGlzLmZyZXF1ZW5jeSA9IGZyZXF1ZW5jeTtcblx0XHR0aGlzLm1hc3RlckdhaW4gPSBtYXN0ZXJHYWluO1xuXHR9XG5cblx0YWR2YW5jZVRpbWUoc3luY3RpbWUpIHtcblx0XHRpZiAodGhpcy5wYXR0ZXJuW3RoaXMucGF0dGVybkluZGV4XSA9PT0gMSkge1xuXHRcdFx0Y29uc3QgdGltZSA9IHRoaXMuc2NoZWR1bGVyLmF1ZGlvVGltZTtcblx0XHRcdGNvbnN0IHNpbmUgPSBhdWRpb0NvbnRleHQuY3JlYXRlT3NjaWxsYXRvcigpO1xuXHRcdFx0c2luZS5mcmVxdWVuY3kudmFsdWUgPSB0aGlzLmZyZXF1ZW5jeTtcblx0XHRcdGNvbnN0IF9tYXN0ZXJHYWluID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKTtcblx0XHRcdGNvbnN0IGVudiA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKCk7XG5cdFx0XHQvLyBjb25zb2xlLmxvZyh0aGlzLm1hc3RlckdhaW4pXG5cblx0XHRcdGVudi5nYWluLnNldFZhbHVlQXRUaW1lKDAsIHRpbWUpO1xuXHRcdFx0ZW52LmdhaW4ubGluZWFyUmFtcFRvVmFsdWVBdFRpbWUoMSwgdGltZSArIDAuMDEpO1xuXHRcdFx0ZW52LmdhaW4uZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSgwLjAwMDEsIHRpbWUgKyAwLjUpO1xuXHRcdFx0X21hc3RlckdhaW4uZ2Fpbi52YWx1ZSA9IHRoaXMubWFzdGVyR2FpbjtcblxuXG5cdFx0XHRlbnYuY29ubmVjdChfbWFzdGVyR2Fpbik7XG5cdFx0XHRfbWFzdGVyR2Fpbi5jb25uZWN0KGF1ZGlvQ29udGV4dC5kZXN0aW5hdGlvbik7XG5cdFx0XHRzaW5lLmNvbm5lY3QoZW52KTtcblxuXG5cdFx0XHRzaW5lLnN0YXJ0KHRpbWUpO1xuXHRcdFx0c2luZS5zdG9wKHRpbWUgKyAwLjUpO1xuXHRcdH1cblxuXHRcdHRoaXMucGF0dGVybkluZGV4ID0gKHRoaXMucGF0dGVybkluZGV4ICsgMSkgJSB0aGlzLnBhdHRlcm4ubGVuZ3RoO1xuXG5cdFx0cmV0dXJuIHN5bmN0aW1lICsgdGhpcy5wZXJpb2Q7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2luZVBhdHRlcm5FbmdpbmU7Il19