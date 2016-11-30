import React from 'react';
import { browserHistory } from 'react-router';
import userProfile from '../userProfile.js';

var SelectSkinData = props => {
	var addSkin = function() {
    if (props.skin.type === 'hat') {
      userProfile.hat = props.skin.skin
      browserHistory.goBack()
    } else {
      userProfile.ChosenSkin = props.skin.skin;
      browserHistory.goBack()
    }
  }

  return (
    <div className='Skin'>
	    <img className='SkinPic' src={props.skin.skinPic} />
  	  <div className='SkinName'>{props.skin.name}</div>
	    <button className='SkinButton btn btn-warning' onClick={addSkin}>Choose Skin</button>
  	</div>
  )
}

export default SelectSkinData
