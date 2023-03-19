export default class Sequencer {
    constructor(callback) {
        this.sequencerLoop = null
        this.isRunning = false
        this.bpm = 120
        this.step = 0
        this.numberOfSteps = 1
        this.callback = callback
        this.controls = document.querySelector('.controls')
        this.init()
    }

    init() {
        this.addControlButton('playButton', 'Play', () => {
            if (!this.isRunning) {
                this.play();
            }
        })

        this.addControlButton('stopButton', 'Stop', () => {
            if (this.isRunning) {
                this.stop();
            }
        })
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

    addControlButton(className, innerHTML, clickHandler) {
        const button = document.createElement('button');
        button.classList.add(className);
        button.innerHTML = innerHTML;
        button.addEventListener('click', clickHandler);
        this.controls.appendChild(button);
    }

    createScaleSelector(scales, callback) {
        const scaleSelector = document.createElement('select')
        scaleSelector.classList.add('scaleSelector')
        scales.forEach(scale => {
            const option = document.createElement('option')
            option.value = scale
            option.innerHTML = scale
            scaleSelector.appendChild(option)
        })
        scaleSelector.value = 'major'
        this.controls.appendChild(scaleSelector)

        // This gets called when the user changes the scale and returns the selected scale
        scaleSelector.addEventListener('change', (e) => {
            callback(e.target.value)
        })
    }
}
