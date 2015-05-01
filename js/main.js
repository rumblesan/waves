/*jslint browser: true */
/*global require, requestAnimationFrame */

var domReady = require('./lib/domReady');
var Waves = require('./app/waves');

domReady(function() {

    var body, waves, speed;

    body = document.createElement('body');
    document.body = body;

    waves = Waves.create(window.innerWidth, window.innerHeight);

    body.appendChild(waves.renderer.domElement);

    speed = 0.01;

    var render = function (t) {
        requestAnimationFrame(function () {
            render(t + speed);
        });
        waves.renderer.render(waves.scene, waves.camera);
        waves.animate(t);
    };

    console.log('Waves loaded');

    render(0);

});

