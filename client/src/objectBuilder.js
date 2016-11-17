const THREE = require('three');
const config = require('../../config/config.js');

const LoadTexture = function LoadTexture(texturePath) {
  return new THREE.TextureLoader().load(texturePath);
};

const MeshLambertMaterial = function MeshLambertMaterial(texturePath) {
  return new THREE.MeshLambertMaterial({map: LoadTexture(texturePath)})
};

const futureTile = function(xTile, zTile) {
  let texture = new THREE.TextureLoader().load( 'textures/futuretile.jpg' );
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(xTile, zTile);
  return texture;
}

const grassSideMaterial = new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('textures/grass-side.jpg')});
const grassBottomMaterial = new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('textures/grass-bottom.jpg')});
const grassTopMaterial = new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('textures/grass-repeating4.jpg')});
const rockTopMaterial = new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('textures/rockygrass.jpg')});
const grass = function() {
  let materials = [
         grassSideMaterial,
         grassSideMaterial,
         grassBottomMaterial,
         grassTopMaterial,
         grassSideMaterial,
         grassSideMaterial
  ]
  return materials;
}
const rock = function() {
  let materials = [
         grassSideMaterial,
         grassSideMaterial,
         grassBottomMaterial,
         rockTopMaterial,
         grassSideMaterial,
         grassSideMaterial
  ]
  return materials;
}


const redBallMaterial = new THREE.MeshLambertMaterial(
  {map: new THREE.TextureLoader().load( 'textures/redball2.jpg' )} );
const playerMaterial = new THREE.MeshLambertMaterial({ color: 'green' });
const metalCrateMaterial = MeshLambertMaterial('textures/metalcratesm.jpg');
const questionCrateMaterial = MeshLambertMaterial('textures/questioncrate.jpg');
const woodCrateMaterial = MeshLambertMaterial('textures/woodcratesm.jpg');
const ancientCrateMaterial = MeshLambertMaterial('textures/ancientcrate.jpg');
const scoreBoardMaterial = new THREE.MeshPhongMaterial({ map: futureTile(9/4, 1), transparent: true, opacity: .8  });
const sidePanelMaterial = new THREE.MeshPhongMaterial({ map: futureTile(50/3, 1), transparent: true, opacity: .8  });
const grassMaterial =  new THREE.MeshFaceMaterial( grass() );
const rockMaterial = new THREE.MeshFaceMaterial( rock() );

const sky = (() => {
  let sky = {};
  let imagePrefix = "textures/dawnmountain-";
  let directions  = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
  let imageSuffix = ".png";
  sky.geometry = new THREE.CubeGeometry( config.skyboxSize, config.skyboxSize, config.skyboxSize );

  let materialArray = [];
  for (let i = 0; i < 6; i++)
      materialArray.push( new THREE.MeshBasicMaterial({
          map: new THREE.TextureLoader().load( imagePrefix + directions[i] + imageSuffix ),
          side: THREE.BackSide
      }));
  sky.material = new THREE.MeshFaceMaterial( materialArray );
  sky.mesh = new THREE.Mesh( sky.geometry, sky.material );
  return sky.mesh;
})();

const BoxGeometry = function BoxGeometry(size) {
  return new THREE.BoxGeometry(size.width, size.height, size.depth);
};


const addShadow = function addShadow(mesh) {
  mesh.castShadow = true;
  mesh.receiveShadow = true;
}

const initPosition = function initPosition(mesh, position, quaternion) {
  if (position) {
    mesh.position.copy(position);
  }
  if (quaternion) {
    quaternion.w = quaternion.w || quaternion._w || 0;
    quaternion.x = quaternion.x || quaternion._x || 0;
    quaternion.y = quaternion.y || quaternion._y || 0;
    quaternion.z = quaternion.z || quaternion._z || 0;
    quaternion._w = quaternion.w;
    quaternion._x = quaternion.x;
    quaternion._y = quaternion.y;
    quaternion._z = quaternion.z;
    mesh.quaternion.copy(quaternion);
  } else {
    mesh.quaternion.copy({w: 0, x: 1, y: 0, z: 0});
  }
}

const volumeOf = function volumeOf(size) {
  return size.width * size.height * size.depth;
}

