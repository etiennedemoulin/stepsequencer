// Import Soundworks library (client side)
'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _soundworksClient = require('soundworks/client');

var _soundworksClient2 = _interopRequireDefault(_soundworksClient);

var audioContext = _soundworksClient2['default'].audioContext;
var client = _soundworksClient2['default'].client;
var Experience = _soundworksClient2['default'].Experience;
var Renderer = _soundworksClient2['default'].display.Renderer;
var CanvasView = _soundworksClient2['default'].display.CanvasView;

var PerformanceRenderer = (function (_Renderer) {
  _inherits(PerformanceRenderer, _Renderer);

  function PerformanceRenderer(vx, vy) {
    _classCallCheck(this, PerformanceRenderer);

    _get(Object.getPrototypeOf(PerformanceRenderer.prototype), 'constructor', this).call(this, 0);

    this.velocityX = vx; // px per seconds
    this.velocityY = vy; // px per seconds
  }

  _createClass(PerformanceRenderer, [{
    key: 'init',
    value: function init() {
      if (!this.x || !this.y) {
        this.x = Math.random() * this.canvasWidth;
        this.y = Math.random() * this.canvasHeight;
      }
    }
  }, {
    key: 'update',
    value: function update(dt) {
      if (this.x >= this.canvasWidth || this.x <= 0) {
        this.velocityX *= -1;
      }
      if (this.y >= this.canvasHeight || this.y <= 0) {
        this.velocityY *= -1;
      }

      this.x += this.velocityX * dt;
      this.y += this.velocityY * dt;
    }
  }, {
    key: 'render',
    value: function render(ctx) {
      ctx.save();
      ctx.beginPath();
      ctx.globalAlpha = 0.6;
      ctx.fillStyle = '#ffffff';
      ctx.arc(this.x, this.y, 4, 0, Math.PI * 2, false);
      ctx.fill();
      ctx.closePath();
      ctx.restore();
    }
  }]);

  return PerformanceRenderer;
})(Renderer);

var template = '\n  <canvas class="background"></canvas>\n  <div class="foreground">\n    <div class="section-top flex-middle">\n      <p class="big"><%= title %></p>\n    </div>\n    <div class="section-center flex-center"></div>\n    <div class="section-bottom flex-middle"></div>\n  </div>\n';

/**
 * `player` experience.
 * This experience plays a sound when it starts, and plays another sound when
 * other clients join the experience.
 */

var PlayerExperience = (function (_Experience) {
  _inherits(PlayerExperience, _Experience);

  function PlayerExperience(audioFiles) {
    _classCallCheck(this, PlayerExperience);

    _get(Object.getPrototypeOf(PlayerExperience.prototype), 'constructor', this).call(this);

    this.welcome = this.require('welcome', { fullScreen: false });
    this.loader = this.require('loader', { files: audioFiles });
    this.checkin = this.require('checkin', { showDialog: true });
  }

  _createClass(PlayerExperience, [{
    key: 'init',
    value: function init() {
      // Initialize the view
      this.template = template;
      this.content = { title: 'Let\'s go!' };
      this.viewCtor = CanvasView;
      this.view = this.createView();
    }
  }, {
    key: 'start',
    value: function start() {
      var _this = this;

      _get(Object.getPrototypeOf(PlayerExperience.prototype), 'start', this).call(this); // don't forget this

      if (!this.hasStarted) this.init();

      this.show();

      // Play the first loaded buffer immediately
      var src = audioContext.createBufferSource();
      src.buffer = this.loader.buffers[0];
      src.connect(audioContext.destination);
      src.start(audioContext.currentTime);

      // Play the second loaded buffer when the message `play` is received from the server,
      // the message is send when another player joins the experience.
      this.receive('play', function () {
        var delay = Math.random();
        var src = audioContext.createBufferSource();
        src.buffer = _this.loader.buffers[1];
        src.connect(audioContext.destination);
        src.start(audioContext.currentTime + delay);
      });

      // Initialize rendering
      this.renderer = new PerformanceRenderer(100, 100);
      this.view.addRenderer(this.renderer);
      // This given function is called before each update (`Renderer.render`) of the canvas
      this.view.setPreRender(function (ctx, dt) {
        ctx.save();
        ctx.globalAlpha = 0.05;
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, ctx.width, ctx.height);
        ctx.restore();
      });

      // We would usually call the 'done' method when the module can hand over the
      // control to subsequent modules, however since the experience is the last
      // module to be called in this scenario, we don't need it here.
      // this.done();
    }
  }]);

  return PlayerExperience;
})(Experience);

