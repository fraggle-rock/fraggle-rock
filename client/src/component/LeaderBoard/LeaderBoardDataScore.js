import React from 'react';

var LeaderBoardDataScore = props => {
  return (
    <div id='LeaderBoardDataScore'>
      <div>
        <div key={props.leader.score.toString()}>{props.leader.score}</div>
      </div>
    </div>
  )   
}

export default LeaderBoardDataScore