const express = require('express');
const UserController = require('./../db/controllers/UserController');
const GameController = require('./../db/controllers/GameController');
const ScoreController = require('./../db/controllers/ScoreController');
const _ = require('underscore');

const router = express.Router();

router.route('/leaderBoard')
.get((req, res) => {
  ScoreController.getAllScores()
  .then((Scores) => {
    const sortedScores = _.sortBy(Scores, 'score');
    const userIDs = _.pluck(sortedScores, 'user_id');
    const gameIDS = _.pluck(sortedScores, 'game_id');
    let resultArray = [];
    const cumulative = {};
    sortedScores.forEach((sortedScore, index) => {
      if(cumulative[sortedScore.user_id] !== undefined) {
        cumulative[sortedScore.user_id] += sortedScore.score;
      } else {
        cumulative[sortedScore.user_id] = sortedScore.score;
      }
    })

      UserController.getAllUsers()
      .then((users) => {
        for (var key in cumulative) {
          const user = _.findWhere(users, {"id": parseInt(key)});
           resultArray.push( { username: user.username, score: cumulative[key] });
        }
        
        resultArray = resultArray.reverse();
        resultArray =  resultArray.slice(0, 10)
        res.status(200).send(_.sortBy(resultArray, 'score'));
      });
  });
});


module.exports = router;