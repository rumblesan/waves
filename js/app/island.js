/*global define */

define([
    'three',
    'perlin',
    'app/terrain'
], function(
    Three,
    perlin,
    Terrain
) {

    var Island = {};

    Island.createPoints = function(
        width, depth, height, cliffHeight, size
    ) {
        var x, z, points, offsetX, offsetZ, h;

        perlin.seed(Math.random());

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
                h = (perlin.simplex2(x, z) * height) + cliffHeight;

                if (x === 0 || x === (width - 1) || z === 0 || z === (depth - 1)) {
                    h = 0;
                }
                points.p[x][z] = new Three.Vector3(
                    (x + offsetX) * size,
                    h,
                    (z + offsetZ) * size
                );
            }
        }

        return points;
    };


    Island.create = function (width, depth, height, cliffHeight, size, smooth) {

        var island = {};

        island.points = Island.createPoints(
            width, depth, height, cliffHeight, size
        );

        island.geometry = Terrain.createGeometry(island.points);

        console.log(island.geometry);
        // create per face shadows
        island.geometry.computeFaceNormals();
        // smooth shadows
        if (smooth) {
            island.geometry.computeVertexNormals();
        }

        island.material = new Three.MeshLambertMaterial({color: 0xCC8706});

        island.mesh = new Three.Mesh(island.geometry, island.material);
        island.mesh.castShadow = true;
        island.mesh.receiveShadow = true;

        return island;
    };

    return Island;

});

