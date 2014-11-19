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
        waveHeight,
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
                offsetX = (Math.random() - 0.5) * 0.4;
                offsetZ = (Math.random() - 0.5) * 0.4;
                points.p[x][z] = new Three.Vector3(
                    (x + offsetX) * tileSize,
                    Math.random() * waveHeight,
                    (z + offsetZ) * tileSize
                );
            }
        }

        return points;
    };


    Sea.animate = function (sea, privateState) {

        var sin, calcVal, waveXSeed, waveZSeed, waveHeight;

        waveXSeed  = privateState.waveXSeed;
        waveZSeed  = privateState.waveZSeed;
        waveHeight = privateState.waveHeight;

        sin = Math.sin;

        calcVal = function(t, x, z) {
            var xR, zR;
            xR = x * waveXSeed;
            zR = z * waveZSeed;
            return (
                    (sin(t +  xR         + waveXSeed) +
                     sin(t + (1.7  * xR) - waveXSeed) +
                     sin(t + (0.19 * xR) + waveXSeed) +
                     sin(t +  zR         + waveZSeed) +
                     sin(t + (0.8  * zR) - waveZSeed) +
                     sin(t + (0.35 * zR) + waveZSeed)
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
            waveHeight: waveHeight,
            waveXSeed: Math.random() + 0.4,
            waveZSeed: Math.random() + 0.4
        };

        sea.points = Sea.createPoints(width, depth, waveHeight, tileSize);

        sea.geometry = Terrain.createGeometry(sea.points);

        // create per face shadows
        sea.geometry.computeFaceNormals();
        // smooth shadows
        if (smooth) {
            sea.geometry.computeVertexNormals();
        }

        sea.material = new Three.MeshPhongMaterial(
            {
                ambient: 0x030308,
                color: 0x09BDE6,
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
