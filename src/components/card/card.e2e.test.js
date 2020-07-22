import React from 'react';
import {shallow} from 'enzyme';
import Card from '../card/card.jsx';
import {mock} from '../../shared/test-mocks.js';

describe(`e2e-tests for Card`, () => {
  it(`Handlers for cardMouseOver and favoriteButtonClick should receive offer's id`, () => {
    const handleCardMouseOver = jest.fn();
    const handleFavoriteButtonClick = jest.fn();

    const card = shallow(
        <Card
          offer={mock.offers[0]}
          onCardMouseOver={handleCardMouseOver}
          onFavoriteButtonClick={handleFavoriteButtonClick}
        />
    );

    card.simulate(`mouseover`, {});
    card.simulate(`mouseout`, {});
    card.find(`.place-card__bookmark-button`).simulate(`click`, {});

    expect(handleCardMouseOver.mock.calls[0][0]).toBe(mock.offers[0].id);
    expect(handleFavoriteButtonClick.mock.calls[0][0]).toBe(mock.offers[0].id);
    expect(handleCardMouseOver.mock.calls[1][0]).toBe(undefined);
  });
});
