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

  HighSettings() {
    userProfile.graphics = 2;
    browserHistory.push('Home')
  }

  MedSettings() {
    userProfile.graphics = 1;
    browserHistory.push('Home')
  }

  LowSettings() {
    userProfile.graphics = 0;
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
              <div id='HighSettings'>
                <button className='btn btn-success' onClick={this.HighSettings}>High</button>
              </div>
              <div id='MedSettings'>
                <button className='btn btn-warning' onClick={this.MedSettings}>Medium</button>
              </div>
              <div id='LowSettings'>
                <button className='btn btn-danger' onClick={this.LowSettings}>Low</button>
              </div>
            </div>
          </div>
        </div>
      );
  }
}



export default Settings;