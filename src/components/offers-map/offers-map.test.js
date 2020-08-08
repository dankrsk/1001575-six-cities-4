import React from 'react';
import renderer from 'react-test-renderer';
import OffersMap from './offers-map.jsx';
import {mock} from '../../shared/test-mocks.js';

describe(`Snapshots for Map`, () => {
  it(`Map component`, () => {
    const tree = renderer
      .create(<OffersMap
        offers={mock.offers}
        city={`Amsterdam`}
        activeCardId={1}
        isNearPlaces={true}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
