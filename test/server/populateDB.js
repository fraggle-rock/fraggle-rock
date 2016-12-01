const userModel = require('./../../server/db/models/UserModel');
const gameModel = require('./../../server/db/models/GameModel');
const scoreModel = require('./../../server/db/models/ScoreModel');
const transactionModel = require('./../../server/db/models/TransactionModel');
const scoreController = require('./../../server/db/controllers/ScoreController');
const gameController = require('./../../server/db/controllers/GameController');
const userController = require('./../../server/db/controllers/UserController');
const transactionController = require('./../../server/db/controllers/TransactionController');
// const setupSchema = require('./setupSchema');

const users = [
  { username: 'rockingnick',
    email: 'riyaz@hackreactor.com',
    token: 'riyazToken',
    facebookid: 'riyazFacebookid',
    map: '1',
    graphicsSetting: 'high',
    skins: ['1', '2'],
    url: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/12038272_1072402766105988_6600498372014025136_n.jpg?oh=3f93e4e13495e902e886b451c9258afe&oe=58B1D0A9',
    hats: ['1'],
    sound: 'true',
  },
  { username: 'smashingwill',
    email: 'will@hackreactor.com',
    token: 'willToken',
    facebookid: 'willFacebookid',
    map: '1',
    graphicsSetting: 'high',
    skins: ['1', '2'],
    hats: ['1'],
    url: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/12038272_1072402766105988_6600498372014025136_n.jpg?oh=3f93e4e13495e902e886b451c9258afe&oe=58B1D0A9',
    sound: 'true',
  },
  { username: 'cooleric',
    email: 'eric@hackreactor.com',
    token: 'ericToken',
    facebookid: 'ericFacebookid',
    map: '2',
    graphicsSetting: 'high',
    skins: ['1', '2'],
    hats: ['1'],
    url: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/12038272_1072402766105988_6600498372014025136_n.jpg?oh=3f93e4e13495e902e886b451c9258afe&oe=58B1D0A9',
    sound: 'true',
  },
  { username: 'insaneriyaz',
    email: 'nick@hackreactor.com',
    token: 'nickToken',
    facebookid: 'nickFacebookid',
    map: '2',
    graphicsSetting: 'high',
    skins: ['1', '2'],
    hats: ['1'],
    url: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/12038272_1072402766105988_6600498372014025136_n.jpg?oh=3f93e4e13495e902e886b451c9258afe&oe=58B1D0A9',
    sound: 'true',
  },
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

const transactions = [
  {
    username: 'rockingnick',
    points: 2000,
  },
  {
    username: 'cooleric',
    points: 2000,
  },
  {
    username: 'insaneriyaz',
    points: 2000,
  },
  {
    username: 'smashingwill',
    points: 2000,
  },
  {
    username: 'rockingnick',
    points: -30,
  },
  {
    username: 'cooleric',
    points: -35,
  },
  {
    username: 'insaneriyaz',
    points: -40,
  },
  {
    username: 'smashingwill',
    points: -25,
  },
]
const populateData = function populateData() {
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
};
populateData();
const populateScores = function populateScores() {
  console.log('Populate Done ');
  transactionModel.sync()
  .then(() => {
    transactionController.clear()
    .then(() => {
      transactions.forEach((transaction) => {
        userController.searchUserByUsername(transaction.username)
        .then((user) => {
          transactionController.insertTransaction({ user_id: user.id,
            transaction: transaction.points });
        });
      });
    });
  });
};
setTimeout(populateScores, 3000);


// userController.searchUserByUsername('riyaz')
// .then((user) => {
//   const game = { uuid: 'abc-123-456', user_id: user.id };
//   gameController.insertGame(game);
// })
// .catch((error) => {
//   console.error('Error while adding a game ', error);
// });
