import React from 'react';
import { browserHistory } from 'react-router';
import userProfile from '../userProfile.js';
import StoreData from './StoreData.js';
import Profile from '../Home/Profile.js';

class Store extends React.Component {
  constructor(props) {
	  super(props);
	  this.state = {
	    user: null,
      storeSkins: userProfile.storeSkins,
      stars: userProfile.stars,
      noFunds: false
	  };
	  this.backToHome = this.backToHome.bind(this);
    this.backToStore = this.backToStore.bind(this);
  }

  backToHome() {
    browserHistory.push('/Home');
  }

  componentWillMount() {
    $.ajax({
      url: '/api/getPointsByUsername/' + userProfile.User,
      method: 'Get',
      success: (data) => {
        userProfile.stars = data;
        userProfile.Skins.forEach((skinOwned) => {
          userProfile.storeSkins.forEach((skin) => {
            if(skinOwned === skin.skin) {
              skin.owned = true;
            }
          })
        })
        browserHistory.push('Store')
      }
    })
  }

  backToStore() {
    this.setState({noFunds: false});
    browserHistory.push('Store')
  }

  render() {
    if (this.state.noFunds === true) {
      return (
        <div className='menuContainer'>
          <div className='menuBackground'>
            <div id='Profile'>
              <Profile />
            </div>
            <div className='buttonBox'>
              <button className='btn btn-primary homeBtn' onClick={this.backToStore}>◀ Back</button>
              <h1>Smash Ball Store</h1>
            </div>
            <div className='storeStars'>You have {userProfile.stars}✪</div>
            <p>You dont have enough ✪ to buy this item!</p>
            <p>You can gain ✪ by playing more games</p>
          </div>
        </div>
      )
    } else {
      return (
        <div className='menuContainer'>
          <div className='menuBackground'>
            <div id='Profile'>
              <Profile />
            </div>
            <div className='buttonBox'>
              <button className='btn btn-primary homeBtn' onClick={this.backToHome}>◀ Back</button>
              <h1>Smash Ball Store</h1>
            </div>
            <div className='storeStars'> You have {userProfile.stars}✪</div>
            <div id='Skins'>
              {this.state.storeSkins.map((skin, i) => <StoreData key={skin.name} i={i} skin={skin} state={this.state} />)}
            </div>
          </div>
        </div>
      );
    }

  }
}

export default Store;