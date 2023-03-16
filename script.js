import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { steps, createStep } from '/data.js'


let scene, camera, canvas, renderer, controls
let clock, absTime

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

    clock = new THREE.Clock()
}

init()


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
    steps.forEach(step => {
        createCube(step.position)
    });
}


createRandomSteps()
createCubesfromSteps()


// Animate
function animate() {
    absTime = clock.getElapsedTime()
    
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
}

animate()
