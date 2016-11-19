import React from 'react';
import { browserHistory } from 'react-router';
import Profile from './Profile.js';
const clientScene = require('../../clientScene.js');

class Home extends React.Component {
  constructor(props) {
	  super(props);
	  this.state = {
	    user: null,
      liveMatches: []
	  };
    this.showLeaderBoards = this.showLeaderBoards.bind(this);
    this.JoinExisting = this.JoinExisting.bind(this);
  }

  CreateMatch() {
    browserHistory.push('/CreateMatch')
  }

  JoinExisting() {
    browserHistory.push('/JoinMatch')
  }

  showLeaderBoards() {
    //send request for leaderBoards
    browserHistory.push('/LeaderBoard')
  }
  
  render() {
    return (
      <div id='HomePage'>
        <div id='HomeScene'>
        <img src='../../../textures/logo.png' />
        <div id="testButtons">
          <button id="joinMatch" onClick={this.CreateMatch} className='btn btn-primary'>Create Match</button>
          <button id="joinExisting" onClick={this.JoinExisting} className='btn btn-primary'>Join Match</button>
        </div>
          <button id="LeaderBoardButton" onClick={this.showLeaderBoards} className='btn btn-primary'>View LeaderBoards</button>
        </div>
        <div id='Profile'>
          <Profile />
        </div>
      </div>
    );

  }
}

export default Home;