import React from 'react';
const clientScene = require('../../clientScene.js');
const sceneUtility = require('../../sceneUtility.js');

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
    document.getElementById('JoinMatchTitle').style.display = 'none';
	  clientScene.joinGame(this);
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