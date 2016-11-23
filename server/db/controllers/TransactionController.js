const transactionModel = require('./../models/TransactionModel');

module.exports = {
  insertTransaction(transaction) {
    return transactionModel.build({
      transaction: transaction.points,
      user_id: transaction.user_id })
      .save();
  },
  getTransactionbyUserID(userID) {
    return transactionModel.find({ where: {
      user_id: userID } });
  },
  clear() {
    return transactionModel.destroy({
      where: {
      },
    });
  },
};
