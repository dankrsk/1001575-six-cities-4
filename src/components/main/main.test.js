import React from 'react';
import renderer from 'react-test-renderer';
import Main from '../app/app.jsx';

const rentOffersCount = 312;
const offers = [
  {
    title: `Beautiful & luxurious apartment at great location`,
    price: 120,
  },
  {
    title: `Wood and stone place`,
    price: 80,
  },
  {
    title: `Canal View Prinsengracht`,
    price: 132,
  },
  {
    title: `Nice, cozy, warm big bed apartment`,
    price: 180,
  },
  {
    title: `Wood and stone place`,
    price: 80,
  }
];

describe(`Snapshots for Main`, () => {
  it(`Main component should render page content with 5 offers and 312 offers count`, () => {
    const tree = renderer
      .create(<Main
        rentOffersCount={rentOffersCount}
        offers={offers}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
