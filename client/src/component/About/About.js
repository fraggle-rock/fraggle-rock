import React from 'react';
import { browserHistory } from 'react-router';
import Profile from '../Home/Profile.js';
import userProfile from '../userProfile.js';

class About extends React.Component {
  constructor(props) {
	  super(props);
	  this.state = {
	    user: null
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
            browserHistory.push('About')
          },
          error: (error) => {
            console.log(error)
          }
        })
      }
    }
  }

  backToHome() {
    browserHistory.push('/Home');
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
            <h1>Instructions</h1>
          </div>
          <h2>The Goal</h2>
          <div className='descBox'>The goal of the game is to knock your opponent off the map. Gain ✪ to buy skins by hitting opponents and surviving as long as you can!</div>
          <h2>Controls</h2>
          <div className='aboutBoxContainer'>
            <div className='aboutBox'>
              <img className='wasd' src='./textures/wasd.png' />
            </div>
            <div className='aboutBox'>
              <div>W: Move Foward</div>
              <div>A: Move Left</div>
              <div>S: Move Back</div>
              <div>D: Move Right</div>
            </div>
            <div className='aboutBox'>
              <div>Space: Jump</div>
              <div>Click: Shoot Ball</div>
            </div>
          </div>
          <div className='aboutMenu'> ~ Brings Up In Game Menu</div>
        </div>
      </div>
    );

  }
}

export default About;