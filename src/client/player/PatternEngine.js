import { audio } from 'soundworks/client';


const audioContext = audio.audioContext;


class SinePatternEngine extends audio.TimeEngine {
	constructor(scheduler, pattern = [], frequency = 500, masterGain = 1) {
		super();
		this.period = Infinity;
		this.pattern = pattern;
		this.patternIndex = 0;
		this.scheduler = scheduler;
		this.frequency = frequency;
		this.masterGain = masterGain;
	}

	advanceTime(synctime) {
		if (this.pattern[this.patternIndex] === 1) {
			const time = this.scheduler.audioTime;
			const sine = audioContext.createOscillator();
			sine.frequency.value = this.frequency;
			const _masterGain = audioContext.createGain();
			const env = audioContext.createGain();
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
}

export default SinePatternEngine;