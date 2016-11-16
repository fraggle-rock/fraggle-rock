'use strict';
const CANNON = require('cannon');
const THREE = require('three');
const config = require('../../config/config.js');
let kill;

const getGuid = function getGuid() {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  return [0, 0, 0, 0].map(() => chars[Math.floor(Math.random() * chars.length)]).join('');
};

module.exports = function Match(deleteMatch) {
  this.guid = getGuid();
  this.clients = {}; // key is client UUID, value is current information about client
  this.clientToCannon = {}; // key is client UUID, value is cannon body
  this.boxes = [];
  this.balls = [];
  this.world;
  this.loadClientUpdate = loadClientUpdate.bind(this);
  this.loadNewClient = loadNewClient.bind(this);
  this.loadFullScene = loadFullScene.bind(this);
  this.startPhysics = startPhysics.bind(this);
  this.shootBall = shootBall.bind(this);
  this.shutdown = shutdown.bind(this);
  this.physicsClock;
  this.physicsTick = config.physicsTick;
  this.updatesSinceLastEmit = config.physicsEmitRatio - 1;
  this.killFloor = killFloor.bind(this);
  kill = function() {deleteMatch(this.guid)}.bind(this);
  this.timeoutDelay = config.serverTimeout;
  this.timeout = setTimeout(kill, this.timeoutDelay);
};

const loadClientUpdate = function loadClientUpdate(clientPosition) {
  clearTimeout(this.timeout);
  clientPosition = JSON.parse(clientPosition);
  const localClient = this.clients[clientPosition.uuid];
  localClient.up = clientPosition.up;
  localClient.left = clientPosition.left;
  localClient.right = clientPosition.right;
  localClient.down = clientPosition.down;
  localClient.direction = clientPosition.direction;
  localClient.jump = clientPosition.jump;
  this.timeout = setTimeout(kill, this.timeoutDelay);
};

