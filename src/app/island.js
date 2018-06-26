import { Vector3, MeshLambertMaterial, Mesh } from 'three';

import perlin from '../lib/perlin';
import { Terrain } from './terrain';

export function createPoints(
  width,
  depth,
  terrainHeight,
  cliffHeight,
  tileSize
) {
  perlin.seed(Math.random());

  const points = {
    width: width,
    depth: depth,
    p: [],
  };

  let offsetX, offsetZ, h, n;
  for (let x = 0; x < width; x += 1) {
    points.p[x] = [];
    for (let z = 0; z < depth; z += 1) {
      if (x === 0 || x === width - 1 || z === 0 || z === depth - 1) {
        h = 1;
        offsetX = 0;
        offsetZ = 0;
      } else {
        n = Math.abs(perlin.simplex2(x / 10, z / 10));
        h = n * terrainHeight + cliffHeight;
        offsetX = (Math.random() - 0.5) * 0.4;
        offsetZ = (Math.random() - 0.5) * 0.4;
      }
      points.p[x][z] = new Vector3(
        (x + offsetX) * tileSize,
        h,
        (z + offsetZ) * tileSize
      );
    }
  }

  return points;
}

// cliffHeight is the hight of the cliffs at the edge of the island
// terrainHeight is the high of hills on the island
// max island height is terrainHeight + cliffHeight
export function Island(
  width,
  depth,
  terrainHeight,
  cliffHeight,
  tileSize,
  smooth
) {
  const island = {};

  island.points = createPoints(
    width,
    depth,
    terrainHeight,
    cliffHeight,
    tileSize
  );

  island.geometry = Terrain(island.points);

  // create per face shadows
  island.geometry.computeFaceNormals();
  // smooth shadows
  if (smooth) {
    island.geometry.computeVertexNormals();
  }

  island.material = new MeshLambertMaterial({ color: 0xcc8706 });

  island.mesh = new Mesh(island.geometry, island.material);
  island.mesh.castShadow = true;
  island.mesh.receiveShadow = true;

  return island;
}
