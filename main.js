import Steps from '/steps'
import View from './view'
import Sequencer from './sequencer'
import Sound from './sound'


// Initialize the steps
const sequencerSteps = new Steps();
sequencerSteps.createStep({x: 0, y: 0, z: 0});


// Initialize the view
const view = new View();
sequencerSteps.steps.forEach((step) => {
  view.createCube(step.position);
})


// Initialize the sound
const sound = new Sound();


// This code is executed every time the sequencer triggers a step
const updateSequencer = (i) => {
    view.showActiveStep(i);

    sound.playNote(sequencerSteps.steps[i].frequency, 0.2);
};
const sequencer = new Sequencer(updateSequencer);

const showSelectedScale = (scale) => {
  let newScale = `a4 ${scale}`;
  sequencerSteps.setScale(newScale);
}


sequencer.createScaleSelector(sequencerSteps.getScales(), showSelectedScale);

// Custome event for when a cube is added
document.addEventListener('cubeAdd', (event) => {
  sequencerSteps.createStep(event.position);
  sequencerSteps.setNotes();
  sequencer.numberOfSteps += 1;

  console.log(sequencerSteps.steps);
});


// This code is executed every time the view is updated
function updateView() {
  // update the state of your app here
}

view.animate(updateView);
