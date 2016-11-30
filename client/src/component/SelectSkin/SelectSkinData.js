import React from 'react';
import { browserHistory } from 'react-router';
import userProfile from '../userProfile.js';

var SelectSkinData = props => {
	var addSkin = function() {
    if(props.skins.type === 'hat') {
      userProfile.hat = props.skins.skin
      browserHistory.goBack()
    } else {
      userProfile.ChosenSkin = props.skins.skin;
      browserHistory.goBack()
    }
  }

  return (
    <div className='Skin'>
	    <img className='SkinPic' src={props.skins.skinPic} />
  	  <div className='SkinName'>{props.skins.name}</div>
	    <button className='SkinButton btn btn-warning' onClick={addSkin}>Choose Skin</button>
  	</div>
  )
}

export default SelectSkinData
