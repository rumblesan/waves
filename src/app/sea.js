import { Vector3, MeshPhongMaterial, Mesh } from 'three';

import { Terrain } from './terrain';

const params = {
  waveJumble: 0.4,
  xWaveFreq1: 1.7,
  xWaveFreq2: 0.19,
  xWaveRand: Math.random() + 0.4,
  zWaveFreq1: 0.8,
  zWaveFreq2: 0.34,
  zWaveRand: Math.random() + 0.4,
};

export function createPoints(width, depth, tileSize) {
  const points = {
    width: width,
    depth: depth,
    p: [],
  };

  let offsetX, offsetZ;
  for (let x = 0; x < width; x += 1) {
    points.p[x] = [];
    for (let z = 0; z < depth; z += 1) {
      offsetX = (Math.random() - 0.5) * params.waveJumble;
      offsetZ = (Math.random() - 0.5) * params.waveJumble;
      points.p[x][z] = new Vector3(
        (x + offsetX) * tileSize,
        0,
        (z + offsetZ) * tileSize
      );
    }
  }

  return points;
}

export function animate(sea, privateState) {
  const waveXSeed = params.xWaveRand;
  const waveZSeed = params.zWaveRand;
  const waveHeight = privateState.waveHeight;

  const sin = Math.sin;

  const calcVal = function(t, x, z) {
    const xR = x * waveXSeed;
    const zR = z * waveZSeed;
    return (
      ((sin(t + xR + waveXSeed) +
        sin(t + params.xWaveFreq1 * xR - waveXSeed) +
        sin(t + params.xWaveFreq2 * xR + waveXSeed) +
        sin(t + zR + waveZSeed) +
        sin(t + params.zWaveFreq1 * zR - waveZSeed) +
        sin(t + params.zWaveFreq2 * zR + waveZSeed)) /
        6) *
      waveHeight
    );
  };

  return function(t) {
    for (let x = 0; x < privateState.width; x += 1) {
      for (let z = 0; z < privateState.depth; z += 1) {
        sea.points.p[x][z].setY(calcVal(t, x, z));
      }
    }
    sea.mesh.geometry.verticesNeedUpdate = true;
    sea.mesh.geometry.normalsNeedUpdate = true;
    sea.mesh.geometry.computeFaceNormals();
  };
}

export function Sea(width, depth, waveHeight, tileSize, smooth) {
  const sea = {};
  const privateState = {
    width: width,
    depth: depth,
    waveHeight: waveHeight,
  };

  sea.points = createPoints(width, depth, tileSize);

  sea.geometry = Terrain(sea.points);

  // create per face shadows
  sea.geometry.computeFaceNormals();
  // smooth shadows
  if (smooth) {
    sea.geometry.computeVertexNormals();
  }

  sea.material = new MeshPhongMaterial({
    //ambient: 0xff0000, TODO what's this changed?
    color: 0x09bde6,
    specular: 0x999966,
    shininess: 12,
    flatShading: true,
  });

  sea.mesh = new Mesh(sea.geometry, sea.material);
  sea.mesh.castShadow = true;
  sea.mesh.receiveShadow = true;

  sea.animate = animate(sea, privateState);

  return sea;
}
