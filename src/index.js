import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import {createStore, applyMiddleware} from 'redux';
import reducer from './reducer/reducer.js';
import {Operation as DataOperation, ActionCreator as DataActionCreator, ConnectStatus} from './reducer/data/data.js';
import {ActionCreator as AppActionCreator} from './reducer/app/app.js';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createAPI} from './api.js';
import NameSpace from './const.js';

const onError = () => {
  store.dispatch(DataActionCreator.changeStatus(ConnectStatus.ERROR));
};

const api = createAPI(onError);

const store = createStore(
    reducer,
    applyMiddleware(thunk.withExtraArgument(api))
);

store.dispatch(DataOperation.loadOffers())
      .then(() => store.dispatch(AppActionCreator.getAllCities(store.getState()[NameSpace.DATA].offers)))
      .then((cities) => store.dispatch(AppActionCreator.changeCity(cities.payload[0])));

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
);

