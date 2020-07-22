import {extend} from '../../utils/common.js';
import {getAdaptedOffer} from '../../adapter.js';
import NameSpace from '../../const.js';

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
  UPDATE_OFFER: `UPDATE_OFFERS`,
  CHANGE_STATUS: `CHANGE_STATUS`,
};

export const ActionCreator = {
  loadOffers: (offers) => {
    return {
      type: ActionType.LOAD_OFFERS,
      payload: offers,
    };
  },
  updateOffer: (offer) => {
    return {
      type: ActionType.UPDATE_OFFER,
      payload: offer,
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
  updateFavoriteField: (offerId) => {
    return (dispatch, getState, api, id = offerId) => {
      const offers = getState()[NameSpace.DATA].offers;
      const offersIndex = offers.findIndex((offer) => {
        return offer.id === id;
      });
      return api.post(`/favorite/${offerId}/${offers[offersIndex].isFavorite ? 0 : 1}`)
                .then((response) => {
                  const newOffer = getAdaptedOffer(response.data);
                  dispatch(ActionCreator.updateOffer(newOffer));
                });
    };
  },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFERS:
      return extend(state, {
        offers: action.payload,
      });
    case ActionType.UPDATE_OFFER:
      const newOffer = action.payload;
      const index = state.offers.findIndex((offer) => {
        return offer.id === newOffer.id;
      });
      const newOffers = [].concat(state.offers.slice(0, index), newOffer, state.offers.slice(index + 1));
      return extend(state, {
        offers: newOffers,
      });
    case ActionType.CHANGE_STATUS:
      return extend(state, {
        status: action.payload,
      });
    default:
      return state;
  }
};
