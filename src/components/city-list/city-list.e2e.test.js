import React from 'react';
import {shallow} from 'enzyme';
import CityList from '../city-list/city-list.jsx';
import {mock} from '../../shared/test-mocks.js';
import {getCitiesFromOffers} from '../../utils/offers.js';

describe(`e2e-tests for CityList`, () => {
  it(`OnClickHandler should receive city`, () => {
    const handleCityLinkClick = jest.fn();

    const cityList = shallow(
        <CityList
          currentCity={`Amsterdam`}
          allCities={getCitiesFromOffers(mock.offers)}
          onCityLinkClick={handleCityLinkClick}
        />
    );

    const cityLinks = cityList.find(`.locations__item-link`);

    cityLinks.at(1).simulate(`click`, {preventDefault: () => {}});

    expect(handleCityLinkClick.mock.calls[0][0]).toBe(mock.offers[1].city);
  });
});
