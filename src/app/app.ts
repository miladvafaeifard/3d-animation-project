import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export const run = async() => {
  init();
  update();
};

//   clock = new THREE.Clock(),
//   raycaster = new THREE.Raycaster(),
//   loaderAnim = document.getElementById('js-loader'),

// let controls: OrbitControls;
let scene: THREE.Scene;
let camera: THREE.Camera;
let renderer: THREE.WebGLRenderer;
let mixer: THREE.AnimationMixer;
let clock = new THREE.Clock();

const filename = './../../assets/cube/cube.gltf';

export const init = () => {
  const [canvas] = document.getElementsByClassName('canvas-render') as HTMLCollection;
  const loaderAnim = document.getElementById('js-loader') as HTMLElement;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xdddddd);

  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);

  camera.position.z = 200;
  camera.position.x = -20;
  camera.position.y = 10;

  const hlight = new THREE.AmbientLight(0x404040, 100);
  scene.add(hlight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 100);
  directionalLight.position.set(0, 1, 0);
  directionalLight.castShadow = true;
  scene.add(directionalLight);
  const light = new THREE.PointLight(0xc4c4c4, 10);
  light.position.set(0, 300, 500);
  scene.add(light);
  const light2 = new THREE.PointLight(0xc4c4c4, 10);
  light2.position.set(500, 100, 0);
  scene.add(light2);
  const light3 = new THREE.PointLight(0xc4c4c4, 10);
  light3.position.set(0, 100, -500);
  scene.add(light3);
  const light4 = new THREE.PointLight(0xc4c4c4, 10);
  light4.position.set(-500, 300, 500);
  scene.add(light4);

  // Init the renderer
  renderer = new THREE.WebGLRenderer({
    canvas: canvas as HTMLCanvasElement,
    antialias: true,
  });
  renderer.shadowMap.enabled = true;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  new OrbitControls(camera, renderer.domElement);

  let loader = new GLTFLoader();
  loader.load(filename, gltf => {
    const model = gltf.scene;
    const fileAnimations = gltf.animations;

    model.scale.set(7, 7, 7);

    scene.add(model);

    loaderAnim.remove();

    mixer = new THREE.AnimationMixer(model);

    let clip = THREE.AnimationClip.findByName(fileAnimations, 'CubeAction');

    const action = mixer.clipAction(clip);
    action.play();
  });
};

function update() {
  if (mixer) {
    mixer.update(clock.getDelta());
  }
  renderer.render(scene, camera);
  requestAnimationFrame(update);
}
