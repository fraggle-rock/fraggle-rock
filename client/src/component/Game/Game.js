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
  }

  componentDidMount() {
    if (userProfile.createMatch) {
      const maxPlayers = userProfile.players;
      clientScene.startGame(maxPlayers);
    } else {
      clientScene.joinGame(userProfile.matchUrl);
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
