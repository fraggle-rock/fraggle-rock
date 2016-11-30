import React from 'react';
import { browserHistory } from 'react-router';
const clientScene = require('../../clientScene.js');
const sceneUtility = require('../../sceneUtility.js');
const socketUtility = require('../../socketUtility');

const JoinButtonData = props => {
  const JoinGame = function(game) {
    const screenOverlay = document.getElementById( 'screenOverlay' );
    const menuContainer = document.getElementById( 'menuContainer' );
    const hud = document.getElementById( 'HUD' );
    const victoryBox = document.getElementById( 'victoryBox' );
    sceneUtility.currentGame = sceneUtility.currentGame || {matchInfo: {clients: {}}};
    const players = Object.keys(sceneUtility.currentGame.matchInfo.clients).length;
    screenOverlay.style.display = '';
    hud.style.display = 'none';

    const showMenu = (e) => {
      if (e.keyCode === 192) {
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
   }

    //check ~ key for menu
	  document.addEventListener('keydown', showMenu);

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
    document.getElementById('JoinMatchTitle').style.display = 'none';

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
	  clientScene.joinGame(this, showMenu);
  }

  return (
  	<div id='JoinGameButton'>
  	  <span>
  		  <button onClick={JoinGame.bind(props.games)} className='btn btn-warning'>Join Game</button>
  	  </span>
  	</div>
  )
}

export default JoinButtonData