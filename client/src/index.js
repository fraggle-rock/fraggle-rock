import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import LogIn from './component/LogIn/logIn.js';
import App from './component/App/App.js';
import Home from './component/Home/Home.js';
import CreateMatch from './component/CreateMatch/CreateMatch.js';
import JoinMatch from './component/JoinMatch/JoinMatch.js';
import LeaderBoard from './component/LeaderBoard/LeaderBoard.js';
import Store from './component/Store/Store.js'

ReactDOM.render((
  <div>
    <Router history={browserHistory} >
      <Route path='/' component={App}>
        <IndexRoute component={LogIn} />
        <Route path='Home' component={Home} />
        <Route path='CreateMatch' component={CreateMatch} />
        <Route path='JoinMatch' component={JoinMatch} />
        <Route path='LeaderBoard' component={LeaderBoard} />
        <Route path='Store' component={Store} />
      </Route>
    </Router>
  </div>


  ), 
document.getElementById('app'));