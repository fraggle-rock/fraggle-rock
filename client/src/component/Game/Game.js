import React from 'react';
import { browserHistory } from 'react-router';
import Profile from '../Home/Profile';
import HUD from './HUD';
import userProfile from '../userProfile.js';
const clientScene = require('../../clientScene.js');
const sceneUtility = require('../../sceneUtility.js');
const socketUtility = require('../../socketUtility');

class Game extends React.Component {
  constructor(props) {
	  super(props);
	  this.state = {
	  };
  }

  componentDidMount() {
    if (userProfile.createMatch) {
      const numPlayers = userProfile.players;
      clientScene.startGame(numPlayers);
    } else {
      clientScene.joinGame(userProfile.matchId);
    }
  }

  render() {
    return (
      <div id='GameViewContainer'>
        <HUD />
      </div>
    );
  }
}

export default Game;
