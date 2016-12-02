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
  let serverUrl = req.connection.remoteAddress;
  if (serverUrl.indexOf('::ffff:') !== -1) {
    serverUrl = serverUrl.slice(7);
  }
  console.log('registering new physics server at ' + serverUrl);
  if (physicsServers[serverUrl]) {
    clearInterval(physicsServer[serverUrl].timeout)
  }
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
  res.end('success');
}

const liveGames = function(req, res) {
  console.log('serving livegames')
  res.statusCode = 200;
  let liveGames = {};
  for (var url in physicsServers) {
    const matchInfo = physicsServers[url].matchInfo;
    liveGames[url] = matchInfo || 'empty';
  }
  console.log(liveGames);
  res.end(JSON.stringify(liveGames));
}

const statusPoll = function(req, res) {
  let serverUrl = req.connection.remoteAddress;
  if (serverUrl.indexOf('::ffff:') !== -1) {
    serverUrl = serverUrl.slice(7);
  }
  let statusPoll = '';
  req.on('data', function(chunk) {statusPoll += chunk});
  req.on('end', function() {
    let server = physicsServers[serverUrl];
    if (!server) {
      console.log('re-registering new physics server at ' + serverUrl)
      physicsServers[serverUrl] = {status: 'empty'};
      server = physicsServers[serverUrl];
      server.lastUpdate = Date.now();
      server.timeout = setInterval(function() {
        if (Date.now() - server.lastUpdate > 8000) {
          console.log(`Server at ${serverUrl} timed out.`);
          clearInterval(server.timeout);
          delete physicsServers[serverUrl];
        }
      }, 10 * 1000);
    }
    statusPoll = JSON.parse(statusPoll);
    if (Object.keys(statusPoll).length > 0) { //there is a live match
      server.status = 'live';
      server.matchInfo = statusPoll;
    } else { //there is no live match
      server.status = 'empty';
      server.matchInfo = undefined;
    }
    server.lastUpdate = Date.now();
    res.statusCode = 200;
    res.end();
  });
}
console.log(`SocketManager listening on ${httpPort}`);