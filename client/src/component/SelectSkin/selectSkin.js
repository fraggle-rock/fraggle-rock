import React from 'react';
import { browserHistory } from 'react-router';
import userProfile from '../userProfile.js';
import SelectSkinData from './SelectSkinData.js';
import Profile from '../Home/Profile.js';

class SelectSkin extends React.Component {
  constructor(props) {
	  super(props);
	  this.state = {
	    skins: []
	  };
	  this.backToHome = this.backToHome.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this)
  }

  backToHome() {
    browserHistory.goBack();
  }
  
  componentWillMount() {
    for(var i = 0; i < userProfile.Skins.length; i++) {
      this.state.skins.push(userProfile.skinsObj[userProfile.Skins[i]])
    }
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
              {this.state.skins.length ? this.state.skins.map((skin) => <SelectSkinData key={skin.skin} skin={skin} />) : 'Go to the store to buy skins!'}
            </div>
          </div>
        </div>
      );
  }
}



export default SelectSkin;