const THREE = require('three');
const objectBuilder = require('./objectBuilder');
const config = require('../../config/config.js');
const flat = require('../../config/flat.js');
const audio = require('./audio');
const userProfile = require('./component/userProfile.js')


const redBallStack = (function() {
  const result = [];
  const mesh = new objectBuilder.redBall({radius: config.ballRadius, widthSegments: 32, heightSegments: 32});
  for (var i = 0; i < 15; i++) {
    result.push(mesh.clone());
  }
  return result;
})();

const remoteClients = {};
const remoteScene = {};
let currentGame = {};

//make sure object exists
currentGame.matchInfo = {clients: {}};

let pitch = 0;
let yaw = 0;
let host = false;
let shotCount = config.maxShots;
let shotRegen = false;
let jumpCount = config.maxJumps;
let jumpRegen = false;
let latestServerUpdate;
const serverShapeMap = {};
const meshLookup = {init: false};
const clearLookup = {};

//DEBUGGING
let ticks = 0;
let lastTick;
let averageTickRate = 0;

module.exports = {
  addLookControls: function addLookControls(camera, socketUtility) {
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
      socketUtility.emitClientQuaternion(camera);
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
          uuid: currentGame.camera.uuid.slice(0, config.uuidLength),
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

    let victory = false;
    let playersAlive = [];
    let players = Object.keys(matchInfo.clients).length;

    Object.keys(matchInfo.clients).forEach( (uuid) => {
      let client = matchInfo.clients[uuid];
      // document.getElementById('player' + client.playerNumber + 'Box').style.opacity = '1';
      document.getElementById('player' + client.playerNumber + 'Box').style.marginTop = '90px';
      document.getElementById('player' + client.playerNumber + 'life1').style.opacity = client.lives > 0 ? '1' : '0';
      document.getElementById('player' + client.playerNumber + 'life2').style.opacity = client.lives > 1 ? '1' : '0';
      document.getElementById('player' + client.playerNumber + 'life3').style.opacity = client.lives > 2 ? '1' : '0';

      if (client.lives > 0) {
        playersAlive.push(client.playerNumber);
      }
    });

    if (players > 1 && playersAlive.length === 1) {
      document.getElementById('HUD').style.display = 'none';
      document.getElementById('victoryBox').style.display = '';
      document.getElementById('victoryBox').style.opacity = '1';
      document.getElementById('victoryBox').style.marginTop = '15%';
      document.getElementById('victor').innerHTML = 'Player ' + playersAlive[0] + ' Wins!';
      //END GAME HERE
    }
  },
  loadClientUpdate: function loadClientUpdate(clientPosition) {
    // Player out of bounds -> death
    if (Math.abs(clientPosition.position.y) > config.playerVerticalBound || Math.abs(clientPosition.position.x) > config.playerHorizontalBound || Math.abs(clientPosition.position.z) > config.playerHorizontalBound) {
      //death sound
      audio.smashBrawl.shootRound(2, 1, 0.08, 0, 1);

      if (currentGame.camera.uuid.slice(0, config.uuidLength) === clientPosition.uuid) {
        jumpCount = 3;
        shotCount = 3;

        for (var i = 1; i <= 3; i++) {
          document.getElementById('jump' + i).style.opacity = '1';
          document.getElementById('ammo' + i).style.opacity = '1';
        }
      }
    }

    if (currentGame.camera.uuid.slice(0, config.uuidLength) !== clientPosition.uuid) {
      if (remoteClients[clientPosition.uuid]) {
        //Update existing client
        const localPlayer = remoteClients[clientPosition.uuid];
        localPlayer.position.copy(clientPosition.position);
        localPlayer.quaternion.copy(clientPosition.quaternion).multiply(config.skinAdjustQ);
      } else if (!clearLookup[clientPosition.uuid]){
        //Create new client
        const uuid = clientPosition.uuid;
        const client = currentGame.matchInfo.clients[uuid];
        let color;
        let skinPath;
        let name;

        if (client) {
          color = client.color;
          skinPath = client.skinPath;
          name = client.name;
          // name = 'John'
          document.getElementById('player' + client.playerNumber + 'Name').innerHTML = name;
        } else {
          console.log('client doesnt exist');
        }

        const mesh = objectBuilder.playerModel(clientPosition.position, clientPosition.quaternion, color, skinPath);
        const hatCallBack = function(hat) {
          mesh.add(hat);
          hat.position.y = -1;
          hat.position.x = 0;
          hat.position.z = 0;
          hat.quaternion.multiply(config.hatAdjustQ)
          hat.castShadow = true;
          hat.receiveShadow = true;
        }
        const hat = objectBuilder.hat(hatCallBack)
        currentGame.scene.add(mesh);
        remoteClients[clientPosition.uuid] = mesh;
      }
    } else {
      //Move camera to client
      currentGame.camera.position.copy(clientPosition.position);
    }
  },
  savePhysicsUpdate: function(meshObject) {
    latestServerUpdate = meshObject;
  },
  loadPhysicsUpdate: function loadPhysicsUpdate(meshObject) {
    meshObject = JSON.parse(meshObject);
    if (!meshLookup.init) {
      currentGame.scene.children.forEach(function(mesh) {
        meshLookup[mesh.uuid.slice(0, config.uuidLength)] = mesh;
      });
    }
    if(meshObject[4] && meshObject[4].play) {
      audio.smashBrawl.shootRound(meshObject[4].play, 1, 0.08, 0, 0 );
    }
    if (meshObject[3]) {
      meshObject[3].forEach(function(uuid) {
        const mesh = meshLookup[uuid] || meshLookup[serverShapeMap[uuid]] || remoteClients[uuid];
        if (mesh) {
          currentGame.scene.remove(mesh);
          if (mesh.userData.name === 'ballMesh') {
            const i = redBallStack.indexOf(mesh);
            redBallStack.splice(i, 1);
            redBallStack.push(mesh);
          }
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
        }
      });
    }
    let localMesh;
    meshObject[0].forEach((serverMesh) => {
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
        meshLookup[boxMesh.uuid.slice(0, config.uuidLength)] = boxMesh;
        currentGame.scene.add(boxMesh);
      }
      localMesh = undefined;
    });
    meshObject[1].forEach((serverMesh) => {
      serverMesh = flat.reBall(serverMesh);
      localMesh = meshLookup[serverMesh.uuid] || meshLookup[serverShapeMap[serverMesh.uuid]];
      if (localMesh) {
        localMesh.position.copy(serverMesh.position);
        localMesh.quaternion.copy(serverMesh.quaternion);
      } else if(!clearLookup[serverMesh.uuid]) {
        const ballMesh = redBallStack.pop();
        redBallStack.unshift(ballMesh);
        serverShapeMap[serverMesh.uuid] = ballMesh.uuid.slice(0, config.uuidLength);
        meshLookup[ballMesh.uuid.slice(0, config.uuidLength)] = ballMesh;
        ballMesh.position.copy(serverMesh.position);
        ballMesh.quaternion.copy(serverMesh.quaternion);
        currentGame.scene.add(ballMesh);
      }
    });
    meshObject[2].forEach(function(client) {
      module.exports.loadClientUpdate(flat.rePlayer(client));
    });
  },
  getCamera: function getCamera() {
    return currentGame.camera;
  }
};
