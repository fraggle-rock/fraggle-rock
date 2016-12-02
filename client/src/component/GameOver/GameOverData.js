import React from 'react';
import { browserHistory } from 'react-router';
import userProfile from '../userProfile.js';


class GameOverData extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let percent = this.props.player.score / this.props.highScore;
    let width = Math.floor(250 * percent);
    $('#GameOverBar' + this.props.i).width(width);
  }

  render() {
    return (
      <div className='GameOverBarBox'>
        <div className='GameOverSpan GameOverUsername'>{this.props.player.username}</div>
        <div className='GameOverBar' id={'GameOverBar' + this.props.i}></div>
        <div className='GameOverScore'>{this.props.player.score}✪</div>
      </div>
    )
  }
}

export default GameOverData