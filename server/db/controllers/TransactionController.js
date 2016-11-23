const transactionModel = require('./../models/TransactionModel');

module.exports = {
  insertTransaction(transaction) {
    return transactionModel.build({
      transaction: transaction.points,
      user_id: transaction.user_id })
      .save();
  },
};
