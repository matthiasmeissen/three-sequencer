import { Note, Scale} from 'tonal'


class Steps {
    constructor() {
        this.steps = []
        this.inputScale = 'a4 major'
    }

    getSteps() {
        return this.steps
    }

    setSteps(newSteps) {
        this.steps = newSteps
    }

    upddateStep(index, newStep) {
        this.steps[i] = newStep
    }

    createStep(position = {x: 0, y: 0, z: 0}, type = 'trigger', note = 'A4', frequency = 440) {
        const step = {
            position: position,
            type: type,
            note: note,
            frequency: frequency
        }

        this.steps.push(step)
    }

    setNotes() {
        const scale = this.extendScale(this.inputScale)
        const initialScaleLength = scale.length / 3

        this.steps.forEach(step => {
            const pos = step.position
            let note = scale[pos.x + initialScaleLength]

            const transposeValue = ['8P', '15P', '22P', '29P']

            if (pos.y > 0) {
                note = Note.transposeBy(transposeValue[pos.y - 1])(note)
            } else if (pos.y < 0) {
                note = Note.transposeBy(`-${transposeValue[Math.abs(pos.y) - 1]}`)(note)
            }

            step.note = note
            step.frequency = Note.freq(note)
        })
    }

    getScales() {
        return Scale.names()
    }

    setScale(scale) {
        this.inputScale = scale
        this.setNotes()
    }

    extendScale(inputScale) {
        const scale = Scale.get(inputScale).notes
        const transposeUp = scale.map(Note.transposeBy('8P'))
        const transposeDown = scale.map(Note.transposeBy('-8P'))

        const newScale = [...transposeDown, ...scale, ...transposeUp]

        return newScale
    }


    createRandomSteps(numberOfSteps = 16) {
        for (let i = 0; i < numberOfSteps; i++) {
            this.createStep({
                x: Math.round(Math.random() * 4 - 2),
                y: Math.round(Math.random() * 4 - 2),
                z: Math.round(Math.random() * 4 - 2)
            })
        }
    }
}

export default Steps
