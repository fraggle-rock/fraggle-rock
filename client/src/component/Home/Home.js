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
    this.JoinMatch = this.JoinMatch.bind(this);
  }

  CreateMatch() {
    browserHistory.push('/CreateMatch')
  }

  JoinMatch() {
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
          <img src='../../../textures/logotext.png' />
          <div id="joinButtons">
            <button id="createMatch" onClick={this.CreateMatch} className='btn btn-primary'>Create Match</button>
            <button id="joinMatch" onClick={this.JoinMatch} className='btn btn-primary'>Join Match</button>
          </div>
          <button id="LeaderBoardButton" onClick={this.showLeaderBoards} className='btn btn-primary'>View LeaderBoards</button>
        </div>
        <div id='Profile'>
          <Profile />
        </div>
        <div className='version'>v0.7</div>
        <div className='createdBy'>Created by Nick Lathen, Will Stockman, Eric Eakin, and Riyaz Ahmed, 2016</div>
      </div>
    );

  }
}

export default Home;