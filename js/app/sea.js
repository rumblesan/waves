/*global define, requestAnimationFrame */

define([
    'three'
], function(
    Three
) {

    var Sea = {};

    Sea.createPoints = function (
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
                points.p[x][z] = new Three.Vector3(
                    x * size,
                    Math.random() * 80,
                    z * size
                );
            }
        }

        return points;
    };

    Sea.createGeometry = function (width, depth, size) {

        var geometry, points, x, z, triangles, t;

        points = Sea.createPoints(width, depth, size);

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

    Sea.createSea = function (width, depth, size, smooth) {
        var sea = {};

        sea.geometry = Sea.createGeometry(width, depth, size);

        // create per face shadows
        sea.geometry.computeFaceNormals();
        // smooth shadows
        if (smooth) {
            sea.geometry.computeVertexNormals();
        }

        sea.material = new Three.MeshLambertMaterial({color: 0x09BDE6});
        sea.mesh = new Three.Mesh(sea.geometry, sea.material);
        sea.mesh.castShadow = true;
        sea.mesh.receiveShadow = true;
        return sea;
    };

    return Sea;

});
