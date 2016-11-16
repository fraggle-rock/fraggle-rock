const userModel = require('./../../server/db/models/UserModel');
const gameModel = require('./../../server/db/models/GameModel');
const scoreModel = require('./../../server/db/models/ScoreModel');
const scoreController = require('./../../server/db/controllers/ScoreController');
const gameController = require('./../../server/db/controllers/GameController');
const userController = require('./../../server/db/controllers/UserController');

userModel.sync()
.then(() => {
  gameModel.sync()
  .then(() => {
    scoreModel.sync()
    .then(() => {
      scoreController.clear()
      .then(() => {
        gameController.clear()
        .then(() => {
          userController.clear();
        });
      });
    });
  });
});
