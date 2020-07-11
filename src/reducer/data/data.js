import {extend} from '../../utils/common.js';
import {getAdaptedOffer} from '../../adapter.js';

const initialState = {
  offers: [],
};

export const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
};

export const ActionCreator = {
  loadOffers: (offers) => {
    return {
      type: ActionType.LOAD_OFFERS,
      payload: offers,
    };
  },
};

export const Operation = {
  loadOffers: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
              .then((response) => {
                const offers = response.data.map((offer) => {
                  return getAdaptedOffer(offer);
                });
                dispatch(ActionCreator.loadOffers(offers));
              });
  },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFERS:
      return extend(state, {
        offers: action.payload,
      });
    default:
      return state;
  }
};
