import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import {createStore, applyMiddleware} from 'redux';
import reducer from './reducer/reducer.js';
import {Operation as DataOperation, ActionCreator as DataActionCreator, ConnectStatus} from './reducer/data/data.js';
import {ActionCreator as AppActionCreator} from './reducer/app/app.js';
import {Operation as UserOperation, ActionCreator as UserActionCreator, AuthorizationStatus} from './reducer/user/user.js';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createAPI} from './api.js';
import NameSpace from './const.js';
import {composeWithDevTools} from 'redux-devtools-extension';
import customHistory from './history.js';
import {AppRoutes} from './const.js';

const onError = (isUnathorized) => {
  if (isUnathorized) {
    store.dispatch(UserActionCreator.changeAuthorizationStatus(AuthorizationStatus.NO_AUTH));
    customHistory.push(AppRoutes.LOGIN);
  } else {
    store.dispatch(DataActionCreator.changeStatus(ConnectStatus.ERROR));
  }
};

const onSuccess = (response) => {
  return response;
};

const api = createAPI(onSuccess, onError);

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

store.dispatch(DataOperation.loadOffers())
      .then(() => store.dispatch(AppActionCreator.getAllCities(store.getState()[NameSpace.DATA].offers)))
      .then((cities) => store.dispatch(AppActionCreator.changeCity(cities.payload[0])));
store.dispatch(UserOperation.checkAuth());

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
);

