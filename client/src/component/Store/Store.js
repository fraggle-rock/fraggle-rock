import React from 'react';
import { browserHistory } from 'react-router';
import userProfile from '../userProfile.js';
import StoreData from './StoreData.js';

class Store extends React.Component {
  constructor(props) {
	  super(props);
	  this.state = {
	    user: null,
      skins: [{skinPic: '../../../textures/skins/batmanSkin.png', skin: '/textures/skins/Batman.jpg', name: 'Batman'}, {skinPic: '../../../textures/skins/8BallSkin.png', skin: '/textures/skins/8ball.png', name: '8 Ball'}, {skinPic: '../../../textures/skins/CaptainAmericaSkin.png', skin: '/textures/skins/CaptainAmerica.jpg', name: 'Captain America'}, {skinPic: '../../../textures/skins/SmileyFaceSkin.png', skin: '/textures/skins/SmileyFace.jpg', name: 'Smiley Face'}, {skinPic: '../../../textures/skins/SoccerBallSkin.png', skin: '/textures/skins/SoccerBall.png', name: 'Socer Ball'}, {skinPic: '../../../textures/skins/superManSkin.png', skin: '/textures/skins/superman.jpg', name: 'Superman'}, {skinPic: '../../../textures/skins/StacheSkin.png', skin: '/textures/skins/Stache.jpeg', name: 'Stache'}]
	  };
	  this.backToHome = this.backToHome.bind(this);
  }

  backToHome() {
    browserHistory.push('/Home');
  }

  render() {
    return (
      <div id='Store'>
        <div id='CreateMatchBackground' >
          <div>
            <h1 id='Title'>Smash Ball Brawl Store</h1>
          </div>
          <button id='HOMEButton' className='btn btn-primary' onClick={this.backToHome}>HOME</button>
          <div id='Skins'>
            {this.state.skins.map((skins) => <StoreData skins={skins} />)}
          </div>
        </div>
      </div>
    );

  }
}



export default Store;