import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'


let scene, camera, canvas, renderer, controls

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

const createCube = function(pos = {x: 0, y: 0, z:0}) {
    const cube = new THREE.Mesh(
        new THREE.BoxGeometry(),
        new THREE.MeshBasicMaterial()
    )
    cube.position.set(pos.x, pos.y, pos.z)
    scene.add(cube)
}


function animate(callback) {
    requestAnimationFrame(() => {
        renderer.render(scene, camera)
        animate(callback);
    });

    if (typeof callback === 'function') {
        callback();
    }
}


export default {
    init,
    createCube,
    animate
}
