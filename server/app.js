const express = require('express');
const path = require('path');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const morgan = require('morgan'); // middleware for logging request details
const bodyParser = require('body-parser'); // middleware supports unicode encoding of the body
const compression = require('compression'); // middleware for gzip compression
const matchController = require('./controllers/matchController.js');
const userController = require('./db/controllers/UserController');
const gameController = require('./db/controllers/GameController');
const scoreController = require('./db/controllers/ScoreController');
const requestHandler = require('./leaderBoard/requestHandler');
const matchHandler = require('./match/matchHandler.js');

const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(allowCrossDomain);
app.use(compression());
app.use('/api', requestHandler.userHandler);
app.use('/api', requestHandler.scoreHandler);
app.use('/api', requestHandler.gameHandler);
app.use('/api', requestHandler.leaderBoardHandler);
app.use('/api', requestHandler.transactionHandler);
app.use('/api', matchHandler);

app.use(express.static(path.join(__dirname, './../client')));

server.listen(process.env.PORT || 9999, () => {
  console.log(`listening on port ${process.env.PORT || 9999}`);
});

app.get('*', (req, res) => res.sendFile('index.html', {root: './client'}))
// userController.insertUser();
// gameController.insertGame();
// scoreController.insertScore();
//scoreController.clear();

io.on('connection', (socket) => {

  socket.on('fullScene', function (fullScene) {
    const scene = fullScene.scene;
    const player = fullScene.camera;
    const match = matchController.getNewMatch();
    const spawnPoints = fullScene.spawnPoints;
    socket.join(match.guid);
    match.loadFullScene(scene, player, io);
    match.startPhysics(spawnPoints);
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

module.exports = app;
