import React from 'react';
import { browserHistory } from 'react-router';
import userProfile from '../userProfile.js';
import SelectSkinData from './SelectSkinData.js'

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
    console.log(this.state.skins)
    for(var i = 0; i < userProfile.Skins.length; i++) {
      this.state.skins.push(userProfile.skinsObj[userProfile.Skins[i]])
    }
  }

  render() {
      return (
        <div id='Store'>
          <div id='CreateMatchBackground' >
            <div>
              <h1 id='Title'>Select Skin</h1>
            </div>
            <button id='HOMEButton' className='btn btn-primary' onClick={this.backToHome}>Go Back</button>
            <div id='Skins'>
              {this.state.skins.map((skins) => <SelectSkinData key={skins.skin} skins={skins} />)}
            </div>
          </div>
        </div>
      );   
  }
}



export default SelectSkin;