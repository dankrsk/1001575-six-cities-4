import {extend} from '../../utils/common.js';
import {getCitiesFromOffers} from '../../utils/offers.js';

const initialState = {
  city: ``,
  allCities: [],
};

export const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  GET_ALL_CITIES: `GET_ALL_CITIES`,
};

export const ActionCreator = {
  changeCity: (city) => {
    return {
      type: ActionType.CHANGE_CITY,
      payload: city,
    };
  },
  getAllCities: (offers) => {
    return {
      type: ActionType.GET_ALL_CITIES,
      payload: getCitiesFromOffers(offers),
    };
  },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return extend(state, {
        city: action.payload,
      });
    case ActionType.GET_ALL_CITIES:
      return extend(state, {
        allCities: action.payload,
      });
    default:
      return state;
  }
};


