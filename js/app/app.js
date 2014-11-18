/*global define */

define([
    'three',
    'app/sea'
], function(
    Three,
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

        camera = new Three.OrthographicCamera(
            sceneWidth  / -2,
            sceneWidth  /  2,
            sceneHeight /  2,
            sceneHeight / -2,
            -500,
            1000
        );
        camera.position.x = 200;
        camera.position.y = 200;
        camera.position.z = 200;
        camera.lookAt(scene.position);

        renderer = new Three.WebGLRenderer();

        renderer.setSize(sceneWidth, sceneHeight);

        directionalLight = new Three.DirectionalLight( 0xffffff, 1 );
        directionalLight.position.x = 100;
        directionalLight.position.y = 100;
        directionalLight.position.z = -50;
        directionalLight.castShadow = true;
        scene.add( directionalLight );


        sea = Sea.createSea(15, 15, 100);
        sea.mesh.translateZ(-600);
        sea.mesh.translateX(-600);
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

