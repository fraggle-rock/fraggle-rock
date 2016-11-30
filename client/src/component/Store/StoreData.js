import React from 'react';
import { browserHistory } from 'react-router';
import userProfile from '../userProfile.js';

var StoreData = props => {
	var addSkin = function() {
    if (!props.state.storeSkins[props.i].owned) {
      if (userProfile.stars >= props.skin.price) {
        userProfile.Skins.push(props.skin);
        userProfile.stars = userProfile.stars - props.skin.price;
        props.state.storeSkins[props.i].owned = true;
      } else {
        props.state.noFunds = true;
      }
    }

    browserHistory.push('Store');
  };

  return (
  	<div className='Skin'>
	    <img className='SkinPic' src={props.skin.skinPic} />
  	  <div className='SkinName'>{props.skin.name}</div>
  	  <button className='SkinButton btn btn-danger' onClick={addSkin}>{props.skin.owned ? 'Owned' : props.skin.price + '✪'}</button>
  	</div>
  )
};

export default StoreData
