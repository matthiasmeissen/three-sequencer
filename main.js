import { getSteps, createStep } from '/model.js'
import view from './view'
import Sequencer from './sequencer'


view.init()
view.createCube({x: 0, y: 0, z: 0})


function update() {
    /* update the state of your app here */
}

view.animate(update);


const logStep = (step) => {
    console.log(`Step ${step + 1} triggered`)
}

const sequencer = new Sequencer(logStep)
