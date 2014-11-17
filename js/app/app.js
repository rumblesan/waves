/*jslint */
/*global define, requestAnimationFrame */

define([
    'app/sea',
], function(
    sea
) {

    var app = function (w, d, t) {

        var scene,
            camera,
            renderer,
            geometry,
            material,
            cube,
            body,
            sceneWidth,
            sceneHeight;

        sceneWidth = w.innerWidth;
        sceneHeight = w.innerHeight;

        body = d.createElement("body");
        d.body = body;

        scene = new t.Scene();

        camera = new t.OrthographicCamera(
            sceneWidth  / -2,
            sceneWidth  /  2,
            sceneHeight /  2,
            sceneHeight / -2,
            -500,
            1000
        );
        camera.x = 1;
        camera.y = 1;
        camera.z = 1;
        camera.lookAt(scene.position);

        renderer = new t.WebGLRenderer();
        renderer.setSize(w.innerWidth, w.innerHeight);
        body.appendChild(renderer.domElement);


        geometry = sea.createSea(t);
        material = new t.MeshBasicMaterial({ color: 0x00ff00 });
        sea = new t.Mesh(geometry, material);
        scene.add(sea);

        var render = function () {
            requestAnimationFrame(render);
            renderer.render(scene, camera);
        };

        render();

    };

    return app;

});

