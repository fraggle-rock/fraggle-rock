const userModel = require('./../models/UserModel');

/*
{"username":"riyaz",
 "email":"insaneriyaz@gmail.com",
 "token":"thisiswhatweneed",
 "facebookid":"1223456"
}
*/

module.exports = {
  insertUser(user) {
    return userModel.build({ username: user.username,
      email: user.email,
      token: user.token,
      facebookid: user.facebookid,
      map: user.map,
      graphicsSetting: user.graphicsSetting,
      skins: user.skins,
      hats: user.hats
    })
    .save();
  },
  getAllUsers() {
    return userModel.findAll({ where: { } });
  },
  searchUserByUsername(username) {
    return userModel.find({ where: { username } });
  },
  searchUserById(id) {
    return userModel.find({ where: { id } });
  },
  searchUserByFacebookid(facebookid) {
    return userModel.find({ where: { facebookid } });
  },
  searchUserByids(idArray) {
    const arrIds = [];
    idArray.forEach((id) => {
      arrIds.push({ id });
    });
    return userModel.findAll({
      where: {
        $or: arrIds,
      },
    });
  },
  updateSkins(id, skins) {
    return userModel.update(
      {
        skins,
      },
      {
        fields: ['skins'],
        where: { id },
      });
  },
  updateHats(id, hats) {
    return userModel.update(
      {
        hats,
      },
      {
        fields: ['hats'],
        where: { id },
      });
  },
  updateGraphics(id, graphicsSetting) {
    return userModel.update(
      {
        graphicsSetting,
      },
      {
        fields: ['graphicsSetting'],
        where: { id },
      });
  },
  clear() {
    return userModel.destroy({
      where: {
      },
    });
  },
};
