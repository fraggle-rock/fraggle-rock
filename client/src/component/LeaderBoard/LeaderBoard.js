import React from 'react';
import { browserHistory } from 'react-router';
import LeaderBoardDataScore from './LeaderBoardDataScore.js';
import LeaderBoardDataUser from './LeaderBoardDataUser.js';
import Profile from '../Home/Profile.js';

class LeaderBoard extends React.Component {
  constructor(props) {
	  super(props);
	  this.state = {
	    user: null,
      leaderBoards: []
	  };
	  this.backToHome = this.backToHome.bind(this);
  }

  backToHome() {
    browserHistory.push('/Home');
  }

  componentWillMount() {
    $.ajax({
      url: '/api/leaderBoard',
      method: 'GET',
      success: (data) => {
        this.setState({leaderBoards: data.reverse()})
      }
    })
  }

  render() {
    return (
      <div id='LeaderBoardTitle'>
        <div id='LeaderData'>
          <div id='CreateMatchBackground'>
          <div className='buttonBox'>
            <button className='btn btn-primary homeBtn' onClick={this.backToHome}>◀ Back</button>
            <h1>Leaderboard</h1>
          </div>
          <div id='DataLeader'>
            <div id='LeaderBoardUser'>
              <div id="LeaderBoardUserNameTitle">USERNAME</div>
              {this.state.leaderBoards.map(leader => <LeaderBoardDataUser key={leader.username.toString()} leader={leader} />)}
            </div>
            <div id='LeaderBoardScore'>
              <div id="LeaderBoardScoreTitle">SCORE</div>
              {this.state.leaderBoards.map(leader => <LeaderBoardDataScore key={leader.score.toString()} leader={leader} />)}
            </div>
          </div>
        </div>
        <div id='Profile'>
          <Profile />
        </div>
        </div>
      </div>
    );

  }
}



export default LeaderBoard;
