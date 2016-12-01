import React from 'react';
import { browserHistory } from 'react-router';
import LeaderBoardDataScore from './LeaderBoardDataScore.js';
import LeaderBoardDataUser from './LeaderBoardDataUser.js';
import Profile from '../Home/Profile.js';
import userProfile from '../userProfile.js'

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
    if(userProfile.User === 'Guest') {
      if(window.localStorage.id) {
        $.ajax({
          url: '/api/getUserByFacebookID/' + window.localStorage.id,
          method: 'Get',
          success: (data) => {
            userProfile.User = data.username;
            userProfile.Skins = data.skins || [];
            userProfile.facebookid = data.facebookid;
            userProfile.userId = data.id;
            userProfile.FacebookPicture = data.FacebookPicture;
            browserHistory.push('LeaderBoard')
          },
          error: (error) => {
            console.log(error)
          }
        })
      }
    }
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
      <div className='menuContainer'>
        <div id='Profile'>
          <Profile />
        </div>
        <div className='menuBackground'>
          <div className='buttonBox'>
            <button className='btn btn-primary homeBtn' onClick={this.backToHome}>◀ Back</button>
            <h1>Top 10 Players</h1>
          </div>
          <div id='DataLeader'>
            <div id='LeaderBoardUser'>
              <h3>USERNAME</h3>
              {this.state.leaderBoards.map(leader => <LeaderBoardDataUser key={leader.username.toString()} leader={leader} />)}
            </div>
            <div id='LeaderBoardScore'>
              <h3>SCORE</h3>
              {this.state.leaderBoards.map(leader => <LeaderBoardDataScore key={leader.score.toString()} leader={leader} />)}
            </div>
          </div>
        </div>
      </div>
    );

  }
}



export default LeaderBoard;
