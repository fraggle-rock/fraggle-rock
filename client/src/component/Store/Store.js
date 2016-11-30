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
      {skinPic: '../../../textures/skins/SmileyFacePreview.jpg', skin: '/textures/skins/SmileyFace.jpg', name: 'Big Smile', price: 500},
      {skinPic: '../../../textures/skins/coolGuyPreview.jpg', skin: '/textures/skins/coolGuy.jpg', name: 'Cool Guy', price: 200},
      {skinPic: '../../../textures/skins/smilePreview.jpg', skin: '/textures/skins/smile.jpg', name: 'Smiley', price: 100},
      {skinPic: '../../../textures/skins/sillyPreview.jpg', skin: '/textures/skins/silly.jpg', name: 'Silly', price: 50},
      {skinPic: '../../../textures/skins/winkPreview.jpg', skin: '/textures/skins/wink.jpg', name: 'Wink', price: 100},
      {skinPic: '../../../textures/skins/sidewaysSmilePreview.jpg', skin: '/textures/skins/sidewaysSmile.jpg', name: 'Sideways Smile', price: 100},
      {skinPic: '../../../textures/skins/twirlyStachePreview.jpg', skin: '/textures/skins/twirlyStache.jpg', name: 'Twirly Stache', price: 200},
      {skinPic: '../../../textures/skins/googlyStachePreview.jpg', skin: '/textures/skins/googlyStache.jpg', name: 'Googly Stache', price: 300},
      {skinPic: '../../../textures/skins/gangstaStachePreview.jpg', skin: '/textures/skins/gangstaStache.jpg', name: 'Gangsta Stache', price: 400},
      {skinPic: '../../../textures/skins/heisenbergPreview.jpg', skin: '/textures/skins/heisenberg.jpg', name: 'Heisenberg', price: 300},
      {skinPic: '../../../textures/skins/heisenbergHardcorePreview.jpg', skin: '/textures/skins/heisenbergHardcore.jpg', name: 'Hardcore', price: 500},
      {skinPic: '../../../textures/skins/glassesStachePreview.jpg', skin: '/textures/skins/glassesStache.jpg', name: 'Glasses N Stache', price: 500},
      {skinPic: '../../../textures/skins/SoccerBallPreview.jpg', skin: '/textures/skins/soccer.jpg', name: 'Socer Ball', price: 50},
      {skinPic: '../../../textures/skins/superManPreview.jpg', skin: '/textures/skins/superman.jpg', name: 'Superman', price: 400},
      {skinPic: '../../../textures/skins/batmanPreview.jpg', skin: '/textures/skins/Batman.jpg', name: 'Batman', price: 400},
      {skinPic: '../../../textures/skins/8BallPreview.jpg', skin: '/textures/skins/8ball.jpg', name: '8 Ball', price: 250},
      {skinPic: '../../../textures/skins/CaptainAmericaPreview.jpg', skin: '/textures/skins/CaptainAmerica.jpg', name: 'Captain America', price: 400},
      {skinPic: '../../../textures/Skins/hat.jpg', skin: 'ha2.obj', name: 'The Hat', price: 1500, type: 'hat'}
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

  }

  backToStore() {
    this.state.noFunds = false;
    browserHistory.push('Store')
  }

  render() {
    if (this.state.noFunds === true) {
      return (
        <div id='Store'>
          <div id='CreateMatchBackground' >
            <div className='buttonBox'>
              <button className='btn btn-primary homeBtn' onClick={this.backToStore}>◀ Back</button>
              <h1>Smash Ball Store</h1>
            </div>
            <div className='storeStars'>You have {userProfile.experience}✪</div>
            <div id='buyButton'>
              <button className='btn btn-danger' onClick={this.buyExperience}>Buy ✪</button>
            </div>
            <p>You dont have enough ✪ to buy this item!</p>
            <p>You can gain ✪ by playing more games or by purchasing them above.</p>
          </div>
        </div>
      )
    } else {
      return (
        <div id='Store'>
          <div id='CreateMatchBackground' >
            <div className='buttonBox'>
              <button className='btn btn-primary homeBtn' onClick={this.backToHome}>◀ Back</button>
              <h1>Smash Ball Store</h1>
            </div>
            <div className='storeStars'> You have {userProfile.experience}✪</div>
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