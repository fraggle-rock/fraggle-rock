import React from 'react';
import { browserHistory } from 'react-router';
import userProfile from '../userProfile.js'

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
        <div>
         <h1>Game Over</h1>
         <button className='btn-primary' onClick={this.backToHome}>HOME</button>
        </div>
      );

  }
}



export default GameOver;