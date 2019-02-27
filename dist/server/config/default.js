'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cwd = process.cwd();

// Configuration of the application.
// Other entries can be added (as long as their name doesn't conflict with
// existing ones) to define global parameters of the application (e.g. BPM,
// synth parameters) that can then be shared easily among all clients using
// the `shared-config` service.
exports.default = {
  // name of the application, used in the `.ejs` template and by default in
  // the `platform` service to populate its view
  appName: 'Template',

  // name of the environnement ('production' enable cache in express application)
  env: 'development',

  // name of the default client type, i.e. the client that can access the
  // application at its root URL
  defaultClient: 'player',

  // define from where the assets (static files) should be loaded, these value
  // could also refer to a separate server for scalability reasons. This value
  // should also be used client-side to configure the `audio-buffer-manager` service.
  assetsDomain: '/',

  // port used to open the http server, in production this value is typically 80
  port: 8000,

  // define if the server should use gzip compression for static files
  enableGZipCompression: true,

  // location of the public directory (accessible through http(s) requests)
  publicDirectory: _path2.default.join(cwd, 'public'),

  // directory where the server templating system looks for the `ejs` templates
  templateDirectory: _path2.default.join(cwd, 'html'),

  // define if the HTTP server should be launched using secure connections.
  // For development purposes when set to `true` and no certificates are given
  // (cf. `httpsInfos`), a self-signed certificate is created.
  useHttps: false,

  // paths to the key and certificate to be used in order to launch the https
  // server. Both entries are required otherwise a self-signed certificate
  // is generated.
  httpsInfos: {
    key: null,
    cert: null
  },

  // socket.io configuration
  websockets: {
    url: '',
    transports: ['websocket'],
    path: ''
    // @note: EngineIO defaults
    // pingTimeout: 3000,
    // pingInterval: 1000,
    // upgradeTimeout: 10000,
    // maxHttpBufferSize: 10E7,
  },

  // password to be used by the `auth` service
  password: '',

  // describe the location where the experience takes places, theses values are
  // used by the `placer`, `checkin` and `locator` services.
  // if one of these service is required, this entry shouldn't be removed.
  setup: {
    area: {
      width: 1,
      height: 1,
      // path to an image to be used in the area representation
      background: null
    },
    // list of predefined labels
    labels: null,
    // list of predefined coordinates given as an array of `[x:Number, y:Number]`
    coordinates: null,
    // maximum number of clients allowed in a position
    maxClientsPerPosition: 1,
    // maximum number of positions (may limit or be limited by the number of
    // labels and/or coordinates)
    capacity: Infinity
  },

  // configuration of the `osc` service
  osc: {
    // IP of the currently running node server
    receiveAddress: '127.0.0.1',
    // port listening for incomming messages
    receivePort: 57121,
    // IP of the remote application
    sendAddress: '127.0.0.1',
    // port where the remote application is listening for messages
    sendPort: 57120
  },

  // configuration of the `raw-socket` service
  rawSocket: {
    // port used for socket connection
    port: 8080
  },

  // bunyan configuration
  logger: {
    name: 'soundworks',
    level: 'info',
    streams: [{
      level: 'info',
      stream: process.stdout
    }]
  },

  // directory where error reported from the clients are written
  errorReporterDirectory: _path2.default.join(cwd, 'logs', 'clients')
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlZmF1bHQuanMiXSwibmFtZXMiOlsiY3dkIiwicHJvY2VzcyIsImFwcE5hbWUiLCJlbnYiLCJkZWZhdWx0Q2xpZW50IiwiYXNzZXRzRG9tYWluIiwicG9ydCIsImVuYWJsZUdaaXBDb21wcmVzc2lvbiIsInB1YmxpY0RpcmVjdG9yeSIsInBhdGgiLCJqb2luIiwidGVtcGxhdGVEaXJlY3RvcnkiLCJ1c2VIdHRwcyIsImh0dHBzSW5mb3MiLCJrZXkiLCJjZXJ0Iiwid2Vic29ja2V0cyIsInVybCIsInRyYW5zcG9ydHMiLCJwYXNzd29yZCIsInNldHVwIiwiYXJlYSIsIndpZHRoIiwiaGVpZ2h0IiwiYmFja2dyb3VuZCIsImxhYmVscyIsImNvb3JkaW5hdGVzIiwibWF4Q2xpZW50c1BlclBvc2l0aW9uIiwiY2FwYWNpdHkiLCJJbmZpbml0eSIsIm9zYyIsInJlY2VpdmVBZGRyZXNzIiwicmVjZWl2ZVBvcnQiLCJzZW5kQWRkcmVzcyIsInNlbmRQb3J0IiwicmF3U29ja2V0IiwibG9nZ2VyIiwibmFtZSIsImxldmVsIiwic3RyZWFtcyIsInN0cmVhbSIsInN0ZG91dCIsImVycm9yUmVwb3J0ZXJEaXJlY3RvcnkiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7Ozs7QUFDQSxJQUFNQSxNQUFNQyxRQUFRRCxHQUFSLEVBQVo7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtrQkFDZTtBQUNiO0FBQ0E7QUFDQUUsV0FBUyxVQUhJOztBQUtiO0FBQ0FDLE9BQUssYUFOUTs7QUFRYjtBQUNBO0FBQ0FDLGlCQUFlLFFBVkY7O0FBWWI7QUFDQTtBQUNBO0FBQ0FDLGdCQUFjLEdBZkQ7O0FBaUJiO0FBQ0FDLFFBQU0sSUFsQk87O0FBcUJiO0FBQ0FDLHlCQUF1QixJQXRCVjs7QUF3QmI7QUFDQUMsbUJBQWlCQyxlQUFLQyxJQUFMLENBQVVWLEdBQVYsRUFBZSxRQUFmLENBekJKOztBQTJCYjtBQUNBVyxxQkFBbUJGLGVBQUtDLElBQUwsQ0FBVVYsR0FBVixFQUFlLE1BQWYsQ0E1Qk47O0FBK0JiO0FBQ0E7QUFDQTtBQUNBWSxZQUFVLEtBbENHOztBQW9DYjtBQUNBO0FBQ0E7QUFDQUMsY0FBWTtBQUNWQyxTQUFLLElBREs7QUFFVkMsVUFBTTtBQUZJLEdBdkNDOztBQTRDYjtBQUNBQyxjQUFZO0FBQ1ZDLFNBQUssRUFESztBQUVWQyxnQkFBWSxDQUFDLFdBQUQsQ0FGRjtBQUdWVCxVQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVJVLEdBN0NDOztBQXdEYjtBQUNBVSxZQUFVLEVBekRHOztBQTJEYjtBQUNBO0FBQ0E7QUFDQUMsU0FBTztBQUNMQyxVQUFNO0FBQ0pDLGFBQU8sQ0FESDtBQUVKQyxjQUFRLENBRko7QUFHSjtBQUNBQyxrQkFBWTtBQUpSLEtBREQ7QUFPTDtBQUNBQyxZQUFRLElBUkg7QUFTTDtBQUNBQyxpQkFBYSxJQVZSO0FBV0w7QUFDQUMsMkJBQXVCLENBWmxCO0FBYUw7QUFDQTtBQUNBQyxjQUFVQztBQWZMLEdBOURNOztBQWdGYjtBQUNBQyxPQUFLO0FBQ0g7QUFDQUMsb0JBQWdCLFdBRmI7QUFHSDtBQUNBQyxpQkFBYSxLQUpWO0FBS0g7QUFDQUMsaUJBQWEsV0FOVjtBQU9IO0FBQ0FDLGNBQVU7QUFSUCxHQWpGUTs7QUE0RmI7QUFDQUMsYUFBVztBQUNUO0FBQ0E3QixVQUFNO0FBRkcsR0E3RkU7O0FBa0diO0FBQ0E4QixVQUFRO0FBQ05DLFVBQU0sWUFEQTtBQUVOQyxXQUFPLE1BRkQ7QUFHTkMsYUFBUyxDQUFDO0FBQ1JELGFBQU8sTUFEQztBQUVSRSxjQUFRdkMsUUFBUXdDO0FBRlIsS0FBRDtBQUhILEdBbkdLOztBQStHYjtBQUNBQywwQkFBd0JqQyxlQUFLQyxJQUFMLENBQVVWLEdBQVYsRUFBZSxNQUFmLEVBQXVCLFNBQXZCO0FBaEhYLEMiLCJmaWxlIjoiZGVmYXVsdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuY29uc3QgY3dkID0gcHJvY2Vzcy5jd2QoKTtcblxuXG4vLyBDb25maWd1cmF0aW9uIG9mIHRoZSBhcHBsaWNhdGlvbi5cbi8vIE90aGVyIGVudHJpZXMgY2FuIGJlIGFkZGVkIChhcyBsb25nIGFzIHRoZWlyIG5hbWUgZG9lc24ndCBjb25mbGljdCB3aXRoXG4vLyBleGlzdGluZyBvbmVzKSB0byBkZWZpbmUgZ2xvYmFsIHBhcmFtZXRlcnMgb2YgdGhlIGFwcGxpY2F0aW9uIChlLmcuIEJQTSxcbi8vIHN5bnRoIHBhcmFtZXRlcnMpIHRoYXQgY2FuIHRoZW4gYmUgc2hhcmVkIGVhc2lseSBhbW9uZyBhbGwgY2xpZW50cyB1c2luZ1xuLy8gdGhlIGBzaGFyZWQtY29uZmlnYCBzZXJ2aWNlLlxuZXhwb3J0IGRlZmF1bHQge1xuICAvLyBuYW1lIG9mIHRoZSBhcHBsaWNhdGlvbiwgdXNlZCBpbiB0aGUgYC5lanNgIHRlbXBsYXRlIGFuZCBieSBkZWZhdWx0IGluXG4gIC8vIHRoZSBgcGxhdGZvcm1gIHNlcnZpY2UgdG8gcG9wdWxhdGUgaXRzIHZpZXdcbiAgYXBwTmFtZTogJ1RlbXBsYXRlJyxcblxuICAvLyBuYW1lIG9mIHRoZSBlbnZpcm9ubmVtZW50ICgncHJvZHVjdGlvbicgZW5hYmxlIGNhY2hlIGluIGV4cHJlc3MgYXBwbGljYXRpb24pXG4gIGVudjogJ2RldmVsb3BtZW50JyxcblxuICAvLyBuYW1lIG9mIHRoZSBkZWZhdWx0IGNsaWVudCB0eXBlLCBpLmUuIHRoZSBjbGllbnQgdGhhdCBjYW4gYWNjZXNzIHRoZVxuICAvLyBhcHBsaWNhdGlvbiBhdCBpdHMgcm9vdCBVUkxcbiAgZGVmYXVsdENsaWVudDogJ3BsYXllcicsXG5cbiAgLy8gZGVmaW5lIGZyb20gd2hlcmUgdGhlIGFzc2V0cyAoc3RhdGljIGZpbGVzKSBzaG91bGQgYmUgbG9hZGVkLCB0aGVzZSB2YWx1ZVxuICAvLyBjb3VsZCBhbHNvIHJlZmVyIHRvIGEgc2VwYXJhdGUgc2VydmVyIGZvciBzY2FsYWJpbGl0eSByZWFzb25zLiBUaGlzIHZhbHVlXG4gIC8vIHNob3VsZCBhbHNvIGJlIHVzZWQgY2xpZW50LXNpZGUgdG8gY29uZmlndXJlIHRoZSBgYXVkaW8tYnVmZmVyLW1hbmFnZXJgIHNlcnZpY2UuXG4gIGFzc2V0c0RvbWFpbjogJy8nLFxuXG4gIC8vIHBvcnQgdXNlZCB0byBvcGVuIHRoZSBodHRwIHNlcnZlciwgaW4gcHJvZHVjdGlvbiB0aGlzIHZhbHVlIGlzIHR5cGljYWxseSA4MFxuICBwb3J0OiA4MDAwLFxuXG5cbiAgLy8gZGVmaW5lIGlmIHRoZSBzZXJ2ZXIgc2hvdWxkIHVzZSBnemlwIGNvbXByZXNzaW9uIGZvciBzdGF0aWMgZmlsZXNcbiAgZW5hYmxlR1ppcENvbXByZXNzaW9uOiB0cnVlLFxuXG4gIC8vIGxvY2F0aW9uIG9mIHRoZSBwdWJsaWMgZGlyZWN0b3J5IChhY2Nlc3NpYmxlIHRocm91Z2ggaHR0cChzKSByZXF1ZXN0cylcbiAgcHVibGljRGlyZWN0b3J5OiBwYXRoLmpvaW4oY3dkLCAncHVibGljJyksXG5cbiAgLy8gZGlyZWN0b3J5IHdoZXJlIHRoZSBzZXJ2ZXIgdGVtcGxhdGluZyBzeXN0ZW0gbG9va3MgZm9yIHRoZSBgZWpzYCB0ZW1wbGF0ZXNcbiAgdGVtcGxhdGVEaXJlY3Rvcnk6IHBhdGguam9pbihjd2QsICdodG1sJyksXG5cblxuICAvLyBkZWZpbmUgaWYgdGhlIEhUVFAgc2VydmVyIHNob3VsZCBiZSBsYXVuY2hlZCB1c2luZyBzZWN1cmUgY29ubmVjdGlvbnMuXG4gIC8vIEZvciBkZXZlbG9wbWVudCBwdXJwb3NlcyB3aGVuIHNldCB0byBgdHJ1ZWAgYW5kIG5vIGNlcnRpZmljYXRlcyBhcmUgZ2l2ZW5cbiAgLy8gKGNmLiBgaHR0cHNJbmZvc2ApLCBhIHNlbGYtc2lnbmVkIGNlcnRpZmljYXRlIGlzIGNyZWF0ZWQuXG4gIHVzZUh0dHBzOiBmYWxzZSxcblxuICAvLyBwYXRocyB0byB0aGUga2V5IGFuZCBjZXJ0aWZpY2F0ZSB0byBiZSB1c2VkIGluIG9yZGVyIHRvIGxhdW5jaCB0aGUgaHR0cHNcbiAgLy8gc2VydmVyLiBCb3RoIGVudHJpZXMgYXJlIHJlcXVpcmVkIG90aGVyd2lzZSBhIHNlbGYtc2lnbmVkIGNlcnRpZmljYXRlXG4gIC8vIGlzIGdlbmVyYXRlZC5cbiAgaHR0cHNJbmZvczoge1xuICAgIGtleTogbnVsbCxcbiAgICBjZXJ0OiBudWxsLFxuICB9LFxuXG4gIC8vIHNvY2tldC5pbyBjb25maWd1cmF0aW9uXG4gIHdlYnNvY2tldHM6IHtcbiAgICB1cmw6ICcnLFxuICAgIHRyYW5zcG9ydHM6IFsnd2Vic29ja2V0J10sXG4gICAgcGF0aDogJycsXG4gICAgLy8gQG5vdGU6IEVuZ2luZUlPIGRlZmF1bHRzXG4gICAgLy8gcGluZ1RpbWVvdXQ6IDMwMDAsXG4gICAgLy8gcGluZ0ludGVydmFsOiAxMDAwLFxuICAgIC8vIHVwZ3JhZGVUaW1lb3V0OiAxMDAwMCxcbiAgICAvLyBtYXhIdHRwQnVmZmVyU2l6ZTogMTBFNyxcbiAgfSxcblxuICAvLyBwYXNzd29yZCB0byBiZSB1c2VkIGJ5IHRoZSBgYXV0aGAgc2VydmljZVxuICBwYXNzd29yZDogJycsXG5cbiAgLy8gZGVzY3JpYmUgdGhlIGxvY2F0aW9uIHdoZXJlIHRoZSBleHBlcmllbmNlIHRha2VzIHBsYWNlcywgdGhlc2VzIHZhbHVlcyBhcmVcbiAgLy8gdXNlZCBieSB0aGUgYHBsYWNlcmAsIGBjaGVja2luYCBhbmQgYGxvY2F0b3JgIHNlcnZpY2VzLlxuICAvLyBpZiBvbmUgb2YgdGhlc2Ugc2VydmljZSBpcyByZXF1aXJlZCwgdGhpcyBlbnRyeSBzaG91bGRuJ3QgYmUgcmVtb3ZlZC5cbiAgc2V0dXA6IHtcbiAgICBhcmVhOiB7XG4gICAgICB3aWR0aDogMSxcbiAgICAgIGhlaWdodDogMSxcbiAgICAgIC8vIHBhdGggdG8gYW4gaW1hZ2UgdG8gYmUgdXNlZCBpbiB0aGUgYXJlYSByZXByZXNlbnRhdGlvblxuICAgICAgYmFja2dyb3VuZDogbnVsbCxcbiAgICB9LFxuICAgIC8vIGxpc3Qgb2YgcHJlZGVmaW5lZCBsYWJlbHNcbiAgICBsYWJlbHM6IG51bGwsXG4gICAgLy8gbGlzdCBvZiBwcmVkZWZpbmVkIGNvb3JkaW5hdGVzIGdpdmVuIGFzIGFuIGFycmF5IG9mIGBbeDpOdW1iZXIsIHk6TnVtYmVyXWBcbiAgICBjb29yZGluYXRlczogbnVsbCxcbiAgICAvLyBtYXhpbXVtIG51bWJlciBvZiBjbGllbnRzIGFsbG93ZWQgaW4gYSBwb3NpdGlvblxuICAgIG1heENsaWVudHNQZXJQb3NpdGlvbjogMSxcbiAgICAvLyBtYXhpbXVtIG51bWJlciBvZiBwb3NpdGlvbnMgKG1heSBsaW1pdCBvciBiZSBsaW1pdGVkIGJ5IHRoZSBudW1iZXIgb2ZcbiAgICAvLyBsYWJlbHMgYW5kL29yIGNvb3JkaW5hdGVzKVxuICAgIGNhcGFjaXR5OiBJbmZpbml0eSxcbiAgfSxcblxuICAvLyBjb25maWd1cmF0aW9uIG9mIHRoZSBgb3NjYCBzZXJ2aWNlXG4gIG9zYzoge1xuICAgIC8vIElQIG9mIHRoZSBjdXJyZW50bHkgcnVubmluZyBub2RlIHNlcnZlclxuICAgIHJlY2VpdmVBZGRyZXNzOiAnMTI3LjAuMC4xJyxcbiAgICAvLyBwb3J0IGxpc3RlbmluZyBmb3IgaW5jb21taW5nIG1lc3NhZ2VzXG4gICAgcmVjZWl2ZVBvcnQ6IDU3MTIxLFxuICAgIC8vIElQIG9mIHRoZSByZW1vdGUgYXBwbGljYXRpb25cbiAgICBzZW5kQWRkcmVzczogJzEyNy4wLjAuMScsXG4gICAgLy8gcG9ydCB3aGVyZSB0aGUgcmVtb3RlIGFwcGxpY2F0aW9uIGlzIGxpc3RlbmluZyBmb3IgbWVzc2FnZXNcbiAgICBzZW5kUG9ydDogNTcxMjAsXG4gIH0sXG5cbiAgLy8gY29uZmlndXJhdGlvbiBvZiB0aGUgYHJhdy1zb2NrZXRgIHNlcnZpY2VcbiAgcmF3U29ja2V0OiB7XG4gICAgLy8gcG9ydCB1c2VkIGZvciBzb2NrZXQgY29ubmVjdGlvblxuICAgIHBvcnQ6IDgwODBcbiAgfSxcblxuICAvLyBidW55YW4gY29uZmlndXJhdGlvblxuICBsb2dnZXI6IHtcbiAgICBuYW1lOiAnc291bmR3b3JrcycsXG4gICAgbGV2ZWw6ICdpbmZvJyxcbiAgICBzdHJlYW1zOiBbe1xuICAgICAgbGV2ZWw6ICdpbmZvJyxcbiAgICAgIHN0cmVhbTogcHJvY2Vzcy5zdGRvdXQsXG4gICAgfSwgLyoge1xuICAgICAgbGV2ZWw6ICdpbmZvJyxcbiAgICAgIHBhdGg6IHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCAnbG9ncycsICdzb3VuZHdvcmtzLmxvZycpLFxuICAgIH0gKi9dXG4gIH0sXG5cbiAgLy8gZGlyZWN0b3J5IHdoZXJlIGVycm9yIHJlcG9ydGVkIGZyb20gdGhlIGNsaWVudHMgYXJlIHdyaXR0ZW5cbiAgZXJyb3JSZXBvcnRlckRpcmVjdG9yeTogcGF0aC5qb2luKGN3ZCwgJ2xvZ3MnLCAnY2xpZW50cycpLFxufVxuIl19