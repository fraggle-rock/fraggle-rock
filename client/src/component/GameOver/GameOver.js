import React from 'react';
import { browserHistory } from 'react-router';
import userProfile from '../userProfile.js';
import GameOverData from './GameOverData.js';
import Profile from '../Home/Profile.js';

class GameOver extends React.Component {
  constructor(props) {
	  super(props);

    this.state = {
	    user: null,
      highScore: 0,
	  }

    userProfile.scoreBoard.forEach((player) => {
      if (player.score > this.state.highScore) {
        this.setState((prevState) => {
          highScore: player.score
        });
      }
    });
  }

  backToHome() {
    browserHistory.push('/Home')
  }

  render() {
      return (
        <div id='GameOver'>
          <div className='menuContainer'>
            <div id='Profile'>
              <Profile />
            </div>
            <div className='menuBackground'>
              <div className='buttonBox'>
                <h1>Results</h1>
              </div>
              <div id='PlayerWins'>{userProfile.winner} wins!!!!!</div>
              <div className='GameOverBox'>
                {userProfile.scoreBoard.map((player, i) => <GameOverData key={player.username}  player={player} i={i} highScore={this.state.highScore} />)}
              </div>
              <button className='btn btn-success playAgainBtn' onClick={this.backToHome}>Play Again ▶</button>
            </div>
          </div>
        </div>
      );

  }
}



export default GameOver;