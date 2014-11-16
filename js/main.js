/*jslint browser: true */
/*global requirejs, require */

requirejs.config({
    paths: {
        three: 'lib/three.min'
    },
    shim: {
        three: {
            deps: [],
            exports: 'THREE'
        }
    }
});

require([
    'three',
    'app/app'
], function(
    three,
    app
) {
    app(window, document, three);
});

