import React from 'react';
import { browserHistory } from 'react-router';

class MapView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='mapThumbBox' onClick={() => this.props.click(this.props.i)}>
        <img className='mapThumb' src={this.props.details.thumb} />
        <div>
          <button className='btn btn-primary'>{this.props.details.name}</button>
        </div>
      </div>
    );
  }
}



export default MapView;












