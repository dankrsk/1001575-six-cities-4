import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Main from '../main/main.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

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

describe(`e2e for Main`, () => {
  it(`All titles should be clicked`, () => {
    const onTitleClick = jest.fn();

    const main = mount(
        <Main
          rentOffersCount={rentOffersCount}
          offers={offers}
          onOffersTitleClick={onTitleClick}
        />
    );

    const titleHeaders = main.find(`.place-card__name`);

    titleHeaders.forEach((header) => {
      header.simulate(`click`, {
        preventDefault() {}
      });
    });

    expect(onTitleClick).toHaveBeenCalledTimes(offers.length);
  });
});
