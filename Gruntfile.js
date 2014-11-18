/* grunt.js file */

module.exports = function (grunt) {

    'use strict';

    grunt.initConfig({
        jshint: {
            files: ['js/app/**/*.js', 'js/main.js']
        },
        nodeunit: {
            files: ['tests/**/*_test.js']
        },
        connect: {
            server: {
                options: {
                    port: 8000,
                    base: './',
                    keepalive: true,
                    hostname: '*'
                }
            }
        }
    });

    grunt.registerTask('default', 'jshint');
    grunt.registerTask('test',    'nodeunit');

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');

};

