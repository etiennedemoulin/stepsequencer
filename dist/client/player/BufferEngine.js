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

var BufferEngine = function (_audio$TimeEngine) {
	(0, _inherits3.default)(BufferEngine, _audio$TimeEngine);

	function BufferEngine(scheduler) {
		var pattern = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
		var buffer = arguments[2];
		var masterGain = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
		(0, _classCallCheck3.default)(this, BufferEngine);

		var _this = (0, _possibleConstructorReturn3.default)(this, (BufferEngine.__proto__ || (0, _getPrototypeOf2.default)(BufferEngine)).call(this));

		_this.period = Infinity;
		_this.pattern = pattern;
		_this.patternIndex = 0;
		_this.scheduler = scheduler;
		_this.buffer = buffer;
		_this.masterGain = masterGain;
		return _this;
	}

	(0, _createClass3.default)(BufferEngine, [{
		key: 'advanceTime',
		value: function advanceTime(synctime) {
			if (this.pattern[this.patternIndex] === 1) {
				var _masterGain = audioContext.createGain();

				// console.log();


				_masterGain.gain.value = this.masterGain;
				var time = this.scheduler.audioTime;
				var src = audioContext.createBufferSource();
				src.buffer = this.buffer;
				src.connect(_masterGain);
				_masterGain.connect(audioContext.destination);
				src.start(time);
				src.stop(time + 0.5);
			}

			this.patternIndex = (this.patternIndex + 1) % this.pattern.length;

			return synctime + this.period;
		}
	}]);
	return BufferEngine;
}(_client.audio.TimeEngine);

