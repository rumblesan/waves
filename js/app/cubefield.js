/*jslint */
/*global define, requestAnimationFrame */

define([], function() {

    var cubeField = {};

    cubeField.create = function (three, width, depth) {
        var w, h, cubes, c, size, spacing;

        size = 30;
        spacing = size * 1.5;
        cubes = [];
        for (w = 0; w < width; w += 1) {
            for (h = 0; h < depth; h += 1) {
                c = new three.Mesh(
                    new three.BoxGeometry(size, size, size),
                    new three.MeshLambertMaterial({color: 0xff0000})
                );
                c.position.x = (w * spacing);
                c.position.z = (h * spacing);
                cubes.push(c);
            }
        }
        return cubes;
    };

    return cubeField;
});

