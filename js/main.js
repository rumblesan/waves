/*jslint browser: true */
/*global requirejs, require */

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
    app
) {
    console.log('App loaded');
    app(window, doc, three);
});

