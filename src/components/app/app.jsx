import React from 'react';
import Main from '../main/main.jsx';
import {Switch, Route, Router} from 'react-router-dom';
import customHistory from '../../history.js';
import {AppRoutes} from '../../const.js';
import SignIn from '../sign-in/sign-in.jsx';

function App() {
  return (
    <Router history={customHistory}>
      <Switch>
        <Route exact path={AppRoutes.MAIN}>
          <Main />
        </Route>
        <Route exact path={AppRoutes.LOGIN}>
          <SignIn />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
