import 'source-map-support/register'; // enable sourcemaps in node
import path from 'path';
import * as soundworks from 'soundworks/server';
import PlayerExperience from './PlayerExperience';
import ControllerExperience from './ControllerExperience';


const configName = process.env.ENV || 'default';
const configPath = path.join(__dirname, 'config', configName);
let config = null;

// rely on node `require` as the path is dynamic
try {
  config = require(configPath).default;
} catch(err) {
  console.error(`Invalid ENV "${configName}", file "${configPath}.js" not found`);
  process.exit(1);
}

process.env.NODE_ENV = config.env;

if (process.env.PORT) {
  config.port = process.env.PORT;
}


soundworks.server.init(config);

soundworks.server.setClientConfigDefinition((clientType, config, httpRequest) => {
  return {
    clientType: clientType,
    env: config.env,
    appName: config.appName,
    websockets: config.websockets,
    defaultType: config.defaultClient,
    assetsDomain: config.assetsDomain,
  };
});

const sharedParams = soundworks.server.require('shared-params');
sharedParams.addText('numPlayers', '# players', '0');
sharedParams.addNumber('numBeats', '# beats', 1, 16, 1, 4);
sharedParams.addNumber('BPM', 'BPM', 60, 400, 1, 120);
// sharedParams.addEnum('son', 'son', ['sine','sounds'], 'sounds');


//on instancie les différents types de clients
const experience = new PlayerExperience('player');
const controller = new ControllerExperience('controller');


soundworks.server.start();
