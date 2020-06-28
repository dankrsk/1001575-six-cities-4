import React from 'react';
import renderer from 'react-test-renderer';
import Main from '../main/main.jsx';
import {mock} from '../../shared/test-mocks.js';

describe(`Snapshots for Main`, () => {
  it(`Main component should render page content with 3 offers and 3 offers count`, () => {
    const tree = renderer
      .create(<Main
        rentOffersCount={mock.rentOffersCount}
        offers={mock.offers}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
