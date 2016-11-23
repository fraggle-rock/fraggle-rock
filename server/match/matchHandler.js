const express = require('express');
// const matchController = require('../controllers/matchController.js');

const router = express.Router();

router.route('/liveGames')
  .get((req, res) => {
  	// matchController.liveGames(res)

  })

module.exports = router;