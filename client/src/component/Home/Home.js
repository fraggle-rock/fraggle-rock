import React from 'react';
import LeaderBoard from '../LeaderBoard/LeaderBoard.js'
import LeaderBoardDataUser from '../LeaderBoard/LeaderBoardDataUser.js'
import LeaderBoardDataScore from '../LeaderBoard/LeaderBoardDataScore.js'
import CreateMatch from '../CreateMatch/CreateMatch.js'
import MapSelector from '../CreateMatch/MapSelector.js'
const clientScene = require('../../clientScene.js');

class Home extends React.Component {
  constructor(props) {
	  super(props);
	  this.state = {
	    user: null,
      leaderBoards: [{'username': 'Will', 'score': 1000}, {'username': 'Ryaz', 'score': 1000}, {'username': 'Eric', 'score': 1000}, {'username': 'Nick', 'score': 1000}]
	  };
    this.showLeaderBoards = this.showLeaderBoards.bind(this)
  }
  
  CreateMatch() {
    document.getElementById('HomeScene').style.display = 'none';
    document.getElementById('DawnMountainCreateBackground').style.display = 'none';
    document.getElementById('CreateMatch').style.display = 'block';
  }


  JoinExisting() {
    var screenOverlay = document.getElementById( 'screenOverlay' );
    var menuContainer = document.getElementById( 'menuContainer' );
    screenOverlay.style.display = '';
    document.addEventListener('keydown', function(e) {
     if(e.keyCode === 16) {
     screenOverlay.style.display = '-webkit-box';
     screenOverlay.style.display = '-moz-box';
     screenOverlay.style.display = 'box';
     if(menuContainer.style.display === '') {
       menuContainer.style.display = 'none';
     }else {
     menuContainer.style.display = '';
     }   
      }
     })
   
    document.getElementById( 'HomePage' ).style.display = 'none'; 
    clientScene.joinGame(0);
    document.querySelector('#testButtons').remove();
  }

  showLeaderBoards() {
    //send request for leaderBoards
    document.getElementById('HomeScene').style.display = 'none';
    document.getElementById('LeaderBoard').style.display = 'block';
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
        <div id='CreateMatch'>
          <CreateMatch />
        </div>
        <div id='LeaderBoard'>
          <LeaderBoard />
          <div id='LeaderBoardData'>
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
      </div>
    );
  	
  }
}



export default Home;