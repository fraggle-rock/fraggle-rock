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

// {
//   uuid: ball.id,
//   position: roundPosition(ball.position),
//   quaternion: roundQuaternion(ball.quaternion),
//   mass: ball.mass
// }
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
  ball: function ball (ball) {
    return {
      uuid: ball.id,
      position: roundPosition(ball.position),
      quaternion: roundQuaternion(ball.quaternion),
    }; 
  },
  reBall: function reBall (flatBall) {
    return {
      uuid: ball.id,
      position: roundPosition(ball.position),
      quaternion: roundQuaternion(ball.quaternion),
    }
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