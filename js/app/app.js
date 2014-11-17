/*jslint */
/*global define */

define([
    'three',
    'app/sea'
], function(
    three,
    sea
) {

    var create = function (sceneWidth, sceneHeight) {

        var scene,
            camera,
            renderer,
            seaMesh,
            directionalLight;

        scene = new three.Scene();

        camera = new three.OrthographicCamera(
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

        renderer = new three.WebGLRenderer();

        renderer.setSize(sceneWidth, sceneHeight);

        directionalLight = new three.DirectionalLight( 0xffffff, 1 );
        directionalLight.position.x = 100;
        directionalLight.position.y = 100;
        directionalLight.position.z = -50;
        directionalLight.castShadow = true;
        scene.add( directionalLight );


        seaMesh = sea.createSea(15, 15, 100);
        seaMesh.translateZ(-600);
        seaMesh.translateX(-600);
        scene.add(seaMesh);

        //scene.add( new t.AmbientLight( 0xffffff) );

        return {
            renderer: renderer,
            scene: scene,
            camera: camera
        };

    };

    return create;

});

