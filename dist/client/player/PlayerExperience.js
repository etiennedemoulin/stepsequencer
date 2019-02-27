'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var soundworks = _interopRequireWildcard(_client);

var _PatternEngine = require('./PatternEngine');

var _PatternEngine2 = _interopRequireDefault(_PatternEngine);

var _basicControllers = require('@ircam/basic-controllers');

var controllers = _interopRequireWildcard(_basicControllers);

var _BufferEngine = require('./BufferEngine');

var _BufferEngine2 = _interopRequireDefault(_BufferEngine);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//on se simplifie un peu l'écriture
var audioContext = soundworks.audioContext;
var audio = soundworks.audio;

//pour faire des gui, on passe par la!! (mais ça va changer tkt frer)
var template = '\n  <div class="foreground">\n    <div class="section-top flex-middle"></div>\n    <div class="section-center flex-center">\n      <div>\n        <% for (var i = 0; i < pattern.length; i++) { %>\n          <input class="beat" type="checkbox" data-index="<%= i %>"<%= pattern[i] === 1 ? \' checked\' : \'\' %> />\n        <% } %>\n        <br /><br />\n        frequency\n        <input class="slider" id="frequency" type="range" min="100" max="1000" step=\'1\' value="<%= frequency %>" />\n        <br />\n        sound\n        <input class=\'slider\' id=\'soundNum\' type="range" min="0" max="2" step="1" value=\'<%= soundNum %>\' />\n        <br />\n        masterGain\n        <input class=\'slider\' id=\'masterGain\' type=\'range\' min=\'-80\' max="0" step=\'0.5\' value=\'<%= masterGain %>\' />\n      </div>\n    </div>\n    <div class="section-bottom flex-middle"></div>\n  </div>\n';

var PlayerExperience = function (_soundworks$Experienc) {
  (0, _inherits3.default)(PlayerExperience, _soundworks$Experienc);

  function PlayerExperience(assetsDomain) {
    (0, _classCallCheck3.default)(this, PlayerExperience);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PlayerExperience.__proto__ || (0, _getPrototypeOf2.default)(PlayerExperience)).call(this));

    _this.platform = _this.require('platform', { features: ['web-audio'] });
    _this.checkin = _this.require('checkin', { showDialog: false });
    _this.sharedParams = _this.require('shared-params');
    //  this.sync = this.require('sync'); //on veut la synchro
    _this.syncScheduler = _this.require('sync-scheduler'); //on synchronise tous nos copains
    _this.audioBufferManager = _this.require('audio-buffer-manager', { files: ['sounds/clicks/click.mp3', 'sounds/clicks/clack.mp3', 'sounds/clicks/clock.mp3'] });

    return _this;
  }

  (0, _createClass3.default)(PlayerExperience, [{
    key: 'start',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var _this2 = this;

        var frequency, soundNum, masterGain;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                (0, _get3.default)(PlayerExperience.prototype.__proto__ || (0, _getPrototypeOf2.default)(PlayerExperience.prototype), 'start', this).call(this);
                this.pattern = [1, 0, 1, 0, 1, 0, 1, 0];
                frequency = 500;
                soundNum = 1;
                masterGain = 1;

                this.buffer = this.audioBufferManager.data[soundNum];

                // this.patternEngine = new PatternEngine(this.syncScheduler, this.pattern, frequency);
                this.patternEngine = new _BufferEngine2.default(this.syncScheduler, this.pattern, this.buffer, masterGain);

                this.view = new soundworks.SegmentedView(template, {
                  pattern: this.pattern,
                  frequency: frequency,
                  soundNum: soundNum,
                  masterGain: masterGain
                }, {
                  'click .beat': function clickBeat(e) {
                    var $el = e.target;
                    var index = parseInt($el.dataset.index);
                    var value = $el.checked ? 1 : 0;
                    _this2.pattern[index] = value;
                  },
                  'input #frequency': function inputFrequency(e) {
                    var $el = e.target;
                    var frequency = parseInt($el.value);
                    _this2.patternEngine.frequency = frequency;
                  },
                  'input #soundNum': function inputSoundNum(e) {
                    var $el = e.target;
                    var soundNum = parseInt($el.value);
                    _this2.patternEngine.buffer = _this2.audioBufferManager.data[soundNum];
                  },
                  'input #masterGain': function inputMasterGain(e) {
                    var $el = e.target;
                    var masterGain = Math.pow(10, parseFloat($el.value) / 20);
                    // console.log(masterGain);
                    // this.masterGain = ;
                    _this2.patternEngine.masterGain = masterGain;
                  }
                }, {});

                //on est sur que la page est affichée
                _context.next = 10;
                return this.show();

              case 10:

                this.sharedParams.addParamListener('BPM', function () {
                  return _this2.updateEnginePeriod();
                });
                this.sharedParams.addParamListener('numBeats', function () {
                  return _this2.updateEnginePeriod();
                });
                // this.sharedParams.addParamListener('son', () => this.updateEnginePeriod());
                this.updateEnginePeriod();

              case 13:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function start() {
        return _ref.apply(this, arguments);
      }

      return start;
    }()
  }, {
    key: 'updateEnginePeriod',
    value: function updateEnginePeriod() {
      if (this.patternEngine.master) {
        this.syncScheduler.remove(this.patternEngine);
      }
      var BPM = this.sharedParams.getValue('BPM');
      var numBeats = this.sharedParams.getValue('numBeats');
      // this.son = this.sharedParams.getValue('son');
      var period = 60 / BPM / numBeats;
      //        const numeroClient = soundworks.client.index % frequencies.length;


      //TEMPS SYNCHRONISE
      var syncTime = this.syncScheduler.syncTime; //on recupere le temps absolu du serveur
      var numPeriodsSinceOrigin = Math.ceil(syncTime / period);
      var nextPatternIndex = numPeriodsSinceOrigin % this.pattern.length;
      var startTime = numPeriodsSinceOrigin * period; //division arrondie à l'entier supérieure    
      this.patternEngine.period = period;
      this.patternEngine.patternIndex = nextPatternIndex;
      this.syncScheduler.add(this.patternEngine, startTime); //on schedule le patternEngine
    }

    // const period = 0.1


    //TEMPS NON SYNCHRO 
    // const scheduler = audio.getScheduler();


    //Dans le cas d'élements simples!
    //il faut updater le parametre à la main, c'est à dire patternEngine.period = blabla


  }]);
  return PlayerExperience;
}(soundworks.Experience);

