/*jslint */
/*global define */

define([
], function(
) {

    var points = {};

    points.grid = function (width, depth, startX, startY) {

        var x, y, out, arr, sx, sy, maxX, maxY;

        sx = (startX || 0);
        sy = (startY || 0);
        maxX = sx + width;
        maxY = sy + width;
        out = [];

        for (x = 0; x < width; x += 1) {
            arr = [];
            for (y = 0; y < depth; y += 1) {
                arr[y] = {
                    x: x + startX,
                    y: y + startY
                };
            }
            out[x] = arr;
        }

        return out;
    };

    return points;

});

