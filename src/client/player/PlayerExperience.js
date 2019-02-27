import * as soundworks from 'soundworks/client';
import PatternEngine from './PatternEngine'
import * as controllers from '@ircam/basic-controllers';
import BufferEngine from './BufferEngine';



//on se simplifie un peu l'écriture
const audioContext = soundworks.audioContext;
const audio = soundworks.audio;



//pour faire des gui, on passe par la!! (mais ça va changer tkt frer)
const template = `
  <div class="foreground">
    <div class="section-top flex-middle"></div>
    <div class="section-center flex-center">
      <div>
        <% for (var i = 0; i < pattern.length; i++) { %>
          <input class="beat" type="checkbox" data-index="<%= i %>"<%= pattern[i] === 1 ? ' checked' : '' %> />
        <% } %>
        <br /><br />
        frequency
        <input class="slider" id="frequency" type="range" min="100" max="1000" step='1' value="<%= frequency %>" />
        <br />
        sound
        <input class='slider' id='soundNum' type="range" min="0" max="2" step="1" value='<%= soundNum %>' />
        <br />
        masterGain
        <input class='slider' id='masterGain' type='range' min='-80' max="0" step='0.5' value='<%= masterGain %>' />
      </div>
    </div>
    <div class="section-bottom flex-middle"></div>
  </div>
`;




class PlayerExperience extends soundworks.Experience {
  constructor(assetsDomain) {
    super();

    this.platform = this.require('platform', { features: ['web-audio'] });
    this.checkin = this.require('checkin', { showDialog: false });
    this.sharedParams = this.require('shared-params');
//  this.sync = this.require('sync'); //on veut la synchro
    this.syncScheduler = this.require('sync-scheduler'); //on synchronise tous nos copains
    this.audioBufferManager = this.require('audio-buffer-manager', { files: [
      'sounds/clicks/click.mp3',
      'sounds/clicks/clack.mp3',
      'sounds/clicks/clock.mp3'
    ]});

  }

  async start() {
    super.start();
    this.pattern = [1, 0, 1, 0, 1, 0, 1, 0];
    const frequency = 500;
    const soundNum = 1;
    const masterGain = 1;
    this.buffer = this.audioBufferManager.data[soundNum];


    // this.patternEngine = new PatternEngine(this.syncScheduler, this.pattern, frequency);
    this.patternEngine = new BufferEngine(this.syncScheduler, this.pattern, this.buffer, masterGain);


 





    this.view = new soundworks.SegmentedView(template, { 
      pattern: this.pattern,
      frequency: frequency,
      soundNum: soundNum,
      masterGain: masterGain
    }, {
      'click .beat': (e) => {
        const $el = e.target;
        const index = parseInt($el.dataset.index);
        const value = $el.checked ? 1 : 0;
        this.pattern[index] = value;
      },
      'input #frequency': (e) => {
        const $el = e.target;
        const frequency = parseInt($el.value);
        this.patternEngine.frequency = frequency;
      },
      'input #soundNum': (e) => {
        const $el = e.target;
        const soundNum = parseInt($el.value);
        this.patternEngine.buffer = this.audioBufferManager.data[soundNum];
      },
      'input #masterGain': (e) => {
        const $el = e.target;
        const masterGain = Math.pow(10, parseFloat($el.value)/20);
        // console.log(masterGain);
        // this.masterGain = ;
        this.patternEngine.masterGain = masterGain;
      }
    }, {});





//on est sur que la page est affichée
    await this.show()

    this.sharedParams.addParamListener('BPM', () => this.updateEnginePeriod());
    this.sharedParams.addParamListener('numBeats', () => this.updateEnginePeriod());
    // this.sharedParams.addParamListener('son', () => this.updateEnginePeriod());
    this.updateEnginePeriod();

    }



    updateEnginePeriod() {
      if (this.patternEngine.master) {
        this.syncScheduler.remove(this.patternEngine);
      }
      const BPM = this.sharedParams.getValue('BPM');
      const numBeats = this.sharedParams.getValue('numBeats');
      // this.son = this.sharedParams.getValue('son');
      const period = (60 / BPM) / numBeats;
//        const numeroClient = soundworks.client.index % frequencies.length;
      

//TEMPS SYNCHRONISE
      const syncTime = this.syncScheduler.syncTime; //on recupere le temps absolu du serveur
      const numPeriodsSinceOrigin = Math.ceil(syncTime / period);
      const nextPatternIndex = numPeriodsSinceOrigin % this.pattern.length;
      const startTime = numPeriodsSinceOrigin * period; //division arrondie à l'entier supérieure    
      this.patternEngine.period = period;
      this.patternEngine.patternIndex = nextPatternIndex;
      this.syncScheduler.add(this.patternEngine, startTime); //on schedule le patternEngine
    }


    // const period = 0.1
   

//TEMPS NON SYNCHRO 
   // const scheduler = audio.getScheduler();


//Dans le cas d'élements simples!
//il faut updater le parametre à la main, c'est à dire patternEngine.period = blabla

    
}

export default PlayerExperience;