exports.default = PlayerExperience;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlBsYXllckV4cGVyaWVuY2UuanMiXSwibmFtZXMiOlsic291bmR3b3JrcyIsImNvbnRyb2xsZXJzIiwiYXVkaW9Db250ZXh0IiwiYXVkaW8iLCJ0ZW1wbGF0ZSIsIlBsYXllckV4cGVyaWVuY2UiLCJhc3NldHNEb21haW4iLCJwbGF0Zm9ybSIsInJlcXVpcmUiLCJmZWF0dXJlcyIsImNoZWNraW4iLCJzaG93RGlhbG9nIiwic2hhcmVkUGFyYW1zIiwic3luY1NjaGVkdWxlciIsImF1ZGlvQnVmZmVyTWFuYWdlciIsImZpbGVzIiwicGF0dGVybiIsImZyZXF1ZW5jeSIsInNvdW5kTnVtIiwibWFzdGVyR2FpbiIsImJ1ZmZlciIsImRhdGEiLCJwYXR0ZXJuRW5naW5lIiwiQnVmZmVyRW5naW5lIiwidmlldyIsIlNlZ21lbnRlZFZpZXciLCJlIiwiJGVsIiwidGFyZ2V0IiwiaW5kZXgiLCJwYXJzZUludCIsImRhdGFzZXQiLCJ2YWx1ZSIsImNoZWNrZWQiLCJNYXRoIiwicG93IiwicGFyc2VGbG9hdCIsInNob3ciLCJhZGRQYXJhbUxpc3RlbmVyIiwidXBkYXRlRW5naW5lUGVyaW9kIiwibWFzdGVyIiwicmVtb3ZlIiwiQlBNIiwiZ2V0VmFsdWUiLCJudW1CZWF0cyIsInBlcmlvZCIsInN5bmNUaW1lIiwibnVtUGVyaW9kc1NpbmNlT3JpZ2luIiwiY2VpbCIsIm5leHRQYXR0ZXJuSW5kZXgiLCJsZW5ndGgiLCJzdGFydFRpbWUiLCJwYXR0ZXJuSW5kZXgiLCJhZGQiLCJFeHBlcmllbmNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztJQUFZQSxVOztBQUNaOzs7O0FBQ0E7O0lBQVlDLFc7O0FBQ1o7Ozs7Ozs7O0FBSUE7QUFDQSxJQUFNQyxlQUFlRixXQUFXRSxZQUFoQztBQUNBLElBQU1DLFFBQVFILFdBQVdHLEtBQXpCOztBQUlBO0FBQ0EsSUFBTUMsdzRCQUFOOztJQTBCTUMsZ0I7OztBQUNKLDRC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QUFXc0QsVTs7a0JBc0gzQmpELGdCIiwiZmlsZSI6IlBsYXllckV4cGVyaWVuY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBzb3VuZHdvcmtzIGZyb20gJ3NvdW5kd29ya3MvY2xpZW50JztcbmltcG9ydCBQYXR0ZXJuRW5naW5lIGZyb20gJy4vUGF0dGVybkVuZ2luZSdcbmltcG9ydCAqIGFzIGNvbnRyb2xsZXJzIGZyb20gJ0BpcmNhbS9iYXNpYy1jb250cm9sbGVycyc7XG5pbXBvcnQgQnVmZmVyRW5naW5lIGZyb20gJy4vQnVmZmVyRW5naW5lJztcblxuXG5cbi8vb24gc2Ugc2ltcGxpZmllIHVuIHBldSBsJ8OpY3JpdHVyZVxuY29uc3QgYXVkaW9Db250ZXh0ID0gc291bmR3b3Jrcy5hdWRpb0NvbnRleHQ7XG5jb25zdCBhdWRpbyA9IHNvdW5kd29ya3MuYXVkaW87XG5cblxuXG4vL3BvdXIgZmFpcmUgZGVzIGd1aSwgb24gcGFzc2UgcGFyIGxhISEgKG1haXMgw6dhIHZhIGNoYW5nZXIgdGt0IGZyZXIpXG5jb25zdCB0ZW1wbGF0ZSA9IGBcbiAgPGRpdiBjbGFzcz1cImZvcmVncm91bmRcIj5cbiAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbi10b3AgZmxleC1taWRkbGVcIj48L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbi1jZW50ZXIgZmxleC1jZW50ZXJcIj5cbiAgICAgIDxkaXY+XG4gICAgICAgIDwlIGZvciAodmFyIGkgPSAwOyBpIDwgcGF0dGVybi5sZW5ndGg7IGkrKykgeyAlPlxuICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImJlYXRcIiB0eXBlPVwiY2hlY2tib3hcIiBkYXRhLWluZGV4PVwiPCU9IGkgJT5cIjwlPSBwYXR0ZXJuW2ldID09PSAxID8gJyBjaGVja2VkJyA6ICcnICU+IC8+XG4gICAgICAgIDwlIH0gJT5cbiAgICAgICAgPGJyIC8+PGJyIC8+XG4gICAgICAgIGZyZXF1ZW5jeVxuICAgICAgICA8aW5wdXQgY2xhc3M9XCJzbGlkZXJcIiBpZD1cImZyZXF1ZW5jeVwiIHR5cGU9XCJyYW5nZVwiIG1pbj1cIjEwMFwiIG1heD1cIjEwMDBcIiBzdGVwPScxJyB2YWx1ZT1cIjwlPSBmcmVxdWVuY3kgJT5cIiAvPlxuICAgICAgICA8YnIgLz5cbiAgICAgICAgc291bmRcbiAgICAgICAgPGlucHV0IGNsYXNzPSdzbGlkZXInIGlkPSdzb3VuZE51bScgdHlwZT1cInJhbmdlXCIgbWluPVwiMFwiIG1heD1cIjJcIiBzdGVwPVwiMVwiIHZhbHVlPSc8JT0gc291bmROdW0gJT4nIC8+XG4gICAgICAgIDxiciAvPlxuICAgICAgICBtYXN0ZXJHYWluXG4gICAgICAgIDxpbnB1dCBjbGFzcz0nc2xpZGVyJyBpZD0nbWFzdGVyR2FpbicgdHlwZT0ncmFuZ2UnIG1pbj0nLTgwJyBtYXg9XCIwXCIgc3RlcD0nMC41JyB2YWx1ZT0nPCU9IG1hc3RlckdhaW4gJT4nIC8+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbi1ib3R0b20gZmxleC1taWRkbGVcIj48L2Rpdj5cbiAgPC9kaXY+XG5gO1xuXG5cblxuXG5jbGFzcyBQbGF5ZXJFeHBlcmllbmNlIGV4dGVuZHMgc291bmR3b3Jrcy5FeHBlcmllbmNlIHtcbiAgY29uc3RydWN0b3IoYXNzZXRzRG9tYWluKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMucGxhdGZvcm0gPSB0aGlzLnJlcXVpcmUoJ3BsYXRmb3JtJywgeyBmZWF0dXJlczogWyd3ZWItYXVkaW8nXSB9KTtcbiAgICB0aGlzLmNoZWNraW4gPSB0aGlzLnJlcXVpcmUoJ2NoZWNraW4nLCB7IHNob3dEaWFsb2c6IGZhbHNlIH0pO1xuICAgIHRoaXMuc2hhcmVkUGFyYW1zID0gdGhpcy5yZXF1aXJlKCdzaGFyZWQtcGFyYW1zJyk7XG4vLyAgdGhpcy5zeW5jID0gdGhpcy5yZXF1aXJlKCdzeW5jJyk7IC8vb24gdmV1dCBsYSBzeW5jaHJvXG4gICAgdGhpcy5zeW5jU2NoZWR1bGVyID0gdGhpcy5yZXF1aXJlKCdzeW5jLXNjaGVkdWxlcicpOyAvL29uIHN5bmNocm9uaXNlIHRvdXMgbm9zIGNvcGFpbnNcbiAgICB0aGlzLmF1ZGlvQnVmZmVyTWFuYWdlciA9IHRoaXMucmVxdWlyZSgnYXVkaW8tYnVmZmVyLW1hbmFnZXInLCB7IGZpbGVzOiBbXG4gICAgICAnc291bmRzL2NsaWNrcy9jbGljay5tcDMnLFxuICAgICAgJ3NvdW5kcy9jbGlja3MvY2xhY2subXAzJyxcbiAgICAgICdzb3VuZHMvY2xpY2tzL2Nsb2NrLm1wMydcbiAgICBdfSk7XG5cbiAgfVxuXG4gIGFzeW5jIHN0YXJ0KCkge1xuICAgIHN1cGVyLnN0YXJ0KCk7XG4gICAgdGhpcy5wYXR0ZXJuID0gWzEsIDAsIDEsIDAsIDEsIDAsIDEsIDBdO1xuICAgIGNvbnN0IGZyZXF1ZW5jeSA9IDUwMDtcbiAgICBjb25zdCBzb3VuZE51bSA9IDE7XG4gICAgY29uc3QgbWFzdGVyR2FpbiA9IDE7XG4gICAgdGhpcy5idWZmZXIgPSB0aGlzLmF1ZGlvQnVmZmVyTWFuYWdlci5kYXRhW3NvdW5kTnVtXTtcblxuXG4gICAgLy8gdGhpcy5wYXR0ZXJuRW5naW5lID0gbmV3IFBhdHRlcm5FbmdpbmUodGhpcy5zeW5jU2NoZWR1bGVyLCB0aGlzLnBhdHRlcm4sIGZyZXF1ZW5jeSk7XG4gICAgdGhpcy5wYXR0ZXJuRW5naW5lID0gbmV3IEJ1ZmZlckVuZ2luZSh0aGlzLnN5bmNTY2hlZHVsZXIsIHRoaXMucGF0dGVybiwgdGhpcy5idWZmZXIsIG1hc3RlckdhaW4pO1xuXG5cbiBcblxuXG5cblxuXG4gICAgdGhpcy52aWV3ID0gbmV3IHNvdW5kd29ya3MuU2VnbWVudGVkVmlldyh0ZW1wbGF0ZSwgeyBcbiAgICAgIHBhdHRlcm46IHRoaXMucGF0dGVybixcbiAgICAgIGZyZXF1ZW5jeTogZnJlcXVlbmN5LFxuICAgICAgc291bmROdW06IHNvdW5kTnVtLFxuICAgICAgbWFzdGVyR2FpbjogbWFzdGVyR2FpblxuICAgIH0sIHtcbiAgICAgICdjbGljayAuYmVhdCc6IChlKSA9PiB7XG4gICAgICAgIGNvbnN0ICRlbCA9IGUudGFyZ2V0O1xuICAgICAgICBjb25zdCBpbmRleCA9IHBhcnNlSW50KCRlbC5kYXRhc2V0LmluZGV4KTtcbiAgICAgICAgY29uc3QgdmFsdWUgPSAkZWwuY2hlY2tlZCA/IDEgOiAwO1xuICAgICAgICB0aGlzLnBhdHRlcm5baW5kZXhdID0gdmFsdWU7XG4gICAgICB9LFxuICAgICAgJ2lucHV0ICNmcmVxdWVuY3knOiAoZSkgPT4ge1xuICAgICAgICBjb25zdCAkZWwgPSBlLnRhcmdldDtcbiAgICAgICAgY29uc3QgZnJlcXVlbmN5ID0gcGFyc2VJbnQoJGVsLnZhbHVlKTtcbiAgICAgICAgdGhpcy5wYXR0ZXJuRW5naW5lLmZyZXF1ZW5jeSA9IGZyZXF1ZW5jeTtcbiAgICAgIH0sXG4gICAgICAnaW5wdXQgI3NvdW5kTnVtJzogKGUpID0+IHtcbiAgICAgICAgY29uc3QgJGVsID0gZS50YXJnZXQ7XG4gICAgICAgIGNvbnN0IHNvdW5kTnVtID0gcGFyc2VJbnQoJGVsLnZhbHVlKTtcbiAgICAgICAgdGhpcy5wYXR0ZXJuRW5naW5lLmJ1ZmZlciA9IHRoaXMuYXVkaW9CdWZmZXJNYW5hZ2VyLmRhdGFbc291bmROdW1dO1xuICAgICAgfSxcbiAgICAgICdpbnB1dCAjbWFzdGVyR2Fpbic6IChlKSA9PiB7XG4gICAgICAgIGNvbnN0ICRlbCA9IGUudGFyZ2V0O1xuICAgICAgICBjb25zdCBtYXN0ZXJHYWluID0gTWF0aC5wb3coMTAsIHBhcnNlRmxvYXQoJGVsLnZhbHVlKS8yMCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKG1hc3RlckdhaW4pO1xuICAgICAgICAvLyB0aGlzLm1hc3RlckdhaW4gPSA7XG4gICAgICAgIHRoaXMucGF0dGVybkVuZ2luZS5tYXN0ZXJHYWluID0gbWFzdGVyR2FpbjtcbiAgICAgIH1cbiAgICB9LCB7fSk7XG5cblxuXG5cblxuLy9vbiBlc3Qgc3VyIHF1ZSBsYSBwYWdlIGVzdCBhZmZpY2jDqWVcbiAgICBhd2FpdCB0aGlzLnNob3coKVxuXG4gICAgdGhpcy5zaGFyZWRQYXJhbXMuYWRkUGFyYW1MaXN0ZW5lcignQlBNJywgKCkgPT4gdGhpcy51cGRhdGVFbmdpbmVQZXJpb2QoKSk7XG4gICAgdGhpcy5zaGFyZWRQYXJhbXMuYWRkUGFyYW1MaXN0ZW5lcignbnVtQmVhdHMnLCAoKSA9PiB0aGlzLnVwZGF0ZUVuZ2luZVBlcmlvZCgpKTtcbiAgICAvLyB0aGlzLnNoYXJlZFBhcmFtcy5hZGRQYXJhbUxpc3RlbmVyKCdzb24nLCAoKSA9PiB0aGlzLnVwZGF0ZUVuZ2luZVBlcmlvZCgpKTtcbiAgICB0aGlzLnVwZGF0ZUVuZ2luZVBlcmlvZCgpO1xuXG4gICAgfVxuXG5cblxuICAgIHVwZGF0ZUVuZ2luZVBlcmlvZCgpIHtcbiAgICAgIGlmICh0aGlzLnBhdHRlcm5FbmdpbmUubWFzdGVyKSB7XG4gICAgICAgIHRoaXMuc3luY1NjaGVkdWxlci5yZW1vdmUodGhpcy5wYXR0ZXJuRW5naW5lKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IEJQTSA9IHRoaXMuc2hhcmVkUGFyYW1zLmdldFZhbHVlKCdCUE0nKTtcbiAgICAgIGNvbnN0IG51bUJlYXRzID0gdGhpcy5zaGFyZWRQYXJhbXMuZ2V0VmFsdWUoJ251bUJlYXRzJyk7XG4gICAgICAvLyB0aGlzLnNvbiA9IHRoaXMuc2hhcmVkUGFyYW1zLmdldFZhbHVlKCdzb24nKTtcbiAgICAgIGNvbnN0IHBlcmlvZCA9ICg2MCAvIEJQTSkgLyBudW1CZWF0cztcbi8vICAgICAgICBjb25zdCBudW1lcm9DbGllbnQgPSBzb3VuZHdvcmtzLmNsaWVudC5pbmRleCAlIGZyZXF1ZW5jaWVzLmxlbmd0aDtcbiAgICAgIFxuXG4vL1RFTVBTIFNZTkNIUk9OSVNFXG4gICAgICBjb25zdCBzeW5jVGltZSA9IHRoaXMuc3luY1NjaGVkdWxlci5zeW5jVGltZTsgLy9vbiByZWN1cGVyZSBsZSB0ZW1wcyBhYnNvbHUgZHUgc2VydmV1clxuICAgICAgY29uc3QgbnVtUGVyaW9kc1NpbmNlT3JpZ2luID0gTWF0aC5jZWlsKHN5bmNUaW1lIC8gcGVyaW9kKTtcbiAgICAgIGNvbnN0IG5leHRQYXR0ZXJuSW5kZXggPSBudW1QZXJpb2RzU2luY2VPcmlnaW4gJSB0aGlzLnBhdHRlcm4ubGVuZ3RoO1xuICAgICAgY29uc3Qgc3RhcnRUaW1lID0gbnVtUGVyaW9kc1NpbmNlT3JpZ2luICogcGVyaW9kOyAvL2RpdmlzaW9uIGFycm9uZGllIMOgIGwnZW50aWVyIHN1cMOpcmlldXJlICAgIFxuICAgICAgdGhpcy5wYXR0ZXJuRW5naW5lLnBlcmlvZCA9IHBlcmlvZDtcbiAgICAgIHRoaXMucGF0dGVybkVuZ2luZS5wYXR0ZXJuSW5kZXggPSBuZXh0UGF0dGVybkluZGV4O1xuICAgICAgdGhpcy5zeW5jU2NoZWR1bGVyLmFkZCh0aGlzLnBhdHRlcm5FbmdpbmUsIHN0YXJ0VGltZSk7IC8vb24gc2NoZWR1bGUgbGUgcGF0dGVybkVuZ2luZVxuICAgIH1cblxuXG4gICAgLy8gY29uc3QgcGVyaW9kID0gMC4xXG4gICBcblxuLy9URU1QUyBOT04gU1lOQ0hSTyBcbiAgIC8vIGNvbnN0IHNjaGVkdWxlciA9IGF1ZGlvLmdldFNjaGVkdWxlcigpO1xuXG5cbi8vRGFucyBsZSBjYXMgZCfDqWxlbWVudHMgc2ltcGxlcyFcbi8vaWwgZmF1dCB1cGRhdGVyIGxlIHBhcmFtZXRyZSDDoCBsYSBtYWluLCBjJ2VzdCDDoCBkaXJlIHBhdHRlcm5FbmdpbmUucGVyaW9kID0gYmxhYmxhXG5cbiAgICBcbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyRXhwZXJpZW5jZTtcbiJdfQ==