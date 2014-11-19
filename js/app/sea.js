/*global define, requestAnimationFrame */

define([
    'three',
    'app/terrain'
], function(
    Three,
    Terrain
) {

    var Sea = {};

    Sea.createPoints = function (
        width,
        depth,
        height,
        size
    ) {

        var x, z, points, offsetX, offsetZ;

        size = (size || 10);

        points = {
            width: width,
            depth: depth,
            p: []
        };

        for (x = 0; x < width; x += 1) {
            points.p[x] = [];
            for (z = 0; z < depth; z += 1) {
                offsetX = (Math.random() - 0.5) * 0.4;
                offsetZ = (Math.random() - 0.5) * 0.4;
                points.p[x][z] = new Three.Vector3(
                    (x + offsetX) * size,
                    Math.random() * height,
                    (z + offsetZ) * size
                );
            }
        }

        return points;
    };


    Sea.animate = function (sea, privateState) {

        var sin, calcVal;

        sin = Math.sin;

        calcVal = function(t, x, z) {
            var xR, zR;
            xR = x * privateState.waveXSeed;
            zR = z * privateState.waveZSeed;
            return (
                    (sin(t +  xR         + privateState.waveXSeed) +
                     sin(t + (1.7  * xR) - privateState.waveXSeed) +
                     sin(t + (0.19 * xR) + privateState.waveXSeed) +
                     sin(t +  zR         + privateState.waveZSeed) +
                     sin(t + (0.8  * zR) - privateState.waveZSeed) +
                     sin(t + (0.35 * zR) + privateState.waveZSeed)
                    ) / 6) * privateState.height;
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

    Sea.createSea = function (width, depth, size, height, smooth) {

        var sea, privateState, seaColour;

        sea = {};
        privateState = {
            width: width,
            depth: depth,
            height: height,
            waveXSeed: Math.random() + 0.4,
            waveZSeed: Math.random() + 0.4
        };

        sea.points = Sea.createPoints(width, depth, size, height);

        sea.geometry = Terrain.createGeometry(sea.points);

        // create per face shadows
        sea.geometry.computeFaceNormals();
        // smooth shadows
        if (smooth) {
            sea.geometry.computeVertexNormals();
        }

        seaColour = 0x09BDE6;

        sea.material = new Three.MeshPhongMaterial(
            {
                ambient: 0x030308,
                color: seaColour,
                specular: 0x009999,
                shininess: 20,
                shading: Three.FlatShading
            }
        );

        sea.mesh = new Three.Mesh(sea.geometry, sea.material);
        sea.mesh.castShadow = true;
        sea.mesh.receiveShadow = true;

        sea.animate = Sea.animate(sea, privateState);

        return sea;
    };

    return Sea;

});
