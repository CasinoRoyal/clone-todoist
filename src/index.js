import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Welcome from './components/welcome';
import App from './app';
import './app.scss';

ReactDOM.render(
  <Router>
    <Switch>
      <Route path='/welcome' component={Welcome} />
      <Route path='/' component={App} />
    </Switch>
  </Router>
  , document.getElementById('root'));