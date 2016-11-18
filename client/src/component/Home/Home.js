import React from 'react';
import { browserHistory } from 'react-router';
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
        <img id='HomeBackground' src='https://files.slack.com/files-tmb/T17PD5LF2-F33L30LB0-d679fde7e5/screen_shot_2016-11-15_at_12.28.35_pm_720.png' />
        <div id='HomeScene'>
        <img src='../../../textures/logo.png' />
        <div id="testButtons">
          <button id="joinMatch" onClick={this.CreateMatch} className='btn btn-primary'>Create Match</button>
          <button id="joinExisting" onClick={this.JoinExisting} className='btn btn-primary'>Join Match</button>
        </div>
          <button id="LeaderBoardButton" onClick={this.showLeaderBoards} className='btn btn-primary'>View LeaderBoards</button>
        </div>
      </div>
    );
  	
  }
}



export default Home;