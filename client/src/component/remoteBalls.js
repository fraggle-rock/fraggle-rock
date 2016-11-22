const LimitedMeshes = function LimitedMeshes(mesh, limit) {
  this.meshes = {};
  this.deadStack = [];
  this.lru;
  for (var i = 0; i < limit; i++) {
    const meshClone = mesh.clone();
    meshClone.userData.isLive = false;
    this.meshes[meshClone.uuid.slice(0, config.uuidLength)] = meshClone;
    this.deadStack.push(meshClone);
  }
};

//If there are dead meshes, returns a dead mesh
//if there are no dead meshes, returns the oldest live mesh
LimitedMeshes.prototype.getNext = function getNext() {
  if (this.deadStack.length === 0) {
    return this.lru;
  } else {
    return this.deadStack.pop();
  }
};

LimitedMeshes.prototype.find = function find(uuid) {
  return this.meshes[uuid];
};

LimitedMeshes.prototype.killMesh = function killMesh() {
  
}