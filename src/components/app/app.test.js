import React from 'react';
import renderer from 'react-test-renderer';
import App from '../app/app.jsx';

const rentOffersCount = 3;
const offers = [
  {
    id: 1,
    type: `House`,
    title: `Beautiful & luxurious apartment at great location`,
    price: 100,
    rating: 1,
    isPremium: true,
    photo: `http://cdn.home-designing.com/wp-content/uploads/2013/11/1-Contemporary-architecture.jpg`,
  },
  {
    id: 2,
    type: `Room`,
    title: `Wood and stone place`,
    price: 200,
    rating: 2,
    isPremium: false,
    photo: `https://avatars.mds.yandex.net/get-pdb/215709/4d8ee911-7746-43da-a5cd-b7f9d2f3f839/s1200?webp=false`,
  },
  {
    id: 3,
    type: `Appartment`,
    title: `Nice, cozy, warm big bed apartment`,
    price: 300,
    rating: 3,
    isPremium: true,
    photo: `https://avatars.mds.yandex.net/get-pdb/215709/4d8ee911-7746-43da-a5cd-b7f9d2f3f839/s1200?webp=false`,
  },
];

describe(`Snapshots for App`, () => {
  it(`App component should render page content with 3 offers and 3 offers count`, () => {
    const tree = renderer
      .create(<App
        rentOffersCount={rentOffersCount}
        offers={offers}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});