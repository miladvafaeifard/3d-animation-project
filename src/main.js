let scene,
  camera,
  renderer,
  mixer,
  clock = new THREE.Clock(), // Used for anims, which run to a clock instead of frame rate
  raycaster = new THREE.Raycaster(), // Used to detect the click on our character
  loaderAnim = document.getElementById('js-loader'),
  controls;

const filename = './assets/cube/cube.gltf';

init();

function init() {
  const canvas = document.querySelector('#canvas3D');

  // Init the scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xdddddd);

  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.position.z = 200;
  camera.position.x = -20;
  camera.position.y = 10;

  hlight = new THREE.AmbientLight(0x404040, 100);
  scene.add(hlight);

  directionalLight = new THREE.DirectionalLight(0xffffff, 100);
  directionalLight.position.set(0, 1, 0);
  directionalLight.castShadow = true;
  scene.add(directionalLight);
  light = new THREE.PointLight(0xc4c4c4, 10);
  light.position.set(0, 300, 500);
  scene.add(light);
  light2 = new THREE.PointLight(0xc4c4c4, 10);
  light2.position.set(500, 100, 0);
  scene.add(light2);
  light3 = new THREE.PointLight(0xc4c4c4, 10);
  light3.position.set(0, 100, -500);
  scene.add(light3);
  light4 = new THREE.PointLight(0xc4c4c4, 10);
  light4.position.set(-500, 300, 500);
  scene.add(light4);

  // Init the renderer
  renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.shadowMap.enabled = true;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  let loader = new THREE.GLTFLoader();
  loader.load(filename, function (gltf) {
    const model = gltf.scene;
    const fileAnimations = gltf.animations;
    model.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
      }
    });

    model.scale.set(7, 7, 7);

    scene.add(model);

    loaderAnim.remove();

    mixer = new THREE.AnimationMixer(model);

    let clip = THREE.AnimationClip.findByName(fileAnimations, 'CubeAction');
    
    const action = mixer.clipAction( clip );
    action.play();
  });
}

update();

function update() {
  if (mixer) {
    mixer.update(clock.getDelta());
  }
  renderer.render(scene, camera);
  requestAnimationFrame(update);
}
