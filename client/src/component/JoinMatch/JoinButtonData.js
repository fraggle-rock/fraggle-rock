import React from 'react';
import { browserHistory } from 'react-router';
const clientScene = require('../../clientScene.js');
const sceneUtility = require('../../sceneUtility.js');
const socketUtility = require('../../socketUtility');

class JoinButtonData extends React.Component {
  constructor(props) {
    super(props);
  }

  JoinGame(game) {
    userProfile.createMatch = false;
    userProfile.matchId = this;
    browserHistory.push('/Game');
  }

  render() {
    return (
    	<div id='JoinGameButton'>
    	  <span>
    		  <button onClick={JoinGame.bind(props.games)} className='btn btn-warning'>Join Game</button>
    	  </span>
    	</div>
    )
  }
}

export default JoinButtonData