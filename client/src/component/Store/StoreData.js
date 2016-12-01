import React from 'react';
import { browserHistory } from 'react-router';
import userProfile from '../userProfile.js';

var StoreData = props => {
	var addSkin = function() {
    if(userProfile.experience >= props.skins.price) {
      var data = {facebookid: userProfile.facebookid, points: -(props.skins.price)}
      $.ajax({
        url: '/api/addTransactionByFacebookID',
        method: 'Post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        error: (error) => {
          console.log(error)
        },
        success: (data) => {
          userProfile.Skins.push(props.skins.skin)
          console.log(userProfile.userId)
          var skins = {id: userProfile.userId, skins: userProfile.Skins}
          console.log(JSON.stringify(skins))
          $.ajax({
            url: '/api/updateSkins',
            method: 'Post',
            data: JSON.stringify(skins),
            contentType: 'application/json',
            error: (error) => {
              console.log(error)
            },
            success: (error) => {
              userProfile.experience = userProfile.experience - props.skins.price;
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

  return (
  	<div className='Skin'>
  	  <div>
  	    <img className='SkinPic' src={props.skins.skinPic} />
  	  </div>
  	  <div className='SkinName'>{props.skins.name}</div>
      <div className='SkinCost'>Cost: <span>{props.skins.price}</span>✪</div>
  	  <div>
  	    <button className='SkinButton' className='btn btn-warning' onClick={addSkin}>Buy Skin</button>
  	  </div>
  	</div>
  )
}

export default StoreData
