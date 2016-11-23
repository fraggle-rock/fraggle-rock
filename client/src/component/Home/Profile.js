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
    browserHistory.push('/Store')
  }

  profile() {
    //add Profile Component Route here
  }

  render() {
    if(userProfile.User !== 'Guest'){
      return (
        <div id='ProfileHome'>
          <div id='ImgHomeDiv'>
            <input type="image" src={userProfile.FacebookPicture} onClick={this.profile} name="saveForm" className="btTxt submit" id="ProfileImgHome" />
          </div>
          <div id='username'>
            {userProfile.User}
          </div>
          <div id='ProfileButtons'>
            <div id='SignOut'>
              <button className='btn-xs btn-primary' onClick={this.signOut}>Sign Out</button>
            </div>
            <div id='storeButtonHome'>
              <button className='btn-xs btn-success' onClick={this.store}><span className='glyphicon glyphicon-shopping-cart' /></button>
            </div>
            <div id='SelectSkin'>
              <button className='btn-xs btn-warning' onClick={this.store}>Select a Skin</button>
            </div>
          </div>
        </div>
      );    
    } else {
      return (
        <div id='ProfileHome'>
          <div id='ImgHomeDiv'>
            <img id='ProfileImgHome2' src={userProfile.FacebookPicture} />
          </div>
          <div id='username2'>
            {userProfile.User}
          </div>
          <div id='ProfileButtons'>
            <div id='SignOut'>
              <button className='btn-xs btn-primary' onClick={this.signOut}>Sign Out</button>
            </div>
          </div>
        </div>
      );    
    }

  }
}

export default Profile;