exports['default'] = PlayerExperience;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jbGllbnQvcGxheWVyL1BsYXllckV4cGVyaWVuY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0NBQ3VCLG1CQUFtQjs7OztBQUUxQyxJQUFNLFlBQVksR0FBRyw4QkFBVyxZQUFZLENBQUM7QUFDN0MsSUFBTSxNQUFNLEdBQUcsOEJBQVcsTUFBTSxDQUFDO0FBQ2pDLElBQU0sVUFBVSxHQUFHLDhCQUFXLFVBQVUsQ0FBQztBQUN6QyxJQUFNLFFBQVEsR0FBRyw4QkFBVyxPQUFPLENBQUMsUUFBUSxDQUFDO0FBQzdDLElBQU0sVUFBVSxHQUFHLDhCQUFXLE9BQU8sQ0FBQyxVQUFVLENBQUM7O0lBRTNDLG1CQUFtQjtZQUFuQixtQkFBbUI7O0FBQ1osV0FEUCxtQkFBbUIsQ0FDWCxFQUFFLEVBQUUsRUFBRSxFQUFFOzBCQURoQixtQkFBbUI7O0FBRXJCLCtCQUZFLG1CQUFtQiw2Q0FFZixDQUFDLEVBQUU7O0FBRVQsUUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7QUFDcEIsUUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7R0FDckI7O2VBTkcsbUJBQW1COztXQVFuQixnQkFBRztBQUNMLFVBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTtBQUN0QixZQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO0FBQzFDLFlBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7T0FDNUM7S0FDRjs7O1dBRUssZ0JBQUMsRUFBRSxFQUFFO0FBQ1QsVUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFBRSxZQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FBQyxDQUFDO09BQUU7QUFDeEUsVUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFBRSxZQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FBQyxDQUFDO09BQUU7O0FBRXpFLFVBQUksQ0FBQyxDQUFDLElBQUssSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLEFBQUMsQ0FBQztBQUNoQyxVQUFJLENBQUMsQ0FBQyxJQUFLLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxBQUFDLENBQUM7S0FDakM7OztXQUVLLGdCQUFDLEdBQUcsRUFBRTtBQUNWLFNBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNYLFNBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztBQUNoQixTQUFHLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQztBQUN0QixTQUFHLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztBQUMxQixTQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ2xELFNBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNYLFNBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztBQUNoQixTQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7S0FDZjs7O1NBaENHLG1CQUFtQjtHQUFTLFFBQVE7O0FBbUMxQyxJQUFNLFFBQVEsMlJBU2IsQ0FBQzs7Ozs7Ozs7SUFPbUIsZ0JBQWdCO1lBQWhCLGdCQUFnQjs7QUFDeEIsV0FEUSxnQkFBZ0IsQ0FDdkIsVUFBVSxFQUFFOzBCQURMLGdCQUFnQjs7QUFFakMsK0JBRmlCLGdCQUFnQiw2Q0FFekI7O0FBRVIsUUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0FBQzlELFFBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztBQUM1RCxRQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7R0FDOUQ7O2VBUGtCLGdCQUFnQjs7V0FTL0IsZ0JBQUc7O0FBRUwsVUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7QUFDekIsVUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLEtBQUssY0FBYSxFQUFFLENBQUM7QUFDdEMsVUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7QUFDM0IsVUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7S0FDL0I7OztXQUVJLGlCQUFHOzs7QUFDTixpQ0FsQmlCLGdCQUFnQix1Q0FrQm5COztBQUVkLFVBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUNsQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7O0FBRWQsVUFBSSxDQUFDLElBQUksRUFBRSxDQUFDOzs7QUFHWixVQUFNLEdBQUcsR0FBRyxZQUFZLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztBQUM5QyxTQUFHLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3BDLFNBQUcsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3RDLFNBQUcsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDOzs7O0FBSXBDLFVBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLFlBQU07QUFDekIsWUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQzVCLFlBQU0sR0FBRyxHQUFHLFlBQVksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0FBQzlDLFdBQUcsQ0FBQyxNQUFNLEdBQUcsTUFBSyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3BDLFdBQUcsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3RDLFdBQUcsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUMsQ0FBQztPQUM3QyxDQUFDLENBQUM7OztBQUdILFVBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxtQkFBbUIsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDbEQsVUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDOztBQUVyQyxVQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFTLEdBQUcsRUFBRSxFQUFFLEVBQUU7QUFDdkMsV0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ1gsV0FBRyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7QUFDdkIsV0FBRyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7QUFDMUIsV0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzFDLFdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztPQUNmLENBQUMsQ0FBQzs7Ozs7O0tBTUo7OztTQXpEa0IsZ0JBQWdCO0dBQVMsVUFBVTs7cUJBQW5DLGdCQUFnQiIsImZpbGUiOiJzcmMvY2xpZW50L3BsYXllci9QbGF5ZXJFeHBlcmllbmNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gSW1wb3J0IFNvdW5kd29ya3MgbGlicmFyeSAoY2xpZW50IHNpZGUpXG5pbXBvcnQgc291bmR3b3JrcyBmcm9tICdzb3VuZHdvcmtzL2NsaWVudCc7XG5cbmNvbnN0IGF1ZGlvQ29udGV4dCA9IHNvdW5kd29ya3MuYXVkaW9Db250ZXh0O1xuY29uc3QgY2xpZW50ID0gc291bmR3b3Jrcy5jbGllbnQ7XG5jb25zdCBFeHBlcmllbmNlID0gc291bmR3b3Jrcy5FeHBlcmllbmNlO1xuY29uc3QgUmVuZGVyZXIgPSBzb3VuZHdvcmtzLmRpc3BsYXkuUmVuZGVyZXI7XG5jb25zdCBDYW52YXNWaWV3ID0gc291bmR3b3Jrcy5kaXNwbGF5LkNhbnZhc1ZpZXc7XG5cbmNsYXNzIFBlcmZvcm1hbmNlUmVuZGVyZXIgZXh0ZW5kcyBSZW5kZXJlciB7XG4gIGNvbnN0cnVjdG9yKHZ4LCB2eSkge1xuICAgIHN1cGVyKDApO1xuXG4gICAgdGhpcy52ZWxvY2l0eVggPSB2eDsgLy8gcHggcGVyIHNlY29uZHNcbiAgICB0aGlzLnZlbG9jaXR5WSA9IHZ5OyAvLyBweCBwZXIgc2Vjb25kc1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBpZiAoIXRoaXMueCB8fCAhdGhpcy55KSB7XG4gICAgICB0aGlzLnggPSBNYXRoLnJhbmRvbSgpICogdGhpcy5jYW52YXNXaWR0aDtcbiAgICAgIHRoaXMueSA9IE1hdGgucmFuZG9tKCkgKiB0aGlzLmNhbnZhc0hlaWdodDtcbiAgICB9XG4gIH1cblxuICB1cGRhdGUoZHQpIHtcbiAgICBpZiAodGhpcy54ID49IHRoaXMuY2FudmFzV2lkdGggfHwgdGhpcy54IDw9IDApIHsgdGhpcy52ZWxvY2l0eVggKj0gLTE7IH1cbiAgICBpZiAodGhpcy55ID49IHRoaXMuY2FudmFzSGVpZ2h0IHx8IHRoaXMueSA8PSAwKSB7IHRoaXMudmVsb2NpdHlZICo9IC0xOyB9XG5cbiAgICB0aGlzLnggKz0gKHRoaXMudmVsb2NpdHlYICogZHQpO1xuICAgIHRoaXMueSArPSAodGhpcy52ZWxvY2l0eVkgKiBkdCk7XG4gIH1cblxuICByZW5kZXIoY3R4KSB7XG4gICAgY3R4LnNhdmUoKTtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4Lmdsb2JhbEFscGhhID0gMC42O1xuICAgIGN0eC5maWxsU3R5bGUgPSAnI2ZmZmZmZic7XG4gICAgY3R4LmFyYyh0aGlzLngsIHRoaXMueSwgNCwgMCwgTWF0aC5QSSAqIDIsIGZhbHNlKTtcbiAgICBjdHguZmlsbCgpO1xuICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICBjdHgucmVzdG9yZSgpO1xuICB9XG59XG5cbmNvbnN0IHRlbXBsYXRlID0gYFxuICA8Y2FudmFzIGNsYXNzPVwiYmFja2dyb3VuZFwiPjwvY2FudmFzPlxuICA8ZGl2IGNsYXNzPVwiZm9yZWdyb3VuZFwiPlxuICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uLXRvcCBmbGV4LW1pZGRsZVwiPlxuICAgICAgPHAgY2xhc3M9XCJiaWdcIj48JT0gdGl0bGUgJT48L3A+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tY2VudGVyIGZsZXgtY2VudGVyXCI+PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tYm90dG9tIGZsZXgtbWlkZGxlXCI+PC9kaXY+XG4gIDwvZGl2PlxuYDtcblxuLyoqXG4gKiBgcGxheWVyYCBleHBlcmllbmNlLlxuICogVGhpcyBleHBlcmllbmNlIHBsYXlzIGEgc291bmQgd2hlbiBpdCBzdGFydHMsIGFuZCBwbGF5cyBhbm90aGVyIHNvdW5kIHdoZW5cbiAqIG90aGVyIGNsaWVudHMgam9pbiB0aGUgZXhwZXJpZW5jZS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyRXhwZXJpZW5jZSBleHRlbmRzIEV4cGVyaWVuY2Uge1xuICBjb25zdHJ1Y3RvcihhdWRpb0ZpbGVzKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMud2VsY29tZSA9IHRoaXMucmVxdWlyZSgnd2VsY29tZScsIHsgZnVsbFNjcmVlbjogZmFsc2UgfSk7XG4gICAgdGhpcy5sb2FkZXIgPSB0aGlzLnJlcXVpcmUoJ2xvYWRlcicsIHsgZmlsZXM6IGF1ZGlvRmlsZXMgfSk7XG4gICAgdGhpcy5jaGVja2luID0gdGhpcy5yZXF1aXJlKCdjaGVja2luJywgeyBzaG93RGlhbG9nOiB0cnVlIH0pO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICAvLyBJbml0aWFsaXplIHRoZSB2aWV3XG4gICAgdGhpcy50ZW1wbGF0ZSA9IHRlbXBsYXRlO1xuICAgIHRoaXMuY29udGVudCA9IHsgdGl0bGU6IGBMZXQncyBnbyFgIH07XG4gICAgdGhpcy52aWV3Q3RvciA9IENhbnZhc1ZpZXc7XG4gICAgdGhpcy52aWV3ID0gdGhpcy5jcmVhdGVWaWV3KCk7XG4gIH1cblxuICBzdGFydCgpIHtcbiAgICBzdXBlci5zdGFydCgpOyAvLyBkb24ndCBmb3JnZXQgdGhpc1xuXG4gICAgaWYgKCF0aGlzLmhhc1N0YXJ0ZWQpXG4gICAgICB0aGlzLmluaXQoKTtcblxuICAgIHRoaXMuc2hvdygpO1xuXG4gICAgLy8gUGxheSB0aGUgZmlyc3QgbG9hZGVkIGJ1ZmZlciBpbW1lZGlhdGVseVxuICAgIGNvbnN0IHNyYyA9IGF1ZGlvQ29udGV4dC5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcbiAgICBzcmMuYnVmZmVyID0gdGhpcy5sb2FkZXIuYnVmZmVyc1swXTtcbiAgICBzcmMuY29ubmVjdChhdWRpb0NvbnRleHQuZGVzdGluYXRpb24pO1xuICAgIHNyYy5zdGFydChhdWRpb0NvbnRleHQuY3VycmVudFRpbWUpO1xuXG4gICAgLy8gUGxheSB0aGUgc2Vjb25kIGxvYWRlZCBidWZmZXIgd2hlbiB0aGUgbWVzc2FnZSBgcGxheWAgaXMgcmVjZWl2ZWQgZnJvbSB0aGUgc2VydmVyLFxuICAgIC8vIHRoZSBtZXNzYWdlIGlzIHNlbmQgd2hlbiBhbm90aGVyIHBsYXllciBqb2lucyB0aGUgZXhwZXJpZW5jZS5cbiAgICB0aGlzLnJlY2VpdmUoJ3BsYXknLCAoKSA9PiB7XG4gICAgICBjb25zdCBkZWxheSA9IE1hdGgucmFuZG9tKCk7XG4gICAgICBjb25zdCBzcmMgPSBhdWRpb0NvbnRleHQuY3JlYXRlQnVmZmVyU291cmNlKCk7XG4gICAgICBzcmMuYnVmZmVyID0gdGhpcy5sb2FkZXIuYnVmZmVyc1sxXTtcbiAgICAgIHNyYy5jb25uZWN0KGF1ZGlvQ29udGV4dC5kZXN0aW5hdGlvbik7XG4gICAgICBzcmMuc3RhcnQoYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lICsgZGVsYXkpO1xuICAgIH0pO1xuXG4gICAgLy8gSW5pdGlhbGl6ZSByZW5kZXJpbmdcbiAgICB0aGlzLnJlbmRlcmVyID0gbmV3IFBlcmZvcm1hbmNlUmVuZGVyZXIoMTAwLCAxMDApO1xuICAgIHRoaXMudmlldy5hZGRSZW5kZXJlcih0aGlzLnJlbmRlcmVyKTtcbiAgICAvLyBUaGlzIGdpdmVuIGZ1bmN0aW9uIGlzIGNhbGxlZCBiZWZvcmUgZWFjaCB1cGRhdGUgKGBSZW5kZXJlci5yZW5kZXJgKSBvZiB0aGUgY2FudmFzXG4gICAgdGhpcy52aWV3LnNldFByZVJlbmRlcihmdW5jdGlvbihjdHgsIGR0KSB7XG4gICAgICBjdHguc2F2ZSgpO1xuICAgICAgY3R4Lmdsb2JhbEFscGhhID0gMC4wNTtcbiAgICAgIGN0eC5maWxsU3R5bGUgPSAnIzAwMDAwMCc7XG4gICAgICBjdHguZmlsbFJlY3QoMCwgMCwgY3R4LndpZHRoLCBjdHguaGVpZ2h0KTtcbiAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgfSk7XG5cbiAgICAvLyBXZSB3b3VsZCB1c3VhbGx5IGNhbGwgdGhlICdkb25lJyBtZXRob2Qgd2hlbiB0aGUgbW9kdWxlIGNhbiBoYW5kIG92ZXIgdGhlXG4gICAgLy8gY29udHJvbCB0byBzdWJzZXF1ZW50IG1vZHVsZXMsIGhvd2V2ZXIgc2luY2UgdGhlIGV4cGVyaWVuY2UgaXMgdGhlIGxhc3RcbiAgICAvLyBtb2R1bGUgdG8gYmUgY2FsbGVkIGluIHRoaXMgc2NlbmFyaW8sIHdlIGRvbid0IG5lZWQgaXQgaGVyZS5cbiAgICAvLyB0aGlzLmRvbmUoKTtcbiAgfVxufVxuIl19