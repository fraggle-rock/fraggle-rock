import React from 'react';
import { browserHistory } from 'react-router';
import userProfile from '../userProfile.js';

var StoreData = props => {
	var addSkin = function() {
    if(userProfile.experience >= props.skins.price) {
      if(props.skins.type === 'hat') {
        userProfile.Skins.push(props.skins);
        userProfile.experience = userProfile.experience - props.skins.price;
        browserHistory.push('Store');
      } else {
        userProfile.Skins.push(props.skins)
        userProfile.experience = userProfile.experience - props.skins.price;
        browserHistory.push('Store');
      }
    } else {
      props.state.noFunds = true;
      browserHistory.push('Store');
    }
  }

  return (
  	<div className='Skin'>
	    <img className='SkinPic' src={props.skins.skinPic} />
  	  <div className='SkinName'>{props.skins.name}</div>
  	  <button className='SkinButton btn btn-danger' onClick={addSkin}>{props.skins.price}✪</button>
  	</div>
  )
}

export default StoreData
