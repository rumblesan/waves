import { Waves } from 'app/waves';

import 'index.html';
import 'images/favicon.ico';
import 'style/style.css';

const body = document.createElement('body');
document.body = body;

const waves = Waves(window.innerWidth, window.innerHeight);

body.appendChild(waves.renderer.domElement);

const speed = 0.01;

const render = function(t) {
  requestAnimationFrame(function() {
    render(t + speed);
  });
  waves.renderer.render(waves.scene, waves.camera);
  waves.animate(t);
};

render(0);
