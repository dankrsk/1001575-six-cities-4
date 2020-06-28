import React from 'react';
import renderer from 'react-test-renderer';
import Map from '../map/map.jsx';
import {mock} from '../../shared/test-mocks.js';

describe(`Snapshots for Map`, () => {
  it(`Map component should render container for map`, () => {
    const tree = renderer
      .create(<Map
        offers={mock.offers}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
