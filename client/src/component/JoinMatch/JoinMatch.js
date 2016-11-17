import React from 'react';

class JoinMatch extends React.Component {
  constructor(props) {
	  super(props);
	  this.state = {
	    user: null
	  };
  }

  backToHome() {
  	document.getElementById('HomeScene').style.display = 'block';
  	document.getElementById('JoinMatch').style.display = 'none';
  }

  render() {
    return (
      <div id='JoinMatchTitle'>
        <h1>Join A Match</h1>
        <button onClick={this.backToHome} className='btn btn-primary'>HOME</button>
      </div>
    );
  	
  }
}



export default JoinMatch;