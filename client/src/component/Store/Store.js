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
      {skinPic: '../../../textures/skins/SmileyFaceSkin.jpg', skin: '/textures/skins/SmileyFace.jpg', name: 'Big Smile', price: 500},
      {skinPic: '../../../textures/skins/coolGuy.jpg', skin: '/textures/skins/coolGuy.jpg', name: 'Cool Guy', price: 200},
      {skinPic: '../../../textures/skins/smile.jpg', skin: '/textures/skins/smile.jpg', name: 'Smiley', price: 100},
      {skinPic: '../../../textures/skins/silly.jpg', skin: '/textures/skins/silly.jpg', name: 'Silly', price: 50},
      {skinPic: '../../../textures/skins/wink.jpg', skin: '/textures/skins/wink.jpg', name: 'Wink', price: 100},
      {skinPic: '../../../textures/skins/sidewaysSmile.jpg', skin: '/textures/skins/sidewaysSmile.jpg', name: 'Sideways Smile', price: 100},
      {skinPic: '../../../textures/skins/twirlyStache.jpg', skin: '/textures/skins/twirlyStache.jpg', name: 'Twirly Stache', price: 200},
      {skinPic: '../../../textures/skins/googlyStache.jpg', skin: '/textures/skins/googlyStache.jpg', name: 'Googly Stache', price: 300},
      {skinPic: '../../../textures/skins/gangstaStache.jpg', skin: '/textures/skins/gangstaStache.jpg', name: 'Gangsta Stache', price: 400},
      {skinPic: '../../../textures/skins/heisenberg.jpg', skin: '/textures/skins/heisenberg.jpg', name: 'Heisenberg', price: 600},
      {skinPic: '../../../textures/skins/heisenbergHardcorePreview.jpg', skin: '/textures/skins/heisenbergHardcore.jpg', name: 'Hardcore Heisenberg', price: 500},
      {skinPic: '../../../textures/skins/glassesStache.jpg', skin: '/textures/skins/glassesStache.jpg', name: 'Glasses N Stache', price: 500},
      {skinPic: '../../../textures/skins/SoccerBallSkin.jpg', skin: '/textures/skins/soccer2.jpg', name: 'Socer Ball', price: 50},
      {skinPic: '../../../textures/skins/superManSkin.jpg', skin: '/textures/skins/superman.jpg', name: 'Superman', price: 400},
      {skinPic: '../../../textures/skins/batmanSkin.jpg', skin: '/textures/skins/Batman.jpg', name: 'Batman', price: 400},
      {skinPic: '../../../textures/skins/8BallSkin.jpg', skin: '/textures/skins/8ball.jpg', name: '8 Ball', price: 250},
      {skinPic: '../../../textures/skins/CaptainAmericaSkin.jpg', skin: '/textures/skins/CaptainAmerica.jpg', name: 'Captain America', price: 400}
      ],
      experience: 0,
      noFunds: false
	  };
	  this.backToHome = this.backToHome.bind(this);
    this.backToStore = this.backToStore.bind(this);
  }

  backToHome() {
    browserHistory.push('/Home');
  }

  buyExperience() {
    console.log('hello')
  }

  backToStore() {
    this.state.noFunds = false;
    browserHistory.push('Store')
  }

  render() {
    if(this.state.noFunds === true) {
      return (
        <div id='Store'>
          <div id='CreateMatchBackground' >
            <div>
              <h1 id='Title'>Smash Ball Brawl Store</h1>
            </div>
            <button id='HOMEButton' className='btn btn-primary' onClick={this.backToHome}>HOME</button>
            <button id='storeButton' className='btn btn-primary' onClick={this.backToStore}>STORE</button>
            <div id='buyButton'>
              <button className='btn btn-success' onClick={this.buyExperience}>Buy Experience</button>
            </div>
            <div> You have <span> {userProfile.experience}</span> experience</div>
            <div>You dont have enough experience to buy the item. To gain experience play more games or purchase them above.</div>
          </div>
        </div>
      )
    } else {
      return (
        <div id='Store'>
          <div id='CreateMatchBackground' >
            <div>
              <h1 id='Title'>Smash Ball Brawl Store</h1>
            </div>
            <button id='HOMEButton' className='btn btn-primary' onClick={this.backToHome}>HOME</button>
            <div> You have <span> {userProfile.experience}</span> experience</div>
            <div id='Skins'>
              {this.state.skins.map((skins) => <StoreData key={skins.skin} skins={skins} state={this.state}/>)}
            </div>
          </div>
        </div>
      );   
    }

  }
}



export default Store;