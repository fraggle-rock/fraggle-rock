import React from 'react';


/**
 * @class App
 * @param {object} props
 * @param {object} props.children
 */
const App = ({ children }) => (
  <div className="App container">
    {children}
  </div>
);

App.propTypes = {
  children: React.PropTypes.element,
};

export default App;