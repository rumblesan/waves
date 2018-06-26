import { Face3, Geometry } from 'three';

export function Terrain(points) {
  const triangles = [];

  let p1, p2, p3;
  // Don't want to iterate over last row/column
  // Also ordering of points is important
  for (let x = 0; x < points.width - 1; x += 1) {
    for (let z = 0; z < points.depth - 1; z += 1) {
      p1 = z + x * points.depth;
      p2 = z + x * points.depth + 1;
      p3 = z + (x + 1) * points.depth;
      triangles.push(new Face3(p1, p2, p3));

      p1 = z + x * points.depth + 1;
      p2 = z + (x + 1) * points.depth + 1;
      p3 = z + (x + 1) * points.depth;
      triangles.push(new Face3(p1, p2, p3));
    }
  }

  const geometry = new Geometry();

  for (let x = 0; x < points.width; x += 1) {
    for (let z = 0; z < points.depth; z += 1) {
      geometry.vertices.push(points.p[x][z]);
    }
  }

  for (let t = 0; t < triangles.length; t += 1) {
    geometry.faces.push(triangles[t]);
  }

  geometry.computeBoundingSphere();

  return geometry;
}