module.exports = {
  grassFloor: function(size, position, quaternion) { // {width, depth, segments}, {x, y, z}, {w, x, y, z}
    const geometry = BoxGeometry( size );
    const mesh = new THREE.Mesh(geometry, grassMaterial);
    addShadow(mesh);
    initPosition(mesh, position, quaternion);
    mesh.userData.name = 'grassFloor'
    mesh.userData.mass = 0;
    return mesh;
  },
  rockFloor: function(size, position, quaternion) { // {width, depth, segments}, {x, y, z}, {w, x, y, z}
    const geometry = BoxGeometry( size );
    const mesh = new THREE.Mesh(geometry, rockMaterial);
    addShadow(mesh);
    initPosition(mesh, position, quaternion);
    mesh.userData.name = 'rockFloor'
    mesh.userData.mass = 0;
    return mesh;
  },
  metalCrate: function(size, position, quaternion) {
    const mesh = new THREE.Mesh(BoxGeometry(size), metalCrateMaterial);
    addShadow(mesh);
    initPosition(mesh, position, quaternion);
    mesh.userData.name = 'metalCrate';
    mesh.userData.mass = volumeOf(size) * config.metalCrateDensity;
    return mesh;
  },
  questionCrate: function(size, position, quaternion) {
    const mesh = new THREE.Mesh(BoxGeometry(size), questionCrateMaterial);
    addShadow(mesh);
    initPosition(mesh, position, quaternion);
    mesh.userData.name = 'questionCrate';
    mesh.userData.mass = volumeOf(size) * config.questionCrateDensity;
    return mesh;
  },
  woodCrate: function(size, position, quaternion) {
    const mesh = new THREE.Mesh(BoxGeometry(size), woodCrateMaterial);
    addShadow(mesh);
    initPosition(mesh, position, quaternion);
    mesh.userData.name = 'woodCrate';
    mesh.userData.mass = volumeOf(size) * config.woodCrateDensity;
    return mesh;
  },
  ancientCrate: function(size, position, quaternion) {
    const mesh = new THREE.Mesh(BoxGeometry(size), ancientCrateMaterial);
    addShadow(mesh);
    initPosition(mesh, position, quaternion);
    mesh.userData.name = 'ancientCrate';
    mesh.userData.mass = volumeOf(size) * config.ancientCrateDensity;
    return mesh;
  },
  playerModel: function(position, quaternion) {
    const geometry = new THREE.SphereGeometry(config.playerModelRadius, 32, 32);
    const mesh = new THREE.Mesh(geometry, playerMaterial);
    initPosition(mesh, position, quaternion);
    addShadow(mesh);
    mesh.userData.name = 'playerModel';
    return mesh;
  },
  redBall: function(size, position, quaternion) {
    let redBall = redBall;
    const geometry = new THREE.SphereGeometry( size.radius, size.widthSegments, size.heightSegments );
    const ballMesh = new THREE.Mesh( geometry, redBallMaterial );
    addShadow(ballMesh);
    initPosition(ballMesh, position, quaternion);
    ballMesh.userData.name = 'redBall';
    return ballMesh;
  },
  sky: function() {
    return sky;
  },
  sidePanel: function(size, position, quaternion) {
    let mesh = new THREE.Mesh(BoxGeometry(size), sidePanelMaterial);
    initPosition(mesh, position);
    mesh.userData.name = 'sidePanel';
    addShadow(mesh);
    mesh.userData.mass = 0;
    return mesh;
  },
  scoreBoardPole: function(size, position, quaternion) {
    const material = new THREE.MeshLambertMaterial({ color: new THREE.Color( 0x0e1c33 )  });
    const cylinder = new THREE.CylinderGeometry(.1, .1, 12, 10, 10, false);
    let mesh = new THREE.Mesh(cylinder, material);
    addShadow(mesh);
    initPosition(mesh, position, quaternion);
    mesh.userData.name = 'scoreBoardPole';
    mesh.userData.mass = 0;
    return mesh;
  },
  scoreBoard: function(size, position, quaternion) {
    let mesh = new THREE.Mesh(BoxGeometry(size), scoreBoardMaterial);
    initPosition(mesh, position, quaternion);
    mesh.userData.name = 'scoreBoard';
    addShadow(mesh);
    mesh.userData.mass = 0;
    return mesh;
  },
  text: function(cb, fontPath, text, color, size, position, quaternion) {
    const quat = new THREE.Quaternion();
    quat.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2);
    let loader = new THREE.FontLoader();
    loader.load( fontPath, function(font) {
      size.font = font;
      const geometry = new THREE.TextGeometry(text, size);
      const material = new THREE.MeshPhongMaterial({ color: color,  transparent: true, opacity: 1  });
      let mesh = new THREE.Mesh(geometry, material);
      initPosition(mesh, position, quat);
      mesh.userData.name = 'text';
      addShadow(mesh);
      mesh.userData.mass = 0;
      cb(mesh);
    });
  }
}

// var loader = new THREE.FontLoader();
// let font = loader.load( 'Arial_Regular.json', function(font) {
//   geometry = new THREE.TextGeometry("5", { font: font, size: 1.3, height: .06, curveSegments: 3})
//   material = new THREE.MeshPhongMaterial({ color: 'yellow',  transparent: true, opacity: 1  });
//   mesh = new THREE.Mesh(geometry, material);
//   mesh.position.x = -22.3;
//   mesh.position.y = 6.3;
//   mesh.position.z = 2.9;
//   mesh.rotation.y = Math.PI / 2;
//   scene.add(mesh);

//   geometry = new THREE.TextGeometry("5", { font: font, size: 1.3, height: .06, curveSegments: 3})
//   material = new THREE.MeshPhongMaterial({ color: 'yellow',  transparent: true, opacity: 1  });
//   mesh = new THREE.Mesh(geometry, material);
//   mesh.position.x = -22.3;
//   mesh.position.y = 6.3;
//   mesh.position.z = -1.9;
//   mesh.rotation.y = Math.PI / 2;
//   scene.add(mesh);

//   geometry = new THREE.TextGeometry("2:51", { font: font, size: .8, height: .06, curveSegments: 3})
//   material = new THREE.MeshPhongMaterial({ color: 'yellow',  transparent: true, opacity: 1  });
//   mesh = new THREE.Mesh(geometry, material);
//   mesh.position.x = -22.3;
//   mesh.position.y = 8.3;
//   mesh.position.z = 1.1;
//   mesh.rotation.y = Math.PI / 2;
//   scene.add(mesh);
// });


// futureTile = new THREE.TextureLoader().load( 'textures/scoreboard.png' );
// // futureTile.wrapS = THREE.RepeatWrapping;
// // futureTile.wrapT = THREE.RepeatWrapping;
// // futureTile.repeat.set( 9/4 , 1 );
// geometry = new THREE.BoxGeometry(9, 0.1, 4);
// material = new THREE.MeshPhongMaterial({ map: futureTile,  transparent: true, opacity: 1 });
// mesh = new THREE.Mesh(geometry, material);
// mesh.position.y = 7.5;
// mesh.position.x = -22.3;
// mesh.receiveShadow = true;
// mesh.rotation.x = - Math.PI / 2;
// mesh.rotation.z = Math.PI / 2;
// scene.add(mesh);

