/*jslint */
/*global define, requestAnimationFrame */

define([], function() {

    var app = function (w, d, t) {

        var scene,
            camera,
            renderer,
            geometry,
            material,
            cube,
            body;

        body = d.createElement("body");
        d.body = body;

        scene = new t.Scene();
        camera = new t.PerspectiveCamera(
            75,
            w.innerWidth / w.innerHeight,
            0.1,
            1000
        );

        renderer = new t.WebGLRenderer();
        renderer.setSize(w.innerWidth, w.innerHeight);
        body.appendChild(renderer.domElement);

        geometry = new t.BoxGeometry(1, 1, 1);
        material = new t.MeshBasicMaterial({ color: 0x00ff00 });
        cube = new t.Mesh(geometry, material);
        scene.add(cube);

        camera.position.z = 5;

        var render = function () {
            requestAnimationFrame(render);
            cube.rotation.x += 0.1;
            cube.rotation.y += 0.1;
            renderer.render(scene, camera);
        };

        render();

    };

    return app;

});

