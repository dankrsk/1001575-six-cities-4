import React from 'react';
import renderer from 'react-test-renderer';
import CityList from '../city-list/city-list.jsx';
import {mock} from '../../shared/test-mocks.js';
import {getCitiesFromOffers} from '../../utils/offers.js';

describe(`Snapshots for CityList`, () => {
  it(`CityList component`, () => {
    const tree = renderer
      .create(<CityList
        currentCity={`Paris`}
        allCities={getCitiesFromOffers(mock.offers)}
        onCityLinkClick={() => {}}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
