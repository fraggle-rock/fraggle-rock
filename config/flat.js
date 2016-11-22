const roundToDec = function round(num, decimals) {
  decimals = decimals || 3;
  const mult = Math.pow(10, decimals);
  return Math.round(num * mult) / mult;
}
const roundPosition = function roundPosition (position) {
  const newPosition = {};
  newPosition.x = roundToDec(position.x, 2);
  newPosition.y = roundToDec(position.y, 2);
  newPosition.z = roundToDec(position.z, 2);
  return newPosition;
};
const roundQuaternion = function roundQuaternion (quaternion) {
  const newQuaternion = {};
  newQuaternion.w = roundToDec(quaternion.w, 3);
  newQuaternion.x = roundToDec(quaternion.x, 3);
  newQuaternion.y = roundToDec(quaternion.y, 3);
  newQuaternion.z = roundToDec(quaternion.z, 3);
  return newQuaternion;
};
const flatBoolean = function flatBoolean (boolean) {
  return boolean ? 1 : 0;
}
const shapeEncoder = {
  grassFloor: 1,
  rockFloor: 2,
  questionCrate: 3,
  metalCrate: 4,
  ancientCrate: 5,
  woodCrate: 6
};
const shapeDecoder = (function() {
  const result = {};
  for (var key in shapeEncoder) {
    result[shapeEncoder[key]] = key;
  }
  return result;
})()

module.exports = {
  shootBall: function shootBall (shot) {
    const rPosition = roundPosition(shot.position);
    const rDirection = roundPosition(shot.direction);
    return [
      rPosition.x,
      rPosition.y,
      rPosition.z,
      rDirection.x,
      rDirection.y,
      rDirection.z,
      shot.uuid,
    ];
  },
  reShootBall: function reShootBall (flatShot) {
    return {
      position: {
        x: flatShot[0],
        y: flatShot[1],
        z: flatShot[2]
      },
      direction: {
        x: flatShot[3],
        y: flatShot[4],
        z: flatShot[5]
      },
      uuid: flatShot[6],
    }
  },
  playerInput: function playerInput (playerInput) {
    const rDirection = roundPosition(playerInput.direction);
    return [
      playerInput.uuid,
      flatBoolean(playerInput.up),
      flatBoolean(playerInput.left),
      flatBoolean(playerInput.down),
      flatBoolean(playerInput.right),
      flatBoolean(playerInput.jump),
      rDirection.x,
      rDirection.y,
      rDirection.z
    ]
  },
  rePlayerInput: function rePlayerInput (flatPlayerInput) {
    return {
      uuid: flatPlayerInput[0],
      up: flatPlayerInput[1],
      left: flatPlayerInput[2],
      down: flatPlayerInput[3],
      right: flatPlayerInput[4],
      jump: flatPlayerInput[5],
      direction: {
        x: flatPlayerInput[6],
        y: flatPlayerInput[7],
        z: flatPlayerInput[8]
      }
    }
  },
  player: function player (player) {
    const rPosition = roundPosition(player.position);
    const rDirection = roundPosition(player.direction);
    return [
      player.uuid,
      rPosition.x,
      rPosition.y,
      rPosition.z,
      rDirection.x,
      rDirection.y,
      rDirection.z,
    ];
  },
  rePlayer: function player (flatPlayer) {
    return  {
        uuid: flatPlayer[0],
        position: {
          x: flatPlayer[1],
          y: flatPlayer[2],
          z: flatPlayer[3]
        },
        direction: {
          x: flatPlayer[4],
          y: flatPlayer[5],
          z: flatPlayer[6]
        },
      }
  },
  ball: function ball (ball) {
    const rPosition = roundPosition(ball.position);
    const rQuaternion = roundQuaternion(ball.quaternion);
    return [
      ball.id,
      rPosition.x,
      rPosition.y,
      rPosition.z,
      rQuaternion.w,
      rQuaternion.x,
      rQuaternion.y,
      rQuaternion.z
    ];
  },
  reBall: function reBall (flatBall) {
    return {
      uuid: flatBall[0],
      position: {
        x: flatBall[1],
        y: flatBall[2],
        z: flatBall[3]
      },
      quaternion: {
        w: flatBall[4],
        x: flatBall[5],
        y: flatBall[6],
        z: flatBall[7],
      }
    };
  },
  box: function box (box) {
    const rPosition = roundPosition(box.position);
    const rQuaternion = roundQuaternion(box.quaternion);
    const geometry = box.userData.geometry;
    if (shapeEncoder[box.userData.shapeType]) {
      box.userData.shapeType = shapeEncoder[box.userData.shapeType]
    }
    return [
      box.uuid,
      rPosition.x,
      rPosition.y,
      rPosition.z,
      rQuaternion.w,
      rQuaternion.x,
      rQuaternion.y,
      rQuaternion.z,
      geometry.width,
      geometry.height,
      geometry.depth,
      box.userData.shapeType,
    ];
  },
  reBox: function reBox (flatBox) {
    if (shapeDecoder[flatBox[11]]) {
      flatBox[11] = shapeDecoder[flatBox[11]];
    }
    return {
      uuid: flatBox[0],
      position: {x: flatBox[1], y: flatBox[2], z: flatBox[3]},
      quaternion: {w: flatBox[4], x: flatBox[5], y: flatBox[6], z: flatBox[7]},
      geometry: {width: flatBox[8], height: flatBox[9], depth: flatBox[10]},
      type: flatBox[11],
    };
  },
  shapeEncoder: shapeEncoder,
  shapeDecoder: shapeDecoder
};
