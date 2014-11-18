/*global define */

define([
    'three'
], function(
    Three
) {

    var Camera = {};

    Camera.create = function (sceneWidth, sceneHeight, scene) {

        var camera = new Three.OrthographicCamera(
            sceneWidth  / -10,
            sceneWidth  /  10,
            sceneHeight /  10,
            sceneHeight / -10,
            -500,
            1000
        );
        camera.position.x = 100;
        camera.position.y = 100;
        camera.position.z = 100;
        camera.lookAt(scene.position);

        return camera;
    };

    return Camera;

});

