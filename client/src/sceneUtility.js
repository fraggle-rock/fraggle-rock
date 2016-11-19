const THREE = require('three');
const objectBuilder = require('./objectBuilder');
const config = require('../../config/config.js');
const flat = require('../../config/flat.js');
const audio = require('./audio');

const remoteClients = {};
const remoteScene = {};
let currentGame = {};

//STUB DATA
currentGame.matchInfo = {clients: {}};
// currentGame.matchInfo.clients.uuidone = {mesh: null, color: 'red', skinPath: 'textures/skins/Batman.jpg'}

let pitch = 0;
let yaw = 0;
let host = false;
let shotCount = config.maxShots;
let shotRegen = false;
let jumpCount = config.maxJumps;
let jumpRegen = false;
let latestServerUpdate;
const serverShapeMap = {};
const meshLookup = {length: 0};
const clearLookup = {};

//DEBUGGING
let ticks = 0;
let lastTick;
let averageTickRate = 0;

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
    playerInput.uuid = camera.uuid.slice(0, config.uuidLength);
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
        event.preventDefault();
        if (jumpCount > 0 && playerInput.jump === false) {
          audio.smashBrawl.shootRound(0, 1, 0.08, 0, 0);
          document.getElementById('jump' + jumpCount).style.opacity = '0';
          jumpCount--;
          playerInput.jump = true;
        }
        const regen = function regen() {
          if (jumpCount < config.maxJumps) {
            jumpCount++;
            document.getElementById('jump' + jumpCount).style.opacity = '1';
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
        audio.smashBrawl.shootRound(1, 1, 0.08, 0, 1);
        document.getElementById('ammo' + shotCount).style.opacity = '0';
        shotCount--;
        socketUtility.emitShootBall({
          position: currentGame.camera.position,
          direction: currentGame.camera.getWorldDirection(),
        });
      }
      const regen = function regen() {
        if (shotCount < config.maxShots) {
          shotCount++;
          document.getElementById('ammo' + shotCount).style.opacity = '1';
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
  loadMatchInfo: function loadMatchInfo(matchInfo) {
    currentGame.matchInfo = matchInfo;
  },
  loadClientUpdate: function loadClientUpdate(clientPosition) {
    if (Math.abs(clientPosition.position.y) > config.playerVerticalBound) {
      audio.smashBrawl.shootRound(3, 1, 0.08, 0, 1);
    }
    if (currentGame.camera.uuid.slice(0, config.uuidLength) !== clientPosition.uuid) {
      if (remoteClients[clientPosition.uuid]) {
        remoteClients[clientPosition.uuid].position.copy(clientPosition.position);
      } else if (!clearLookup[clientPosition.uuid]){
        const uuid = clientPosition.uuid;
        const client = currentGame.matchInfo.clients[uuid];
        let color;
        let skinPath;

        if (client) {
          color = currentGame.matchInfo.clients[uuid].color;
          skinPath = currentGame.matchInfo.clients[uuid].skinPath;
        } else {
          console.log('client doesnt exist')
        }

        const mesh = objectBuilder.playerModel(clientPosition.position, clientPosition.quaternion, color, skinPath);
        currentGame.scene.add(mesh);
        remoteClients[clientPosition.uuid] = mesh;
        document.getElementById('player' + client.playerNumber + 'Box').style.display = '';
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
    const boxMeshes = meshObject[0];
    const ballMeshes = meshObject[1];
    const serverClients = meshObject[2];
    const clear = meshObject[3] || [];
    const sceneChildren = currentGame.scene.children;
    while(sceneChildren.length > meshLookup.length) {
      meshLookup[sceneChildren[meshLookup.length].uuid.slice(0, config.uuidLength)] = sceneChildren[meshLookup.length];
      meshLookup.length++;
    }
    clear.forEach(function(uuid) {
      const mesh = meshLookup[uuid] || meshLookup[serverShapeMap[uuid]] || remoteClients[uuid];
      currentGame.scene.remove(mesh);
      meshLookup.length--;
      clearLookup[uuid] = true;
      if (meshLookup[uuid]) {
        delete meshLookup[uuid];
      } else if (meshLookup[serverShapeMap[uuid]]) {
        delete meshLookup[serverShapeMap[uuid]];
        delete serverShapeMap[uuid];
      } else if (remoteClients[uuid]) {
        delete remoteClients[uuid];
      }
    });
    let localMesh;
    boxMeshes.forEach((serverMesh) => {
      serverMesh = flat.reBox(serverMesh);
      localMesh = meshLookup[serverMesh.uuid] || meshLookup[serverShapeMap[serverMesh.uuid]];
      if (localMesh) {
        localMesh.position.copy(serverMesh.position);
        localMesh.quaternion.copy(serverMesh.quaternion);
      } else if (!clearLookup[serverMesh.uuid]) {
        const serverGeometry = serverMesh.geometry;
        const serverPosition = serverMesh.position;
        const serverQuaternion = serverMesh.quaternion;
        const serverType = serverMesh.type;
        const boxMesh = objectBuilder[serverType](serverGeometry, serverPosition, serverQuaternion)
        serverShapeMap[serverMesh.uuid] = boxMesh.uuid.slice(0, config.uuidLength);
        currentGame.scene.add(boxMesh);
      }
      localMesh = undefined;
    });
    ballMeshes.forEach((serverMesh) => {
      serverMesh = flat.reBall(serverMesh);
      localMesh = meshLookup[serverMesh.uuid] || meshLookup[serverShapeMap[serverMesh.uuid]];
      if (localMesh) {
        localMesh.position.copy(serverMesh.position);
        localMesh.quaternion.copy(serverMesh.quaternion);
      } else if (!clearLookup[serverMesh.uuid]) {
        let ballMesh = new objectBuilder.redBall({radius: config.ballRadius, widthSegments: 32, heightSegments: 32}, serverMesh.position, serverMesh.quaternion);
        serverShapeMap[serverMesh.uuid] = ballMesh.uuid.slice(0, config.uuidLength);
        currentGame.scene.add(ballMesh);
      }
      localMesh = undefined;
    });
    serverClients.forEach(function(client) {
      module.exports.loadClientUpdate(flat.rePlayer(client));
    });
  },
  getCamera: function getCamera() {
    return currentGame.camera;
  }
};
