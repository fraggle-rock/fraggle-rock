import React from 'react';
import { browserHistory } from 'react-router';
import userProfile from '../userProfile.js';


class GameOverData extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div className='GameOverBox'>
      <div className='GameOverUser'>{this.props.player.username}</div>
      <div className='GameOverScore'>{this.props.player.score}</div>
    </div>
    )
  }
}

export default GameOverData