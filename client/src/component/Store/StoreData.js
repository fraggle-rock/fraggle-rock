import React from 'react';
import { browserHistory } from 'react-router';
import userProfile from '../userProfile.js';

var StoreData = props => {
	var addSkin = function() {
    if(userProfile.experience >= props.skins.price) {
      userProfile.Skins.push(props.skins)
      userProfile.ChosenSkin = props.skins.skin; 
      userProfile.experience = userProfile.experience - props.skins.price; 
      browserHistory.push('Store')
    } else {
      props.state.noFunds = true;
      browserHistory.push('Store')
    }
  }

  return (
  	<div>
  	  <div>
  	    <img id='SkinPic' src={props.skins.skinPic} />
  	  </div>
  	  <div id='SkinName'>{props.skins.name}</div>
      <div id='SkinCost'>Cost: <span>{props.skins.price}</span> xp</div>
  	  <div>
  	    <button id='SkinButton' className='btn btn-warning' onClick={addSkin}>Buy Skin</button>
  	  </div>
  	</div>
  )
}

export default StoreData
