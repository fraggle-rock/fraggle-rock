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
    browserHistory.push('/Home');
  }

  render() {
      return (
        <div id='Store'>
          <div id='CreateMatchBackground' >
            <div>
              <h1 id='Title'>Select Skin</h1>
            </div>
            <button id='HOMEButton' className='btn btn-primary' onClick={this.backToHome}>HOME</button>
            <div id='Skins'>
              {userProfile.Skins.map((skins) => <SelectSkinData key={skins.skin} skins={skins} />)}
            </div>
          </div>
        </div>
      );   
  }
}



export default SelectSkin;