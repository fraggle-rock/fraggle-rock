const socketPort = 3001;
const socketManager = 'socketManager';
const socketManagerPort = 4444;
const io = require('socket.io')(socketPort);
const matchController = require('./matchController.js');
const http = require('http');

setTimeout(function() {
  var postData = JSON.stringify({
    'msg' : 'Hello World!'
  });
  var options = {
    host: socketManager,
    port: socketManagerPort,
    path: '/register',
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
      'Content-Length': Buffer.byteLength(postData)
    }
  };
  var req = http.request(options);
  req.on('error', (e) => {
    console.log(`problem with request: ${e.message}`);
  });
  req.write(postData);
  req.end(function() {
    console.log('succesfully registered');
  });
}, 3000); 

console.log('Physics server listening on ' + socketPort);
io.on('connection', (socket) => {

  socket.on('fullScene', function (fullScene) {
    const scene = fullScene.scene;
    const player = fullScene.camera;
    const match = matchController.getNewMatch();
    const numPlayers = fullScene.numPlayers;
    socket.join(match.guid);
    match.loadFullScene(scene, player, io, numPlayers, fullScene.spawnPoints);
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
    if (match.numPlayers === 0) {
      match.startPhysics();
      match.killFloor();
    }
  });

  socket.on('addMeToMatch', function (newMatchRequest) {
    const matchId = newMatchRequest.matchId;
    const player = newMatchRequest.player;
    const match = matchController.getMatch(matchId);
    if (!match || match.numPlayers === Object.keys(match.clients).length || Object.keys(match.clients).length >= 6) {
      socket.emit('matchUnavailable');
    } else {
      socket.join(match.guid, function() {
        match.loadNewClient(player);
        match.sendFull = true;
        match.physicsEmit(match, socket);
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
        if (match.numPlayers === Object.keys(match.clients).length) {
            match.startPhysics();
            match.killFloor();
        }
      });
    }
  });
});