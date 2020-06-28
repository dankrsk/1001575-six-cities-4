import React from 'react';
import renderer from 'react-test-renderer';
import CardList from '../card-list/card-list.jsx';
import {mock} from '../../shared/test-mocks.js';

describe(`Snapshots for CardLst`, () => {
  it(`CardList component should render card list with 3 cards`, () => {
    const tree = renderer
      .create(<CardList
        rentOffersCount={mock.rentOffersCount}
        offers={mock.offers}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
