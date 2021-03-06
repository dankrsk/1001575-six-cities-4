import React from 'react';
import {Provider} from 'react-redux';
import renderer from 'react-test-renderer';
import App from '../app/app.jsx';
import configureStore from 'redux-mock-store';
import {mock} from '../../shared/test-mocks.js';
import {getCitiesFromOffers} from '../../utils/offers.js';
import NameSpace from '../../const.js';

const mockStore = configureStore([]);

describe(`Snapshots for App`, () => {
  it(`App component`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        comments: mock.comments,
        nearPlaces: mock.offers,
        status: `OK`,
        offers: mock.offers,
      },
      [NameSpace.APP]: {
        city: `Amsterdam`,
        allCities: getCitiesFromOffers(mock.offers),
        sortType: `POPULAR`,
      },
      [NameSpace.USER]: {
        authInfo: mock.authInfo,
        authorizationStatus: `NO_AUTH`,
      },
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <App />
          </Provider>, {
            createNodeMock: () => {
              return {};
            }
          }).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
