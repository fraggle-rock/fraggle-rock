import React from 'react';
import userProfile from '../userProfile.js';
// import sceneUtility from '../../sceneUtility.js';

var SkinSelector = props => {
	var addSkin = function() {
    userProfile.Skins.push(props)
  }

  var chooseSkin = function() {
    userProfile.chooseSkin = this;
    document.getElementById('DawnMountainCreateBackground').style.display = 'block';
  }

  var noSkins = function() {
    document.getElementById('SkinSelector').style.display = 'none';
    document.getElementById('DawnMountainCreateBackground').style.display = 'block';
  }

  if(props.skins) {
    return (
    	<div>
    	  <div>
    	    <img id='SkinPic' src={props.skins.skins.skinPic} />
    	  </div>
    	  <div id='SkinName'>{props.skins.skins.name}</div>
    	  <div>
    	    <button id='SkinButton' className='btn btn-warning' onClick={this.chooseSkin.bind(props.skins.skins.skin)}>Choose Skin</button>
    	  </div>
    	</div>
    )
  } else {
    return(
      <div>
        <div>
        YOU HAVE NO SKINS!!
        </div>
        <div>
          <button className='btn btn-warning' onClick={noSkins}>Back</button>
        </div>
      </div>
      )
  }
  }

export default SkinSelector