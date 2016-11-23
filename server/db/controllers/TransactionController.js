const transactionModel = require('./../models/TransactionModel');
const userModel = require('./../models/UserModel');

module.exports = {
  insertTransaction(transactionObj) {
    return transactionModel.build({
      transaction: transactionObj.transaction,
      user_id: transactionObj.user_id })
      .save();
  },
  getTransactionbyUserID(userID) {
    return transactionModel.findAll({ where: {
      user_id: userID } });
  },
  clear() {
    return transactionModel.destroy({
      where: {
      },
    });
  },
};
