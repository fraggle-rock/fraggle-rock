import React from 'react';
import MapSelector from './MapSelector.js'
import { browserHistory } from 'react-router';
const clientScene = require('../../clientScene.js');

class CreateMatch extends React.Component {
  constructor(props) {
	  super(props);
	  this.state = {
	    user: null
	  };
	  this.backToHome = this.backToHome.bind(this);
  }

  StartMatch() {
    var screenOverlay = document.getElementById( 'screenOverlay' );
    var menuContainer = document.getElementById( 'menuContainer' );
    screenOverlay.style.display = '';
    document.addEventListener('keydown', function(e) {
     if(e.keyCode === 16) {
     screenOverlay.style.display = '-webkit-box';
     screenOverlay.style.display = '-moz-box';
     screenOverlay.style.display = 'box';
     if(menuContainer.style.display === '') {
      menuContainer.style.display = 'none';
      document.body.requestPointerLock()  
     }else {
      menuContainer.style.display = '';
      document.exitPointerLock()
     }   
      }
    })
    
    var button = document.getElementById('resume');
    button.addEventListener('click', function(e) {
     screenOverlay.style.display = '-webkit-box';
     screenOverlay.style.display = '-moz-box';
     screenOverlay.style.display = 'box';
     if(menuContainer.style.display === '') {
       menuContainer.style.display = 'none';
       document.body.requestPointerLock()  
     }else {
       menuContainer.style.display = '';
     }   
    })

    document.getElementById( 'CreateMatch' ).style.display = 'none'; 
    clientScene.startGame();
  }

  ChooseMap() {
    document.getElementById('MapSelector').style.display = 'block';
    document.getElementById('DawnMountainCreateBackground').style.display = 'none';
  }

  backToHome() {
    browserHistory.push('/Home')
  }

  render() {
    return (
      <div>
        <img id='HomeBackground' src='https://files.slack.com/files-tmb/T17PD5LF2-F33L30LB0-d679fde7e5/screen_shot_2016-11-15_at_12.28.35_pm_720.png' />
        <div id='CreateMatch'>
          <h1 id='CreateMatchTitle'>Create Match</h1>
          <div id='CreateMatchBackground'/>
          <div>
            <div>
              <button id='HOMEButton' className='btn btn-primary' onClick={this.backToHome}>HOME</button>
            </div>
            <div id='ChooseMap'>
              <a id='ChooseMapTitle' onClick={this.ChooseMap}>Choose Map</a>
            </div>
            <div id='MapSelector'>
              <MapSelector />
            </div>
            <div id='DawnMountainCreateBackground'>
              <img id='DawnMountainCreate' src='../../../textures/dawnmountain-xpos.png' />
              <div>Dawn Mountain</div>
            </div>
            <button id='StartMatch' className='btn btn-warning' onClick={this.StartMatch}>START MATCH</button>
          </div>
        </div>
      </div>
    );
  	
  }
}



export default CreateMatch;
