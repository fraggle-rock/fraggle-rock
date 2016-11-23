import React from 'react';

var LeaderBoardDataUser = props => {
  return (
    <div id='LeaderBoardDataUser'>
      <div>
      <div key={props.leader.username.toString()}>{props.leader.username}</div>
      </div>
    </div>
  )   
}

export default LeaderBoardDataUser