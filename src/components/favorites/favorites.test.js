import React from 'react';
import renderer from 'react-test-renderer';
import Favorites from '../favorites/favorites.jsx';
import {mock} from '../../shared/test-mocks.js';
import {Router} from 'react-router-dom';
import customHistory from '../../history.js';

describe(`Snapshots for Favorites`, () => {
  it(`Favorites component`, () => {
    const tree = renderer
      .create(
          <Router history={customHistory}>
            <Favorites
              authInfo={mock.authInfo}
              authorizationStatus={`AUTH`}
              offers={mock.favoriteOffers}
              onFavoriteButtonClick={() => {}}
            />
          </Router>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
