const socketPort = 3001;
const socketManager = '127.0.0.1';
const socketManagerPort = 4444;
const io = require('socket.io')(socketPort);
const matchController = require('./matchController.js');
const request = require('request');

setTimeout(function() {
  const options = {
    method: 'POST',
    uri: `http://${socketManager}:${socketManagerPort}/register`,
    headers: {
      'Content-Type': 'text/plain'
    },
    body: 'registerMe'
  };
  request(options, function(error, response, body) {
    console.log('succesfully registered');
    setInterval(function() {
      const options = {
        method: 'POST',
        uri: `http://${socketManager}:${socketManagerPort}/statusPoll`,
        headers: {
          'Content-Type': 'text/plain'
        },
        body: 'testFromSocketUpdate'
      };
      request(options, function(error, response, body) {
        console.log('successful poll update');
      })
    }, 5000);
  })
}, 3000); 

console.log('Physics server listening on ' + socketPort);
io.on('connection', (socket) => {

  socket.on('fullScene', function (fullScene) {
    const scene = fullScene.scene;
    const player = fullScene.camera;
    const match = matchController.getNewMatch();
    const maxPlayers = fullScene.maxPlayers;
    socket.join(match.guid);
    match.loadFullScene(scene, player, io, maxPlayers, fullScene.spawnPoints, fullScene.owner, fullScene.mapChoice);
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
    if (match.maxPlayers === 0) {
      match.startPhysics();
      match.killFloor();
    }
  });

  socket.on('addMeToMatch', function (newMatchRequest) {
    const matchId = newMatchRequest.matchId;
    const player = newMatchRequest.player;
    const match = matchController.getMatch(matchId);
    if (!match || match.maxPlayers === Object.keys(match.clients).length || Object.keys(match.clients).length >= 6) {
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
        if (match.maxPlayers === Object.keys(match.clients).length) {
            match.startPhysics();
            match.killFloor();
        }
      });
    }
  });
});