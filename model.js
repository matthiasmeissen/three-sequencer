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

const createStep = function (position = {x: 0, y: 0, z: 0}, type = 'trigger', state = 'default', note = 'A4') {
    const step = {
        position: position,
        type: type,
        state: state,
        note: note
    }

    steps.push(step)
}

export {
    getSteps,
    setSteps,
    upddateStep,
    createStep
}
