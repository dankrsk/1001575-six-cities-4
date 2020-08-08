import {reducer, ActionType, ActionCreator} from './app.js';
import {mock} from '../../shared/test-mocks.js';

describe(`App reducer tests`, () => {
  it(`Reducer should change city`, () => {
    expect(reducer({
      city: `Paris`,
      allCities: [`Paris`, `Berlin`],
      sortType: `POPULAR`,
    }, {
      type: ActionType.CHANGE_CITY,
      payload: `Berlin`,
    })).toEqual({
      city: `Berlin`,
      allCities: [`Paris`, `Berlin`],
      sortType: `POPULAR`,
    });
  });

  it(`Reducer should change sort type`, () => {
    expect(reducer({
      city: `Paris`,
      allCities: [`Paris`, `Berlin`],
      sortType: `POPULAR`,
    }, {
      type: ActionType.CHANGE_SORT_TYPE,
      payload: `LOW_TO_HIGH`,
    })).toEqual({
      city: `Paris`,
      allCities: [`Paris`, `Berlin`],
      sortType: `LOW_TO_HIGH`,
    });
  });

  it(`Reducer should change allCities`, () => {
    expect(reducer({
      city: `Paris`,
      allCities: [`Paris`, `Berlin`],
      sortType: `POPULAR`,
    }, {
      type: ActionType.GET_ALL_CITIES,
      payload: [`Cologne`, `Amsterdam`],
    })).toEqual({
      city: `Paris`,
      allCities: [`Cologne`, `Amsterdam`],
      sortType: `POPULAR`,
    });
  });

  it(`ActionCreator, type: CHANGE_CITY should return correct action`, () => {
    expect(ActionCreator.changeCity(`Paris`)).toEqual({
      type: ActionType.CHANGE_CITY,
      payload: `Paris`,
    });
  });

  it(`ActionCreator, type: CHANGE_SORT_TYPE should return correct action`, () => {
    expect(ActionCreator.changeSortType(`LOW_TO_HIGH`)).toEqual({
      type: ActionType.CHANGE_SORT_TYPE,
      payload: `LOW_TO_HIGH`,
    });
  });

  it(`ActionCreator, type: GET_ALL_CITIES should return correct action`, () => {
    expect(ActionCreator.getAllCities(mock.offers)).toEqual({
      type: ActionType.GET_ALL_CITIES,
      payload: [`Amsterdam`, `Cologne`, `Berlin`],
    });
  });
});