exports.default = BufferEngine;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkJ1ZmZlckVuZ2luZS5qcyJdLCJuYW1lcyI6WyJhdWRpb0NvbnRleHQiLCJhdWRpbyIsIkJ1ZmZlckVuZ2luZSIsInNjaGVkdWxlciIsInBhdHRlcm4iLCJidWZmZXIiLCJtYXN0ZXJHYWluIiwicGVyaW9kIiwiSW5maW5pdHkiLCJwYXR0ZXJuSW5kZXgiLCJzeW5jdGltZSIsIl9tYXN0ZXJHYWluIiwiY3JlYXRlR2FpbiIsImdhaW4iLCJ2YWx1ZSIsInRpbWUiLCJhdWRpb1RpbWUiLCJzcmMiLCJjcmVhdGVCdWZmZXJTb3VyY2UiLCJjb25uZWN0IiwiZGVzdGluYXRpb24iLCJzdGFydCIsInN0b3AiLCJsZW5ndGgiLCJUaW1lRW5naW5lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBR0EsSUFBTUEsZUFBZUMsY0FBTUQsWUFBM0I7O0lBR01FLFk7OztBQUNMLHVCQUFZQyxTQUFaLEVBQTZEO0FBQUEsTUFBdENDLE9BQXNDLHVFQUE1QixFQUE0QjtBQUFBLE1BQXhCQyxNQUF3QjtBQUFBLE1BQWhCQyxVQUFnQix1RUFBSCxDQUFHO0FBQUE7O0FBQUE7O0FBRTVELFFBQUtDLE1BQUwsR0FBY0MsUUFBZDtBQUNBLFFBQUtKLE9BQUwsR0FBZUEsT0FBZjtBQUNBLFFBQUtLLFlBQUwsR0FBb0IsQ0FBcEI7QUFDQSxRQUFLTixTQUFMLEdBQWlCQSxTQUFqQjtBQUNBLFFBQUtFLE1BQUwsR0FBY0EsTUFBZDtBQUNBLFFBQUtDLFVBQUwsR0FBa0JBLFVBQWxCO0FBUDREO0FBUTVEOzs7OzhCQUVXSSxRLEVBQVU7QUFDckIsT0FBSSxLQUFLTixPQUFMLENBQWEsS0FBS0ssWUFBbEIsTUFBb0MsQ0FBeEMsRUFBMkM7QUFDMUMsUUFBTUUsY0FBY1gsYUFBYVksVUFBYixFQUFwQjs7QUFFQTs7O0FBR0FELGdCQUFZRSxJQUFaLENBQWlCQyxLQUFqQixHQUF5QixLQUFLUixVQUE5QjtBQUNBLFFBQU1TLE9BQU8sS0FBS1osU0FBTCxDQUFlYSxTQUE1QjtBQUNBLFFBQU1DLE1BQU1qQixhQUFha0Isa0JBQWIsRUFBWjtBQUNBRCxRQUFJWixNQUFKLEdBQWEsS0FBS0EsTUFBbEI7QUFDQVksUUFBSUUsT0FBSixDQUFZUixXQUFaO0FBQ0FBLGdCQUFZUSxPQUFaLENBQW9CbkIsYUFBYW9CLFdBQWpDO0FBQ0FILFFBQUlJLEtBQUosQ0FBVU4sSUFBVjtBQUNBRSxRQUFJSyxJQUFKLENBQVNQLE9BQU8sR0FBaEI7QUFJQTs7QUFFRCxRQUFLTixZQUFMLEdBQW9CLENBQUMsS0FBS0EsWUFBTCxHQUFvQixDQUFyQixJQUEwQixLQUFLTCxPQUFMLENBQWFtQixNQUEzRDs7QUFFQSxVQUFPYixXQUFXLEtBQUtILE1BQXZCO0FBQ0E7OztFQWxDeUJOLGNBQU11QixVOztrQkFxQ2xCdEIsWSIsImZpbGUiOiJCdWZmZXJFbmdpbmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhdWRpbyB9IGZyb20gJ3NvdW5kd29ya3MvY2xpZW50JztcblxuXG5jb25zdCBhdWRpb0NvbnRleHQgPSBhdWRpby5hdWRpb0NvbnRleHQ7XG5cblxuY2xhc3MgQnVmZmVyRW5naW5lIGV4dGVuZHMgYXVkaW8uVGltZUVuZ2luZSB7XG5cdGNvbnN0cnVjdG9yKHNjaGVkdWxlciwgcGF0dGVybiA9IFtdLCBidWZmZXIsIG1hc3RlckdhaW4gPSAxKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLnBlcmlvZCA9IEluZmluaXR5O1xuXHRcdHRoaXMucGF0dGVybiA9IHBhdHRlcm47XG5cdFx0dGhpcy5wYXR0ZXJuSW5kZXggPSAwO1xuXHRcdHRoaXMuc2NoZWR1bGVyID0gc2NoZWR1bGVyO1xuXHRcdHRoaXMuYnVmZmVyID0gYnVmZmVyO1xuXHRcdHRoaXMubWFzdGVyR2FpbiA9IG1hc3RlckdhaW47XG5cdH1cblxuXHRhZHZhbmNlVGltZShzeW5jdGltZSkge1xuXHRcdGlmICh0aGlzLnBhdHRlcm5bdGhpcy5wYXR0ZXJuSW5kZXhdID09PSAxKSB7XG5cdFx0XHRjb25zdCBfbWFzdGVyR2FpbiA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKCk7XG5cblx0XHRcdC8vIGNvbnNvbGUubG9nKCk7XG5cdFx0XHRcblxuXHRcdFx0X21hc3RlckdhaW4uZ2Fpbi52YWx1ZSA9IHRoaXMubWFzdGVyR2Fpbjtcblx0XHRcdGNvbnN0IHRpbWUgPSB0aGlzLnNjaGVkdWxlci5hdWRpb1RpbWU7XG5cdFx0XHRjb25zdCBzcmMgPSBhdWRpb0NvbnRleHQuY3JlYXRlQnVmZmVyU291cmNlKCk7XG5cdFx0XHRzcmMuYnVmZmVyID0gdGhpcy5idWZmZXI7XG5cdFx0XHRzcmMuY29ubmVjdChfbWFzdGVyR2Fpbik7XG5cdFx0XHRfbWFzdGVyR2Fpbi5jb25uZWN0KGF1ZGlvQ29udGV4dC5kZXN0aW5hdGlvbik7XG5cdFx0XHRzcmMuc3RhcnQodGltZSk7XG5cdFx0XHRzcmMuc3RvcCh0aW1lICsgMC41KTtcblxuXG5cblx0XHR9XG5cblx0XHR0aGlzLnBhdHRlcm5JbmRleCA9ICh0aGlzLnBhdHRlcm5JbmRleCArIDEpICUgdGhpcy5wYXR0ZXJuLmxlbmd0aDtcblxuXHRcdHJldHVybiBzeW5jdGltZSArIHRoaXMucGVyaW9kO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJ1ZmZlckVuZ2luZTsiXX0=