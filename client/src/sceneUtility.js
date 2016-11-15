const THREE = require('three');
const objectBuilder = require('./objectBuilder');
const config = require('../../config/config.js');

const remoteClients = {};
const remoteScene = {};
let currentGame;
let pitch = 0;
let yaw = 0;
let host = false;
let shotCount = config.maxShots;
let shotRegen = false;
let jumpCount = config.maxJumps;
let jumpRegen = false;
let latestServerUpdate;
const serverShapeMap = {};

module.exports = {
  addLookControls: function addLookControls(camera) {
    const onMouseMove = function onMouseMove(event) {
      const movementX = event.movementX;
      const movementY = event.movementY;
      yaw -= movementX * config.mouseSensitivity;
      pitch -= movementY * config.mouseSensitivity;
      const yawQuat = new THREE.Quaternion();
      const pitchQuat = new THREE.Quaternion();
      yawQuat.setFromAxisAngle(new THREE.Vector3(0, 1, 0), yaw);
      pitchQuat.setFromAxisAngle(new THREE.Vector3(1, 0, 0), pitch);
      const quat = yawQuat.multiply(pitchQuat);
      camera.quaternion.copy(quat);
    };
   document.addEventListener('mousemove', onMouseMove, false);
  },
  addMoveControls: function addMoveControls(camera, socketUtility) {
    const playerInput = {};
    playerInput.up = false;
    playerInput.left = false;
    playerInput.down = false;
    playerInput.right = false;
    playerInput.jump = false;
    playerInput.uuid = camera.uuid;
    const onKeyDown = function onKeyDown(event) {
      if (event.keyCode === 87 || event.keyCode === 38) {
        playerInput.up = true;
      }
      if (event.keyCode === 65 || event.keyCode === 37) {
        playerInput.left = true;
      }
      if (event.keyCode === 83 || event.keyCode === 40) {
        playerInput.down = true;
      }
      if (event.keyCode === 68 || event.keyCode === 39) {
        playerInput.right = true;
      }
      if (event.keyCode === 32) {
        if (jumpCount > 0 && playerInput.jump === false) {
          jumpCount--;
          playerInput.jump = true;
        }
        const regen = function regen() {
          if (jumpCount < config.maxJumps) {
            jumpCount++;
          }
          if (jumpCount < config.maxJumps) {
            setTimeout(regen, config.jumpRegen)
          } else {
            jumpRegen = false;
          }
        };
        if (!jumpRegen && jumpCount < 3) {
          jumpRegen = true;
          setTimeout(function() {
            regen();
          }, config.jumpRegen)
        }
      }
      socketUtility.emitClientPosition(camera, playerInput);
    };

    const onKeyUp = function onKeyUp(event) {

      if (event.keyCode === 87 || event.keyCode === 38) {
        playerInput.up = false;
      }
      if (event.keyCode === 65 || event.keyCode === 37) {
        playerInput.left = false;
      }
      if (event.keyCode === 83 || event.keyCode === 40) {
        playerInput.down = false;
      }
      if (event.keyCode === 68 || event.keyCode === 39) {
        playerInput.right = false;
      }
      socketUtility.emitClientPosition(camera, playerInput);
    };
    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);
    return playerInput;
  },
  addClickControls: function addClickControls(socketUtility) {
    window.addEventListener('click', () => {
    if (shotCount > 0) {
      shotCount--;
      socketUtility.emitShootBall({
        position: currentGame.camera.position,
        direction: currentGame.camera.getWorldDirection(),
      });
    }
    const regen = function regen() {
      if (shotCount < config.maxShots) {
        shotCount++;
      }
      if (shotCount < config.maxShots) {
        setTimeout(regen, config.shotRegen)
      } else {
        shotRegen = false;
      }
    };
    if (!shotRegen && shotCount < 3) {
      shotRegen = true;
      setTimeout(function() {
        regen();
      }, config.shotRegen)
    }


    });
  },
  animate: function animate(game) {
    currentGame = game;
    if(latestServerUpdate) {
      module.exports.loadPhysicsUpdate(latestServerUpdate);
    }
    game.renderer.render(game.scene, game.camera);
    requestAnimationFrame(animate.bind(null, game));
  },
  loadClientUpdate: function loadClientUpdate(clientPosition) {
    if (currentGame.camera.uuid !== clientPosition.uuid) {
      if (remoteClients[clientPosition.uuid]) {
        remoteClients[clientPosition.uuid].position.copy(clientPosition.position);
      } else {
        const mesh = objectBuilder.playerModel(clientPosition.position, clientPosition.quaternion);
        currentGame.scene.add(mesh);
        remoteClients[clientPosition.uuid] = mesh;
      }
    } else {
      currentGame.camera.position.copy(clientPosition.position);
    }
  },
  savePhysicsUpdate: function(meshObject) {
    latestServerUpdate = meshObject;
  },
  loadPhysicsUpdate: function loadPhysicsUpdate(meshObject) {
    meshObject = JSON.parse(meshObject);
    const boxMeshes = meshObject.boxMeshes;
    const ballMeshes = meshObject.ballMeshes;
    const serverClients = meshObject.players;
    const meshLookup = {};
    currentGame.scene.children.forEach((mesh) => {
      meshLookup[mesh.uuid] = mesh;
    });
    boxMeshes.forEach((serverMesh) => {
      let localMesh = meshLookup[serverMesh.uuid] || meshLookup[serverShapeMap[serverMesh.uuid]];
      if (localMesh) {
        localMesh.position.copy(serverMesh.position);
        const serverQuaternion = serverMesh.quaternion;
        localMesh.quaternion.copy(serverMesh.quaternion);
      } else {
        const serverGeometry = serverMesh.geometry;
        const serverPosition = serverMesh.position;
        const serverQuaternion = serverMesh.quaternion;
        const serverType = serverMesh.type;
        const boxMesh = objectBuilder[serverType](serverGeometry, serverPosition, serverQuaternion)
        serverShapeMap[serverMesh.uuid] = boxMesh.uuid;
        currentGame.scene.add(boxMesh);
      }
    });
    ballMeshes.forEach((serverMesh) => {
      let localMesh = meshLookup[serverMesh.uuid] || meshLookup[serverShapeMap[serverMesh.uuid]];
      if (localMesh) {
        localMesh.position.copy(serverMesh.position);
        localMesh.quaternion.copy(serverMesh.quaternion);
      } else {
        let ballMesh = new objectBuilder.redBall({radius: config.ballRadius, widthSegments: 32, heightSegments: 32}, serverMesh.position, serverMesh.quaternion);
        serverShapeMap[serverMesh.uuid] = ballMesh.uuid;
        currentGame.scene.add(ballMesh);
      }
    });
    for (var key in serverClients) {
      module.exports.loadClientUpdate(serverClients[key]);
    }
  },
};
