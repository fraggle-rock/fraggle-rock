import React from 'react';
import { browserHistory } from 'react-router';
import userProfile from '../userProfile.js';

class GameOver extends React.Component {
  constructor(props) {
	  super(props);
	  this.state = {
	    user: null
	  };
  }

  backToHome() {
    browserHistory.push('/Home')
  }

  render() {
      return (
        <div id='GameOver'>
          <div className='menuContainer'>
            <div className='menuBackground'>
              <h1>Game Over</h1>
              <button className='btn-primary GameOverHome' onClick={this.backToHome}>HOME</button>
              <h3 id='PlayerWins'><span>{userProfile.winner}</span> Wins!!!!!</h3>
            </div>
          </div>
        </div>
      );

  }
}



export default GameOver;