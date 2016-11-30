import React from 'react';
import MapSelector from './MapSelector.js'
import { browserHistory } from 'react-router';
import userProfile from '../userProfile.js';
import Profile from '../Home/Profile.js';
const clientScene = require('../../clientScene.js');
const sceneUtility = require('../../sceneUtility.js');
const socketUtility = require('../../socketUtility');

class CreateMatch extends React.Component {
  constructor(props) {
	  super(props);
	  this.state = {
	    user: null,
      maps: userProfile.maps,
      mapChoice: userProfile.map,
      mapPreviewPath: userProfile.maps[userProfile.map].thumb
	  };
	  this.backToHome = this.backToHome.bind(this);
  }

  StartMatch(numPlayers) {
    const screenOverlay = document.getElementById( 'screenOverlay' );
    const menuContainer = document.getElementById( 'menuContainer' );
    const hud = document.getElementById( 'HUD' );
    const victoryBox = document.getElementById( 'victoryBox' );
    screenOverlay.style.display = '';
    hud.style.display = 'none';

    //check ~ key for menu
    document.addEventListener('keydown', function(e) {
      if(e.keyCode === 192) {
      screenOverlay.style.display = '-webkit-box';
      screenOverlay.style.display = '-moz-box';
      screenOverlay.style.display = 'box';
        if (menuContainer.style.display === '') {
          menuContainer.style.display = 'none';
          hud.style.display = '';
          document.body.requestPointerLock();
        } else {
          menuContainer.style.display = '';
          hud.style.display = 'none';
          document.exitPointerLock();
        }
      }
    })

    const resume = document.getElementById('resume');
    resume.addEventListener('click', function(e) {
      screenOverlay.style.display = '-webkit-box';
      screenOverlay.style.display = '-moz-box';
      screenOverlay.style.display = 'box';
      if (menuContainer.style.display === '') {
        menuContainer.style.display = 'none';
        hud.style.display = '';
        document.body.requestPointerLock();
      } else {
        menuContainer.style.display = '';
        hud.style.display = 'none';
      }
    });

    const exit = document.getElementById('exit');
    console.log('exit', exit)
    exit.addEventListener('click', function(e) {
      console.log('click')
      screenOverlay.style.display = '-webkit-box';
      screenOverlay.style.display = '-moz-box';
      screenOverlay.style.display = 'box';
      menuContainer.style.display = 'none';
      socketUtility.quitMatch();
      browserHistory.push('GameOver');
    });

    document.getElementById( 'CreateMatchContainer' ).style.display = 'none';
    clientScene.startGame(numPlayers);
  }

  ChooseMap() {
    let map = document.getElementById('MapSelector');
    let background = document.getElementById('selectedMap');
    let start = document.getElementById('StartMatch');

    map.style.display = start.style.display !== 'none' ? 'block' : 'none';
    background.style.display = start.style.display !== 'none' ? 'none' : 'block';
    start.style.display = start.style.display !== 'none' ? 'none' : 'block';
  }

  mapChosen(mapNumber) {
    document.getElementById('MapSelector').style.display = 'none';
    document.getElementById('selectedMap').style.display = 'block';
    document.getElementById('StartMatch').style.display = 'block';
    userProfile.map = mapNumber;
    this.setState({mapChoice: mapNumber});
  }

  backToHome() {
    browserHistory.push('/Home')
  }

  selectSkin() {
    browserHistory.push('/SelectSkin')
  }

  render() {
    return (
      <div id='HomeBackground'>
        <div id='CreateMatchContainer'>
          <div id='Profile'>
            <Profile />
          </div>
          <div id='CreateMatchBackground'>
            <div className='buttonBox'>
              <button className='btn btn-primary homeBtn' onClick={this.backToHome}>◀ Back</button>
              <h1>Create Match</h1>
              <button className='btn btn-warning selectSkinBtn' onClick={this.selectSkin}>Select Skin</button>
            </div>

            <div id='ChooseMap' onClick={this.ChooseMap}>CHOOSE MAP</div>

            <div id='MapSelector'>
              <MapSelector mapChoice={this.state.mapChoice} maps={this.state.maps} click={this.mapChosen.bind(this)} />
            </div>
            <div id='selectedMap' onClick={this.ChooseMap}>
              <img id='selectMapPreview' src={this.state.maps[this.state.mapChoice].thumb} />
              <div>{this.state.maps[this.state.mapChoice].name}</div>
            </div>
            <div id='StartMatch'>
              <button id='Sandbox'className='btn btn-primary' onClick={this.StartMatch.bind(this, 0)}>SANDBOX</button>
              <button id='Start2'className='btn btn-primary' onClick={this.StartMatch.bind(this, 2)}>2 PLAYER MATCH</button>
              <button id='Start4'className='btn btn-primary' onClick={this.StartMatch.bind(this, 4)}>4 PLAYER MATCH</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateMatch;
