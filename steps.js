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
