import React from 'react';
import { browserHistory } from 'react-router';
import userProfile from '../userProfile.js';
import GameOverData from './GameOverData.js';

class GameOver extends React.Component {
  constructor(props) {
	  super(props);
	  this.state = {
	    user: null
	  }
  }
  
  backToHome() {
    window.location.pathname = 'Home'
  }

  render() {
      return (
        <div id='GameOver'>
          <div className='menuContainer'>
            <div className='menuBackground'>
              <h1>Game Over</h1>
              <button className='btn btn-primary GameOverHome' onClick={this.backToHome}>HOME</button>
              <h3 id='PlayerWins'><span>{userProfile.winner}</span> Wins!!!!!</h3>
              <div className='GameOverBox'>
                <h4 className='GameOverUserTitle'>Username</h4>
                <h4 className='GameOverScoreTitle'>Score</h4>
              </div>
              {userProfile.scoreBoard.reverse().map((player) => <GameOverData key={player.username} player={player} />)}
            </div>
          </div>
        </div>
      );

  }
}



export default GameOver;