import React from 'react';
import { browserHistory } from 'react-router';
import userProfile from '../userProfile.js';
import StoreData from './StoreData.js';

class Store extends React.Component {
  constructor(props) {
	  super(props);
	  this.state = {
	    user: null,
      skins: [
      {skinPic: '../../../textures/skins/batmanSkin.jpg', skin: '/textures/skins/Batman.jpg', name: 'Batman'},
      {skinPic: '../../../textures/skins/8BallSkin.jpg', skin: '/textures/skins/8ball.jpg', name: '8 Ball'},
      {skinPic: '../../../textures/skins/CaptainAmericaSkin.jpg', skin: '/textures/skins/CaptainAmerica.jpg', name: 'Captain America'},
      {skinPic: '../../../textures/skins/SmileyFaceSkin.jpg', skin: '/textures/skins/SmileyFace.jpg', name: 'Smiley Face'},
      {skinPic: '../../../textures/skins/SoccerBallSkin.jpg', skin: '/textures/skins/soccer2.jpg', name: 'Socer Ball'},
      {skinPic: '../../../textures/skins/superManSkin.jpg', skin: '/textures/skins/superman.jpg', name: 'Superman'},
      {skinPic: '../../../textures/skins/coolGuy.jpg', skin: '/textures/skins/coolGuy.jpg', name: 'Cool Guy'},
      {skinPic: '../../../textures/skins/smile.jpg', skin: '/textures/skins/smile.jpg', name: 'Smile'},
      {skinPic: '../../../textures/skins/silly.jpg', skin: '/textures/skins/silly.jpg', name: 'Silly'},
      {skinPic: '../../../textures/skins/sidewaysSmile.jpg', skin: '/textures/skins/sidewaysSmile.jpg', name: 'Sideways Smile'},
      {skinPic: '../../../textures/skins/twirlyStache.jpg', skin: '/textures/skins/twirlyStache.jpg', name: 'Twirly Stache'},
      {skinPic: '../../../textures/skins/googlyStache.jpg', skin: '/textures/skins/googlyStache.jpg', name: 'Googly Stache'},
      {skinPic: '../../../textures/skins/gangstaStache.jpg', skin: '/textures/skins/gangstaStache.jpg', name: 'Gangsta Stache'},
      {skinPic: '../../../textures/skins/heisenberg.jpg', skin: '/textures/skins/heisenberg.jpg', name: 'Heisenberg'},
      {skinPic: '../../../textures/skins/wink.jpg', skin: '/textures/skins/wink.jpg', name: 'Wink'}
      ]
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