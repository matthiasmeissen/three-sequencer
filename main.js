import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { getSteps, createStep } from '/model.js'
import Sequencer from './sequencer'


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


const logStep = (step) => {
    console.log(`Step ${step + 1} triggered`)
}

const sequencer = new Sequencer(logStep)


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
