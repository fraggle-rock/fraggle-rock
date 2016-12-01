'use strict';
const httpPort = 4444;
const http = require('http');
const physicsServers = {};

const server = http.createServer((req, res) => {
  if (req.url === '/register') {
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
  if (req.url === '/liveGames') {
    console.log('serving livegames')
    res.statusCode = 200;
    res.end('hi from socketmanger');
  }
  if (req.url === 'statusPoll') {

  }
});
server.listen(httpPort);
console.log(`SocketManager listening on ${httpPort}`);