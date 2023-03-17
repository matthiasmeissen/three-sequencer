import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'


class View {    
    constructor() {
        this.init()
    }

    init() {
        this.scene = new THREE.Scene()

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
        this.camera.position.z = 5

        this.canvas = document.querySelector('.webgl')

        this.renderer = new THREE.WebGLRenderer({canvas: this.canvas})
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        this.renderer.setSize(window.innerWidth, window.innerHeight)

        window.addEventListener('resize', function() {
            this.camera.aspect = window.innerWidth / window.innerHeight
            this.camera.updateProjectionMatrix()
            this.renderer.setSize(window.innerWidth, window.innerHeight)
        })

        this.controls = new OrbitControls( this.camera, this.renderer.domElement );

        this.createCubes()
    }

    createCubes() {
        this.cubes = new THREE.Group()
        this.scene.add(this.cubes)
    }

    createCube(pos = {x: 0, y: 0, z:0}) {
        const cube = new THREE.Mesh(
            new THREE.BoxGeometry(),
            new THREE.MeshBasicMaterial()
        )
        cube.position.set(pos.x, pos.y, pos.z)
        this.cubes.add(cube)
    }

    showActiveStep(index) {
        this.cubes.children.forEach(cube => {
            cube.material.color.setHSL(0, 0, 1)
        })
        this.cubes.children[index].material.color.setHSL(0, 0, 0.2)

    }

    animate(callback) {
        requestAnimationFrame(() => {
            this.renderer.render(this.scene, this.camera)
            this.animate(callback);
        });

        if (typeof callback === 'function') {
            callback();
        }
    }
}

export default View
