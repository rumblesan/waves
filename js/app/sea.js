/*global requestAnimationFrame */

var Three = require('../lib/three.min');

var Terrain = require('./terrain');


var Sea,
    params;

Sea = {};

params = {
    waveJumble: 0.4,
    xWaveFreq1: 1.7,
    xWaveFreq2: 0.19,
    xWaveRand: Math.random() + 0.4,
    zWaveFreq1: 0.8,
    zWaveFreq2: 0.34,
    zWaveRand: Math.random() + 0.4,
};

Sea.createPoints = function (
    width,
    depth,
    tileSize
) {

    var x, z, points, offsetX, offsetZ;

    points = {
        width: width,
        depth: depth,
        p: []
    };

    for (x = 0; x < width; x += 1) {
        points.p[x] = [];
        for (z = 0; z < depth; z += 1) {
            offsetX = (Math.random() - 0.5) * params.waveJumble;
            offsetZ = (Math.random() - 0.5) * params.waveJumble;
            points.p[x][z] = new Three.Vector3(
                (x + offsetX) * tileSize,
                0,
                (z + offsetZ) * tileSize
            );
        }
    }

    return points;
};


Sea.animate = function (sea, privateState) {

    var sin, calcVal, waveXSeed, waveZSeed, waveHeight;

    waveXSeed  = params.xWaveRand;
    waveZSeed  = params.zWaveRand;
    waveHeight = privateState.waveHeight;

    sin = Math.sin;

    calcVal = function(t, x, z) {
        var xR, zR;
        xR = x * waveXSeed;
        zR = z * waveZSeed;
        return (
                (sin(t +  xR                      + waveXSeed) +
                 sin(t + (params.xWaveFreq1 * xR) - waveXSeed) +
                 sin(t + (params.xWaveFreq2 * xR) + waveXSeed) +
                 sin(t +  zR                      + waveZSeed) +
                 sin(t + (params.zWaveFreq1 * zR) - waveZSeed) +
                 sin(t + (params.zWaveFreq2 * zR) + waveZSeed)
                ) / 6) * waveHeight;
    };

    return function (t) {
        var x, z;
        for (x = 0; x < privateState.width; x += 1) {
            for (z = 0; z < privateState.depth; z += 1) {
                sea.points.p[x][z].setY(calcVal(t,x, z));
            }
        }
        sea.mesh.geometry.verticesNeedUpdate = true;
        sea.mesh.geometry.normalsNeedUpdate = true;
        sea.mesh.geometry.computeFaceNormals();
    };

};

Sea.createSea = function (width, depth, waveHeight, tileSize, smooth) {

    var sea, privateState;

    sea = {};
    privateState = {
        width: width,
        depth: depth,
        waveHeight: waveHeight
    };

    sea.points = Sea.createPoints(width, depth, tileSize);

    sea.geometry = Terrain.createGeometry(sea.points);

    // create per face shadows
    sea.geometry.computeFaceNormals();
    // smooth shadows
    if (smooth) {
        sea.geometry.computeVertexNormals();
    }

    sea.material = new Three.MeshPhongMaterial(
        {
            ambient: 0xff0000,
            color: 0x09BDE6,
            specular: 0x999966,
            shininess: 12,
            shading: Three.FlatShading
        }
    );

    sea.mesh = new Three.Mesh(sea.geometry, sea.material);
    sea.mesh.castShadow = true;
    sea.mesh.receiveShadow = true;

    sea.animate = Sea.animate(sea, privateState);

    return sea;
};

module.exports = Sea;

