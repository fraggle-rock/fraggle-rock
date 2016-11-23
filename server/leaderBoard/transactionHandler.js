const express = require('express');
const UserController = require('./../db/controllers/UserController');
const TransactionController = require('./../db/controllers/TransactionController');
const _ = require('underscore');

const router = express.Router();

router.route('/getPointsByFacebookID/:facebookid')
.get((req, res) => {
  if (req.params.facebookid) {
    UserController.searchUserByFacebookid(req.params.facebookid)
    .then((user) => {
      TransactionController.getTransactionbyUserID(user.id)
      .then((transaction) => {
        const scores = _.pluck(transaction, 'transaction');
        const sum = _.reduce(scores, (memo, num) => {
          return memo + num;
        }, 0)
        res.status(200).send(sum + '');
      });
    });
  } else {
    res.sendStatus(400);
  }
});

router.route('/getPointsByUsername/:username')
.get((req, res) => {
  if (req.params.username) {
    UserController.searchUserByUsername(req.params.username)
    .then((user) => {
      TransactionController.getTransactionbyUserID(user.id)
      .then((transaction) => {
        const scores = _.pluck(transaction, 'transaction');
        const sum = _.reduce(scores, (memo, num) => {
          return memo + num;
        }, 0)
        res.status(200).send(sum.toString());
      });
    });
  } else {
    res.sendStatus(400);
  }
});

module.exports = router;
