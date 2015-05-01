
var Three = require('../lib/three.min');


var Lights = {};

Lights.createDirectional = function (colour, intensity) {

    var directionalLight = new Three.DirectionalLight(
        colour,
        intensity
    );
    directionalLight.position.x = 0;
    directionalLight.position.y = 100;
    directionalLight.position.z = -50;
    directionalLight.castShadow = true;

    return directionalLight;

};

Lights.createAmbient = function (colour) {
    return new Three.AmbientLight(colour);
};

module.exports = Lights;

