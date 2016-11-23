import React from 'react';
import { browserHistory } from 'react-router';
import userProfile from '../userProfile.js';
import levelBuilder from '../../levelBuilder.js';

class MapSelector extends React.Component {
 constructor(props) {
  super(props);
  this.state = {
    user: null
  };
 }

greenFields() {
  document.getElementById('MapSelector').style.display = 'none';
  document.getElementById('DawnMountainCreateBackground').style.display = 'block';
  document.getElementById('StartMatch').style.display = 'block';
  userProfile.map = 1;
}

dawnMountain() {
  document.getElementById('MapSelector').style.display = 'none';
  document.getElementById('DawnMountainCreateBackground').style.display = 'block';
  document.getElementById('StartMatch').style.display = 'block';
  userProfile.map = 2;
}

render() {
  return (
    <div id="Levels">
      <div className='mapSelectContainer'>
        <h3 id='ChooseLevelTitle'>Choose Level Below</h3>
          <div className='mapThumbContainer'>
            <div className='mapThumbBox'>
              <img onClick={this.greenFields} className='mapThumb' src='../../../textures/grass-repeating4.jpg' />
              <div>
                <button onClick={this.greenFields} className='btn btn-primary'>Green Fields</button>
              </div>
            </div>
            <div className='mapThumbBox'>
              <img onClick={this.dawnMountain} className='mapThumb' src='../../../textures/dawnmountainThumb.jpg' />
              <div>
                <button onClick={this.dawnMountain} className='btn btn-primary'>Dawn Mountain</button>
              </div>
            </div>
        </div>
      </div>
    </div>
   );
 }
}



export default MapSelector;












