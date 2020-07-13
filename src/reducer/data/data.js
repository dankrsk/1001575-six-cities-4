import {extend} from '../../utils/common.js';
import {getAdaptedOffer} from '../../adapter.js';

export const ConnectStatus = {
  ERROR: `ERROR`,
  OK: `OK`,
  LOADING: `LOADING`,
};

const initialState = {
  offers: [],
  status: ConnectStatus.LOADING,
};

export const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
  CHANGE_STATUS: `CHANGE_STATUS`,
};

export const ActionCreator = {
  loadOffers: (offers) => {
    return {
      type: ActionType.LOAD_OFFERS,
      payload: offers,
    };
  },
  changeStatus: (status) => {
    return {
      type: ActionType.CHANGE_STATUS,
      payload: status,
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
                dispatch(ActionCreator.changeStatus(ConnectStatus.OK));
              });
  },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFERS:
      return extend(state, {
        offers: action.payload,
      });
    case ActionType.CHANGE_STATUS:
      return extend(state, {
        status: action.payload,
      });
    default:
      return state;
  }
};
