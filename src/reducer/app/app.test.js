import {reducer, ActionType, ActionCreator} from './app.js';
import {mock} from '../../shared/test-mocks.js';

describe(`App reducer tests`, () => {
  it(`Reducer should change city`, () => {
    expect(reducer({
      city: `Paris`,
      allCities: [`Paris`, `Berlin`],
    }, {
      type: ActionType.CHANGE_CITY,
      payload: `Berlin`,
    })).toEqual({
      city: `Berlin`,
      allCities: [`Paris`, `Berlin`],
    });
  });

  it(`Reducer should change allCities`, () => {
    expect(reducer({
      city: `Paris`,
      allCities: [`Paris`, `Berlin`],
    }, {
      type: ActionType.GET_ALL_CITIES,
      payload: [`Cologne`, `Amsterdam`],
    })).toEqual({
      city: `Paris`,
      allCities: [`Cologne`, `Amsterdam`],
    });
  });

  it(`ActionCreator, type: CHANGE_CITY should return correct action`, () => {
    expect(ActionCreator.changeCity(`Paris`)).toEqual({
      type: ActionType.CHANGE_CITY,
      payload: `Paris`,
    });
  });

  it(`ActionCreator, type: GET_ALL_CITIES should return correct action`, () => {
    expect(ActionCreator.getAllCities(mock.offers)).toEqual({
      type: ActionType.GET_ALL_CITIES,
      payload: [`Amsterdam`, `Cologne`, `Berlin`],
    });
  });
});
