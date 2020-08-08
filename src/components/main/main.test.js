import React from 'react';
import {Provider} from 'react-redux';
import renderer from 'react-test-renderer';
import Main from '../main/main.jsx';
import configureStore from 'redux-mock-store';
import {mock} from '../../shared/test-mocks.js';
import {getCitiesFromOffers} from '../../utils/offers.js';
import NameSpace from '../../const.js';
import {Router} from 'react-router-dom';
import customHistory from '../../history.js';

const mockStore = configureStore([]);

describe(`Snapshots for Main`, () => {
  it(`Main component`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        comments: mock.comments,
        nearPlaces: mock.offers,
        status: `OK`,
        offers: mock.offers,
      },
      [NameSpace.APP]: {
        city: `Amsterdam`,
        allCities: getCitiesFromOffers(mock.offers),
        sortType: `POPULAR`,
      },
      [NameSpace.USER]: {
        authInfo: mock.authInfo,
        authorizationStatus: `NO_AUTH`,
      },
    });
    const tree = renderer
      .create(
          <Provider store={store}>
            <Router history={customHistory}>
              <Main
                authInfo={mock.authInfo}
                authorizationStatus={`AUTH`}
                currentCity={`Amsterdam`}
                offers={mock.offers}
                allCities={getCitiesFromOffers(mock.offers)}
                onCityLinkClick={() => {}}
                onFavoriteButtonClick={() => {}}
                handleCardAction={() => {}}
                activeCardId={1}
                sortType={`POPULAR`}
                onSortTypeChange={() => {}}
              />
            </Router>
          </Provider>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
