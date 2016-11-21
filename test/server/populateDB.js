const userModel = require('./../../server/db/models/UserModel');
const gameModel = require('./../../server/db/models/GameModel');
const scoreModel = require('./../../server/db/models/ScoreModel');
const scoreController = require('./../../server/db/controllers/ScoreController');
const gameController = require('./../../server/db/controllers/GameController');
const userController = require('./../../server/db/controllers/UserController');
// const setupSchema = require('./setupSchema');

const users = [
  { username: 'riyaz',
    email: 'riyaz@hackreactor.com',
    token: 'riyazToken',
    facebookid: 'riyazFacebookid'
  },
  { username: 'will',
    email: 'will@hackreactor.com',
    token: 'willToken',
    facebookid: 'willFacebookid' },
  { username: 'eric',
    email: 'eric@hackreactor.com',
    token: 'ericToken',
    facebookid: 'ericFacebookid' },
  { username: 'nick',
    email: 'nick@hackreactor.com',
    token: 'nickToken',
    facebookid: 'nickFacebookid' },
];

const games = [
  {
    uuid: 'abc-123-456',
  },
  {
    uuid: 'abc-123-457',
  },
  {
    uuid: 'abc-123-458',
  },
  {
    uuid: 'abc-123-459',
  },
];

const scores = [
  {
    score: 23,
  },
  {
    score: 18,
  },
  {
    score: 88,
  },
  {
    score: 32,
  },
];
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
          userController.clear()
          .then(() => {
            users.forEach((user, index) => {
              userController.insertUser(user)
              .then((userresponse) => {
                console.log('User Created ', userresponse.id);
                gameController.insertGame({ uuid: games[index].uuid, user_id: userresponse.id })
                .then((gameresponse) => {
                  scoreController.insertScore({ score: scores[index].score,
                    user_id: userresponse.id,
                    game_id: gameresponse.id });
                });
              });
            });
          });
        });
      });
    });
  });
});
// userController.searchUserByUsername('riyaz')
// .then((user) => {
//   const game = { uuid: 'abc-123-456', user_id: user.id };
//   gameController.insertGame(game);
// })
// .catch((error) => {
//   console.error('Error while adding a game ', error);
// });
