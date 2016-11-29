const THREE = require('three');
const userProfile = require('./component/userProfile');

module.exports = {
  buildRenderer: function buildRenderer() {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth - 5, window.innerHeight - 5);

  if (userProfile.graphics === 2) {
	  renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = THREE.PCFSoftShadowMap;

	} else if (userProfile.graphics === 1) {
		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = THREE.BasicShadowMap;

  } else {
  	renderer.shadowMap.enabled = false;
  }


	renderer.gammaInput = true;
	renderer.gammaOutput = true;
  return renderer;
  }
}
