class Sound {
    constructor() {
        this.audioContext = new AudioContext();
        this.createOscillator();
        this.isPlaying = false;
    }

    createOscillator() {
        this.oscillator = this.audioContext.createOscillator();
        this.oscillator.type = 'sine';
        this.oscillator.frequency.value = 440;

        this.gain = this.audioContext.createGain();
        this.oscillator.connect(this.gain);
        this.gain.connect(this.audioContext.destination);
    }

    playNote(frequency, duration) {
        if (!this.isPlaying) {
            this.oscillator.start();
            this.isPlaying = true;
        }

        this.oscillator.frequency.value = frequency;

        this.gain.gain.setValueAtTime(0, this.audioContext.currentTime);
        this.gain.gain.linearRampToValueAtTime(0.1, this.audioContext.currentTime + 0.1);
        this.gain.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + duration);
    }
}

export default Sound;
