import React from 'react';
import { browserHistory } from 'react-router';
import userProfile from '../userProfile.js';

var StoreData = props => {
	var addSkin = function() {

  if(!props.state.storeSkins[props.i].owned) {
    if(userProfile.stars >= props.skin.price) {
      var data = {facebookid: userProfile.facebookid, points: -(props.skin.price)}
      $.ajax({
        url: '/api/addTransactionByFacebookID',
        method: 'Post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        error: (error) => {
          console.log(error)
        },
        success: (data) => {
          userProfile.Skins.push(props.skin.skin)
          props.state.storeSkins[props.i].owned = true;
          var skins = {id: userProfile.userId, skins: userProfile.Skins}
          $.ajax({
            url: '/api/updateSkins',
            method: 'Post',
            data: JSON.stringify(skins),
            contentType: 'application/json',
            error: (error) => {
              console.log(error)
            },
            success: (error) => {
              userProfile.stars = userProfile.stars - props.skin.price;
              console.log('userProfile')
              browserHistory.push('Store')
            }
          })
        }
      }) 
    } else {
      props.state.noFunds = true;
      browserHistory.push('Store')
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
