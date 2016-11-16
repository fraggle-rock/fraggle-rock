
const scoreController = require('./../../server/db/controllers/ScoreController');
const gameController = require('./../../server/db/controllers/GameController');
const userController = require('./../../server/db/controllers/UserController');
const setupSchema = require('./setupSchema');

const users = [
  { username: 'riyaz',
    email: 'riyaz@hackreactor.com',
    token: 'riyazToken',
    facebookid: 'riyazFacebookid' },
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

userController.insertUser(users[0]);
userController.insertUser(users[1]);
userController.insertUser(users[2]);
userController.insertUser(users[3]);

userController.searchUserByUsername('riyaz')
.then((user) => {
  const game = { uuid: 'abc-123-456', user_id: user.id };
  gameController.insertGame(game);
})
.catch((error) => {
  console.error('Error while adding a game ', error);
});
