import * as THREE from 'three';

const container = document.getElementById('canvas-container');

// Scene setup
const scene = new THREE.Scene();
// Fog for depth
scene.fog = new THREE.FogExp2(0x0f0f12, 0.002);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.z = 50;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.appendChild(renderer.domElement);

// Particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 2000;

const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    // Spread particles
    posArray[i] = (Math.random() - 0.5) * 150;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const material = new THREE.PointsMaterial({
    size: 0.2,
    color: 0x00d2ff, // Cyan
    transparent: true,
    opacity: 0.8,
});

const particlesMesh = new THREE.Points(particlesGeometry, material);
scene.add(particlesMesh);

// Abstract Shapes (Icosahedrons)
const shapeGeometry = new THREE.IcosahedronGeometry(10, 1);
const shapeMaterial = new THREE.MeshBasicMaterial({
    color: 0x3a7bd5,
    wireframe: true,
    transparent: true,
    opacity: 0.1
});

const shapeMesh = new THREE.Mesh(shapeGeometry, shapeMaterial);
scene.add(shapeMesh);

const shapeMesh2 = new THREE.Mesh(shapeGeometry, shapeMaterial);
shapeMesh2.scale.set(2, 2, 2);
shapeMesh2.rotation.y = 1;
scene.add(shapeMesh2);


// Mouse Interactivity
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
});

// Animation Loop
const clock = new THREE.Clock();

function animate() {
    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;

    const elapsedTime = clock.getElapsedTime();

    // Rotate the entire particle system slightly
    particlesMesh.rotation.y = 0.1 * elapsedTime;
    particlesMesh.rotation.x = -mouseY * 0.0001;
    particlesMesh.rotation.y += mouseX * 0.0001;

    // Rotate shapes
    shapeMesh.rotation.x += 0.001;
    shapeMesh.rotation.y += 0.002;
    shapeMesh.rotation.x -= (mouseY * 0.0002);
    shapeMesh.rotation.y -= (mouseX * 0.0002);

    shapeMesh2.rotation.x -= 0.001;
    shapeMesh2.rotation.y -= 0.001;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();

// Resize Handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
