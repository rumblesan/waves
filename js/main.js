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
    createApp
) {
    var body, app;

    body = doc.createElement('body');
    doc.body = body;

    app = createApp(window.innerWidth, window.innerHeight);

    body.appendChild(app.renderer.domElement);

    var render = function () {
        requestAnimationFrame(render);
        app.renderer.render(app.scene, app.camera);
    };

    console.log('App loaded');

    render();

});

