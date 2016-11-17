import React from 'react';
import LeaderBoard from '../LeaderBoard/LeaderBoard.js'
import LeaderBoardDataUser from '../LeaderBoard/LeaderBoardDataUser.js'
import LeaderBoardDataScore from '../LeaderBoard/LeaderBoardDataScore.js'
import CreateMatch from '../CreateMatch/CreateMatch.js'
import MapSelector from '../CreateMatch/MapSelector.js'
import JoinMatch from '../JoinMatch/JoinMatch.js'
import JoinMatchData from '../JoinMatch/JoinMatchData.js'
const clientScene = require('../../clientScene.js');

class Home extends React.Component {
  constructor(props) {
	  super(props);
	  this.state = {
	    user: null,
      leaderBoards: [{'username': 'Will', 'score': 1000}, {'username': 'Ryaz', 'score': 1000}, {'username': 'Eric', 'score': 1000}, {'username': 'Nick', 'score': 1000}],
      liveMatches: []
	  };
    this.showLeaderBoards = this.showLeaderBoards.bind(this);
    this.JoinExisting = this.JoinExisting.bind(this);
  }

  CreateMatch() {
    document.getElementById('HomeScene').style.display = 'none';
    document.getElementById('DawnMountainCreateBackground').style.display = 'none';
    document.getElementById('CreateMatch').style.display = 'block';
  }

  JoinExisting() {
    $.ajax({
      url: '/api/liveGames',
      method: 'GET',
      success: (data) => {
        this.setState({liveMatches: data})
        document.getElementById( 'HomeScene' ).style.display = 'none';
        document.getElementById('JoinMatch').style.display = 'block';
      }
    })
  }

  showLeaderBoards() {
    //send request for leaderBoards
    document.getElementById('HomeScene').style.display = 'none';
    document.getElementById('LeaderBoard').style.display = 'block';
  }

  render() {
    return (
      <div id='HomePage'>
        <img id='HomeBackground' src='./textures/menubg.png' />
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
        <div id='JoinMatch'>
          <JoinMatch />
          {this.state.liveMatches.map(game => <JoinMatchData game={game}/>)}
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