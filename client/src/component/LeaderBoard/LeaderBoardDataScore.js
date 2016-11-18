import React from 'react';

var LeaderBoardDataScore = props => {
  return (
    <div id='LeaderBoardDataScore'>
      <div>
        <span>{props.leader.score}</span>
      </div>
    </div>
  )   
}

export default LeaderBoardDataScore