import {getOffersByCity, getCitiesFromOffers} from './offers.js';
import {mock} from '../shared/test-mocks.js';

const offers = mock.offers;

describe(`getOffersByCity test`, () => {
  it(`Function should return all offers for city in first argument`, () => {
    expect(getOffersByCity(`Paris`, offers)).toEqual([offers[0]]);
  });
});

describe(`getCitiesFromOffers test`, () => {
  it(`Function should return array of unique cities from offers`, () => {
    expect(getCitiesFromOffers(offers)).toEqual([`Paris`, `Cologne`, `Brussels`]);
  });
});
