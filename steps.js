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
        const scale = this.extendScale(inputScale)
        const initialScaleLength = scale.length / 3

        this.steps.forEach(step => {
            // get the step position
            const pos = step.position

            // Create the note
            let note

            // take x position an use it to get the note from the scale
            note = scale[pos.x + initialScaleLength]

            const transposeValue = ['8P', '15P', '22P', '29P']

            if (pos.y > 0) {
                note = Note.transposeBy(transposeValue[pos.y - 1])(note)
            } else if (pos.y < 0) {
                note = Note.transposeBy(`-${transposeValue[Math.abs(pos.y) - 1]}`)(note)
            }

            step.note = note
        })
    }

    // the step position is a vec3 that defines the note
    // pos x cycles through the scale where 0 is the root note
    // pos y takes the note and transposes it up an ocatve
    // pos z leaves the note as is


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
