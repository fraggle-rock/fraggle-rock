import React from 'react';
import { browserHistory } from 'react-router';
import Profile from './Profile.js';
import userProfile from '../userProfile.js'
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
            browserHistory.push('Home')
          },
          error: (error) => {
            console.log(error)
          }
        })
      }
    }
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
        <div id='Profile'>
          <Profile />
        </div>
        <div id='HomeScene'>
          <img src='../../../textures/logotext.png' id='NonSelect'/>
          <div id="joinButtons">
            <button id="joinMatch" onClick={this.CreateMatch} className='btn btn-primary'>Create Match</button>
            <button id="joinExisting" onClick={this.JoinMatch} className='btn btn-primary'>Join Match</button>
          </div>
          <button id="LeaderBoardButton" onClick={this.showLeaderBoards} className='btn btn-primary'>View Leaderboards</button>
        </div>
        <div className='version'>v0.7</div>
        <div className='createdBy'>Created by Nick Lathen, Will Stockman, Eric Eakin, and Riyaz Ahmed, 2016</div>
      </div>
    );

  }
}

export default Home;