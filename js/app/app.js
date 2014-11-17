/*jslint */
/*global define, requestAnimationFrame */

define([
    'three',
    'app/sea'
], function(
    three,
    sea
) {

    var app = function (w, d) {

        var scene,
            camera,
            renderer,
            seaMesh,
            body,
            sceneWidth,
            sceneHeight,
            directionalLight;

        sceneWidth = w.innerWidth;
        sceneHeight = w.innerHeight;

        body = d.createElement("body");
        d.body = body;

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

        renderer.setSize(w.innerWidth, w.innerHeight);
        body.appendChild(renderer.domElement);


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
        var render = function () {
            requestAnimationFrame(render);
            renderer.render(scene, camera);
        };

        render();

    };

    return app;

});

