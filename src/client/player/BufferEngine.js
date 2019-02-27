import { audio } from 'soundworks/client';


const audioContext = audio.audioContext;


class BufferEngine extends audio.TimeEngine {
	constructor(scheduler, pattern = [], buffer, masterGain = 1) {
		super();
		this.period = Infinity;
		this.pattern = pattern;
		this.patternIndex = 0;
		this.scheduler = scheduler;
		this.buffer = buffer;
		this.masterGain = masterGain;
	}

	advanceTime(synctime) {
		if (this.pattern[this.patternIndex] === 1) {
			const _masterGain = audioContext.createGain();

			// console.log();
			

			_masterGain.gain.value = this.masterGain;
			const time = this.scheduler.audioTime;
			const src = audioContext.createBufferSource();
			src.buffer = this.buffer;
			src.connect(_masterGain);
			_masterGain.connect(audioContext.destination);
			src.start(time);
			src.stop(time + 0.5);



		}

		this.patternIndex = (this.patternIndex + 1) % this.pattern.length;

		return synctime + this.period;
	}
}

export default BufferEngine;