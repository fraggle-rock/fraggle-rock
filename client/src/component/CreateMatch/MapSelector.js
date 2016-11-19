import React from 'react';
import { browserHistory } from 'react-router';

class MapSelector extends React.Component {
 constructor(props) {
  super(props);
  this.state = {
    user: null
  };
 }

DawnMountain() {
  document.getElementById('MapSelector').style.display = 'none';
  document.getElementById('DawnMountainCreateBackground').style.display = 'block';
  document.getElementById('StartMatch').style.display = 'block';
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
                <button onClick={this.DawnMountain} className='btn btn-primary'>Dawn Mountain</button>
              </div>
            </div>
          </div>
        </div> 
      </div>
   );
  
 }
}



export default MapSelector;












