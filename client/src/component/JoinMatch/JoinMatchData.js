import React from 'react';
const clientScene = require('../../clientScene.js');

var JoinMatchData = props => {
  var JoinGame = function(game) {
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
	 
    document.getElementById( 'JoinMatchTitle' ).style.display = 'none';
	  clientScene.joinGame(this);
  }

  return (
	<div id='JoinGame'>
	  <div id='JoinMatchGameID'>
	   {props.games}
	  </div>
	  <div id='JoinGameButton'>
		<button onClick={JoinGame.bind(props.games)} className='btn btn-warning'>Join Game</button>
	  </div>
	</div>
  )   
}

export default JoinMatchData