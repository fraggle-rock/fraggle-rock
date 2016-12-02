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
    const resultArray = [];
    UserController.searchUserByids(userIDs)
    .then((users) => {
      GameController.searchUserByids(gameIDS)
      .then((games) => {
        sortedScores.forEach((sortedScore, index) => {
          const obj = { userid: users[index].id,
            username: users[index].username,
            facebookid: users[index].facebookid,
            email: users[index].email,
            score: sortedScore.score,
          };
          resultArray.push(obj);
        });
        res.status(200).send(resultArray);
      });
    });
  });
});

module.exports = router;
