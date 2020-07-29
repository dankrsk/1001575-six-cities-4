import {ConnectStatus} from '../reducer/data/data.js';
import {AuthorizationStatus} from '../reducer/user/user.js';
import React from 'react';

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const getScreen = (status, successScreen) => {
  switch (status) {
    case ConnectStatus.OK:
      return successScreen;
    case ConnectStatus.LOADING:
      return (
        <p className="property__name">Loading...</p>
      );
    default:
      return (
        <p className="property__name">Oops. Something went wrong. Try reloading the page...</p>
      );
  }
};

export const checkAuth = (authStatus) => {
  return authStatus === AuthorizationStatus.AUTH;
};
