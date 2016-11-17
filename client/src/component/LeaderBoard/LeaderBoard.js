import React from 'react';

class LeaderBoard extends React.Component {
  constructor(props) {
	  super(props);
	  this.state = {
	    user: null
	  };
	  this.backToHome = this.backToHome.bind(this);
  }

  backToHome() {
  	document.getElementById('HomeScene').style.display = 'block';
  	document.getElementById('LeaderBoard').style.display = 'none';
  }

  render() {
    return (
      <div>
        <h1 id='LeaderBoardTitle'>Smash Ball Brawl Leaderboard</h1>
        <button id='HOMEButton' className='btn btn-primary' onClick={this.backToHome}>HOME</button>
      </div>
    );
  	
  }
}



export default LeaderBoard;
