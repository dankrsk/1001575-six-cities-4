import React from 'react';
import renderer from 'react-test-renderer';
import Offer from '../offer/offer.jsx';
import {mock} from '../../shared/test-mocks.js';
import {Router} from 'react-router-dom';
import customHistory from '../../history.js';

describe(`Snapshots for Offer`, () => {
  it(`Offer component`, () => {
    const tree = renderer
      .create(
          <Router history={customHistory}>
            <Offer
              offers={mock.offers}
              nearPlaces={mock.offers}
              match={{
                params: {
                  id: `1`,
                }
              }}
              authInfo={mock.authInfo}
              isAuth={true}
              comments={mock.comments}
              onFavoriteButtonClick={() => {}}
              loadComments={() => {}}
              loadNearPlaces={() => {}}
              onReviewFormSubmit={() => {}}
            />
          </Router>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
