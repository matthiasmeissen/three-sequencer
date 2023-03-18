class Sound {
    constructor() {
        this.audioContext = new AudioContext();
        this.createOscillators();
        this.isPlaying = false;
    }

    createOscillators() {
        this.sineOscillator = this.audioContext.createOscillator();
        this.sineOscillator.type = 'sine';
        this.sineOscillator.frequency.value = 440;

        this.sawOscillator = this.audioContext.createOscillator();
        this.sawOscillator.type = 'sawtooth';
        this.sawOscillator.frequency.value = 440;

        this.gain = this.audioContext.createGain();
        this.sineOscillator.connect(this.gain);
        this.sawOscillator.connect(this.gain);
        this.gain.connect(this.audioContext.destination);
    }

    playNote(frequency, duration) {
        if (!this.isPlaying) {
            this.sineOscillator.start();
            this.sawOscillator.start();
            this.isPlaying = true;
        }

        this.sineOscillator.frequency.value = frequency;
        this.sawOscillator.frequency.value = frequency;

        this.gain.gain.setValueAtTime(0.2, this.audioContext.currentTime);
        this.gain.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + duration);
    }
}

export default Sound;
