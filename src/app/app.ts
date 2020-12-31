export const run = () => console.log('start app');

// let scene,
//   camera,
//   renderer,
//   mixer,
//   clock = new THREE.Clock(),
//   raycaster = new THREE.Raycaster(),
//   loaderAnim = document.getElementById('js-loader'),
//   controls;

// const filename = './../../assets/cube/cube.gltf';

const loaderAnim = document.getElementById('js-loader') as HTMLElement;

export const init = () => {
    const [ canvas ] = document.getElementsByClassName('canvas-render') as HTMLCollection;

    setTimeout(() => {
        loaderAnim.remove();
    }, 2000);

    console.log(canvas);
};
