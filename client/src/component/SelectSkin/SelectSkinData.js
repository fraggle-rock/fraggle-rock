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
  	<div>
  	  <div>
  	    <img className='SkinPic' src={props.skins.skinPic} />
  	  </div>
  	  <div className='SkinName'>{props.skins.name}</div>
  	  <div>
  	    <button className='SkinButton' className='btn btn-warning' onClick={addSkin}>Choose Skin</button>
  	  </div>
  	</div>
  )
}

export default SelectSkinData
