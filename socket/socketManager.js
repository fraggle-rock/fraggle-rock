'use strict';
const httpPort = 4444;
const http = require('http');
const physicsServers = {};

const server = http.createServer((req, res) => {
  if (req.url === '/register') {
    register(req, res);
  }
  if (req.url === '/liveGames') {
    liveGames(req, res);
  }
  if (req.url === '/statusPoll') {
    statusPoll(req, res);
  }
});
server.listen(httpPort);

const register = function(req, res) {
  const serverUrl = req.connection.remoteAddress;
  console.log('registering new physics server at ' + serverUrl);
  
  physicsServers[serverUrl] = {status: 'empty'};
  const server = physicsServers[serverUrl];
  server.lastUpdate = Date.now();
  server.timeout = setInterval(function() {
    if (Date.now() - server.lastUpdate > 8000) {
      console.log(`Server at ${serverUrl} timed out.`);
      clearInterval(server.timeout);
      delete physicsServers[serverUrl];
    }
  }, 10 * 1000);

  res.statusCode = 200;
  res.end();
}

const liveGames = function(req, res) {
  console.log('serving livegames')
  res.statusCode = 200;
  res.end('hi from socketmanger');
}

const statusPoll = function(req, res) {
  const serverUrl = req.connection.remoteAddress;
  let statusPoll = '';
  req.on('data', function(chunk) {statusPoll += chunk});
  req.on('end', function() {
    const server = physicsServers[serverUrl];
    statusPoll = JSON.parse(statusPoll);
    console.log(statusPoll);
    server.lastUpdate = Date.now();
    res.statusCode = 200;
    res.end();
  });
}
console.log(`SocketManager listening on ${httpPort}`);