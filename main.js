import model from '/model.js'
import View from './view'
import Sequencer from './sequencer'


const view = new View()

function update() {
    /* update the state of your app here */
}

view.animate(update);

model.createRandomSteps()

const steps = model.getSteps()

steps.forEach(step => {
    view.createCube(step.position)
});

const logStep = (step) => {
    console.log(`Step ${step + 1} triggered`)
}

const sequencer = new Sequencer(logStep)
