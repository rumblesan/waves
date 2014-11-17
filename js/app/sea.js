/*jslint */
/*global define, requestAnimationFrame */

define([
], function(
) {

    var sea = {};

    sea.createPoints = function (
        three,
        width,
        depth,
        spacing,
        startX,
        startY
    ) {

        var x, y, out, arr, sx, sy, sp, maxX, maxY;

        sx = (startX || 0);
        sy = (startY || 0);
        sp = (spacing || 10);
        maxX = sx + width;
        maxY = sy + width;

        out = {
            width: width,
            depth: depth,
            p: []
        };

        for (x = 0; x < width; x += 1) {
            arr = [];
            for (y = 0; y < depth; y += 1) {
                arr[y] = new three.Vector3(
                    (x + startX) * spacing,
                    (y + startY) * spacing,
                    Math.random() * 5
                );
            }
            out.p[x] = arr;
        }

        return out;
    };

    sea.createSea = function (three) {

        var seaGeometry, points, pX, pY, triangles, t;

        points = sea.createPoints(
            three,
            4, 4,
            10,
            -2, -2
        );

        triangles = [];

        var p1, p2, p3;
        // Don't want to iterate over last row/column
        for (pX = 0; pX < (points.width -1); pX += 1) {
            for (pY = 0; pY < (points.depth -1); pY += 1) {
                p1 = pX + ( pY      * points.depth);
                p2 = pX + ((pY + 1) * points.depth);
                p3 = pX + ( pY      * points.depth) + 1;
                triangles.push(new three.Face3(p1, p2, p3));

                p1 = pX + ( pY      * points.depth) + 1;
                p2 = pX + ((pY + 1) * points.depth);
                p3 = pX + ((pY + 1) * points.depth) + 1;
                triangles.push(new three.Face3(p1, p2, p3));
            }
        }

        seaGeometry = new three.Geometry();

        for (pX = 0; pX < points.width; pX += 1) {
            for (pY = 0; pY < points.depth; pY += 1) {
                seaGeometry.vertices.push(points.p[pX][pY]);
            }
        }

        for (t = 0; t < triangles.length; t += 1) {
            seaGeometry.faces.push(triangles[t]);
        }

        seaGeometry.computeBoundingSphere();

        return seaGeometry;

    };

    return sea;

});
