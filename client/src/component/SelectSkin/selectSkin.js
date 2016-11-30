import React from 'react';
import { browserHistory } from 'react-router';
import userProfile from '../userProfile.js';
import SelectSkinData from './SelectSkinData.js'

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
          <div className='buttonBox'>
            <button className='btn btn-primary homeBtn' onClick={this.backToHome}>◀ Back</button>
            <h1>Select Skin</h1>
          </div>
            <div id='Skins'>
              {userProfile.Skins.length ? userProfile.Skins.map((skins) => <SelectSkinData key={skins.skin} skins={skins} />) : 'Go to the store to buy skins!'}
            </div>
          </div>
        </div>
      );
  }
}



export default SelectSkin;