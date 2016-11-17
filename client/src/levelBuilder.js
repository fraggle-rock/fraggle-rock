const THREE = require('three');
const objectBuilder = require('./objectBuilder');

const buildLevelOne = function buildLevelOne() {
  const scene = this.buildBlankLevelOne();
  let mesh;

  var asynchAddMesh = function (mesh) {
    scene.add(mesh);
  };

  //FLOOR
  // let mesh = objectBuilder.grassFloor({width: 40, height: 4, depth: 40}, {x: 0, y: -2.5, z: 0});
  // scene.add(mesh);

  //Side Panels
  mesh = objectBuilder.sidePanel(
    {width: 50, height: 1, depth: 3},
    {x: 0, y: .5, z: -48},
    {x: 0, y: 0, z: 0, w: 0 });
  scene.add(mesh);

  mesh = objectBuilder.sidePanel(
    {width: 50, height: 1, depth: 3},
    {x: 0, y: .5, z: 48},
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
  const addGrassBlock = function addGrassBlock(x, z) {
    let mesh = objectBuilder.grassFloor({width:4, height: 4, depth: 4},
      {x: x, y: -5, z: z});
    scene.add(mesh);
  };
  const addRockBlock = function addRockBlock(x, z) {
    let mesh = objectBuilder.rockFloor({width:4, height: 4, depth: 4},
      {x: x, y: -5, z: z});
    scene.add(mesh);
  };

  const buildFloor = function buildFloor(n) {
    let block;
    if (n < 5) {
      block = addRockBlock;
    } else {
      block = addGrassBlock;
    }
    for (let x = 0; x < n + 1; x++) {
      block((-n / 2 + x) * 4, -n * 2);
    }
    for (let z = 1; z < n + 1; z++) {
      block(n * 2, (-n / 2 + z) * 4)
    }
    for (let x = 1; x < n + 1; x++) {
      block((n / 2 - x) * 4, n * 2);
    }
    for (let z = 1; z < n; z++) {
      block(-n * 2, (n / 2 - z) * 4)
    }
    if (n >= 2) {
      buildFloor(n-2);
    }
  }

  buildFloor(20);


  //RANDOM SHAPE GENERATOR
  const random = function random(low, high) {
    return Math.floor(Math.random()*(high - low + 1)) + low;
  }

  for (var i = 0; i < 12; i++) {
    const types = ['metalCrate', 'questionCrate', 'woodCrate', 'ancientCrate'];
    const size = random(4, 6);
    const x = random(-40, 40);
    const y = random(15, 25);
    const z = random(-40, 40);
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
  sunlight.position.set(30, 30, 39);
  sunlight.intensity = 1.9;
  sunlight.castShadow = true;
  // sunlight.shadow.mapSize.Width = sunlight.shadow.mapSize.Height = 2048;
  sunlight.shadow.mapSize.x = sunlight.shadow.mapSize.y = 2048;
  sunlight.shadow.camera.near = 10;
  sunlight.shadow.camera.far = 400;
  sunlight.shadow.camera.left = -80;
  sunlight.shadow.camera.right = 70;
  sunlight.shadow.camera.top = 60;
  sunlight.shadow.camera.bottom = -60;

  scene.add(sunlight);

  const sky = objectBuilder.sky();
  scene.add(sky);

  return scene;
}

module.exports = function LevelBuilder() {
  this.buildLevelOne = buildLevelOne.bind(this);
  this.buildBlankLevelOne = buildBlankLevelOne.bind(this);
}