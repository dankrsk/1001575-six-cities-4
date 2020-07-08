import {reducer, ActionType, OFFERS_COUNT} from './reducer.js';
import {mock} from './shared/test-mocks.js';
import {getOffers} from './mocks/offers.js';

const offers = mock.offers;

describe(`Reducers tests`, () => {
  it(`Reducer should change city`, () => {
    expect(reducer({
      city: `Paris`,
      offers,
    }, {
      type: ActionType.CHANGE_CITY,
      payload: `Berlin`,
    })).toEqual({
      city: `Berlin`,
      offers,
    });
  });

  it(`Reducer should get new offers`, () => {
    const newOffers = getOffers(OFFERS_COUNT);
    expect(reducer({
      city: `Paris`,
      offers
    }, {
      type: ActionType.GET_OFFERS,
      payload: newOffers,
    })).toEqual({
      city: `Paris`,
      offers: newOffers,
    });
  });
});
