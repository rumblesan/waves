/*global define */

define([
    'three'
], function(
    Three
) {

    var Terrain = {};

    Terrain.createGeometry = function (points) {

        var geometry, x, z, triangles, t;

        triangles = [];

        var p1, p2, p3;
        // Don't want to iterate over last row/column
        // Also ordering of points is important
        for (x = 0; x < (points.width -1); x += 1) {
            for (z = 0; z < (points.depth -1); z += 1) {
                p1 = z + ( x      * points.depth);
                p2 = z + ( x      * points.depth) + 1;
                p3 = z + ((x + 1) * points.depth);
                triangles.push(new Three.Face3(p1, p2, p3));

                p1 = z + ( x      * points.depth) + 1;
                p2 = z + ((x + 1) * points.depth) + 1;
                p3 = z + ((x + 1) * points.depth);
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

    return Terrain;

});

