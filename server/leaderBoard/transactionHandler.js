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

router.route('/addTransactionByUsername')
.post((req, res) => {
  if (req.body.username && req.body.points) {
    UserController.searchUserByUsername(req.body.username)
    .then((user) => {
      TransactionController.insertTransaction({ transaction: req.body.points, user_id: user.id })
      .then((transaction) => {
        res.send(200).status(transaction);
      });
    });
  } else {
    res.sendStatus(400);
  }
});

router.route('/addTransactionByFacebookID')
.post((req, res) => {
  if (req.body.facebookid && req.body.points) {
    UserController.searchUserByFacebookid(req.body.facebookid)
    .then((user) => {
      TransactionController.insertTransaction({ transaction: req.body.points, user_id: user.id })
      .then((transaction) => {
        res.send(200).status(transaction);
      });
    });
  } else {
    res.sendStatus(400);
  }
});


module.exports = router;
