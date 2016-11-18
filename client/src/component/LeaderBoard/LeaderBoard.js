import React from 'react';
import { browserHistory } from 'react-router';
import LeaderBoardDataScore from './LeaderBoardDataScore.js';
import LeaderBoardDataUser from './LeaderBoardDataUser.js';

class LeaderBoard extends React.Component {
  constructor(props) {
	  super(props);
	  this.state = {
	    user: null,
      leaderBoards: [{'username': 'Will', 'score': 1000}, {'username': 'Ryaz', 'score': 1000}, {'username': 'Eric', 'score': 1000}, {'username': 'Nick', 'score': 1000}]
	  };
	  this.backToHome = this.backToHome.bind(this);
  }

  backToHome() {
    browserHistory.push('/Home');
  }

  render() {
    return (
      <div id='LeaderBoardTitle'>
        <img id='HomeBackground' src='https://files.slack.com/files-tmb/T17PD5LF2-F33L30LB0-d679fde7e5/screen_shot_2016-11-15_at_12.28.35_pm_720.png' />
        <h1 id='LeaderBoardTitle'>Smash Ball Brawl Leaderboard</h1>
        <button id='HOMEButton' className='btn btn-primary' onClick={this.backToHome}>HOME</button>
        <div id='CreateMatchBackground' />
        <div>
          <div id='LeaderBoardUser'>
            <span id="LeaderBoardUserNameTitle">USERNAME</span>
            {this.state.leaderBoards.map(leader => <LeaderBoardDataUser leader={leader} />)}
          </div>
          <div id='LeaderBoardScore'>
            <span id="LeaderBoardScoreTitle">SCORE</span>
            {this.state.leaderBoards.map(leader => <LeaderBoardDataScore leader={leader} />)}
          </div>
        </div>
      </div>
    );
  	
  }
}



export default LeaderBoard;
