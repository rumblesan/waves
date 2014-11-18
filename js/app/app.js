/*global define */

define([
    'three',
    'app/camera',
    'app/sea'
], function(
    Three,
    Camera,
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

        camera = Camera.create(sceneWidth, sceneHeight, scene);

        renderer = new Three.WebGLRenderer();

        renderer.setSize(sceneWidth, sceneHeight);

        directionalLight = new Three.DirectionalLight( 0xffffff, 1 );
        directionalLight.position.x = 100;
        directionalLight.position.y = 100;
        directionalLight.position.z = -50;
        directionalLight.castShadow = true;
        scene.add( directionalLight );


        sea = Sea.createSea(15, 15, 100, 20, false);
        sea.mesh.translateZ(-130);
        sea.mesh.translateX(-130);
        scene.add(sea.mesh);

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

