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
    setInterval(() => {
      if (!this.state.refresh) {
        $.ajax({
          url: '/api/liveGames',
          method: 'GET',
          success: (data) => {
            const physicsServers = JSON.parse(data);
            const liveMatches = [];
            for (var url in physicsServers) {
              const server = physicsServers[url];
              if (server !== 'empty' && Object.keys(server.clients).length !== server.maxPlayers && Object.keys(server.clients).length < 6) {
                server.url = url;
                liveMatches.push(server)
              }
            }
            this.setState({liveMatches: liveMatches})
          }
        });
      }
    }, 2000);
  }

  backToHome() {
    browserHistory.push('/Home');
  }

  selectSkin() {
    browserHistory.push('/SelectSkin')
  }

  refresh() {
    if (!this.state.refresh) {
      this.setState({refresh: true});
      $.ajax({
        url: '/api/liveGames',
        method: 'GET',
        success: (data) => {
          this.setState({liveMatches: JSON.parse(data)});
          setTimeout(() => {
            this.setState({refresh: false})
          }, 1000);
        }
      });
    }
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
          <button className='btn-md btn-primary btn-refresh' onClick={this.refresh.bind(this)}>
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
                {this.state.liveMatches.map((match) => <JoinMatchData key={match.url} match={match} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  }
}

export default JoinMatch;