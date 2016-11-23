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
        <div>
          <div>
            <h3 id='ChooseLevelTitle'>Choose Level Below</h3>
            <div>
              <img id='DawnMountain' src='../../../textures/dawnmountainThumb.jpg' />
              <div>
                <button onClick={this.greenFields} className='btn btn-primary'>Green Fields</button>
              </div>
              <img id='DawnMountain' src='../../../textures/dawnmountainThumb.jpg' />
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












