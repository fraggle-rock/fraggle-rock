const express = require('express');
const UserController = require('./../db/controllers/UserController');
const transactionController = require('./../db/controllers/TransactionController');

const router = express.Router();

router.route('/addUser')
.post((req, res) => {
  UserController.insertUser(req.body)
  .then((user) => {
    transactionController.insertTransaction({ user_id: user.id,
      transaction: 500 })
      .then((transaction) => {
        res.status(200).send(user);
      });
  });
});

router.route('/updateHats')
.post((req, res) => {
  if (req.body.id && req.body.hats) {
    UserController.updateHats(req.body.id, req.body.hats)
    .then((user) => {
      res.status(200).send(user);
    });
  } else {
    res.sendStatus(400);
  }
});

router.route('/updateSkins')
.post((req, res) => {
  if (req.body.id && req.body.skins) {
    UserController.updateSkins(req.body.id, req.body.skins)
    .then((user) => {
      res.status(200).send(user);
    });
  } else {
    res.sendStatus(400);
  }
});

router.route('/updateGraphics')
.post((req, res) => {
  if (req.body.id && req.body.graphicsSetting) {
    UserController.updateGraphics(req.body.id, req.body.graphicsSetting)
    .then((user) => {
      res.status(200).send(user);
    });
  } else {
    res.sendStatus(400);
  }
});


router.route('/getUsers')
.get((req, res) => {
  UserController.getAllUsers()
  .then((users) => {
    res.status(200).send(users);
  });
});

router.route('/getUserByName/:name')
.get((req, res) => {
  if (req.params.name) {
    UserController.searchUserByUsername(req.params.name)
    .then((user) => {
      res.status(200).send(user);
    });
  } else {
    res.sendStatus(400);
  }
});

router.route('/getUserByFacebookID/:facebookid')
.get((req, res) => {
  if (req.params.facebookid) {
    UserController.searchUserByFacebookid(req.params.facebookid)
    .then((user) => {
      res.status(200).send(user);
    });
  } else {
    res.sendStatus(400);
  }
});


module.exports = router;
