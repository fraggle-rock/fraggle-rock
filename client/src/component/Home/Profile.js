import React from 'react';
import userProfile from '../userProfile.js';
import { browserHistory } from 'react-router';

class Profile extends React.Component {
  constructor(props) {
	  super(props);
	  this.state = {
	    user: null,
      liveMatches: []
	  };
  }

  signOut() {
    userProfile.User = null;
    userProfile.FacebookPicture = null;
    userProfile.skins = [];
    userProfile.ChosenSkin = null;
    browserHistory.push('/')
  }

  store() {
    browserHistory.push('Store')
  }

  SelectSkin() {
    browserHistory.push('SelectSkin')
  }

  Settings() {
    browserHistory.push('Settings')
  }

  render() {
    return (
      <div id='ProfileHome'>
        <div id='ImgHomeDiv'>
          <img type='image' src={userProfile.FacebookPicture} id='ProfileImgHome' />
        </div>
        <div className='profileBox'>
          <div id='username'>
            {userProfile.User}
          </div>
          <div id='ProfileButtons'>
            <img id='SettingsButton' src='./assets/iconcog.png' className='btn-xs btn-warning' onClick={this.Settings} />
            <img id='storeButtonHome' src='./assets/iconcart.png' className='btn-xs btn-success' onClick={this.store} />
            <button id='SignOut' className='btn-xs btn-primary' onClick={this.signOut}>Sign Out</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;