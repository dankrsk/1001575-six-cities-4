import {getOffers} from './mocks/offers.js';
import {extend} from './utils/common.js';

export const OFFERS_COUNT = 6;

const initialState = {
  city: `Paris`,
  offers: getOffers(OFFERS_COUNT),
};

export const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  GET_OFFERS: `GET_OFFERS`,
};

export const ActionCreator = {
  changeCity: (city) => {
    return {
      type: ActionType.CHANGE_CITY,
      payload: city,
    };
  },
  getOffers: () => {
    return {
      type: ActionType.GET_OFFERS,
      payload: getOffers(OFFERS_COUNT),
    };
  },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return extend(state, {
        city: action.payload,
      });
    case ActionType.GET_OFFERS:
      return extend(state, {
        offers: action.payload,
      });
    default:
      return state;
  }
};


