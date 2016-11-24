const db = require('../db');
const Sequelize = require('sequelize');

const User = db.define('User', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  map: {
    type: Sequelize.STRING,
  },
  graphicsSetting: {
    type: Sequelize.STRING,
  },
  skins: {
    type: Sequelize.ARRAY(Sequelize.STRING),
  },
  hats: {
    type: Sequelize.ARRAY(Sequelize.STRING),
  },
  facebookid: {
    type: Sequelize.STRING,
  },
  username: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  token: {
    type: Sequelize.STRING,
  },
});

// User.sync();
module.exports = User;
