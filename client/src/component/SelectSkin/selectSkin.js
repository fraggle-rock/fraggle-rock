import React from 'react';
import { browserHistory } from 'react-router';
import userProfile from '../userProfile.js';
import SelectSkinData from './SelectSkinData.js';
import Profile from '../Home/Profile.js';

class SelectSkin extends React.Component {
  constructor(props) {
	  super(props);
	  this.state = {
	    skins: []
	  };
	  this.backToHome = this.backToHome.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this)
  }

  backToHome() {
    browserHistory.goBack();
  }

  componentWillMount() {
    if(userProfile.User === 'Guest') {
      if(window.localStorage.id) {
        $.ajax({
          url: '/api/getUserByFacebookID/' + window.localStorage.id,
          method: 'Get',
          success: (data) => {
            userProfile.User = data.username;
            userProfile.Skins = data.skins || [];
            userProfile.facebookid = data.facebookid;
            userProfile.userId = data.id;
            userProfile.FacebookPicture = data.url;
            for(var i = 0; i < userProfile.Skins.length; i++) {
              this.state.skins.push(userProfile.skinsObj[userProfile.Skins[i]])
            }
            browserHistory.push('SelectSkin')
          },
          error: (error) => {
            console.log(error)
          }
        })
      } 
    }
    
    userProfile.Skins.forEach((userSkin) => {
      userProfile.storeSkins.forEach((storeSkin) => {
        if (userSkin === storeSkin.skin) {
          //state doesnt set fast enough so you have to use asynch state or it over-writes
          this.setState(function (prevState) {
            return {
              skins: prevState.skins.concat(storeSkin)
            };
          });
        }
      });
    });
  }

  render() {
      return (
        <div className='menuContainer'>
          <div className='menuBackground'>
            <div id='Profile'>
              <Profile />
            </div>
            <div className='buttonBox'>
              <button className='btn btn-primary homeBtn' onClick={this.backToHome}>◀ Back</button>
              <h1>Select Skin</h1>
            </div>
            <div id='Skins'>
              {this.state.skins.length ? this.state.skins.map((skin) => <SelectSkinData key={skin.name} skin={skin} />) : 'Go to the store to buy skins!'}
            </div>
          </div>
        </div>
      );
  }
}



export default SelectSkin;