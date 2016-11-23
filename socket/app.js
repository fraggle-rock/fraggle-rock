const io = require('socket.io')(3333);
const matchController = require('./matchController.js');

io.on('connection', (socket) => {

  socket.on('fullScene', function (fullScene) {
    const scene = fullScene.scene;
    const player = fullScene.camera;
    const match = matchController.getNewMatch();
    socket.join(match.guid);
    match.loadFullScene(scene, player, io);
    match.startPhysics();
    match.killFloor();
    socket.on('shootBall', function(camera) {
      match.shootBall(camera);
    });
    socket.on('clientUpdate', function (camera) { // listener for client position updates
      match.loadClientUpdate(camera); // update server's copy of client position
    });
    socket.on('clientQ', function (clientQuaternion) {
      match.loadClientQuaternion(clientQuaternion);
    });
    socket.on('poll', function(clientUuid) {
      match.loadPoll(clientUuid);
    });
  });

  socket.on('addMeToMatch', function (newMatchRequest) {
    const matchId = newMatchRequest.matchId;
    const player = newMatchRequest.player;
    const match = matchController.getMatch(matchId);
    if (!match) {
      return;
    }
    socket.join(match.guid, function() {
      match.loadNewClient(player);
      match.sendFull = true;
      socket.on('shootBall', function(camera) {
        match.shootBall(camera);
      });
      socket.on('clientUpdate', function (clientPosition) { // listener for client position updates
        match.loadClientUpdate(clientPosition); // update server's copy of client position
      });
      socket.on('clientQ', function (clientQuaternion) {
        match.loadClientQuaternion(clientQuaternion);
      });
      socket.on('poll', function(clientUuid) {
        match.loadPoll(clientUuid);
      });
    });
  });
});