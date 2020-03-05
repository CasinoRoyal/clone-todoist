import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { StateProvider } from './contexts/user-context';
import Welcome from './pages/welcome';
import App from './app';
import './app.scss';

ReactDOM.render(
  <StateProvider>
    <Router>
      <Switch>
        <Route path='/welcome' component={Welcome} />
        <Route path='/' component={App} />
      </Switch>
    </Router>
  </StateProvider>
  , document.getElementById('root'));