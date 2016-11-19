const THREE = require('three');
const socket = io();
const sceneUtility = require('./sceneUtility');
const flat = require('../../config/flat');
const lastEmittedClient = {theta: 0};
let canEmit = true;

const addPhysicsUpdateListener = function addPhysicsUpdateListener(socket) {
  socket.on('physicsUpdate', function(meshesObject) {
    sceneUtility.savePhysicsUpdate(meshesObject);
  });
  socket.on('fullPhysicsUpdate', function(meshesObject) {
    sceneUtility.loadPhysicsUpdate(meshesObject);
  });
}

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
  newQuaternion._w = roundToDec(quaternion.w, decimals);
  newQuaternion._x = roundToDec(quaternion.x, decimals);
  newQuaternion._y = roundToDec(quaternion.y, decimals);
  newQuaternion._z = roundToDec(quaternion.z, decimals);
  return newQuaternion;
};
const hasChangedInput = function hasChangedInput(playerInput) {
  let hasChanged = false;
  const isMoving = lastEmittedClient.up || lastEmittedClient.down || lastEmittedClient.left || lastEmittedClient.right;
  const newTheta = Math.atan2(playerInput.direction.z, playerInput.direction.x);
  if (isMoving && Math.abs(newTheta - lastEmittedClient.theta) > .1) {
    hasChanged = true;
  } else if (playerInput.up !== lastEmittedClient.up) {
    hasChanged = true;
  } else if (playerInput.down !== lastEmittedClient.down) {
    hasChanged = true;
  } else if (playerInput.left !== lastEmittedClient.left) {
    hasChanged = true;
  } else if (playerInput.right !== lastEmittedClient.right) {
    hasChanged = true;
  } else if (playerInput.jump === true && playerInput.jump !== lastEmittedClient.jump) {
    hasChanged = true;
  }
  if (hasChanged) {
    lastEmittedClient.up = playerInput.up;
    lastEmittedClient.down = playerInput.down;
    lastEmittedClient.right = playerInput.right;
    lastEmittedClient.left = playerInput.left;
    lastEmittedClient.jump = playerInput.jump;
    lastEmittedClient.theta = newTheta;
  }
  return hasChanged;
}


module.exports = {
  requestNewMatch: function requestNewMatch(game) {
    addPhysicsUpdateListener(socket);
    const camera = game.camera.toJSON();
    camera.position = game.camera.position;
    camera.direction = game.camera.getWorldDirection();
    const fullScene = {camera: camera, scene: game.scene.toJSON()};
    socket.emit('fullScene', fullScene);
  },
  joinMatch: function joinMatch(matchNumber, game) {
    addPhysicsUpdateListener(socket);
    const player = game.camera.toJSON();
    player.position = game.camera.position;
    player.direction = game.camera.getWorldDirection();
    socket.emit('addMeToMatch', {matchId: matchNumber, player: player});
  },
  emitClientPosition: function emitClientPositon(camera, playerInput) {
    playerInput.direction = camera.getWorldDirection();
    if (hasChangedInput(playerInput)) {
      socket.emit('clientUpdate', JSON.stringify(flat.playerInput(playerInput)));
      if (playerInput.jump) {
        playerInput.jump = false;
        lastEmittedClient.jump = false;
      }
    }
  },
  emitShootBall: function emitShootBall(camera) {
    socket.emit('shootBall', JSON.stringify(flat.shootBall(camera)));
  }
};
