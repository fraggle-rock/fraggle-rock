import React from 'react';
import { browserHistory } from 'react-router';
import userProfile from '../userProfile.js';
import levelBuilder from '../../levelBuilder.js';
import MapView from './MapView';

class MapSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  render() {
    return (
      <div id="maps">
        <div className='mapSelectContainer'>
          <div className='mapThumbContainer'>
            {this.props.maps.map((map, index) => <MapView details={map} key={index} i={index} click={this.props.click} />)}
          </div>
        </div>
      </div>
    );
  }
}



export default MapSelector;












