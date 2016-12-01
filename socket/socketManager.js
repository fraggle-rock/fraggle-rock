const httpPort = 4444;
const http = require('http');
const physicsServers = {};

const server = http.createServer((req, res) => {
  if (req.url === '/register') {
    const serverUrl = req.connection.remoteAddress;
    console.log('registering new physics server at ' + serverUrl);
    res.statusCode = 200;
    res.end();
  }
  if (req.url === '/liveGames') {
    console.log('serving livegames')
    res.statusCode = 200;
    res.end('hi from socketmanger');
  }
});
server.listen(httpPort);
console.log(`SocketManager listening on ${httpPort}`);