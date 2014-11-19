/*global define */

define([
    'three',
    'perlin'
], function(
    Three,
    perlin
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

    Island.createGeometry = function (points) {

        var geometry, x, z, triangles, t;

        triangles = [];

        var p1, p2, p3;
        // Don't want to iterate over last row/column
        // Also ordering of points is important
        for (x = 0; x < (points.width -1); x += 1) {
            for (z = 0; z < (points.depth -1); z += 1) {
                p1 = x + ( z      * points.depth);
                p2 = x + ( z      * points.depth) + 1;
                p3 = x + ((z + 1) * points.depth);
                triangles.push(new Three.Face3(p1, p2, p3));

                p1 = x + ( z      * points.depth) + 1;
                p2 = x + ((z + 1) * points.depth) + 1;
                p3 = x + ((z + 1) * points.depth);
                triangles.push(new Three.Face3(p1, p2, p3));
            }
        }

        geometry = new Three.Geometry();

        for (x = 0; x < points.width; x += 1) {
            for (z = 0; z < points.depth; z += 1) {
                geometry.vertices.push(points.p[x][z]);
            }
        }

        for (t = 0; t < triangles.length; t += 1) {
            geometry.faces.push(triangles[t]);
        }

        geometry.computeBoundingSphere();

        return geometry;

    };

    Island.create = function (width, depth, height, cliffHeight, size, smooth) {

        var island = {};

        island.points = Island.createPoints(
            width, depth, height, cliffHeight, size
        );

        island.geometry = Island.createGeometry(island.points);

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

