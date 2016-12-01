"use strict";
const liveMatches = {};
const Match = require('./match.js');

const deleteMatch = function deleteMatch(matchId) {
  let match;
  let deleteKey;
  let open = 0;
  for (var key in liveMatches) {
    if (liveMatches[key].guid === matchId) {
      match = liveMatches[key];
      match.shutdown();
      deleteKey = key;
    }
  }
  delete liveMatches[deleteKey];
  for (var key in liveMatches) {
    open++;
  }
  console.log(`Deleting match, there are ${open} open matches.`);
};

module.exports = {
  getNewMatch: function getNewMatch() {
    let match = new Match(deleteMatch);
    liveMatches[match.guid] = match;
    return match;
  },
  getMatch: function getMatch(matchId) {
    return liveMatches[matchId];
  },
  liveGames: function liveGames() {
    var liveMatchesArray = []
    for (var matchId in liveMatches) {
      let currentMatch = liveMatches[matchId];
      let match = {
        numPlayers: Object.keys(currentMatch.clients).length,
        maxPlayers: currentMatch.maxPlayers,
        owner: currentMatch.owner,
        mapChoice: currentMatch.mapChoice,
        matchId: matchId
      };
      liveMatchesArray.push(match);
    }
    return liveMatchesArray;
  },
  deleteMatch: deleteMatch,
};

