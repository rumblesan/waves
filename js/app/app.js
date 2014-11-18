/*global define */

define([
    'three',
    'app/camera',
    'app/lights',
    'app/sea'
], function(
    Three,
    Camera,
    Lights,
    Sea
) {

    var App = {};

    App.create = function (sceneWidth, sceneHeight) {

        var scene,
            camera,
            renderer,
            sea,
            directionalLight;

        scene = new Three.Scene();

        renderer = new Three.WebGLRenderer();

        renderer.setSize(sceneWidth, sceneHeight);

        scene.add(Lights.createDirectional(0xffaaff,1));

        scene.add(Lights.createAmbient(0x001100));

        sea = Sea.createSea(15, 15, 100, 20, false);
        sea.mesh.translateZ(-130);
        sea.mesh.translateX(-130);
        scene.add(sea.mesh);

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

    return App;

});

