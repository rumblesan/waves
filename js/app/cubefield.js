/*jslint */
/*global define, requestAnimationFrame */

define([], function() {

    var cubeField = {};

    cubeField.create = function (three, width, depth) {
        var w, h, cubes, c, spacing;

        spacing = 30;
        cubes = [];
        for (w = 0; w < width; w += 1) {
            for (h = 0; h < depth; h += 1) {
                c = new three.Mesh(
                    new three.BoxGeometry(spacing * 0.8, spacing * 0.8, spacing * 0.8),
                    new three.MeshBasicMaterial({ color: 0x00ff00 })
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

