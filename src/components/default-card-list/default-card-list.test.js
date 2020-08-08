import React from 'react';
import renderer from 'react-test-renderer';
import DefaultCardList from '../default-card-list/default-card-list.jsx';
import {mock} from '../../shared/test-mocks.js';
import {Router} from 'react-router-dom';
import customHistory from '../../history.js';

describe(`Snapshots for DefaultCardList`, () => {
  it(`DefaultCardList component`, () => {
    const tree = renderer
      .create(
          <Router history={customHistory}>
            <DefaultCardList
              offers={mock.offers}
              onFavoriteButtonClick={() => {}}
              onCardMouseOver={() => {}}
              pageName={`/`}
            />
          </Router>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
