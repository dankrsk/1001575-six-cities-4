import React from 'react';
import {shallow} from 'enzyme';
import Card from '../card/card.jsx';

const mock = {
  offer: {
    id: 1,
    type: `House`,
    title: `Beautiful & luxurious apartment at great location`,
    price: 100,
    rating: 1,
    isPremium: true,
    photo: `http://cdn.home-designing.com/wp-content/uploads/2013/11/1-Contemporary-architecture.jpg`,
  },
};

describe(`e2e-tests for Card`, () => {
  it(`MouseOverHandler should receive offer's id`, () => {
    const handleCardMouseOver = jest.fn();

    const card = shallow(
        <Card
          offer={mock.offer}
          onCardMouseOver={handleCardMouseOver}
        />
    );

    card.simulate(`mouseover`, {});

    expect(handleCardMouseOver.mock.calls[0][0]).toBe(mock.offer.id);
  });
});
