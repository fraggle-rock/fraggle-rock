import React from 'react';
const clientScene = require('../../clientScene.js');

var JoinMatchData = props => {
  return (
  <div>
    <div id='JoinMatchGameID'>
     {props.game}
    </div>
    <div id='JoinGameButton'>
    <button onClick={JoinGame.bind(props.game)} className='btn btn-warning'>Join Game</button>
    </div>
  </div>
  )
}

export default JoinMatchData