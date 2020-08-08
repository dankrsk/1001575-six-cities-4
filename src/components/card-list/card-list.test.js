import React from 'react';
import renderer from 'react-test-renderer';
import CardList from '../card-list/card-list.jsx';
import {mock} from '../../shared/test-mocks.js';
import {Router} from 'react-router-dom';
import customHistory from '../../history.js';

describe(`Snapshots for CardLst`, () => {
  it(`CardList component`, () => {
    const tree = renderer
      .create(
          <Router history={customHistory}>
            <CardList
              city={`Amsterdam`}
              offers={mock.offers}
              onFavoriteButtonClick={() => {}}
              onCardMouseOver={() => {}}
            />
          </Router>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
