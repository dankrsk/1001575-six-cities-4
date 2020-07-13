import {getCitiesFromOffers} from './offers.js';
import {mock} from '../shared/test-mocks.js';

const offers = mock.offers;

describe(`getCitiesFromOffers test`, () => {
  it(`Function should return array of unique cities from offers`, () => {
    expect(getCitiesFromOffers(offers)).toEqual([`Amsterdam`, `Cologne`, `Berlin`]);
  });
});
