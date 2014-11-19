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
        width,
        depth,
        terrainHeight,
        cliffHeight,
        tileSize
    ) {
        var x, z, points, offsetX, offsetZ, h, n;

        perlin.seed(Math.random());

        points = {
            width: width,
            depth: depth,
            p: []
        };

        for (x = 0; x < width; x += 1) {
            points.p[x] = [];
            for (z = 0; z < depth; z += 1) {
                if (x === 0 || x === (width - 1) || z === 0 || z === (depth - 1)) {
                    h = 1;
                    offsetX = 0;
                    offsetZ = 0;
                } else {
                    n = Math.abs(perlin.simplex2(x/10, z/10));
                    h = (
                        n * terrainHeight
                    ) + cliffHeight;
                    offsetX = (Math.random() - 0.5) * 0.4;
                    offsetZ = (Math.random() - 0.5) * 0.4;
                }
                points.p[x][z] = new Three.Vector3(
                    (x + offsetX) * tileSize,
                    h,
                    (z + offsetZ) * tileSize
                );
            }
        }

        return points;
    };


    // cliffHeight is the hight of the cliffs at the edge of the island
    // terrainHeight is the high of hills on the island
    // max island height is terrainHeight + cliffHeight
    Island.create = function (width, depth, terrainHeight, cliffHeight, tileSize, smooth) {

        var island = {};

        island.points = Island.createPoints(
            width, depth, terrainHeight, cliffHeight, tileSize
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

