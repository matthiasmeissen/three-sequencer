import Steps from '/steps'
import View from './view'
import Sequencer from './sequencer'


// Initialize the steps
const sequencerSteps = new Steps();
sequencerSteps.createRandomSteps();
sequencerSteps.setNotes('A4 major');

console.log(sequencerSteps.getSteps());


// Initialize the view
const view = new View();
sequencerSteps.steps.forEach((step) => {
  view.createCube(step.position);
})

document.addEventListener('cubeAdd', (event) => {
  sequencerSteps.createStep(event.position);
  sequencerSteps.setNotes('A4 major');
});


// This code is executed every time the sequencer triggers a step
const updateSequencer = (i) => {
    view.showActiveStep(i);
};
const sequencer = new Sequencer(updateSequencer);


// This code is executed every time the view is updated
function updateView() {
  // update the state of your app here
}

view.animate(updateView);