const startPhysics = function startPhysics(io) {
  const context = this;
  const roundToDec = function round(num, decimals) {
    decimals = decimals || 3;
    const mult = Math.pow(10, decimals);
    return Math.round(num * mult) / mult;
  }
  const roundPosition = function roundPosition (position, decimals) {
    const newPosition = {};
    newPosition.x = roundToDec(position.x, decimals);
    newPosition.y = roundToDec(position.y, decimals);
    newPosition.z = roundToDec(position.z, decimals);
    return newPosition;
  };
  const roundQuaternion = function roundQuaternion (quaternion, decimals) {
    const newQuaternion = {};
    newQuaternion.w = roundToDec(quaternion.w, decimals);
    newQuaternion.x = roundToDec(quaternion.x, decimals);
    newQuaternion.y = roundToDec(quaternion.y, decimals);
    newQuaternion.z = roundToDec(quaternion.z, decimals);
    return newQuaternion;
  };
  const physicsEmit = function physicsEmit () {
    const balls = [];
    const boxes = [];
    context.balls.forEach(function(ball) {
      balls.push({uuid: ball.id, position: roundPosition(ball.position), quaternion: roundQuaternion(ball.quaternion), mass: ball.mass})
    })
    context.boxes.forEach(function(box) {
      boxes.push({uuid: box.uuid, position: roundPosition(box.position), quaternion: roundQuaternion(box.quaternion), geometry: box.userData.geometry, type: box.userData.shapeType, mass: box.mass})
    })
    io.to(context.guid).emit('physicsUpdate', JSON.stringify({boxMeshes: boxes, ballMeshes: balls, players: context.clients}))
  };

  this.physicsClock = setInterval(function() {
    let expiredBoxes = [];
    const expiredBallIndices = [];
    for (var key in context.clients) {
      const client = context.clients[key];
      const clientBody = context.clientToCannon[client.uuid];
      const currVelocity = clientBody.velocity;
      const movePerTick = config.playerMovePerTick;
      if (clientBody.position.y < config.playerYReset) {
        clientBody.position.set(0,10,0);
        clientBody.velocity.set(0,0,0);
        continue;
      }
      if (client.up) {
        clientBody.velocity.set(currVelocity.x + movePerTick * client.direction.x, currVelocity.y, currVelocity.z + movePerTick * client.direction.z);
      }
      if (client.down) {
        clientBody.velocity.set(currVelocity.x - movePerTick * client.direction.x, currVelocity.y, currVelocity.z - movePerTick * client.direction.z);
      }
      if (client.right) {
        clientBody.velocity.set(currVelocity.x - movePerTick * client.direction.z, currVelocity.y, currVelocity.z + movePerTick * client.direction.x);
      }
      if (client.left) {
        clientBody.velocity.set(currVelocity.x + movePerTick * client.direction.z, currVelocity.y, currVelocity.z - movePerTick * client.direction.x);
      }
      if (client.jump) {
          clientBody.velocity.set(currVelocity.x, currVelocity.y + config.jumpVelocity, currVelocity.z);
          client.jump = false;
      }
    }
    context.world.step(context.physicsTick/1000);

    // Update ball positions
    for(var i=0; i<context.balls.length; i++){
      const ball = context.balls[i];

      if (Math.abs(ball.position.x) > config.physicsBounds || Math.abs(ball.position.y) > config.physicsBounds || Math.abs(ball.position.z) > config.physicsBounds) {
        expiredBallIndices.push(i);
      }
    }
    if (expiredBallIndices.length > 0) {
      console.log('Deleted out of bounds ball!');
      let offset = 0;
      expiredBallIndices.forEach(function(index) {
        context.balls.splice(index - offset, 1);
        offset--;
      });
    }

    // Get a list of boxes outside bounds
    for(var i=0; i<context.boxes.length; i++){
      const box = context.boxes[i];

      if (Math.abs(box.position.x) > 200 || Math.abs(box.position.y) > 200 || Math.abs(box.position.z) > 200) {
        if (box.userData.shapeType === 'grassFloor') {
          //do not replace fallen floor tiles
          context.world.remove(box);
        } else {
          expiredBoxes.push(box);
        }
      }
    }
    // Replace boxes randomly above the field if they fall off
    if (expiredBoxes.length > 0) {
      console.log('Deleted out of bounds box!');
      expiredBoxes.forEach(function(box, index) {
        box.position.set((Math.random() - Math.random()) * 30, 30 + Math.random() * 10, (Math.random() - Math.random()) * 30);
        box.velocity.set(0, 0, 0);
        box.mass = 1;
        box.updateMassProperties()
      });
      expiredBoxes = [];
    }
    if (context.updatesSinceLastEmit === config.physicsEmitRatio - 1) {
      physicsEmit();
      context.updatesSinceLastEmit = 0;
    } else {
      context.updatesSinceLastEmit++;;
    }
  }, this.physicsTick)



};

const shootBall = function shootBall(camera) {
  let x = camera.position.x;
  let y = camera.position.y;
  let z = camera.position.z;

  const ballBody = new CANNON.Body({ mass: config.ballMass });
  const ballShape = new CANNON.Sphere(config.ballRadius);
  ballBody.addShape(ballShape);
  this.world.add(ballBody);
  this.balls.push(ballBody);

  const shootDirection = camera.direction;
  ballBody.velocity.set(shootDirection.x * config.ballVelocity, shootDirection.y * config.ballVelocity, shootDirection.z * config.ballVelocity);
  x += shootDirection.x;
  y += shootDirection.y;
  z += shootDirection.z;
  ballBody.position.set(x,y,z);
};

const loadNewClient = function loadNewClient(player) {
  const x = player.position.x;
  const y = player.position.y;
  const z = player.position.z;
  const ballBody = new CANNON.Body({ mass: config.playerModelMass });
  const ballShape = new CANNON.Sphere(config.playerModelRadius);
  ballBody.position.x = x;
  ballBody.position.y = y;
  ballBody.position.z = z;
  ballBody.addShape(ballShape);
  this.clientToCannon[player.object.uuid] = ballBody;
  this.clients[player.object.uuid] = {uuid: player.object.uuid, position: ballBody.position, direction: player.direction, up: false, left: false, right: false, down: false};
  this.world.add(ballBody);
};

