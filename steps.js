import { Note, Scale} from 'tonal'


class Steps {
    constructor() {
        this.steps = []
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

    createStep(position = {x: 0, y: 0, z: 0}, type = 'trigger', note = 'A4') {
        const step = {
            position: position,
            type: type,
            note: note
        }

        this.steps.push(step)
    }

    setNotes(inputScale  = 'a4 major') {
        const scale = Scale.get(inputScale)

        this.steps.forEach(step => {
            const pos = step.position
            const note = scale.notes[pos.x]
            step.note = note
        })
    }

    extendScale(inputScale = 'a4 major') {
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
