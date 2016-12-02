import React from 'react';
import { browserHistory } from 'react-router';
import userProfile from '../userProfile.js';
import GameOverData from './GameOverData.js';
import Profile from '../Home/Profile.js';

class GameOver extends React.Component {
  constructor(props) {
	  super(props);

    this.state = {
	    user: null,
      highScore: userProfile.scoreBoard.reverse()[0].score,
	  }

  }
  
  componentWillMount() {
    if(window.localStorage.id) {
      userProfile.scoreBoard.forEach((score) => {
        if(score.username === userProfile.User) {
          var data = {facebookid: window.localStorage.id, points: score.score}
          $.ajax({
            url: '/api/addTransactionByFacebookID',
            method: 'Post',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: (data) => {
              var gameData = {facebookid: window.localStorage.id, uuid: 'abc-123-456', score: score.score};
              $.ajax({
                url: '/api/addScore',
                method: 'Post',
                data: JSON.stringify(gameData),
                contentType: 'application/json',
                success: (data) => {

                },
                error: (error) => {
                  console.log(error)
                }
              })
            },
            error: (error) => {
              console.log(error)
            }
          })
        }
      })
    }
  }

  backToHome() {
    window.location.pathname = 'Home'
  }

  render() {
      return (
        <div id='GameOver'>
          <div className='menuContainer'>
            <div id='Profile'>
              <Profile />
            </div>
            <div className='menuBackground'>
              <div className='buttonBox'>
                <h1>Results</h1>
              </div>
              <div id='PlayerWins'>{userProfile.winner} wins!!!!!</div>
              <div className='GameOverBox'>
                {userProfile.scoreBoard.map((player, i) => <GameOverData key={player.username}  player={player} i={i} highScore={this.state.highScore} />)}
              </div>
              <button className='btn btn-success playAgainBtn' onClick={this.backToHome}>Play Again ▶</button>
            </div>
          </div>
        </div>
      );

  }
}



export default GameOver;