const loadFullScene = function loadFullScene(scene, player) {
  // Setup our world
  const context = this;
  let world = new CANNON.World();
  world.quatNormalizeSkip = 0;
  world.quatNormalizeFast = false;

  const solver = new CANNON.GSSolver();

  world.defaultContactMaterial.contactEquationStiffness = 1e9;
  world.defaultContactMaterial.contactEquationRelaxation = 4;

  solver.iterations = 2;
  solver.tolerance = 0.5;
  world.solver = new CANNON.SplitSolver(solver);

  world.gravity.set(0, config.gravity, 0);
  world.broadphase = new CANNON.NaiveBroadphase();

  // Create a slippery material (friction coefficient = 0.0)
  const physicsMaterial = new CANNON.Material("slipperyMaterial");
  const physicsContactMaterial = new CANNON.ContactMaterial(physicsMaterial, physicsMaterial, 0.0, 0.3);
  // We must add the contact materials to the world
  world.addContactMaterial(physicsContactMaterial);

  // Loop through objects in scene and create copy in CANNON world
  scene.object.children.forEach(function(mesh) {
    if (!mesh.userData || mesh.userData.mass === undefined || mesh.userData.mass < 0) {
      return;
    }
    let meshGeometry;
    scene.geometries.forEach(function(geometry) {
      if (geometry.uuid === mesh.geometry) {
        meshGeometry = geometry;
      }
    });
    if (meshGeometry && meshGeometry.type === 'BoxGeometry') {
      let position = new THREE.Vector3();
      let quaternion = new THREE.Quaternion();
      let matrix = new THREE.Matrix4();
      matrix.fromArray(mesh.matrix);
      position.setFromMatrixPosition(matrix);
      quaternion.fromArray(mesh.matrix);
      const width = meshGeometry.width;
      const height = meshGeometry.height;
      const depth = meshGeometry.depth;
      const cannonPosition = new CANNON.Vec3(position.x, position.y, position.z);
      const cannonQuat = new CANNON.Quaternion(quaternion.x, quaternion.y, quaternion.z, quaternion.w);
      let cannonSize;
      if (mesh.userData.name === 'grassFloor') {
        cannonSize = new CANNON.Vec3(width / 2 - .065, height / 2 + .065, depth / 2 - .065);
      } else {
        cannonSize = new CANNON.Vec3(width / 2 + .065, height / 2 + .065, depth / 2 + .065);
      }
      const cannonBox = new CANNON.Box(cannonSize);
      const cannonBody = new CANNON.Body({mass: mesh.userData.mass});
      cannonBody.addShape(cannonBox);
      cannonBody.position = cannonPosition;
      cannonBody.quaternion = cannonQuat;
      cannonBody.linearDamping = 0.01;
      cannonBody.angularDamping = 0.01;
      cannonBody.uuid = mesh.uuid;
      cannonBody.userData = {shapeType: mesh.userData.name, geometry: {width, height, depth}};

      context.boxes.push(cannonBody);
      world.add(cannonBody);
    }
  });
  this.world = world;
  this.loadNewClient(player);
};

// Remove floor tiles periodically
const killFloor = function killFloor() {
  let killFloorTick = 500;
  let floorTiles = [];
  let spacer = 76;

  setTimeout(() => {
    this.world.bodies.forEach((ele) => {
      if(ele.userData && ele.userData.shapeType && ele.userData.shapeType === 'grassFloor') {
        floorTiles.push(ele);
      }
    });

    this.killFloorInterval = setInterval(() => {
      if (floorTiles.length === 0) {
        clearInterval(this.killFloorInterval);
      }
      if (floorTiles.length < spacer * 2) {
        spacer /= 2;
      }
      let randIndex = Math.floor(Math.random() * spacer);
      let tile = floorTiles[randIndex];
      if (floorTiles[randIndex]) {
        tile.mass = 1000;
        tile.updateMassProperties()
        tile.type = 1;
        tile.velocity.y = 50;
        floorTiles.splice(randIndex, 1)
      }
    }.bind(this), killFloorTick);
  }, 5000);
}

const shutdown = function shutdown() {
  clearTimeout(this.timeout);
  clearInterval(this.physicsClock);
  clearInterval(this.physicsEmitClock);
  clearInterval(this.killFloorInterval);
};
