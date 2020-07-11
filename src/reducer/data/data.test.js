import {reducer, ActionType} from './data.js';
import {mock} from '../../shared/test-mocks.js';

const offers = mock.offers;

describe(`Data reducer tests`, () => {
  it(`Reducer should change offers`, () => {
    expect(reducer({
      offers: [offers[0], offers[1]],
    }, {
      type: ActionType.LOAD_OFFERS,
      payload: [offers[1], offers[2]],
    })).toEqual({
      offers: [offers[1], offers[2]],
    });
  });
});
