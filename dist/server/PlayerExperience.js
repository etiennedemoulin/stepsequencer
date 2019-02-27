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

var _server = require('soundworks/server');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// server-side 'player' experience.
var PlayerExperience = function (_Experience) {
  (0, _inherits3.default)(PlayerExperience, _Experience);

  function PlayerExperience(clientType) {
    (0, _classCallCheck3.default)(this, PlayerExperience);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PlayerExperience.__proto__ || (0, _getPrototypeOf2.default)(PlayerExperience)).call(this, clientType));

    _this.checkin = _this.require('checkin');
    _this.sharedConfig = _this.require('shared-config');
    _this.sharedParams = _this.require('shared-params');
    _this.audioBufferManager = _this.require('audio-buffer-manager');

    //  this.sync = this.require('sync'); //on veut la synchro
    _this.syncScheduler = _this.require('sync-scheduler'); //on synchronise tous nos copains
    return _this;
  }

  (0, _createClass3.default)(PlayerExperience, [{
    key: 'start',
    value: function start() {}
  }, {
    key: 'enter',
    value: function enter(client) {
      (0, _get3.default)(PlayerExperience.prototype.__proto__ || (0, _getPrototypeOf2.default)(PlayerExperience.prototype), 'enter', this).call(this, client);

      this.sharedParams.update('numPlayers', this.clients.length);
    }
  }, {
    key: 'exit',
    value: function exit(client) {
      (0, _get3.default)(PlayerExperience.prototype.__proto__ || (0, _getPrototypeOf2.default)(PlayerExperience.prototype), 'exit', this).call(this, client);

      this.sharedParams.update('numPlayers', this.clients.length);
    }
  }]);
  return PlayerExperience;
}(_server.Experience);

exports.default = PlayerExperience;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlBsYXllckV4cGVyaWVuY2UuanMiXSwibmFtZXMiOlsiUGxheWVyRXhwZXJpZW5jZSIsImNsaWVudFR5cGUiLCJjaGVja2luIiwicmVxdWlyZSIsInNoYXJlZENvbmZpZyIsInNoYXJlZFBhcmFtcyIsImF1ZGlvQnVmZmVyTWFuYWdlciIsInN5bmNTY2hlZHVsZXIiLCJjbGllbnQiLCJ1cGRhdGUiLCJjbGllbnRzIiwibGVuZ3RoIiwiRXhwZXJpZW5jZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTtJQUNxQkEsZ0I7OztBQUNuQiw0QkFBWUMsVUFBWixFQUF3QjtBQUFBOztBQUFBLDBKQUNoQkEsVUFEZ0I7O0FBR3RCLFVBQUtDLE9BQUwsR0FBZSxNQUFLQyxPQUFMLENBQWEsU0FBYixDQUFmO0FBQ0EsVUFBS0MsWUFBTCxHQUFvQixNQUFLRCxPQUFMLENBQWEsZUFBYixDQUFwQjtBQUNBLFVBQUtFLFlBQUwsR0FBb0IsTUFBS0YsT0FBTCxDQUFhLGVBQWIsQ0FBcEI7QUFDQSxVQUFLRyxrQkFBTCxHQUEwQixNQUFLSCxPQUFMLENBQWEsc0JBQWIsQ0FBMUI7O0FBRUo7QUFDSSxVQUFLSSxhQUFMLEdBQXFCLE1BQUtKLE9BQUwsQ0FBYSxnQkFBYixDQUFyQixDQVRzQixDQVMrQjtBQVQvQjtBQVV2Qjs7Ozs0QkFFTyxDQUVQOzs7MEJBRUtLLE0sRUFBUTtBQUNaLHNKQUFZQSxNQUFaOztBQUVBLFdBQUtILFlBQUwsQ0FBa0JJLE1BQWxCLENBQXlCLFlBQXpCLEVBQXVDLEtBQUtDLE9BQUwsQ0FBYUMsTUFBcEQ7QUFDRDs7O3lCQUVJSCxNLEVBQVE7QUFDWCxxSkFBV0EsTUFBWDs7QUFFQSxXQUFLSCxZQUFMLENBQWtCSSxNQUFsQixDQUF5QixZQUF6QixFQUF1QyxLQUFLQyxPQUFMLENBQWFDLE1BQXBEO0FBQ0Q7OztFQTNCMkNDLGtCOztrQkFBekJaLGdCIiwiZmlsZSI6IlBsYXllckV4cGVyaWVuY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFeHBlcmllbmNlIH0gZnJvbSAnc291bmR3b3Jrcy9zZXJ2ZXInO1xuXG4vLyBzZXJ2ZXItc2lkZSAncGxheWVyJyBleHBlcmllbmNlLlxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyRXhwZXJpZW5jZSBleHRlbmRzIEV4cGVyaWVuY2Uge1xuICBjb25zdHJ1Y3RvcihjbGllbnRUeXBlKSB7XG4gICAgc3VwZXIoY2xpZW50VHlwZSk7XG5cbiAgICB0aGlzLmNoZWNraW4gPSB0aGlzLnJlcXVpcmUoJ2NoZWNraW4nKTtcbiAgICB0aGlzLnNoYXJlZENvbmZpZyA9IHRoaXMucmVxdWlyZSgnc2hhcmVkLWNvbmZpZycpO1xuICAgIHRoaXMuc2hhcmVkUGFyYW1zID0gdGhpcy5yZXF1aXJlKCdzaGFyZWQtcGFyYW1zJyk7XG4gICAgdGhpcy5hdWRpb0J1ZmZlck1hbmFnZXIgPSB0aGlzLnJlcXVpcmUoJ2F1ZGlvLWJ1ZmZlci1tYW5hZ2VyJyk7XG5cbi8vICB0aGlzLnN5bmMgPSB0aGlzLnJlcXVpcmUoJ3N5bmMnKTsgLy9vbiB2ZXV0IGxhIHN5bmNocm9cbiAgICB0aGlzLnN5bmNTY2hlZHVsZXIgPSB0aGlzLnJlcXVpcmUoJ3N5bmMtc2NoZWR1bGVyJyk7IC8vb24gc3luY2hyb25pc2UgdG91cyBub3MgY29wYWluc1xuICB9XG5cbiAgc3RhcnQoKSB7XG5cbiAgfVxuXG4gIGVudGVyKGNsaWVudCkge1xuICAgIHN1cGVyLmVudGVyKGNsaWVudCk7XG5cbiAgICB0aGlzLnNoYXJlZFBhcmFtcy51cGRhdGUoJ251bVBsYXllcnMnLCB0aGlzLmNsaWVudHMubGVuZ3RoKTtcbiAgfVxuXG4gIGV4aXQoY2xpZW50KSB7XG4gICAgc3VwZXIuZXhpdChjbGllbnQpO1xuXG4gICAgdGhpcy5zaGFyZWRQYXJhbXMudXBkYXRlKCdudW1QbGF5ZXJzJywgdGhpcy5jbGllbnRzLmxlbmd0aCk7XG4gIH1cbn1cbiJdfQ==