// This file contains Game related configuration gobally acccesible to other files

module.exports = {
  cameraFOV: 75,
  cameraNear: 0.1,
  cameraFar: 1000,
  skyboxSize: 500,
  metalCrateDensity: 20,
  questionCrateDensity: 5,
  woodCrateDensity: 10,
  ancientCrateDensity: 100,
  playerModelRadius: 2,
  playerModelMass: 25,
  maxShots: 3,
  shotRegen: 750,
  maxJumps: 3,
  jumpRegen: 3000,
  mouseSensitivity: 0.0015,
  ballRadius: 0.5,
  ballMass: 300,
  ballVelocity: 500,
  gameSpeed: .65,
  tickRate: 1 / 60,
  playerTimeout: 10 * 1000,
  playerMovePerTick: 3,
  playerVerticalBound: 100,
  playerHorizontalBound: 200,
  jumpVelocity: 50,
  gravity: -98,
  physicsBounds: 200,
  uuidLength: 5,
  playerDamping: .95,
  maxPlayerDecel: 20,
  killFloorInterval: 1000,
  killFloorUpVelocity: 50,
  maxBalls: 15
};
