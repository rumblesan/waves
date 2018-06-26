import { Scene, WebGLRenderer, DirectionalLight, AmbientLight } from 'three';

import { Camera } from './camera';
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

  const camera = Camera(sceneWidth, sceneHeight, scene);

  return {
    renderer: renderer,
    scene: scene,
    camera: camera,
    animate: function(t) {
      sea.animate(t);
    },
  };
};
