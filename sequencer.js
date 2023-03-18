export default class Sequencer {
    constructor(callback) {
        this.sequencerLoop = null
        this.isRunning = false
        this.bpm = 120
        this.step = 0
        this.numberOfSteps = 1
        this.callback = callback

        this.init()
    }

    init() {
        this.addPlayButton(document.querySelector('.playButton'))
        this.addStopButton(document.querySelector('.stopButton'))   
    }

    play() {
        const timeBetweenBeats = 60 / this.bpm

        this.sequencerLoop = setInterval(() => {
            const step = this.getCurrentStep()
            for (let i = 0; i < this.numberOfSteps; i++) {
                if (step[i]) {
                    this.callback(i)
                }        
            }
            this.moveSequencer()
            this.isRunning = true
        }, timeBetweenBeats * 1000)
    }

    getCurrentStep() {
        const currentStep = []
        for (let i = 0; i < this.numberOfSteps; i++) {
            currentStep.push(false)
        }
        currentStep[this.step] = true
        return currentStep
    }

    moveSequencer() {
        this.step++
        if (this.step > this.numberOfSteps - 1) {
            this.step = 0
        }
    }

    stop() {
        clearInterval(this.sequencerLoop)
        this.isRunning = false
    }

    addPlayButton(playButton) {
        playButton.addEventListener('click', () => {
            if (this.isRunning === false) { 
                this.play()
            }
        })
    }

    addStopButton(stopButton) {
        stopButton.addEventListener('click', () => {
            if (this.isRunning === true) {
                this.stop()
            }
        })
    }
}
