import React from 'react';
import MapSelector from './MapSelector.js'
const clientScene = require('../../clientScene.js');

class CreateMatch extends React.Component {
  constructor(props) {
	  super(props);
	  this.state = {
	    user: null
	  };
	  this.backToHome = this.backToHome.bind(this);
  }

  StartMatch() {
    var screenOverlay = document.getElementById( 'screenOverlay' );
    var menuContainer = document.getElementById( 'menuContainer' );
    screenOverlay.style.display = '';
    document.addEventListener('keydown', function(e) {
     if(e.keyCode === 16) {
     screenOverlay.style.display = '-webkit-box';
     screenOverlay.style.display = '-moz-box';
     screenOverlay.style.display = 'box';
     if(menuContainer.style.display === '') {
      menuContainer.style.display = 'none';
      document.body.requestPointerLock()  
     }else {
      menuContainer.style.display = '';
      document.exitPointerLock()
     }   
      }
    })
    
    var button = document.getElementById('resume');
    button.addEventListener('click', function(e) {
     screenOverlay.style.display = '-webkit-box';
     screenOverlay.style.display = '-moz-box';
     screenOverlay.style.display = 'box';
     if(menuContainer.style.display === '') {
       menuContainer.style.display = 'none';
       document.body.requestPointerLock()  
     }else {
       menuContainer.style.display = '';
     }   
    })

    document.getElementById( 'CreateMatch' ).style.display = 'none'; 
    clientScene.startGame();
  }

  ChooseMap() {
  	console.log('hello')
    document.getElementById('MapSelector').style.display = 'block';
    document.getElementById('DawnMountainCreateBackground').style.display = 'none';
  }

  backToHome() {
    console.log(this)
    window.test = this;
  	document.getElementById('HomeScene').style.display = 'block';
  	document.getElementById('CreateMatch').style.display = 'none';
  }

  render() {
    return (
      <div>
        <h1 id='CreateMatchTitle'>Create Match</h1>
        <img id='CreateMatchBackground' src='https://images.template.net/wp-content/uploads/2015/08/Fantastic-Free-Grey-background-for-You.png' />
        <div>
          <div>
            <button id='HOMEButton' className='btn btn-primary' onClick={this.backToHome}>HOME</button>
          </div>
          <div id='ChooseMap'>
            <a onClick={this.ChooseMap}>Choose Map</a>
          </div>
          <div id='MapSelector'>
            <MapSelector />
          </div>
          <div id='DawnMountainCreateBackground'>
            <img id='DawnMountainCreate' src='../../../textures/dawnmountain-xpos.png' />
            <div>Dawn Mountain</div>
          </div>
          <button id='StartMatch' className='btn btn-primary' onClick={this.StartMatch}>START MATCH</button>
        </div>
      </div>
    );
  	
  }
}



export default CreateMatch;
