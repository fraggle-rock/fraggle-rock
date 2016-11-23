import React from 'react';
import { browserHistory } from 'react-router';
import JoinButtonData from './JoinButtonData.js';
import JoinLevelData from './JoinLevelData.js';
import JoinUserData from './JoinUserData.js';
import Profile from '../Home/Profile.js';

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
      }
    })
  }

  backToHome() {
    browserHistory.push('/Home')

  }

  render() {
    return (
      <div id='JoinMatchTitle'>
        <div id='CreateMatchBackground' >
          <h1>Join A Match</h1>
          <button onClick={this.backToHome} className='btn btn-primary'>HOME</button>
          <div id='JoinMatchData'>
            <div id='JoinLevelTitle'>
              <div>Level</div>
              {this.state.liveMatches.map((games) => <JoinLevelData key={games} games={games} />)}
            </div>
            <div id='JoinUserTitle'>
              <div id='JoinUserId'>User</div>
              {this.state.liveMatches.map((games) => <JoinUserData key={games} games={games} />)}
            </div>
            <div id='JoinJoinTitle'>
              <div>Join</div>
              {this.state.liveMatches.map((games) => <JoinButtonData key={games} games={games} />)}
            </div>
          </div>
        </div>
        <div id='Profile'>
          <Profile />
        </div>
      </div>
    );
  	
  }
}

    


export default JoinMatch;