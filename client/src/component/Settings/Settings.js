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

  clickGfx(btn) {
    userProfile.graphics = btn;
    browserHistory.push('Home');
  }

  clickSound(btn) {
    userProfile.sound = btn;
    browserHistory.push('Home');
  }

  render() {
      return (
        <div id='Store'>
          <div id='CreateMatchBackground' >
            <div>
              <h1 id='Title'>Settings</h1>
            </div>
            <button id='HOMEButton' className='btn btn-primary' onClick={this.backToHome}>HOME</button>
            <div className='SettingsButtons'>
              <h3>Graphics Quality</h3>
              <button className={'btn gfxBtn ' + (userProfile.graphics === 0 ? 'btn-success' : '')} onClick={() => this.clickGfx(0)}>Low</button>
              <button className={'btn gfxBtn ' + (userProfile.graphics === 1 ? 'btn-success' : '')} onClick={() => this.clickGfx(1)}>Medium</button>
              <button className={'btn gfxBtn ' + (userProfile.graphics === 2 ? 'btn-success' : '')} onClick={() => this.clickGfx(2)}>High</button>
            </div>

            <div className='SettingsButtons'>
              <h3>Sound</h3>
              <button className={'btn gfxBtn ' + (userProfile.sound === 1 ? 'btn-success' : '')} onClick={() => this.clickSound(1)}>On</button>
              <button className={'btn gfxBtn ' + (userProfile.sound === 0 ? 'btn-success' : '')} onClick={() => this.clickSound(0)}>Off</button>
            </div>
          </div>
        </div>
      );
  }
}



export default Settings;