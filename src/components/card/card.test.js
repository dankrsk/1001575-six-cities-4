import React from 'react';
import renderer from 'react-test-renderer';
import Card from '../card/card.jsx';

const offer = {
  id: 1,
  type: `House`,
  title: `Beautiful & luxurious apartment at great location`,
  price: 100,
  rating: 1,
  isPremium: true,
  photo: `http://cdn.home-designing.com/wp-content/uploads/2013/11/1-Contemporary-architecture.jpg`,
};

describe(`Snapshots for Card`, () => {
  it(`Card component should render 1 card for mock offer`, () => {
    const tree = renderer
      .create(<Card
        offer={offer}
        onCardMouseOver={() => {}}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
