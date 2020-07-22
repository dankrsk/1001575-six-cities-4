import React from 'react';
import renderer from 'react-test-renderer';
import DefaultCardList from '../default-card-list/default-card-list.jsx';
import {mock} from '../../shared/test-mocks.js';

describe(`Snapshots for DefaultCardList`, () => {
  it(`DefaultCardList component`, () => {
    const tree = renderer
      .create(<DefaultCardList
        city={`Paris`}
        offers={mock.offers}
        activeCardId={1}
        handleCardAction={() => {}}
        onFavoriteButtonClick={() => {}}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
