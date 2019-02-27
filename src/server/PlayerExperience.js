import { Experience } from 'soundworks/server';

// server-side 'player' experience.
export default class PlayerExperience extends Experience {
  constructor(clientType) {
    super(clientType);

    this.checkin = this.require('checkin');
    this.sharedConfig = this.require('shared-config');
    this.sharedParams = this.require('shared-params');
    this.audioBufferManager = this.require('audio-buffer-manager');

//  this.sync = this.require('sync'); //on veut la synchro
    this.syncScheduler = this.require('sync-scheduler'); //on synchronise tous nos copains
  }

  start() {

  }

  enter(client) {
    super.enter(client);

    this.sharedParams.update('numPlayers', this.clients.length);
  }

  exit(client) {
    super.exit(client);

    this.sharedParams.update('numPlayers', this.clients.length);
  }
}
