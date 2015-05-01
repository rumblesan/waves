
var Three = require('../lib/three.min');

var Camera = require('./camera');
var Lights = require('./lights');
var Sea = require('./sea');
var Island = require('./island');

var Waves = {};

Waves.create = function (sceneWidth, sceneHeight) {

    var scene,
        camera,
        renderer,
        sea,
        island,
        directionalLight;

    scene = new Three.Scene();

    renderer = new Three.WebGLRenderer();

    renderer.setSize(sceneWidth, sceneHeight);

    scene.add(Lights.createDirectional(0xffaaff,1));

    scene.add(Lights.createAmbient(0x001100));

    sea = Sea.createSea(20, 20, 15, 15, false);
    sea.mesh.translateZ(-130);
    sea.mesh.translateX(-130);
    scene.add(sea.mesh);

    island = Island.create(9, 11, 10, 40, 7);
    island.mesh.translateX(-20);
    island.mesh.translateY(-20);
    island.mesh.translateZ(-20);
    scene.add(island.mesh);

    camera = Camera.create(sceneWidth, sceneHeight, scene);

    return {
        renderer: renderer,
        scene: scene,
        camera: camera,
        animate: function (t) {
            sea.animate(t);
        }
    };

};

module.exports = Waves;

