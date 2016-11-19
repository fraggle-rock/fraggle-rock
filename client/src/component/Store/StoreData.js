import React from 'react';
import userProfile from '../userProfile.js';

var StoreData = props => {
	var addSkin = function() {
    userProfile.ChosenSkin = props.skins.skin;
  }

  return (
  	<div>
  	  <div>
  	    <img id='SkinPic' src={props.skins.skinPic} />
  	  </div>
  	  <div id='SkinName'>{props.skins.name}</div>
  	  <div>
  	    <button id='SkinButton' className='btn btn-warning' onClick={addSkin.bind(props.skin)}>Add Skin</button>
  	  </div>
  	</div>
  )   
  }

export default StoreData
