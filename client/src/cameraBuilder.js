const THREE = require('three');
const config = require('../config/config.js');

module.exports = {
  buildCamera: function buildCamera() {
    const camera = new THREE.PerspectiveCamera(config.cameraFOV, window.innerWidth / window.innerHeight, config.cameraNear, config.cameraFar); // (fov, aspect, near, far)
    camera.position.y = 2;
    return camera;
  }
}