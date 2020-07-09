import React from 'react';
import {Provider} from 'react-redux';
import renderer from 'react-test-renderer';
import App from '../app/app.jsx';
import configureStore from 'redux-mock-store';
import {mock} from '../../shared/test-mocks.js';
import {getCitiesFromOffers} from '../../utils/offers.js';

const mockStore = configureStore([]);

describe(`Snapshots for App`, () => {
  it(`App component`, () => {
    const store = mockStore({
      city: `Paris`,
      offers: mock.offers,
      allCities: getCitiesFromOffers(mock.offers),
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
