import {extend} from '../../utils/common.js';
import {getCitiesFromOffers} from '../../utils/offers.js';

export const SortType = {
  POPULAR: `POPULAR`,
  LOW_TO_HIGH: `LOW_TO_HIGH`,
  HIGH_TO_LOW: `HIGH_TO_LOW`,
  TOP_RATED_FIRST: `TOP_RATED_FIRST`,
};

const initialState = {
  city: ``,
  allCities: [],
  sortType: SortType.POPULAR,
};

export const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  GET_ALL_CITIES: `GET_ALL_CITIES`,
  CHANGE_SORT_TYPE: `CHANGE_SORT_TYPE`,
};

export const ActionCreator = {
  changeCity: (city) => {
    return {
      type: ActionType.CHANGE_CITY,
      payload: city,
    };
  },
  changeSortType: (sortType) => {
    return {
      type: ActionType.CHANGE_SORT_TYPE,
      payload: sortType,
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
    case ActionType.CHANGE_SORT_TYPE:
      return extend(state, {
        sortType: action.payload,
      });
    case ActionType.GET_ALL_CITIES:
      return extend(state, {
        allCities: action.payload,
      });
    default:
      return state;
  }
};


