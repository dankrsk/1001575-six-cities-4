import React from 'react';
import renderer from 'react-test-renderer';
import Card from '../card/card.jsx';
import {mock} from '../../shared/test-mocks.js';
import {Router} from 'react-router-dom';
import customHistory from '../../history.js';

describe(`Snapshots for Card`, () => {
  it(`Card component`, () => {
    const tree = renderer
      .create(
          <Router history={customHistory}>
            <Card
              offer={mock.offers[0]}
              onCardMouseOver={() => {}}
              onFavoriteButtonClick={() => {}}
              pageName={`/`}
            />
          </Router>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
