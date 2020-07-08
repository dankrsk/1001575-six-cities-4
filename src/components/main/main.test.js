import React from 'react';
import {Provider} from 'react-redux';
import renderer from 'react-test-renderer';
import Main from '../main/main.jsx';
import configureStore from 'redux-mock-store';
import {mock} from '../../shared/test-mocks.js';

const mockStore = configureStore([]);

describe(`Snapshots for Main`, () => {
  it(`Main component`, () => {
    const store = mockStore({
      city: `Paris`,
      offers: mock.offers,
    });
    const tree = renderer
      .create(
          <Provider store={store}>
            <Main
              currentCity={`Paris`}
              offers={mock.offers}
              onCityLinkClick={() => {}}
            />
          </Provider>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
