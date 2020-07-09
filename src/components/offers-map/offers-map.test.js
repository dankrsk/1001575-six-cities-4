import React from 'react';
import renderer from 'react-test-renderer';
import OffersMap from './offers-map.jsx';
import {mock} from '../../shared/test-mocks.js';

describe(`Snapshots for Map`, () => {
  it(`Map component should render container for map`, () => {
    const tree = renderer
      .create(<OffersMap
        offers={mock.offers}
        city={`Paris`}
        activeCardId={1}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
