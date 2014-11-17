/*jslint */
/*global define, requestAnimationFrame */

define([
    'three'
], function(
    three
) {

    var sea = {};

    sea.createPoints = function (
        width,
        depth,
        size
    ) {

        var x, z, points;

        size = (size || 10);

        points = {
            width: width,
            depth: depth,
            p: []
        };

        for (x = 0; x < width; x += 1) {
            points.p[x] = [];
            for (z = 0; z < depth; z += 1) {
                points.p[x][z] = new three.Vector3(
                    x * size,
                    Math.random() * 80,
                    z * size
                );
            }
        }

        return points;
    };

    sea.createGeometry = function (width, depth, size) {

        var geometry, points, x, z, triangles, t;

        points = sea.createPoints(width, depth, size);

        triangles = [];

        var p1, p2, p3;
        // Don't want to iterate over last row/column
        // Also ordering of points is important
        for (x = 0; x < (points.width -1); x += 1) {
            for (z = 0; z < (points.depth -1); z += 1) {
                p1 = x + ( z      * points.depth);
                p2 = x + ( z      * points.depth) + 1;
                p3 = x + ((z + 1) * points.depth);
                triangles.push(new three.Face3(p1, p2, p3));

                p1 = x + ( z      * points.depth) + 1;
                p2 = x + ((z + 1) * points.depth) + 1;
                p3 = x + ((z + 1) * points.depth);
                triangles.push(new three.Face3(p1, p2, p3));
            }
        }

        geometry = new three.Geometry();

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

    sea.createSea = function (width, depth, size, smooth) {
        var geometry, material, mesh;
        geometry = sea.createGeometry(width, depth, size);

        // create per face shadows
        geometry.computeFaceNormals();
        // smooth shadows
        if (smooth) {
            geometry.computeVertexNormals();
        }

        material = new three.MeshLambertMaterial({color: 0x09BDE6});
        mesh = new three.Mesh(geometry, material);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        return mesh;
    };

    return sea;

});
