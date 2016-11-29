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
        this.setState({liveMatches: JSON.parse(data)})
      }
    })
  }

  backToHome() {
    browserHistory.push('/Home');
  }

  selectSkin() {
    browserHistory.push('/SelectSkin')
  }

  render() {
    return (
      <div id='JoinMatchTitle'>
        <div id='CreateMatchBackground' >
          <button id='SelectSkinButtonCreate' className='btn btn-warning' onClick={this.selectSkin}>Select Skin</button>
          <button id='HomeButtonCreate' className='btn btn-primary' onClick={this.backToHome}>HOME</button>
          <h1 id='CreateMatchTitle'>Join A Match</h1>
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