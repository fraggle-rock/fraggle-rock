import React from 'react';
import { browserHistory } from 'react-router';
import userProfile from '../userProfile.js';

class Settings extends React.Component {
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

  click(btn) {
    userProfile.graphics = btn;
    browserHistory.push('Home')
  }

  render() {
      return (
        <div id='Store'>
          <div id='CreateMatchBackground' >
            <div>
              <h1 id='Title'>Settings</h1>
            </div>
            <button id='HOMEButton' className='btn btn-primary' onClick={this.backToHome}>HOME</button>
            <h3>Choose Graphics Quality</h3>
            <div id='SettingsButtons'>
              <button className={'btn btn-danger gfxBtn ' + (userProfile.graphics === 0 ? 'gfxBtnActive' : '')} onClick={() => this.click(0)}>Low</button>
              <button className={'btn btn-warning gfxBtn ' + (userProfile.graphics === 1 ? 'gfxBtnActive' : '')} onClick={() => this.click(1)}>Medium</button>
              <button className={'btn btn-success gfxBtn ' + (userProfile.graphics === 2 ? 'gfxBtnActive' : '')} onClick={() => this.click(2)}>High</button>
            </div>
          </div>
        </div>
      );
  }
}



export default Settings;