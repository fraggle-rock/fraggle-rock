const db = require('../db');
const Sequelize = require('sequelize');
const userModel = require('./UserModel');

const Transaction = db.define('Transaction', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  transaction: {
    type: Sequelize.INTEGER,
  },
});
Transaction.belongsTo(userModel, { foreignKey: 'user_id' });
// Score.sync();

module.exports = Transaction;
