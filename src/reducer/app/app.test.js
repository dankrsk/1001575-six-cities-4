import {reducer, ActionType} from './app.js';

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
});
