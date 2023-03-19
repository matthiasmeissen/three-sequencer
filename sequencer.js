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
        const controls = document.querySelector('.controls')
        this.addPlayButton(controls)
        this.addStopButton(controls)
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

    createButton(className, innerHTML) {
        const button = document.createElement('button')
        button.classList.add(className)
        button.innerHTML = innerHTML
        return button
    }

    createScaleSelector(scales) {
        const scaleSelector = document.createElement('select')
        scaleSelector.classList.add('scaleSelector')
        scales.forEach(scale => {
            const option = document.createElement('option')
            option.value = scale
            option.innerHTML = scale
            scaleSelector.appendChild(option)
        })
        return scaleSelector
    }

    addPlayButton(parent) {
        const playButton = this.createButton('playButton', 'Play')
        parent.appendChild(playButton)
        playButton.addEventListener('click', () => {
            if (this.isRunning === false) { 
                this.play()
            }
        })
    }

    addStopButton(parent) {
        const stopButton = this.createButton('stopButton', 'Stop')
        parent.appendChild(stopButton)
        stopButton.addEventListener('click', () => {
            if (this.isRunning === true) {
                this.stop()
            }
        })
    }
}
