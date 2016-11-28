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
      {skinPic: '../../../textures/skins/SmileyFacePreview.jpg', skin: '/textures/skins/SmileyFace.jpg', name: 'Big Smile'},
      {skinPic: '../../../textures/skins/coolGuyPreview.jpg', skin: '/textures/skins/coolGuy.jpg', name: 'Cool Guy'},
      {skinPic: '../../../textures/skins/smilePreview.jpg', skin: '/textures/skins/smile.jpg', name: 'Smiley'},
      {skinPic: '../../../textures/skins/sillyPreview.jpg', skin: '/textures/skins/silly.jpg', name: 'Silly'},
      {skinPic: '../../../textures/skins/winkPreview.jpg', skin: '/textures/skins/wink.jpg', name: 'Wink'},
      {skinPic: '../../../textures/skins/sidewaysSmilePreview.jpg', skin: '/textures/skins/sidewaysSmile.jpg', name: 'Sideways Smile'},
      {skinPic: '../../../textures/skins/twirlyStachePreview.jpg', skin: '/textures/skins/twirlyStache.jpg', name: 'Twirly Stache'},
      {skinPic: '../../../textures/skins/googlyStachePreview.jpg', skin: '/textures/skins/googlyStache.jpg', name: 'Googly Stache'},
      {skinPic: '../../../textures/skins/gangstaStachePreview.jpg', skin: '/textures/skins/gangstaStache.jpg', name: 'Gangsta Stache'},
      {skinPic: '../../../textures/skins/heisenbergPreview.jpg', skin: '/textures/skins/heisenberg.jpg', name: 'Heisenberg'},
      {skinPic: '../../../textures/skins/heisenbergHardcorePreview.jpg', skin: '/textures/skins/heisenbergHardcore.jpg', name: 'Hardcore Heisenberg'},
      {skinPic: '../../../textures/skins/glassesStachePreview.jpg', skin: '/textures/skins/glassesStache.jpg', name: 'Glasses N Stache'},
      {skinPic: '../../../textures/skins/SoccerBallPreview.jpg', skin: '/textures/skins/soccer.jpg', name: 'Soccer Ball'},
      {skinPic: '../../../textures/skins/superManPreview.jpg', skin: '/textures/skins/superman.jpg', name: 'Superman'},
      {skinPic: '../../../textures/skins/batmanPreview.jpg', skin: '/textures/skins/Batman.jpg', name: 'Batman'},
      {skinPic: '../../../textures/skins/8BallPreview.jpg', skin: '/textures/skins/8ball.jpg', name: '8 Ball'},
      {skinPic: '../../../textures/skins/CaptainAmericaPreview.jpg', skin: '/textures/skins/CaptainAmerica.jpg', name: 'Captain America'}
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