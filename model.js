let steps = []

function getSteps() {
    return steps
}

function setSteps(newSteps) {
    steps = newSteps
}

function upddateStep(index, newStep) {
    steps[i] = newStep
}

const createStep = function (position = {x: 0, y: 0, z: 0}, type = 'trigger', note = 'A4') {
    const step = {
        position: position,
        type: type,
        note: note
    }

    steps.push(step)
}

const createRandomSteps = function (numberOfSteps = 16) {
    for (let i = 0; i < numberOfSteps; i++) {
        createStep({
            x: Math.round(Math.random() * 4 - 2),
            y: Math.round(Math.random() * 4 - 2),
            z: Math.round(Math.random() * 4 - 2)
        })
    }
}

export default {
    getSteps,
    setSteps,
    upddateStep,
    createStep,
    createRandomSteps
}
