import React from 'react';
import {shallow} from 'enzyme';
import Card from '../card/card.jsx';
import {mock} from '../../shared/test-mocks.js';

describe(`e2e-tests for Card`, () => {
  it(`MouseOverHandler should receive offer's id`, () => {
    const handleCardMouseOver = jest.fn();

    const card = shallow(
        <Card
          offer={mock.offers[0]}
          onCardMouseOver={handleCardMouseOver}
        />
    );

    card.simulate(`mouseover`, {});

    expect(handleCardMouseOver.mock.calls[0][0]).toBe(mock.offers[0].id);
  });
});
