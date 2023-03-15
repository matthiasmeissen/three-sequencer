import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { steps, createStep } from '/data.js'


// Scene
const scene = new THREE.Scene()



// Objects
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshBasicMaterial()
)

scene.add(cube)

createStep()

console.log(steps)



// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
camera.position.z = 5



// Renderer
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setSize(window.innerWidth, window.innerHeight)

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
})



// Orbit Controls
const controls = new OrbitControls( camera, renderer.domElement );



// Clock
const clock = new THREE.Clock()
let absTime



// Animate
function animate() {
    absTime = clock.getElapsedTime()
    
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
}

animate()
