import React from 'react';
import MapSelector from './MapSelector.js'
import { browserHistory } from 'react-router';
import userProfile from '../userProfile.js';
import SkinSelector from './SkinSelector.js';
import Profile from '../Home/Profile.js';
const clientScene = require('../../clientScene.js');
const sceneUtility = require('../../sceneUtility.js');

class CreateMatch extends React.Component {
  constructor(props) {
	  super(props);
	  this.state = {
	    user: null
	  };
	  this.backToHome = this.backToHome.bind(this);
  }

  StartMatch() {
    const screenOverlay = document.getElementById( 'screenOverlay' );
    const menuContainer = document.getElementById( 'menuContainer' );
    const hud = document.getElementById( 'HUD' );
    const victoryBox = document.getElementById( 'victoryBox' );
    sceneUtility.currentGame = sceneUtility.currentGame || {matchInfo: {clients: {}}};
    const players = Object.keys(sceneUtility.currentGame.matchInfo.clients).length;
    screenOverlay.style.display = '';
    hud.style.display = 'none';
    victoryBox.style.display = 'none';

    document.getElementById('player1Box').style.display = '';
    document.getElementById('player1Name').innerHTML = 'Player 1';

    document.getElementById('player2Box').style.display = players > 1 ? '' : 'none';
    document.getElementById('player2Name').innerHTML = 'Player 2';

    document.getElementById('player3Box').style.display = players > 2 ? '' : 'none';
    document.getElementById('player3Name').innerHTML = 'Player 3';

    document.getElementById('player4Box').style.display = players > 3 ? '' : 'none';
    document.getElementById('player4Name').innerHTML = 'Player 4';

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

    const button = document.getElementById('resume');
    button.addEventListener('click', function(e) {
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

    document.getElementById( 'CreateMatch' ).style.display = 'none';
    clientScene.startGame();
  }

  ChooseMap() {
    document.getElementById('MapSelector').style.display = 'block';
    document.getElementById('DawnMountainCreateBackground').style.display = 'none';
    document.getElementById('StartMatch').style.display = 'none';
  }

  backToHome() {
    browserHistory.push('/Home')
  }

  render() {
    return (
      <div id='HomeBackground'>
        <div id='CreateMatch'>
          <div id='CreateMatchBackground'>
          <h1 id='CreateMatchTitle'>Create Match</h1>
            <div>
              <button id='HomeButtonCreate' className='btn btn-primary' onClick={this.backToHome}>HOME</button>
            </div>
          <div id='ChooseMap'>
            <a id='ChooseMapTitle' onClick={this.ChooseMap}>Choose Map</a>
          </div>
          <div id='MapSelector'>
            <MapSelector />
          </div>
          <div id='DawnMountainCreateBackground'>
            <img id='DawnMountainCreate' src='../../../textures/dawnmountainThumb.jpg' />
            <div>Dawn Mountain</div>
          </div>
          <div id='StartMatch'>
            <button id='Start'className='btn btn-primary' onClick={this.StartMatch}>START MATCH</button>
          </div>
        </div>
        <div id='Profile'>
          <Profile />
        </div>
        </div>
      </div>
    );

  }
}

export default CreateMatch;
