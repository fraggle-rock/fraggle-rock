const THREE = require('three');
const objectBuilder = require('./objectBuilder');

const buildLevelOne = function buildLevelOne() {
  const scene = this.buildBlankLevelOne();
  let mesh;

  var asynchAddMesh = function (mesh) {
    scene.add(mesh);
  };

  //Side Panels
  mesh = objectBuilder.sidePanel(
    {width: 50, height: 1, depth: 6},
    {x: 0, y: -25, z: -48},
    {x: 0, y: 0, z: 0, w: 0 });
  scene.add(mesh);

  mesh = objectBuilder.sidePanel(
    {width: 50, height: 1, depth: 6},
    {x: 0, y: -25, z: 48},
    {x: 0, y: 0, z: 0, w: 0 }
  );
  scene.add(mesh);

  //Score Board
  mesh = objectBuilder.scoreBoardPole(
    { radiusTop: .1, radiusBottom: .1, height: 10, radiusSegments: 10, heightSegments: 10, openEnded: true },
    {x: -44.5, y: 2.8, z: -2}
  );
  scene.add(mesh);

  mesh = objectBuilder.scoreBoardPole(
    { radiusTop: .1, radiusBottom: .1, height: 10, radiusSegments: 10, heightSegments: 10, openEnded: true },
    {x: -44.5, y: 2.8, z: 2}
  );
  scene.add(mesh);

  mesh = objectBuilder.scoreBoard(
    {width: 1, height: 4, depth: 9},
    {x: -44.3, y: 7.5, z: 0}
  );
  scene.add(mesh);

  mesh = objectBuilder.text(
    asynchAddMesh,
    'Arial_Regular.json',
    'Score',
    'blue',
    {size: 1.3, height: .06, curveSegments: 3},
    {x: -43.7, y: 6.3, z: 2.9}
  );

  //FLOOR BUILDER
  const addGrassBlock = function addGrassBlock(x, y, z, width, height, depth) {
    depth = depth || width;
    height = height || width;

    let mesh = objectBuilder.grassFloor({width: width, height: height, depth: depth},
      {x: x, y: y, z: z});
    scene.add(mesh);
  };
  const addRockBlock = function addRockBlock(x, y, z, width, height, depth) {
    depth = depth || width;
    height = height || width;

    let mesh = objectBuilder.rockFloor({width: width, height: height, depth: depth},
      {x: x, y: y, z: z});
    scene.add(mesh);
  };
  const addRockCenter = function addRockCenter(width, height, depth, x, y, z) {
    let mesh = objectBuilder.rockFloor({width: width, height: height, depth: depth},
      {x: x, y: y, z: z});
    scene.add(mesh);
  };


  // buildFloor(A, B, y, width, height, depth) builds square grass floor of A by A with a rock center of B by B, at y height.
    // Blocks will be width x height x depth;
  const buildFloor = function buildFloor(A, B, fx, fy, fz, width, height, depth) {
    let block = addGrassBlock;

    depth = depth || width;
    height = height || 6;

    if (A <= B) {
      addRockCenter(B * width, height, B * depth, fx, fy, fz);
      return;
    }

    for (let x = 0; x < A + 1; x++) {
      block((-A / 2 + x) * width + fx, fy, -A * depth / 2 + fz, width, height, depth);
    }
    for (let z = 1; z < A + 1; z++) {
      block(A * width / 2 + fx, fy, (-A / 2 + z) * depth + fz, width, height, depth)
    }
    for (let x = 1; x < A + 1; x++) {
      block((A / 2 - x) * width + fx, fy, A * depth / 2 + fz, width, height, depth);
    }
    for (let z = 1; z < A; z++) {
      block(-A * width / 2 + fx, fy, (A / 2 - z) * depth + fz, width, height, depth)
    }

    if (A >= 2) {
      buildFloor(A-2, B, fx, fy, fz, width, height, depth);
    }
  }

  buildFloor(10, 5, 0, -5, 0, 4, 6, 4);
  buildFloor(4, 3, 50, 10, 50, 4, 6, 4);
  buildFloor(4, 3, -50, 10, -50, 4, 6, 4);
  buildFloor(6, 3, 50, -10, -50, 4, 6, 4);
  buildFloor(6, 3, -50, -10, 50, 4, 6, 4);


  //RANDOM SHAPE GENERATOR
  const random = function random(low, high) {
    return Math.floor(Math.random()*(high - low + 1)) + low;
  }

  for (var i = 0; i < 2; i++) {
    const types = ['metalCrate', 'questionCrate', 'woodCrate', 'ancientCrate'];
    const size = random(3, 5);
    const x = random(-20, 20);
    const y = random(15, 35);
    const z = random(-20, 20);
    const type = random(0, types.length - 1);
    mesh = objectBuilder[types[type]]({width: size, height: size, depth: size}, {x, y, z});
    scene.add(mesh);
  }

  for (var i = 0; i < 4; i++) {
    const types = ['metalCrate', 'questionCrate', 'woodCrate', 'ancientCrate'];
    const size = random(4, 6);
    const x = random(-48, -52);
    const y = random(0, 45);
    const z = random(48, 52);
    const type = random(0, types.length - 1);
    mesh = objectBuilder[types[type]]({width: size, height: size, depth: size}, {x, y, z});
    scene.add(mesh);
  }

  for (var i = 0; i < 4; i++) {
    const types = ['metalCrate', 'questionCrate', 'woodCrate', 'ancientCrate'];
    const size = random(4, 6);
    const x = random(48, 52);
    const y = random(0, 45);
    const z = random(-48, -52);
    const type = random(0, types.length - 1);
    mesh = objectBuilder[types[type]]({width: size, height: size, depth: size}, {x, y, z});
    scene.add(mesh);
  }
  return scene;
}

const buildBlankLevelOne = function buildBlankLevelOne() {
  const scene = new THREE.Scene();
  scene.add(new THREE.AmbientLight(0x111111));

  // Sunlight
  let sunlight = new THREE.DirectionalLight();
  sunlight.position.set(60, 60, 78);
  sunlight.intensity = 1.9;
  sunlight.castShadow = true;
  // sunlight.shadow.mapSize.Width = sunlight.shadow.mapSize.Height = 2048;
  sunlight.shadow.mapSize.x = sunlight.shadow.mapSize.y = 2048;
  sunlight.shadow.camera.near = 10;
  sunlight.shadow.camera.far = 400;
  sunlight.shadow.camera.left = -200;
  sunlight.shadow.camera.right = 200;
  sunlight.shadow.camera.top = 200;
  sunlight.shadow.camera.bottom = -200;

  scene.add(sunlight);

  const sky = objectBuilder.sky();
  scene.add(sky);

  return scene;
}

module.exports = function LevelBuilder() {
  this.buildLevelOne = buildLevelOne.bind(this);
  this.buildBlankLevelOne = buildBlankLevelOne.bind(this);
}
