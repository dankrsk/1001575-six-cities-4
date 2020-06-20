import React from 'react';
import renderer from 'react-test-renderer';
import Card from '../card/card.jsx';

const offer = {
  title: `My appartment`,
  price: 999,
};

describe(`Snapshots for Card`, () => {
  it(`Card component should render 1 card for offer with title and price`, () => {
    const tree = renderer
      .create(<Card
        offer={offer}
        onTitleClick={() => {}}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
