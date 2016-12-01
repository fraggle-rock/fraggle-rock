import React from 'react';
import { browserHistory } from 'react-router';
import userProfile from '../userProfile.js';

const clientScene = require('../../clientScene.js');
const sceneUtility = require('../../sceneUtility.js');
const socketUtility = require('../../socketUtility');


class JoinMatchData extends React.Component {
  constructor(props) {
    super(props);
  }

  JoinGame(game) {
    userProfile.createMatch = false;
    userProfile.matchId = game;
    browserHistory.push('/Game');
  }

  render() {
    return (
    <div>
      <button onClick={() => this.JoinGame(this.props.game)} className='btn btn-warning'>{this.props.game}</button>
    </div>
    )
  }
}

export default JoinMatchData