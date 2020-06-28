import React from 'react';
import renderer from 'react-test-renderer';
import Card from '../card/card.jsx';
import {mock} from '../../shared/test-mocks.js';

describe(`Snapshots for Card`, () => {
  it(`Card component should render 1 card for mock offer`, () => {
    const tree = renderer
      .create(<Card
        offer={mock.offers[0]}
        onCardMouseOver={() => {}}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
