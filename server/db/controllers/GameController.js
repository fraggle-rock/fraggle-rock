const gameModel = require('./../models/GameModel');

/*
{"username":"Riyaz","uuid":"123-qwe-asd"}
*/
/*

*/
module.exports = {
  insertGame(game) {
    return gameModel.build({ uuid: game.uuid, user_id: game.user_id })
    .save();
  },
  searchGameByUUIDandUserID(uuid, userid) {
    return gameModel.find({ where: { uuid, user_id: userid } });
  },
  searchGameByUUID(uuid) {
    return gameModel.find({ where: { uuid } });
  },
  searchGameByuserId(userid) {
    return gameModel.find({ where: { user_id: userid } });
  },
  getAllGames() {
    return gameModel.findAll({ where: { } });
  },
  searchUserByids(idArray) {
    const arrIds = [];
    idArray.forEach((id) => {
      arrIds.push({ id });
    });
    return gameModel.findAll({
      where: {
        $or: arrIds,
      },
    });
  },
  clear() {
    return gameModel.destroy({
      where: {
      },
    });
  },
};
