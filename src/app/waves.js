import {
  Scene,
  WebGLRenderer,
  DirectionalLight,
  AmbientLight,
  OrthographicCamera,
} from 'three';

import { Sea } from './sea';
import { Island } from './island';

export const Waves = (sceneWidth, sceneHeight) => {
  const scene = new Scene();

  const renderer = new WebGLRenderer();
  renderer.setSize(sceneWidth, sceneHeight);

  const directionalLight = new DirectionalLight(0xffaaff, 1);
  directionalLight.position.x = 0;
  directionalLight.position.y = 100;
  directionalLight.position.z = -50;
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  scene.add(new AmbientLight(0x001100));

  const sea = Sea(20, 20, 15, 15, false);
  sea.mesh.translateZ(-130);
  sea.mesh.translateX(-130);
  scene.add(sea.mesh);

  const island = Island(9, 11, 10, 40, 7);
  island.mesh.translateX(-20);
  island.mesh.translateY(-20);
  island.mesh.translateZ(-20);
  scene.add(island.mesh);

  const camera = new OrthographicCamera(
    sceneWidth / -10,
    sceneWidth / 10,
    sceneHeight / 10,
    sceneHeight / -10,
    -500,
    1000
  );
  camera.position.x = 100;
  camera.position.y = 100;
  camera.position.z = 100;
  camera.lookAt(scene.position);

  return {
    renderer: renderer,
    scene: scene,
    camera: camera,
    animate: sea.animate,
  };
};
