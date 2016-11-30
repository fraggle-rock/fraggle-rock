import React from 'react';
import { browserHistory } from 'react-router';
import userProfile from '../userProfile.js';
import SelectSkinData from './SelectSkinData.js';
import Profile from '../Home/Profile.js';

class SelectSkin extends React.Component {
  constructor(props) {
	  super(props);
	  this.state = {
	    user: null,
	  };
	  this.backToHome = this.backToHome.bind(this);
  }

  backToHome() {
    browserHistory.goBack();
  }

  render() {
      return (
        <div id='Store'>
          <div id='CreateMatchBackground' >
            <div id='Profile'>
              <Profile />
            </div>
            <div className='buttonBox'>
              <button className='btn btn-primary homeBtn' onClick={this.backToHome}>◀ Back</button>
              <h1>Select Skin</h1>
            </div>
            <div id='Skins'>
              {userProfile.Skins.length ? userProfile.Skins.map((skin) => <SelectSkinData key={skin.skin} skin={skin} />) : 'Go to the store to buy skins!'}
            </div>
          </div>
        </div>
      );
  }
}



export default SelectSkin;