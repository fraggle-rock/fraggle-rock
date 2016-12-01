import React from 'react';
import { browserHistory } from 'react-router';
import userProfile from '../userProfile.js';
import Game from '../Game/Game.js';
const clientScene = require('../../clientScene.js');
const sceneUtility = require('../../sceneUtility.js');
const socketUtility = require('../../socketUtility');


class JoinMatchData extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.match.maxPlayers === 0) {
      this.props.match.maxPlayers = 'Sandbox';
    }
  }

  JoinMatch(matchId) {
    userProfile.createMatch = false;
    userProfile.matchId = matchId;
    browserHistory.push('/Game');
  }

  render() {
    return (
    <div className='JoinMatchBox'>
      <div className='JoinMatchSpan'>
        <img alt={userProfile.maps[this.props.match.mapChoice].name} src={userProfile.maps[this.props.match.mapChoice].thumb} />
      </div>
      <div className='JoinMatchSpan'>{this.props.match.owner}</div>
      <div className='JoinMatchSpan'>{this.props.match.numPlayers} / {this.props.match.maxPlayers}</div>
      <div className='JoinMatchSpan'>
        <button onClick={() => this.JoinMatch(this.props.matchId)} className='btn-md btn-success'>Join Game</button>
      </div>
    </div>
    )
  }
}

export default JoinMatchData