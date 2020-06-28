import React from 'react';
import renderer from 'react-test-renderer';
import App from '../app/app.jsx';
import {mock} from '../../shared/test-mocks.js';

describe(`Snapshots for App`, () => {
  it(`App component should render page content with 3 offers and 3 offers count`, () => {
    const tree = renderer
      .create(<App
        rentOffersCount={mock.rentOffersCount}
        offers={mock.offers}
      />, {
        createNodeMock: () => {
          return {};
        }
      }).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
