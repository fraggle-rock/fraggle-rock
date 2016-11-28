const express = require('express');
const http = require('http');
// const matchController = require('../controllers/matchController.js');

const router = express.Router();

router.route('/liveGames')
  .get((req, res) => {
  	// matchController.liveGames(res)
    http.get('http://localhost:3332/liveGames', function(response) {
      response.setEncoding('utf8');
        let rawData = '';
      response.on('data', (chunk) => rawData += chunk);
      response.on('end', () => {
        try {
          res.send(rawData);
        } catch (e) {
          console.log(e.message);
        }
      });
    })
  })

module.exports = router;