'use strict';
const express = require('express');
const http = require('http');
const socketManager = 'socketManager';
const socketManagerPort = 4444;

const router = express.Router();

router.route('/liveGames')
  .get((req, res) => {
    var options = {
      host: socketManager,
      port: socketManagerPort,
      path: '/liveGames',
      method: 'GET'
    };
    http.request(options, function(response) {
      response.setEncoding('utf8');
      let liveGames = '';
      response.on('data', (chunk) => liveGames += chunk);
      response.on('end', () => {
        try {
          console.log(liveGames);
          res.send(liveGames);
        } catch (e) {
          console.log(e.message);
        }
      });
    });
  });

module.exports = router;