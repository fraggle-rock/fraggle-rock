import React from 'react';
import { browserHistory } from 'react-router';
import JoinButtonData from './JoinButtonData.js';
import JoinLevelData from './JoinLevelData.js';
import JoinUserData from './JoinUserData.js';

class JoinMatch extends React.Component {
  constructor(props) {
	  super(props);
	  this.state = {
	    user: null,
      liveMatches: []
	  };
  }

  componentWillMount() {
    $.ajax({
      url: '/api/liveGames',
      method: 'GET',
      success: (data) => {
        this.setState({liveMatches: data})
        console.log(this.state.liveMatches)
      }
    })
  }

  backToHome() {
    browserHistory.push('/Home')

  }

  render() {
    return (
      <div id='JoinMatchTitle'>
        <img id='HomeBackground' src='https://files.slack.com/files-tmb/T17PD5LF2-F33L30LB0-d679fde7e5/screen_shot_2016-11-15_at_12.28.35_pm_720.png' />
        <h1>Join A Match</h1>
        <div id='CreateMatchBackground' />
        <button onClick={this.backToHome} className='btn btn-primary'>HOME</button>
        <div id='JoinMatchData'>
          <span id='JoinLevelTitle'>
            <span>Level</span>
            {this.state.liveMatches.map((games) => <JoinLevelData games={games} />)}
          </span>
          <span id='JoinUserTitle'>
            <span id='JoinUserId'>User</span>
            {this.state.liveMatches.map((games) => <JoinUserData games={games} />)}
          </span>
          <span id='JoinJoinTitle'>
            <span>Join</span>
            {this.state.liveMatches.map((games) => <JoinButtonData games={games} />)}
          </span>
        </div>
      </div>
    );
  	
  }
}

    


export default JoinMatch;