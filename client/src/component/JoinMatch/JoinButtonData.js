import React from 'react';
const clientScene = require('../../clientScene.js');

var JoinButtonData = props => {
  var JoinGame = function(game) {
	  var screenOverlay = document.getElementById( 'screenOverlay' );
	  var menuContainer = document.getElementById( 'menuContainer' );
    var hud = document.getElementById( 'HUD' );
	  screenOverlay.style.display = '';
    hud.style.display = 'none';
	  document.addEventListener('keydown', function(e) {
      if(e.keyCode === 192) {
      screenOverlay.style.display = '-webkit-box';
      screenOverlay.style.display = '-moz-box';
      screenOverlay.style.display = 'box';
      if(menuContainer.style.display === '') {
    	menuContainer.style.display = 'none';
    	hud.style.display = '';
      document.body.requestPointerLock()
      }else {
      menuContainer.style.display = '';
      hud.style.display = 'none';
      document.exitPointerLock()
      }
		}
	   })

    var button = document.getElementById('resume');
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