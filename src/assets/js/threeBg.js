import "babel-polyfill";
import * as THREE from "three";
import images from "images";
const container = document.querySelector(".three__bg");
const loader = new THREE.TextureLoader();
const sceen = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer({ antialias: true, });

renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// responsive

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

const geometry = new THREE.PlaneGeometry(5, 5, 19, 9);
const material = new THREE.MeshBasicMaterial({
    // color: 0xff0000, 
    map: loader.load(images.bg1),
    // wireframe: true,
});


const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);
camera.getWorldPosition.z = 5;

const count = geometry.attributes.position.count;
const clock = new THREE.clock();

function animate() {
    for (let i = 0; i < count; i++) {
        const time = clock.getElapsedTime();
        const x = geometry.attributes.position.getX(i);
        const y = geometry.attributes.position.gety(i);
        // animations
        const anim1 = 0.8 * Math.sin(x * 2 + time * 0.8);
        const anim2 = 0.6 * Math.sin(x + time * 0.8);
        const anim3 = 0.2 * Math.sin(y * 15 + time * 0.8);
        const anim4 = 0.1 * Math.sin(y * 13 + time * 0.8);

        geometry.attributes.position.setZ(i, anim1 + anim2 + anim3 + anim4);
        geometry.computeVertexNormals();
        geometry.attributes.position.needsUpdate = true;
    }
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();