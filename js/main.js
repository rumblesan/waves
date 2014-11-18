/*jslint browser: true */
/*global requirejs, require, requestAnimationFrame */

requirejs.config({
    paths: {
        three: 'lib/three.min',
        domReady: 'lib/domReady'
    },
    shim: {
        three: {
            deps: [],
            exports: 'THREE'
        }
    }
});

require([
    'domReady!',
    'three',
    'app/app'
], function(
    doc,
    three,
    App
) {
    var body, app, speed;

    body = doc.createElement('body');
    doc.body = body;

    app = App.create(window.innerWidth, window.innerHeight);

    body.appendChild(app.renderer.domElement);

    speed = 0.01;

    var render = function (t) {
        requestAnimationFrame(function () {
            render(t + speed);
        });
        app.renderer.render(app.scene, app.camera);
        app.animate(t);
    };

    console.log('App loaded');

    render(0);

});

