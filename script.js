import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { getSteps, createStep } from '/model.js'


let scene, camera, canvas, renderer, controls

const playButton = document.querySelector('.playButton')
const stopButton = document.querySelector('.stopButton')


// Set up the scene, camera and renderer
function init() {
    scene = new THREE.Scene()

    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
    camera.position.z = 5

    canvas = document.querySelector('.webgl')

    renderer = new THREE.WebGLRenderer({canvas})
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)

    window.addEventListener('resize', function() {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
    })

    controls = new OrbitControls( camera, renderer.domElement );
}

init()

let sequencerLoop, isRunning = false, step = 0

// Play the sequencer
function play() {
    const bpm = 120
    const timeBetweenBeats = 60 / bpm

    sequencerLoop = setInterval(function() {
        const step = getCurrentStep()
        for (let i = 0; i < 16; i++) {
            if (step[i]) {
                console.log('Step')
            }        
        }
        moveSequencer()
        isRunning = true
    }, timeBetweenBeats * 1000)
}

// Get the current step
function getCurrentStep() {
    const currentStep = []
    for (let i = 0; i < 16; i++) {
        currentStep.push(false)
    }
    currentStep[step] = true
    return currentStep
}

// Move the sequencer
function moveSequencer() {
    step++
    if (step > 15) {
        step = 0
    }
}

// Stop the sequencer
function stop() {
    clearInterval(sequencerLoop)
    isRunning = false
}


playButton.addEventListener('click', function() {
    if (!isRunning) {
        play()
    }
})

stopButton.addEventListener('click', function() {
    if (isRunning) {
        stop()
    }
})


// Objects
const createCube = function(pos = {x: 0, y: 0, z:0}) {
    const cube = new THREE.Mesh(
        new THREE.BoxGeometry(),
        new THREE.MeshBasicMaterial()
    )
    cube.position.set(pos.x, pos.y, pos.z)
    scene.add(cube)
}

const createRandomSteps = function() {
    for (let i = 0; i < 10; i++) {
        createStep({x: (Math.random() - 0.5) * 2, y: (Math.random() - 0.5) * 2, z: (Math.random() - 0.5) * 2})
    }
}

const createCubesfromSteps = function() {
    const steps = getSteps()
    steps.forEach(step => {
        createCube(step.position)
    });
}


createRandomSteps()
createCubesfromSteps()


// Animate
function animate() {    
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
}

animate()
