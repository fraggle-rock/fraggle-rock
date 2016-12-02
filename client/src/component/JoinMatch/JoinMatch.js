import React from 'react';
import { browserHistory } from 'react-router';
import JoinMatchData from './JoinMatchData.js';
import Profile from '../Home/Profile.js';
import userProfile from '../userProfile.js';

class JoinMatch extends React.Component {
  constructor(props) {
	  super(props);
	  this.state = {
	    user: null,
      liveMatches: [],
      refresh: false
	  };
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
            userProfile.FacebookPicture = data.url;
            browserHistory.push('JoinMatch')
          },
          error: (error) => {
            console.log(error)
          }
        })
      }
    }

    this.pullGames();

    setInterval(this.pullGames.bind(this), 2000)
  }

  pullGames() {
    let context = this;
    if (!this.state.refresh && window.location.pathname === '/JoinMatch') {
      console.log('pull')
      context.setState({refresh: true});
      $.ajax({
        url: '/api/liveGames',
        method: 'GET',
        success: (data) => {
          context.setState({liveMatches: JSON.parse(data)})
          setTimeout(() => {
            if (window.location.pathname === '/JoinMatch') {
              context.setState({refresh: false})
            }
          }, 1000);
        }
      });
    }
  }

  backToHome() {
    browserHistory.push('/Home');
  }

  selectSkin() {
    browserHistory.push('/SelectSkin')
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
            <h1>Join Match</h1>
            <button className='btn btn-warning selectSkinBtn' onClick={this.selectSkin}>Select Skin</button>
          </div>
          <button className='btn-md btn-primary btn-refresh' onClick={this.pullGames.bind(this)}>
            Refresh <img id='refreshButton' src='./assets/iconrefresh.png' />
          </button>
          <div id='JoinMatchData'>
            <div id='JoinMatchTable'>
              <div className='JoinMatchHeader'>
                <div className='JoinMatchSpan'>Map</div>
                <div className='JoinMatchSpan'>Host</div>
                <div className='JoinMatchSpan'>Players</div>
                <div className='JoinMatchSpan'></div>
              </div>
              <div className='JoinMatchBody'>
                {this.state.liveMatches.map((match) => <JoinMatchData interval={this.pullGames.bind(this)} key={match.matchId} match={match} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  }
}

export default JoinMatch;