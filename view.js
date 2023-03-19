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

        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        this.cubeAddEvent = new CustomEvent('cubeAdd', { bubbles: true });

        window.addEventListener('resize', () => this.onResize())
        window.addEventListener('mousemove', (event) => this.onMouseMove(event))
        window.addEventListener('mousedown', (event) => this.onMouseDown(event))

        this.controls = new OrbitControls( this.camera, this.renderer.domElement );

        this.createCubes()
        this.addLights()
    }

    createCubes() {
        this.cubes = new THREE.Group()
        this.scene.add(this.cubes)
    }

    createCube(pos = {x: 0, y: 0, z:0}) {
        const cube = new THREE.Mesh(
            new THREE.BoxGeometry(),
            new THREE.MeshStandardMaterial()
        )
        cube.position.set(pos.x, pos.y, pos.z)
        this.cubes.add(cube)
    }

    addLights() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
        this.scene.add(ambientLight)

        const pointLight = new THREE.PointLight(0xffffff, 0.5)
        pointLight.position.set(-2, 4, 4)
        this.scene.add(pointLight)

        const pointLight2 = new THREE.PointLight(0xffffff, 0.5)
        pointLight2.position.set(2, 4, -2)
        this.scene.add(pointLight2)
    }

    onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
    }

    onMouseMove(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);
    }


    onMouseDown(event) {
        const intersects = this.raycaster.intersectObjects(this.cubes.children);
    
        if (intersects.length === 0) {
            return
        }
            
        const hoveredCubePosition = intersects[0].object.position
        const hoveredFaceNormal = intersects[0].face.normal
        const newPosition = hoveredCubePosition.clone().add(hoveredFaceNormal)

        this.createCube(newPosition)

        this.cubeAddEvent.position = newPosition
        document.dispatchEvent(this.cubeAddEvent)
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
