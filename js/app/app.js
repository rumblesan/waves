/*global define */

define([
    'three',
    'app/camera',
    'app/lights',
    'app/sea',
    'app/island'
], function(
    Three,
    Camera,
    Lights,
    Sea,
    Island
) {

    var App = {};

    App.create = function (sceneWidth, sceneHeight) {

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

        sea = Sea.createSea(15, 15, 100, 20, false);
        sea.mesh.translateZ(-130);
        sea.mesh.translateX(-130);
        scene.add(sea.mesh);

        island = Island.create(8, 12, 200, 50, 10);
        //scene.add(island);

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

