import React from 'react';
import Main from '../main/main.jsx';
import {Switch, Route, Router, Redirect} from 'react-router-dom';
import {AppRoutes} from '../../const.js';
import SignIn from '../sign-in/sign-in.jsx';
import customHistory from '../../history.js';
import {Operation as UserOperation} from '../../reducer/user/user.js';
import {Operation as DataOperation} from '../../reducer/data/data.js';
import {connect} from 'react-redux';
import {getAuthorizationStatus} from '../../reducer/user/selectors.js';
import {AuthorizationStatus} from '../../reducer/user/user.js';
import PropTypes from 'prop-types';

App.propTypes = {
  onLoginFormSubmit: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
};

function App(props) {
  const {onLoginFormSubmit, authorizationStatus} = props;

  const checkAuth = () => {
    if (authorizationStatus === AuthorizationStatus.AUTH) {
      return <Redirect to={AppRoutes.MAIN} />;
    } else {
      return <SignIn onLoginFormSubmit={onLoginFormSubmit} />;
    }
  };

  return (
    <Router history={customHistory}>
      <Switch>
        <Route exact path={AppRoutes.MAIN}>
          <Main />
        </Route>
        <Route exact path={AppRoutes.LOGIN}>
          {checkAuth()}
        </Route>
      </Switch>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    authorizationStatus: getAuthorizationStatus(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginFormSubmit(authData) {
      dispatch(UserOperation.login(authData))
        .then(() => {
          dispatch(DataOperation.loadOffers())
            .then(() => {
              customHistory.push(AppRoutes.MAIN);
            });
        });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
