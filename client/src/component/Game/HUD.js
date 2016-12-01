import React from 'react';
import { browserHistory } from 'react-router';
import userProfile from '../userProfile';
import GameOver from '../GameOver/GameOver';
const clientScene = require('../../clientScene.js');
const sceneUtility = require('../../sceneUtility.js');
const socketUtility = require('../../socketUtility');

class HUD extends React.Component {
  constructor(props) {
	  super(props);
	  this.state = {
	  };
  }

  componentDidMount() {
    const screenOverlay = document.getElementById( 'screenOverlay' );
    const menuContainer = document.getElementById( 'menuContainer' );
    const hud = document.getElementById( 'HUD' );
    const victoryBox = document.getElementById( 'victoryBox' );
    screenOverlay.style.display = '-webkit-box';
    screenOverlay.style.display = '-moz-box';
    screenOverlay.style.display = 'box';
    menuContainer.style.display = '';
    hud.style.display = 'none';

    //check ~ key for menu
    $(document).on('keydown', (e) => {
      console.log('menu')
      if (e.keyCode === 192) {
        const hud = document.getElementById( 'HUD' );
        const menuContainer = document.getElementById( 'menuContainer' );
        screenOverlay.style.display = '-webkit-box';
        screenOverlay.style.display = '-moz-box';
        screenOverlay.style.display = 'box';

        if (menuContainer.style.display === '') {
          menuContainer.style.display = 'none';
          hud.style.display = '';
          document.body.requestPointerLock();
        } else {
          menuContainer.style.display = '';
          hud.style.display = 'none';
          document.exitPointerLock();
        }
      }
    });
  }

  resume() {
    document.getElementById( 'menuContainer' ).style.display = 'none';
    document.getElementById( 'HUD' ).style.display = '';
    document.body.requestPointerLock();
  }

  exit() {
    document.getElementById( 'menuContainer' ).style.display = 'none';
    socketUtility.quitMatch();
    $(document).off();
    userProfile.matchId = null;
    browserHistory.push('GameOver');
  }


  render() {
    return (
      <div id="screenOverlay">
        <div id="victoryBox">
          <div>GAME OVER</div>
          <div id="victor"></div>
        </div>

        <div id="HUD">

          <div className="playerBoxContainer">
            <div className="player1 playerBox" id="player1Box">
              <img src="./textures/playerRedHealth.png" className="playerPic" />
              <div className="playerLives">
                <img className="player1 life3" id="player1life3" src="./textures/playerhealthheart.png" />
                <img className="player1 life2" id="player1life2" src="./textures/playerhealthheart.png" />
                <img className="player1 life1" id="player1life1" src="./textures/playerhealthheart.png" />
              </div>
              <div className="player1 playerNameBox">
                <div className="playerName" id="player1Name">Player 1</div>
              </div>
            </div>

            <div className="player2 playerBox" id="player2Box">
              <img src="./textures/playerBlueHealth.png" className="playerPic" />
              <div className="playerLives">
                <img className="player2 life3" id="player2life3" src="./textures/playerhealthheart.png" />
                <img className="player2 life2" id="player2life2" src="./textures/playerhealthheart.png" />
                <img className="player2 life1" id="player2life1" src="./textures/playerhealthheart.png" />
              </div>
              <div className="player2 playerNameBox">
                <div className="playerName" id="player2Name">Player 2</div>
              </div>
            </div>

            <div className="player3 playerBox" id="player3Box">
              <img src="./textures/playerGreenHealth.png" className="playerPic" />
              <div className="playerLives">
                <img className="player3 life3" id="player3life3" src="./textures/playerhealthheart.png" />
                <img className="player3 life2" id="player3life2" src="./textures/playerhealthheart.png" />
                <img className="player3 life1" id="player3life1" src="./textures/playerhealthheart.png" />
              </div>
              <div className="player3 playerNameBox">
                <div className="playerName" id="player3Name">Player 3</div>
              </div>
            </div>

            <div className="player4 playerBox" id="player4Box">
              <img src="./textures/playerPinkHealth.png" className="playerPic" />
              <div className="playerLives">
                <img className="player4 life3" id="player4life3" src="./textures/playerhealthheart.png" />
                <img className="player4 life2" id="player4life2" src="./textures/playerhealthheart.png" />
                <img className="player4 life1" id="player4life1" src="./textures/playerhealthheart.png" />
              </div>
              <div className="player4 playerNameBox">
                <div className="playerName" id="player4Name">Player 4</div>
              </div>
            </div>

          </div>

          <div className="crosshairContainer">
            <div className="jumpBox">
              <div id="jump3"></div>
              <div id="jump2"></div>
              <div id="jump1"></div>
            </div>
            <img id="crosshair" src="./textures/crosshair.png" />
            <div className="ammoBox">
              <div id="ammo3"></div>
              <div id="ammo2"></div>
              <div id="ammo1"></div>
            </div>
          </div>
        </div>

        <div id="menuContainer">
          <div className="menu-title"><img src='./textures/logotext.png'/></div>
          <div className="menu">
            <div>
              <div className="menu-name">MENU</div>
              <div id="resume" onClick={this.resume.bind(this)}>PLAY</div>
              <div id="exit" onClick={this.exit.bind(this)}>EXIT</div>
              <div className="menu-descr"> Press ~ In Game To See Menu</div>
            </div>
          </div>
          <div className="version">v0.7</div>
          <div className="createdBy">Created by Nick Lathen, Will Stockman, Eric Eakin, and Riyaz Ahmed, 2016</div>

        </div>
      </div>
    )

  }
}

export default HUD;